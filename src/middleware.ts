import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Что делает этот файл: одно и только одно.

   Голый адрес сайта отправляем на версию того языка, на котором говорит
   гость. Переброс намеренно временный: ответ у каждого гостя свой,
   запоминать его навсегда нельзя.

   Раньше здесь была вторая задача: помечать служебный адрес на vercel.app
   как "не заносить в поиск". Ради нее файл перехватывал каждое обращение
   ко всем страницам сайта. Это лишняя работа на каждом заходе, и на
   бесплатном тарифе она расходуется быстрее всего. Теперь та же пометка
   стоит в настройках сайта, в next.config.mjs, где она ничего не запускает.
   Так же устроено на magicofdiscoveries.com и на ricardo-demi.com.

   Любой адрес, которого на сайте нет, обязан честно ответить "страницы
   нет". Перебрасывать неизвестные адреса на главную нельзя: поисковик
   решит, что по адресу что-то есть, хотя там пусто, и перестанет
   доверять структуре сайта. */

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
  const response = NextResponse.redirect(
    new URL(`/${pickLang(request.headers.get("accept-language") ?? "")}`, request.url)
  );
  /* Ответ зависит от языка гостя, поэтому раздавать всем один и тот же нельзя. */
  response.headers.set("Vary", "Accept-Language");
  return response;
}

/* Только главная. Так же, как на magicofdiscoveries.com. */
export const config = { matcher: "/" };
