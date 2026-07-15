import { Route } from "next";

import { getPaginatedLink, SearchParams } from "@/app/(dashboard)/categories/search-params";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface Props {
  numPages: number;
  pagination: Promise<SearchParams>;
}

function pageURL(page: number) {
  return getPaginatedLink("/categories", {
    page,
  });
}

export async function CategoryPagination({ numPages, pagination }: Readonly<Props>) {
  const { page } = await pagination;

  return (
    <Pagination className="not-prose items-center gap-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            text="Anterior"
            href={pageURL(page - 1) as Route}
            className={cn(page === 1 && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
        {Array.from({ length: numPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink href={pageURL(i + 1) as Route} isActive={page === i + 1}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            text="Siguiente"
            href={pageURL(page + 1) as Route}
            className={cn(page === numPages && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
