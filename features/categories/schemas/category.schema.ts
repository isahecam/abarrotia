import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().nonempty({ error: "Ingresa el nombre de la categoría" }),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, { error: "Selecciona un color" }),
});

export type Category = z.infer<typeof categorySchema>;
