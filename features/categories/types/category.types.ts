import { categories } from "@/db/schemas";
import { SearchParams } from "@/features/categories/lib/search-params";
import { RepositoryError } from "@/lib/errors/repository-error";
import { Result } from "@/lib/errors/result";
import { PaginatedResult } from "@/types/pagination";

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export interface CategoryRepository {
  create(category: NewCategory): Promise<Result<RepositoryError, Category>>;
  getAll({ search, page, pageSize }: SearchParams): Promise<Result<RepositoryError, PaginatedResult<Category>>>;
}
