import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Голый адрес сайта отправляем на версию того языка, на котором говорит
   гость. Переброс намеренно временный: ответ у каждого гостя свой,
   запоминать его навсегда нельзя.

   Больше этот файл не вмешивается ни во что. Любой адрес, которого
   на сайте нет, обязан честно ответить "страницы нет". Перебрасывать
   неизвестные адреса на главную нельзя: поисковик решит, что по адресу
   что-то есть, хотя там пусто, и перестанет доверять структуре сайта. */

const OPEN_LANGS = ["ru", "es", "en"] as const;
const FALLBACK = "en";

function pickLang(header: string): string {
  const wanted = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const weight = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.trim().toLowerCase(), q: weight ? Number(weight.split("=")[1]) : 1 };
    })
    .filter((item) => item.tag && !Number.isNaN(item.q))
    .sort((a, b) => b.q - a.q);

  for (const item of wanted) {
    const hit = OPEN_LANGS.find((lang) => item.tag.startsWith(lang));
    if (hit) return hit;
  }
  return FALLBACK;
}

export function middleware(request: NextRequest) {
  const lang = pickLang(request.headers.get("accept-language") ?? "");
  const response = NextResponse.redirect(new URL(`/${lang}`, request.url));
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = { matcher: "/" };
