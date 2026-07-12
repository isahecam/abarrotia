import { FormHTMLAttributes } from "react";

export function Form({ children, ...props }: Readonly<FormHTMLAttributes<HTMLFormElement>>) {
  return (
    <form className="flex flex-col gap-7" {...props}>
      {children}
    </form>
  );
}
