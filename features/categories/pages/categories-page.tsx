import { CreateCategoryModal } from "@/features/categories/components/create-category-modal";

export function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold">Categorías</h1>
      <p className="mt-4 text-lg text-gray-600">Esta es la página de categorías.</p>

      <CreateCategoryModal />
    </div>
  );
}
