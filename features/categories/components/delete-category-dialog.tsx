"use client";

import { IconTrash } from "@tabler/icons-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteCategory } from "@/features/categories/hooks/use-delete-category";
import { Category } from "@/features/categories/types/category.types";

interface Props {
  data: Category;
}

export function DeleteCategoryDialog({ data }: Readonly<Props>) {
  const { onDelete, isPending } = useDeleteCategory();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="destructive" size="icon-sm">
            <IconTrash />
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar categoría?</AlertDialogTitle>
          <AlertDialogDescription>
            Se eliminará la categoría &quot;{data.name}&quot; de forma permanente. Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              onDelete({ id: data.id });
            }}>
            {isPending ? (
              <>
                <Spinner />
                Eliminando...
              </>
            ) : (
              "Eliminar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
