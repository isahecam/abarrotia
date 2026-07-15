import { categories } from "@/db/schemas";
import { RepositoryError } from "@/lib/errors/repository-error";
import { Result } from "@/lib/errors/result";

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export interface CategoryRepository {
  create(category: NewCategory): Promise<Result<RepositoryError, Category>>;
}
