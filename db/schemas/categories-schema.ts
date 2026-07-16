import { SQL, sql } from "drizzle-orm";
import { customType, index, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

const tsvector = customType<{ data: string }>({
  dataType() {
    return "tsvector";
  },
});

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    color: varchar("color", { length: 7 }).default("#E0E0E0"),
    search: tsvector("search")
      .notNull()
      .generatedAlwaysAs((): SQL => sql`to_tsvector('spanish', ${categories.name})`),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [
    uniqueIndex("categories_slug_uidx").on(t.slug),
    index("categories_search_vector_gin_idx").using("gin", t.search),
  ],
);
