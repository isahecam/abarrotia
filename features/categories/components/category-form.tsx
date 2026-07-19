"use client";

import { Controller, useFormContext } from "react-hook-form";

import { ColorPicker } from "@/components/ui/color-picker";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CategoryFormValues } from "@/features/categories/schemas/category.schema";

export function CategoryForm() {
  const { control } = useFormContext<CategoryFormValues>();

  return (
    <FieldGroup>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Nombre de la categoría</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Ej. Abarrotes, Bebidas o Limpieza"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="color"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} orientation={"horizontal"}>
            <FieldContent>
              <FieldLabel htmlFor={field.name}>Color</FieldLabel>
              <FieldDescription>Selecciona un color para identificar esta categoría</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
            <ColorPicker {...field} className="size-9 self-center" id={field.name} aria-invalid={fieldState.invalid} />
          </Field>
        )}
      />
    </FieldGroup>
  );
}
