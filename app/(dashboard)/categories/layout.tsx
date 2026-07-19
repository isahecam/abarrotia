import { PageHeader } from "@/components/composed/layouts/page-header";
import { CreateCategoryModal } from "@/features/categories/components/create-category-modal";

export default function CategoriesLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <div className="flex min-h-screen flex-col p-4">
      <PageHeader title="Categorías" description="Organiza tus productos y su color identificador.">
        <CreateCategoryModal />
      </PageHeader>
      {children}
    </div>
  );
}
