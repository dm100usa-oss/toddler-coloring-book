import type { UiLang } from "@/data/dictionaries";

/* Разделы сайта. Адрес каждого пишется на языке посетителя:
   английский родитель видит английский адрес, испанский испанский.
   Это заметно и человеку, и поисковику. */
export type Section = "ages" | "guides" | "printables" | "book" | "about" | "terms";

export const sectionSlugs: Record<UiLang, Record<Section, string>> = {
  en: {
    ages: "by-age",
    guides: "guides",
    printables: "free-coloring-pages",
    book: "coloring-book",
    about: "about",
    terms: "terms-and-privacy",
  },
  es: {
    ages: "por-edad",
    guides: "guias",
    printables: "dibujos-para-colorear-gratis",
    book: "libro-para-colorear",
    about: "quienes-somos",
    terms: "condiciones-y-privacidad",
  },
};

export function sectionFromSlug(lang: UiLang, slug: string): Section | undefined {
  const map = sectionSlugs[lang];
  return (Object.keys(map) as Section[]).find((k) => map[k] === slug);
}

export const homePath = (lang: UiLang) => `/${lang}`;
export const sectionPath = (lang: UiLang, s: Section) => `/${lang}/${sectionSlugs[lang][s]}`;
export const itemPath = (lang: UiLang, s: Section, slug: string) =>
  `${sectionPath(lang, s)}/${slug}`;
