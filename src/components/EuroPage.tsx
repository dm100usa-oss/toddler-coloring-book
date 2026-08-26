import type { Metadata } from "next";
import Link from "next/link";
import { editions } from "@/data/book";
import { sheets, sheetPreview, sheetPdf } from "@/data/sheets";
import {
  euroUi,
  euroCopy,
  euroArt,
  euroBook,
  euroPath,
  euroPrice,
  euroAmazonUrl,
  BOOK_SIZE_CM,
  type EuroLang,
  type EditionLang,
} from "@/data/euro";
import { SITE_URL, PUBLISHER, ADDRESS, AUTHOR, CATALOG_URL } from "@/lib/site";

/* Одна страница из восьми. Устроена так же, как страница книги
   в каталоге издательства: обложка слева, три главных факта, текст,
   цена и оценка, полоса с баннером и рисунками, кнопки покупки,
   что внутри, кому подходит, что говорят родители, отзыв площадки,
   таблица с данными, вопросы.

   Отличий от каталога два, и оба намеренные.

   Первое: своя шапка и свой подвал. Меню сайта, переключатель трех
   языков и подвал с разделами сюда не идут, иначе немецкая страница
   уводила бы человека на английские разделы, которых он не поймет.

   Второе: наверху стоит нарисованный баннер на языке страницы, а те же
   слова повторяются настоящими буквами в скрытом блоке. Так сделано
   на главной сайта и по той же причине: в картинке поисковик не читает
   ни буквы, а это самая крупная надпись страницы. Пока баннер не
   нарисован, те же три строки показываются на экране обычным текстом:
   страница без заголовка хуже страницы без картинки. */

export function euroMetadata(lang: EuroLang, ed: EditionLang): Metadata {
  const c = euroCopy[lang][ed];
  const u = euroUi[lang];
  const url = `${SITE_URL}${euroPath(lang, ed)}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    /* Своя единственная основная версия. Связывать эту страницу
       с другими языками нечем: равнозначного перевода у нее нет.
       Немецкая страница про английскую книгу и немецкая про
       испанскую это два разных материала, а не перевод друг друга. */
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: u.locale,
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      images: [
        {
          url: `${SITE_URL}${euroArt[ed].cover}`,
          width: euroArt[ed].coverSize.w,
          height: euroArt[ed].coverSize.h,
          alt: c.altCover,
        },
      ],
    },
  };
}

function fmtDate(iso: string, locale: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function Buy({ lang, ed }: { lang: EuroLang; ed: EditionLang }) {
  const u = euroUi[lang];
  const b = euroBook(ed);
  return (
    <p className="buys">
      <span className="top-price">
        <span className="top-price__value">{euroPrice[lang]}</span>
        <span className="top-price__label">{u.priceLabel}</span>
      </span>
      <a
        className="btn btn--pink"
        href={euroAmazonUrl(lang, b.asin)}
        rel="nofollow sponsored noopener"
        target="_blank"
      >
        {u.buyAmazon}
      </a>
      {/* Вторая кнопка ведет не наружу, а вниз по этой же странице,
          к десяти листам из книги. Раньше здесь стоял адрес страницы
          с файлом на Wix: она английская и в долларах, и человек
          попадал не туда, куда шел. */}
      <a className="btn btn--sky" href="#gratis">
        {u.buyFree}
      </a>
    </p>
  );
}

export default function EuroPage({
  lang,
  ed,
}: {
  lang: EuroLang;
  ed: EditionLang;
}) {
  const u = euroUi[lang];
  const c = euroCopy[lang][ed];
  const art = euroArt[ed];
  const b = euroBook(ed);
  const other: EditionLang = ed === "en" ? "es" : "en";
  const url = `${SITE_URL}${euroPath(lang, ed)}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: c.metaTitle,
        description: c.metaDescription,
        /* Язык самой страницы, а не книги. Это два разных языка,
           и разделять их важно: страница немецкая, книга английская. */
        inLanguage: u.htmlLang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#publisher` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#publisher`,
        name: PUBLISHER,
        url: SITE_URL,
        address: ADDRESS,
        sameAs: [CATALOG_URL],
      },
      {
        "@type": "Book",
        name: editions[ed].title,
        author: { "@type": "Person", name: AUTHOR.name, sameAs: [AUTHOR.amazon] },
        publisher: { "@type": "Organization", name: PUBLISHER, address: ADDRESS },
        /* Язык книги: слова под рисунками. */
        inLanguage: ed,
        isbn: b.isbn,
        numberOfPages: b.pages,
        bookFormat: "https://schema.org/Paperback",
        datePublished: b.published,
        typicalAgeRange: b.ages,
        image: `${SITE_URL}${art.cover}`,
        description: c.lead.join(" "),
        sameAs: [
          editions[ed].wikidata
            ? `https://www.wikidata.org/wiki/${editions[ed].wikidata}`
            : undefined,
          euroAmazonUrl(lang, b.asin),
        ].filter(Boolean),
      },
      {
        "@type": "FAQPage",
        inLanguage: u.htmlLang,
        mainEntity: c.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ============ Шапка ============ */}
      {/* Три строки настоящим текстом: мелкая сверху, крупное название,
          пояснение снизу. Картинки здесь нет намеренно. Нарисованный
          баннер поисковик не читает, и на главной сайта из-за этого
          приходится держать те же слова отдельным скрытым блоком.
          Тут надпись сразу настоящая, и она же главный признак того,
          что страница немецкая, французская, голландская или польская. */}
      <header className="euro-head">
        <p className="euro-head__top">{c.head.top}</p>
        <h1 className="euro-head__title">{c.head.title}</h1>
        <p className="euro-head__bottom">{c.head.bottom}</p>
      </header>

      {/* ============ Книга ============ */}
      <div className="wrap">
        <div className="book">
          <div className="book__cover">
            <div className="inner">
              <img
                src={art.cover}
                alt={c.altCover}
                width={art.coverSize.w}
                height={art.coverSize.h}
                fetchPriority="high"
              />
            </div>
          </div>

          <div>
            <h2 className="book__title">{c.title}</h2>
            <p className="subtitle">{c.subtitle}</p>

            {/* Три главных факта сразу, до всякого текста. */}
            <ul className="quick-facts">
              {c.inside.slice(0, 3).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            {c.lead.map((part) => (
              <p className="why-text" key={part.slice(0, 24)}>
                {part}
              </p>
            ))}

            <ul className="key-specs">
              <li>
                <span className="key-specs__label">{u.labelAge}</span>
                <span className="key-specs__value">{b.ages}</span>
              </li>
              <li>
                <span className="key-specs__label">{u.labelDrawings}</span>
                <span className="key-specs__value">{b.drawings}</span>
              </li>
              <li>
                <span className="key-specs__label">{u.labelPages}</span>
                <span className="key-specs__value">{b.pages}</span>
              </li>
              <li>
                <span className="key-specs__label">{u.labelSize}</span>
                <span className="key-specs__value">{BOOK_SIZE_CM}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="book-body">
          {/* Полоса с баннером книги и тремя рисунками. Надписи на них
              английские или испанские, и это правда: так называется
              сама книга, и покупатель должен узнать ее на Amazon. */}
          <div className="showcase">
            <img
              className="theme-banner"
              src={art.bannerLead}
              alt={c.altBannerLead}
              width={1941}
              height={601}
              loading="lazy"
            />
            <div className="artwork">
              {art.art.map((file, i) => (
                <img
                  key={file}
                  src={file}
                  alt={c.altArt[i]}
                  width={601}
                  height={601}
                  loading="lazy"
                />
              ))}
            </div>
            <img
              className="theme-banner"
              src={art.gift}
              alt={c.altGift}
              width={1941}
              height={601}
              loading="lazy"
            />
          </div>

          {/* ============ Покупка, первое из двух мест ============ */}
          <div className="buy-block">
            <Buy lang={lang} ed={ed} />
            <p className="buy-note">{u.buyNote}</p>
          </div>

          {/* ============ Для кого ============ */}
          <h2 className="section">{u.forWhom}</h2>
          <p>{c.forWhom}</p>

          {/* ============ Что внутри ============ */}
          <h2 className="section">{u.inside}</h2>
          <ul className="inside">
            {c.inside.slice(3).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          {/* ============ Что говорят родители ============ */}
          {/* Написано нами по смыслу отзывов на Amazon, своими словами
              и без имен: чужой текст в кавычках это чужая собственность. */}
          <h2 className="section">{u.parents}</h2>
          <ul className="needs">
            {c.parents.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          {/* ============ Оценки ============ */}
          <h2 className="section">{u.ratingTitle}</h2>
          <p>{c.rating}</p>

          <h2 className="section">{u.criticTitle}</h2>
          <p>{c.critic}</p>
          <p className="btn-row">
            <a
              className="btn btn--ghost"
              href="https://readersfavorite.com/book-review/first-coloring-book-for-toddlers-ages-1-3"
              rel="nofollow noopener"
              target="_blank"
            >
              {u.criticSource}
            </a>
          </p>

          {/* ============ Покупка, второе из двух мест ============ */}
          {/* Человек уже посмотрел книгу внутри и прочитал, что о ней
              говорят. Это и есть минута, когда решение принимается. */}
          <div className="buy-block">
            <Buy lang={lang} ed={ed} />
            <p className="buy-note">{u.buyNote}</p>
          </div>

          {/* ============ Данные книги ============ */}
          <div className="specs">
            <dl>
              <dt>{u.labelAge}</dt>
              <dd>{b.ages}</dd>
              <dt>{u.labelDrawings}</dt>
              <dd>{b.drawings}</dd>
              <dt>{u.labelPages}</dt>
              <dd>{b.pages}</dd>
              <dt>{u.labelSize}</dt>
              <dd>{BOOK_SIZE_CM}</dd>
              <dt>{u.labelPublished}</dt>
              <dd>{fmtDate(b.published, u.locale)}</dd>
              <dt>ISBN</dt>
              <dd>{b.isbn}</dd>
              <dt>{u.labelAuthor}</dt>
              <dd>
                <a href={AUTHOR.amazon} rel="nofollow noopener" target="_blank">
                  {AUTHOR.name}
                </a>
              </dd>
              <dt>{u.labelPublisher}</dt>
              <dd>{PUBLISHER}</dd>
            </dl>
          </div>

          {/* ============ Вопросы ============ */}
          <h2 className="section">{u.faq}</h2>
          <div className="faq">
            {c.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          {/* ============ Десять листов из книги ============ */}
          {/* Вся страница выше это слова: контур толстый, рисунок
              крупный, слово одно и понятное. Лист, распечатанный дома,
              это доказательство, и родитель получает ответ за пять
              минут. Листы берутся на языке самой книги: на немецкой
              странице про английское издание под львом стоит Lion,
              про испанское Leon. Человек печатает ровно то, что купит.

              Только A4. Американский формат Letter в Европе не нужен
              и заставлял бы выбирать из двух кнопок вслепую. */}
          {/* Подписей с названием зверя под листами нет намеренно:
              на рисунке и так видно, кто это, а десять подписей подряд
              только загромождали бы блок. Название осталось в описании
              картинки, которого человек не видит: по нему эти листы
              находит поиск картинок на своем языке. */}
          <h2 className="section" id="gratis">{u.freeTitle}</h2>
          <p className="lead">{u.freeLead}</p>
          <div className="sheets">
            {sheets.map((sh) => {
              const name = u.animals[sh.id] ?? sh.name.en;
              const file = sheetPdf(sh.id, ed, "a4");
              return (
                <figure className="sheet" key={sh.id}>
                  <a className="sheet__link" href={file} download>
                    <img
                      src={sheetPreview(sh.id, ed)}
                      alt={u.freeAlt(name)}
                      width={642}
                      height={822}
                      loading="lazy"
                    />
                  </a>
                  <p className="sheet__links">
                    <a className="btn btn--sky" href={file} download>
                      {u.freeDownload}
                    </a>
                  </p>
                </figure>
              );
            })}
          </div>
          <p className="buy-note">{u.freeFormat}</p>

          {/* ============ Вторая книга ============ */}
          {/* Строкой, а не карточкой: карточка спорила бы с той книгой,
              ради которой человек пришел. */}
          <p className="teach-other" style={{ marginTop: "var(--gap-4)" }}>
            <span>{c.pair}</span>
            <Link className="btn btn--mint" href={euroPath(lang, other)}>
              {c.pairCta}
            </Link>
          </p>
        </div>
      </div>

      {/* ============ Подвал ============ */}
      <footer className="footer">
        <p className="footer__about">
          <span data-nosnippet>{u.footerAbout}</span>
        </p>
        <p>
          <a href={`${SITE_URL}/en`} rel="noopener">
            {u.footerLink}
          </a>{" "}
          <span style={{ opacity: 0.75 }}>({u.footerLinkNote})</span>
        </p>
        <p>
          © {new Date().getFullYear()} {PUBLISHER}
        </p>
      </footer>
    </>
  );
}
