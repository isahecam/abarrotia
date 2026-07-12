const createDateFormatter = (options: Intl.DateTimeFormatOptions, locale: string) => {
  return new Intl.DateTimeFormat(locale, options);
};

const fullDateFormatter = (locale: string) =>
  createDateFormatter({ year: "numeric", month: "long", day: "numeric" }, locale);

const yearFormatter = (locale: string) => createDateFormatter({ year: "numeric" }, locale);

export { fullDateFormatter, yearFormatter };
