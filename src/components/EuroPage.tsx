import type { Metadata } from "next";
import Link from "next/link";
import { editions } from "@/data/book";
import { sheets, sheetPreview, sheetPdf } from "@/data/sheets";
import { pageFile, drawingByNumber } from "@/data/drawings";

/* Двенадцать страниц книги для страновых страниц. Взяты из тех же
   рисунков, что показаны на главной сайта: зверь, море, транспорт,
   еда. Двенадцать делится на два, четыре и шесть, поэтому ряд полон
   на телефоне, на планшете и на компьютере. */
const euroPages12 = [1, 23, 22, 24, 16, 29, 41, 46, 26, 67, 111, 106];
import {
  euroUi,
  euroCopyOf,
  euroArt,
  euroBook,
  euroPath,
  euroPrice,
  euroPageOwn,
  pageKey,
  euroAmazonUrl,
  euroPriceExact,
  BOOK_SIZE_CM,
  euroAlternates,
  type EuroLang,
  type EditionLang,
} from "@/data/euro";
import {
  SITE_URL,
  PUBLISHER,
  ADDRESS,
  AUTHOR,
  CATALOG_URL,
  EURO_SHARE,
  SITE_PUBLISHED,
  SITE_UPDATED,
} from "@/lib/site";

/** Первоисточник независимой рецензии. */
const CRITIC_URL =
  "https://readersfavorite.com/book-review/first-coloring-book-for-toddlers-ages-1-3";
import { hasFreePage, freeCopyOf, freePath } from "@/data/free";
import { BuyPdf } from "@/components/BuyPdf";
import { hasPdf, PDF_PRICE_CENTS } from "@/lib/pdfShop";
import { allNames, groupOrder } from "@/data/drawings";
import { wordPairs } from "@/data/euroWords";
import { nb } from "@/lib/nobreak";

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
  const c = euroCopyOf(lang, ed);
  const u = euroUi[lang];
  const url = `${SITE_URL}${euroPath(lang, ed)}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    /* Своя основная версия у каждой страницы своя, и это главное:
       без нее поисковик начал бы выбирать между страницами одну,
       а нам нужно, чтобы каждая жила в своей стране.

       Поверх этого стоят языковые версии. Связываем только страницы
       про одно и то же издание: шесть страниц про книгу с английскими
       словами в одну группу, шесть про книгу с испанскими в другую.
       Это настоящие переводы друг друга: одна книга, одно предложение,
       шесть языков.

       Немецкая про английскую книгу и немецкая про испанскую в одну
       группу не идут: это два разных товара, а не перевод.

       С основным трехъязычным сайтом не смешиваем вовсе. Там свои
       три версии одного справочника, и если бы страновые страницы
       встали в тот же ряд, поисковик решил бы, что у сайта семь
       языков, а немецкая страница это перевод английской.

       Языка по умолчанию в группе нет намеренно: ни одна из шести
       не главнее прочих, каждая для своей страны. */
    alternates: { canonical: url, languages: euroAlternates(ed) },
    openGraph: {
      type: "article",
      locale: u.locale,
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      /* Широкая картинка для мессенджеров, не обложка. Обложка
         вертикальная и в формате WebP: WhatsApp такую не показывает
         вовсе, ссылка приходит голой строкой. На самой странице
         обложка остается прежней. */
      images: [
        {
          url: EURO_SHARE.url(ed),
          width: EURO_SHARE.w,
          height: EURO_SHARE.h,
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
  const own = euroPageOwn[pageKey(lang, ed)];
  return (
    <p className="buys">
      {/* Цена бумажной книги стоит внутри кнопки, как и у файла:
          обе кнопки читаются одинаково, одна про бумагу, вторая
          про файл. Цена точная, та же, что стоит на карточке магазина
          этой страны. Если магазин ее поменяет, поменять и здесь,
          в euroPrice. */}
      {/* Бесплатной кнопки здесь больше нет. Она стояла первой, рядом
          с двумя платными, и забирала не сомневающегося, а того, кто
          уже решил купить: между "четыре евро" и "даром прямо сейчас"
          человек выбирает второе, даже когда был готов заплатить.

          Десять листов никуда не делись: у них свой блок ниже, и к ним
          ведет дорога на страницу бесплатной печати. */}
      <a
        className="btn btn--pink"
        href={euroAmazonUrl(lang, b.asin)}
        rel="nofollow sponsored noopener"
        target="_blank"
      >
        {u.buyAmazon} · {own?.price ?? euroPrice[lang]}
      </a>
      {/* Файл для печати. Бумажную книгу в этих странах ждут несколько
          дней, а иногда ее нет в наличии вовсе, файл приходит через
          минуту. Раньше кнопки здесь не было: она вела в старый магазин
          на Wix, английский и в долларах. Теперь магазин свой, и Stripe
          сам показывает покупателю его валюту и налог его страны.

          Язык оплаты и письма берется по изданию, а не по стране:
          у немца, купившего английскую книгу, и книга английская,
          и письмо к ней должно быть английским. */}
      {hasPdf(editions[ed].pdfId) ? (
        <BuyPdf
          lang={ed}
          book={editions[ed].pdfId!}
          back={euroPath(lang, ed)}
          labels={{
            buyPdf: u.buyPdf,
            pdfPickSize: u.pdfPickSize,
            buyPdfLetter: u.buyPdfLetter,
            buyPdfA4: u.buyPdfA4,
            pdfLetterHint: u.pdfLetterHint,
            pdfA4Hint: u.pdfA4Hint,
            pdfNote: u.pdfNote,
          }}
        />
      ) : null}
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
  const c = euroCopyOf(lang, ed);
  const art = euroArt[ed];
  const b = euroBook(ed);
  const other: EditionLang = ed === "en" ? "es" : "en";
  /* Своя полоса картинок с надписями на языке страницы. Есть пока
     только у немецкой страницы про английскую книгу, остальные семь
     берут общий набор. */
  const own = euroPageOwn[pageKey(lang, ed)];
  /* Ролик того издания, о котором страница: в английском под рисунками
     английские слова, в испанском испанские. Снят родителем дома. */
  const video = editions[ed].video;
  /* Все 111 слов парами: слово страны и слово книги. */
  const pairs = wordPairs(lang, ed);
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
        /* Две даты. Без даты публикации страница выглядит так, будто
           ее только что сочинили, а с одной лишь датой правки
           непонятно, сколько она уже живет. */
        datePublished: SITE_PUBLISHED,
        dateModified: SITE_UPDATED,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#publisher` },
        primaryImageOfPage: `${SITE_URL}${art.cover}`,
      },
      /* Путь по разделам. В выдаче поисковик может показать его вместо
         голого адреса. Ступени две: корень страны и сама страница.
         Корень страны отдельной витрины не имеет и перебрасывает на
         эту же страницу, но как ступень пути он существует и понятен
         человеку. */
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: u.htmlLang.toUpperCase(),
            item: `${SITE_URL}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: c.head.title,
            item: url,
          },
        ],
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
        /* Второе название книги. То же издание, но словом, которым
           его чаще ищут. Подробнее в src/data/book.ts. */
        alternateName: editions[ed].altTitle,
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
        /* Полный состав книги для машины: все 111 предметов отдельными
           записями. Нейросеть читает список мгновенно и по нему
           рекомендует книгу тому, кто спросил про конкретное животное
           или предмет. Названия на языке издания: в английской книге
           под рисунками английские слова, и искать будут их. */
        about: allNames(ed).map((name) => ({ "@type": "Thing", name })),
        /* Рецензия стороннего издания с ссылкой на первоисточник.
           Оценку не ставим: чужие оценки в разметке Google запрещает.
           На странице рецензия есть давно, машине она не была видна. */
        subjectOf: {
          "@type": "Review",
          reviewBody: c.critic,
          author: { "@type": "Person", name: "Pikasho Deka" },
          publisher: { "@type": "Organization", name: "Readers' Favorite" },
          url: CRITIC_URL,
        },
        sameAs: [
          editions[ed].wikidata
            ? `https://www.wikidata.org/wiki/${editions[ed].wikidata}`
            : undefined,
          euroAmazonUrl(lang, b.asin),
        ].filter(Boolean),
        /* Два предложения на одну книгу, а не одно.

           Бумажная книга продается на Amazon этой страны, в валюте
           этой страны. Цена стоит только там, где число сверено с
           карточкой магазина, смотри пояснение у euroPriceExact.

           Файл для печати продает само издательство, здесь же на
           странице, за 3.99 доллара. Раньше его в разметке не было
           вовсе: машина видела одну бумажную цену и на вопрос
           "сколько стоит файл" ответить не могла, хотя кнопка стоит
           прямо на странице. Продавец и адрес у него свои, и путать
           их с Amazon нельзя. */
        offers: [
          euroPriceExact[lang]
            ? {
                "@type": "Offer",
                price: euroPriceExact[lang]!.amount,
                priceCurrency: euroPriceExact[lang]!.currency,
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/NewCondition",
                seller: { "@type": "Organization", name: "Amazon" },
                url: euroAmazonUrl(lang, b.asin),
              }
            : undefined,
          hasPdf(editions[ed].pdfId)
            ? {
                "@type": "Offer",
                price: (PDF_PRICE_CENTS / 100).toFixed(2),
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                seller: { "@type": "Organization", name: PUBLISHER },
                url,
              }
            : undefined,
        ].filter(Boolean),
      },
      /* Ролик о книге. Стоит на странице давно как картинка, но
         машине не был виден вовсе, а это отдельный вид результатов
         поиска, где соперников почти нет. Длительность записана
         в том виде, какого требует справочник: PT46S значит
         сорок шесть секунд. */
      ...(video
        ? [
            {
              "@type": "VideoObject",
              name: `${editions[ed].title}. ${u.videoTitle}`,
              description: video.description,
              thumbnailUrl: `${SITE_URL}${video.poster}`,
              contentUrl: `${SITE_URL}${video.src}`,
              uploadDate: SITE_PUBLISHED,
              duration: `PT${video.seconds}S`,
              inLanguage: u.htmlLang,
              publisher: { "@type": "Organization", name: PUBLISHER },
            },
          ]
        : []),
      /* Десять листов из книги. Машина должна понимать, что это
         готовые файлы для печати, а не картинки для украшения
         страницы, и что за них не нужно ни платить, ни оставлять
         почту. На главной сайта это объявлено давно, здесь не было. */
      {
        "@type": "DigitalDocument",
        "@id": `${url}#gratis`,
        name: u.freeTitle,
        description: u.freeLead,
        url: `${url}#gratis`,
        encodingFormat: "application/pdf",
        inLanguage: ed,
        isAccessibleForFree: true,
        isFamilyFriendly: true,
        author: { "@type": "Person", name: AUTHOR.name },
        publisher: { "@type": "Organization", name: PUBLISHER, address: ADDRESS },
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
      <header className={own ? "euro-head euro-head--wide" : "euro-head"}>
        <p className="euro-head__top">
          {own?.headTop ? (
            <>
              <span>{own.headTop[0]}</span>{" "}
              <span>{own.headTop[1]}</span>
            </>
          ) : (
            c.head.top
          )}
        </p>
        <h1 className="euro-head__title">{c.head.title}</h1>
        <p className="euro-head__bottom">{c.head.bottom}</p>
      </header>

      {/* ============ Книга ============ */}
      <div className="wrap">
        <div className={own ? "book book--own" : "book"}>
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
            {/* Название и подзаголовок здесь больше не повторяются:
                те же две строки человек только что прочитал в шапке,
                и на телефоне они уходили целым экраном впустую.
                Три главных факта тоже ушли отсюда вниз, в общий
                список "что в книге", и стоят там первыми.

                Остальные семь страниц пока устроены по-старому. */}
            {own ? null : (
              <>
                <h2 className="book__title">{c.title}</h2>
                <p className="subtitle">{nb(c.subtitle)}</p>
                <ul className="quick-facts">
                  {c.inside.slice(0, 3).map((line) => (
                    <li key={line}>{nb(line)}</li>
                  ))}
                </ul>
              </>
            )}

            {own ? (
              <>
                {/* Первая строка это не абзац, а название книги своими
                    словами. Ставим ее заголовком: у блока под обложкой
                    иначе нет никакой шапки вовсе. */}
                <h2 className="book__title book__title--lead">{c.lead[0]}</h2>
                {/* Остальные абзацы с мятными кружками, теми же, что
                    в списке "что говорят родители". Текст выключен
                    по обе стороны. */}
                <ul className="lead-points">
                  {c.lead.slice(1).map((part) => (
                    <li key={part.slice(0, 24)}>{nb(part)}</li>
                  ))}
                </ul>
              </>
            ) : (
              c.lead.map((part) => (
                <p className="why-text" key={part.slice(0, 24)}>
                  {part}
                </p>
              ))
            )}

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
                <span className="key-specs__value">{own?.size ?? BOOK_SIZE_CM}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={own ? "book-body book-body--own" : "book-body"}>
          {/* ============ Страницы из книги ============ */}
          {/* Двенадцать страниц так, как они выглядят в книге: рисунок
              и слово под ним полыми буквами. Слово того языка, о котором
              страница: на немецкой странице про английское издание под
              картинками стоят английские слова, а это и есть то, ради
              чего родитель книгу берет.

              Стоят сразу под обложкой, до кнопки покупки. Раньше первый
              рисунок появлялся только тринадцатым блоком, и человека
              звали платить прежде, чем показали товар.

              Двенадцать, а не двадцать, как на главной сайта: двенадцать
              делится и на два, и на четыре, и на шесть без остатка,
              поэтому последний ряд полон на любой ширине экрана. */}
          <h2 className="section">{u.pagesTitle}</h2>
          <ul className="thumbs thumbs--euro">
            {euroPages12.map((n) => (
              <li key={n}>
                <img
                  src={pageFile(n, ed)}
                  alt={`${drawingByNumber(n)?.name[ed] ?? ""} ${
                    ed === "en" ? "coloring page" : "para colorear"
                  }`}
                  width={480}
                  height={620}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>

          {/* ============ Покупка, первое из трех мест ============ */}
          {/* Человек увидел обложку и страницы книги. Дальше идут
              баннеры и подробности, но решение он может принять уже
              здесь, и звать его вниз незачем. */}
          <div className="buy-block">
            <Buy lang={lang} ed={ed} />
            <p className="buy-note">{nb(u.buyNote)}</p>
          </div>

          {/* Полоса картинок книги.

              У страниц, где своих картинок нет, стоит общий набор:
              баннер книги, три квадратных рисунка и баннер с подарком.
              Надписи на них английские или испанские, и это правда:
              так называется сама книга, и покупатель должен узнать ее,
              когда попадет на Amazon.

              У немецкой страницы про английскую книгу набор свой,
              из шести картинок с немецкими надписями: широкая полоса,
              три раскрашенных листа из книги в ряд, полоса с десятью
              мотивами и полоса про подарок. */}
          {own ? (
            <div className="showcase">
              <img
                className="theme-banner"
                src={own.strip[0].src}
                alt={own.strip[0].alt}
                width={own.strip[0].w}
                height={own.strip[0].h}
                loading="lazy"
              />
              <div className="artwork artwork--tall">
                {own.strip
                  .filter((im) => !im.wide)
                  .map((im) => (
                    <img
                      key={im.src}
                      src={im.src}
                      alt={im.alt}
                      width={im.w}
                      height={im.h}
                      loading="lazy"
                    />
                  ))}
              </div>
              {own.strip.slice(4).map((im) => (
                <img
                  key={im.src}
                  className="theme-banner"
                  src={im.src}
                  alt={im.alt}
                  width={im.w}
                  height={im.h}
                  loading="lazy"
                />
              ))}
            </div>
          ) : (
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
          )}


          {/* ============ Для кого ============ */}
          <h2 className="section">{u.forWhom}</h2>
          <p>{nb(c.forWhom)}</p>

          {/* ============ Что внутри ============ */}
          <h2 className="section">{u.inside}</h2>
          <ul className="inside">
            {(own ? c.inside : c.inside.slice(3)).map((line) => (
              <li key={line}>{nb(line)}</li>
            ))}
          </ul>

          {/* ============ Что говорят родители ============ */}
          {/* Написано нами по смыслу отзывов на Amazon, своими словами
              и без имен: чужой текст в кавычках это чужая собственность. */}
          <h2 className="section">{u.parents}</h2>
          <ul className="needs">
            {c.parents.map((line) => (
              <li key={line}>{nb(line)}</li>
            ))}
          </ul>

          {/* ============ Независимая рецензия ============ */}
          {/* Сначала сама оценка, потом одной строкой за что она
              поставлена, потом кнопка на первоисточник и подпись
              рецензентки с датой. Подписанная рецензия весит больше
              безымянной и для человека, и для поисковика. */}
          <h2 className="section">{c.criticTitle ?? u.criticTitle}</h2>
          <p>{nb(c.critic)}</p>
          {/* Подпись стоит сразу под оценкой, а не в самом низу блока:
              там она читалась как случайная строка неизвестно о чем. */}
          {c.criticBy ? <p className="critic-by">{c.criticBy}</p> : null}
          {c.criticWhy ? <p>{nb(c.criticWhy)}</p> : null}
          <p className="btn-row">
            <a
              className="btn btn--ghost"
              href={CRITIC_URL}
              rel="nofollow noopener"
              target="_blank"
            >
              {u.criticSource}
            </a>
          </p>

          {/* ============ Видео о книге ============ */}
          {/* Снято родителем дома, без монтажа: обложка, оборот и все
              страницы по порядку. Для покупателя, который не может
              полистать книгу в магазине, это самое убедительное, что
              есть на странице. Раньше видео стояло только на главной
              сайта, а здесь его не было вовсе. */}
          {video ? (
            <>
              <h2 className="section">{u.videoTitle}</h2>
              <p>{nb(u.videoLead)}</p>
              <video
                className="euro-video"
                src={video.src}
                poster={video.poster}
                width={video.w}
                height={video.h}
                controls
                playsInline
                preload="none"
              />
            </>
          ) : null}

          {/* ============ Покупка, второе из трех мест ============ */}
          {/* Человек уже посмотрел книгу внутри, прочитал, что о ней
              говорят, и увидел ее в руках. Это и есть минута, когда
              решение принимается. */}
          <div className="buy-block">
            <Buy lang={lang} ed={ed} />
            <p className="buy-note">{nb(u.buyNote)}</p>
          </div>

          {/* ============ Почему для первого знакомства с языком ============ */}
          {/* Пять коротких доводов. Стоят открытыми, а не под кнопкой:
              это и есть ответ на главный вопрос родителя, ради которого
              он книгу и берет. */}
          {c.whyTitle && c.why ? (
            <>
              <h2 className="section">{c.whyTitle}</h2>
              {c.why.map((part) => (
                <p key={part.slice(0, 24)}>{nb(part)}</p>
              ))}
            </>
          ) : null}

          {/* ============ Оценки ============ */}
          <h2 className="section">{u.ratingTitle}</h2>
          <p>{nb(c.rating)}</p>

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
              <dd>{own?.size ?? BOOK_SIZE_CM}</dd>
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
                <summary>{nb(f.q)}</summary>
                <p>{nb(f.a)}</p>
              </details>
            ))}
          </div>

          {/* ============ Все 111 слов книги ============ */}
          {/* Слово на языке страны и слово из книги, парами, по восьми
              темам. Раньше страница обещала первые английские слова,
              но ни одного не показывала: родитель видел обещание,
              а не список.

              Это же и самое цитируемое, что на странице есть. Готовой
              таблицы "Löwe - Lion" в интернете почти нет, а спрашивают
              такое постоянно.

              У Франции, Голландии, Польши и Италии словаря пока нет,
              и там блок не рисуется вовсе: пустая таблица хуже, чем
              никакой. */}
          {pairs.length ? (
            <>
              <h2 className="section">{u.wordsTitle}</h2>
              <p>{nb(u.wordsLead)}</p>
              {/* Шторка, а не сворачивание.

                  На телефоне список из 111 пар занимал бы полтора
                  экрана, поэтому он обрезан по высоте, и под ним
                  кнопка. Но обрезан, а не спрятан: слова остаются
                  видимыми для машины и никуда не деваются из кода.

                  Разница важная. Поисковик свернутый блок читает,
                  это Google подтверждал дважды. А вот часть
                  нейросетевых сборщиков такие блоки не раскрывает
                  и берет только то, что видно сразу. Обрезка по
                  высоте эту разницу снимает: видно все и всегда,
                  просто не помещается в окно.

                  Сделано без единой строки на языке браузера: обычный
                  переключатель, спрятанный от глаз, и подпись к нему.
                  На компьютере ни переключателя, ни кнопки нет,
                  список открыт весь. */}
              <input
                type="checkbox"
                id="words-all"
                className="wordlist-toggle"
              />
              <div className="wordlist-box">
              {groupOrder.map((g) => {
                const rows = pairs.filter((w) => w.group === g);
                if (!rows.length) return null;
                return (
                  <div key={g} className="wordlist">
                    <h3 className="block">{u.groups[g]}</h3>
                    <ul>
                      {rows.map((w) => (
                        <li key={w.n}>
                          <b>{w.local}</b>
                          <span>{w.book}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              </div>
              <label className="wordlist-more" htmlFor="words-all">
                {u.wordsMore}
              </label>
            </>
          ) : null}

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
              const file = sheetPdf(sh.id, ed, u.sheetSize ?? "a4");
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
          <p className="buy-note">{nb(u.freeFormat)}</p>

          {/* ============ Дорога на страницу бесплатной печати ============ */}
          {/* Человек только что досмотрел десять листов, и это
              единственная минута, когда предложение уместно.

              Связь нужна в обе стороны. Страница бесплатной печати
              ведет сюда тремя ссылками, и без обратной дорога была бы
              односторонней: половина смысла сети теряется.

              Испания и Канада своей страницы бесплатной печати не
              имеют, там язык страницы испанский и английский, и такие
              страницы на сайте уже есть в основном разделе. У них
              блок не рисуется вовсе. */}
          {hasFreePage(lang) ? (
            <p className="teach-other">
              <span>{nb(freeCopyOf(lang, ed).fromBook)}</span>
              <Link className="btn btn--mint" href={freePath(lang, ed)}>
                {freeCopyOf(lang, ed).fromBookCta}
              </Link>
            </p>
          ) : null}

          {/* ============ Покупка, третье и последнее место ============ */}
          {/* Стоит сразу после бесплатных листов и именно поэтому.
              Человек распечатал страницу, дал ребенку карандаш и
              увидел, что книга подошла. Это и есть минута, когда берут
              книгу целиком. Раньше следом шла только вторая книга и
              подвал, и купить здесь было негде. */}
          <div className="buy-block">
            <Buy lang={lang} ed={ed} />
            <p className="buy-note">{nb(u.buyNote)}</p>
          </div>

          {/* ============ Когда книга не подойдет ============ */}
          {/* Честный отказ. Стоит после последней кнопки: тому, кто
              уже решил, он не мешает, а того, кому книга не подходит,
              удерживает от покупки, о которой он пожалеет. Такой отказ
              стоит дороже любой похвалы: страница, которая говорит
              о себе только хорошее, вызывает недоверие. */}
          <h2 className="section">{u.whenNotTitle}</h2>
          <p>{nb(u.whenNot)}</p>

          {/* ============ Вторая книга ============ */}
          {/* Строкой, а не карточкой: карточка спорила бы с той книгой,
              ради которой человек пришел. */}
          {c.pair && c.pairCta ? (
            <p className="teach-other" style={{ marginTop: "var(--gap-4)" }}>
              <span>{c.pair}</span>
              <Link className="btn btn--mint" href={euroPath(lang, other)}>
                {c.pairCta}
              </Link>
            </p>
          ) : null}
          {/* ============ Подборщик раскраски ============ */}
          {/* Одной строкой и внизу. Подборщик отвечает на вопрос,
              какая раскраска подходит ребенку по возрасту, а сюда
              человек пришел за первыми словами чужого языка: вопрос
              у него другой. Но тот, кто до низа дошел и так и не
              решился, получает выход, а не тупик. */}
          <p className="teach-other" style={{ marginTop: "var(--gap-4)" }}>
            <span>{nb(u.pickerLine)}</span>
            <a
              className="btn btn--mint"
              href={`${SITE_URL}${u.footerLinkHref ?? "/en"}#picker`}
              rel="noopener"
            >
              {u.pickerCta}
            </a>
          </p>
        </div>
      </div>

      {/* ============ Подвал ============ */}
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
