"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { createCategory } from "@/features/categories/actions/category.actions";
import { Category, categorySchema } from "@/features/categories/schemas/category.schema";
import { appToast } from "@/lib/toast";

export const useCreateCategory = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const methods = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", color: "" },
    mode: "onChange",
  });

  const onSubmit = (data: Category) => {
    startTransition(async () => {
      const result = await createCategory(data);

      if (!result.success) {
        appToast.error(result.message);
        return;
      }

      appToast.action(result);
      methods.reset();
      router.refresh();
    });
  };

  return { ...methods, onSubmit, isPending };
};
