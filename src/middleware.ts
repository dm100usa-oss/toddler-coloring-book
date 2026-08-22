import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Две задачи.

   Первая. Голый адрес сайта отправляем на версию того языка, на котором
   говорит гость. Переброс намеренно временный: ответ у каждого гостя
   свой, запоминать его навсегда нельзя.

   Вторая. У сайта есть служебный адрес на vercel.app, и он открывает
   ровно то же самое, что настоящий домен. Для поисковика это два сайта
   с одинаковым содержимым, и он начинает выбирать между ними, а сила
   делится надвое. Поэтому все, что открыто не на настоящем домене,
   помечается как "не заносить в поиск". Человеку это ничего не меняет:
   по служебному адресу сайт открывается и работает как прежде.

   Больше этот файл не вмешивается ни во что. Любой адрес, которого
   на сайте нет, обязан честно ответить "страницы нет". Перебрасывать
   неизвестные адреса на главную нельзя: поисковик решит, что по адресу
   что-то есть, хотя там пусто, и перестанет доверять структуре сайта. */

const OPEN_LANGS = ["ru", "es", "en"] as const;
const FALLBACK = "en";

/** Настоящий домен сайта. Все остальное служебное. */
const REAL_HOSTS = ["toddlercoloringbook.com", "www.toddlercoloringbook.com"];

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
  const host = (request.headers.get("host") ?? "").toLowerCase().split(":")[0];
  const isReal = REAL_HOSTS.includes(host);

  const response =
    request.nextUrl.pathname === "/"
      ? NextResponse.redirect(new URL(`/${pickLang(request.headers.get("accept-language") ?? "")}`, request.url))
      : NextResponse.next();

  if (request.nextUrl.pathname === "/") {
    response.headers.set("Vary", "Accept-Language");
  }
  if (!isReal) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

/* Проверяем каждый адрес страницы. Картинки, стили и прочие файлы
   не трогаем: они и так не попадают в поиск отдельными страницами. */
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
