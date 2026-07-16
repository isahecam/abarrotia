"use client";

import { useId, useState } from "react";
import { FormProvider } from "react-hook-form";

import { Form } from "@/components/composed/forms/form";
import { SubmitButton } from "@/components/composed/forms/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { CategoryForm } from "@/features/categories/components/category-form";
import { useCreateCategory } from "@/features/categories/hooks/use-create-category";

export function CreateCategoryModal() {
  const formId = useId();
  const [open, setOpen] = useState(false);

  const { onSubmit, isPending, ...methods } = useCreateCategory({ onSuccess: () => setOpen(false) });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Nueva categoría</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva categoría</DialogTitle>
          <DialogDescription>Crea una nueva categoría para organizar tus productos.</DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <Form id={formId} onSubmit={methods.handleSubmit(onSubmit)}>
            <CategoryForm />
          </Form>
        </FormProvider>
        <DialogFooter>
          <SubmitButton form={formId} disabled={isPending}>
            {isPending ? (
              <>
                <Spinner />
                Creando...
              </>
            ) : (
              "Crear categoría"
            )}
          </SubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
