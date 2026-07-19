import { HTMLAttributes } from "react";

export function CategoryGridView({ children, ...props }: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" {...props}>
      {children}
    </div>
  );
}
