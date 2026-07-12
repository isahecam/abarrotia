import { fullDateFormatter, yearFormatter } from "@/lib/date-formatters";

const getFullDate = (date: Date | string, locale: string = "es-MX") => {
  return fullDateFormatter(locale).format(new Date(date));
};

const getYear = (date: Date | string, locale: string = "es-MX") => {
  return yearFormatter(locale).format(new Date(date));
};

export { getFullDate, getYear };
