"use server";

import { z } from "zod";

import { CATEGORY_ERROR_MESSAGES } from "@/features/categories/errors/messages";
import { Category, categorySchema } from "@/features/categories/schemas/category.schema";
import { categoryService } from "@/features/categories/services/category.service";
import { ActionResult } from "@/lib/errors/action-result";

export async function createCategory(input: Category): Promise<ActionResult> {
  const parsed = categorySchema.safeParse(input);

  if (!parsed.success)
    return {
      success: false,
      reason: "VALIDATION_ERROR",
      message: "Datos de la categoría inválidos",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };

  const [error] = await categoryService.create(parsed.data);

  if (error)
    return {
      success: false,
      reason: error.reason,
      message: CATEGORY_ERROR_MESSAGES[error.reason],
    };

  return { success: true, data: undefined, message: "Categoría creada exitosamente" };
}
