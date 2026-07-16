"use client";

import { debounce } from "nuqs";
import { useTransition } from "react";

import { useFilters } from "@/app/(dashboard)/categories/search-params";
import { SearchInput } from "@/components/composed/filters/search-input";
import { Button } from "@/components/ui/button";

interface Props {
  resultCount: number;
}

export function CategoryFilters({ resultCount }: Readonly<Props>) {
  const [isPending, startTransition] = useTransition();

  const [{ search }, setSearchParams] = useFilters({
    startTransition,
  });

  const onClear = () => {
    setSearchParams(null);
  };

  return (
    <div className="flex gap-3">
      <SearchInput
        placeholder="Buscar categorías..."
        value={search}
        onChange={(e) => {
          setSearchParams(
            { search: e.target.value, page: 1 },
            {
              limitUrlUpdates: e.target.value ? debounce(300) : undefined,
            },
          );
        }}
        isLoading={isPending}
        resultCount={search ? resultCount : undefined}
      />

      <Button variant="secondary" onClick={onClear} disabled={!search}>
        Limpiar
      </Button>
    </div>
  );
}
