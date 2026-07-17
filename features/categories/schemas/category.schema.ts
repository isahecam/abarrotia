import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().nonempty({ error: "Ingresa el nombre de la categoría" }),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, { error: "Selecciona un color" }),
});

export const categoryIdentifierSchema = z.object({
  id: z.uuid({ error: "El identificador de la categoría no es válido" }),
});

export type Category = z.infer<typeof categorySchema>;
export type CategoryIdentifier = z.infer<typeof categoryIdentifierSchema>;
