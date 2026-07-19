import { CategoryCard } from "@/features/categories/components/category-card";
import { CategoryEmptyState } from "@/features/categories/components/category-empty-state";
import { CategoryFilters } from "@/features/categories/components/category-filters";
import { CategoryGridView } from "@/features/categories/components/category-grid-view";
import { CategoryPagination } from "@/features/categories/components/category-pagination";
import { loadFilters } from "@/features/categories/lib/search-params";
import { categoryService } from "@/features/categories/services/category.service";

export default async function Categories({ searchParams }: Readonly<PageProps<"/categories">>) {
  const pagination = await loadFilters(searchParams);
  const [error, result] = await categoryService.getAll(pagination);

  if (error) {
    return <p className="text-sm text-muted-foreground">No se pudieron cargar las categorías.</p>;
  }

  return (
    <section className="flex flex-col gap-6">
      <CategoryFilters resultCount={error ? 0 : result.pagination.total} />

      {result.data.length === 0 ? (
        <CategoryEmptyState search={pagination.search} />
      ) : (
        <>
          <CategoryGridView>
            {result.data.map((category) => (
              <CategoryCard key={category.id} data={category} />
            ))}
          </CategoryGridView>

          <CategoryPagination
            pagination={{ ...pagination, page: result.pagination.page }}
            numPages={result.pagination.totalPages}
          />
        </>
      )}
    </section>
  );
}
