import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  /* Служебные адреса в поиске не нужны.

     Купленные книги лежат в закрытой кладовке, публичного адреса
     у них нет вовсе, поэтому запрещать тут нечего: закрыт сам вход,
     а не только упоминание о нем.

     Запрет повторен в каждом блоке намеренно: робот читает только тот
     блок, который написан лично про него, и общий блок со звездочкой
     при этом не применяет вовсе. */
  const closed = ["/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: closed },
      /* Сборщиков нейросетей пускаем явно и намеренно. Весь смысл
         этого сайта в том, чтобы его цитировали в ответах ИИ.
         Закрыть их значило бы отрезать главный канал. */
      { userAgent: "GPTBot", allow: "/", disallow: closed },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: closed },
      { userAgent: "ChatGPT-User", allow: "/", disallow: closed },
      { userAgent: "ClaudeBot", allow: "/", disallow: closed },
      { userAgent: "Claude-User", allow: "/", disallow: closed },
      { userAgent: "PerplexityBot", allow: "/", disallow: closed },
      { userAgent: "Google-Extended", allow: "/", disallow: closed },
      { userAgent: "Applebot-Extended", allow: "/", disallow: closed },
      { userAgent: "meta-externalagent", allow: "/", disallow: closed },
      { userAgent: "Bingbot", allow: "/", disallow: closed },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
