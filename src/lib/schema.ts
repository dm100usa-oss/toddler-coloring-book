import { SITE_URL, SITE_NAME, PUBLISHER, ADDRESS, AUTHOR, SOCIAL, CATALOG_URL } from "./site";
import { homePath } from "./routes";
import { activeLangs, dictionaries } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";

/** Ссылки на версии страницы на других языках.
    x-default это версия для гостя, языка которого у нас нет. */
export function langAlternates(urls: Partial<Record<UiLang, string>>) {
  const out: Record<string, string> = {};
  for (const l of activeLangs) {
    const u = urls[l];
    if (u) out[l] = u;
  }
  if (out.en) out["x-default"] = out.en;
  return out;
}

/** Путь по разделам, который поисковик показывает вместо голого адреса. */
export function breadcrumbs(lang: UiLang, trail: { name: string; path: string }[]) {
  const t = dictionaries[lang];
  const all = [{ name: t.nav.home, path: homePath(lang) }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** Кто стоит за сайтом. Эта запись отвечает на вопрос, который
    и поисковик, и нейросеть задают первым: почему вам верить.
    Настоящее издательство, настоящий город, настоящий автор
    с полкой в магазине, связь с основным каталогом. */
export function organization() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#publisher`,
    name: PUBLISHER,
    url: SITE_URL,
    address: ADDRESS,
    sameAs: [CATALOG_URL, ...Object.values(SOCIAL)],
    founder: { "@type": "Person", name: AUTHOR.name, sameAs: [AUTHOR.amazon] },
  };
}

export function website(lang: UiLang) {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}${homePath(lang)}`,
    inLanguage: dictionaries[lang].htmlLang,
    publisher: { "@id": `${SITE_URL}/#publisher` },
  };
}

/** Вопрос и ответ в разметке. Это тот вид, в котором поисковик
    показывает ответ прямо в выдаче, а нейросеть берет его целиком.
    Ответ должен быть законченным сам по себе, без "смотрите выше". */
export function faqPage(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** Собирает несколько записей в один блок разметки на странице. */
export function jsonLd(...blocks: object[]) {
  return { "@context": "https://schema.org", "@graph": blocks };
}
