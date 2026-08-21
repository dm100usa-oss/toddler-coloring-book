import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { activeLangs, dictionaries } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";
import { agesCopy, printablesCopy, aboutCopy, guidesCopy, ageLabels, termsCopy } from "@/data/pages";
import { guides } from "@/data/guides";
import { stages, stageById } from "@/data/stages";
import type { StageId } from "@/data/stages";
import { sheets, sheetPreview, sheetPdf } from "@/data/sheets";
import { editions, BOOK } from "@/data/book";
import { sectionFromSlug, sectionSlugs, sectionPath, itemPath } from "@/lib/routes";
import type { Section } from "@/lib/routes";
import { SITE_URL, SOURCES, SITE_UPDATED, PUBLISHER, AUTHOR } from "@/lib/site";
import {
  jsonLd,
  organization,
  breadcrumbs,
  langAlternates,
  faqPage,
} from "@/lib/schema";

/* Один файл на все разделы. Разделов пять, каждый со своим содержанием,
   но каркас у них общий: заголовок, вводка, текст, вопросы, разметка.
   Разносить это по пяти почти одинаковым файлам значило бы копировать
   один и тот же код пять раз и потом пять раз его чинить. */

export function generateStaticParams() {
  const out: { lang: string; section: string }[] = [];
  for (const lang of activeLangs) {
    for (const s of Object.keys(sectionSlugs[lang]) as Section[]) {
      out.push({ lang, section: sectionSlugs[lang][s] });
    }
  }
  return out;
}

function copyFor(section: Section, lang: UiLang) {
  if (section === "ages") return agesCopy[lang];
  if (section === "printables") return printablesCopy[lang];
  if (section === "about") return aboutCopy[lang];
  if (section === "guides") return guidesCopy[lang];
  if (section === "terms") return termsCopy[lang];
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}): Promise<Metadata> {
  const { lang, section } = await params;
  if (!activeLangs.includes(lang as UiLang)) return {};
  const l = lang as UiLang;
  const s = sectionFromSlug(l, section);
  if (!s) return {};

  const title = s === "book" ? editions[l].title : copyFor(s, l)!.title;
  const description = s === "book" ? editions[l].lead : copyFor(s, l)!.lead;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${sectionPath(l, s)}`,
      languages: langAlternates({
        en: `${SITE_URL}${sectionPath("en", s)}`,
        es: `${SITE_URL}${sectionPath("es", s)}`,
      }),
    },
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}) {
  const { lang, section } = await params;
  if (!activeLangs.includes(lang as UiLang)) notFound();
  const l = lang as UiLang;
  const s = sectionFromSlug(l, section);
  if (!s) notFound();
  const t = dictionaries[l];

  if (s === "book") return <BookSection lang={l} />;

  const copy = copyFor(s, l)!;
  const crumbs = breadcrumbs(l, [{ name: t.nav[s], path: sectionPath(l, s) }]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLd(
              organization(),
              crumbs,
              {
                "@type": "Article",
                headline: copy.title,
                description: copy.lead,
                inLanguage: t.htmlLang,
                dateModified: SITE_UPDATED,
                author: { "@type": "Organization", name: PUBLISHER },
                publisher: { "@id": `${SITE_URL}/#publisher` },
                citation: SOURCES.map((src) => ({
                  "@type": "CreativeWork",
                  name: src.title,
                  publisher: { "@type": "Organization", name: src.publisher },
                  url: src.url,
                })),
              },
              ...(copy.faq ? [faqPage(copy.faq)] : [])
            )
          ),
        }}
      />

      <div className="pagehead">
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
      </div>

      <section className="band">
        <div className="wrap">
          <div className="teach">
            {copy.body.map((p) => (
              <p className="teach-p" key={p.slice(0, 40)}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {s === "ages" && <AgeLabels lang={l} />}
      {s === "ages" && <AgeLadder lang={l} />}
      {s === "printables" && <SheetGrid lang={l} />}
      {s === "guides" && <GuideList lang={l} />}

      {copy.faq && (
        <section className="band band--cream">
          <div className="wrap">
            <div className="teach">
              <h2 className="section">
                {l === "en" ? "Questions parents ask" : "Preguntas que hacen los padres"}
              </h2>
              <div className="faq faq--two">
                {copy.faq.map((item) => (
                  <details key={item.q}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {s !== "about" && s !== "terms" && <Sources lang={l} />}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Что означают цифры на обложке                                      */
/* ------------------------------------------------------------------ */

/* Самый частый запрос темы это возраст: родители дописывают его почти
   к каждому поиску. Но цифра на обложке ничего не гарантирует, и никто
   об этом родителю не говорит. Этот блок говорит. */

function AgeLabels({ lang }: { lang: UiLang }) {
  return (
    <section className="band band--pink">
      <div className="wrap">
        <h2 className="section">
          {lang === "en"
            ? "What the age on the cover actually means"
            : "Qué significa de verdad la edad de la portada"}
        </h2>
        <p className="lead">
          {lang === "en"
            ? "There is no standard behind these numbers and no body that checks them. The publisher chooses the range, which is why two books both labelled ages 2-4 can differ by a factor of two in difficulty. Here is what each label usually means and where it misleads."
            : "No hay ningún estándar detrás de estos números ni ningún organismo que los compruebe. La editorial elige el rango, y por eso dos libros marcados los dos de 2 a 4 años pueden diferir al doble en dificultad. Esto es lo que suele significar cada etiqueta y dónde induce a error."}
        </p>
        <ul className="labels">
          {ageLabels.map((al) => {
            const st = stageById(al.stage as StageId);
            return (
              <li className="label-card" key={al.label}>
                <p className="label-card__n">
                  {lang === "en" ? `Ages ${al.label}` : `De ${al.label} años`}
                </p>
                <p className="label-card__stage">
                  <Link href={itemPath(lang, "ages", st.slug[lang])}>{st.title[lang]}</Link>
                </p>
                <p className="label-card__means">{al.means[lang]}</p>
                <p className="label-card__watch">
                  <b>{lang === "en" ? "Watch out" : "Ojo"}</b>
                  {al.watch[lang]}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Лестница этапов на странице "по возрасту"                          */
/* ------------------------------------------------------------------ */

function AgeLadder({ lang }: { lang: UiLang }) {
  return (
    <section className="band band--mint">
      <div className="wrap">
        <h2 className="section">
          {lang === "en" ? "The four stages, in order" : "Las cuatro etapas, en orden"}
        </h2>
        <ul className="guides">
          {stages.map((st) => (
            <li key={st.id}>
              <Link href={itemPath(lang, "ages", st.slug[lang])}>{st.title[lang]}</Link>
              <span>
                <b>{st.ageLabel[lang]}</b>
                {". "}
                {st.can[lang][0]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Список руководств                                                  */
/* ------------------------------------------------------------------ */

function GuideList({ lang }: { lang: UiLang }) {
  return (
    <section className="band band--mint">
      <div className="wrap">
        <ul className="guides">
          {guides.map((g) => (
            <li key={g.id}>
              <Link href={itemPath(lang, "guides", g.slug[lang])}>{g.title[lang]}</Link>
              <span>{g.lead[lang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Сетка бесплатных листов, разложенная по уровням                    */
/* ------------------------------------------------------------------ */

function SheetGrid({ lang }: { lang: UiLang }) {
  const c = dictionaries[lang].common;
  return (
    <section className="band">
      <div className="wrap">
        <div className="sheets">
          {sheets.map((sh) => (
            <figure className="sheet" key={sh.id}>
              <a className="sheet__link" href={sheetPdf(sh.id, lang, "letter")} download>
                <img
                  src={sheetPreview(sh.id, lang)}
                  alt={
                    lang === "en"
                      ? `Page from the book, free to print: ${sh.name.en}, thick outlines, one drawing per page`
                      : `Página del libro, gratis para imprimir: ${sh.name.es}, contornos gruesos, un dibujo por página`
                  }
                  loading="lazy"
                />
              </a>
              <h3>{sh.name[lang]}</h3>
              <p className="sheet__links">
                <a className="btn btn--sky" href={sheetPdf(sh.id, lang, "letter")} download>
                  {c.letter}
                </a>
                <a className="btn btn--ghost" href={sheetPdf(sh.id, lang, "a4")} download>
                  {c.a4}
                </a>
              </p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Страница книги                                                     */
/* ------------------------------------------------------------------ */

function BookSection({ lang }: { lang: UiLang }) {
  const t = dictionaries[lang];
  const ed = editions[lang];
  const other = editions[lang === "en" ? "es" : "en"];

  const data = jsonLd(
    organization(),
    breadcrumbs(lang, [{ name: t.nav.book, path: sectionPath(lang, "book") }]),
    {
      "@type": "Book",
      name: ed.title,
      bookFormat: "https://schema.org/Paperback",
      numberOfPages: BOOK.pages,
      inLanguage: t.htmlLang,
      datePublished: ed.published,
      author: { "@type": "Person", name: AUTHOR.name, sameAs: [AUTHOR.amazon] },
      publisher: { "@id": `${SITE_URL}/#publisher` },
      description: ed.lead,
      audience: { "@type": "PeopleAudience", suggestedMinAge: 1, suggestedMaxAge: 3 },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: ed.rating.value,
        reviewCount: ed.rating.count,
      },
      offers: {
        "@type": "Offer",
        price: ed.price.replace("$", ""),
        priceCurrency: "USD",
        url: BOOK.amazonUrl(ed.asin),
        availability: "https://schema.org/InStock",
      },
      /* Ролик описан словами: нейросети и поисковики видео не смотрят,
         они читают это описание. Без него ролик для них не существует. */
      video: {
        "@type": "VideoObject",
        name:
          lang === "en"
            ? `Flip through of ${ed.title}`
            : `Recorrido por ${ed.title}`,
        description: ed.video.description,
        thumbnailUrl: `${SITE_URL}${ed.video.poster}`,
        contentUrl: `${SITE_URL}${ed.video.src}`,
        uploadDate: ed.published,
        duration: `PT${ed.video.seconds}S`,
      },
    },
    faqPage(ed.faq)
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />

      <div className="wrap">
        <div className="book">
          <div className="book__cover">
            <div className="inner">
              <img src={ed.cover} alt={ed.title} width={ed.coverSize.w} height={ed.coverSize.h} />
            </div>
          </div>

          <div>
            <h1>{ed.title}</h1>
            <p className="subtitle">{ed.subtitle}</p>

            <ul className="key-specs">
              <li>
                <span className="key-specs__label">{lang === "en" ? "Ages" : "Edad"}</span>
                <span className="key-specs__value">{BOOK.ages}</span>
              </li>
              <li>
                <span className="key-specs__label">{lang === "en" ? "Drawings" : "Dibujos"}</span>
                <span className="key-specs__value">{BOOK.drawings}</span>
              </li>
              <li>
                <span className="key-specs__label">{lang === "en" ? "Pages" : "Páginas"}</span>
                <span className="key-specs__value">{BOOK.pages}</span>
              </li>
              <li>
                <span className="key-specs__label">{lang === "en" ? "Size" : "Tamaño"}</span>
                <span className="key-specs__value">{ed.size}</span>
              </li>
            </ul>

            <p className="lead-text">{ed.lead}</p>

            <div className="top-trust">
              <p className="top-price">
                <span className="top-price__value">{ed.price}</span>
                <span className="top-price__label">
                  {lang === "en" ? "paperback on Amazon" : "tapa blanda en Amazon"}
                </span>
              </p>
            </div>

            <p className="buys">
              <a
                className="btn btn--pink"
                href={BOOK.amazonUrl(ed.asin)}
                rel="nofollow sponsored noopener"
                target="_blank"
              >
                {t.common.amazon}
              </a>
            </p>
            <p className="buy-note">
              {lang === "en"
                ? "Sold and shipped by Amazon. We earn from the sale."
                : "Vendido y enviado por Amazon. Nosotros ganamos con la venta."}
            </p>
          </div>
        </div>
      </div>

      <div className="wrap book-body">
        {/* Три картинки: простая форма, крупный рисунок, узнаваемый предмет.
            Ровно те три свойства, о которых говорит весь сайт. */}
        <div className="showcase">
          <div className="artwork">
            {BOOK.artwork.map((a) => (
              <img key={a.file} src={a.file} alt={a.alt[lang]} loading="lazy" />
            ))}
          </div>
        </div>

        {/* Ролик. Снимает главное сомнение родителя: что там внутри. */}
        <div className="video-card">
          <video
            className="video-card__media"
            controls
            preload="none"
            poster={ed.video.poster}
            width={ed.video.w}
            height={ed.video.h}
          >
            <source src={ed.video.src} type="video/mp4" />
          </video>
          <div className="video-card__text">
            <p className="video-card__lead">
              {lang === "en"
                ? "An unedited flip through, filmed on a table. Cover, back cover, and page after page, so you can see the line thickness and how much of the sheet one drawing takes up before you decide."
                : "Un recorrido sin cortes, filmado sobre una mesa. Portada, contraportada y una página tras otra, para que vea el grosor de la línea y cuánto ocupa un dibujo en la hoja antes de decidir."}
            </p>
            <ul className="inside">
              {ed.inside.slice(0, 4).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="section">{lang === "en" ? "What is inside" : "Qué hay dentro"}</h2>
        <ul className="inside">
          {ed.inside.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <h2 className="section">{lang === "en" ? "Who it is for" : "Para quién es"}</h2>
        <p>{ed.forWhom}</p>

        {/* Кому книга не подходит. Стоит рядом с "кому подходит",
            а не спрятано внизу. Родитель, которому один раз сказали
            правду, возвращается. */}
        <h2 className="section">
          {lang === "en" ? "When this book is the wrong choice" : "Cuándo este libro no es la opción"}
        </h2>
        <p>{ed.notFor}</p>
        <p>
          <Link className="btn btn--ghost" href={sectionPath(lang, "ages")}>
            {dictionaries[lang].nav.ages}
          </Link>
        </p>

        <h2 className="section">
          {lang === "en" ? "Questions parents ask" : "Preguntas que hacen los padres"}
        </h2>
        <div className="faq faq--two">
          {ed.faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>

        {/* Издание на другом языке. Отдельной строкой, не карточкой:
            карточка спорила бы с основной книгой. */}
        <p className="teach-other" style={{ marginTop: "var(--gap-4)" }}>
          <span>
            {lang === "en"
              ? "The same 111 drawings with the words in Spanish underneath, as a separate book."
              : "Los mismos 111 dibujos con las palabras en inglés debajo, como libro aparte."}
          </span>
          <a
            className="btn btn--mint"
            href={BOOK.amazonUrl(other.asin)}
            rel="nofollow sponsored noopener"
            target="_blank"
          >
            {other.title}
          </a>
        </p>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Источники                                                          */
/* ------------------------------------------------------------------ */

export function Sources({ lang }: { lang: UiLang }) {
  const t = dictionaries[lang].home;
  return (
    <section className="band">
      <div className="wrap">
        <h2 className="section">{t.sourcesTitle}</h2>
        <p className="lead">{t.sourcesLead}</p>
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
  );
}
