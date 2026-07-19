"use client";

import { IconEdit } from "@tabler/icons-react";
import { useId, useState } from "react";
import { FormProvider } from "react-hook-form";

import { Form } from "@/components/composed/forms/form";
import { SubmitButton } from "@/components/composed/forms/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { CategoryForm } from "@/features/categories/components/category-form";
import { useUpdateCategory } from "@/features/categories/hooks/use-update-category";
import { Category } from "@/features/categories/types/category.types";

interface Props {
  data: Category;
}

export function UpdateCategoryModal({ data }: Readonly<Props>) {
  const formId = useId();
  const [open, setOpen] = useState(false);

  const { onSubmit, isPending, ...methods } = useUpdateCategory({
    category: data,
    onSuccess: () => setOpen(false),
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;
    setOpen(nextOpen);
    if (!nextOpen) methods.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon-sm">
            <IconEdit />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Actualizar categoría</DialogTitle>
          <DialogDescription>Actualiza la información de la categoría.</DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <Form id={formId} onSubmit={methods.handleSubmit(onSubmit)}>
            <CategoryForm />
          </Form>
          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" disabled={isPending}>
                  Cancelar
                </Button>
              }
            />
            <SubmitButton form={formId} disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner />
                  Actualizando...
                </>
              ) : (
                "Actualizar categoría"
              )}
            </SubmitButton>
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
