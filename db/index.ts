import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schemas";

type SqlClient = ReturnType<typeof postgres>;

let connection: SqlClient;

if (process.env.NODE_ENV === "production") {
  // * Supabase (pooler en modo Transaction, puerto 6543)
  connection = postgres(process.env.DATABASE_URL!, {
    prepare: false, // requerido por el modo Transaction del pooler
    max: 1, // ideal para serverless (Vercel/Lambda); súbelo si es un servidor persistente
  });
} else {
  // * Development (localhost, pooler en modo Session, puerto 5432)
  const globalConnection = globalThis as unknown as {
    connection: SqlClient | undefined;
  };
  globalConnection.connection ??= postgres(process.env.DATABASE_URL!, {
    max: 10,
  });
  connection = globalConnection.connection;
}

export const db = drizzle({
  client: connection,
  schema,
  logger: process.env.NODE_ENV !== "production",
});
