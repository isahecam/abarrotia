import { db } from "@/db";
import { categories } from "@/db/schemas";
import { Category, CategoryRepository, NewCategory } from "@/features/categories/types/category.types";
import { postgresErrorMapper } from "@/lib/errors/postgres-error-mapper";
import { RepositoryError } from "@/lib/errors/repository-error";
import { err, ok, Result } from "@/lib/errors/result";

class DrizzleCategoryRepository implements CategoryRepository {
  async create(category: NewCategory): Promise<Result<RepositoryError, Category>> {
    try {
      const [result] = await db.insert(categories).values(category).returning();
      return ok(result);
    } catch (error) {
      return err(postgresErrorMapper(error));
    }
  }
}

export const categoryRepository = new DrizzleCategoryRepository();
