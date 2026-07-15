import { HTMLAttributes } from "react";

import { Heading } from "@/components/composed/typography/heading";
import { Paragraph } from "@/components/composed/typography/paragraph";

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
}

export function PageHeader({ title, description, children, ...props }: Readonly<Props>) {
  return (
    <header className="flex items-center justify-between" {...props}>
      <hgroup className="space-y-1.5">
        <Heading level={2}>{title}</Heading>
        {description ? <Paragraph>{description}</Paragraph> : null}
      </hgroup>
      {children}
    </header>
  );
}
