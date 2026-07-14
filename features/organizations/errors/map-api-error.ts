import { APIError } from "better-auth/api";

import { auth } from "@/lib/auth";

import { OrganizationError, OrganizationErrorReason } from "./organization-error";

type BetterAuthCode = keyof typeof auth.$ERROR_CODES;

const CODE_TO_REASON = {
  ORGANIZATION_NOT_FOUND: "ORGANIZATION_NOT_FOUND",
  USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION: "NOT_A_MEMBER",
} satisfies Partial<Record<BetterAuthCode, OrganizationErrorReason>>;

export function mapBetterAuthError(error: APIError): OrganizationError {
  const code = (error.body as { code?: string } | undefined)?.code;

  if (code && code in CODE_TO_REASON) {
    return { reason: CODE_TO_REASON[code as keyof typeof CODE_TO_REASON] };
  }

  return { reason: "UNEXPECTED_ERROR" };
}
