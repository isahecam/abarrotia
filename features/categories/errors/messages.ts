import { CategoryErrorReason } from "./category-error";

export const CATEGORY_ERROR_MESSAGES = {
  CATEGORY_ALREADY_EXISTS: "Ya existe una categoría con ese nombre.",
  CATEGORY_NOT_FOUND: "La categoría ya no existe.",
  UNEXPECTED_ERROR: "Ocurrió un error inesperado. Inténtalo de nuevo.",
} satisfies Record<CategoryErrorReason, string>;
