import { CategoryError, CategoryErrorReason } from "@/features/categories/errors/category-error";
import { RepositoryErrorReason } from "@/lib/errors/repository-error";

const CODE_TO_REASON = {
  DUPLICATE_ENTRY: "CATEGORY_ALREADY_EXISTS",
  NOT_FOUND: "CATEGORY_NOT_FOUND",
} satisfies Partial<Record<RepositoryErrorReason, CategoryErrorReason>>;

export function categoryErrorMapper(error: RepositoryErrorReason): CategoryError {
  if (error in CODE_TO_REASON) {
    return { reason: CODE_TO_REASON[error as keyof typeof CODE_TO_REASON] };
  }

  return { reason: "UNEXPECTED_ERROR" };
}
