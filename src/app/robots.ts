import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  /* Купленные файлы и служебные адреса в поиске не нужны. Адреса файлов
     и так не угадать, но лишний повод на них наткнуться мы убираем.

     Запрет повторен в каждом блоке намеренно: робот читает только тот
     блок, который написан лично про него, и общий блок со звездочкой
     при этом не применяет вовсе. Без повтора вышло бы наоборот
     задуманному: сборщикам нейросетей была бы открыта папка
     с оплаченными книгами, хотя всем остальным она закрыта. */
  const closed = ["/dl/", "/api/"];

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
