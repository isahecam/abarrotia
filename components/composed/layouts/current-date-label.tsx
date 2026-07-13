"use client";

import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { getFullDate, getIsoDate } from "@/utils/format-date";

export function CurrentDateLabel({ ...props }: Readonly<HTMLAttributes<HTMLTimeElement>>) {
  const now = new Date();

  const date = getFullDate(now);
  const isoDate = getIsoDate(now);

  return (
    <time {...props} dateTime={isoDate} className={cn("text-sm font-medium text-muted-foreground", props.className)}>
      {date}
    </time>
  );
}
