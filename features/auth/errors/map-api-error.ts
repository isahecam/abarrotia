import { APIError } from "better-auth/api";

import { auth } from "@/lib/auth";

import { AuthError, AuthErrorReason } from "./auth-error";

type BetterAuthCode = keyof typeof auth.$ERROR_CODES;

const CODE_TO_REASON = {
  INVALID_EMAIL_OR_PASSWORD: "INVALID_CREDENTIALS",
  EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
} satisfies Partial<Record<BetterAuthCode, AuthErrorReason>>;

export function mapBetterAuthError(error: APIError): AuthError {
  const code = (error.body as { code?: string } | undefined)?.code;

  if (code && code in CODE_TO_REASON) {
    return { reason: CODE_TO_REASON[code as keyof typeof CODE_TO_REASON] };
  }

  if (error.statusCode === 429) return { reason: "TOO_MANY_REQUESTS" };

  return { reason: "UNEXPECTED_ERROR" };
}
