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
pnpm email            # react-email dev preview server over ./lib/email/templates
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

There are two reference implementations, depending on what the feature talks to. Mirror the closer one's
subfolders as a feature grows rather than inventing new ones.

**`features/auth`** — library-backed (better-auth), no repository layer:

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

**`features/categories`** — Drizzle-backed CRUD; adds two subfolders on top of the auth pattern:

- `repositories/` — a class (e.g. `DrizzleCategoryRepository`) implementing an interface declared in
  `types/` (e.g. `CategoryRepository`), exported as a singleton instance. Every method wraps its Drizzle
  call in try/catch and returns `Result<RepositoryError, S>`, mapping thrown errors through
  `postgresErrorMapper` (`lib/errors/postgres-error-mapper.ts`) — never lets a raw Postgres/Drizzle error
  escape the repository.
- `lib/` — feature-local helpers that aren't a schema, service, or component. Currently URL search-param
  state: `nuqs`'s `parseAsString`/`parseAsInteger` define the param shape once, then `createLoader`
  (server-side parsing of `searchParams` in a page/action) and `useQueryStates`-based `useFilters` (client)
  both derive from it — keeps client and server reading the same params the same way.
- `services/` — same singleton-class shape as auth, but constructor-injects its collaborators instead of
  importing singletons inline, e.g. `new CategoryService(categoryRepository, slugify)`. Do this whenever a
  service needs a swappable dependency (repository, ID/slug generator, etc.) — makes the service testable
  with fakes without a mocking framework. The service maps `RepositoryError` → the feature's own error
  reason (e.g. `categoryErrorMapper`), so `actions/` never sees repository-level reasons.
- Server Components call the **service** directly for reads (see `app/(dashboard)/categories/page.tsx`
  calling `categoryService.getAll(...)`) — `actions/` is only used for mutations invoked from client
  components (`create`/`update`/`delete`). Don't wrap a read in a server action just for consistency.

### Database (`db/`)

- `db/schemas/index.ts` re-exports all schema modules: `auth-schema.ts`, which defines the better-auth
  tables (`users`, `sessions`, `accounts`, `verifications`, `organizations`, `members`, `invitations`) plus
  their `relations()` (the adapter is configured with `usePlural: true`, so table/model names in
  better-auth calls are plural); and `categories-schema.ts`, the pattern for hand-written app tables.
- Full-text search on app tables follows the `categories` pattern: a generated `tsvector` column
  (`customType` + `.generatedAlwaysAs(() => sql\`to_tsvector('spanish', ...)\`)`) backed by a GIN index,
queried with `sql\`... @@ websearch_to_tsquery('spanish', ${search})\``. Keep `'spanish'` as the text
  search config for new searchable tables — it's not derived from a shared constant, so it must be typed
  out in both the schema and every repository query against that column.
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

Expected business-error _types_ live per-feature (see `features/<feature>/errors/` above) rather than as
one shared `DomainError`; `lib/errors/` only holds the generic plumbing:

- **`Result<E, S>`** (`result.ts`) — `[error, null] | [null, success]` tuple with `ok()`/`err()` helpers.
  `E` must have a `reason: string`. Services (and repositories) return this; never throw for expected
  failures.
- **`ActionResult<T>`** (`action-result.ts`) — the shape `"use server"` actions return to client code:
  `{ success: true, data }` or `{ success: false, reason, message, fieldErrors? }`. `fieldErrors` carries
  zod's `flattenError(...).fieldErrors` when the failure is validation.
- **`InfraError`** (`errors.ts`) — unexpected infrastructure failures, tagged by
  `source: "DB" | "EMAIL" | "HTTP"`. Throw these; don't route them through `Result`.
- **`RepositoryError`** (`repository-error.ts`) — reason enum (`DUPLICATE_ENTRY`, `CONNECTION_ERROR`,
  `NOT_FOUND`, `UNEXPECTED_ERROR`) returned by repository methods, produced from thrown driver errors by
  **`postgresErrorMapper`** (`postgres-error-mapper.ts`), which unwraps `DrizzleQueryError.cause` and maps
  known Postgres error codes (`23505` → `DUPLICATE_ENTRY`, etc.) — unrecognized codes fall back to
  `UNEXPECTED_ERROR`. For DB-backed features this makes error handling three layers deep: Postgres code →
  `RepositoryError` (repository) → feature error reason via a `*-error-mapper.ts` (service) →
  `ActionResult` message (action). Add a new Postgres code to the map only when a repository actually needs
  to distinguish that failure; everything else should stay `UNEXPECTED_ERROR`.

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
- `lib/db/drizzle/pagination.ts` — `withPagination(query, orderByColumn, page, pageSize)`, a generic helper
  over a `.$dynamic()` Drizzle query (`orderBy` + `limit` + `offset`). Pair with `types/pagination.ts`:
  repositories return `PaginatedResult<T>` (`{ data, total }`); services turn that into
  `PaginatedResponse<T>` (`{ data, pagination: { page, pageSize, total, totalPages } }`) for the UI. Reuse
  this rather than hand-rolling `limit`/`offset` in a new repository.
- `lib/slug/` — `SlugGenerator` interface (`types.ts`) + `SlugifyAdapter` (`slugify.adapter.ts`, wraps the
  `slugify` package with a fixed locale), wired as the `slugify` singleton in `index.ts`. Constructor-inject
  this into a service (as `CategoryService` does) rather than calling the `slugify` package directly, so
  the service stays swappable/testable.
- `lib/date-formatters.ts` vs `utils/format-date.ts` — `lib/` holds `Intl.DateTimeFormat` factory functions
  pinned to `APP_TIMEZONE` (`lib/constants.ts`); `utils/` wraps those into call-ready functions
  (`getFullDate`, `getYear`, `getIsoDate`) defaulting to the `es-MX` locale. New date formatting belongs in
  `utils/format-date.ts`; only add to `lib/date-formatters.ts` if you need a new `Intl.DateTimeFormat`
  shape. More generally: `lib/` is for building blocks (adapters, factories, singletons), `utils/` is for
  small pure functions built on top of them.

### UI

shadcn/ui is configured via `components.json`: `base-luma` style, `remixicon` icon library, Tailwind v4
entry at `app/globals.css`, base color `neutral`. Aliases: `@/components`, `@/components/ui`, `@/lib`,
`@/hooks`. `next.config.ts` has `typedRoutes` and `reactCompiler` enabled.

- `components/ui/` — shadcn-generated primitives; don't hand-edit formatting here (excluded from oxfmt).
- `components/composed/` — hand-written components built from `ui/` primitives, grouped by concern (e.g.
  `layouts/` for `AppSidebar`, `AbarrotiaLogo`, nav components; `forms/` for shared form building blocks
  like `SubmitButton`). Prefer composing from here before reaching for `ui/` primitives directly in a
  feature component.
- **Naming**: files under `components/composed/` follow `{contexto}-{tipo}.{ext}`, e.g. `app-sidebar.tsx`,
  `main-nav.tsx`, `abarrotia-logo.tsx`, `submit-button.tsx`. `{tipo}` must be the UI-element category the
  component renders (`sidebar`, `nav`, `logo`, `button`, `card`, `modal`, etc.) — never the data/content it
  displays. The exported component name is the PascalCase of the filename (`AppSidebar`, `SubmitButton`).
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
