export const CATEGORY_ERROR_REASONS = ["CATEGORY_ALREADY_EXISTS", "UNEXPECTED_ERROR"] as const;

export type CategoryErrorReason = (typeof CATEGORY_ERROR_REASONS)[number];
export type CategoryError = { reason: CategoryErrorReason };
