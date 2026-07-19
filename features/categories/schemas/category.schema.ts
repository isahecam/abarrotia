import { z } from "zod";

const baseCategorySchema = z.object({
  id: z.uuid({ error: "El identificador de la categoría no es válido" }),
  name: z
    .string()
    .trim()
    .nonempty({ error: "Ingresa el nombre de la categoría" })
    .max(50, { error: "El nombre no puede superar 50 caracteres" }),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, { error: "Selecciona un color" }),
});

export const categoryFormSchema = baseCategorySchema.pick({ name: true, color: true });

export const createCategorySchema = categoryFormSchema;
export const updateCategorySchema = baseCategorySchema.pick({ id: true, name: true, color: true });
export const deleteCategorySchema = baseCategorySchema.pick({ id: true });

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export type CreateCategory = z.infer<typeof createCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type DeleteCategory = z.infer<typeof deleteCategorySchema>;
