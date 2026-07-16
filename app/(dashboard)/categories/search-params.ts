import { useQueryStates } from "nuqs";
import { createLoader, createSerializer, inferParserType, parseAsInteger, parseAsString } from "nuqs/server";

const searchParams = {
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
};

export type SearchParams = inferParserType<typeof searchParams>;

export const loadFilters = createLoader(searchParams);
export const getPaginatedLink = createSerializer(searchParams);

export const useFilters = () =>
  useQueryStates(searchParams, {
    shallow: false,
  });
