import Link from "next/link";
import { dictionaries, activeLangs, navFor } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";
import { homePath, sectionPath } from "@/lib/routes";
import { euroLangs, euroPath, euroCountry } from "@/data/euro";
import { freeLangs, freePath } from "@/data/free";
import { SITE_NAME, PUBLISHER, catalogUrl, CONTACT_EMAIL } from "@/lib/site";

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
    /* Цифра в имени намеренно. Под прежними именами лежали старые
       картинки, и кеш браузера мог подставить их вместо новых. */
    src: "/banner/top-en-wide-3.webp",
    w: 2388,
    h: 583,
    sm: "/banner/top-en-sm-3.webp",
    smW: 1240,
    smH: 1269,
    alt:
      "First coloring books for toddlers ages 1-3: a practical guide on when to introduce " +
      "crayons and colored pencils and which coloring books work best at this age",
  },
  es: {
    src: "/banner/top-es-wide-3.webp",
    w: 2388,
    h: 570,
    sm: "/banner/top-es-sm-3.webp",
    smW: 1239,
    smH: 1269,
    alt:
      "El primer libro de colorear para bebés de 1 a 3 años: guía práctica sobre cuándo " +
        "empezar a usar crayones y lápices de colores y cómo elegir su primer libro para " +
        "colorear.",
  },
  ru: {
    /* Имя с цифрой по той же причине, что и у английского: под старым
       именем лежала прежняя картинка, и кеш мог подставить ее. */
    src: "/banner/top-ru-wide-3.webp",
    w: 2388,
    h: 557,
    sm: "/banner/top-ru-sm-3.webp",
    smW: 1254,
    smH: 1254,
    alt:
      "Первые раскраски для малышей: все о раскрасках для детей от 1 до 3 лет. Когда " +
        "знакомить ребенка с мелками и карандашами и как выбрать первую раскраску.",
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
            {/* Размеры узкой картинки заданы здесь намеренно. Без них
                браузер на телефоне держит пропорцию широкого баннера,
                примерно четыре к одному, а подставляет почти квадратный:
                шапка резко вырастает и вся страница уезжает вниз. */}
            <source
              media="(max-width: 640px)"
              srcSet={banner.sm}
              width={banner.smW}
              height={banner.smH}
            />
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
          и нейросеть должны на любой странице понимать, чей это сайт.

          Обернута в span с пометкой data-nosnippet. Она не убирает текст
          со страницы и не мешает его читать: она запрещает Google брать
          именно этот кусок в описание под ссылкой в выдаче. Понадобилось
          потому, что у русских страниц Google подставлял под каждой
          ссылкой одну и ту же строку про издательство вместо собственного
          описания страницы, и шесть разных страниц выглядели одинаково.
          Пометка ставится в готовой разметке, а не дописывается потом:
          добавленную позже Google распознает ненадежно. Тег span выбран
          не случайно, пометка действует только на div, span и section. */}
      <p className="footer__about">
        <span data-nosnippet>{t.footer.about}</span>
      </p>
      <p>
        <a href={catalogUrl(lang)} rel="noopener">{t.footer.catalog}</a>
        {" · "}
        {/* Вопросы, права и приватность стоят в подвале, а не в меню.
            Страницы нужные, но не те, ради которых человек пришел, а
            в шапке на телефоне и без них уже две строки. */}
        <Link href={sectionPath(lang, "faq")}>{t.nav.faq}</Link>
        {" · "}
        <Link href={sectionPath(lang, "terms")}>{t.nav.terms}</Link>
        {" · "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        © {new Date().getFullYear()} {PUBLISHER}. {t.footer.rights}
      </p>
      {/* Оговорка о том, чем сайт не является. Стоит здесь, а не только
          на странице прав: человек приходит из поиска сразу на статью и
          до страницы прав может не дойти ни разу. Набрана мельче
          основного текста, но не спрятана. */}
      <p className="footer__disclaimer">
        {t.footer.disclaimer}{" "}
        <Link href={sectionPath(lang, "terms")}>{t.footer.disclaimerLink}</Link>
      </p>
      {/* Восемь страниц для европейских рынков. Строка стоит только
          в русском подвале, и это не случайность.

          Владелец работает на русской версии, и ему эти страницы нужно
          открывать. Русских покупателей у книг нет, поэтому строка
          никому не мешает.

          В английском и испанском подвале ее нет: там ту же работу
          делает видимый блок внизу главной страницы, и делает лучше.

          Пометка "не ходи по этой ссылке" раньше стояла у каждого
          адреса. Ставилась она из опасения, что поисковик достроит
          ряд языковых версий и сочтет немецкую страницу переводом
          английской. Опасение было не по адресу: версией друг друга
          страницы объявляет отдельная служебная запись, а не ссылка.
          Записи этой у нас нет ни на одной из страновых страниц,
          у каждой из них стоит своя собственная основная версия.
          Пометка снята, ссылки работают. */}
      {lang === "ru" ? (
        <p style={{ fontSize: "var(--t-micro)", opacity: 0.8 }}>
          <span data-nosnippet>
            Страницы для Европы:{" "}
            {euroLangs.map((l, i) => (
              <span key={l}>
                {i > 0 ? " · " : ""}
                {euroCountry[l]}{" "}
                <a href={euroPath(l, "en")}>
                  англ
                </a>
                {" / "}
                <a href={euroPath(l, "es")}>
                  исп
                </a>
              </span>
            ))}
            {" · Испания "}
            <a href={euroPath("espana", "en")}>
              англ
            </a>
            {" · Канада "}
            <a href={euroPath("canada", "es")}>
              исп
            </a>
          </span>
        </p>
      ) : null}

      {/* Строка для владельца: восемь страниц бесплатной печати.
          Отдельно от торговых, потому что это другой материал
          и другой запрос: человек ищет не книгу, а листы для печати. */}
      {lang === "ru" ? (
        <p style={{ fontSize: "var(--t-micro)", opacity: 0.8 }}>
          <span data-nosnippet>
            Бесплатная печать:{" "}
            {freeLangs.map((l, i) => (
              <span key={l}>
                {i > 0 ? " · " : ""}
                {euroCountry[l]}{" "}
                <a href={freePath(l, "en")}>
                  англ
                </a>
                {" / "}
                <a href={freePath(l, "es")}>
                  исп
                </a>
              </span>
            ))}
          </span>
        </p>
      ) : null}

      <p style={{ opacity: 0.7, fontSize: "var(--t-micro)" }}>{SITE_NAME}</p>
    </footer>
  );
}
