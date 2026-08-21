import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Picker from "@/components/Picker";
import { activeLangs, dictionaries } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";
import { stages } from "@/data/stages";
import { sample, sheetPreview } from "@/data/sheets";
import { editions, BOOK } from "@/data/book";
import { homePath, sectionPath } from "@/lib/routes";
import { SITE_URL, SOURCES, SITE_UPDATED } from "@/lib/site";
import { jsonLd, organization, website, breadcrumbs, langAlternates } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!activeLangs.includes(lang as UiLang)) return {};
  const l = lang as UiLang;
  const t = dictionaries[l].home;
  return {
    title: t.hero,
    description: t.lead,
    alternates: {
      canonical: `${SITE_URL}${homePath(l)}`,
      languages: langAlternates({
        en: `${SITE_URL}${homePath("en")}`,
        es: `${SITE_URL}${homePath("es")}`,
      }),
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!activeLangs.includes(lang as UiLang)) notFound();
  const l = lang as UiLang;
  const t = dictionaries[l];
  const ed = editions[l];

  const data = jsonLd(
    organization(),
    website(l),
    breadcrumbs(l, []),
    /* Страница описана как справочная, а не как витрина товара.
       Так ее и читают: сначала объяснение, потом уже книга. */
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${homePath(l)}#page`,
      name: t.home.hero,
      description: t.home.lead,
      inLanguage: t.htmlLang,
      dateModified: SITE_UPDATED,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      /* Чем страница подкреплена. Это тот самый сигнал, по которому
         нейросеть решает, можно ли на страницу опереться. */
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

      {/* Первый экран: вопрос, ответ на который человек и искал,
          и сразу инструмент. Ни картинки во весь экран, ни слогана. */}
      <section className="band">
        <div className="wrap">
          <h1 className="hero" style={{ maxWidth: "22ch" }}>{t.home.hero}</h1>
          <p className="lead">{t.home.lead}</p>
        </div>
      </section>

      <section className="band band--mint" id="picker">
        <div className="wrap">
          <h2 className="section" style={{ textAlign: "center" }}>{t.home.pickerTitle}</h2>
          <p className="lead" style={{ textAlign: "center", marginInline: "auto" }}>
            {t.home.pickerLead}
          </p>
          <Picker lang={l} />
        </div>
      </section>

      {/* Что это за сайт. Абзац стоит высоко и написан так, чтобы его
          можно было процитировать целиком: одна законченная мысль,
          без отсылок к тому, что выше и ниже. */}
      <section className="band">
        <div className="wrap">
          <h2 className="section">{t.home.whatTitle}</h2>
          <p className="what-lead">{t.home.whatText}</p>
        </div>
      </section>

      {/* Четыре этапа списком. Это скелет всего сайта: каждый этап
          дальше получит свою страницу. */}
      <section className="band band--cream">
        <div className="wrap">
          <h2 className="section">
            {l === "en" ? "The four stages of first drawing" : "Las cuatro etapas del primer dibujo"}
          </h2>
          <p className="lead">
            {l === "en"
              ? "Children move through these in the same order, at their own pace. The age beside each one is where most children are, not a deadline."
              : "Los niños pasan por estas etapas en el mismo orden, cada uno a su ritmo. La edad que acompaña a cada una es donde está la mayoría, no un plazo."}
          </p>
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

      {/* Почему первая раскраска устроена иначе. Пять пунктов,
          каждый законченный сам по себе. */}
      <section className="band">
        <div className="wrap">
          <h2 className="section">{t.home.whyTitle}</h2>
          <ul className="why-list">
            {t.home.why.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Бесплатные листы. Главная приманка и одновременно доказательство,
          что мы понимаем, о чем говорим. */}
      <section className="band band--pink">
        <div className="wrap">
          <h2 className="section">{t.home.printablesTitle}</h2>
          <p className="lead">{t.home.printablesLead}</p>
          <div className="result__sheets" style={{ maxWidth: "40rem" }}>
            {sample(3).map((s) => (
              <img
                key={s.id}
                src={sheetPreview(s.id, l)}
                alt={
                  l === "en"
                    ? `Free printable coloring page for toddlers: ${s.name.en}`
                    : `Dibujo para colorear gratis para niños pequeños: ${s.name.es}`
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

      {/* Книга. Стоит внизу намеренно: сначала польза, потом товар. */}
      <section className="band band--cream">
        <div className="wrap">
          <h2 className="section">{t.home.bookTitle}</h2>
          <p className="lead">{t.home.bookLead}</p>
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
              {/* Про заработок сказано рядом с каждой кнопкой покупки,
                  а не один раз мелким шрифтом на отдельной странице.
                  Совет стоит дешевле, когда читатель не знает,
                  как советчику платят. */}
              <p className="buy-note">
                {l === "en"
                  ? "Sold and shipped by Amazon. We earn from the sale."
                  : "Vendido y enviado por Amazon. Nosotros ganamos con la venta."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Источники. Открыто и на видном месте. */}
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
