"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { categoryFormSchema, CategoryFormValues } from "@/features/categories/schemas/category.schema";
import { Category } from "@/features/categories/types/category.types";

export const useUpdateCategory = ({ category, onSuccess }: { category: Category; onSuccess: () => void }) => {
  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    values: { name: category.name, color: category.color },
    mode: "onChange",
  });

  const onSubmit = (data: CategoryFormValues) => {
    console.log({
      id: category.id,
      data,
    });

    onSuccess();
  };

  return { ...methods, onSubmit, isPending: methods.formState.isSubmitting };
};
