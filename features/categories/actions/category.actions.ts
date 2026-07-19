"use server";

import { z } from "zod";

import { CATEGORY_ERROR_MESSAGES } from "@/features/categories/errors/messages";
import {
  CreateCategory,
  createCategorySchema,
  DeleteCategory,
  deleteCategorySchema,
} from "@/features/categories/schemas/category.schema";
import { categoryService } from "@/features/categories/services/category.service";
import { ActionResult } from "@/lib/errors/action-result";

export async function createCategory(input: CreateCategory): Promise<ActionResult> {
  const parsed = createCategorySchema.safeParse(input);

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

export async function deleteCategory(input: DeleteCategory): Promise<ActionResult> {
  const parsed = deleteCategorySchema.safeParse(input);

  if (!parsed.success) return { success: false, reason: "VALIDATION_ERROR", message: "Categoría inválida" };

  const [error] = await categoryService.delete(parsed.data);

  if (error)
    return {
      success: false,
      reason: error.reason,
      message: CATEGORY_ERROR_MESSAGES[error.reason],
    };

  return { success: true, data: undefined, message: "Categoría eliminada exitosamente" };
}
