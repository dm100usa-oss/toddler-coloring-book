import type { UiLang } from "@/data/dictionaries";

/* Разделы сайта. Адрес каждого пишется на языке посетителя:
   английский родитель видит английский адрес, испанский испанский,
   русский русский. Это заметно и человеку, и поисковику.

   Раздела "книга" здесь больше нет. Книга это и есть главная
   страница: человек приходит за ней, и отдельная страница про то же
   самое спорила бы с главной за один и тот же запрос. Старые адреса
   переброшены на главную в next.config.mjs. */
export type Section = "tools" | "ages" | "guides" | "printables" | "about" | "terms";

export const sectionSlugs: Record<UiLang, Record<Section, string>> = {
  en: {
    tools: "choose-a-first-coloring-book",
    ages: "by-age",
    guides: "guides",
    printables: "free-coloring-pages",
    about: "about",
    terms: "terms-and-privacy",
  },
  es: {
    tools: "elegir-el-primer-libro-para-colorear",
    ages: "por-edad",
    guides: "guias",
    printables: "dibujos-para-colorear-gratis",
    about: "quienes-somos",
    terms: "condiciones-y-privacidad",
  },
  ru: {
    tools: "vybrat-pervuyu-raskrasku",
    ages: "po-vozrastu",
    guides: "stati",
    printables: "raskraski-raspechatat",
    about: "o-nas",
    terms: "prava-i-privatnost",
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
