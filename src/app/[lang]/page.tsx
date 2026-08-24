import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Picker from "@/components/Picker";
import { toolLabels } from "@/data/tool";
import { activeLangs, dictionaries, isContentLang } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";
import { stages } from "@/data/stages";
import { sample, sheetPreview } from "@/data/sheets";
import { editions, BOOK } from "@/data/book";
import {
  drawings,
  featured,
  drawingFile,
  pageFile,
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
    description: ed.headline + " " + ed.note,
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
    coverNote: "An example of a first coloring book for toddlers",
    whySuits: "What else makes a good coloring book for toddlers",
    drawings: "Drawings",
    pages: "Pages",
    size: "Size",
    inside: "What is inside",
    seeAll: "See all 111 drawings",
    parents: "What parents notice",
    parentsCta: "Read the reviews on Amazon",
    critic: "What an independent reviewer said",
    criticCta: "Read the full review",
    criticBy: "Maalin Ogaja, reviewer for Readers' Favorite, October 2024",
    parentsRating: (v: number, n: number) => `${v} out of 5 on Amazon, ${n} ratings`,
    parentsNote:
      "Written by us from the reviews left on Amazon, in our own words. Both paperback \
editions are there and anyone can read the originals.",
    specs: "What is in the book",
    video: "A look inside the book",
    videoLead:
      "Filmed by one of the parents who bought the book, on a table at home, with no editing. " +
      "Cover, back cover, and page after page, so you can see the line thickness and how much " +
      "of the sheet one drawing takes up before you decide.",
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
    coverNote: "Un ejemplo de primer libro para colorear para bebés",
    whySuits: "Qué más distingue a un buen libro para colorear para bebés",
    drawings: "Dibujos",
    pages: "Páginas",
    size: "Tamaño",
    inside: "Qué hay dentro",
    seeAll: "Ver los 111 dibujos",
    parents: "Lo que notan los padres",
    parentsCta: "Leer las reseñas en Amazon",
    critic: "Lo que dijo una reseñadora independiente",
    criticCta: "Leer la reseña completa",
    criticBy: "Maalin Ogaja, reseñadora de Readers' Favorite, octubre de 2024",
    parentsRating: (v: number, n: number) => `${v} sobre 5 en Amazon, ${n} valoraciones`,
    parentsNote:
      "Redactado por nosotros a partir de las reseñas dejadas en Amazon, con nuestras \
palabras. Las dos ediciones en papel están allí y cualquiera puede leer los originales.",
    specs: "Qué hay en el libro",
    video: "El libro por dentro",
    videoLead:
      "Grabado por una de las madres que compró el libro, sobre una mesa de su casa y sin " +
        "cortes. Verá la portada, la contraportada y todas las páginas en orden, para que " +
        "pueda apreciar el grosor de las líneas y el tamaño de los dibujos antes de decidir.",
    forWhom: "Para quién es",
    notFor: "Cuándo este libro no es la opción",
    faq: "Preguntas que hacen los padres",
    buyNote: "Vendido y enviado por Amazon. Nosotros ganamos con la venta.",
    priceFrom: "tapa blanda en Amazon",
    freeTitle: "Pruebe primero diez páginas gratis",
    freeLead:
      "Diez dibujos sacados directamente del libro, en dos tamaños de papel. Imprima uno, " +
        "dele un crayón a su hijo y en unos minutos sabrá si este tipo de página es adecuado " +
        "para él.",
    alsoIn: "Los mismos 111 dibujos con las palabras en inglés debajo, como libro aparte.",
  },
  ru: {
    ages: "Возраст",
    coverNote: "Пример первой раскраски для малышей",
    whySuits: "Чем еще отличается хорошая раскраска для малышей",
    drawings: "Рисунков",
    pages: "Страниц",
    size: "Размер",
    inside: "Что внутри",
    seeAll: "Посмотреть все 111 рисунков",
    parents: "Что отмечают родители",
    parentsCta: "Читать отзывы на Amazon",
    critic: "Что сказал независимый рецензент",
    criticCta: "Читать рецензию целиком",
    criticBy: "Маалин Огая, рецензент Readers' Favorite, октябрь 2024",
    parentsRating: (v: number, n: number) => `${v} из 5 на Amazon, ${n} оценок`,
    parentsNote:
      "Написано нами по отзывам, оставленным на Amazon, своими словами. Отзывы относятся \
к бумажным изданиям на английском и испанском: рисунки во всех изданиях одни и те же.",
    specs: "Что в книге",
    video: "Книга внутри",
    videoLead:
      "Снято одним из родителей, купивших книгу, дома на столе и без монтажа. Вы увидите " +
        "обложку, оборот и все страницы " +
        "по порядку, сможете оценить толщину линий и размер рисунков. В ролике показано " +
        "английское издание: рисунки во всех изданиях одинаковые, отличается только слово под " +
        "каждым рисунком.",
    forWhom: "Кому подходит",
    notFor: "Когда эта книга не подойдет",
    faq: "Что спрашивают родители",
    buyNote: "Файл для печати. Его можно распечатывать дома столько раз, сколько нужно.",
    priceFrom: "файл для печати",
    freeTitle: "Сначала попробуйте десять страниц бесплатно",
    freeLead:
      "Десять рисунков прямо из книги в двух форматах бумаги. Распечатайте один из них, " +
        "дайте ребенку карандаш, и уже через несколько минут вы поймете, подходит ли ему такая " +
        "раскраска.",
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

  /* Ссылка на отзывы есть только там, где книга продается на Amazon.
     У русского издания карточки нет, поэтому кнопки тоже нет. */
  const reviewsUrl = ed.asin ? BOOK.reviewsUrl(ed.asin) : null;

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
      /* Номер книги и ее карточка в международной базе знаний. Без них
         нейросеть не отличает эту книгу от десятка похожих названий
         и ставит ссылку в чужой магазин. */
      ...(ed.isbn ? { isbn: ed.isbn } : {}),
      ...(ed.wikidata
        ? { sameAs: [`https://www.wikidata.org/wiki/${ed.wikidata}`] }
        : {}),
      author: { "@type": "Person", name: AUTHOR.name, sameAs: [AUTHOR.amazon] },
      publisher: { "@type": "Organization", name: PUBLISHER, address: ADDRESS },
      description: ed.headline + " " + ed.note,
      /* Весь состав книги словами: что внутри, что она дает и где
         пригодится. Человек это читает на странице, машина здесь. */
      disambiguatingDescription: [...ed.needs, ...ed.extras, ...ed.inside].join(". "),
      /* У книги две аудитории. Без этой строки сайт не отвечал на
         вопрос "раскраска для детского сада". */
      audience: [
        { "@type": "PeopleAudience", suggestedMinAge: 1, suggestedMaxAge: 3 },
        { "@type": "EducationalAudience", educationalRole: "teacher" },
      ],
      image: `${SITE_URL}${ed.cover}`,
      typicalAgeRange: "1-3",
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
              /* Продавец назван явно: официальная страница книги одна,
                 и она на Amazon. В других магазинах книга появляется
                 через распространителей Amazon. */
              seller: { "@type": "Organization", name: "Amazon" },
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
            {/* Подпись к обложке. Объясняет, почему на сайте о первых
                раскрасках вообще стоит одна конкретная книга: она здесь
                как образец, а не как реклама. */}
            <p className="book__cover-note">{w.coverNote}</p>
          </div>

          <div>
            <h1>{ed.title}</h1>
            {/* Строки с числом рисунков и возрастом здесь больше нет:
                ровно то же самое стоит на два сантиметра ниже, в полосе
                с возрастом и рисунками и в пяти пунктах. Как описание
                страницы для поиска эта фраза осталась: там рядом ничего
                нет и повторять нечего. */}

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
            <img
              key={a.file}
              src={a.file}
              alt={a.alt[l]}
              width={601}
              height={601}
              loading="lazy"
            />
          ))}
        </div>

        {/* Заголовок начинается со слова "еще" намеренно: сразу над
            списком стоят три картинки с надписями simple, big, cute,
            то есть признаки хорошей раскраски уже названы, и список
            продолжает ту же мысль.
            Пятым пунктом сюда убрана строка про слово под рисунком:
            раньше она висела отдельным абзацем ниже и читалась как
            обрывок. */}
        <h3 className="block">{w.whySuits}</h3>
        <ul className="needs needs--extras">
          {ed.extras.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        {/* ============ 3. Что внутри: сами рисунки ============ */}
        {/* Пояснения под заголовком нет намеренно: под словами
            "что внутри" и так стоят сами рисунки, объяснять нечего. */}
        <h2 className="section" id="inside">{w.inside}</h2>

        {/* Двадцать страниц так, как они выглядят в книге: рисунок
            и слово под ним полыми буквами. Подпись здесь не текстом,
            а частью страницы, и это важнее: человек сразу видит, что
            слово тоже раскрашивается. Название для поисковика стоит
            в подписи к картинке. */}
        <ul className="thumbs thumbs--pages">
          {top.map((d) => (
            <li key={d!.n}>
              <img
                src={pageFile(d!.n, l)}
                alt={`${d!.name[l]} ${l === "en" ? "coloring page" : l === "es" ? "para colorear" : "раскраска"}`}
                width={480}
                height={620}
                loading="lazy"
              />
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

        {/* ============ 4. Покупка. Первое из двух мест ============ */}
        {/* Кнопки стоят здесь, а не выше: человек уже посмотрел
            двадцать страниц и при желании раскрыл все сто одиннадцать.
            Это и есть та минута, когда решение принимается. */}
        <div className="buy-block">
          <Buy lang={l} />
          <p className="buy-note">
            {ed.asin ? w.buyNote : ""}
            {ed.asin && ed.pdfUrl ? " " : ""}
            {ed.pdfUrl ? t.sec.pdfNote : ""}
            {!ed.asin && !ed.pdfUrl ? w.buyNote : ""}
          </p>
        </div>

        {/* ============ 5. Что отмечают родители ============ */}
        {/* Здесь только то, чего нет в списках выше: как книга ведет
            себя дома и в дороге. Свойства книги перечислены отдельно,
            ниже, и повторять их тут незачем. */}
        <h2 className="section">{w.parents}</h2>
        <ul className="needs">
          {ed.parents.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="buy-note">
          {ed.rating ? `${w.parentsRating(ed.rating.value, ed.rating.count)}. ` : ""}
          {w.parentsNote}
        </p>
        {/* Ссылка ведет прямо в отзывы на карточке книги, а не на саму
            карточку: человек, который дошел до этой кнопки, хочет
            проверить наши слова, а не покупать. Кнопка светлая, чтобы
            не спорить с двумя кнопками покупки выше. */}
        {reviewsUrl ? (
          <p className="btn-row">
            <a
              className="btn btn--ghost"
              href={reviewsUrl}
              rel="nofollow noopener"
              target="_blank"
            >
              {w.parentsCta}
            </a>
          </p>
        ) : null}

        {/* ============ 6. Рецензия независимой площадки ============ */}
        {/* Внешнее подтверждение весит больше, чем наши слова о себе:
            рецензия стоит на чужом сайте, подписана именем и открыта
            для проверки. Одно предложение приведено дословно, дальше
            наш пересказ. Звезды рецензента в машинную разметку не
            идут: там только оценка покупателей. */}
        <h2 className="section">{w.critic}</h2>
        <blockquote className="critic-quote">{ed.criticQuote}</blockquote>
        <p>{ed.critic}</p>
        <p className="buy-note">{w.criticBy}</p>
        <p className="btn-row">
          <a
            className="btn btn--ghost"
            href={BOOK.criticUrl}
            rel="nofollow noopener"
            target="_blank"
          >
            {w.criticCta}
          </a>
        </p>

        {/* ============ 7. Видео, справа подтверждение ============ */}
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
              {/* Справа от ролика подробный список того, что в книге.
                  Раньше здесь стояли те же пять строк, что и наверху
                  у обложки, слово в слово, а список шел отдельным
                  блоком сразу под видео: два списка подряд. Теперь
                  каждый список на странице ровно один раз. */}
              <div className="video-card__text">
                <p className="video-card__lead">{w.videoLead}</p>
                <h3 className="block">{w.specs}</h3>
                <ul className="inside">
                  {ed.inside.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <Buy lang={l} />
              </div>
            </div>
          </>
        ) : null}

        {/* ============ 8. Кому подходит и кому нет ============ */}
        <h2 className="section">{w.forWhom}</h2>
        <p>{ed.forWhom}</p>

        <h2 className="section">{w.notFor}</h2>
        <p>{ed.notFor}</p>

        {/* ============ 9. Вопросы ============ */}
        <h2 className="section">{w.faq}</h2>
        <div className="faq faq--two">
          {ed.faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>

        {/* Ссылка на весь раздел вопросов. Стоит здесь, а не в шапке:
            в меню и так шесть пунктов, а человек, дочитавший до этого
            места, как раз тот, кому раздел нужен. */}
        <p className="btn-row">
          <Link className="btn btn--ghost" href={sectionPath(l, "faq")}>
            {t.sec.faqAll}
          </Link>
        </p>

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

      {/* ============ 10. Бесплатные листы ============ */}
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
                width={642}
                height={822}
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

      {/* ============ 11. Справочная часть ============ */}
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

              {/* Ссылка на полную страницу инструмента. Подборщик здесь
                  остается коротким входом, а весь разбор по возрастам,
                  таблица и вопросы родителей лежат на своей странице:
                  два одинаковых развернутых текста спорили бы за один
                  и тот же запрос. */}
              <p style={{ textAlign: "center", margin: "var(--gap-3) 0 0" }}>
                <Link className="btn btn--ghost" href={sectionPath(l, "tools")}>
                  {toolLabels[l].fullPage}
                </Link>
              </p>
            </div>
          </section>

          <section className="band band--cream">
            <div className="wrap">
              <h2 className="section">{t.sec.stagesHome}</h2>
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

      {/* ============ 12. Что это за сайт ============ */}
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

      {/* ============ 13. Источники ============ */}
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

/* Кнопки покупки. Их две, и они стоят рядом, как в основном каталоге
   издательства: розовая ведет на Amazon за бумажной книгой, голубая
   в наш собственный магазин за файлом для печати. Это два разных
   товара, а не два способа купить одно и то же, поэтому выбор
   остается за человеком и ни одна из кнопок не прячется.

   У русского издания нет ни того, ни другого: бумажного нет вовсе,
   а страница с файлом еще не готова. Там стоит серая надпись, которую
   нельзя нажать. Ссылка в пустоту хуже ее отсутствия: и человек,
   и поисковик считают ее поломкой. */
function Buy({ lang }: { lang: UiLang }) {
  const ed = editions[lang];
  const t = dictionaries[lang];
  const w = words[lang];

  if (!ed.asin && !ed.pdfUrl) {
    return (
      <p className="buys">
        <span className="btn btn--soon" aria-disabled="true">
          {t.sec.soon}
        </span>
      </p>
    );
  }

  return (
    <p className="buys">
      {ed.price ? (
        <span className="top-price">
          <span className="top-price__value">{ed.price}</span>
          <span className="top-price__label">{w.priceFrom}</span>
        </span>
      ) : null}
      {ed.asin ? (
        <a
          className="btn btn--pink"
          href={BOOK.amazonUrl(ed.asin)}
          rel="nofollow sponsored noopener"
          target="_blank"
        >
          {t.common.amazon}
        </a>
      ) : null}
      {ed.pdfUrl ? (
        <a className="btn btn--sky" href={ed.pdfUrl} rel="noopener" target="_blank">
          {t.sec.buyPdf}
        </a>
      ) : null}
    </p>
  );
}
