import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { activeLangs, dictionaries } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";
import { stages, stageBySlug, stageById } from "@/data/stages";
import { guides, guideBySlug } from "@/data/guides";
import type { Guide } from "@/data/guides";
import { sample, sheetPreview, sheetPdf } from "@/data/sheets";
import { editions, BOOK } from "@/data/book";
import { sectionFromSlug, sectionSlugs, sectionPath, itemPath } from "@/lib/routes";
import { SITE_URL, SOURCES, SITE_UPDATED, PUBLISHER } from "@/lib/site";
import { jsonLd, organization, breadcrumbs, langAlternates, faqPage } from "@/lib/schema";
import { Sources } from "../page";

/* Страница одного этапа.

   Смысл в том, что это самостоятельная страница, а не кусок общей.
   Родитель ищет "чем занять двухлетку" или "почему ребенок не попадает
   в контур" и должен попасть на страницу, которая отвечает целиком,
   не отсылая читать что-то еще. Это и есть принцип матрешки:
   каждая страница закрывает свою тему до конца. */

export function generateStaticParams() {
  const out: { lang: string; section: string; slug: string }[] = [];
  for (const lang of activeLangs) {
    for (const st of stages) {
      out.push({ lang, section: sectionSlugs[lang].ages, slug: st.slug[lang] });
    }
    for (const g of guides) {
      out.push({ lang, section: sectionSlugs[lang].guides, slug: g.slug[lang] });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; section: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, section, slug } = await params;
  if (!activeLangs.includes(lang as UiLang)) return {};
  const l = lang as UiLang;
  const sec = sectionFromSlug(l, section);

  if (sec === "guides") {
    const g = guideBySlug(l, slug);
    if (!g) return {};
    return {
      title: g.title[l],
      description: g.lead[l],
      alternates: {
        canonical: `${SITE_URL}${itemPath(l, "guides", g.slug[l])}`,
        languages: langAlternates({
          en: `${SITE_URL}${itemPath("en", "guides", g.slug.en)}`,
          es: `${SITE_URL}${itemPath("es", "guides", g.slug.es)}`,
        }),
      },
    };
  }

  if (sec !== "ages") return {};
  const st = stageBySlug(l, slug);
  if (!st) return {};

  const title =
    l === "en"
      ? `${st.title.en}: coloring at ${st.ageLabel.en}`
      : `${st.title.es}: colorear a ${st.ageLabel.es}`;

  return {
    title,
    description: st.can[l].join(". ") + ". " + st.notYet[l],
    alternates: {
      canonical: `${SITE_URL}${itemPath(l, "ages", st.slug[l])}`,
      languages: langAlternates({
        en: `${SITE_URL}${itemPath("en", "ages", st.slug.en)}`,
        es: `${SITE_URL}${itemPath("es", "ages", st.slug.es)}`,
      }),
    },
  };
}

export default async function StagePage({
  params,
}: {
  params: Promise<{ lang: string; section: string; slug: string }>;
}) {
  const { lang, section, slug } = await params;
  if (!activeLangs.includes(lang as UiLang)) notFound();
  const l = lang as UiLang;
  const sec = sectionFromSlug(l, section);
  if (sec === "guides") {
    const g = guideBySlug(l, slug);
    if (!g) notFound();
    return <GuideArticle lang={l} guide={g} />;
  }
  if (sec !== "ages") notFound();
  const st = stageBySlug(l, slug);
  if (!st) notFound();

  const t = dictionaries[l];
  const ed = editions[l];
  const picks = sample(4);

  /* Соседние этапы: предыдущий и следующий. Родитель, попавший не туда,
     должен выйти на нужную страницу в один шаг, а не через меню. */
  const i = stages.findIndex((s) => s.id === st.id);
  const neighbours = [stages[i - 1], stages[i + 1]].filter(Boolean);

  const title =
    l === "en"
      ? `${st.title.en}: coloring at ${st.ageLabel.en}`
      : `${st.title.es}: colorear a ${st.ageLabel.es}`;

  const data = jsonLd(
    organization(),
    breadcrumbs(l, [
      { name: t.nav.ages, path: sectionPath(l, "ages") },
      { name: st.title[l], path: itemPath(l, "ages", st.slug[l]) },
    ]),
    {
      "@type": "Article",
      headline: title,
      description: st.notYet[l],
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
    }
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />

      <div className="pagehead">
        <h1>{title}</h1>
        <p>{st.notYet[l]}</p>
      </div>

      <section className="band">
        <div className="wrap">
          <div className="teach">
            <h2 className="section">
              {l === "en"
                ? "What a child at this stage can usually do"
                : "Lo que suele poder hacer un niño en esta etapa"}
            </h2>
            <ul className="teach-list">
              {st.can[l].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <h2 className="section" style={{ marginTop: "var(--gap-4)" }}>
              {l === "en" ? "What to look for in a page" : "Qué buscar en una hoja"}
            </h2>
            <ul className="teach-list">
              {st.lookFor[l].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Образцы страниц из книги. Только тем, кому книга подходит:
          родителю, чей ребенок ее перерос, печатать образцы незачем. */}
      {st.bookFit !== "outgrown" && (
      <section className="band band--cream">
        <div className="wrap">
          <h2 className="section">
            {l === "en" ? "Pages for this stage, free to print" : "Hojas para esta etapa, gratis"}
          </h2>
          <div className="sheets">
            {picks.map((sh) => (
              <figure className="sheet" key={sh.id}>
                <a className="sheet__link" href={sheetPdf(sh.id, l, "letter")} download>
                  <img
                    src={sheetPreview(sh.id, l)}
                    alt={
                      l === "en"
                        ? `Free printable coloring page: ${sh.name.en}`
                        : `Dibujo para colorear gratis: ${sh.name.es}`
                    }
                    loading="lazy"
                  />
                </a>
                <h3>{sh.name[l]}</h3>
                <p className="sheet__links">
                  <a className="btn btn--sky" href={sheetPdf(sh.id, l, "letter")} download>
                    {t.common.letter}
                  </a>
                  <a className="btn btn--ghost" href={sheetPdf(sh.id, l, "a4")} download>
                    {t.common.a4}
                  </a>
                </p>
              </figure>
            ))}
          </div>
          <p>
            <Link className="btn btn--sun" href={sectionPath(l, "printables")}>
              {t.home.printablesCta}
            </Link>
          </p>
        </div>
      </section>
      )}

      {/* Книга только там, где она честно подходит. */}
      {st.bookFit !== "outgrown" && (
        <section className="band">
          <div className="wrap">
            <h2 className="section">
              {l === "en" ? "The book we publish for this stage" : "El libro que publicamos para esta etapa"}
            </h2>
            <div className="pick">
              <Link className="pick__cover" href={sectionPath(l, "book")}>
                <img src={ed.cover} alt={ed.title} width={ed.coverSize.w} height={ed.coverSize.h} />
              </Link>
              <div>
                <p className="subtitle">
                  <Link href={sectionPath(l, "book")}>{ed.title}</Link>
                </p>
                <p style={{ margin: "0 0 0.9rem" }}>{ed.lead}</p>
                <p style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", margin: 0 }}>
                  <Link className="btn btn--ghost" href={sectionPath(l, "book")}>
                    {t.home.bookCta}
                  </Link>
                  <a
                    className="btn btn--pink"
                    href={BOOK.amazonUrl(ed.asin)}
                    rel="nofollow sponsored noopener"
                    target="_blank"
                  >
                    {t.common.amazon} · {ed.price}
                  </a>
                </p>
                <p className="buy-note" style={{ marginBottom: 0 }}>
                  {l === "en"
                    ? "Sold and shipped by Amazon. We earn from the sale."
                    : "Vendido y enviado por Amazon. Nosotros ganamos con la venta."}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Соседние этапы. */}
      <section className="band band--mint">
        <div className="wrap">
          <h2 className="section">
            {l === "en" ? "Before and after this stage" : "Antes y después de esta etapa"}
          </h2>
          <ul className="guide-next" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))" }}>
            {neighbours.map((n) => (
              <li key={n.id}>
                <Link href={itemPath(l, "ages", n.slug[l])}>
                  <b>{n.title[l]}</b>
                  <span>
                    {n.ageLabel[l]}. {n.can[l][0]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Sources lang={l} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Страница одного руководства                                         */
/* ------------------------------------------------------------------ */

/* Устроена так же, как страница этапа, и по той же причине: человек
   приходит сюда из поиска с одним вопросом и должен получить на него
   полный ответ, не уходя никуда дальше.

   Короткий ответ стоит сразу под заголовком, до основного текста.
   Это тот кусок, который поисковик показывает в выдаче, а нейросеть
   забирает в ответ целиком, поэтому он написан как законченный ответ,
   а не как подводка к чтению. */

function GuideArticle({ lang, guide }: { lang: UiLang; guide: Guide }) {
  const t = dictionaries[lang];
  const ed = editions[lang];
  const picks = sample(4);
  const stage = guide.stage ? stageById(guide.stage) : null;
  const others = guides.filter((g) => g.id !== guide.id).slice(0, 3);

  const data = jsonLd(
    organization(),
    breadcrumbs(lang, [
      { name: t.nav.guides, path: sectionPath(lang, "guides") },
      { name: guide.title[lang], path: itemPath(lang, "guides", guide.slug[lang]) },
    ]),
    {
      "@type": "Article",
      headline: guide.title[lang],
      description: guide.lead[lang],
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
    faqPage(guide.faq[lang])
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />

      <div className="pagehead">
        <h1>{guide.title[lang]}</h1>
      </div>

      <section className="band">
        <div className="wrap">
          <div className="teach">
            {/* Короткий ответ. Стоит первым и набран крупнее текста:
                многие прочитают только его, и этого должно хватить. */}
            <p className="teach-def">{guide.lead[lang]}</p>
            {guide.body[lang].map((p) => (
              <p className="teach-p" key={p.slice(0, 40)}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--cream">
        <div className="wrap">
          <div className="teach">
            <h2 className="section">
              {lang === "en" ? "Questions parents ask" : "Preguntas que hacen los padres"}
            </h2>
            <div className="faq faq--two">
              {guide.faq[lang].map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Листы, на которых прочитанное можно проверить сегодня же. */}
      <section className="band">
        <div className="wrap">
          <h2 className="section">
            {lang === "en" ? "Try it on a page today" : "Pruébelo hoy en una hoja"}
          </h2>
          <div className="sheets">
            {picks.map((sh) => (
              <figure className="sheet" key={sh.id}>
                <a className="sheet__link" href={sheetPdf(sh.id, lang, "letter")} download>
                  <img
                    src={sheetPreview(sh.id, lang)}
                    alt={
                      lang === "en"
                        ? `Free printable coloring page: ${sh.name.en}`
                        : `Dibujo para colorear gratis: ${sh.name.es}`
                    }
                    loading="lazy"
                  />
                </a>
                <h3>{sh.name[lang]}</h3>
                <p className="sheet__links">
                  <a className="btn btn--sky" href={sheetPdf(sh.id, lang, "letter")} download>
                    {t.common.letter}
                  </a>
                  <a className="btn btn--ghost" href={sheetPdf(sh.id, lang, "a4")} download>
                    {t.common.a4}
                  </a>
                </p>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Этап, к которому статья ближе всего. Связь в обе стороны:
          из статьи в этап и из этапа обратно. */}
      {stage && (
        <section className="band band--mint">
          <div className="wrap">
            <h2 className="section">
              {lang === "en" ? "Where this fits in development" : "Dónde encaja esto en el desarrollo"}
            </h2>
            <ul className="guides">
              <li>
                <Link href={itemPath(lang, "ages", stage.slug[lang])}>{stage.title[lang]}</Link>
                <span>
                  <b>{stage.ageLabel[lang]}</b>
                  {". "}
                  {stage.can[lang][0]}
                </span>
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* Книга. В статьях она стоит тише, чем на страницах этапов:
          человек пришел с вопросом, а не за покупкой. */}
      <section className="band">
        <div className="wrap">
          <p className="teach-other">
            <span>
              {lang === "en"
                ? "We publish one coloring book for this age: 111 drawings, thick outlines, one per page, printed on one side."
                : "Publicamos un libro para colorear para esta edad: 111 dibujos, contornos gruesos, uno por página, impreso por una cara."}
            </span>
            <Link className="btn btn--ghost" href={sectionPath(lang, "book")}>
              {t.home.bookCta}
            </Link>
          </p>
        </div>
      </section>

      <section className="band band--cream">
        <div className="wrap">
          <h2 className="section">{lang === "en" ? "Read next" : "Siga leyendo"}</h2>
          <ul className="guide-next">
            {others.map((g) => (
              <li key={g.id}>
                <Link href={itemPath(lang, "guides", g.slug[lang])}>
                  <b>{g.title[lang]}</b>
                  <span>{g.lead[lang].slice(0, 120)}...</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Sources lang={lang} />
    </>
  );
}
