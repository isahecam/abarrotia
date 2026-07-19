"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { deleteCategory } from "@/features/categories/actions/category.actions";
import { DeleteCategory } from "@/features/categories/schemas/category.schema";
import { appToast } from "@/lib/toast";

export const useDeleteCategory = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onDelete = (id: DeleteCategory) => {
    startTransition(async () => {
      const result = await deleteCategory(id);

      if (!result.success) {
        appToast.error(result.message);
        return;
      }

      appToast.action(result);
      router.refresh();
    });
  };

  return { onDelete, isPending };
};
