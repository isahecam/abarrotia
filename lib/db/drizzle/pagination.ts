import { SQL } from "drizzle-orm";
import { PgColumn, PgSelect } from "drizzle-orm/pg-core";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

export function withPagination<T extends PgSelect>(
  qb: T,
  orderByColumn: PgColumn | SQL | SQL.Aliased,
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
) {
  return qb
    .orderBy(orderByColumn)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
