import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({ error: "Ingresa un correo electrónico válido" }),
  password: z.string().min(8, { error: "La contraseña debe tener al menos 8 caracteres" }),
});

export type SignIn = z.infer<typeof signInSchema>;
