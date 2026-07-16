import { SearchParams } from "@/app/(dashboard)/categories/search-params";
import { CategoryError } from "@/features/categories/errors/category-error";
import { categoryErrorMapper } from "@/features/categories/errors/category-error-mapper";
import { categoryRepository } from "@/features/categories/repositories/category.repository";
import { Category } from "@/features/categories/schemas/category.schema";
import { CategoryRepository, Category as CategorySelect } from "@/features/categories/types/category.types";
import { err, ok, Result } from "@/lib/errors/result";
import { SlugGenerator, slugify } from "@/lib/slug";
import { PaginatedResponse } from "@/types/pagination";

class CategoryService {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly slugGenerator: SlugGenerator,
  ) {}

  async create(input: Category): Promise<Result<CategoryError, CategorySelect>> {
    const slug = this.slugGenerator.generate(input.name);

    const [error, category] = await this.repository.create({ ...input, slug });

    if (error) return err(categoryErrorMapper(error.reason));

    return ok(category);
  }

  async getAll({
    search,
    page,
    pageSize,
  }: SearchParams): Promise<Result<CategoryError, PaginatedResponse<CategorySelect>>> {
    const safePage = Math.max(1, page);
    const safePageSize = Math.max(1, pageSize);

    const [error, result] = await this.repository.getAll({ search, page: safePage, pageSize: safePageSize });

    if (error) return err(categoryErrorMapper(error.reason));

    const totalPages = Math.ceil(result.total / safePageSize);

    return ok({
      data: result.data,
      pagination: {
        page: safePage,
        pageSize: safePageSize,
        total: result.total,
        totalPages,
      },
    });
  }
}

export const categoryService = new CategoryService(categoryRepository, slugify);
