import { useQueryStates } from "nuqs";
import { createLoader, createSerializer, inferParserType, Options, parseAsInteger, parseAsString } from "nuqs/server";

const searchParams = {
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
};

export type SearchParams = inferParserType<typeof searchParams>;

export const loadFilters = createLoader(searchParams);
export const getPaginatedLink = createSerializer(searchParams);

export const useFilters = (options: Options = {}) =>
  useQueryStates(searchParams, {
    ...options,
    shallow: false,
  });
