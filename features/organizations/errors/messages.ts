import { OrganizationErrorReason } from "./organization-error";

export const ORGANIZATION_ERROR_MESSAGES = {
  ORGANIZATION_NOT_FOUND: "La organización no existe.",
  NOT_A_MEMBER: "No perteneces a esta organización.",
  TOO_MANY_REQUESTS: "Demasiados intentos. Espera unos minutos.",
  UNEXPECTED_ERROR: "Ocurrió un error inesperado. Inténtalo de nuevo.",
} satisfies Record<OrganizationErrorReason, string>;
