/* Mapa de razones de error de repositorio */
export const REPOSITORY_ERROR_REASONS = ["DUPLICATE_ENTRY", "CONNECTION_ERROR", "UNEXPECTED_ERROR"] as const;

export type RepositoryErrorReason = (typeof REPOSITORY_ERROR_REASONS)[number];

/**
 * Error de dominio producido por la capa de repositorio.
 *
 * @property reason Razón del error de repositorio.
 * @property cause Información adicional sobre la causa del error, opcional.
 */
export type RepositoryError = {
  reason: RepositoryErrorReason;
  cause?: { entity?: string; field?: string };
};
