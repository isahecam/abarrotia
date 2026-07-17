export const CATEGORY_ERROR_REASONS = ["CATEGORY_ALREADY_EXISTS", "CATEGORY_NOT_FOUND", "UNEXPECTED_ERROR"] as const;

export type CategoryErrorReason = (typeof CATEGORY_ERROR_REASONS)[number];
export type CategoryError = { reason: CategoryErrorReason };
