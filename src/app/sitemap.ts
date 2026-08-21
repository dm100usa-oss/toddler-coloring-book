import type { MetadataRoute } from "next";
import { activeLangs, isContentLang } from "@/data/dictionaries";
import { stages } from "@/data/stages";
import { guides } from "@/data/guides";
import { SITE_URL, SITE_UPDATED } from "@/lib/site";
import { homePath, sectionPath, sectionSlugs, itemPath } from "@/lib/routes";
import type { Section } from "@/lib/routes";

/* Карта сайта.

   Здесь только те адреса, которые уже существуют. Обещать поисковику
   страницу, которой еще нет, нельзя: он придет, получит "страницы нет"
   и запомнит, что карте этого сайта верить не стоит. */
export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  const lastModified = new Date(SITE_UPDATED);

  for (const lang of activeLangs) {
    out.push({ url: SITE_URL + homePath(lang), lastModified, priority: 1 });

    for (const s of Object.keys(sectionSlugs[lang]) as Section[]) {
      /* Разделы этапов и статей на русском еще не написаны. */
      if (!isContentLang(lang) && (s === "ages" || s === "guides")) continue;
      out.push({ url: SITE_URL + sectionPath(lang, s), lastModified, priority: 0.8 });
    }

    /* Этапы и статьи написаны на английском и испанском. Русских
       страниц этих разделов пока нет, и в карте их быть не должно. */
    if (isContentLang(lang)) {
      for (const st of stages) {
        out.push({ url: SITE_URL + itemPath(lang, "ages", st.slug[lang]), lastModified, priority: 0.85 });
      }

      for (const g of guides) {
        out.push({ url: SITE_URL + itemPath(lang, "guides", g.slug[lang]), lastModified, priority: 0.85 });
      }
    }
  }
  return out;
}
