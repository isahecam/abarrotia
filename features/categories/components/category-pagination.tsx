import { Route } from "next";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginatedLink, SearchParams } from "@/features/categories/lib/search-params";
import { cn } from "@/lib/utils";

interface Props {
  numPages: number;
  pagination: SearchParams;
}

function pageURL(pagination: SearchParams, page: number) {
  return getPaginatedLink("/categories", { ...pagination, page });
}

export async function CategoryPagination({ numPages, pagination }: Readonly<Props>) {
  const { page } = pagination;

  const isFirstPage = page <= 1;
  const isLastPage = page >= numPages;

  return (
    <Pagination className="not-prose items-center gap-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            text="Anterior"
            href={pageURL(pagination, page - 1) as Route}
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
            className={cn(isFirstPage && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
        {Array.from({ length: numPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink href={pageURL(pagination, i + 1) as Route} isActive={page === i + 1}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            text="Siguiente"
            href={pageURL(pagination, page + 1) as Route}
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : undefined}
            className={cn(isLastPage && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
