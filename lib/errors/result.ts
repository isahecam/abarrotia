/**
 * Patrón **Result** como tupla de dos elementos: error en la primera posición, éxito en la segunda.
 * Solo una rama es no nula en cada variante, lo que obliga a comprobar el error antes de usar el valor.
 *
 * Variantes:
 * - `[error, null]` — operación fallida
 * - `[null, valor]` — operación exitosa
 *
 * El tipo de error `E` debe incluir al menos `reason: string` (p. ej. códigos como `"UNAUTHORIZED"`).
 *
 * @module lib/errors/result
 */

/** Resultado: o un error tipado con `reason`, o un valor de éxito `S`, nunca ambos a la vez. */
export type Result<E extends { reason: string }, S> = [E, null] | [null, S];

/** Construye un resultado exitoso con el dato `data`. */
export function ok<S>(data: S): Result<never, S> {
  return [null, data];
}

/** Construye un resultado fallido con el objeto de error (debe cumplir `{ reason: R }`). */
export function err<const R extends string, E extends { reason: R }>(error: E): Result<E, never> {
  return [error, null];
}
