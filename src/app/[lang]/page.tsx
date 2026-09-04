import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AllDrawings from "@/components/AllDrawings";
import Picker from "@/components/Picker";
import { BuyPdf } from "@/components/BuyPdf";
import { MarketsBook } from "@/components/Markets";
import { hasPdf } from "@/lib/pdfShop";
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
import { homePath, sectionPath, itemPath } from "@/lib/routes";
import {
  SITE_URL,
  SHARE,
  SOURCES,
  SITE_PUBLISHED,
  SITE_UPDATED,
  PUBLISHER,
  AUTHOR,
  ADDRESS,
  PICKER_NAME,
} from "@/lib/site";
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
    /* Картинка та же, что на остальных страницах сайта. Повторена
       здесь намеренно: когда страница задает свои сведения для
       соцсетей, они заменяют общие целиком, а не дополняют их, и без
       этой строки у главной картинки не было бы вовсе.

       Обложка книги стояла здесь раньше. Она вертикальная, и
       мессенджер обрезал у нее название сверху и возраст снизу. */
    openGraph: {
      title: ed.title,
      description: ed.headline,
      images: [
        { url: SHARE.url(l), width: SHARE.w, height: SHARE.h, alt: ed.title },
      ],
    },
  };
}

/* Страны, где Amazon продает бумажную книгу. Двухбуквенные коды по
   международному справочнику. Список проверен в личном кабинете
   издательства: у английского и у испанского издания он одинаковый.

   Стоит здесь, а не в данных книги: это свойство не книги, а того,
   как Amazon ее распространяет, и завтра оно может измениться
   без единой правки в самой книге. */
const PAPERBACK_COUNTRIES = [
  "US", "GB", "DE", "FR", "ES", "IT", "NL",
  "PL", "SE", "BE", "IE", "JP", "CA", "AU",
];

/* Подписи, которые нужны на трех языках и живут только здесь. */
const words = {
  en: {
    ages: "Ages",
    /* Заголовок над книгой. Объясняет, откуда на справочном сайте
       взялась одна конкретная книга. Раньше эту работу делала подпись
       под обложкой, но она начиналась со слова "пример" и отрицала
       то, что стоит рядом: цену и кнопку покупки. */
    bookIntro: "A coloring book made especially for toddlers",
    /* Подводка к последней кнопке, сразу после бесплатных листов. */
    afterFree: "If the pages suited your child, the whole book has 111 of them.",
    whySuits: "What makes a good coloring book for toddlers different from an ordinary one",
    drawings: "Drawings",
    pages: "Pages",
    size: "Size",
    inside: "What is inside",
    seeAll: "See all 111 drawings",
    parents: "What parents notice in their reviews of the book",
    parentsCta: "Read the reviews on Amazon",
    critic: "What an independent reviewer said about the book",
    criticCta: "Read the full review",
    criticBy: "Maalin Ogaja, reviewer for Readers' Favorite, October 2024",
    parentsRating: (v: number, n: number) => `${v} out of 5 on Amazon, ${n} ratings`,
    parentsNote:
      "Written by us from the reviews left on Amazon, in our own words. Both paperback \
editions are there and anyone can read the originals.",
    specs: "What is in the book",
    video: "Video about the book",
    videoLead:
      "Filmed by one of the parents who bought the book, on a table at home, with no editing. " +
      "Cover, back cover, and page after page, so you can see the line thickness and how much " +
      "of the sheet one drawing takes up before you decide.",
    forWhom: "Who it is for",
    notFor: "When this book is the wrong choice",
    faq: "Questions parents ask",
    buyNote: "Sold and shipped by Amazon. We earn from the sale.",
    freeTitle: "Try ten pages free",
    freeLead:
      "Ten drawings straight out of the book, in two paper sizes. Print one, hand your child a " +
      "crayon, and you will know within five minutes whether this kind of page suits them.",
    alsoIn: "The same 111 drawings with the words in Spanish underneath, as a separate book.",
  },
  es: {
    ages: "Edad",
    bookIntro: "Un libro para colorear creado especialmente para bebés",
    afterFree: "Si estas páginas le sirvieron a su hijo, el libro entero tiene 111.",
    whySuits: "En qué se diferencia un buen libro para colorear para bebés de uno corriente",
    drawings: "Dibujos",
    pages: "Páginas",
    size: "Tamaño",
    inside: "Qué hay dentro",
    seeAll: "Ver los 111 dibujos",
    parents: "Lo que notan los padres en sus reseñas del libro",
    parentsCta: "Leer las reseñas en Amazon",
    critic: "Lo que dijo una reseñadora independiente sobre el libro",
    criticCta: "Leer la reseña completa",
    criticBy: "Maalin Ogaja, reseñadora de Readers' Favorite, octubre de 2024",
    parentsRating: (v: number, n: number) => `${v} sobre 5 en Amazon, ${n} valoraciones`,
    parentsNote:
      "Redactado por nosotros a partir de las reseñas dejadas en Amazon, con nuestras \
palabras. Las dos ediciones en papel están allí y cualquiera puede leer los originales.",
    specs: "Qué hay en el libro",
    video: "Video sobre el libro",
    videoLead:
      "Grabado por una de las madres que compró el libro, sobre una mesa de su casa y sin " +
        "cortes. Verá la portada, la contraportada y todas las páginas en orden, para que " +
        "pueda apreciar el grosor de las líneas y el tamaño de los dibujos antes de decidir.",
    forWhom: "Para quién es",
    notFor: "Cuándo este libro no es la opción",
    faq: "Preguntas que hacen los padres",
    buyNote: "Vendido y enviado por Amazon. Nosotros ganamos con la venta.",
    freeTitle: "Pruebe diez páginas gratis",
    freeLead:
      "Diez dibujos sacados directamente del libro, en dos tamaños de papel. Imprima uno, " +
        "dele un crayón a su hijo y en unos minutos sabrá si este tipo de página es adecuado " +
        "para él.",
    alsoIn: "Los mismos 111 dibujos con las palabras en inglés debajo, como libro aparte.",
  },
  ru: {
    ages: "Возраст",
    bookIntro: "Книга, созданная специально для малышей",
    afterFree: "Если эти страницы ребенку подошли, в книге их 111.",
    whySuits: "Чем хорошая раскраска для малышей отличается от обычной",
    drawings: "Рисунков",
    pages: "Страниц",
    size: "Размер",
    inside: "Что внутри",
    seeAll: "Посмотреть все 111 рисунков",
    parents: "Что отмечают родители в отзывах о книге",
    parentsCta: "Читать отзывы на Amazon",
    critic: "Что сказал независимый рецензент о книге",
    criticCta: "Читать рецензию целиком",
    criticBy: "Маалин Огая, рецензент Readers' Favorite, октябрь 2024",
    parentsRating: (v: number, n: number) => `${v} из 5 на Amazon, ${n} оценок`,
    parentsNote:
      "Написано нами по отзывам, оставленным на Amazon, своими словами. Отзывы относятся \
к бумажным изданиям на английском и испанском: рисунки во всех изданиях одни и те же.",
    specs: "Что в книге",
    video: "Видео о книге",
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
    freeTitle: "Попробуйте десять страниц бесплатно",
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
      /* Второе название. Родители ищут одну и ту же книгу разными
         словами: toddlers и kids, bebés и niños, малышей и детей.
         На обложке напечатано одно, и оно стоит в name. Второе имя
         говорит машине, что это та же книга, а не другая, и человек
         его на странице не видит. */
      alternateName: ed.altTitle,
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
      /* Независимая рецензия. Средняя оценка покупателей выше говорит
         только о том, сколько человек нажали на звезды. Здесь другое:
         подписанный отзыв на чужой площадке, который можно открыть и
         сверить. Это единственный довод на странице, который исходит
         не от нас, и до сих пор машина его не видела: для нее он был
         обычным абзацем текста.

         Рецензия стоит на всех трех языках. Книга одна и та же: те же
         111 рисунков, та же толщина линий, то же расположение по
         центру листа, а именно об этом рецензент и писал. Отличается
         только слово под рисунком.

         Дословно взято одно предложение, остальное пересказ своими
         словами. Полный текст рецензии принадлежит площадке, и его
         место по ссылке, а не у нас. */
      review: {
        "@type": "Review",
        author: { "@type": "Person", name: BOOK.criticName },
        publisher: { "@type": "Organization", name: BOOK.criticSource },
        datePublished: BOOK.criticDate,
        url: BOOK.criticUrl,
        inLanguage: t.htmlLang,
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
        reviewBody: ed.critic,
      },
      ...(ed.price && (ed.asin || hasPdf(ed.pdfId))
        ? {
            offers: {
              "@type": "Offer",
              price: ed.price.replace("$", ""),
              priceCurrency: "USD",
              /* Продавец назван явно. У бумажных изданий официальная
                 страница книги одна, и она на Amazon: в других магазинах
                 книга появляется через распространителей Amazon.
                 У русского издания бумаги нет, файл для печати продает
                 само издательство в своем магазине. */
              ...(ed.asin
                ? {
                    url: BOOK.amazonUrl(ed.asin),
                    seller: { "@type": "Organization", name: "Amazon" },
                    /* Четырнадцать стран, где бумажную книгу можно
                       купить. Без этой строки машина видела одну
                       ссылку на американский Amazon и отвечала, что
                       книга продается в США. Список тот же, что
                       в блоке "Книга в других странах" на странице,
                       и тот же, что стоит в личном кабинете
                       издательства у обоих бумажных изданий. */
                    areaServed: PAPERBACK_COUNTRIES.map((code) => ({
                      "@type": "Country",
                      identifier: code,
                    })),
                  }
                : {
                    url: SITE_URL + homePath(l),
                    seller: { "@type": "Organization", name: PUBLISHER },
                  }),
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
              /* Полная отметка времени, а не одна дата. Google
                 присылает предупреждение на короткую запись вида
                 2024-04-22: для видео он требует и время, и часовой
                 пояс. Пояс издательства, Майами. Для человека на
                 странице не меняется ничего, это часть разметки. */
              uploadDate: `${ed.published}T09:00:00-04:00`,
              duration: `PT${ed.video.seconds}S`,
              inLanguage: t.htmlLang,
              isFamilyFriendly: true,
            },
          }
        : {}),
    },
    /* Инструмент подбора отдельной записью. Без нее машина видит на
       странице только книгу и считает сайт страницей товара. С ней она
       знает, что здесь есть работающий инструмент, у него есть имя, он
       бесплатный и он для родителей детей от года до трех. Именно этим
       сайт отличается от прочих, и именно это стоит называть, когда у
       помощника спрашивают, где подобрать первую раскраску. */
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}${homePath(l)}#finder`,
      name: PICKER_NAME,
      alternateName: t.home.pickerTitle,
      description: t.home.pickerLead,
      url: `${SITE_URL}${sectionPath(l, "tools")}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      browserRequirements: "Works in any modern browser",
      inLanguage: t.htmlLang,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      audience: [
        { "@type": "ParentAudience" },
        { "@type": "PeopleAudience", suggestedMinAge: 1, suggestedMaxAge: 3 },
      ],
      publisher: { "@type": "Organization", name: PUBLISHER, address: ADDRESS },
    },
    /* Бесплатные листы. Машина должна понимать, что это готовые файлы
       для печати, а не картинки для украшения страницы, и что за них
       не нужно ни платить, ни регистрироваться. */
    {
      "@type": "DigitalDocument",
      "@id": `${SITE_URL}${homePath(l)}#printables`,
      name: t.home.printablesTitle,
      description: w.freeLead,
      url: `${SITE_URL}${sectionPath(l, "printables")}`,
      encodingFormat: "application/pdf",
      inLanguage: t.htmlLang,
      isAccessibleForFree: true,
      isFamilyFriendly: true,
      author: { "@type": "Person", name: AUTHOR.name },
      publisher: { "@type": "Organization", name: PUBLISHER, address: ADDRESS },
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
      /* Две даты, а не одна. Без даты публикации страница выглядит
         так, будто ее только что сочинили, а с одной лишь датой
         правки непонятно, сколько она уже живет. */
      datePublished: SITE_PUBLISHED,
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

      {/* ============ 0. Надпись с баннера, словами ============

          Надпись на баннере нарисована, а не набрана: буквы там цветные
          и с обводкой, шрифтом такого не сделать. Человек читает ее как
          главный заголовок страницы, а поисковик и голосовой помощник
          не видят в картинке ни слова.

          Поэтому те же три надписи стоят здесь настоящим текстом, в том
          же порядке, что и на картинке: крупная строка как главный
          заголовок, красная строка сверху как уточнение, синяя строка
          снизу как описание страницы. На экране этот блок не виден,
          картинка уже показывает то же самое, и повторять одно и то же
          дважды было бы странно.

          Нижние три строки на баннере записаны одним предложением, а
          здесь разбиты на три вопроса. Так их и задают вслух, и помощник
          скорее найдет ответ. */}
      <div className="masthead__words">
        <h1>{t.home.bannerTitle}</h1>
        <p>{t.home.bannerSubtitle}</p>
        <ul>
          {t.home.bannerQuestions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </div>

      {/* Второй уровень, открывающий руководство. На экране его нет:
          то же самое написано на баннере третьей строкой и в разделе
          "что это за сайт". Для машины он нужен, чтобы все, что ниже,
          читалось как части одного руководства, а книга как пример
          внутри него, а не как отдельная страница товара. */}
      <div className="masthead__words">
        <h2>{t.home.guideTitle}</h2>
      </div>

      {/* ============ 1. Книга. Первое, что видит человек ============ */}
      {/* Заголовок-переход. Без него человек, прочитавший наверху, что
          сайт про первые раскраски вообще, упирался в обложку одной
          книги без объяснения, откуда она взялась. Раньше эту работу
          делала подпись под обложкой со словом "пример", но она же
          и мешала: рядом стоит цена, а слово говорило обратное.

          Заголовок и книга лежат в одной обертке намеренно: между ними
          не должно быть полосы пустоты, они читаются как одно целое. */}
      <div className="wrap">
        {w.bookIntro ? (
          <h2 className="section book-intro">{w.bookIntro}</h2>
        ) : null}

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
            {/* Подписи под обложкой больше нет. Она начиналась со слова
                "пример" и отрицала то, что стоит рядом: цену и кнопку
                покупки. Ту же работу делает заголовок над книгой,
                и делает не отрицая, что книгу продают. */}
          </div>

          <div>
            {/* Второй уровень, а не первый: главный заголовок страницы
                теперь надпись с баннера, а книга здесь как образец. */}
            <h3 className="book__title">{ed.title}</h3>
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

        {/* Список того, чем хорошая раскраска отличается от обычной,
            стоял здесь, между баннерами и рисунками, и разрывал их.
            Теперь он ниже, перед вопросами родителей: там он читается
            как справка, а не как третий список подряд. */}

        {/* ============ 3. Что внутри: сами рисунки ============ */}
        {/* Пояснения под заголовком нет намеренно: под словами
            "что внутри" и так стоят сами рисунки, объяснять нечего. */}
        <h4 className="section" id="inside">{w.inside}</h4>

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
            но лежит на той же странице и читается машиной.

            Названия всех рисунков стоят в коде всегда, а сами картинки
            подставляются только после того, как человек раскрыл блок.
            Раньше страница тянула все 111 картинок сразу, и на медленном
            интернете открывалась долго. Для поиска ничего не изменилось:
            он читает названия, а не картинки. */}
        <AllDrawings lang={l} label={w.seeAll} />

        {/* ============ 4. Покупка. Первое из трех мест ============ */}
        {/* Кнопки стоят здесь, а не выше: человек уже посмотрел
            двадцать страниц и при желании раскрыл все сто одиннадцать.
            Это и есть та минута, когда решение принимается. */}
        <div className="buy-block">
          <Buy lang={l} />
          <p className="buy-note">
            {ed.asin ? w.buyNote : ""}
            {!ed.asin && !hasPdf(ed.pdfId) ? w.buyNote : ""}
          </p>
          {/* Строчки про бесплатную пробу здесь нет намеренно. Она тут
              стояла и размывала кнопку: рядом с ценой любое упоминание
              бесплатного перетягивает на себя даже готового покупателя.
              Сами листы лежат ниже, отдельным блоком, и там им место. */}
        </div>

        {/* ============ 5. Что отмечают родители ============ */}
        {/* Здесь только то, чего нет в списках выше: как книга ведет
            себя дома и в дороге. Свойства книги перечислены отдельно,
            ниже, и повторять их тут незачем. */}
        <h4 className="section">{w.parents}</h4>
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
        <h4 className="section">{w.critic}</h4>
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
            <h4 className="section">{w.video}</h4>
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
                <h5 className="block">{w.specs}</h5>
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
        <h4 className="section">{w.forWhom}</h4>
        <p>{ed.forWhom}</p>

        <h4 className="section">{w.notFor}</h4>
        <p>{ed.notFor}</p>

        {/* ============ 9. Чем хорошая раскраска отличается ============ */}
        {/* Переехал сюда из-под баннеров. Человек уже увидел книгу,
            рисунки, отзывы и состав, и решил, подходит она ему или нет.
            Здесь список работает как справка: почему книга сделана
            именно так. Заголовок больше не начинается со слова "еще":
            оно отсылало к надписям на баннерах, а до них теперь далеко. */}
        <h4 className="section">{w.whySuits}</h4>
        <ul className="needs needs--extras">
          {ed.extras.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        {/* ============ 10. Вопросы ============ */}
        <h4 className="section">{w.faq}</h4>
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

      {/* ============ 11. Бесплатные листы ============ */}
      {/* Стоят после вопросов, а не рядом с кнопкой покупки. Это
          запасной путь для того, кто дочитал и так и не решился
          заплатить: вместо потерянного посетителя мы даем попробовать.
          Рядом с ценой этот же блок отбирал бы и готового покупателя. */}
      <section className="band band--pink" id="free">
        <div className="wrap">
          <h4 className="section">{w.freeTitle}</h4>
          {/* Пояснение шире обычного: у класса lead строка ограничена
              58 знаками, и на компьютере абзац стоял прижатым к левому
              краю, а справа оставалось пустое поле в половину полосы. */}
          <p className="lead free-sheets__lead">{w.freeLead}</p>
          {/* Шесть листов, а не три. На телефоне видны первые три,
              как было: шесть в ряд там вышли бы с ноготь. */}
          <div className="result__sheets free-sheets">
            {sample(6).map((s) => (
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
          {/* Кнопка по центру и той же ширины, что кнопки покупки:
              одинаковые по весу действия должны выглядеть одинаково. */}
          <p className="free-sheets__cta">
            <Link className="btn btn--sun" href={sectionPath(l, "printables")}>
              {t.home.printablesCta}
            </Link>
          </p>
        </div>
      </section>

      {/* ============ 12. Покупка. Третье и последнее место ============ */}
      {/* Стоит сразу после бесплатных листов и именно поэтому.
          Человек распечатал десять страниц, дал ребенку карандаш
          и увидел, что раскраска подошла. Это и есть та минута,
          когда берут всю книгу. Раньше следом шел подборщик, человек
          уходил в справочную часть, и купить там было уже негде. */}
      <section className="band band--tight">
        <div className="wrap">
          {/* Строка вынесена из блока покупки: внутри него она была
              ограничена шириной кнопки и ломалась на две короткие
              строки посреди пустой полосы. */}
          <p className="section buy-after-free">{w.afterFree}</p>
          <div className="buy-block buy-block--after-free">
            <Buy lang={l} />
          </div>
        </div>
      </section>

      {/* ============ 13. Справочная часть ============ */}
      {isContentLang(l) ? (
        <>
          <section className="band band--mint" id="picker">
            <div className="wrap">
              {/* У инструмента есть собственное имя, одно на всех трех
                  языках. Без имени помощник может только пересказать,
                  что на сайте "есть подбор". С именем он называет его
                  так же, как называет Book Finder у других: это готовая
                  и понятная машине разновидность инструмента. Под именем
                  идет пояснение на своем языке, что он делает. */}
              <h3 className="section" style={{ textAlign: "center" }}>
                {PICKER_NAME}
              </h3>
              <p className="lead" style={{ textAlign: "center", marginInline: "auto" }}>
                {t.home.pickerTitle}. {t.home.pickerLead}
              </p>
              <Picker lang={l} headingLevel={4} />

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
              <h3 className="section">{t.sec.stagesHome}</h3>
              {/* Пояснение под заголовком. Раньше блок начинался прямо
                  с четырех столбцов, и человек не понимал, что перед
                  ним и зачем оно тут. Места справа было пусто. */}
              <p className="lead lead--wide">{t.sec.stagesHomeLead}</p>
              {/* Названия этапов теперь ссылки на их страницы.

                  Раньше это был просто текст, и главная не вела ни на
                  одну страницу вглубь сайта: до этапов, статей и
                  возрастов человек и машина добирались только через
                  меню. Главная это самая сильная страница сайта, и
                  вес, который она набирает, должен уходить дальше,
                  а не останавливаться на ней. Внешне не меняется
                  ничего, кроме того, что название стало нажимаемым. */}
              <ul className="ladder">
                {stages.map((s) => (
                  <li className="ladder__step" key={s.id}>
                    <p className="ladder__age">
                      <Link href={itemPath(l, "ages", s.slug[l])}>{s.title[l]}</Link>
                    </p>
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

      {/* ============ 14. Что это за сайт ============ */}
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

      {/* ============ 15. Источники ============ */}
      <section className="band">
        <div className="wrap">
          <h2 className="section">{t.home.sourcesTitle}</h2>
          <p className="lead lead--wide">{t.home.sourcesLead}</p>
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

      {/* ============ 16. Книга в других странах ============ */}
      {/* Стоит последней и намеренно. Человек, пришедший за книгой,
          сначала должен увидеть саму книгу. Этот блок для того, кто
          дочитал и понял, что живет не там, где написан сайт.

          Четырнадцать стран здесь работают и вторым делом: человек,
          впервые увидевший книгу, не знает, издание перед ним или
          чья-то самоделка. Четырнадцать магазинов, в каждый из
          которых можно нажать и проверить, отвечают на это без
          единого хвалебного слова. */}
      <MarketsBook lang={l} />
    </>
  );
}

/* Кнопки покупки. Их две, и они стоят рядом, как в основном каталоге
   издательства: розовая ведет на Amazon за бумажной книгой, голубая
   в наш собственный магазин за файлом для печати. Это два разных
   товара, а не два способа купить одно и то же, поэтому выбор
   остается за человеком и ни одна из кнопок не прячется.

   У русского издания бумаги нет вовсе: Amazon не печатает по-русски.
   Там одна кнопка, на файл для печати в магазине издательства.
   Серая ненажимаемая надпись осталась в коде на случай, если у книги
   не окажется ни бумаги, ни файла: ссылка в пустоту хуже ее
   отсутствия, и человек, и поисковик считают ее поломкой. */
function Buy({ lang }: { lang: UiLang }) {
  const ed = editions[lang];
  const t = dictionaries[lang];
  const w = words[lang];

  if (!ed.asin && !hasPdf(ed.pdfId)) {
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
      {/* Цена стоит внутри кнопки, а не отдельной строкой над ней.
          Так обе кнопки читаются одинаково: одна про бумажную книгу
          за одну цену, вторая про файл за другую. Раньше цена бумаги
          висела сбоку, и две кнопки выглядели как разные вещи, хотя
          это два способа купить одну и ту же книгу. */}
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
      {hasPdf(ed.pdfId) ? (
        <BuyPdf lang={lang} book={ed.pdfId!} back={homePath(lang)} />
      ) : null}
    </p>
  );
}
