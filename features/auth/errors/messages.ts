import { AuthErrorReason } from "./auth-error";

export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Correo o contraseña incorrectos.",
  EMAIL_NOT_VERIFIED: "Verifica tu correo antes de iniciar sesión.",
  USER_ALREADY_EXISTS: "Ya existe una cuenta con este correo.",
  TOO_MANY_REQUESTS: "Demasiados intentos. Espera unos minutos.",
  UNEXPECTED_ERROR: "Ocurrió un error inesperado. Inténtalo de nuevo.",
} satisfies Record<AuthErrorReason, string>;
