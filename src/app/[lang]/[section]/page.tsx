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
import { toolCopy, toolLabels, ageRows, basisSlug } from "@/data/tool";
import { agePages, agePageLabels } from "@/data/agepages";
import Picker from "@/components/Picker";
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
      /* Справочная часть написана на всех трех языках, поэтому
         адреса строятся для каждого. Если появится язык, на котором
         статей еще нет, проверка ниже в copyFor честно вернет
         "страницы нет", а не подставит чужой текст. */
      out.push({ lang, section: sectionSlugs[lang][s] });
    }
  }
  return out;
}

/* Раздел существует на языке только тогда, когда для него написан
   текст. Пустой раздел обязан честно ответить "страницы нет":
   подставлять чужой язык под адресом нельзя. */
function copyFor(section: Section, lang: UiLang) {
  if (section === "printables") return printablesCopy[lang];
  if (section === "about") return aboutCopy[lang];
  if (section === "terms") return termsCopy[lang];
  if (!isContentLang(lang)) return null;
  if (section === "tools") return toolCopy[lang];
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

  return {
    title: copy.title,
    description: copy.lead,
    alternates: {
      canonical: `${SITE_URL}${sectionPath(l, s)}`,
      languages: langAlternates({
        en: `${SITE_URL}${sectionPath("en", s)}`,
        es: `${SITE_URL}${sectionPath("es", s)}`,
        ru: `${SITE_URL}${sectionPath("ru", s)}`,
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
              /* Инструмент описывается как приложение, а не как статья:
                 это разные записи, и поисковик показывает их по-разному. */
              ...(s === "tools" && isContentLang(l)
                ? [
                    {
                      "@type": "WebApplication",
                      name: copy.title,
                      description: copy.lead,
                      url: `${SITE_URL}${sectionPath(l, "tools")}`,
                      applicationCategory: "EducationalApplication",
                      operatingSystem: "Any",
                      inLanguage: t.htmlLang,
                      isAccessibleForFree: true,
                      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                      publisher: { "@id": `${SITE_URL}/#publisher` },
                    },
                  ]
                : []),
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

      {/* Проверка нужна разбору типов: эти блоки берут тексты этапов
          и статей, а они есть только на языках справочной части. */}
      {s === "tools" && isContentLang(l) && <AgeTable lang={l} />}
      {s === "tools" && isContentLang(l) && <ToolPicker lang={l} />}
      {s === "ages" && isContentLang(l) && <AgeLabels lang={l} />}
      {s === "ages" && isContentLang(l) && <AgeLadder lang={l} />}
      {s === "printables" && <SheetGrid lang={l} />}
      {s === "guides" && isContentLang(l) && <GuideList lang={l} />}

      {copy.faq && (
        <section className="band band--cream">
          <div className="wrap">
            <div className="teach">
              <h2 className="section">{t.sec.questions}</h2>
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

      {s === "tools" && isContentLang(l) && <AgePageList lang={l} />}
      {s === "tools" && isContentLang(l) && <BasisLink lang={l} />}

      {s !== "about" && s !== "terms" && <Sources lang={l} />}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Таблица по возрастам                                               */
/* ------------------------------------------------------------------ */

/* Стоит выше подборщика намеренно. Подборщик показывает свой ответ
   только после нажатий, а таблица лежит на странице обычным текстом:
   ее читает поисковик, ее целиком берет нейросеть, и родителю, который
   пришел за одной строкой, не приходится ничего нажимать. */

function AgeTable({ lang }: { lang: ContentLang }) {
  const x = toolLabels[lang];
  return (
    <section className="band band--cream">
      <div className="wrap">
        <h2 className="section">{x.tableTitle}</h2>
        <p className="lead">{x.tableLead}</p>
        <div className="tablewrap">
          <table className="agetable">
            <thead>
              <tr>
                <th scope="col">{x.colAge}</th>
                <th scope="col">{x.colHand}</th>
                <th scope="col">{x.colPage}</th>
                <th scope="col">{x.colParts}</th>
                <th scope="col">{x.colTools}</th>
              </tr>
            </thead>
            <tbody>
              {ageRows.map((r) => {
                const st = stageById(r.stage as StageId);
                /* У первых трех строк есть своя возрастная страница,
                   и ссылка ведет туда. У последней строки такой
                   страницы нет: после четырех лет первая раскраска
                   уже мала, и вести туда родителя незачем. Он уходит
                   на страницу этапа, где сказано, что искать дальше. */
                const ap = agePages.find((p) => p.id === r.id);
                const href = ap
                  ? itemPath(lang, "tools", ap.slug[lang])
                  : itemPath(lang, "ages", st.slug[lang]);
                return (
                  <tr key={r.id}>
                    <th scope="row">
                      {r.age[lang]}
                      <Link href={href}>{x.moreAbout}</Link>
                    </th>
                    <td data-label={x.colHand}>{r.hand[lang]}</td>
                    <td data-label={x.colPage}>{r.page[lang]}</td>
                    <td data-label={x.colParts}>{r.parts[lang]}</td>
                    <td data-label={x.colTools}>{r.tools[lang]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Живой подбор                                                       */
/* ------------------------------------------------------------------ */

/* Тот же самый подборщик, что стоит на главной. Он здесь не копия:
   компонент один, и правится он в одном месте. */

function ToolPicker({ lang }: { lang: ContentLang }) {
  const x = toolLabels[lang];
  return (
    <section className="band band--mint" id="picker">
      <div className="wrap">
        <h2 className="section" style={{ textAlign: "center" }}>
          {x.pickerTitle}
        </h2>
        <p className="lead" style={{ textAlign: "center", marginInline: "auto" }}>
          {x.pickerLead}
        </p>
        <Picker lang={lang} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Разбор по возрастам                                                */
/* ------------------------------------------------------------------ */

/* Три страницы под инструментом, каждая под свой запрос с цифрой.
   Инструмент это центр, а они ловят конкретные поиски и ведут
   обратно к нему. */

function AgePageList({ lang }: { lang: ContentLang }) {
  const x = agePageLabels[lang];
  return (
    <section className="band">
      <div className="wrap">
        <h2 className="section">{x.listTitle}</h2>
        <p className="lead">{x.listLead}</p>
        <ul className="guides">
          {agePages.map((p) => (
            <li key={p.id}>
              <Link href={itemPath(lang, "tools", p.slug[lang])}>{p.copy[lang].title}</Link>
              <span>{p.copy[lang].lead}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Ссылка на страницу оснований                                       */
/* ------------------------------------------------------------------ */

/* Инструменту верят не за слово "подбор", а за перечисленные вслух
   правила. Правила лежат на отдельной странице, и ссылка на нее стоит
   прямо под инструментом, а не спрятана в подвале. */

function BasisLink({ lang }: { lang: ContentLang }) {
  const x = toolLabels[lang];
  return (
    <section className="band">
      <div className="wrap">
        <ul className="guides">
          <li>
            <Link href={itemPath(lang, "tools", basisSlug[lang])}>{x.basisLink}</Link>
            <span>{x.basisLinkLead}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Что означают цифры на обложке                                      */
/* ------------------------------------------------------------------ */

/* Самый частый запрос темы это возраст: родители дописывают его почти
   к каждому поиску. Но цифра на обложке ничего не гарантирует, и никто
   об этом родителю не говорит. Этот блок говорит. */

function AgeLabels({ lang }: { lang: ContentLang }) {
  const t = dictionaries[lang];
  return (
    <section className="band band--pink">
      <div className="wrap">
        <h2 className="section">{t.sec.coverAgeTitle}</h2>
        <p className="lead">{t.sec.coverAgeLead}</p>
        <ul className="labels">
          {ageLabels.map((al) => {
            const st = stageById(al.stage as StageId);
            return (
              <li className="label-card" key={al.label}>
                <p className="label-card__n">{t.sec.agesLabel(al.label)}</p>
                <p className="label-card__stage">
                  <Link href={itemPath(lang, "ages", st.slug[lang])}>{st.title[lang]}</Link>
                </p>
                <p className="label-card__means">{al.means[lang]}</p>
                <p className="label-card__watch">
                  <b>{t.sec.watchOut}</b>
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
        <h2 className="section">{dictionaries[lang].sec.stagesInOrder}</h2>
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
                  alt={dictionaries[lang].sec.pageAlt(sh.name[lang])}
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
