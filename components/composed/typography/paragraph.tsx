import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Paragraph({ children, className, ...props }: Readonly<HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p className={cn("leading-7 text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
