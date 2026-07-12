"use client";

import { Controller } from "react-hook-form";

import { Form } from "@/components/composed/forms/form";
import { SubmitButton } from "@/components/composed/forms/submit-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useSignIn } from "@/features/auth/hooks/use-sign-in";

export function SignInForm() {
  const { control, handleSubmit, onSubmit, isSubmitting } = useSignIn();

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
        <CardDescription>Inicia sesión con tus credenciales</CardDescription>
      </CardHeader>
      <CardContent>
        <Form id="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Correo electrónico</FieldLabel>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="tucuenta@abarrotia.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="*********"
                    autoComplete="current-password"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </Form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <SubmitButton form="sign-in-form" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </SubmitButton>
        </Field>
      </CardFooter>
    </Card>
  );
}
