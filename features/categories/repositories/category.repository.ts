import { asc, count } from "drizzle-orm";

import { SearchParams } from "@/app/(dashboard)/categories/search-params";
import { db } from "@/db";
import { categories } from "@/db/schemas";
import { Category, CategoryRepository, NewCategory } from "@/features/categories/types/category.types";
import { withPagination } from "@/lib/db/drizzle/pagination";
import { postgresErrorMapper } from "@/lib/errors/postgres-error-mapper";
import { RepositoryError } from "@/lib/errors/repository-error";
import { err, ok, Result } from "@/lib/errors/result";
import { PaginatedResult } from "@/types/pagination";

class DrizzleCategoryRepository implements CategoryRepository {
  async create(category: NewCategory): Promise<Result<RepositoryError, Category>> {
    try {
      const [result] = await db.insert(categories).values(category).returning();
      return ok(result);
    } catch (error) {
      return err(postgresErrorMapper(error));
    }
  }

  async getAll({ page, pageSize }: SearchParams): Promise<Result<RepositoryError, PaginatedResult<Category>>> {
    try {
      const query = db.select().from(categories);
      const result = await withPagination(query.$dynamic(), asc(categories.createdAt), page, pageSize);

      const [{ total }] = await db
        .select({
          total: count(),
        })
        .from(categories);

      return ok({ data: result, total });
    } catch (error) {
      return err(postgresErrorMapper(error));
    }
  }
}

export const categoryRepository = new DrizzleCategoryRepository();
