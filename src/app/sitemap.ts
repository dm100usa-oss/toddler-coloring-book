import type { MetadataRoute } from "next";
import { activeLangs, isContentLang } from "@/data/dictionaries";
import { stages } from "@/data/stages";
import { guides } from "@/data/guides";
import { basisSlug } from "@/data/tool";
import { agePages } from "@/data/agepages";
import { proPages } from "@/data/propages";
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
      out.push({ url: SITE_URL + sectionPath(lang, s), lastModified, priority: 0.8 });
    }

    /* Этапы и статьи написаны на всех трех языках. Проверка оставлена:
       если появится язык интерфейса без справочной части, его пустые
       страницы не должны попасть в карту. */
    if (isContentLang(lang)) {
      for (const st of stages) {
        out.push({ url: SITE_URL + itemPath(lang, "ages", st.slug[lang]), lastModified, priority: 0.85 });
      }

      for (const g of guides) {
        out.push({ url: SITE_URL + itemPath(lang, "guides", g.slug[lang]), lastModified, priority: 0.85 });
      }

      /* Страница правил подбора. Стоит ниже самого инструмента
         по важности, но поисковик должен ее знать: именно на нее
         опирается доверие ко всему инструменту. */
      out.push({
        url: SITE_URL + itemPath(lang, "tools", basisSlug[lang]),
        lastModified,
        priority: 0.7,
      });

      /* Возрастные страницы. Стоят наравне со страницами этапов:
         именно на них приходит родитель с запросом, где есть цифра. */
      for (const ap of agePages) {
        out.push({
          url: SITE_URL + itemPath(lang, "tools", ap.slug[lang]),
          lastModified,
          priority: 0.85,
        });
      }

      /* Страницы для тех, кто покупает книгу на работу. */
      for (const pp of proPages) {
        out.push({
          url: SITE_URL + itemPath(lang, "programs", pp.slug[lang]),
          lastModified,
          priority: 0.85,
        });
      }
    }
  }
  return out;
}
