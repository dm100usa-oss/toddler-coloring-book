import type { Metadata } from "next";
import Link from "next/link";
import { sheets, sheetPreview, sheetPdf, sheetsPdfAll } from "@/data/sheets";
import { euroUi, euroPath, type EuroLang, type EditionLang } from "@/data/euro";
import { freeCopyOf, freePath } from "@/data/free";
import { SITE_URL, PUBLISHER, ADDRESS } from "@/lib/site";

/* Страница бесплатной печати. Одна из восьми.

   Человек пришел сюда из поиска по запросу "распечатать раскраски
   бесплатно". Он не искал книгу и книгу ему сейчас никто не
   предлагает: он получает ровно то, за чем шел, десять настоящих
   листов, сразу, без регистрации.

   Продажа случится не здесь. Ссылка на книгу стоит ровно в трех
   местах: строка над заголовком, первый абзац и блок внизу. Больше
   ставить нельзя, иначе страница читается как реклама и человек
   уходит, не распечатав ни листа.

   Ссылка всегда ведет на торговую страницу той же страны и того же
   издания: немецкая страница с английскими листами на немецкую
   торговую про английскую книгу.

   Листы показаны картинками, а не спрятаны за одну кнопку. Причин
   две. Человек выбирает глазами, одному нужен лев, другому кенгуру.
   И десять подписей это десять отдельных попаданий в поиске
   картинок: по запросу "раскраска лев распечатать" человек может
   прийти прямо на нашу картинку. Кнопка "скачать все" стоит ниже,
   для того, кто уже решил.

   Оформление берется у торговых страниц, шапка та же самая. Своя
   часть тут только одна: подписи под листами, которых на торговой
   странице нет намеренно.

   Листы берутся на языке книги, а не страницы. На немецкой странице
   про английское издание под львом стоит Lion. Человек печатает
   ровно то, что купит. Только A4: американский формат Letter
   в Европе не нужен. */

export function freeMetadata(lang: EuroLang, ed: EditionLang): Metadata {
  const c = freeCopyOf(lang, ed);
  const u = euroUi[lang];
  const url = `${SITE_URL}${freePath(lang, ed)}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    /* Своя единственная основная версия, как и у торговых страниц.
       hreflang не ставится: это не переводы друг друга, а разные
       материалы для разных стран. */
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: u.locale,
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      /* Первый лист вместо обложки. Страница про печать, и в ленте
         мессенджера должна разворачиваться раскраска, а не книга. */
      images: [
        {
          url: `${SITE_URL}${sheetPreview(sheets[0].id, ed)}`,
          width: 642,
          height: 822,
          alt: u.freeAlt(u.animals[sheets[0].id] ?? sheets[0].name.en),
        },
      ],
    },
  };
}

export default function FreePage({
  lang,
  ed,
}: {
  lang: EuroLang;
  ed: EditionLang;
}) {
  const u = euroUi[lang];
  const c = freeCopyOf(lang, ed);
  const url = `${SITE_URL}${freePath(lang, ed)}`;
  const bookUrl = euroPath(lang, ed);
  const allPdf = sheetsPdfAll(ed);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: c.metaTitle,
        description: c.metaDescription,
        /* Язык страницы, а не книги. Немецкая страница про английские
           слова остается немецкой страницей. */
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
      },
      /* Десять листов списком. Каждый со своим адресом файла:
         так поисковик понимает, что на странице лежат десять
         отдельных вещей, которые можно скачать, а не одна. */
      {
        "@type": "ItemList",
        name: c.sheetsTitle,
        numberOfItems: sheets.length,
        itemListElement: sheets.map((sh, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "DigitalDocument",
            name: u.animals[sh.id] ?? sh.name.en,
            url: `${SITE_URL}${sheetPdf(sh.id, ed, "a4")}`,
            encodingFormat: "application/pdf",
            inLanguage: ed,
            isAccessibleForFree: true,
            publisher: { "@id": `${SITE_URL}/#publisher` },
          },
        })),
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
      {/* Та же полоса, что на торговых страницах. Название книги
          в мелкой строке стоит ссылкой: это первое из трех мест,
          откуда человек может уйти к книге, и единственное, которое
          он видит, не прокрутив ни строки. */}
      <header className="euro-head free-head">
        <p className="euro-head__top">
          <Link href={bookUrl}>{c.head.top}</Link>
        </p>
        <h1 className="euro-head__title">{c.head.title}</h1>
        <p className="euro-head__bottom">{c.head.bottom}</p>
      </header>

      <div className="wrap">
        <div className="book-body free-body">
          {/* ============ Три абзаца ============ */}
          {c.lead.map((part, i) => (
            <p className="why-text" key={part.slice(0, 24)}>
              {part}
              {/* Ссылка на книгу внутри первого абзаца, отдельной
                  строкой после него: внутри текста она бы уводила
                  человека прямо с первых слов. */}
              {i === 0 ? (
                <>
                  {" "}
                  <Link className="free-inline-link" href={bookUrl}>
                    {c.bookLink}
                  </Link>
                </>
              ) : null}
            </p>
          ))}

          {/* ============ Десять листов ============ */}
          <h2 className="section">{c.sheetsTitle}</h2>
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
                  {/* Подпись настоящим текстом, а не только в описании
                      картинки: по ней лист находит обычный поиск,
                      а не только поиск картинок. */}
                  <figcaption className="sheet__cap">
                    {c.sheetCaption(name)}
                  </figcaption>
                  <p className="sheet__links">
                    <a className="btn btn--sky" href={file} download>
                      {u.freeDownload}
                    </a>
                  </p>
                </figure>
              );
            })}
          </div>

          {/* ============ Все десять одним файлом ============ */}
          <p className="btn-row free-all">
            <a className="btn btn--mint" href={allPdf} download>
              {c.downloadAll}
            </a>
          </p>
          <p className="buy-note">{c.formatNote}</p>

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

          {/* ============ Книга ============ */}
          {/* Третье и последнее место со ссылкой на книгу. Человек
              уже распечатал лист и знает, что внутри. Только теперь
              предложение купить книгу отвечает на его собственный
              вопрос, а не перебивает его. */}
          <div className="free-book">
            <h2 className="section">{c.bottomTitle}</h2>
            <p>{c.bottomText}</p>
            <p className="btn-row">
              <Link className="btn btn--pink" href={bookUrl}>
                {c.bookLink}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ============ Подвал ============ */}
      {/* Тот же короткий подвал, что у торговых страниц: меню сайта
          и переключатель трех языков сюда не идут. */}
      <footer className="footer">
        <p className="footer__about">
          <span data-nosnippet>{u.footerAbout}</span>
        </p>
        <p>
          <a href={`${SITE_URL}${u.footerLinkHref ?? "/en"}`} rel="noopener">
            {u.footerLink}
          </a>
          {u.footerLinkNote ? (
            <>
              {" "}
              <span style={{ opacity: 0.75 }}>({u.footerLinkNote})</span>
            </>
          ) : null}
        </p>
        <p>
          © {new Date().getFullYear()} {PUBLISHER}
        </p>
      </footer>
    </>
  );
}
