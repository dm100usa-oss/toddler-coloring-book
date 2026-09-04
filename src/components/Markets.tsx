import Link from "next/link";
import { euroLangs, euroPath, euroSinglePages } from "@/data/euro";
import { freeLangs, freePath } from "@/data/free";
import { dictionaries } from "@/data/dictionaries";
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
              <b>{row.country}</b>
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

/** Книга в других странах. Стоит внизу главной страницы. */
export function MarketsBook({ lang }: { lang: UiLang }) {
  return <MarketsBlock lang={lang} kind="book" />;
}

/** Бесплатные раскраски в других странах. Стоит внизу раздела печати. */
export function MarketsFree({ lang }: { lang: UiLang }) {
  return <MarketsBlock lang={lang} kind="free" />;
}
