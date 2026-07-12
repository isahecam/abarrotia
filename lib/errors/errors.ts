export class InfraError extends Error {
  constructor(
    readonly source: "DB" | "EMAIL" | "HTTP",
    cause: unknown,
  ) {
    super(`[${source}] infrastructure failure`, { cause });
  }
}
