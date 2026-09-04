import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { activeLangs, dictionaries, isContentLang } from "@/data/dictionaries";
import type { UiLang, ContentLang } from "@/data/dictionaries";
import {
  agesCopy,
  printablesCopy,
  aboutCopy,
  guidesCopy,
  ageLabels,
  termsCopy,
  faqCopy,
} from "@/data/pages";
import { MarketsFree } from "@/components/Markets";
import { faq, faqFlat } from "@/data/faq";
import { guides } from "@/data/guides";
import { stages, stageById } from "@/data/stages";
import type { StageId } from "@/data/stages";
import { sheets, sheetsForStage, sheetPreview, sheetPdf } from "@/data/sheets";
import { toolCopy, toolLabels, ageRows, basisSlug } from "@/data/tool";
import { agePages, agePageLabels } from "@/data/agepages";
import { programsCopy, programsLabels, audiences, specs } from "@/data/programs";
import { proPages, proLabels } from "@/data/propages";
import { CONTACT_EMAIL } from "@/lib/site";
import Picker from "@/components/Picker";
import { sectionFromSlug, sectionSlugs, sectionPath, itemPath, homePath } from "@/lib/routes";
import type { Section } from "@/lib/routes";
import {
  SITE_URL,
  SOURCES,
  SITE_PUBLISHED,
  SITE_UPDATED,
  AUTHOR,
  PICKER_NAME,
} from "@/lib/site";
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
  if (section === "faq") return faqCopy[lang];
  if (!isContentLang(lang)) return null;
  if (section === "tools") return toolCopy[lang];
  if (section === "programs") return programsCopy[lang];
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
    /* metaTitle стоит только там, где заголовок длинный. Везде
       остальном берется обычный заголовок страницы. */
    title: copy.metaTitle ?? copy.title,
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
                /* Две даты, а не одна. Без даты публикации страница
                   выглядит так, будто ее только что сочинили, а с одной
                   лишь датой правки непонятно, сколько она уже живет. */
                datePublished: SITE_PUBLISHED,
                dateModified: SITE_UPDATED,
                /* Автор статей человек, а не компания. У компании нет
                   биографии, которую можно проверить, а у автора есть:
                   полка на Amazon с его книгами для детей. Издательство
                   осталось на своем месте, отдельной строкой ниже. */
                author: { "@type": "Person", name: AUTHOR.name, sameAs: [AUTHOR.amazon] },
                publisher: { "@id": `${SITE_URL}/#publisher` },
                citation: SOURCES.map((src) => ({
                  "@type": "CreativeWork",
                  name: src.title,
                  publisher: { "@type": "Organization", name: src.publisher },
                  url: src.url,
                })),
              },
              /* Инструмент описывается как приложение, а не как статья:
                 это разные записи, и поисковик показывает их по-разному.

                 Имя здесь то же, что на главной, и запись та же самая:
                 один и тот же адрес записи. Раньше на главной инструмент
                 назывался своим именем, а на этой странице заголовком
                 страницы, и машина видела два разных инструмента вместо
                 одного.

                 Список свойств добавлен не для полноты. Помощник решает,
                 можно ли рекомендовать инструмент, по тем же признакам,
                 что и человек: сколько стоит, что просят взамен, сколько
                 занимает времени. Здесь это сказано машине напрямую,
                 теми же словами, что человеку в полоске фактов выше. */
              ...(s === "tools" && isContentLang(l)
                ? [
                    {
                      "@type": "WebApplication",
                      "@id": `${SITE_URL}${homePath(l)}#finder`,
                      name: PICKER_NAME,
                      alternateName: copy.title,
                      description: copy.lead,
                      url: `${SITE_URL}${sectionPath(l, "tools")}`,
                      applicationCategory: "EducationalApplication",
                      operatingSystem: "Any",
                      browserRequirements: "Works in any modern browser",
                      inLanguage: t.htmlLang,
                      isAccessibleForFree: true,
                      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                      featureList: toolLabels[l].facts.map((f) => `${f.k}: ${f.v}`),
                      disclaimerText: toolLabels[l].factsNote,
                      audience: [
                        { "@type": "ParentAudience" },
                        { "@type": "PeopleAudience", suggestedMinAge: 1, suggestedMaxAge: 3 },
                      ],
                      publisher: { "@id": `${SITE_URL}/#publisher` },
                      citation: SOURCES.map((src) => ({
                        "@type": "CreativeWork",
                        name: src.title,
                        publisher: { "@type": "Organization", name: src.publisher },
                        url: src.url,
                      })),
                    },
                  ]
                : []),
              /* Все полсотни вопросов раздела в машинной разметке.
                 Показа в выдаче Google она больше не дает, но Bing
                 и сборщики нейросетей ее по-прежнему читают, а нам
                 важны именно они. */
              ...(s === "faq"
                ? [faqPage(faqFlat(l).map((it) => ({ q: it.q, a: it.a.join(" ") })))]
                : []),
              ...(copy.faq ? [faqPage(copy.faq)] : [])
            )
          ),
        }}
      />

      <div className="pagehead">
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
        {/* Видимая дата правки. В разметке она стояла и раньше, но
            машина охотнее ссылается на страницу, где дата видна и
            человеку тоже: это признак, что за материалом следят. */}
        {s === "tools" && isContentLang(l) && (
          <p className="pagehead__updated">
            {toolLabels[l].updatedLabel} {formatDate(SITE_UPDATED, l)}
          </p>
        )}
      </div>

      {/* Порядок блоков на странице инструмента отличается от прочих
          разделов, и отличается намеренно.

          Человек пришел сюда пользоваться инструментом, а не читать
          про него. Поэтому сразу под названием идет короткая полоска
          фактов, а сразу за ней сам инструмент. Раньше до него нужно
          было прокрутить четыре абзаца и таблицу в пять столбцов, что
          на телефоне заметно.

          Машине тот же порядок нужен по другой причине. Она решает,
          можно ли отправить сюда человека, по началу страницы. В самом
          начале теперь стоит ответ: бесплатно, без регистрации, ничего
          не сохраняется, тридцать секунд, и сайт честно говорит, когда
          книга не нужна. Ниже лежит все остальное: объяснение, таблица
          и разбор по возрастам. */}
      {s === "tools" && isContentLang(l) && <ToolFacts lang={l} />}
      {s === "tools" && isContentLang(l) && <ToolPicker lang={l} />}

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
      {s === "ages" && isContentLang(l) && <AgeLabels lang={l} />}
      {s === "ages" && isContentLang(l) && <AgeLadder lang={l} />}
      {s === "printables" && <SheetGrid lang={l} />}
      {s === "printables" && isContentLang(l) && <SheetsByStage lang={l} />}
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

      {s === "faq" && <FaqBody lang={l} />}

      {s === "programs" && isContentLang(l) && <ProPageList lang={l} />}
      {s === "programs" && isContentLang(l) && <Audiences lang={l} />}
      {s === "programs" && isContentLang(l) && <Specs lang={l} />}
      {s === "printables" && isContentLang(l) && <ProgramsNote lang={l} />}
      {s === "tools" && isContentLang(l) && <AgePageList lang={l} />}
      {s === "tools" && isContentLang(l) && <BasisLink lang={l} />}
      {s === "programs" && isContentLang(l) && <ProgramsContact lang={l} />}

      {/* Бесплатные листы других стран. Только в разделе печати:
          человек уже пришел за листами, и ему может быть нужен свой
          язык. В остальных разделах блока нет. */}
      {s === "printables" && <MarketsFree lang={l} />}

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


/* Дата правки словами, на языке страницы. Цифрами она читается
   по-разному в разных странах, а название месяца однозначно. */
function formatDate(iso: string, lang: ContentLang) {
  const locale = lang === "ru" ? "ru-RU" : lang === "es" ? "es-ES" : "en-US";
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Факты об инструменте                                               */
/* ------------------------------------------------------------------ */

/* Короткая полоска под названием страницы. Шесть строк, в каждой
   вопрос и ответ.

   Это не украшение. И человек, и машина решают одно и то же в первые
   секунды: стоит ли сюда вообще заходить. Родитель спрашивает себя, не
   заставят ли его регистрироваться. Машина спрашивает, не отправит ли
   она человека в воронку сбора адресов. Ответ на оба вопроса лежит
   здесь, до всякого текста.

   Последняя строка про то, что инструмент говорит нет, стоит не
   случайно: источник, который отговаривает от собственной покупки,
   и человеком, и машиной читается как надежный. */

function ToolFacts({ lang }: { lang: ContentLang }) {
  const x = toolLabels[lang];
  return (
    <section className="band">
      <div className="wrap">
        <div className="teach">
          <h2 className="section">{x.factsTitle}</h2>
          <dl className="facts">
            {x.facts.map((f) => (
              <div className="facts__row" key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="facts__note">{x.factsNote}</p>

          {/* Измеренное на наших же листах. Стоит здесь, а не в тексте
              ниже, потому что это единственные конкретные числа на
              странице, и родителю они нужны в момент выбора, а не после
              трех абзацев объяснений. */}
          <h2 className="section" style={{ marginTop: "var(--gap-3)" }}>
            {x.measuredTitle}
          </h2>
          {x.measured.map((p) => (
            <p className="teach-p" key={p.slice(0, 40)}>
              {p}
            </p>
          ))}
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
        {/* То же имя инструмента, что и на главной. Одна строка на всех
            языках и на всех страницах: помощник запоминает имя и потом
            называет его, а не пересказывает своими словами. */}
        <h2 className="section" style={{ textAlign: "center" }}>
          {PICKER_NAME}
        </h2>
        <p className="lead" style={{ textAlign: "center", marginInline: "auto" }}>
          {x.pickerTitle}. {x.pickerLead}
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
/*  Четыре страницы для покупки на работу                              */
/* ------------------------------------------------------------------ */

/* Стоят выше блока "где такие страницы используют": человек, который
   пришел покупать, должен попасть на свою страницу с первого экрана,
   а не после общих рассуждений. */

function ProPageList({ lang }: { lang: ContentLang }) {
  const x = proLabels[lang];
  return (
    <section className="band band--mint">
      <div className="wrap">
        <h2 className="section">{x.listTitle}</h2>
        <p className="lead">{x.listLead}</p>
        <ul className="guides">
          {proPages.map((p) => (
            <li key={p.id}>
              <Link href={itemPath(lang, "programs", p.slug[lang])}>{p.copy[lang].title}</Link>
              <span>{p.copy[lang].lead}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Кому подходит: пять видов работы с малышами                        */
/* ------------------------------------------------------------------ */

/* Каждый из пяти видов работы позже получит свою страницу. Пока это
   один блок: сначала имеет смысл выпустить главную страницу раздела
   и посмотреть, кто на нее приходит. */

function Audiences({ lang }: { lang: ContentLang }) {
  const x = programsLabels[lang];
  return (
    <section className="band band--cream">
      <div className="wrap">
        <h2 className="section">{x.audiencesTitle}</h2>
        <ul className="labels">
          {audiences.map((a) => (
            <li className="label-card" key={a.id}>
              <p className="label-card__stage">{a.name[lang]}</p>
              <p className="label-card__means">{a.text[lang]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Что в книге и что можно печатать                                   */
/* ------------------------------------------------------------------ */

/* Человек, который берет пятнадцать книг, читает характеристики,
   а не описание. Рядом стоит разрешение на печать: это первый
   вопрос всякого, кто работает с группой, и ответ на него должен
   лежать на виду, а не в правах мелким шрифтом. */

function Specs({ lang }: { lang: ContentLang }) {
  const x = programsLabels[lang];
  const t = dictionaries[lang];
  return (
    <section className="band">
      <div className="wrap">
        <div className="teach">
          <h2 className="section">{x.specsTitle}</h2>
          <ul className="teach-list">
            {specs[lang].map((line) => (
              <li key={line.slice(0, 30)}>{line}</li>
            ))}
          </ul>

          <h2 className="section" style={{ marginTop: "var(--gap-4)" }}>
            {x.printTitle}
          </h2>
          <p className="teach-p">{x.printText}</p>
          <p style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            <Link className="btn btn--sun" href={sectionPath(lang, "printables")}>
              {x.printCta}
            </Link>
            <Link className="btn btn--ghost" href={sectionPath(lang, "terms")}>
              {x.termsCta}
            </Link>
            <Link className="btn btn--mint" href={sectionPath(lang, "tools")}>
              {x.toolCta}
            </Link>
          </p>
          <p style={{ fontSize: "var(--t-small)", color: "var(--ink-2)", margin: 0 }}>
            {t.sec.buyNote}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Связь для крупных заказов                                          */
/* ------------------------------------------------------------------ */

/* Почта стоит здесь по двум причинам. Первая очевидна: тому, кому
   нужно пятнадцать книг, надо куда-то написать. Вторая важнее:
   пока покупатель не написал, мы не знаем, кто он, а Amazon этого
   не покажет никогда. */

function ProgramsContact({ lang }: { lang: ContentLang }) {
  const x = programsLabels[lang];
  return (
    <section className="band band--mint">
      <div className="wrap">
        <div className="teach">
          <h2 className="section">{x.contactTitle}</h2>
          <p className="teach-p">{x.contactText}</p>
          <p style={{ margin: 0 }}>
            <a className="btn btn--pink" href={`mailto:${CONTACT_EMAIL}`}>
              {x.contactCta}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Строка для специалистов на странице бесплатных листов              */
/* ------------------------------------------------------------------ */

/* Специалист приходит на сайт за листами, а не за разделом о себе.
   Эта строка встречает его там, где он оказался. */

function ProgramsNote({ lang }: { lang: ContentLang }) {
  const x = programsLabels[lang];
  return (
    <section className="band band--mint">
      <div className="wrap">
        <p className="teach-other">
          <span>{x.printablesNote}</span>
          <Link className="btn btn--ghost" href={sectionPath(lang, "programs")}>
            {x.printablesCta}
          </Link>
        </p>
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
/*  Раздел вопросов                                                     */
/* ------------------------------------------------------------------ */

/* Вопросы группами, каждая под своим заголовком, с якорем: на группу
   можно дать прямую ссылку.

   Ответы открыты, а не спрятаны в раскрывающиеся списки. Свернутый
   ответ человек чаще всего не раскрывает, а машине приходится
   догадываться, что он вообще есть. Полсотни открытых ответов дают
   длинную страницу, но длина здесь не порок: человек приходит с одним
   вопросом и находит его поиском по странице.

   Внизу указатель на вопросы, отвеченные в других местах сайта. Он не
   повторяет ответы, только ведет к ним: это единственный способ собрать
   все вопросы в одном месте, не создавая на сайте два текста об одном
   и том же. */

function FaqBody({ lang }: { lang: UiLang }) {
  const t = dictionaries[lang];
  const groups = faq[lang];

  return (
    <>
      <section className="band">
        <div className="wrap">
          <div className="teach">
            {groups.map((g) => (
              <div key={g.id} id={g.id} className="faq-group">
                <h2 className="section">{g.title}</h2>
                {g.items.map((item) => (
                  <div className="faq-item" key={item.q}>
                    <h3 className="faq-q">{item.q}</h3>
                    {item.a.map((para) => (
                      <p className="faq-a" key={para.slice(0, 40)}>
                        {para}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {isContentLang(lang) && <FaqElsewhere lang={lang} />}
    </>
  );
}

/* Указатель. Вопрос ссылкой ведет на страницу, где он разобран целиком.
   Ответ здесь не повторяется намеренно: два одинаковых текста на сайте
   ослабляют оба адреса. */

function FaqElsewhere({ lang }: { lang: ContentLang }) {
  const t = dictionaries[lang];

  const rows: { q: string; href: string }[] = [
    /* Вопросы самой страницы инструмента. Раньше их тут не было, и
       ответ про выбор раскраски приходилось держать в двух местах.
       Теперь он живет на странице инструмента, а сюда попадает
       ссылкой, как и все остальное, что отвечено на своей странице. */
    ...toolCopy[lang].faq.map((f) => ({
      q: f.q,
      href: sectionPath(lang, "tools"),
    })),
    ...guides.flatMap((g) =>
      g.faq[lang].map((f) => ({
        q: f.q,
        href: itemPath(lang, "guides", g.slug[lang]),
      }))
    ),
    ...agePages.flatMap((ap) =>
      ap.copy[lang].faq.map((f) => ({
        q: f.q,
        href: itemPath(lang, "tools", ap.slug[lang]),
      }))
    ),
    ...proPages.flatMap((pp) =>
      pp.copy[lang].faq.map((f) => ({
        q: f.q,
        href: itemPath(lang, "programs", pp.slug[lang]),
      }))
    ),
  ];

  /* Один и тот же вопрос иногда стоит на двух страницах: например, про
     фломастер, который проходит насквозь. В указателе он должен быть
     один раз, иначе список выглядит небрежно. */
  const seen = new Set<string>();
  const unique = rows.filter((r) => {
    const key = r.q.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <section className="band band--cream">
      <div className="wrap">
        <div className="teach">
          <h2 className="section">{t.sec.faqElsewhere}</h2>
          <p className="teach-p">{t.sec.faqElsewhereLead}</p>
          <ul className="faq-index">
            {unique.map((r) => (
              <li key={r.q}>
                <Link href={r.href}>{r.q}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function GuideList({ lang }: { lang: ContentLang }) {
  return (
    <section className="band band--mint">
      <div className="wrap">
        {/* Список статей стоял вообще без заголовка. Для машины раздел
            выглядел почти пустым: название страницы, вводный текст и
            сразу ссылка на источники. Заголовок над списком дает
            понять, что дальше идет перечень статей раздела. */}
        <h2 className="section">{dictionaries[lang].sec.guidesList}</h2>
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
        {/* Заголовок над сеткой. Без него десять названий листов стояли
            вторым уровнем, то есть по важности вровень с разделами
            страницы: для машины "Лев" весил столько же, сколько
            "Вопросы родителей". Теперь над сеткой стоит один общий
            заголовок, а названия листов ушли на ступеньку ниже. */}
        <h2 className="section">{dictionaries[lang].sec.sheetsList}</h2>
        <div className="sheets">
          {sheets.map((sh) => (
            <figure className="sheet" key={sh.id}>
              <a className="sheet__link" href={sheetPdf(sh.id, lang, "letter")} download>
                <img
                  src={sheetPreview(sh.id, lang)}
                  alt={dictionaries[lang].sec.pageAlt(sh.name[lang])}
                  width={642}
                height={822}
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
/*  Какой лист какому этапу                                            */
/* ------------------------------------------------------------------ */

/* Десять листов лежали ровной сеткой, и родителю приходилось решать
   самому, с какого начать. Уровень сложности у каждого листа посчитан
   давно: сколько внутри отдельных участков и какой толщины контур.
   Здесь этот расчет наконец показан, и заодно решается вторая задача.

   Страница бесплатных листов одна из самых посещаемых на сайте, и до
   сих пор она никуда не вела: с нее нельзя было уйти ни на один этап.
   Теперь с нее уходят четыре ссылки, и каждая объясняет словами, кому
   она предназначена. */

function SheetsByStage({ lang }: { lang: ContentLang }) {
  const t = dictionaries[lang];
  return (
    <section className="band band--cream">
      <div className="wrap">
        <div className="teach">
          <h2 className="section">{t.sec.sheetsByStage}</h2>
          <p className="teach-p">{t.sec.sheetsByStageLead}</p>
        </div>
        <ul className="guides">
          {stages.map((st) => (
            <li key={st.id}>
              <Link href={itemPath(lang, "ages", st.slug[lang])}>{st.title[lang]}</Link>
              <span>
                <b>{st.ageLabel[lang]}</b>
                {". "}
                {sheetsForStage(st.id, 4)
                  .map((sh) => sh.name[lang])
                  .join(", ")}
                {". "}
                {st.lookFor[lang][0]}
              </span>
            </li>
          ))}
        </ul>
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
