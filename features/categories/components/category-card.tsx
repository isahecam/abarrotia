"use client";

import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/features/categories/types/category.types";

interface CategoryCardProps {
  data: Category;
}

export function CategoryCard({ data }: Readonly<CategoryCardProps>) {
  return (
    <Card size="sm" className="shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span
            aria-hidden
            className="block size-3 shrink-0 rounded-full"
            style={{ backgroundColor: data.color ?? undefined }}
          />
          {data.name}
        </CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button size="icon-xs" variant="outline">
                  <IconDotsVertical />
                </Button>
              }
            />
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuItem>
                <IconEdit />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <IconTrash />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
