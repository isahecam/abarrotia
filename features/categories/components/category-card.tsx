"use client";

import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { DeleteCategoryDialog } from "@/features/categories/components/delete-category-dialog";
import { UpdateCategoryModal } from "@/features/categories/components/update-category-modal";
import { Category } from "@/features/categories/types/category.types";

interface CategoryCardProps {
  data: Category;
}

export function CategoryCard({ data: category }: Readonly<CategoryCardProps>) {
  return (
    <Card size="sm" className="shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span
            aria-hidden
            className="block size-3 shrink-0 rounded-full"
            style={{ backgroundColor: category.color ?? undefined }}
          />
          {category.name}
        </CardTitle>
        <CardAction>
          <UpdateCategoryModal data={category} />
          <DeleteCategoryDialog data={category} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
