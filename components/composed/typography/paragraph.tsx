import clsx from "clsx";
import { HTMLAttributes } from "react";

export function Paragraph({ children, className, ...props }: Readonly<HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p className={clsx("leading-7 text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
