import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({ children, level = 1, className, ...props }: Readonly<Props>) {
  const Tag: React.ElementType = `h${level}`;

  const sizeMap = {
    1: "text-3xl font-bold",
    2: "text-2xl font-semibold",
    3: "text-xl font-semibold",
    4: "text-lg font-semibold",
    5: "text-base font-semibold",
    6: "text-sm font-semibold",
  } satisfies Record<number, string>;

  return (
    <Tag className={clsx("tracking-tight text-balance", sizeMap[level], className)} {...props}>
      {children}
    </Tag>
  );
}
