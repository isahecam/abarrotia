import { DrizzleQueryError } from "drizzle-orm/errors";
import { PostgresError } from "postgres";

import { RepositoryError, RepositoryErrorReason } from "./repository-error";

/**
 * Mapa de códigos de error de PostgreSQL a razones de error de repositorio
 */
const REPOSITORY_ERROR_REASONS = {
  "23505": "DUPLICATE_ENTRY", // unique_violation
  "23502": "UNEXPECTED_ERROR", // not_null_violation
  "08000": "CONNECTION_ERROR", // connection_exception
} satisfies Partial<Record<PostgresError["code"], RepositoryErrorReason>>;

/**
 * Extrae el error original del driver a partir de un error de consulta de Drizzle.
 *
 * Drizzle envuelve los errores del driver en `DrizzleQueryError`, exponiendo
 * la excepción original a través de la propiedad `cause`. Si el valor recibido
 * no es un error envuelto por Drizzle, se devuelve sin modificar.
 *
 * @param error Error a desenvolver.
 * @returns El error original del driver si está disponible; en caso contrario, el valor de entrada.
 */
function unWrapDrizzleError(error: unknown): unknown {
  if (error instanceof DrizzleQueryError && error.cause) {
    return error.cause;
  }

  return error;
}

/**
 * Determina si el valor recibido es un error de PostgreSQL.
 *
 * @param error Valor a evaluar.
 * @returns `true` si el valor es un `PostgresError`; en caso contrario, `false`.
 */
function isPostgresError(error: unknown): error is PostgresError {
  return typeof error === "object" && error !== null && "code" in error;
}

/**
 * Traduce errores de PostgreSQL y Drizzle a un `RepositoryError` de dominio.
 *
 * Los códigos de error conocidos de PostgreSQL se traducen a valores
 * predefinidos de `RepositoryErrorReason`. Cualquier error no reconocido,
 * o cuyo código no esté en el mapa, se traduce a `UNEXPECTED_ERROR`.
 *
 * @param error Error lanzado por la capa de base de datos.
 * @returns Un error de repositorio normalizado.
 */
export function postgresErrorMapper(error: unknown): RepositoryError {
  const cause = unWrapDrizzleError(error);

  if (isPostgresError(cause) && cause.code) {
    return {
      reason: REPOSITORY_ERROR_REASONS[cause.code as keyof typeof REPOSITORY_ERROR_REASONS],
    };
  }

  return { reason: "UNEXPECTED_ERROR" };
}
