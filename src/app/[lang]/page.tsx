import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Picker from "@/components/Picker";
import { activeLangs, dictionaries, isContentLang } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";
import { stages } from "@/data/stages";
import { sample, sheetPreview } from "@/data/sheets";
import { editions, BOOK } from "@/data/book";
import {
  drawings,
  featured,
  drawingFile,
  drawingByNumber,
  groupOrder,
  groupTitles,
  drawingsOfGroup,
  allNames,
} from "@/data/drawings";
import { homePath, sectionPath } from "@/lib/routes";
import { SITE_URL, SOURCES, SITE_UPDATED, PUBLISHER, AUTHOR, ADDRESS } from "@/lib/site";
import { jsonLd, organization, website, langAlternates } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!activeLangs.includes(lang as UiLang)) return {};
  const l = lang as UiLang;
  const ed = editions[l];
  return {
    title: ed.title,
    description: ed.headline + " " + ed.lead.slice(0, 140),
    alternates: {
      canonical: `${SITE_URL}${homePath(l)}`,
      languages: langAlternates({
        en: `${SITE_URL}${homePath("en")}`,
        es: `${SITE_URL}${homePath("es")}`,
        ru: `${SITE_URL}${homePath("ru")}`,
      }),
    },
    openGraph: {
      title: ed.title,
      description: ed.headline,
      images: [{ url: `${SITE_URL}${ed.cover}`, width: ed.coverSize.w, height: ed.coverSize.h }],
    },
  };
}

/* Подписи, которые нужны на трех языках и живут только здесь. */
const words = {
  en: {
    ages: "Ages",
    drawings: "Drawings",
    pages: "Pages",
    size: "Size",
    inside: "What is inside",
    insideLead:
      "Every drawing in the book, in the order it appears. These twenty are the ones we put on " +
      "the cover and in the ads, because they show best what the whole book looks like.",
    seeAll: "See all 111 drawings",
    video: "A look inside the book",
    videoLead:
      "An unedited flip through, filmed on a table. Cover, back cover, and page after page, so " +
      "you can see the line thickness and how much of the sheet one drawing takes up before you " +
      "decide.",
    forWhom: "Who it is for",
    notFor: "When this book is the wrong choice",
    faq: "Questions parents ask",
    buyNote: "Sold and shipped by Amazon. We earn from the sale.",
    priceFrom: "paperback on Amazon",
    freeTitle: "Try ten pages first, free",
    freeLead:
      "Ten drawings straight out of the book, in two paper sizes. Print one, hand your child a " +
      "crayon, and you will know within five minutes whether this kind of page suits them.",
    alsoIn: "The same 111 drawings with the words in Spanish underneath, as a separate book.",
  },
  es: {
    ages: "Edad",
    drawings: "Dibujos",
    pages: "Páginas",
    size: "Tamaño",
    inside: "Qué hay dentro",
    insideLead:
      "Todos los dibujos del libro, en el orden en que aparecen. Estos veinte son los que pusimos " +
      "en la portada y en los anuncios, porque muestran mejor cómo es el libro entero.",
    seeAll: "Ver los 111 dibujos",
    video: "El libro por dentro",
    videoLead:
      "Un recorrido sin cortes, filmado sobre una mesa. Portada, contraportada y una página tras " +
      "otra, para que vea el grosor de la línea y cuánto ocupa un dibujo en la hoja antes de " +
      "decidir.",
    forWhom: "Para quién es",
    notFor: "Cuándo este libro no es la opción",
    faq: "Preguntas que hacen los padres",
    buyNote: "Vendido y enviado por Amazon. Nosotros ganamos con la venta.",
    priceFrom: "tapa blanda en Amazon",
    freeTitle: "Pruebe primero diez páginas, gratis",
    freeLead:
      "Diez dibujos sacados directamente del libro, en dos tamaños de papel. Imprima uno, dele un " +
      "crayón a su hijo y en cinco minutos sabrá si este tipo de página le conviene.",
    alsoIn: "Los mismos 111 dibujos con las palabras en inglés debajo, como libro aparte.",
  },
  ru: {
    ages: "Возраст",
    drawings: "Рисунков",
    pages: "Страниц",
    size: "Размер",
    inside: "Что внутри",
    insideLead:
      "Все рисунки книги, в том порядке, в каком они в ней идут. Эти двадцать стоят на обложке " +
      "и на рекламных баннерах: они лучше всего показывают, какая книга в целом.",
    seeAll: "Посмотреть все 111 рисунков",
    video: "Книга внутри",
    videoLead:
      "Съемка без монтажа, на столе. Обложка, оборот и страница за страницей, чтобы вы увидели " +
      "толщину линии и сколько листа занимает один рисунок, прежде чем решать.",
    forWhom: "Кому подходит",
    notFor: "Когда эта книга не подойдет",
    faq: "Что спрашивают родители",
    buyNote: "Файл для печати. Вы печатаете его дома столько раз, сколько нужно.",
    priceFrom: "файл для печати",
    freeTitle: "Сначала попробуйте десять страниц, бесплатно",
    freeLead:
      "Десять рисунков прямо из книги, в двух форматах бумаги. Распечатайте один, дайте ребенку " +
      "карандаш, и за пять минут станет ясно, подходит ли ему такая страница.",
    alsoIn: "",
  },
} as const;

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!activeLangs.includes(lang as UiLang)) notFound();
  const l = lang as UiLang;
  const t = dictionaries[l];
  const ed = editions[l];
  const w = words[l];
  const other = l === "es" ? editions.en : editions.es;

  /* Двадцать отобранных рисунков наверху, все 111 в раскрывающемся
     списке ниже. Список раскрыт для машины всегда: по нему нейросеть
     отвечает на вопрос про конкретного зверя или предмет. */
  const top = featured.map(drawingByNumber).filter(Boolean);

  const data = jsonLd(
    organization(),
    website(l),
    {
      "@type": "Book",
      "@id": `${SITE_URL}${homePath(l)}#book`,
      name: ed.title,
      bookFormat: ed.asin
        ? "https://schema.org/Paperback"
        : "https://schema.org/EBook",
      numberOfPages: BOOK.pages,
      inLanguage: t.htmlLang,
      datePublished: ed.published,
      author: { "@type": "Person", name: AUTHOR.name, sameAs: [AUTHOR.amazon] },
      publisher: { "@type": "Organization", name: PUBLISHER, address: ADDRESS },
      description: ed.headline + " " + ed.lead,
      image: `${SITE_URL}${ed.cover}`,
      typicalAgeRange: "1-3",
      audience: { "@type": "PeopleAudience", suggestedMinAge: 1, suggestedMaxAge: 3 },
      /* Полный состав книги для машины. Нейросеть читает его мгновенно
         и по нему рекомендует книгу тому, кто спросил про конкретное
         животное или предмет. */
      about: allNames(l).map((name) => ({ "@type": "Thing", name })),
      ...(ed.rating
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: ed.rating.value,
              reviewCount: ed.rating.count,
            },
          }
        : {}),
      ...(ed.asin && ed.price
        ? {
            offers: {
              "@type": "Offer",
              price: ed.price.replace("$", ""),
              priceCurrency: "USD",
              url: BOOK.amazonUrl(ed.asin),
              availability: "https://schema.org/InStock",
            },
          }
        : {}),
      ...(ed.video
        ? {
            video: {
              "@type": "VideoObject",
              name: `${ed.title}. ${w.video}`,
              description: ed.video.description,
              thumbnailUrl: `${SITE_URL}${ed.video.poster}`,
              contentUrl: `${SITE_URL}${ed.video.src}`,
              uploadDate: ed.published,
              duration: `PT${ed.video.seconds}S`,
              inLanguage: t.htmlLang,
              isFamilyFriendly: true,
            },
          }
        : {}),
    },
    {
      "@type": "FAQPage",
      mainEntity: ed.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${homePath(l)}#page`,
      name: ed.title,
      description: ed.headline,
      inLanguage: t.htmlLang,
      dateModified: SITE_UPDATED,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      citation: SOURCES.map((s) => ({
        "@type": "CreativeWork",
        name: s.title,
        publisher: { "@type": "Organization", name: s.publisher },
        url: s.url,
      })),
    }
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />

      {/* ============ 1. Книга. Первое, что видит человек ============ */}
      <div className="wrap">
        <div className="book">
          <div className="book__cover">
            <div className="inner">
              <img
                src={ed.cover}
                alt={ed.title}
                width={ed.coverSize.w}
                height={ed.coverSize.h}
                fetchPriority="high"
              />
            </div>
          </div>

          <div>
            <h1>{ed.title}</h1>
            {/* Одна законченная фраза: количество, толщина линии,
                один рисунок на странице, возраст. Ее можно
                процитировать целиком, ничего не дописывая. */}
            <p className="headline">{ed.headline}</p>

            <ul className="key-specs">
              <li>
                <span className="key-specs__label">{w.ages}</span>
                <span className="key-specs__value">{BOOK.ages}</span>
              </li>
              <li>
                <span className="key-specs__label">{w.drawings}</span>
                <span className="key-specs__value">{BOOK.drawings}</span>
              </li>
              <li>
                <span className="key-specs__label">{w.pages}</span>
                <span className="key-specs__value">{BOOK.pages}</span>
              </li>
              <li>
                <span className="key-specs__label">{w.size}</span>
                <span className="key-specs__value">{ed.size}</span>
              </li>
            </ul>

            {/* Вместо кнопки покупки: пять свойств, которые родители
                ищут словами. Кнопка стоит ниже, после того как
                человек увидел книгу внутри. */}
            <ul className="needs">
              {ed.needs.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="wrap book-body">
        {/* ============ 2. Три свойства картинками ============ */}
        <div className="artwork">
          {BOOK.artwork.map((a) => (
            <img key={a.file} src={a.file} alt={a.alt[l]} loading="lazy" />
          ))}
        </div>

        <p className="lead-text">{ed.lead}</p>

        {/* ============ 3. Что внутри: сами рисунки ============ */}
        <h2 className="section" id="inside">{w.inside}</h2>
        <p>{w.insideLead}</p>

        <ul className="thumbs">
          {top.map((d) => (
            <li key={d!.n}>
              <img
                src={drawingFile(d!.n)}
                alt={`${d!.name[l]} ${l === "en" ? "coloring page" : l === "es" ? "para colorear" : "раскраска"}`}
                width={420}
                height={420}
                loading="lazy"
              />
              <span>{d!.name[l]}</span>
            </li>
          ))}
        </ul>

        {/* Все 111 по темам. Свернуто, чтобы не оглушать человека,
            но лежит на той же странице и читается машиной. */}
        <details className="all-drawings">
          <summary>{w.seeAll}</summary>
          <div className="all-drawings__body">
            {groupOrder.map((g) => (
              <section key={g}>
                <h3>{groupTitles[g][l]}</h3>
                <ul className="thumbs thumbs--small">
                  {drawingsOfGroup(g).map((d) => (
                    <li key={d.n}>
                      <img
                        src={drawingFile(d.n)}
                        alt={d.name[l]}
                        width={420}
                        height={420}
                        loading="lazy"
                      />
                      <span>{d.name[l]}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </details>

        {/* ============ 4. Список словами ============ */}
        <ul className="inside">
          {ed.inside.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        {/* ============ 5. Видео, справа подтверждение ============ */}
        {ed.video ? (
          <>
            <h2 className="section">{w.video}</h2>
            <div className="video-card">
              <video
                className="video-card__media"
                controls
                preload="none"
                poster={ed.video.poster}
                width={ed.video.w}
                height={ed.video.h}
                aria-label={ed.title}
              >
                <source src={ed.video.src} type="video/mp4" />
              </video>
              <div className="video-card__text">
                <p className="video-card__lead">{w.videoLead}</p>
                <ul className="needs">
                  {ed.needs.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <Buy lang={l} />
              </div>
            </div>
          </>
        ) : null}

        {/* ============ 6. Покупка ============ */}
        <div className="buy-block">
          <Buy lang={l} />
          <p className="buy-note">{w.buyNote}</p>
        </div>

        {/* ============ 7. Кому подходит и кому нет ============ */}
        <h2 className="section">{w.forWhom}</h2>
        <p>{ed.forWhom}</p>

        <h2 className="section">{w.notFor}</h2>
        <p>{ed.notFor}</p>

        {/* ============ 8. Вопросы ============ */}
        <h2 className="section">{w.faq}</h2>
        <div className="faq faq--two">
          {ed.faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>

        {/* Издание на другом языке. Строкой, не карточкой:
            карточка спорила бы с основной книгой. */}
        {w.alsoIn && other.asin ? (
          <p className="teach-other" style={{ marginTop: "var(--gap-4)" }}>
            <span>{w.alsoIn}</span>
            <a
              className="btn btn--mint"
              href={BOOK.amazonUrl(other.asin)}
              rel="nofollow sponsored noopener"
              target="_blank"
            >
              {other.title}
            </a>
          </p>
        ) : null}
      </div>

      {/* ============ 9. Бесплатные листы ============ */}
      <section className="band band--pink">
        <div className="wrap">
          <h2 className="section">{w.freeTitle}</h2>
          <p className="lead">{w.freeLead}</p>
          <div className="result__sheets" style={{ maxWidth: "40rem" }}>
            {sample(3).map((s) => (
              <img
                key={s.id}
                src={sheetPreview(s.id, l)}
                alt={
                  l === "en"
                    ? `Free printable coloring page for toddlers: ${s.name.en}`
                    : l === "es"
                      ? `Dibujo para colorear gratis para niños pequeños: ${s.name.es}`
                      : `Бесплатная раскраска для малышей: ${s.name.ru}`
                }
                loading="lazy"
              />
            ))}
          </div>
          <p>
            <Link className="btn btn--sun" href={sectionPath(l, "printables")}>
              {t.home.printablesCta}
            </Link>
          </p>
        </div>
      </section>

      {/* ============ 10. Справочная часть ============ */}
      {isContentLang(l) ? (
        <>
          <section className="band band--mint" id="picker">
            <div className="wrap">
              <h2 className="section" style={{ textAlign: "center" }}>
                {t.home.pickerTitle}
              </h2>
              <p className="lead" style={{ textAlign: "center", marginInline: "auto" }}>
                {t.home.pickerLead}
              </p>
              <Picker lang={l} />
            </div>
          </section>

          <section className="band band--cream">
            <div className="wrap">
              <h2 className="section">
                {l === "en"
                  ? "The four stages of first drawing"
                  : "Las cuatro etapas del primer dibujo"}
              </h2>
              <ul className="ladder">
                {stages.map((s) => (
                  <li className="ladder__step" key={s.id}>
                    <p className="ladder__age">{s.title[l]}</p>
                    <p className="ladder__can">{s.ageLabel[l]}</p>
                    <p className="ladder__needs">{s.can[l][0]}</p>
                  </li>
                ))}
              </ul>
              <p>
                <Link className="btn btn--mint" href={sectionPath(l, "ages")}>
                  {t.nav.ages}
                </Link>
              </p>
            </div>
          </section>
        </>
      ) : null}

      {/* ============ 11. Что это за сайт ============ */}
      <section className="band">
        <div className="wrap">
          <h2 className="section">{t.home.whatTitle}</h2>
          <p className="what-lead">{t.home.whatText}</p>
        </div>
      </section>

      <section className="band band--cream">
        <div className="wrap">
          <h2 className="section">{t.home.whyTitle}</h2>
          <ul className="why-list">
            {t.home.why.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 12. Источники ============ */}
      <section className="band">
        <div className="wrap">
          <h2 className="section">{t.home.sourcesTitle}</h2>
          <p className="lead">{t.home.sourcesLead}</p>
          <ul className="sources">
            {SOURCES.map((s) => (
              <li key={s.id}>
                <b>
                  <a href={s.url} rel="noopener nofollow" target="_blank">
                    {s.title}
                  </a>
                </b>
                <span>{s.publisher}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/* Кнопка покупки. На английском и испанском ведет на Amazon.
   На русском ведет на страницу, где продается файл для печати:
   пока ее нет, кнопки тоже нет, а вместо нее человеку предлагаются
   бесплатные листы ниже по странице. Кнопка, ведущая в пустоту,
   хуже, чем ее отсутствие: и человек, и поисковик считают ее
   сломанной ссылкой. */
function Buy({ lang }: { lang: UiLang }) {
  const ed = editions[lang];
  const t = dictionaries[lang];
  const w = words[lang];

  if (ed.asin) {
    return (
      <p className="buys">
        {ed.price ? (
          <span className="top-price">
            <span className="top-price__value">{ed.price}</span>
            <span className="top-price__label">{w.priceFrom}</span>
          </span>
        ) : null}
        <a
          className="btn btn--pink"
          href={BOOK.amazonUrl(ed.asin)}
          rel="nofollow sponsored noopener"
          target="_blank"
        >
          {t.common.amazon}
        </a>
      </p>
    );
  }

  if (ed.pdfUrl) {
    return (
      <p className="buys">
        {ed.price ? (
          <span className="top-price">
            <span className="top-price__value">{ed.price}</span>
            <span className="top-price__label">{w.priceFrom}</span>
          </span>
        ) : null}
        <a className="btn btn--pink" href={ed.pdfUrl} rel="noopener" target="_blank">
          {lang === "ru" ? "Купить файл для печати" : t.common.amazon}
        </a>
      </p>
    );
  }

  return null;
}
