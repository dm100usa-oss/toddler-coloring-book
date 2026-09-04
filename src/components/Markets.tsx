import Link from "next/link";
import { euroPath } from "@/data/euro";
import type { EuroLang } from "@/data/euro";
import { freeLangs, freePath } from "@/data/free";
import { dictionaries } from "@/data/dictionaries";
import { editions } from "@/data/book";
import type { UiLang } from "@/data/dictionaries";

/* ---------------------------------------------------------------------------
   Страницы других стран, ссылками из основного сайта.

   Зачем это здесь. У книги есть отдельные страницы для Германии,
   Франции, Голландии, Польши, Италии, Испании и Канады, написанные
   на языке своей страны. Раньше попасть на них с сайта было нельзя:
   поисковик знал о них только из карты сайта, а человек не знал вовсе.

   Google прямо советует давать читателю возможность выбрать свою
   страну или язык: гость нередко попадает не на ту версию, и выход
   ему нужен. Заодно ссылка изнутри показывает поисковику, что эти
   страницы сайт считает своими.

   Чего этот блок не делает: он не объявляет страницы переводами
   друг друга. Обычная ссылка такого не значит, и служебные пометки
   языковых версий остаются на месте нетронутыми. Немецкая страница
   как была самостоятельной, так и остается.

   Блок стоит только на двух страницах каждого языка: на главной,
   где человек решает про книгу, и на странице бесплатной печати.
   На всех восьмидесяти страницах справочника он был бы мусором.
--------------------------------------------------------------------------- */

/* Флаги стран. Взяты из открытого набора flag-icons, лицензия MIT,
   лежат картинками в public/flags. Значками системы их рисовать нельзя:
   на Windows вместо флага показываются две серые буквы, а Windows
   у доброй половины читателей.

   Флаг здесь украшение, а не смысл: рядом всегда стоит название
   страны словами, поэтому подпись к картинке пустая и голосовой
   читалке она не мешает. */
function Flag({ code }: { code: string }) {
  return (
    <img
      className="flag"
      src={`/flags/${code}.svg`}
      alt=""
      width={24}
      height={18}
      loading="lazy"
    />
  );
}

/** Флаг страны для блока страновых страниц. */
const marketFlag: Record<string, string> = {
  de: "de",
  fr: "fr",
  nl: "nl",
  pl: "pl",
  it: "it",
  espana: "es",
  canada: "ca",
};

/** Флаг страны для блока магазинов. Великобритания в наборе gb. */
const storeFlag: Record<string, string> = {
  us: "us",
  uk: "gb",
  de: "de",
  fr: "fr",
  es: "es",
  it: "it",
  nl: "nl",
  pl: "pl",
  se: "se",
  be: "be",
  ie: "ie",
  jp: "jp",
  ca: "ca",
  au: "au",
};

/** Одна карточка блока: страна, наши страницы и магазин Amazon. */
type Row = {
  key: string;
  flag: string;
  country: string;
  /** Наши страницы про эту книгу на языке страны. Есть не у всех. */
  pages: { href: string; label: string }[];
  /** Магазин Amazon этой страны. Есть у всех четырнадцати. */
  store: string;
};

/** Адрес магазина Amazon в каждой стране. */
const storeHost: Record<string, string> = {
  us: "www.amazon.com",
  uk: "www.amazon.co.uk",
  de: "www.amazon.de",
  fr: "www.amazon.fr",
  es: "www.amazon.es",
  it: "www.amazon.it",
  nl: "www.amazon.nl",
  pl: "www.amazon.pl",
  se: "www.amazon.se",
  be: "www.amazon.com.be",
  ie: "www.amazon.ie",
  jp: "www.amazon.co.jp",
  ca: "www.amazon.ca",
  au: "www.amazon.com.au",
};

/* У какой страны есть наши страницы и под каким ключом они лежат.
   Германия, Франция, Голландия, Польша и Италия имеют по две:
   про книгу с английскими словами и про книгу с испанскими.
   У Испании только английская, у Канады только испанская:
   испанцу испанские слова не нужны, канадцу английские. */
const ourPages: Record<string, EuroLang> = {
  de: "de",
  fr: "fr",
  nl: "nl",
  pl: "pl",
  it: "it",
  es: "espana",
  ca: "canada",
};

function bookRows(lang: UiLang): Row[] {
  const m = dictionaries[lang].markets;
  const words = { en: m.wordsEn, es: m.wordsEs };
  const keys = Object.keys(m.store) as (keyof typeof m.store)[];

  return keys.map((k) => {
    const euro = ourPages[k];
    let pages: Row["pages"] = [];

    if (euro === "espana") {
      pages = [{ href: euroPath(euro, "en"), label: words.en }];
    } else if (euro === "canada") {
      pages = [{ href: euroPath(euro, "es"), label: words.es }];
    } else if (euro) {
      pages = (["en", "es"] as const).map((ed) => ({
        href: euroPath(euro, ed),
        label: words[ed],
      }));
    }

    return {
      key: k,
      flag: storeFlag[k],
      country: m.store[k],
      pages,
      store: storeHost[k],
    };
  });
}

/* ---------------------------------------------------------------------------
   Книга в других странах.

   Один блок вместо двух. Раньше рядом стояли "где продается бумажная
   книга" и "книга в других странах": оба про страны, оба с флагами,
   и они спорили друг с другом.

   Теперь одна карточка на страну. Внутри две вещи, и они разные:
   ссылки на наши страницы, написанные на языке страны, и ссылка
   в магазин Amazon этой страны. Страниц у нас семь, магазинов
   четырнадцать.

   Ссылка в магазин ведет на издание того языка, на котором открыт
   сайт. У русской страницы своего бумажного издания нет, Amazon не
   печатает по-русски, поэтому там ведем на английское. Отдельной
   оговорки об этом не пишем: она была длиннее самой пользы.

   hrefLang на наши страницы не ставим намеренно. Он говорит, что по
   ссылке лежит перевод этой же страницы, а там другой материал.
--------------------------------------------------------------------------- */
export function MarketsBook({ lang }: { lang: UiLang }) {
  const m = dictionaries[lang].markets;
  const asin = editions[lang].asin ?? editions.en.asin;
  const rows = bookRows(lang);

  return (
    <section className="band band--cream">
      <div className="wrap">
        <h2 className="section">{m.bookTitle}</h2>
        <p className="lead lead--wide">{m.note}</p>
        <ul className="markets">
          {rows.map((row) => (
            <li key={row.key}>
              <b>
                <Flag code={row.flag} />
                {row.country}
              </b>
              {row.pages.length ? (
                <span className="markets__pages">
                  {row.pages.map((a, i) => (
                    <span key={a.href}>
                      {i > 0 ? " · " : ""}
                      <Link href={a.href}>{a.label}</Link>
                    </span>
                  ))}
                </span>
              ) : null}
              {asin ? (
                <span className="markets__store">
                  <a
                    href={`https://${row.store}/dp/${asin}`}
                    rel="nofollow sponsored noopener"
                    target="_blank"
                  >
                    {row.store.replace(/^www\./, "")}
                  </a>
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Бесплатные раскраски в других странах.

   Стоит внизу раздела печати. Здесь только наши страницы и никакого
   Amazon: листы бесплатные, покупать нечего. Стран пять: у Испании
   и Канады страниц печати нет вовсе, там язык испанский и английский,
   и такие страницы уже есть в основном разделе сайта.
--------------------------------------------------------------------------- */
export function MarketsFree({ lang }: { lang: UiLang }) {
  const m = dictionaries[lang].markets;
  const words = { en: m.wordsEn, es: m.wordsEs };

  return (
    <section className="band band--cream">
      <div className="wrap">
        <h2 className="section">{m.freeTitle}</h2>
        <ul className="markets">
          {freeLangs.map((l) => (
            <li key={l}>
              <b>
                <Flag code={marketFlag[l]} />
                {m.country[l as keyof typeof m.country]}
              </b>
              <span className="markets__pages">
                {(["en", "es"] as const).map((ed, i) => (
                  <span key={ed}>
                    {i > 0 ? " · " : ""}
                    <Link href={freePath(l, ed)}>{words[ed]}</Link>
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
