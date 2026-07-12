import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

import { Button, buttonVariants } from "@/components/ui/button";

export function SubmitButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return (
    <Button type="submit" {...props}>
      {children}
    </Button>
  );
}
