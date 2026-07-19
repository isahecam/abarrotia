import { APP_TIMEZONE } from "@/lib/constants";

const createDateFormatter = (options: Intl.DateTimeFormatOptions, locale: string) => {
  return new Intl.DateTimeFormat(locale, { ...options, timeZone: APP_TIMEZONE });
};

const fullDateFormatter = (locale: string) => createDateFormatter({ dateStyle: "full" }, locale);

const yearFormatter = (locale: string) => createDateFormatter({ year: "numeric" }, locale);

export { fullDateFormatter, yearFormatter };
