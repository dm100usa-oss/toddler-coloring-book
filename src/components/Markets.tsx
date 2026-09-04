import Link from "next/link";
import { euroLangs, euroPath, euroSinglePages } from "@/data/euro";
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

/** Одна строка блока: страна и одна или две ссылки. */
type Row = {
  key: string;
  country: string;
  links: { href: string; label: string }[];
};

function rowsFor(lang: UiLang, kind: "book" | "free"): Row[] {
  const m = dictionaries[lang].markets;
  const words = { en: m.wordsEn, es: m.wordsEs };
  const path = kind === "book" ? euroPath : freePath;

  /* Страны, у которых по две страницы: одна книга со словами
     на английском, другая на испанском. */
  const both: Row[] = (kind === "book" ? euroLangs : freeLangs).map((l) => ({
    key: l,
    country: m.country[l as keyof typeof m.country],
    links: (["en", "es"] as const).map((ed) => ({
      href: path(l, ed),
      label: words[ed],
    })),
  }));

  /* Испания и Канада: страница одна. Испанцу испанские слова не нужны,
     канадцу английские. Страниц бесплатной печати у них нет вовсе:
     язык там испанский и английский, и такие страницы уже есть
     в основном разделе сайта. */
  const single: Row[] =
    kind === "book"
      ? euroSinglePages.map(({ lang: l, ed }) => ({
          key: l,
          country: m.country[l as keyof typeof m.country],
          links: [{ href: euroPath(l, ed), label: words[ed] }],
        }))
      : [];

  return [...both, ...single];
}

function MarketsBlock({
  lang,
  kind,
}: {
  lang: UiLang;
  kind: "book" | "free";
}) {
  const m = dictionaries[lang].markets;
  const rows = rowsFor(lang, kind);

  return (
    <section className="band band--cream">
      <div className="wrap">
        <h2 className="section">
          {kind === "book" ? m.bookTitle : m.freeTitle}
        </h2>
        <p className="lead">{m.note}</p>
        <ul className="markets">
          {rows.map((row) => (
            <li key={row.key}>
              <b>
                <Flag code={marketFlag[row.key]} />
                {row.country}
              </b>
              <span>
                {row.links.map((a, i) => (
                  <span key={a.href}>
                    {i > 0 ? " · " : ""}
                    {/* hrefLang не ставим намеренно. Он говорит, что по
                        ссылке лежит перевод этой же страницы, а там
                        другой материал: страница одной книги для одной
                        страны. */}
                    <Link href={a.href}>{a.label}</Link>
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

/* ---------------------------------------------------------------------------
   Где продается бумажная книга.

   Четырнадцать магазинов Amazon. Список не выдуман: он взят со страницы
   помощи KDP и сверен с личным кабинетом издательства, где у обеих
   бумажных книг стоят права на весь мир.

   Зачем это на странице. Человек, впервые увидевший книгу, не знает,
   издание перед ним или чья-то самоделка. Четырнадцать магазинов, в
   каждый из которых можно нажать и проверить, отвечают на этот вопрос
   без единого хвалебного слова.

   У русского издания бумаги нет вовсе: Amazon не печатает по-русски.
   На русской странице блок остается, потому что книга та же самая и те
   же 111 рисунков, но об этом сказано прямо, отдельной строкой, и
   ссылки ведут на английское издание.
--------------------------------------------------------------------------- */

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

export function MarketsStores({ lang }: { lang: UiLang }) {
  const m = dictionaries[lang].markets;

  /* Своя бумажная книга есть у английского и испанского изданий.
     У русского нет, и тогда ведем на английское. */
  const asin = editions[lang].asin ?? editions.en.asin;
  if (!asin) return null;

  const keys = Object.keys(m.store) as (keyof typeof m.store)[];

  return (
    <section className="band">
      <div className="wrap">
        <h2 className="section">{m.storesTitle}</h2>
        <p className="lead lead--wide">{m.storesLead}</p>
        <ul className="stores">
          {keys.map((k) => (
            <li key={k}>
              <a
                href={`https://${storeHost[k]}/dp/${asin}`}
                rel="nofollow sponsored noopener"
                target="_blank"
              >
                <Flag code={storeFlag[k]} />
                {m.store[k]}
              </a>
            </li>
          ))}
        </ul>
        {m.storesNote ? <p className="stores__note">{m.storesNote}</p> : null}
      </div>
    </section>
  );
}

/** Книга в других странах. Стоит внизу главной страницы. */
export function MarketsBook({ lang }: { lang: UiLang }) {
  return <MarketsBlock lang={lang} kind="book" />;
}

/** Бесплатные раскраски в других странах. Стоит внизу раздела печати. */
export function MarketsFree({ lang }: { lang: UiLang }) {
  return <MarketsBlock lang={lang} kind="free" />;
}
