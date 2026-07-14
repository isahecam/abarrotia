export const ORGANIZATION_ERROR_REASONS = ["ORGANIZATION_NOT_FOUND", "NOT_A_MEMBER", "UNEXPECTED_ERROR"] as const;

export type OrganizationErrorReason = (typeof ORGANIZATION_ERROR_REASONS)[number];
export type OrganizationError = { reason: OrganizationErrorReason };
