import Link from "next/link";
import { dictionaries, activeLangs, navFor } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";
import { homePath, sectionPath } from "@/lib/routes";
import { SITE_NAME, PUBLISHER, CATALOG_URL, CONTACT_EMAIL } from "@/lib/site";

/* Шапка сайта. Наверху рисованный баннер книги: название, возраст,
   число рисунков и перечень тем сразу, одной картинкой. Свой баннер
   на каждом языке.

   Баннеры обрезаны сверху и снизу по самому рисунку: в исходных
   файлах сверху и снизу оставались пустые поля, из-за которых шапка
   занимала весь первый экран и обложку книги приходилось искать
   прокруткой. */
const banners: Record<
  UiLang,
  { src: string; w: number; h: number; sm: string; smW: number; smH: number; alt: string }
> = {
  en: {
    /* Имя изменено намеренно. Первый английский баннер лежал под
       именем top-en.jpg и был почти вдвое выше. Новое имя не дает
       кешу браузера и сети подставить старую картинку. */
    src: "/banner/top-en-wide.jpg",
    w: 2172,
    h: 490,
    sm: "/banner/top-en-sm.jpg",
    smW: 1312,
    smH: 440,
    alt:
      "First Coloring Book for Toddlers Ages 1-3: 111 amazing and cute pictures to color. " +
      "Animals, sea animals, fairy-tale characters, food, toys and more",
  },
  es: {
    src: "/banner/top-es.jpg",
    w: 2172,
    h: 487,
    sm: "/banner/top-es-sm.jpg",
    smW: 1418,
    smH: 465,
    alt:
      "El Primer Libro de Colorear para Bebés de 1 a 3 Años: 111 dibujos sorprendentes y " +
      "adorables. Animales, animales marinos, personajes de cuentos, alimentos y juguetes",
  },
  ru: {
    /* Имя с цифрой по той же причине, что и у английского: под старым
       именем лежала прежняя картинка, и кеш мог подставить ее. */
    src: "/banner/top-ru-2.jpg",
    w: 1893,
    h: 427,
    sm: "/banner/top-ru-sm.jpg",
    smW: 1223,
    smH: 401,
    alt:
      "Первая книга-раскраска для малышей 1-3 года: 111 удивительных и милых рисунков. " +
      "Животные, морские обитатели, сказочные персонажи, продукты и игрушки",
  },
};

export function Header({ lang }: { lang: UiLang }) {
  const t = dictionaries[lang];
  const banner = banners[lang];
  return (
    <header>
      <div className="masthead masthead--art">
        {/* На телефоне широкий баннер сжимается в полоску: лев и рыбка
            становятся крошечными, а надпись почти нечитаемой. Поэтому
            там показывается только сама надпись, крупно. Браузер
            выбирает картинку сам и лишнюю не скачивает. */}
        <Link className="masthead__banner" href={homePath(lang)}>
          <picture>
            <source media="(max-width: 640px)" srcSet={banner.sm} />
            <img
              src={banner.src}
              alt={banner.alt}
              width={banner.w}
              height={banner.h}
              fetchPriority="high"
            />
          </picture>
        </Link>

      </div>

      {/* Меню и языки в одной полосе: слева разделы, справа язык.
          Раздела "книга" в меню нет, книга это и есть главная. */}
      <nav className="nav" aria-label={lang === "en" ? "Main" : lang === "es" ? "Principal" : "Основное"}>
        <ul>
          {navFor(lang).map((s) => (
            <li key={s}>
              <Link href={sectionPath(lang, s)}>{t.nav[s]}</Link>
            </li>
          ))}
        </ul>

        {/* Язык одной кнопкой. Три языка подряд занимали отдельную
            строку, а нужны они немногим: человек, пришедший из поиска
            на своем языке, уже на нужной версии.

            Связь языковых версий между собой при этом не теряется:
            ее держат служебные записи в заголовке страницы и карта
            сайта, а не эти ссылки.

            Раскрывается без единой строки скриптов: обычный
            раскрывающийся блок, он работает и когда скрипты
            выключены. */}
        <details className="langpick">
          <summary aria-label={
            lang === "en" ? "Language" : lang === "es" ? "Idioma" : "Язык"
          }>
            {dictionaries[lang].langName}
          </summary>
          <ul>
            {activeLangs
              .filter((x) => x !== lang)
              .map((x) => (
                <li key={x}>
                  <Link href={homePath(x)} hrefLang={x}>
                    {dictionaries[x].langName}
                  </Link>
                </li>
              ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}

export function Footer({ lang }: { lang: UiLang }) {
  const t = dictionaries[lang];
  return (
    <footer className="footer">
      {/* Строка о том, кто мы. Стоит на каждой странице: и человек,
          и нейросеть должны на любой странице понимать, чей это сайт. */}
      <p className="footer__about">{t.footer.about}</p>
      <p>
        <a href={CATALOG_URL} rel="noopener">{t.footer.catalog}</a>
        {" · "}
        {/* Права и приватность стоят в подвале, а не в меню: страница
            нужная, но не та, ради которой человек пришел. */}
        <Link href={sectionPath(lang, "terms")}>{t.nav.terms}</Link>
        {" · "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        © {new Date().getFullYear()} {PUBLISHER}. {t.footer.rights}
      </p>
      <p style={{ opacity: 0.7, fontSize: "var(--t-micro)" }}>{SITE_NAME}</p>
    </footer>
  );
}
