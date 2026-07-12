# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Abarrotia is a point-of-sale (POS) system for small grocery stores ("tiendas de abarrotes"), built with
Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, Drizzle ORM + PostgreSQL, better-auth, and
Resend for transactional email. UI copy, error messages, and some code comments are written in Spanish
(the target market); keep new user-facing strings in Spanish unless told otherwise.

## Commands

Package manager is `pnpm`.

```bash
pnpm dev              # start Next.js dev server
pnpm build            # production build
pnpm start            # run production build

pnpm lint             # oxlint
pnpm lint:fix         # oxlint --fix
pnpm fmt              # oxfmt (writes)
pnpm fmt:check        # oxfmt --check (CI-style, no writes)

pnpm db:seed          # tsx db/seeds/owner-seed.ts — creates the initial owner user + organization via better-auth
```

There are no `db:generate`/`db:migrate` scripts yet; run drizzle-kit directly, e.g.
`pnpm dlx drizzle-kit generate` / `pnpm dlx drizzle-kit migrate` (uses `drizzle.config.ts`, which loads
`.env.development`). No test runner is configured in this repo yet.

Local Postgres + pgAdmin for development run via Docker Compose:

```bash
docker compose -f compose.dev.yaml up -d
```

The `abarrotia-data` volume is declared `external: true`, so it must exist beforehand
(`docker volume create abarrotia-data`) or the compose command will fail.

## Architecture

### Route-to-feature split

`app/` holds only routing: each `page.tsx` is a thin wrapper that imports and renders a page component
from `features/<feature>/pages/<feature>-page.tsx`. Route groups map to feature folders, e.g.
`app/(dashboard)/checkout/page.tsx` → `features/checkout/pages/checkout-page.tsx`,
`app/(auth)/sign-in/page.tsx` → `features/auth/pages/sign-in-page.tsx`. `(dashboard)` wraps authenticated
routes with the sidebar layout (`components/composed/layouts/app-sidebar.tsx`); `(auth)` wraps the
centered auth-card layout. When adding a route, create the feature component under `features/<feature>/`
and keep the `app/` file a plain re-export/render.

Path alias `@/*` maps to the repo root (see `tsconfig.json`).

### Feature-layer pattern (`features/<feature>/`)

`features/auth` is the reference implementation; mirror its subfolders as a feature grows rather than
inventing new ones:

- `schemas/` — zod schemas + inferred types for form/input validation (e.g. `signInSchema`, `SignIn`).
- `services/` — a class instance (e.g. `authService`) exported as a singleton, calling out to better-auth /
  the DB and returning `Result<E, S>` (see `lib/errors/`) — never throws for expected failures.
- `errors/` — feature-scoped error reasons (`*-error.ts`, a `satisfies Record<Reason, string>` message map
  in `messages.ts`, Spanish text), plus a mapper (`map-api-error.ts`) translating library-specific errors
  (e.g. `better-auth`'s `APIError` codes) into the feature's own reason type.
- `actions/` — `"use server"` functions that parse input with the zod schema, call the service, and return
  `ActionResult<T>` (`lib/errors/action-result.ts`): `{ success: true, data }` or `{ success: false,
reason, message, fieldErrors? }`. This is the boundary between server logic and client components.
- `hooks/` — client hooks (e.g. `useSignIn`) wiring `react-hook-form` + `zodResolver` to the schema, calling
  the action on submit, and reporting the result via `appToast` (`lib/toast.ts`).
- `components/` — feature-specific presentational/form components.
- `pages/` — the top-level component rendered by the matching `app/` route.
- `types/` — cross-cutting interfaces for the feature (e.g. repository contracts) not tied to a schema.

### Database (`db/`)

- `db/schemas/index.ts` re-exports all schema modules; currently just `auth-schema.ts`, which defines the
  better-auth tables (`users`, `sessions`, `accounts`, `verifications`, `organizations`, `members`,
  `invitations`) plus their `relations()`. The adapter is configured with `usePlural: true`, so table/model
  names in better-auth calls are plural.
- `db/index.ts` builds the Drizzle/postgres-js client as a singleton. In production it assumes a Supabase
  pooler in transaction mode (`prepare: false, max: 1` on port 6543); in development it assumes session
  mode and caches the connection on `globalThis` so hot-reload doesn't open new connections.
- `drizzle.config.ts` (dev, loads `.env.development`) points at `./db/schemas/index.ts`.
  `drizzle.prod.config.ts` (loads `.env.production`, expects `DIRECT_URL`) currently points at
  `./db/schema/index.ts` (singular) — that path doesn't exist in the repo; check this before relying on
  the prod config.

### Auth (`lib/auth.ts`, `lib/auth-client.ts`)

better-auth server instance uses the Drizzle adapter, requires email verification, sends verification
email through `emailService`, and loads the `organization` plugin with
`allowUserToCreateOrganization: false` — organizations are only created programmatically (see
`db/seeds/owner-seed.ts`, which signs up the owner and creates their org via `auth.api.*`). The client
(`lib/auth-client.ts`) mirrors this with `organizationClient()`.

`proxy.ts` is Next.js 16's middleware convention (replaces `middleware.ts`; the exported function must be
named `proxy`). It checks the better-auth session cookie and redirects to `/sign-in` when absent. Its
`matcher` excludes `api`, `_next/static`, `_next/image`, and `favicon.ico`, and `PUBLIC_PATHS` inside the
file exempts `/sign-in` itself — without that exemption it redirect-loops (`/sign-in` has no cookie either,
so the proxy would keep redirecting to itself). Add any new public/unauthenticated route to `PUBLIC_PATHS`.

### Errors (`lib/errors/`)

Two-channel error handling. Expected business-error _types_ now live per-feature (see
`features/<feature>/errors/` above) rather than as one shared `DomainError`; `lib/errors/` only holds the
generic plumbing:

- **`Result<E, S>`** (`result.ts`) — `[error, null] | [null, success]` tuple with `ok()`/`err()` helpers.
  `E` must have a `reason: string`. Services return this; never throw for expected failures.
- **`ActionResult<T>`** (`action-result.ts`) — the shape `"use server"` actions return to client code:
  `{ success: true, data }` or `{ success: false, reason, message, fieldErrors? }`. `fieldErrors` carries
  zod's `flattenError(...).fieldErrors` when the failure is validation.
- **`InfraError`** (`errors.ts`) — unexpected infrastructure failures, tagged by
  `source: "DB" | "EMAIL" | "HTTP"`. Throw these; don't route them through `Result`.

### Email (`lib/email/`)

Provider abstraction: `EmailProvider` interface (`email.types.ts`) is implemented by `ResendProvider`
(`providers/resend.provider.ts`), which throws `InfraError("EMAIL", ...)` on send failure. `EmailService`
(`email.service.ts`) exposes semantic methods (e.g. `sendVerificationEmail`) that pick a template
(`templates/`, built with `react-email`) and a `from` address from `email.config.ts`. The wired singleton
is exported as `emailService` from `lib/email/index.ts` — import that rather than constructing the
service directly.

### Other `lib/` utilities

- `lib/session.ts` — `getCurrentSession()`, a thin wrapper over `auth.api.getSession({ headers })` for use
  in server components/actions.
- `lib/toast.ts` — `appToast` (`sonner` wrapper) with `success`/`error`/`info`/`warning` plus an
  `action(result)` helper that toasts based on an `ActionResult`-shaped `{ success, message }`; feature
  hooks call this after an action returns (see `useSignIn` above) instead of calling `sonner` directly.
- `lib/resend.ts` — the raw `Resend` client instance; prefer `emailService` (`lib/email/`) over importing
  this directly.

### UI

shadcn/ui is configured via `components.json`: `base-luma` style, `remixicon` icon library, Tailwind v4
entry at `app/globals.css`, base color `neutral`. Aliases: `@/components`, `@/components/ui`, `@/lib`,
`@/hooks`. `next.config.ts` has `typedRoutes` and `reactCompiler` enabled.

- `components/ui/` — shadcn-generated primitives; don't hand-edit formatting here (excluded from oxfmt).
- `components/composed/` — hand-written components built from `ui/` primitives, grouped by concern (e.g.
  `layouts/` for `AppSidebar`, `AbarrotiaLogo`, nav components; `forms/` for shared form building blocks
  like `SubmitButton`). Prefer composing from here before reaching for `ui/` primitives directly in a
  feature component.
- `hooks/` — app-wide hooks not tied to a single feature (e.g. `use-mobile.ts`). Feature-specific hooks
  belong in `features/<feature>/hooks/` instead.

## Tooling conventions

- **Linting**: oxlint (`.oxlintrc.json`) — plugins for typescript/unicorn/oxc/nextjs/react/import/jsx-a11y,
  with the `correctness` category set to error.
- **Formatting**: oxfmt (`.oxfmtrc.json`) — 120-char width, double quotes, semicolons, trailing commas,
  sorted imports (with blank line between groups), Tailwind class sorting against `app/globals.css`.
  `components/ui/**` (shadcn-generated) is excluded from formatting.
- **Git hooks** (husky): `pre-commit` runs `lint-staged` (lints staged JS/TS, formats all staged files);
  `commit-msg` runs commitlint. Commits must follow Conventional Commits, restricted to `build, chore, ci,
docs, feat, fix, perf, refactor, revert, style, test`, lower-case type/scope, no trailing period on the
  subject, header ≤100 chars.

## Environment variables

See `.env.example` for the full list: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `RESEND_API_KEY`,
`DATABASE_URL`, plus `POSTGRES_*`/`PGADMIN_*` used only by `compose.dev.yaml`. Local values live in
`.env.development` (gitignored via `.env*`).
