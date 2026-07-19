"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { updateCategory } from "@/features/categories/actions/category.actions";
import { categoryFormSchema, CategoryFormValues } from "@/features/categories/schemas/category.schema";
import { Category } from "@/features/categories/types/category.types";
import { appToast } from "@/lib/toast";

export const useUpdateCategory = ({ category, onSuccess }: { category: Category; onSuccess: () => void }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    values: { name: category.name, color: category.color },
    mode: "onChange",
  });

  const onSubmit = (data: CategoryFormValues) => {
    startTransition(async () => {
      const result = await updateCategory({ id: category.id, ...data });

      if (!result.success) {
        appToast.error(result.message);
        return;
      }

      appToast.action(result);
      router.refresh();
      onSuccess?.();
    });
  };

  return { ...methods, onSubmit, isPending };
};
