"use server";

import { z } from "zod";

import { AUTH_ERROR_MESSAGES } from "@/features/auth/errors/messages";
import { signInSchema, SignIn } from "@/features/auth/schemas/auth.schema";
import { authService } from "@/features/auth/services/auth.service";
import { ActionResult } from "@/lib/errors/action-result";

export async function signIn(input: SignIn): Promise<ActionResult> {
  const parsed = signInSchema.safeParse(input);

  if (!parsed.success)
    return {
      success: false,
      reason: "VALIDATION_ERROR",
      message: "Corrige los errores del formulario.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };

  const [error] = await authService.signIn(parsed.data);

  if (error)
    return {
      success: false,
      reason: error.reason,
      message: AUTH_ERROR_MESSAGES[error.reason],
    };

  return { success: true, data: undefined };
}
