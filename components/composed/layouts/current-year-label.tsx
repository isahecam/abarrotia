"use client";

import { getYear } from "@/utils/format-date";

export function CurrentYearLabel() {
  const year = getYear(new Date());

  return <time dateTime={year}>{year}</time>;
}
