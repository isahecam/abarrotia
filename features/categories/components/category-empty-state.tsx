import { IconCategory, IconSearchOff } from "@tabler/icons-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

interface Props {
  search: string;
}

export function CategoryEmptyState({ search }: Readonly<Props>) {
  if (search)
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconSearchOff />
          </EmptyMedia>
          <EmptyTitle>No se encontraron categorías</EmptyTitle>
          <EmptyDescription>
            No encontramos categorías que coincidan con &quot;{search}&quot;. Intenta con otro nombre o ajusta los
            términos de búsqueda.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/categories" className={buttonVariants({ variant: "secondary", size: "sm" })}>
            Limpiar búsqueda
          </Link>
        </EmptyContent>
      </Empty>
    );

  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconCategory />
        </EmptyMedia>
        <EmptyTitle>No hay categorías registradas</EmptyTitle>
        <EmptyDescription>Agrega una categoría para comenzar a organizar tus productos.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
