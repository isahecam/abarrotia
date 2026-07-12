export const AUTH_ERROR_REASONS = [
  "INVALID_CREDENTIALS",
  "EMAIL_NOT_VERIFIED",
  "USER_ALREADY_EXISTS",
  "TOO_MANY_REQUESTS",
  "UNEXPECTED_ERROR",
] as const;

export type AuthErrorReason = (typeof AUTH_ERROR_REASONS)[number];
export type AuthError = { reason: AuthErrorReason };
