import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { activeLangs, contentLangs, dictionaries, isContentLang } from "@/data/dictionaries";
import type { UiLang, ContentLang } from "@/data/dictionaries";
import { stages, stageBySlug, stageById } from "@/data/stages";
import { guides, guideBySlug } from "@/data/guides";
import type { Guide } from "@/data/guides";
import { sample, sheetPreview, sheetPdf } from "@/data/sheets";
import { editions, BOOK } from "@/data/book";
import { basisCopy, basisSlug, toolLabels } from "@/data/tool";
import { agePages, agePageBySlug, agePageLabels } from "@/data/agepages";
import { proPages, proPageBySlug, proLabels } from "@/data/propages";
import type { ProPage } from "@/data/propages";
import { CONTACT_EMAIL } from "@/lib/site";
import type { AgePage } from "@/data/agepages";
import { homePath, sectionFromSlug, sectionSlugs, sectionPath, itemPath } from "@/lib/routes";
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
  /* Справочная часть написана на всех трех языках, поэтому адреса
     строятся для каждого из них. */
  for (const lang of contentLangs) {
    for (const st of stages) {
      out.push({ lang, section: sectionSlugs[lang].ages, slug: st.slug[lang] });
    }
    for (const g of guides) {
      out.push({ lang, section: sectionSlugs[lang].guides, slug: g.slug[lang] });
    }
    /* Страница оснований лежит внутри раздела инструмента: правила
       подбора это часть инструмента, а не отдельная тема сайта. */
    out.push({ lang, section: sectionSlugs[lang].tools, slug: basisSlug[lang] });
    /* Возрастные страницы лежат в том же разделе: родитель приходит
       на них по запросу с цифрой, а инструмент стоит над ними. */
    for (const ap of agePages) {
      out.push({ lang, section: sectionSlugs[lang].tools, slug: ap.slug[lang] });
    }
    /* Четыре страницы для тех, кто покупает книгу на работу. */
    for (const pp of proPages) {
      out.push({ lang, section: sectionSlugs[lang].programs, slug: pp.slug[lang] });
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
  const ui = lang as UiLang;
  if (!isContentLang(ui)) return {};
  const l = ui;
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
          ru: `${SITE_URL}${itemPath("ru", "guides", g.slug.ru)}`,
        }),
      },
    };
  }

  if (sec === "programs") {
    const pp = proPageBySlug(l, slug);
    if (!pp) return {};
    const c = pp.copy[l];
    return {
      title: c.title,
      description: c.lead,
      alternates: {
        canonical: `${SITE_URL}${itemPath(l, "programs", pp.slug[l])}`,
        languages: langAlternates({
          en: `${SITE_URL}${itemPath("en", "programs", pp.slug.en)}`,
          es: `${SITE_URL}${itemPath("es", "programs", pp.slug.es)}`,
          ru: `${SITE_URL}${itemPath("ru", "programs", pp.slug.ru)}`,
        }),
      },
    };
  }

  if (sec === "tools") {
    const ap = agePageBySlug(l, slug);
    if (ap) {
      const c = ap.copy[l];
      return {
        title: c.title,
        description: c.lead,
        alternates: {
          canonical: `${SITE_URL}${itemPath(l, "tools", ap.slug[l])}`,
          languages: langAlternates({
            en: `${SITE_URL}${itemPath("en", "tools", ap.slug.en)}`,
            es: `${SITE_URL}${itemPath("es", "tools", ap.slug.es)}`,
            ru: `${SITE_URL}${itemPath("ru", "tools", ap.slug.ru)}`,
          }),
        },
      };
    }
    if (slug !== basisSlug[l]) return {};
    const b = basisCopy[l];
    return {
      title: b.title,
      description: b.lead,
      alternates: {
        canonical: `${SITE_URL}${itemPath(l, "tools", basisSlug[l])}`,
        languages: langAlternates({
          en: `${SITE_URL}${itemPath("en", "tools", basisSlug.en)}`,
          es: `${SITE_URL}${itemPath("es", "tools", basisSlug.es)}`,
          ru: `${SITE_URL}${itemPath("ru", "tools", basisSlug.ru)}`,
        }),
      },
    };
  }

  if (sec !== "ages") return {};
  const st = stageBySlug(l, slug);
  if (!st) return {};

  const title = dictionaries[l].sec.stageTitle(st.title[l], st.ageLabel[l]);

  return {
    title,
    description: st.can[l].join(". ") + ". " + st.notYet[l],
    alternates: {
      canonical: `${SITE_URL}${itemPath(l, "ages", st.slug[l])}`,
      languages: langAlternates({
        en: `${SITE_URL}${itemPath("en", "ages", st.slug.en)}`,
        es: `${SITE_URL}${itemPath("es", "ages", st.slug.es)}`,
        ru: `${SITE_URL}${itemPath("ru", "ages", st.slug.ru)}`,
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
  const ui = lang as UiLang;
  if (!isContentLang(ui)) notFound();
  const l = ui;
  const sec = sectionFromSlug(l, section);
  if (sec === "guides") {
    const g = guideBySlug(l, slug);
    if (!g) notFound();
    return <GuideArticle lang={l} guide={g} />;
  }
  if (sec === "programs") {
    const pp = proPageBySlug(l, slug);
    if (!pp) notFound();
    return <ProArticle lang={l} page={pp} />;
  }
  if (sec === "tools") {
    const ap = agePageBySlug(l, slug);
    if (ap) return <AgeArticle lang={l} page={ap} />;
    if (slug !== basisSlug[l]) notFound();
    return <BasisPage lang={l} />;
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

  const title = t.sec.stageTitle(st.title[l], st.ageLabel[l]);

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
            <h2 className="section">{t.picker.canTitle}</h2>
            <ul className="teach-list">
              {st.can[l].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <h2 className="section" style={{ marginTop: "var(--gap-4)" }}>
              {t.sec.lookForPage}
            </h2>
            <ul className="teach-list">
              {st.lookFor[l].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <h2 className="section" style={{ marginTop: "var(--gap-4)" }}>
              {t.sec.atTable}
            </h2>
            {st.atTable[l].map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Образцы страниц из книги. Только тем, кому книга подходит:
          родителю, чей ребенок ее перерос, печатать образцы незачем. */}
      {st.bookFit !== "outgrown" && (
      <section className="band band--cream">
        <div className="wrap">
          <h2 className="section">
            {t.sec.stagePages}
          </h2>
          <div className="sheets">
            {picks.map((sh) => (
              <figure className="sheet" key={sh.id}>
                <a className="sheet__link" href={sheetPdf(sh.id, l, "letter")} download>
                  <img
                    src={sheetPreview(sh.id, l)}
                    alt={t.sec.sheetAlt(sh.name[l])}
                    width={642}
                height={822}
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
              {t.picker.bookLine}
            </h2>
            <div className="pick">
              <Link className="pick__cover" href={homePath(l)}>
                <img src={ed.cover} alt={ed.title} width={ed.coverSize.w} height={ed.coverSize.h} />
              </Link>
              <div>
                <p className="subtitle">
                  <Link href={homePath(l)}>{ed.title}</Link>
                </p>
                <p style={{ margin: "0 0 0.9rem" }}>{ed.lead}</p>
                {/* Бумажная книга и файл для печати это два разных
                    товара, поэтому кнопки стоят рядом, а не вместо
                    друг друга. У русского издания пока нет ни того,
                    ни другого: там серая надпись, нажать нельзя. */}
                <p style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", margin: 0 }}>
                  <Link className="btn btn--ghost" href={homePath(l)}>
                    {t.home.bookCta}
                  </Link>
                  {ed.asin ? (
                    <a
                      className="btn btn--pink"
                      href={BOOK.amazonUrl(ed.asin)}
                      rel="nofollow sponsored noopener"
                      target="_blank"
                    >
                      {t.common.amazon}
                      {ed.price ? ` · ${ed.price}` : ""}
                    </a>
                  ) : null}
                  {ed.pdfUrl ? (
                    <a className="btn btn--sky" href={ed.pdfUrl} rel="noopener" target="_blank">
                      {t.sec.buyPdf}
                    </a>
                  ) : null}
                  {!ed.asin && !ed.pdfUrl ? (
                    <span className="btn btn--soon" aria-disabled="true">
                      {t.sec.soon}
                    </span>
                  ) : null}
                </p>
                <p className="buy-note" style={{ marginBottom: 0 }}>
                  {ed.asin ? t.sec.buyNote : ""}
                  {ed.asin && ed.pdfUrl ? " " : ""}
                  {ed.pdfUrl ? t.sec.pdfNote : ""}
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
            {t.sec.neighbours}
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

function GuideArticle({ lang, guide }: { lang: ContentLang; guide: Guide }) {
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
              {t.sec.questions}
            </h2>
            <div className="faq faq--two">
              {guide.faq[lang].map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
            {/* Отсюда человек уходит в общий раздел вопросов: здесь
                разобрано только то, что относится к этой странице. */}
            <p className="btn-row">
              <Link className="btn btn--ghost" href={sectionPath(lang, "faq")}>
                {t.sec.faqAll}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Листы, на которых прочитанное можно проверить сегодня же. */}
      <section className="band">
        <div className="wrap">
          <h2 className="section">
            {t.sec.tryToday}
          </h2>
          <div className="sheets">
            {picks.map((sh) => (
              <figure className="sheet" key={sh.id}>
                <a className="sheet__link" href={sheetPdf(sh.id, lang, "letter")} download>
                  <img
                    src={sheetPreview(sh.id, lang)}
                    alt={t.sec.sheetAlt(sh.name[lang])}
                    width={642}
                height={822}
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
              {t.sec.whereFits}
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
            <span>{t.sec.bookOneLiner}</span>
            <Link className="btn btn--ghost" href={homePath(lang)}>
              {t.home.bookCta}
            </Link>
          </p>
        </div>
      </section>

      <section className="band band--cream">
        <div className="wrap">
          <h2 className="section">{t.sec.readNext}</h2>
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

/* ------------------------------------------------------------------ */
/*  На чем основаны рекомендации                                       */
/* ------------------------------------------------------------------ */

/* Страница правил подбора.

   Она нужна не родителю в первую очередь, а тому, кто решает, можно
   ли этому инструменту верить: поисковику, нейросети и внимательному
   человеку. Инструмент, который называет свои правила вслух, стоит
   дороже инструмента, который говорит про себя "умный подбор".

   Здесь описано ровно то, что делает pickStage в data/stages.ts.
   Если правило там изменится, эта страница меняется вместе с ним. */

function BasisPage({ lang }: { lang: ContentLang }) {
  const t = dictionaries[lang];
  const b = basisCopy[lang];
  const x = toolLabels[lang];

  const data = jsonLd(
    organization(),
    breadcrumbs(lang, [
      { name: t.nav.tools, path: sectionPath(lang, "tools") },
      { name: b.title, path: itemPath(lang, "tools", basisSlug[lang]) },
    ]),
    {
      "@type": "Article",
      headline: b.title,
      description: b.lead,
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
        <h1>{b.title}</h1>
        <p>{b.lead}</p>
      </div>

      <section className="band">
        <div className="wrap">
          <div className="teach">
            {b.body.map((p) => (
              <p className="teach-p" key={p.slice(0, 40)}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Четыре признака и вес каждого. Вес назван словами, а не числом:
          число выглядело бы как точность, которой здесь нет. */}
      <section className="band band--cream">
        <div className="wrap">
          <h2 className="section">{b.signsTitle}</h2>
          <ul className="labels">
            {b.signs.map((sg) => (
              <li className="label-card" key={sg.name}>
                <p className="label-card__stage">{sg.name}</p>
                <p className="label-card__means">{sg.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Чего инструмент не делает. Этот блок важнее предыдущего:
          он снимает с родителя мысль, что сайт оценивает его ребенка. */}
      <section className="band band--mint">
        <div className="wrap">
          <div className="teach">
            <h2 className="section">{b.notTitle}</h2>
            <ul className="teach-list">
              {b.not.map((line) => (
                <li key={line.slice(0, 40)}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <p className="teach-other">
            <span>{x.pickerTitle}</span>
            <Link className="btn btn--pink" href={sectionPath(lang, "tools")}>
              {t.nav.tools}
            </Link>
          </p>
        </div>
      </section>

      <Sources lang={lang} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Страница одного возраста                                           */
/* ------------------------------------------------------------------ */

/* Родитель ищет "раскраска для 2 лет", с цифрой. Эта страница отвечает
   именно на такой запрос и отвечает целиком, не отсылая читать другое.

   Со страницей этапа она не спорит, потому что говорит о другом.
   Страница этапа объясняет, что происходит с рукой ребенка и почему.
   Эта отвечает родителю, который стоит перед полкой: что брать, что
   будет происходить за столом и что считать нормальным. Ссылки стоят
   в обе стороны, чтобы человек с любого входа дошел до нужного. */

function AgeArticle({ lang, page }: { lang: ContentLang; page: AgePage }) {
  const t = dictionaries[lang];
  const c = page.copy[lang];
  const x = agePageLabels[lang];
  const st = stageById(page.stage);
  const ed = editions[lang];
  const picks = sample(4);

  /* Соседние возрасты. Родитель, попавший не туда, должен уйти на
     нужную страницу в один шаг, а не через меню. */
  const others = agePages.filter((p) => p.id !== page.id);

  const data = jsonLd(
    organization(),
    breadcrumbs(lang, [
      { name: t.nav.tools, path: sectionPath(lang, "tools") },
      { name: c.title, path: itemPath(lang, "tools", page.slug[lang]) },
    ]),
    {
      "@type": "Article",
      headline: c.title,
      description: c.lead,
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
    faqPage(c.faq)
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />

      <div className="pagehead">
        <h1>{c.title}</h1>
        <p>{c.lead}</p>
      </div>

      <section className="band">
        <div className="wrap">
          <div className="teach">
            {c.body.map((p) => (
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
            <h2 className="section">{c.doTitle}</h2>
            <ul className="teach-list">
              {c.steps.map((line) => (
                <li key={line.slice(0, 40)}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Листы из книги, бесплатно. Родителю, который дочитал до сюда,
          проще один раз распечатать и посмотреть своими глазами, чем
          поверить нам на слово. */}
      <section className="band">
        <div className="wrap">
          <h2 className="section">{t.sec.stagePages}</h2>
          <div className="sheets">
            {picks.map((sh) => (
              <figure className="sheet" key={sh.id}>
                <a className="sheet__link" href={sheetPdf(sh.id, lang, "letter")} download>
                  <img
                    src={sheetPreview(sh.id, lang)}
                    alt={t.sec.sheetAlt(sh.name[lang])}
                    width={642}
                height={822}
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
          <p>
            <Link className="btn btn--sun" href={sectionPath(lang, "printables")}>
              {t.home.printablesCta}
            </Link>
          </p>
        </div>
      </section>

      <section className="band band--cream">
        <div className="wrap">
          <div className="teach">
            <h2 className="section">{t.sec.questions}</h2>
            <div className="faq faq--two">
              {c.faq.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
            {/* Отсюда человек уходит в общий раздел вопросов: здесь
                разобрано только то, что относится к этой странице. */}
            <p className="btn-row">
              <Link className="btn btn--ghost" href={sectionPath(lang, "faq")}>
                {t.sec.faqAll}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Книга. Все три возраста внутри того, для чего она сделана,
          поэтому здесь она стоит честно. */}
      <section className="band">
        <div className="wrap">
          <h2 className="section">{t.picker.bookLine}</h2>
          <div className="pick">
            <Link className="pick__cover" href={homePath(lang)}>
              <img
                src={ed.cover}
                alt={ed.title}
                width={ed.coverSize.w}
                height={ed.coverSize.h}
              />
            </Link>
            <div>
              <p className="subtitle">
                <Link href={homePath(lang)}>{ed.title}</Link>
              </p>
              <p style={{ fontSize: "var(--t-small)", margin: "0 0 0.9rem" }}>{ed.lead}</p>
              <p style={{ margin: 0 }}>
                {ed.asin ? (
                  <a
                    className="btn btn--pink"
                    href={BOOK.amazonUrl(ed.asin)}
                    rel="nofollow sponsored noopener"
                    target="_blank"
                  >
                    {t.common.amazon}
                    {ed.price ? ` · ${ed.price}` : ""}
                  </a>
                ) : null}
                {ed.pdfUrl ? (
                  <a className="btn btn--sky" href={ed.pdfUrl} rel="noopener" target="_blank">
                    {t.sec.buyPdf}
                  </a>
                ) : null}
                {!ed.asin && !ed.pdfUrl ? (
                  <span className="btn btn--soon" aria-disabled="true">
                    {t.sec.soon}
                  </span>
                ) : null}
              </p>
              <p className="buy-note" style={{ marginBottom: 0 }}>
                {ed.asin ? t.sec.buyNote : ""}
                {ed.asin && ed.pdfUrl ? " " : ""}
                {ed.pdfUrl ? t.sec.pdfNote : ""}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Соседние возрасты, этап и сам инструмент. Три выхода со
          страницы, каждый в свою сторону. */}
      <section className="band band--mint">
        <div className="wrap">
          <h2 className="section">{x.otherAges}</h2>
          <ul className="guides">
            {others.map((p) => (
              <li key={p.id}>
                <Link href={itemPath(lang, "tools", p.slug[lang])}>{p.copy[lang].title}</Link>
                <span>{p.copy[lang].lead}</span>
              </li>
            ))}
            <li>
              <Link href={itemPath(lang, "ages", st.slug[lang])}>{st.title[lang]}</Link>
              <span>
                <b>{st.ageLabel[lang]}</b>
                {". "}
                {x.stageLink}
              </span>
            </li>
            <li>
              <Link href={sectionPath(lang, "tools")}>{t.nav.tools}</Link>
              <span>{x.toolLink}</span>
            </li>
          </ul>
        </div>
      </section>

      <Sources lang={lang} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Страница для одного вида работы                                    */
/* ------------------------------------------------------------------ */

/* Разговор с коллегой, а не объяснение человеку, как ему работать.
   Мы говорим то, что знаем только мы: что внутри книги, сколько
   стоит, как получить пятнадцать штук, что можно печатать.

   Цель страницы покупка, поэтому книга с ценой стоит выше образцов,
   а не после них. Бесплатные листы здесь образец, по которому видно
   толщину контура до заказа, а не замена книги. */

function ProArticle({ lang, page }: { lang: ContentLang; page: ProPage }) {
  const t = dictionaries[lang];
  const c = page.copy[lang];
  const x = proLabels[lang];
  const ed = editions[lang];
  const picks = sample(3);
  const others = proPages.filter((p) => p.id !== page.id);

  const data = jsonLd(
    organization(),
    breadcrumbs(lang, [
      { name: t.nav.programs, path: sectionPath(lang, "programs") },
      { name: c.title, path: itemPath(lang, "programs", page.slug[lang]) },
    ]),
    {
      "@type": "Article",
      headline: c.title,
      description: c.lead,
      inLanguage: t.htmlLang,
      dateModified: SITE_UPDATED,
      author: { "@type": "Organization", name: PUBLISHER },
      publisher: { "@id": `${SITE_URL}/#publisher` },
    },
    faqPage(c.faq)
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />

      <div className="pagehead">
        <h1>{c.title}</h1>
        <p>{c.lead}</p>
      </div>

      <section className="band">
        <div className="wrap">
          <div className="teach">
            {c.body.map((p) => (
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
            <h2 className="section">{c.fitTitle}</h2>
            <ul className="teach-list">
              {c.fit.map((line) => (
                <li key={line.slice(0, 30)}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Книга с ценой. Стоит выше образцов: человек пришел сюда
          покупать, и прятать кнопку под бесплатным незачем. */}
      <section className="band">
        <div className="wrap">
          <h2 className="section">{x.buyTitle}</h2>
          <p className="lead">{x.buyLead}</p>
          <div className="pick">
            <Link className="pick__cover" href={homePath(lang)}>
              <img
                src={ed.cover}
                alt={ed.title}
                width={ed.coverSize.w}
                height={ed.coverSize.h}
              />
            </Link>
            <div>
              <p className="subtitle">
                <Link href={homePath(lang)}>{ed.title}</Link>
              </p>
              <p style={{ fontSize: "var(--t-small)", margin: "0 0 0.9rem" }}>{ed.lead}</p>
              <p style={{ margin: 0 }}>
                {ed.asin ? (
                  <a
                    className="btn btn--pink"
                    href={BOOK.amazonUrl(ed.asin)}
                    rel="nofollow sponsored noopener"
                    target="_blank"
                  >
                    {t.common.amazon}
                    {ed.price ? ` · ${ed.price}` : ""}
                  </a>
                ) : null}
                {ed.pdfUrl ? (
                  <a className="btn btn--sky" href={ed.pdfUrl} rel="noopener" target="_blank">
                    {t.sec.buyPdf}
                  </a>
                ) : null}
                {!ed.asin && !ed.pdfUrl ? (
                  <span className="btn btn--soon" aria-disabled="true">
                    {t.sec.soon}
                  </span>
                ) : null}
              </p>
              <p className="buy-note" style={{ marginBottom: 0 }}>
                {ed.asin ? t.sec.buyNote : ""}
                {ed.asin && ed.pdfUrl ? " " : ""}
                {ed.pdfUrl ? t.sec.pdfNote : ""}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Крупный заказ. Вторая причина этого блока в том, что пока
          покупатель не написал, мы не знаем, кто он. */}
      <section className="band band--mint">
        <div className="wrap">
          <div className="teach">
            <h2 className="section">{x.bulkTitle}</h2>
            <p className="teach-p">{x.bulkLead}</p>
            <p style={{ margin: 0 }}>
              <a className="btn btn--pink" href={`mailto:${CONTACT_EMAIL}`}>
                {x.bulkCta}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Образцы. Здесь это доказательство перед покупкой, а не
          бесплатная замена книги. */}
      <section className="band">
        <div className="wrap">
          <h2 className="section">{x.sampleTitle}</h2>
          <p className="lead">{x.sampleLead}</p>
          <div className="sheets">
            {picks.map((sh) => (
              <figure className="sheet" key={sh.id}>
                <a className="sheet__link" href={sheetPdf(sh.id, lang, "letter")} download>
                  <img
                    src={sheetPreview(sh.id, lang)}
                    alt={t.sec.sheetAlt(sh.name[lang])}
                    width={642}
                height={822}
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
          <p>
            <Link className="btn btn--sun" href={sectionPath(lang, "printables")}>
              {t.home.printablesCta}
            </Link>
          </p>
        </div>
      </section>

      <section className="band band--cream">
        <div className="wrap">
          <div className="teach">
            <h2 className="section">{t.sec.questions}</h2>
            <div className="faq faq--two">
              {c.faq.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
            {/* Отсюда человек уходит в общий раздел вопросов: здесь
                разобрано только то, что относится к этой странице. */}
            <p className="btn-row">
              <Link className="btn btn--ghost" href={sectionPath(lang, "faq")}>
                {t.sec.faqAll}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="band band--mint">
        <div className="wrap">
          <h2 className="section">{x.otherPages}</h2>
          <ul className="guides">
            {others.map((p) => (
              <li key={p.id}>
                <Link href={itemPath(lang, "programs", p.slug[lang])}>{p.copy[lang].title}</Link>
                <span>{p.copy[lang].lead}</span>
              </li>
            ))}
            <li>
              <Link href={sectionPath(lang, "programs")}>{t.nav.programs}</Link>
              <span>{x.backToSection}</span>
            </li>
          </ul>
        </div>
      </section>

      <Sources lang={lang} />
    </>
  );
}
