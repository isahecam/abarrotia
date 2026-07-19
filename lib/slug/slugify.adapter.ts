import slugify from "slugify";

import { SlugGenerator } from "./types";

export class SlugifyAdapter implements SlugGenerator {
  constructor(private readonly locale: string) {}

  generate(text: string) {
    return slugify(text, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: this.locale, // language code of the locale to use
      trim: true,
    });
  }
}
