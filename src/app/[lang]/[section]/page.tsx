import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { activeLangs, dictionaries, isContentLang } from "@/data/dictionaries";
import type { UiLang, ContentLang } from "@/data/dictionaries";
import { agesCopy, printablesCopy, aboutCopy, guidesCopy, ageLabels, termsCopy } from "@/data/pages";
import { guides } from "@/data/guides";
import { stages, stageById } from "@/data/stages";
import type { StageId } from "@/data/stages";
import { sheets, sheetPreview, sheetPdf } from "@/data/sheets";
import { sectionFromSlug, sectionSlugs, sectionPath, itemPath } from "@/lib/routes";
import type { Section } from "@/lib/routes";
import { SITE_URL, SOURCES, SITE_UPDATED, PUBLISHER } from "@/lib/site";
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
      /* Этапы и статьи на русском еще не написаны: адрес для них
         не строим, чтобы не собирать заведомо пустую страницу. */
      if (!isContentLang(lang) && (s === "ages" || s === "guides")) continue;
      out.push({ lang, section: sectionSlugs[lang][s] });
    }
  }
  return out;
}

/* Этапы и статьи пока написаны на двух языках. На русском таких
   страниц нет, и адрес обязан честно ответить "страницы нет":
   подставлять английский текст под русским адресом нельзя. */
function copyFor(section: Section, lang: UiLang) {
  if (section === "printables") return printablesCopy[lang];
  if (section === "about") return aboutCopy[lang];
  if (section === "terms") return termsCopy[lang];
  if (!isContentLang(lang)) return null;
  if (section === "ages") return agesCopy[lang];
  if (section === "guides") return guidesCopy[lang];
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

  const copy = copyFor(s, l);
  if (!copy) return {};

  const everywhere = s === "printables" || s === "about" || s === "terms";

  return {
    title: copy.title,
    description: copy.lead,
    alternates: {
      canonical: `${SITE_URL}${sectionPath(l, s)}`,
      languages: langAlternates({
        en: `${SITE_URL}${sectionPath("en", s)}`,
        es: `${SITE_URL}${sectionPath("es", s)}`,
        ...(everywhere ? { ru: `${SITE_URL}${sectionPath("ru", s)}` } : {}),
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

  const copy = copyFor(s, l);
  if (!copy) notFound();
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

      {/* Этапы и статьи есть только на языках со справочной частью.
          Сюда русский попасть не может: copyFor выше уже ответил
          "страницы нет". Проверка нужна разбору типов. */}
      {s === "ages" && isContentLang(l) && <AgeLabels lang={l} />}
      {s === "ages" && isContentLang(l) && <AgeLadder lang={l} />}
      {s === "printables" && <SheetGrid lang={l} />}
      {s === "guides" && isContentLang(l) && <GuideList lang={l} />}

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

function AgeLabels({ lang }: { lang: ContentLang }) {
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

function AgeLadder({ lang }: { lang: ContentLang }) {
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

function GuideList({ lang }: { lang: ContentLang }) {
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
