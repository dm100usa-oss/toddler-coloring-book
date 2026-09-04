import { editions } from "./book";
import { SITE_URL } from "../lib/site";

/* ==================================================================
   Двенадцать страниц для семи рынков.

   Зачем они есть. Обе книги продаются на amazon.de, amazon.fr,
   amazon.nl, amazon.pl, amazon.it, amazon.es и amazon.ca, но карточки
   там английская и испанская: немецкий, французский, голландский,
   польский и итальянский родитель не видит в своем магазине ни одного
   слова на своем языке. Эти страницы единственное место, где про эти
   книги написано на его языке, и именно поэтому они могут появиться
   в его Google.

   У Испании страница одна, про книгу с английскими словами: испанцу
   испанские слова не нужны. У Канады тоже одна, про книгу с
   испанскими: канадцу не нужны английские.

   Чего они намеренно НЕ делают. Они не добавляют четыре языка
   в языковую систему сайта. Переключатель в шапке остается на трех
   языках, остальные страницы сайта не переводятся. Эти восемь живут
   отдельным крылом со своей шапкой и своим подвалом.

   hreflang здесь нет и быть не может. hreflang связывает варианты
   одного и того же материала на разных языках. Немецкая страница про
   английскую книгу и немецкая страница про испанскую это два разных
   материала, а не перевод друг друга, и связывать их нечем.

   Язык страницы Google определяет по видимому тексту, а не по папке
   в адресе и не по служебной пометке. Поэтому текст здесь настоящий,
   написанный на каждом языке отдельно, а не прогнанный через
   переводчик.
   ================================================================== */

/* Испания и Канада стоят в этом же списке, но живут немного иначе.
   В четырех европейских странах у нас по две страницы, английская
   книга и испанская. В Испании нужна только английская: испанская
   книга испанцу не нужна. В Канаде наоборот. Поэтому страна тут есть,
   а страниц у нее одна, и адрес у нее по названию страны: папки es
   и en заняты языками самого сайта. */
export type EuroLang = "de" | "fr" | "nl" | "pl" | "it" | "espana" | "canada";
export type EditionLang = "en" | "es";

/* Только те страны, у которых по две страницы. Испания и Канада
   в этот список не входят, они добавлены отдельно в euroExtraPages. */
export const euroLangs: EuroLang[] = ["de", "fr", "nl", "pl", "it"];
export const editionLangs: EditionLang[] = ["en", "es"];

/* Магазин Amazon своей страны. Адрес карточки во всех странах
   складывается одинаково: домен плюс номер книги. */
export const amazonHost: Record<EuroLang, string> = {
  de: "www.amazon.de",
  fr: "www.amazon.fr",
  nl: "www.amazon.nl",
  pl: "www.amazon.pl",
  it: "www.amazon.it",
  espana: "www.amazon.es",
  canada: "www.amazon.ca",
};

/* ------------------------------------------------------------------
   Языковые версии страниц одного издания.

   Шесть страниц про книгу с английскими словами это переводы друг
   друга: одна книга, одно предложение, шесть языков. То же со вторым
   изданием. Пометка о переводах говорит поисковику не "выбери одну",
   а "вот версия для этого языка": немцу немецкую, поляку польскую.

   Испанская страница и канадская стоят в разных группах: у Испании
   книга с английскими словами, у Канады с испанскими. Испанцу
   испанские слова не нужны, канадцу английские.

   Ключ здесь язык страницы, а не страна: у Испании это испанский,
   у Канады английский. Испанская страница попадает в группу
   английского издания, канадская в группу испанского, и совпадений
   ключей внутри группы не возникает.

   Основного языка в группе нет намеренно: ни одна из шести страниц
   не главнее прочих, каждая написана для своей страны.
------------------------------------------------------------------ */
export function euroAlternates(ed: EditionLang): Record<string, string> {
  const out: Record<string, string> = {};
  for (const p of euroPages) {
    if (p.ed !== ed) continue;
    out[euroUi[p.lang].htmlLang] = `${SITE_URL}${p.path}`;
  }
  return out;
}

export const euroAmazonUrl = (lang: EuroLang, asin: string) =>
  `https://${amazonHost[lang]}/dp/${asin}`;

/* Цены приблизительные и это намеренно. Точное число живет до первой
   скидки или пересчета валюты, после чего расходится с магазином,
   и человек, увидевший на сайте одно, а в магазине другое, перестает
   верить всей странице. Сверено с карточками магазинов в августе 2026
   года: Франция 5,99 евро, Голландия 6,41 евро, Польша 30,44 злотых.
   У обеих книг цены совпадают.

   Исключение Франция. Владелец посмотрел карточку на amazon.fr
   26 августа 2026 года: там стоит 5,99 евро, налог уже включен,
   и по его решению на французских страницах стоит точная цена,
   а не округленная. Если магазин цену поменяет, поменять и здесь. */
/* Точная цена числом, для машинной записи о книге.

   Числа взяты с карточек магазинов, сверено 26 августа 2026 года:
   Франция 5,99 EUR, Голландия 6,41 EUR, Польша 30,44 PLN,
   Испания 5,99 EUR, Канада 9,99 CAD.

   Германия 5,99 EUR по данным владельца: в KDP для Германии задана
   та же цена, что для Франции и Испании. Саму карточку amazon.de
   проверить не удалось, она открывалась с американским адресом
   доставки и показывала цену в долларах.

   Округленное число в машинную запись ставить нельзя:
   Google требует, чтобы цена в разметке совпадала с ценой у продавца.
   Лучше не указывать вовсе, чем указать неверно.

   Если магазин цену поменяет, поменять и здесь. Иначе разметка
   начнет врать, а это хуже, чем ее отсутствие. */
export const euroPriceExact: Partial<
  Record<EuroLang, { amount: string; currency: string }>
> = {
  de: { amount: "5.99", currency: "EUR" },
  fr: { amount: "5.99", currency: "EUR" },
  nl: { amount: "6.41", currency: "EUR" },
  pl: { amount: "30.44", currency: "PLN" },
  /* Италия: обе книги 5,99 евро, сверено с карточками amazon.it
     27 августа 2026 года, налог включен. */
  it: { amount: "5.99", currency: "EUR" },
  espana: { amount: "5.99", currency: "EUR" },
  canada: { amount: "9.99", currency: "CAD" },
};

export const euroPrice: Record<EuroLang, string> = {
  de: "5,99 €",
  fr: "5,99 €",
  nl: "€ 6,41",
  pl: "30,44 zł",
  it: "5,99 €",
  /* Испания: сверено с карточкой на amazon.es 26 августа 2026 года,
     5,99 евро, налог включен. */
  espana: "5,99 €",
  /* Канада: сверено с карточкой на amazon.ca 26 августа 2026 года.
     Буквы валюты обязательны: в стране ходят два доллара, канадский
     и американский, и без пометки число читается двояко. */
  canada: "$9.99 CAD",
};

/* Оценка на европейских карточках. Само число одно и то же во всех
   странах, а количество отзывов у каждой страны свое, поэтому его
   мы не пишем: правильно указать его сразу для четырех стран нельзя. */
export const euroRating: Record<EditionLang, string> = {
  en: "5,0",
  es: "4,9",
};

/* Размер книги в сантиметрах с запятой: так пишут число во всех
   четырех странах. В дюймах его здесь не бывает. */
/* Знак умножения, а не буква x: так пишут размер во всех четырех
   странах. Немецкие и французские страницы держат свой размер сами,
   этот остается у голландских и польских. */
export const BOOK_SIZE_CM = "21,6 × 27,9 cm";

/* Три строки, которые стоят наверху страницы. Настоящий текст,
   а не картинка: это самая крупная надпись страницы, и по ней
   поисковик понимает, на каком она языке. Нарисованную надпись
   он не читает вовсе. */
export type HeadWords = { top: string; title: string; bottom: string };

export type EuroCopy = {
  /** Заголовок страницы, он же название книги на языке страницы. */
  title: string;
  subtitle: string;
  /** Три строки наверху страницы. */
  head: HeadWords;
  /** Первый блок, три абзаца. */
  lead: string[];
  forWhom: string;
  inside: string[];
  parents: string[];
  rating: string;
  critic: string;
  /* Три поля ниже пока есть только у немецкой страницы про английскую
     книгу. У остальных семи страниц рецензия устроена по-старому:
     один пересказ абзацем и кнопка. */
  /** Свой заголовок раздела с рецензией, если он нужен странице. */
  criticTitle?: string;
  criticWhy?: string;
  criticBy?: string;
  whyTitle?: string;
  why?: string[];
  faq: { q: string; a: string }[];
  /** Строка со ссылкой на такую же страницу про вторую книгу.
     У страны с одной страницей этих двух строк нет, и блок не рисуется. */
  pair?: string;
  pairCta?: string;
  /** Что для поиска: заголовок вкладки и описание под ссылкой. */
  metaTitle: string;
  metaDescription: string;
  /** Подписи к картинкам. */
  altCover: string;
  altBannerLead: string;
  altArt: [string, string, string];
  altGift: string;
};

export type EuroUi = {
  htmlLang: string;
  locale: string;
  inside: string;
  forWhom: string;
  parents: string;
  ratingTitle: string;
  criticTitle: string;
  faq: string;
  buyAmazon: string;
  buyFree: string;
  /* Покупка файла для печати. Раньше на этих страницах кнопки файла
     не было: она вела в старый магазин на Wix, английский и в долларах,
     и человек попадал не туда, куда шел. Теперь магазин свой, Stripe
     сам показывает покупателю его валюту и считает налог его страны,
     поэтому кнопка вернулась.

     Бумажную книгу в Европе ждут несколько дней, а иногда ее нет
     в наличии вовсе. Файл приходит через минуту. */
  buyPdf: string;
  pdfPickSize: string;
  buyPdfLetter: string;
  buyPdfA4: string;
  pdfLetterHint: string;
  pdfA4Hint: string;
  pdfNote: string;
  priceLabel: string;
  buyNote: string;
  /** Блок с десятью листами из книги. */
  freeTitle: string;
  freeLead: string;
  freeDownload: string;
  freeFormat: string;
  freeAlt: (name: string) => string;
  /** Названия зверей на языке страницы: подпись под каждым листом. */
  animals: Record<string, string>;
  labelAge: string;
  labelDrawings: string;
  labelPages: string;
  labelSize: string;
  labelPublished: string;
  labelAuthor: string;
  labelPublisher: string;
  criticSource: string;
  /** Заголовок над рисунками из книги. Стоят они сразу под обложкой,
      до кнопки покупки: человек должен увидеть страницу книги раньше,
      чем его позовут платить. */
  pagesTitle: string;
  /** Видео о книге: снято родителем дома, без монтажа. */
  videoTitle: string;
  videoLead: string;
  /** Когда книга не подойдет. Честный отказ стоит после последней
      кнопки: он не мешает тому, кто уже решил, и удерживает того,
      кому книга не подходит, от покупки, о которой он пожалеет. */
  whenNotTitle: string;
  whenNot: string;
  /** Строка про подборщик раскрасок на основном сайте. */
  pickerLine: string;
  pickerCta: string;
  footerAbout: string;
  footerLink: string;
  /* Приписка "на английском" рядом со ссылкой в подвале. У Испании
     ссылка ведет на испанский раздел сайта, приписка там не нужна
     и остается пустой. */
  footerLinkNote: string;
  /* Куда ведет ссылка в подвале. По умолчанию английский раздел сайта. */
  footerLinkHref?: string;
  /* Размер бумаги для бесплатных листов. По умолчанию A4: так печатают
     почти во всем мире. В Канаде домашние принтеры заряжены бумагой
     Letter, и лист A4 там выйдет с лишними полями. */
  sheetSize?: "letter" | "a4";
};

/* ==================================================================
   Надписи интерфейса
   ================================================================== */

export const euroUi: Record<EuroLang, EuroUi> = {
  de: {
    htmlLang: "de",
    locale: "de-DE",
    inside: "Was im Buch steckt",
    forWhom: "Für wen das Buch ist",
    parents: "Was Eltern in ihren Rezensionen über das Buch sagen",
    ratingTitle: "Bewertungen",
    criticTitle: "Was eine unabhängige Rezensentin schrieb",
    faq: "Häufige Fragen",
    buyAmazon: "Taschenbuch bei Amazon.de kaufen",
    buyPdf: "Druckdatei kaufen",
    pdfPickSize: "Auf welchem Papierformat drucken Sie?",
    buyPdfLetter: "Letter, 8.5 x 11 in",
    buyPdfA4: "A4",
    pdfLetterHint: "Übliches Papier in den USA und Kanada",
    pdfA4Hint: "Übliches Papier in Deutschland und Europa",
    pdfNote:
      "Sie bezahlen hier, und der Link kommt direkt nach dem Kauf per E-Mail. Zu Hause so oft ausdrucken, wie Sie möchten.",
    buyFree: "10 Seiten kostenlos ausdrucken",
    priceLabel: "Taschenbuch bei Amazon.de",
    buyNote: "Verkauf und Versand durch Amazon.",
    freeTitle: "Zehn Seiten aus dem Buch, kostenlos zum Ausdrucken",
    freeLead:
      "Das sind echte Seiten aus dem Buch, mit demselben Wort unter der Zeichnung. Drucken Sie eine Seite aus, geben Sie Ihrem Kind einen Stift, und nach fünf Minuten wissen Sie, ob das Buch zu Ihrem Kind passt. Ohne Anmeldung und ohne E-Mail-Adresse.",
    freeDownload: "Herunterladen",
    freeFormat: "Format A4, zum Drucken zu Hause.",
    freeAlt: (name: string) => `${name}: Ausmalseite aus dem Buch`,
    animals: {
      lion: "Löwe", elephant: "Elefant", giraffe: "Giraffe", zebra: "Zebra",
      rhino: "Nashorn", monkey: "Affe", crocodile: "Krokodil",
      kangaroo: "Känguru", bear: "Bär", fox: "Fuchs",
    },
    labelAge: "Alter",
    labelDrawings: "Zeichnungen",
    labelPages: "Seiten",
    labelSize: "Format",
    labelPublished: "Erscheinungsdatum",
    labelAuthor: "Autor",
    labelPublisher: "Verlag",
    criticSource: "Die vollständige Rezension lesen",
    pagesTitle: "Seiten aus dem Buch",
    videoTitle: "Video über das Buch",
    videoLead:
      "Zu Hause aufgenommen von einem Elternteil, der das Buch gekauft hat, ohne Schnitt. " +
      "Sie sehen den Umschlag, die Rückseite und alle Seiten der Reihe nach und können die " +
      "Linienstärke und die Größe der Zeichnungen selbst beurteilen.",
    whenNotTitle: "Wann das Buch nicht passt",
    whenNot:
      "Wenn Ihr Kind schon mühelos innerhalb der Linien ausmalt und eine Seite in wenigen " +
      "Minuten fertig hat, wird ihm dieses Buch zu einfach sein. Dann passt ein Malbuch mit " +
      "mehr Details besser, oder ein Buch, in dem das Kind selbst zeichnen lernt.",
    pickerLine:
      "Sie sind sich nicht sicher, welches Malbuch zu Ihrem Kind passt? Auf unserer Website " +
      "gibt es dafür einen kostenlosen Test: vier Fragen, etwa dreißig Sekunden.",
    pickerCta: "Zum Test",
    footerAbout:
      "Herausgegeben von Magic of Discoveries LLC, einem Kinderbuchverlag in Miami, Florida.",
    footerLink: "Alles über die ersten Malbücher für Kinder von 1 bis 3 Jahren",
    footerLinkNote: "auf Englisch",
  },
  fr: {
    htmlLang: "fr",
    locale: "fr-FR",
    inside: "Ce qu'il y a dans le livre",
    forWhom: "Pour qui est ce livre",
    parents: "Ce que disent les parents dans leurs avis sur le livre",
    ratingTitle: "Évaluations",
    criticTitle: "Ce qu'en a dit une critique indépendante",
    faq: "Questions fréquentes",
    buyAmazon: "Acheter le livre broché sur Amazon.fr",
    buyPdf: "Acheter le fichier à imprimer",
    pdfPickSize: "Sur quel format de papier imprimez-vous ?",
    buyPdfLetter: "Letter, 8.5 x 11 in",
    buyPdfA4: "A4",
    pdfLetterHint: "Papier courant aux États-Unis et au Canada",
    pdfA4Hint: "Papier courant en France et en Europe",
    pdfNote:
      "Le paiement se fait ici et le lien arrive par e-mail juste après l'achat. À imprimer chez vous autant de fois que vous voulez.",
    buyFree: "Imprimer 10 pages gratuitement",
    priceLabel: "broché sur Amazon.fr",
    buyNote: "Vendu et expédié par Amazon.",
    freeTitle: "Dix pages du livre, à imprimer gratuitement",
    freeLead:
      "Ce sont de vraies pages du livre : sous chaque dessin figure le même mot que dans le livre. Imprimez-en une, donnez un crayon à votre enfant, et en cinq minutes vous saurez si ce livre lui convient. Sans inscription et sans adresse e-mail.",
    freeDownload: "Télécharger",
    freeFormat: "Format A4, à imprimer chez vous.",
    freeAlt: (name: string) => `${name} : page à colorier tirée du livre`,
    animals: {
      lion: "Lion", elephant: "Éléphant", giraffe: "Girafe", zebra: "Zèbre",
      rhino: "Rhinocéros", monkey: "Singe", crocodile: "Crocodile",
      kangaroo: "Kangourou", bear: "Ours", fox: "Renard",
    },
    labelAge: "Âge",
    labelDrawings: "Dessins",
    labelPages: "Pages",
    labelSize: "Format",
    labelPublished: "Parution",
    labelAuthor: "Auteur",
    labelPublisher: "Maison d'édition",
    criticSource: "Lire la critique complète",
    pagesTitle: "Pages du livre",
    videoLead:
      "Filmé à la maison par un parent qui a acheté le livre, sans montage. Vous voyez la " +
      "couverture, le dos et toutes les pages dans l'ordre, et vous pouvez juger vous-même " +
      "de l'épaisseur des traits et de la taille des dessins.",
    videoTitle: "Vidéo sur le livre",
    whenNotTitle: "Quand ce livre ne convient pas",
    whenNot:
      "Si votre enfant colorie déjà sans effort à l'intérieur des traits et termine une page " +
      "en quelques minutes, ce livre lui paraîtra trop simple. Mieux vaut alors un coloriage " +
      "avec plus de détails, ou un livre où l'enfant apprend à dessiner lui-même.",
    pickerLine:
      "Vous ne savez pas quel coloriage convient à votre enfant ? Notre site propose un test " +
      "gratuit : quatre questions, environ trente secondes.",
    pickerCta: "Faire le test",
    footerAbout:
      "Publié par Magic of Discoveries LLC, maison d'édition jeunesse à Miami, en Floride.",
    footerLink:
      "Tout sur les premiers livres de coloriage pour les enfants de 1 à 3 ans",
    footerLinkNote: "en anglais",
  },
  nl: {
    htmlLang: "nl",
    locale: "nl-NL",
    inside: "Wat er in het boek zit",
    forWhom: "Voor wie dit boek is",
    parents: "Wat ouders in hun recensies over het boek zeggen",
    ratingTitle: "Beoordelingen",
    criticTitle: "Wat een onafhankelijke recensent schreef",
    faq: "Veelgestelde vragen",
    buyAmazon: "Paperback kopen op Amazon.nl",
    buyPdf: "Printbestand kopen",
    pdfPickSize: "Op welk papierformaat print u?",
    buyPdfLetter: "Letter, 8.5 x 11 in",
    buyPdfA4: "A4",
    pdfLetterHint: "Gebruikelijk papier in de VS en Canada",
    pdfA4Hint: "Gebruikelijk papier in Nederland en Europa",
    pdfNote:
      "U betaalt hier en de link komt meteen na de aankoop per e-mail. Thuis zo vaak printen als u wilt.",
    buyFree: "Print 10 pagina's gratis",
    priceLabel: "paperback op Amazon.nl",
    buyNote: "Verkocht en verzonden door Amazon.",
    freeTitle: "Tien pagina's uit het boek, gratis om te printen",
    freeLead:
      "Dit zijn echte pagina's uit het boek: onder elke tekening staat hetzelfde woord als in het boek. Print er één uit, geef uw kind een potlood, en na vijf minuten weet u of dit boek bij uw kind past. Zonder registratie en zonder e-mailadres.",
    freeDownload: "Downloaden",
    freeFormat: "Formaat A4, om thuis te printen.",
    freeAlt: (name: string) => `${name}: kleurplaat uit het boek`,
    animals: {
      lion: "Leeuw", elephant: "Olifant", giraffe: "Giraf", zebra: "Zebra",
      rhino: "Neushoorn", monkey: "Aap", crocodile: "Krokodil",
      kangaroo: "Kangoeroe", bear: "Beer", fox: "Vos",
    },
    labelAge: "Leeftijd",
    labelDrawings: "Tekeningen",
    labelPages: "Pagina's",
    labelSize: "Formaat",
    labelPublished: "Verschenen",
    labelAuthor: "Auteur",
    labelPublisher: "Uitgeverij",
    criticSource: "De hele recensie lezen",
    pagesTitle: "Bladzijden uit het boek",
    videoTitle: "Video over het boek",
    videoLead:
      "Thuis gefilmd door een ouder die het boek gekocht heeft, zonder montage. U ziet de " +
      "omslag, de achterkant en alle bladzijden op volgorde, en u kunt zelf de lijndikte en " +
      "de grootte van de tekeningen beoordelen.",
    whenNotTitle: "Wanneer dit boek niet past",
    whenNot:
      "Als uw kind al moeiteloos binnen de lijnen kleurt en een bladzijde in een paar minuten " +
      "af heeft, zal dit boek te makkelijk zijn. Dan past een kleurboek met meer details beter, " +
      "of een boek waarin het kind zelf leert tekenen.",
    pickerLine:
      "Weet u niet welk kleurboek bij uw kind past? Op onze website staat daarvoor een gratis " +
      "test: vier vragen, ongeveer dertig seconden.",
    pickerCta: "Naar de test",
    footerAbout:
      "Uitgegeven door Magic of Discoveries LLC, een kinderboekenuitgeverij in Miami, Florida.",
    footerLink: "Alles over de eerste kleurboeken voor kinderen van 1 tot 3 jaar",
    footerLinkNote: "in het Engels",
  },
  pl: {
    htmlLang: "pl",
    locale: "pl-PL",
    inside: "Co jest w książce",
    forWhom: "Dla kogo jest ta książka",
    parents: "Co rodzice mówią w recenzjach o książce",
    ratingTitle: "Oceny",
    criticTitle: "Co napisała niezależna recenzentka",
    faq: "Najczęstsze pytania",
    buyAmazon: "Kup książkę w oprawie miękkiej na Amazon.pl",
    buyPdf: "Kup plik do druku",
    pdfPickSize: "Na jakim formacie papieru drukujesz?",
    buyPdfLetter: "Letter, 8.5 x 11 in",
    buyPdfA4: "A4",
    pdfLetterHint: "Zwykły papier w USA i Kanadzie",
    pdfA4Hint: "Zwykły papier w Polsce i Europie",
    pdfNote:
      "Płacisz tutaj, a link przychodzi e-mailem zaraz po zakupie. Drukuj w domu tyle razy, ile potrzebujesz.",
    buyFree: "Wydrukuj 10 stron za darmo",
    priceLabel: "oprawa miękka na Amazon.pl",
    buyNote: "Sprzedaż i wysyłka przez Amazon.",
    freeTitle: "Dziesięć stron z książki, do wydruku za darmo",
    freeLead:
      "To prawdziwe strony z książki: pod każdym rysunkiem jest to samo słowo co w książce. Wydrukuj jedną, daj dziecku kredkę, a po pięciu minutach będziesz wiedzieć, czy taka książka jest odpowiednia dla twojego dziecka. Bez rejestracji i bez adresu e-mail.",
    freeDownload: "Pobierz",
    freeFormat: "Format A4, do wydruku w domu.",
    freeAlt: (name: string) => `${name}: strona do kolorowania z książki`,
    animals: {
      lion: "Lew", elephant: "Słoń", giraffe: "Żyrafa", zebra: "Zebra",
      rhino: "Nosorożec", monkey: "Małpa", crocodile: "Krokodyl",
      kangaroo: "Kangur", bear: "Niedźwiedź", fox: "Lis",
    },
    labelAge: "Wiek",
    labelDrawings: "Rysunki",
    labelPages: "Strony",
    labelSize: "Format",
    labelPublished: "Data wydania",
    labelAuthor: "Autor",
    labelPublisher: "Wydawnictwo",
    criticSource: "Przeczytaj całą recenzję",
    pagesTitle: "Strony z książki",
    videoTitle: "Film o książce",
    videoLead:
      "Nagrane w domu przez rodzica, który kupił książkę, bez montażu. Widać okładkę, tył " +
      "i wszystkie strony po kolei, więc można samemu ocenić grubość konturu i wielkość rysunków.",
    whenNotTitle: "Kiedy ta książka nie będzie odpowiednia",
    whenNot:
      "Jeśli dziecko bez trudu koloruje wewnątrz konturu i kończy stronę w kilka minut, ta " +
      "książka wyda mu się zbyt łatwa. Lepsza będzie kolorowanka z większą liczbą szczegółów " +
      "albo książka, w której dziecko samo uczy się rysować.",
    pickerLine:
      "Nie wiesz, która kolorowanka będzie odpowiednia dla twojego dziecka? Na naszej stronie " +
      "jest do tego darmowy test: cztery pytania, około trzydziestu sekund.",
    pickerCta: "Przejdź do testu",
    footerAbout:
      "Wydane przez Magic of Discoveries LLC, wydawnictwo książek dla dzieci z Miami na Florydzie.",
    footerLink: "Wszystko o pierwszych kolorowankach dla dzieci od 1 do 3 lat",
    footerLinkNote: "po angielsku",
  },
  /* Испания. Язык страницы испанский, но не тот испанский, что стоит
     на самом сайте: сайт написан для Америки, обращение на "вы"
     и слово crayón. Здесь Испания, обращение на "ты" и слова, которые
     привычны там: pinturas, rotulador. Это заодно разводит страницу
     с испанским разделом сайта, чтобы они не спорили в поиске.

     Ссылка в подвале ведет на испанский раздел сайта, а не
     на английский, поэтому приписка про язык пустая. */
  it: {
    htmlLang: "it",
    locale: "it-IT",
    inside: "Cosa c'è dentro il libro",
    forWhom: "A chi è rivolto questo libro",
    parents: "Cosa dicono i genitori nelle recensioni sul libro",
    ratingTitle: "Valutazioni",
    criticTitle: "Che cosa ha detto del libro una recensora indipendente",
    faq: "Domande frequenti",
    buyAmazon: "Acquista il libro cartaceo su Amazon.it",
    buyPdf: "Acquista il file da stampare",
    pdfPickSize: "Su quale formato di carta stampi?",
    buyPdfLetter: "Letter, 8.5 x 11 in",
    buyPdfA4: "A4",
    pdfLetterHint: "Carta abituale negli Stati Uniti e in Canada",
    pdfA4Hint: "Carta abituale in Italia e in Europa",
    pdfNote:
      "Il pagamento avviene qui e il link arriva per e-mail subito dopo l'acquisto. Da stampare a casa tutte le volte che vuoi.",
    buyFree: "Stampa 10 pagine gratis",
    priceLabel: "copertina flessibile su Amazon.it",
    buyNote: "Venduto e spedito da Amazon.",
    freeTitle: "Dieci pagine del libro, gratis da stampare",
    freeLead:
      "Sono pagine tratte direttamente dal libro: su ciascuna, sotto il disegno, c'è una parola, proprio come nel libro. Stampate una pagina, date una matita al bambino e dopo cinque minuti capirete se il libro è adatto a lui. Senza registrazione e senza indirizzo e-mail.",
    freeDownload: "Scarica",
    freeFormat: "Formato A4, da stampare a casa.",
    freeAlt: (name: string) => `${name}: pagina da colorare tratta dal libro`,
    animals: {
      lion: "Leone", elephant: "Elefante", giraffe: "Giraffa", zebra: "Zebra",
      rhino: "Rinoceronte", monkey: "Scimmia", crocodile: "Coccodrillo",
      kangaroo: "Canguro", bear: "Orso", fox: "Volpe",
    },
    labelAge: "Età",
    labelDrawings: "Disegni",
    labelPages: "Pagine",
    labelSize: "Formato",
    labelPublished: "Data di pubblicazione",
    labelAuthor: "Autore",
    labelPublisher: "Editore",
    criticSource: "Leggi la recensione completa",
    pagesTitle: "Pagine del libro",
    videoTitle: "Video sul libro",
    videoLead:
      "Girato in casa da un genitore che ha comprato il libro, senza montaggio. Si vedono la " +
      "copertina, il retro e tutte le pagine in ordine, e si può valutare da soli lo spessore " +
      "del contorno e la grandezza dei disegni.",
    whenNotTitle: "Quando questo libro non è adatto",
    whenNot:
      "Se il bambino colora già senza fatica dentro il contorno e finisce una pagina in pochi " +
      "minuti, questo libro gli sembrerà troppo facile. Meglio allora un album con più " +
      "dettagli, oppure un libro in cui il bambino impara a disegnare da solo.",
    pickerLine:
      "Non sa quale album da colorare sia adatto a suo figlio? Sul nostro sito c'è un test " +
      "gratuito: quattro domande, circa trenta secondi.",
    pickerCta: "Vai al test",
    footerAbout:
      "Pubblicato da Magic of Discoveries LLC, casa editrice per bambini di Miami, Florida.",
    footerLink:
      "Tutto sui primi libri da colorare per bambini da 1 a 3 anni",
    footerLinkNote: "in inglese",
  },
  espana: {
    htmlLang: "es",
    locale: "es-ES",
    inside: "Qué hay en el libro",
    forWhom: "Para quién es este libro",
    parents: "Qué dicen los padres en sus reseñas sobre el libro",
    ratingTitle: "Valoraciones",
    criticTitle: "Lo que dijo una reseñadora independiente sobre el libro",
    faq: "Preguntas frecuentes",
    buyAmazon: "Comprar el libro impreso en Amazon.es",
    buyPdf: "Comprar el archivo para imprimir",
    pdfPickSize: "¿En qué tamaño de papel imprime?",
    buyPdfLetter: "Carta, 8.5 x 11 in",
    buyPdfA4: "A4",
    pdfLetterHint: "Papel habitual en Estados Unidos y Canadá",
    pdfA4Hint: "Papel habitual en España y Europa",
    pdfNote:
      "El pago se hace aquí y el enlace llega por correo justo después de la compra. Se puede imprimir en casa tantas veces como haga falta.",
    buyFree: "Imprime 10 páginas gratis",
    priceLabel: "tapa blanda en Amazon.es",
    buyNote: "Venta y envío por Amazon.",
    freeTitle: "Diez páginas del libro para imprimir gratis",
    freeLead:
      "Son páginas reales del libro: debajo de cada dibujo está la misma palabra que en el libro. Imprime una, dale un lápiz de color a tu hijo y en cinco minutos sabrás si este libro le va bien. Sin registro y sin correo electrónico.",
    freeDownload: "Descargar",
    freeFormat: "Formato A4, para imprimir en casa.",
    freeAlt: (name: string) => `${name}: página para colorear del libro`,
    animals: {
      lion: "León", elephant: "Elefante", giraffe: "Jirafa", zebra: "Cebra",
      rhino: "Rinoceronte", monkey: "Mono", crocodile: "Cocodrilo",
      kangaroo: "Canguro", bear: "Oso", fox: "Zorro",
    },
    labelAge: "Edad",
    labelDrawings: "Dibujos",
    labelPages: "Páginas",
    labelSize: "Formato",
    labelPublished: "Fecha de publicación",
    labelAuthor: "Autor",
    labelPublisher: "Editorial",
    criticSource: "Leer la reseña completa",
    pagesTitle: "Páginas del libro",
    videoTitle: "Vídeo sobre el libro",
    videoLead:
      "Grabado en casa por un padre que compró el libro, sin edición. Se ven la portada, la " +
      "contraportada y todas las páginas en orden, y usted mismo puede juzgar el grosor del " +
      "contorno y el tamaño de los dibujos.",
    whenNotTitle: "Cuándo este libro no conviene",
    whenNot:
      "Si su hijo ya colorea sin esfuerzo dentro del contorno y termina una página en unos " +
      "minutos, este libro le parecerá demasiado fácil. Entonces conviene más un libro con " +
      "dibujos más detallados, o uno en el que el niño aprenda a dibujar por su cuenta.",
    pickerLine:
      "¿No sabe qué libro para colorear le conviene a su hijo? En nuestro sitio hay una prueba " +
      "gratuita: cuatro preguntas, unos treinta segundos.",
    pickerCta: "Hacer la prueba",
    footerAbout:
      "Publicado por Magic of Discoveries LLC, editorial de libros infantiles de Miami, Florida.",
    footerLink:
      "Todo sobre los primeros libros de colorear para niños de 1 a 3 años",
    footerLinkNote: "",
    footerLinkHref: "/es",
  },

  /* Канада. Язык страницы английский: человека, который ищет
     испанские слова для ребенка, мы ждем именно с английским
     запросом. Магазин amazon.ca.

     Листы выдаются в формате Letter, а не A4: в Канаде домашние
     принтеры заряжены именно такой бумагой.

     Заголовок блока с листами отличается от английской страницы
     сайта нарочно: там "Ten pages from the book, free to print",
     и два одинаковых заголовка на одном домене Google счел бы
     за повтор. */
  canada: {
    htmlLang: "en",
    locale: "en-CA",
    inside: "What's inside the book",
    forWhom: "Who this book is for",
    parents: "What parents say in their reviews of the book",
    ratingTitle: "Ratings",
    criticTitle: "What an independent reviewer said about the book",
    faq: "Frequently asked questions",
    buyAmazon: "Buy the paperback on Amazon.ca",
    buyPdf: "Get the printable file",
    pdfPickSize: "Which paper size do you print on?",
    buyPdfLetter: "Letter, 8.5 x 11 in",
    buyPdfA4: "A4",
    pdfLetterHint: "Standard paper in Canada and the US",
    pdfA4Hint: "Standard paper in Europe and most other countries",
    pdfNote:
      "You pay here, and the link arrives by email right after checkout. Print it at home as many times as you need.",
    buyFree: "Print 10 pages for free",
    priceLabel: "paperback on Amazon.ca",
    buyNote: "Sold and shipped by Amazon.",
    freeTitle: "Ten sheets from the book, free to print",
    freeLead:
      "These are actual pages from the book, with the same word under each drawing as in the book. Print one, give your child a colored pencil, and in five minutes you'll know whether this kind of book is a good fit for your child. No sign-up and no email address.",
    freeDownload: "Download",
    freeFormat: "Letter format, for printing at home.",
    freeAlt: (name: string) => `${name}: coloring page from the book`,
    animals: {
      lion: "Lion", elephant: "Elephant", giraffe: "Giraffe", zebra: "Zebra",
      rhino: "Rhino", monkey: "Monkey", crocodile: "Crocodile",
      kangaroo: "Kangaroo", bear: "Bear", fox: "Fox",
    },
    labelAge: "Age",
    labelDrawings: "Drawings",
    labelPages: "Pages",
    labelSize: "Format",
    labelPublished: "Published",
    labelAuthor: "Author",
    labelPublisher: "Publisher",
    criticSource: "Read the full review",
    pagesTitle: "Pages from the book",
    videoTitle: "Video about the book",
    videoLead:
      "Filmed at home by a parent who bought the book, with no editing. You see the cover, " +
      "the back and every page in order, so you can judge the outline thickness and the size " +
      "of the drawings yourself.",
    whenNotTitle: "When this book is not the right fit",
    whenNot:
      "If your child already colors inside the lines without effort and finishes a page in a " +
      "few minutes, this book will feel too easy. A coloring book with more detail will suit " +
      "better, or one where the child learns to draw for themselves.",
    pickerLine:
      "Not sure which coloring book suits your child? Our site has a free four-question tool " +
      "for that. It takes about thirty seconds.",
    pickerCta: "Take the test",
    footerAbout:
      "Published by Magic of Discoveries LLC, a children's book publisher in Miami, Florida.",
    footerLink: "Everything about first coloring books for children ages 1 to 3",
    footerLinkNote: "",
    footerLinkHref: "/en",
    sheetSize: "letter",
  },
};

/* ==================================================================
   Адреса страниц

   Адрес написан на языке страницы и содержит главное слово, которым
   эти книги ищут в каждой стране: раскраска. Именно оно приводит
   человека из местного поиска.
   ================================================================== */

export const euroSlug: Record<EuroLang, Record<EditionLang, string>> = {
  de: {
    en: "malbuch-erste-woerter-englisch",
    es: "malbuch-erste-woerter-spanisch",
  },
  fr: {
    en: "coloriage-premiers-mots-anglais",
    es: "coloriage-premiers-mots-espagnol",
  },
  nl: {
    en: "kleurboek-eerste-woorden-engels",
    es: "kleurboek-eerste-woorden-spaans",
  },
  pl: {
    en: "kolorowanka-pierwsze-slowa-angielski",
    es: "kolorowanka-pierwsze-slowa-hiszpanski",
  },
  /* У Испании работает только английская строка. Испанская стоит
     для порядка и никуда не ведет: такой страницы нет. */
  espana: {
    en: "libro-de-colorear-primeras-palabras-en-ingles",
    es: "libro-de-colorear-primeras-palabras-en-espanol",
  },
  it: {
    en: "libro-da-colorare-prime-parole-inglese",
    es: "libro-da-colorare-prime-parole-spagnolo",
  },
  /* У Канады работает только испанская строка: там ждут человека,
     которому нужен именно испанский. */
  canada: {
    en: "coloring-book-first-words-in-english",
    es: "coloring-book-first-words-in-spanish",
  },
};

export const euroPath = (lang: EuroLang, ed: EditionLang) =>
  `/${lang}/${euroSlug[lang][ed]}`;

/* Название страны по-русски. Нужно только для строки в русском
   подвале, по которой владелец открывает эти восемь страниц. */
export const euroCountry: Record<EuroLang, string> = {
  de: "Германия",
  fr: "Франция",
  nl: "Голландия",
  pl: "Польша",
  it: "Италия",
  espana: "Испания",
  canada: "Канада",
};

/* ==================================================================
   Тексты страниц

   Смысл всех блоков утвержден владельцем. Менять его нельзя, можно
   только точно передать на каждом языке.

   Ни одного утверждения о пользе для развития здесь нет и быть не
   должно: ни про моторику, ни про интеллект, ни про двуязычие.
   Только проверяемое: толщина контура, один рисунок на странице,
   ребенок доводит рисунок до конца сам.
   ================================================================== */

export const euroCopy: Record<
  EuroLang,
  Partial<Record<EditionLang, EuroCopy>>
> = {
  /* ---------------------------- НЕМЕЦКИЙ ---------------------------- */
  de: {
    en: {
      title: "Erste Wörter auf Englisch",
      subtitle: "Malbuch für Kinder von 1 bis 3 Jahren",
      head: {
        top: "Malbuch und Bildwörterbuch für Kinder von 1 bis 3 Jahren",
        title: "Erste Wörter auf Englisch",
        bottom:
          "111 große Zeichnungen mit dicken Konturen. Unter jedem Bild ein englisches Wort.",
      },
      lead: [
        "Einfache Malbilder mit klaren Wörtern auf Englisch.",
        "Keine langen Texte, keine Grammatik, keine Sprachbarriere. Im Buch gibt es nur große Zeichnungen, dicke Konturen für die Kleinsten und ein einziges deutliches Wort unter jedem Bild.",
        "Geeignet sowohl für den ersten Kontakt mit der Sprache als auch für Kinder, die sie zu Hause jeden Tag hören. Ihr Kind kann vertraute Bilder allein oder zusammen mit den Eltern ausmalen und dabei eine fröhliche und interessante Zeit verbringen.",
        "Zehn Seiten aus dem Buch können Sie kostenlos ausdrucken, schon vor dem Kauf. Keine Anmeldung, keine E-Mail-Adresse, nichts auszufüllen. Und wenn es Ihrem Kind gefällt, können Sie das ganze Buch kaufen und gemeinsam weiter neue Wörter entdecken, ausmalen und Freude daran haben.",
      ],
      forWhom:
        "Für Kinder von 1 bis 3 Jahren und etwas darüber hinaus. Für den ersten Kontakt mit englischen Wörtern ebenso wie für Familien, in denen ein Kind zwei Sprachen hört. Hier muss nichts eigens gelernt werden: Das Kind malt vertraute Bilder aus, schaut sie sich an und lernt nach und nach die Wörter kennen, die unter den Zeichnungen stehen. Eltern können diese Wörter laut aussprechen und gemeinsam mit dem Kind die Bilder anschauen und ausmalen - ohne Unterricht, ohne Regeln und ohne schwierige Aufgaben.",
      inside: [
        "111 einfache Wörter auf Englisch, ein Wort unter jedem Bild",
        "Große, für Kinder gut erkennbare Zeichnungen mit dicken Konturen",
        "Das Wort unter der Zeichnung ist in großen Konturbuchstaben gedruckt und lässt sich ebenfalls ausmalen",
        "Eine Zeichnung auf jeder Seite",
        "Die Zeichnungen sind in der Mitte der Seite platziert - praktisch für Links- und Rechtshänder",
        "Vertraute Themen: Tiere, Essen, Fahrzeuge, Natur, Märchenfiguren und mehr",
        "Am Anfang des Buches eine eigene Namensseite für das Kind",
        "114 Seiten im großen Format 21,6 × 27,9 cm",
      ],
      parents: [
        "Das Kind malt ein Bild von selbst zu Ende und blättert zum nächsten weiter",
        "Die großen, einfachen Bilder lassen sich auch von kleinen Kindern leicht ausmalen",
        "Ein Buch reicht für eine lange Fahrt, für das Wartezimmer und für einen Regentag",
        "Das Buch ist leicht und lässt sich einfach mitnehmen",
        "Kinder blättern darin sogar ohne Stifte und fragen, wie jedes Tier heißt",
        "Man kauft es für das jüngste Kind in der Familie, wenn die älteren schon schwierigere Malbücher brauchen",
      ],
      rating: "Bewertung 5,0 von 5 bei Amazon.",
      /* Пять звезд и одной строкой за что. Пересказа рецензии здесь
         больше нет: кому нужно подробно, нажимает кнопку и читает
         ее целиком на сайте Readers' Favorite. */
      criticTitle: "Was eine unabhängige Rezensentin über das Buch schrieb",
      critic: "5 von 5 Sternen, Readers' Favorite",
      criticWhy:
        "Besonders hervorgehoben: die dicken, abgerundeten Konturen, die Platzierung der Zeichnungen in der Mitte der Seite und das Wort unter dem Bild, das sich ebenfalls ausmalen lässt.",
      criticBy: "Maalin Ogaja, Oktober 2024",
      whyTitle:
        "Warum sich dieses Buch für den ersten Kontakt mit der Sprache eignet",
      why: [
        "Der Kontakt mit der Sprache muss kein Unterricht sein. Das Kind schaut sich vertraute Bilder an und malt sie aus, und ein Erwachsener kann die abgebildeten Dinge einfach beim Namen nennen.",
        "Sie müssen die Sprache selbst nicht gut können. Unter jedem Bild steht nur ein einziges einfaches Wort. Es lässt sich leicht lesen, dem Kind laut vorsprechen und gemeinsam wiederholen.",
        "Das Bild hilft, das Wort zu verstehen. Das Kind sieht einen vertrauten Gegenstand und gleichzeitig das Wort, das darunter steht. So begegnet es englischen Wörtern in einem für das Kind verständlichen Zusammenhang.",
        "Allein oder gemeinsam, beides geht. Das Kind kann die Bilder einfach ausmalen, und Eltern können sie mit ihm zusammen anschauen, die Dinge benennen und neue Wörter wiederholen.",
        "Das Buch begleitet das Kind von 1 bis 3 Jahren und auch etwas darüber hinaus. Am Anfang malt ein Kind einfach die großen Bilder aus und hört die Namen der Dinge. Später kann es die Wörter nachsprechen und versuchen, auch die Konturbuchstaben auszumalen.",
      ],
      faq: [
        {
          q: "Ist ein Malbuch für ein einjähriges Kind nicht zu früh?",
          a: "Nein. Die Zeichnungen sind bewusst einfach gehalten, für die Kleinsten. Ein einjähriges Kind kritzelt vielleicht noch über das Bild, ein dreijähriges versucht schon, innerhalb der Konturen zu malen. Deshalb lässt sich das Buch in verschiedenen Phasen zwischen 1 und 3 Jahren verwenden.",
        },
        {
          q: "Mein Kind kann noch kein Englisch. Wird das Buch zu schwierig sein?",
          a: "Nein. Das Kind malt einfach ein vertrautes Bild aus und sieht das englische Wort darunter. Es gibt hier keine Aufgaben, keine Regeln und keine Tests, und lesen muss das Kind auch nicht können.",
        },
        {
          q: "Müssen die Eltern selbst gut Englisch können?",
          a: "Nein. Unter jeder Zeichnung steht nur ein einziges einfaches englisches Wort. Eltern können den abgebildeten Gegenstand benennen, das Wort vorlesen oder einfach zusammen mit dem Kind das Bild ausmalen.",
        },
        {
          q: "Welche englischen Wörter stehen im Buch?",
          a: "Das Buch enthält 111 Wörter aus vertrauten Themenbereichen: Tiere, Essen, Fahrzeuge, Natur, Märchenfiguren und mehr. Unter jeder Zeichnung steht ein Wort auf Englisch.",
        },
        {
          q: "Gibt es im Buch eine Lautschrift oder Hinweise zur Aussprache der englischen Wörter?",
          a: "Nein. Unter jedem Bild steht nur das englische Wort selbst, in großen Konturbuchstaben, die sich ebenfalls ausmalen lassen. Eine Lautschrift oder Aussprachehilfen enthält das Buch nicht. Wer sich bei der Aussprache unsicher ist, kann sie in einer Übersetzer-App auf dem Handy anhören.",
        },
        {
          q: "Worin unterscheiden sich die Ausgaben mit englischen und spanischen Wörtern?",
          a: "Nur in der Sprache des Wortes unter der Zeichnung: In der einen Ausgabe stehen die Wörter auf Englisch, in der anderen auf Spanisch. Zeichnungen, Papier, Format und Reihenfolge der Seiten sind gleich.",
        },
        {
          q: "Ist es normal, wenn das Kind über die Konturen hinausmalt?",
          a: "Ja. Das Buch enthält große, einfache Zeichnungen mit dicken Konturen. Mit einem Jahr kritzelt ein Kind vielleicht noch über das Bild, später malt es häufiger innerhalb der Konturen. Genau ausmalen muss es nicht.",
        },
        {
          q: "Womit malt man die Bilder in diesem Buch am besten aus?",
          a: "Buntstifte und Wachsmalstifte sind die beste Wahl: Sie drücken nicht durch das Papier. Filzstifte geben kräftigere Farben, ihre Tinte kann aber durchschlagen.",
        },
        {
          q: "Wie lange kann ein Kind dieses Malbuch nutzen?",
          a: "Das Buch enthält 111 Zeichnungen, eine pro Seite. Wie lange es genutzt wird, hängt vom Kind ab: Manche malen jeweils ein Bild aus, andere mehrere hintereinander.",
        },
        {
          q: "Kann man das Buch vor dem Kauf ausprobieren?",
          a: "Ja. Zehn echte Seiten aus dem Buch lassen sich kostenlos herunterladen und zu Hause ausdrucken. Eine Anmeldung oder eine E-Mail-Adresse ist nicht nötig.",
        },
      ],
      pair: "Dasselbe Buch mit spanischen Wörtern unter den Zeichnungen:",
      pairCta: "Erste Wörter auf Spanisch",
      metaTitle: "Erste Wörter auf Englisch - Malbuch für Kinder von 1 bis 3 Jahren",
      metaDescription:
        "111 große Zeichnungen mit dicken Konturen, eine pro Seite, mit einem englischen Wort darunter, das sich ebenfalls ausmalen lässt. Für Kinder von 1 bis 3 Jahren.",
      altCover: "Cover des Malbuchs mit englischen Wörtern und einem Löwen",
      altBannerLead:
        "First Coloring Book For Toddlers von Ricardo Demi, Cover mit einem Löwen, für 1 bis 3 Jahre",
      altArt: [
        "Einfach: eine Schildkröte mit dicker Kontur, ein einziges Motiv auf der Seite",
        "Groß: eine Kuh, die fast das ganze Blatt einnimmt, von einem kleinen Kind ausgemalt",
        "Vertraut: ein lachendes rotes Auto, eines der Alltagsdinge im Buch",
      ],
      altGift: "Ein Geschenk für kleine Anfänger: ein Donut und Buntstifte",
    },
    es: {
      title: "Erste Wörter auf Spanisch",
      subtitle: "Malbuch für Kinder von 1 bis 3 Jahren",
      head: {
        top: "Malbuch und Bildwörterbuch für Kinder von 1 bis 3 Jahren",
        title: "Erste Wörter auf Spanisch",
        bottom:
          "111 große Zeichnungen mit dicken Konturen. Unter jedem Bild ein spanisches Wort.",
      },
      lead: [
        "Einfache Malbilder mit klaren Wörtern auf Spanisch.",
        "Keine langen Texte, keine Grammatik, keine Sprachbarriere. Im Buch gibt es nur große Zeichnungen, dicke Konturen für die Kleinsten und ein einziges deutliches Wort unter jedem Bild.",
        "Geeignet sowohl für den ersten Kontakt mit der Sprache als auch für Kinder, die sie zu Hause jeden Tag hören. Ihr Kind kann vertraute Bilder allein oder zusammen mit den Eltern ausmalen und dabei eine fröhliche und interessante Zeit verbringen.",
        "Zehn Seiten aus dem Buch können Sie kostenlos ausdrucken, schon vor dem Kauf. Keine Anmeldung, keine E-Mail-Adresse, nichts auszufüllen. Und wenn es Ihrem Kind gefällt, können Sie das ganze Buch kaufen und gemeinsam weiter neue Wörter entdecken, ausmalen und Freude daran haben.",
      ],
      forWhom:
        "Für Kinder von 1 bis 3 Jahren und etwas darüber hinaus. Für den ersten Kontakt mit spanischen Wörtern ebenso wie für Familien, in denen ein Kind zwei Sprachen hört. Hier muss nichts eigens gelernt werden: Das Kind malt vertraute Bilder aus, schaut sie sich an und lernt nach und nach die Wörter kennen, die unter den Zeichnungen stehen. Eltern können diese Wörter laut aussprechen und gemeinsam mit dem Kind die Bilder anschauen und ausmalen - ohne Unterricht, ohne Regeln und ohne schwierige Aufgaben.",
      inside: [
        "111 einfache Wörter auf Spanisch, ein Wort unter jedem Bild",
        "Große, für Kinder gut erkennbare Zeichnungen mit dicken Konturen",
        "Das Wort unter der Zeichnung ist in großen Konturbuchstaben gedruckt und lässt sich ebenfalls ausmalen",
        "Eine Zeichnung auf jeder Seite",
        "Die Zeichnungen sind in der Mitte der Seite platziert - praktisch für Links- und Rechtshänder",
        "Vertraute Themen: Tiere, Essen, Fahrzeuge, Natur, Märchenfiguren und mehr",
        "Am Anfang des Buches eine eigene Namensseite für das Kind",
        "114 Seiten im großen Format 21,6 × 27,9 cm",
      ],
      parents: [
        "Das Kind malt ein Bild von selbst zu Ende und blättert zum nächsten weiter",
        "Die großen, einfachen Bilder lassen sich fast mühelos ausmalen, und das Kind gewinnt mehr Vertrauen in die eigene Hand",
        "Ein Buch reicht für eine lange Fahrt, für das Wartezimmer und für einen Regentag",
        "Das Buch ist leicht und lässt sich einfach mitnehmen",
        "Kinder blättern darin sogar ohne Stifte und fragen, wie jedes Tier heißt",
        "Man kauft es für das jüngste Kind in der Familie, wenn die älteren schon schwierigere Malbücher brauchen",
      ],
      rating:
        "Bewertung 4,9 von 5 bei Amazon. Die Zeichnungen sind in beiden Ausgaben dieselben.",
      criticTitle: "Was eine unabhängige Rezensentin über das Buch schrieb",
      critic: "5 von 5 Sternen, Readers' Favorite",
      criticBy: "Maalin Ogaja, Oktober 2024",
      criticWhy:
        "Besonders hervorgehoben: die dicken, abgerundeten Konturen, die Platzierung der Zeichnungen in der Mitte der Seite und das Wort unter dem Bild, das sich ebenfalls ausmalen lässt.",
      whyTitle:
        "Warum sich dieses Buch für den ersten Kontakt mit der Sprache eignet",
      why: [
        "Der Kontakt mit der Sprache muss kein Unterricht sein. Das Kind schaut sich vertraute Bilder an und malt sie aus, und ein Erwachsener kann die abgebildeten Dinge einfach beim Namen nennen.",
        "Sie müssen die Sprache selbst nicht gut können. Unter jedem Bild steht nur ein einziges einfaches Wort. Es lässt sich leicht lesen, dem Kind laut vorsprechen und gemeinsam wiederholen.",
        "Das Bild hilft, das Wort zu verstehen. Das Kind sieht einen vertrauten Gegenstand und gleichzeitig das Wort, das darunter steht. So begegnet es spanischen Wörtern in einem für das Kind verständlichen Zusammenhang.",
        "Allein oder gemeinsam, beides geht. Das Kind kann die Bilder einfach ausmalen, und Eltern können sie mit ihm zusammen anschauen, die Dinge benennen und neue Wörter wiederholen.",
        "Das Buch begleitet das Kind von 1 bis 3 Jahren und auch etwas darüber hinaus. Am Anfang malt ein Kind einfach die großen Bilder aus und hört die Namen der Dinge. Später kann es die Wörter nachsprechen und versuchen, auch die Konturbuchstaben auszumalen.",
      ],
      faq: [
        {
          q: "Ist ein Malbuch für ein einjähriges Kind nicht zu früh?",
          a: "Nein. Die Zeichnungen sind bewusst einfach gehalten, für die Kleinsten. Ein einjähriges Kind kritzelt vielleicht noch über das Bild, ein dreijähriges versucht schon, innerhalb der Konturen zu malen. Deshalb lässt sich das Buch in verschiedenen Phasen zwischen 1 und 3 Jahren verwenden.",
        },
        {
          q: "Mein Kind kann noch kein Spanisch. Wird das Buch zu schwierig sein?",
          a: "Nein. Das Kind malt einfach ein vertrautes Bild aus und sieht das spanische Wort darunter. Es gibt hier keine Aufgaben, keine Regeln und keine Tests, und lesen muss das Kind auch nicht können.",
        },
        {
          q: "Müssen die Eltern selbst gut Spanisch können?",
          a: "Nein. Unter jeder Zeichnung steht nur ein einziges einfaches spanisches Wort. Eltern können den abgebildeten Gegenstand benennen, das Wort vorlesen oder einfach zusammen mit dem Kind das Bild ausmalen.",
        },
        {
          q: "Welche spanischen Wörter stehen im Buch?",
          a: "Das Buch enthält 111 Wörter aus vertrauten Themenbereichen: Tiere, Essen, Fahrzeuge, Natur, Märchenfiguren und mehr. Unter jeder Zeichnung steht ein Wort auf Spanisch.",
        },
        {
          q: "Gibt es im Buch eine Lautschrift oder Hinweise zur Aussprache der spanischen Wörter?",
          a: "Nein. Unter jedem Bild steht nur das spanische Wort selbst, in großen Konturbuchstaben, die sich ebenfalls ausmalen lassen. Eine Lautschrift oder Aussprachehilfen enthält das Buch nicht. Wer sich bei der Aussprache unsicher ist, kann sie in einer Übersetzer-App auf dem Handy anhören.",
        },
        {
          q: "Worin unterscheiden sich die Ausgaben mit englischen und spanischen Wörtern?",
          a: "Nur in der Sprache des Wortes unter der Zeichnung: In der einen Ausgabe stehen die Wörter auf Englisch, in der anderen auf Spanisch. Zeichnungen, Papier, Format und Reihenfolge der Seiten sind gleich.",
        },
        {
          q: "Ist es normal, wenn das Kind über die Konturen hinausmalt?",
          a: "Ja. Das Buch enthält große, einfache Zeichnungen mit dicken Konturen. Mit einem Jahr kritzelt ein Kind vielleicht noch über das Bild, später malt es häufiger innerhalb der Konturen. Genau ausmalen muss es nicht.",
        },
        {
          q: "Womit malt man die Bilder in diesem Buch am besten aus?",
          a: "Buntstifte und Wachsmalstifte sind die beste Wahl: Sie drücken nicht durch das Papier. Filzstifte geben kräftigere Farben, ihre Tinte kann aber durchschlagen.",
        },
        {
          q: "Wie lange kann ein Kind dieses Malbuch nutzen?",
          a: "Das Buch enthält 111 Zeichnungen, eine pro Seite. Wie lange es genutzt wird, hängt vom Kind ab: Manche malen jeweils ein Bild aus, andere mehrere hintereinander.",
        },
        {
          q: "Kann man das Buch vor dem Kauf ausprobieren?",
          a: "Ja. Zehn echte Seiten aus dem Buch lassen sich kostenlos herunterladen und zu Hause ausdrucken. Eine Anmeldung oder eine E-Mail-Adresse ist nicht nötig.",
        },
      ],
      pair: "Dasselbe Buch mit englischen Wörtern unter den Zeichnungen:",
      pairCta: "Erste Wörter auf Englisch",
      metaTitle: "Erste Wörter auf Spanisch - Malbuch für Kinder von 1 bis 3 Jahren",
      metaDescription:
        "111 große Zeichnungen mit dicken Konturen, eine pro Seite, mit einem spanischen Wort darunter, das sich ebenfalls ausmalen lässt. Für Kinder von 1 bis 3 Jahren.",
      altCover: "Cover des Malbuchs mit spanischen Wörtern und einem Löwen",
      altBannerLead:
        "El Primer Libro de Colorear para Bebés von Ricardo Demi, Cover mit einem Löwen, für 1 bis 3 Jahre",
      altArt: [
        "Einfach: eine Schildkröte mit dicker Kontur, ein einziges Motiv auf der Seite",
        "Groß: eine Kuh, die fast das ganze Blatt einnimmt, von einem kleinen Kind ausgemalt",
        "Vertraut: ein lachendes rotes Auto, eines der Alltagsdinge im Buch",
      ],
      altGift: "Ein Geschenk für kleine Anfänger: ein Donut und Buntstifte",
    },
  },

  /* -------------------------- ФРАНЦУЗСКИЙ --------------------------- */
  /* Тексты сняты с общей русской основы владельца, утверждены им
     и выправлены его правками от 26 августа 2026 года.

     Во Франции у книжки, где под картинкой стоит слово, есть свое
     привычное название: imagier. Так эти книги называют французские
     издательства и магазины, и так их ищут родители. Поэтому верхняя
     строка страницы звучит как livre de coloriage et imagier. */
  fr: {
    en: {
      title: "Premiers mots en anglais",
      subtitle: "Livre de coloriage pour enfants de 1 à 3 ans",
      head: {
        top: "Livre de coloriage et imagier pour enfants de 1 à 3 ans",
        title: "Premiers mots en anglais",
        bottom:
          "111 grands dessins aux contours épais. Sous chaque image, un mot en anglais.",
      },
      lead: [
        "Des images simples à colorier avec des mots clairs en anglais.",
        "Ni longs textes, ni grammaire, ni barrière de la langue. Le livre ne contient que de grands dessins aux contours épais, adaptés aux tout-petits, avec un seul mot bien lisible sous chaque image.",
        "Convient aussi bien à un premier contact avec la langue qu'aux enfants qui l'entendent tous les jours à la maison. Votre enfant peut colorier des images familières seul ou avec ses parents et passer un moment amusant et intéressant.",
        /* Абзац про десять бесплатных страниц обязателен на каждой
           из восьми страниц. Решение владельца. */
        "Dix pages du livre peuvent être imprimées gratuitement, avant même l'achat. Ni inscription, ni adresse e-mail, rien à remplir. Et si votre enfant aime, vous pourrez acheter le livre entier et continuer ensemble à découvrir de nouveaux mots, à colorier et à profiter de ces moments.",
      ],
      forWhom:
        "Pour les enfants de 1 à 3 ans et un peu plus grands, aussi bien pour un premier contact avec les mots anglais que pour les familles où l'enfant entend deux langues. Ici, il n'y a rien à apprendre spécialement : l'enfant colorie des images familières, les regarde et découvre peu à peu les mots écrits sous les dessins. Les parents peuvent prononcer ces mots à voix haute, regarder les images et les colorier avec l'enfant, sans leçons, sans règles et sans exercices difficiles.",
      inside: [
        "111 mots simples en anglais, un seul mot sous chaque image",
        "De grands dessins aux contours épais, faciles à reconnaître pour un enfant",
        "Le mot sous le dessin est imprimé en grandes lettres creuses, qui se colorient aussi",
        "Un dessin sur chaque page",
        "Les dessins sont placés au centre de la page : pratique pour les droitiers comme pour les gauchers",
        "Des thèmes familiers : animaux, nourriture, véhicules, nature, personnages de contes et bien d'autres",
        "Au début du livre, une page pour écrire le prénom de l'enfant",
        "114 pages au grand format 21,6 × 27,9 cm",
      ],
      parents: [
        "L'enfant termine lui-même son dessin et tourne la page pour le suivant",
        "Les grandes images simples se colorient facilement, même pour un jeune enfant",
        "Le livre est parfait pour un long trajet, une salle d'attente ou un jour de pluie à la maison",
        "Le livre est léger et s'emporte facilement",
        "Les enfants le feuillettent même sans crayons et demandent le nom de chaque animal",
        "On l'achète pour le plus jeune de la famille, quand les aînés ont déjà besoin de coloriages plus difficiles",
      ],
      rating: "Note de 5,0 sur 5 sur Amazon.",
      criticTitle: "Ce qu'une critique indépendante a dit du livre",
      critic: "5 étoiles sur 5, Readers' Favorite",
      criticBy: "Maalin Ogaja, octobre 2024",
      criticWhy:
        "Souligné en particulier : le contour épais et arrondi, le dessin placé au centre de la page et le mot sous l'image, qui se colorie aussi.",
      whyTitle: "Pourquoi ce livre convient à un premier contact avec la langue",
      why: [
        "Le contact avec la langue n'a pas besoin d'être une leçon. L'enfant regarde des images familières et les colorie, et l'adulte peut simplement nommer ce qui est dessiné.",
        "Vous n'avez pas besoin de bien connaître la langue vous-même. Sous chaque image, il n'y a qu'un seul mot simple. Il est facile à lire, à prononcer à voix haute et à répéter ensemble avec l'enfant.",
        "L'image aide à comprendre le mot. L'enfant voit un objet familier et, en même temps, le mot écrit en dessous. Il rencontre ainsi les mots anglais dans un contexte compréhensible pour lui.",
        "Seul ou avec ses parents, l'enfant peut simplement colorier les images. Les parents peuvent aussi les regarder avec lui, nommer les objets et répéter les nouveaux mots ensemble.",
        "Le livre accompagne l'enfant de 1 à 3 ans et un peu au-delà. Au début, l'enfant colorie simplement les grandes images et entend le nom des objets. Plus tard, il peut répéter les mots et essayer de colorier aussi les lettres creuses.",
      ],
      faq: [
        {
          q: "Un livre de coloriage dès 1 an, n'est-ce pas trop tôt ?",
          a: "Non. Les dessins ont été volontairement conçus pour être simples et adaptés aux tout-petits. À un an, l'enfant gribouille peut-être encore par-dessus l'image, tandis qu'à trois ans il essaie déjà de colorier à l'intérieur du contour. Le livre peut donc être utilisé à différentes étapes entre 1 et 3 ans.",
        },
        {
          q: "Mon enfant ne connaît pas encore l'anglais. Le livre ne sera-t-il pas trop difficile ?",
          a: "Non. L'enfant colorie simplement une image qu'il connaît et voit le mot anglais écrit en dessous. Il n'y a ici ni exercices, ni règles, ni tests, et l'enfant n'a pas besoin de savoir lire.",
        },
        {
          q: "Les parents doivent-ils eux-mêmes bien connaître l'anglais ?",
          a: "Non. Sous chaque dessin figure un seul mot anglais très simple. Les parents peuvent nommer l'objet représenté, lire le mot à voix haute ou simplement colorier l'image avec l'enfant.",
        },
        {
          q: "Quels mots anglais trouve-t-on dans le livre ?",
          a: "Le livre contient 111 mots sur des thèmes familiers : animaux, nourriture, véhicules, nature, personnages de contes et bien d'autres. Sous chaque dessin figure un mot en anglais.",
        },
        {
          q: "Le livre contient-il une transcription phonétique ou des indications de prononciation des mots anglais ?",
          a: "Non. Sous chaque image figure uniquement le mot anglais lui-même, en grandes lettres creuses qui se colorient également. Le livre ne contient ni transcription phonétique ni aide à la prononciation. En cas de doute sur la prononciation, on peut l'écouter dans une application de traduction sur son téléphone.",
        },
        {
          q: "Quelle est la différence entre l'édition avec des mots anglais et celle avec des mots espagnols ?",
          a: "Uniquement la langue du mot sous le dessin : dans une édition, les mots sont en anglais, dans l'autre, en espagnol. Les dessins, le papier, le format et l'ordre des pages sont identiques.",
        },
        {
          q: "Est-ce normal que l'enfant dépasse les contours en coloriant ?",
          a: "Oui. Le livre contient de grands dessins simples aux contours épais. À un an, l'enfant gribouille peut-être encore par-dessus l'image, et plus tard il colorie plus souvent à l'intérieur des contours. Il n'a pas besoin de colorier avec précision.",
        },
        {
          q: "Avec quoi vaut-il mieux colorier les images de ce livre ?",
          a: "Les crayons de couleur et les craies grasses sont le meilleur choix : ils ne traversent pas le papier. Les feutres donnent des couleurs plus vives, mais leur encre peut traverser la feuille.",
        },
        {
          q: "Combien de temps un enfant peut-il utiliser ce livre de coloriage ?",
          a: "Le livre contient 111 dessins, un par page. La durée dépend de l'enfant : certains colorient un dessin à la fois, d'autres plusieurs à la suite.",
        },
        {
          q: "Peut-on essayer le livre avant de l'acheter ?",
          a: "Oui. Dix vraies pages du livre peuvent être téléchargées gratuitement et imprimées à la maison. Aucune inscription ni adresse e-mail n'est nécessaire.",
        },
      ],
      pair: "Le même livre avec les mots en espagnol sous les dessins :",
      pairCta: "Premiers mots en espagnol",
      metaTitle:
        "Premiers mots en anglais - Livre de coloriage pour enfants de 1 à 3 ans",
      metaDescription:
        "111 grands dessins aux contours épais, un par page, avec en dessous un mot en anglais qui se colorie aussi. Pour les enfants de 1 à 3 ans.",
      altCover:
        "Couverture du livre de coloriage avec les mots en anglais et un lion",
      altBannerLead:
        "111 images à colorier et 111 mots en anglais, avec à côté la couverture du livre de coloriage avec le lion",
      altArt: [
        "Simple : une tortue au contour épais, un seul motif sur la page",
        "Grand : une vache qui remplit presque toute la feuille, coloriée par un jeune enfant",
        "Familier : une voiture rouge souriante, un des objets du quotidien du livre",
      ],
      altGift:
        "Le cadeau idéal pour les futurs artistes : un donut et des crayons de couleur",
    },
    es: {
      title: "Premiers mots en espagnol",
      subtitle: "Livre de coloriage pour enfants de 1 à 3 ans",
      head: {
        top: "Livre de coloriage et imagier pour enfants de 1 à 3 ans",
        title: "Premiers mots en espagnol",
        bottom:
          "111 grands dessins aux contours épais. Sous chaque image, un mot en espagnol.",
      },
      lead: [
        "Des images simples à colorier avec des mots clairs en espagnol.",
        "Ni longs textes, ni grammaire, ni barrière de la langue. Le livre ne contient que de grands dessins aux contours épais, adaptés aux tout-petits, avec un seul mot bien lisible sous chaque image.",
        "Convient aussi bien à un premier contact avec la langue qu'aux enfants qui l'entendent tous les jours à la maison. Votre enfant peut colorier des images familières seul ou avec ses parents et passer un moment amusant et intéressant.",
        "Dix pages du livre peuvent être imprimées gratuitement, avant même l'achat. Ni inscription, ni adresse e-mail, rien à remplir. Et si votre enfant aime, vous pourrez acheter le livre entier et continuer ensemble à découvrir de nouveaux mots, à colorier et à profiter de ces moments.",
      ],
      forWhom:
        "Pour les enfants de 1 à 3 ans et un peu plus grands, aussi bien pour un premier contact avec les mots espagnols que pour les familles où l'enfant entend deux langues. Ici, il n'y a rien à apprendre spécialement : l'enfant colorie des images familières, les regarde et découvre peu à peu les mots écrits sous les dessins. Les parents peuvent prononcer ces mots à voix haute, regarder les images et les colorier avec l'enfant, sans leçons, sans règles et sans exercices difficiles.",
      inside: [
        "111 mots simples en espagnol, un seul mot sous chaque image",
        "De grands dessins aux contours épais, faciles à reconnaître pour un enfant",
        "Le mot sous le dessin est imprimé en grandes lettres creuses, qui se colorient aussi",
        "Un dessin sur chaque page",
        "Les dessins sont placés au centre de la page : pratique pour les droitiers comme pour les gauchers",
        "Des thèmes familiers : animaux, nourriture, véhicules, nature, personnages de contes et bien d'autres",
        "Au début du livre, une page pour écrire le prénom de l'enfant",
        "114 pages au grand format 21,6 × 27,9 cm",
      ],
      parents: [
        "L'enfant termine lui-même son dessin et tourne la page pour le suivant",
        "Les grandes images simples se colorient facilement, même pour un jeune enfant",
        "Le livre est parfait pour un long trajet, une salle d'attente ou un jour de pluie à la maison",
        "Le livre est léger et s'emporte facilement",
        "Les enfants le feuillettent même sans crayons et demandent le nom de chaque animal",
        "On l'achète pour le plus jeune de la famille, quand les aînés ont déjà besoin de coloriages plus difficiles",
      ],
      /* У испанского издания к оценке добавлена вторая фраза: рисунки
         в обеих книгах одни и те же, и оценка 4,9 рядом с 5,0 не должна
         читаться как разница в качестве рисунков. */
      rating:
        "Note de 4,9 sur 5 sur Amazon. Les dessins sont les mêmes dans les deux éditions.",
      criticTitle: "Ce qu'une critique indépendante a dit du livre",
      critic: "5 étoiles sur 5, Readers' Favorite",
      criticBy: "Maalin Ogaja, octobre 2024",
      criticWhy:
        "Souligné en particulier : le contour épais et arrondi, le dessin placé au centre de la page et le mot sous l'image, qui se colorie aussi.",
      whyTitle: "Pourquoi ce livre convient à un premier contact avec la langue",
      why: [
        "Le contact avec la langue n'a pas besoin d'être une leçon. L'enfant regarde des images familières et les colorie, et l'adulte peut simplement nommer ce qui est dessiné.",
        "Vous n'avez pas besoin de bien connaître la langue vous-même. Sous chaque image, il n'y a qu'un seul mot simple. Il est facile à lire, à prononcer à voix haute et à répéter ensemble avec l'enfant.",
        "L'image aide à comprendre le mot. L'enfant voit un objet familier et, en même temps, le mot écrit en dessous. Il rencontre ainsi les mots espagnols dans un contexte compréhensible pour lui.",
        "Seul ou avec ses parents, l'enfant peut simplement colorier les images. Les parents peuvent aussi les regarder avec lui, nommer les objets et répéter les nouveaux mots ensemble.",
        "Le livre accompagne l'enfant de 1 à 3 ans et un peu au-delà. Au début, l'enfant colorie simplement les grandes images et entend le nom des objets. Plus tard, il peut répéter les mots et essayer de colorier aussi les lettres creuses.",
      ],
      faq: [
        {
          q: "Un livre de coloriage dès 1 an, n'est-ce pas trop tôt ?",
          a: "Non. Les dessins ont été volontairement conçus pour être simples et adaptés aux tout-petits. À un an, l'enfant gribouille peut-être encore par-dessus l'image, tandis qu'à trois ans il essaie déjà de colorier à l'intérieur du contour. Le livre peut donc être utilisé à différentes étapes entre 1 et 3 ans.",
        },
        {
          q: "Mon enfant ne connaît pas encore l'espagnol. Le livre ne sera-t-il pas trop difficile ?",
          a: "Non. L'enfant colorie simplement une image qu'il connaît et voit le mot espagnol écrit en dessous. Il n'y a ici ni exercices, ni règles, ni tests, et l'enfant n'a pas besoin de savoir lire.",
        },
        {
          q: "Les parents doivent-ils eux-mêmes bien connaître l'espagnol ?",
          a: "Non. Sous chaque dessin figure un seul mot espagnol très simple. Les parents peuvent nommer l'objet représenté, lire le mot à voix haute ou simplement colorier l'image avec l'enfant.",
        },
        {
          q: "Quels mots espagnols trouve-t-on dans le livre ?",
          a: "Le livre contient 111 mots sur des thèmes familiers : animaux, nourriture, véhicules, nature, personnages de contes et bien d'autres. Sous chaque dessin figure un mot en espagnol.",
        },
        {
          q: "Le livre contient-il une transcription phonétique ou des indications de prononciation des mots espagnols ?",
          a: "Non. Sous chaque image figure uniquement le mot espagnol lui-même, en grandes lettres creuses qui se colorient également. Le livre ne contient ni transcription phonétique ni aide à la prononciation. En cas de doute sur la prononciation, on peut l'écouter dans une application de traduction sur son téléphone.",
        },
        {
          q: "Quelle est la différence entre l'édition avec des mots anglais et celle avec des mots espagnols ?",
          a: "Uniquement la langue du mot sous le dessin : dans une édition, les mots sont en anglais, dans l'autre, en espagnol. Les dessins, le papier, le format et l'ordre des pages sont identiques.",
        },
        {
          q: "Est-ce normal que l'enfant dépasse les contours en coloriant ?",
          a: "Oui. Le livre contient de grands dessins simples aux contours épais. À un an, l'enfant gribouille peut-être encore par-dessus l'image, et plus tard il colorie plus souvent à l'intérieur des contours. Il n'a pas besoin de colorier avec précision.",
        },
        {
          q: "Avec quoi vaut-il mieux colorier les images de ce livre ?",
          a: "Les crayons de couleur et les craies grasses sont le meilleur choix : ils ne traversent pas le papier. Les feutres donnent des couleurs plus vives, mais leur encre peut traverser la feuille.",
        },
        {
          q: "Combien de temps un enfant peut-il utiliser ce livre de coloriage ?",
          a: "Le livre contient 111 dessins, un par page. La durée dépend de l'enfant : certains colorient un dessin à la fois, d'autres plusieurs à la suite.",
        },
        {
          q: "Peut-on essayer le livre avant de l'acheter ?",
          a: "Oui. Dix vraies pages du livre peuvent être téléchargées gratuitement et imprimées à la maison. Aucune inscription ni adresse e-mail n'est nécessaire.",
        },
      ],
      pair: "Le même livre avec les mots en anglais sous les dessins :",
      pairCta: "Premiers mots en anglais",
      metaTitle:
        "Premiers mots en espagnol - Livre de coloriage pour enfants de 1 à 3 ans",
      metaDescription:
        "111 grands dessins aux contours épais, un par page, avec en dessous un mot en espagnol qui se colorie aussi. Pour les enfants de 1 à 3 ans.",
      altCover:
        "Couverture du livre de coloriage avec les mots en espagnol et un lion",
      /* Надпись на широкой полосе у испанской книги в две строки,
         как и у английской: так нарисовал художник. */
      altBannerLead:
        "111 images à colorier et 111 mots en espagnol, avec à côté la couverture du livre de coloriage avec le lion",
      altArt: [
        "Simple : une tortue au contour épais, un seul motif sur la page",
        "Grand : une vache qui remplit presque toute la feuille, coloriée par un jeune enfant",
        "Familier : une voiture rouge souriante, un des objets du quotidien du livre",
      ],
      altGift:
        "Le cadeau idéal pour les futurs artistes : un donut et des crayons de couleur",
    },
  },

  /* --------------------------- ГОЛЛАНДСКИЙ -------------------------- */
  /* Тексты сняты с общей русской основы владельца и выправлены его
     правками от 26 августа 2026 года.

     В Голландии у книжки, где под картинкой стоит слово, есть свое
     привычное название: beeldwoordenboek, картинный словарь. Оно
     обычное, по нему ищут, поэтому верхняя строка страницы звучит
     как Kleurboek en beeldwoordenboek. */
  nl: {
    en: {
      title: "Eerste woorden in het Engels",
      subtitle: "Kleurboek voor kinderen van 1 tot 3 jaar",
      head: {
        top: "Kleurboek en beeldwoordenboek voor kinderen van 1 tot 3 jaar",
        title: "Eerste woorden in het Engels",
        bottom:
          "111 grote tekeningen met dikke lijnen. Onder elke afbeelding een Engels woord.",
      },
      lead: [
        "Eenvoudige kleurplaten met duidelijke woorden in het Engels.",
        "Geen lange teksten, geen grammatica, geen taalbarrière. Het boek bevat alleen grote tekeningen met dikke lijnen, geschikt voor de allerkleinsten, met één goed leesbaar woord onder elke afbeelding.",
        "Geschikt voor een eerste kennismaking met de taal en voor kinderen die deze taal thuis elke dag horen. Uw kind kan vertrouwde afbeeldingen alleen of samen met de ouders inkleuren en daar op een leuke en interessante manier tijd mee doorbrengen.",
        /* Абзац про десять бесплатных страниц обязателен на каждой
           из восьми страниц. Решение владельца. */
        "Tien pagina's uit het boek kunt u gratis printen, nog voor de aankoop. Geen registratie, geen e-mailadres, niets in te vullen. En als uw kind het leuk vindt, kunt u het hele boek kopen en samen verder nieuwe woorden ontdekken, kleuren en van die momenten genieten.",
      ],
      forWhom:
        "Voor kinderen van 1 tot 3 jaar en iets ouder, zowel voor een eerste kennismaking met Engelse woorden als voor gezinnen waarin een kind twee talen hoort. Er hoeft hier niets speciaals geleerd te worden: het kind kleurt vertrouwde afbeeldingen in, bekijkt ze en maakt zo geleidelijk kennis met de woorden die onder de tekeningen staan. Ouders kunnen deze woorden hardop uitspreken, de afbeeldingen samen met het kind bekijken en inkleuren, zonder lessen, zonder regels en zonder moeilijke oefeningen.",
      inside: [
        "111 eenvoudige woorden in het Engels, één woord onder elke afbeelding",
        "Grote tekeningen met dikke lijnen, goed herkenbaar voor een kind",
        "Het woord onder de tekening is gedrukt in grote open letters, die ook ingekleurd kunnen worden",
        "Eén tekening op elke pagina",
        "De tekeningen staan midden op de pagina: handig voor rechts- en linkshandigen",
        "Vertrouwde thema's: dieren, eten, voertuigen, natuur, sprookjesfiguren en meer",
        "Voorin het boek een pagina voor de naam van het kind",
        "114 pagina's op groot formaat 21,6 × 27,9 cm",
      ],
      parents: [
        "Het kind maakt zijn tekening zelf af en bladert door naar de volgende",
        "De grote, eenvoudige afbeeldingen zijn ook voor een jong kind makkelijk in te kleuren",
        "Het boek is ideaal voor een lange reis, een wachtkamer of een regenachtige dag thuis",
        "Het boek is licht en gemakkelijk mee te nemen",
        "Kinderen bladeren erin, zelfs zonder potloden, en vragen hoe elk dier heet",
        "Het wordt gekocht voor het jongste kind in het gezin, wanneer de oudere kinderen al moeilijkere kleurboeken nodig hebben",
      ],
      rating: "5,0 van de 5 sterren op Amazon.",
      criticTitle: "Wat een onafhankelijke recensent over het boek schreef",
      critic: "5 van de 5 sterren, Readers' Favorite",
      criticBy: "Maalin Ogaja, oktober 2024",
      criticWhy:
        "Vooral genoemd worden de dikke, afgeronde lijnen, de tekening midden op de pagina en het woord onder de afbeelding, dat ook ingekleurd kan worden.",
      whyTitle:
        "Waarom dit boek geschikt is voor een eerste kennismaking met de taal",
      why: [
        "Kennismaken met een taal hoeft geen les te zijn. Het kind bekijkt vertrouwde afbeeldingen en kleurt ze in, en een volwassene kan gewoon benoemen wat erop staat.",
        "U hoeft de taal zelf niet goed te kennen. Onder elke afbeelding staat maar één eenvoudig woord. Het is makkelijk te lezen, hardop uit te spreken en samen met het kind te herhalen.",
        "De afbeelding helpt om het woord te begrijpen. Het kind ziet een vertrouwd voorwerp en tegelijk het woord dat eronder staat. Zo komt het Engelse woorden tegen in een context die voor het kind begrijpelijk is.",
        "Alleen of samen met de ouders: het kind kan de afbeeldingen gewoon inkleuren. Ouders kunnen ze ook samen met het kind bekijken, de voorwerpen benoemen en nieuwe woorden herhalen.",
        "Het boek is geschikt voor kinderen van 1 tot 3 jaar en iets ouder. In het begin kleurt het kind gewoon de grote afbeeldingen in en hoort het de namen van de voorwerpen. Later kan het de woorden nazeggen en proberen ook de open letters in te kleuren.",
      ],
      faq: [
        {
          q: "Is een kind van één jaar niet te jong voor een kleurboek?",
          a: "Nee. De tekeningen zijn bewust eenvoudig gemaakt en geschikt voor de allerkleinsten. Een kind van één krabbelt misschien nog over de afbeelding heen, terwijl een kind van drie al binnen de lijnen probeert te kleuren. Daardoor kan het boek in verschillende fasen tussen 1 en 3 jaar worden gebruikt.",
        },
        {
          q: "Mijn kind kent nog geen Engels. Wordt het boek dan niet te moeilijk?",
          a: "Nee. Het kind kleurt gewoon een vertrouwde afbeelding in en ziet het Engelse woord eronder staan. Er zijn hier geen oefeningen, geen regels en geen toetsen, en het kind hoeft niet te kunnen lezen.",
        },
        {
          q: "Moeten ouders zelf goed Engels kunnen?",
          a: "Nee. Onder elke tekening staat maar één eenvoudig Engels woord. Ouders kunnen het afgebeelde voorwerp benoemen, het woord hardop voorlezen of gewoon samen met het kind de afbeelding inkleuren.",
        },
        {
          q: "Welke Engelse woorden staan er in het boek?",
          a: "Het boek bevat 111 woorden over vertrouwde onderwerpen: dieren, eten, voertuigen, natuur, sprookjesfiguren en meer. Onder elke tekening staat één woord in het Engels.",
        },
        {
          q: "Staat er in het boek een fonetische weergave of hulp bij de uitspraak van de Engelse woorden?",
          a: "Nee. Onder elke afbeelding staat alleen het Engelse woord zelf, in grote open letters die ook ingekleurd kunnen worden. Het boek bevat geen fonetische weergave of uitspraakhulp. Bij twijfel over de uitspraak kunt u die beluisteren in een vertaalapp op uw telefoon.",
        },
        {
          q: "Wat is het verschil tussen de editie met Engelse en die met Spaanse woorden?",
          a: "Alleen de taal van het woord onder de tekening: in de ene editie staan de woorden in het Engels, in de andere in het Spaans. De tekeningen, het papier, het formaat en de volgorde van de pagina's zijn hetzelfde.",
        },
        {
          q: "Is het normaal als het kind bij het kleuren buiten de lijnen gaat?",
          a: "Ja. Het boek bevat grote, eenvoudige tekeningen met dikke lijnen. Op éénjarige leeftijd krabbelt een kind misschien nog over de afbeelding heen, later kleurt het vaker binnen de lijnen. Het hoeft niet precies binnen de lijnen te kleuren.",
        },
        {
          q: "Waarmee kunt u de afbeeldingen in dit boek het beste inkleuren?",
          a: "Kleurpotloden en waskrijt zijn de beste keuze: die drukken niet door het papier heen. Viltstiften geven fellere kleuren, maar de inkt kan doordrukken.",
        },
        {
          q: "Hoe lang kan een kind met dit kleurboek vooruit?",
          a: "Het boek bevat 111 tekeningen, één per pagina. Hoe lang het meegaat, hangt van het kind af: de een kleurt één tekening per keer, de ander meerdere achter elkaar.",
        },
        {
          q: "Kunt u het boek uitproberen voordat u het koopt?",
          a: "Ja. Tien echte pagina's uit het boek kunt u gratis downloaden en thuis printen. Registratie of een e-mailadres is niet nodig.",
        },
      ],
      pair: "Hetzelfde boek met Spaanse woorden onder de tekeningen:",
      pairCta: "Eerste woorden in het Spaans",
      metaTitle:
        "Eerste woorden in het Engels - Kleurboek voor kinderen van 1 tot 3 jaar",
      metaDescription:
        "111 grote tekeningen met dikke lijnen, één per pagina, met daaronder een Engels woord dat ook ingekleurd kan worden. Voor kinderen van 1 tot 3 jaar.",
      altCover: "Cover van het kleurboek met de Engelse woorden en een leeuw",
      altBannerLead:
        "111 kleurplaten en 111 woorden in het Engels, daarnaast de cover van het kleurboek met de leeuw",
      altArt: [
        "Eenvoudig: een schildpad met een dikke lijn, één motief op de pagina",
        "Groot: een koe die bijna de hele pagina vult, ingekleurd door een jong kind",
        "Vertrouwd: een lachende rode auto, een van de alledaagse dingen uit het boek",
      ],
      altGift:
        "Het ideale cadeau voor toekomstige kunstenaars: een donut en kleurpotloden",
    },
    es: {
      title: "Eerste woorden in het Spaans",
      subtitle: "Kleurboek voor kinderen van 1 tot 3 jaar",
      head: {
        top: "Kleurboek en beeldwoordenboek voor kinderen van 1 tot 3 jaar",
        title: "Eerste woorden in het Spaans",
        bottom:
          "111 grote tekeningen met dikke lijnen. Onder elke afbeelding een Spaans woord.",
      },
      lead: [
        "Eenvoudige kleurplaten met duidelijke woorden in het Spaans.",
        "Geen lange teksten, geen grammatica, geen taalbarrière. Het boek bevat alleen grote tekeningen met dikke lijnen, geschikt voor de allerkleinsten, met één goed leesbaar woord onder elke afbeelding.",
        "Geschikt voor een eerste kennismaking met de taal en voor kinderen die deze taal thuis elke dag horen. Uw kind kan vertrouwde afbeeldingen alleen of samen met de ouders inkleuren en daar op een leuke en interessante manier tijd mee doorbrengen.",
        "Tien pagina's uit het boek kunt u gratis printen, nog voor de aankoop. Geen registratie, geen e-mailadres, niets in te vullen. En als uw kind het leuk vindt, kunt u het hele boek kopen en samen verder nieuwe woorden ontdekken, kleuren en van die momenten genieten.",
      ],
      forWhom:
        "Voor kinderen van 1 tot 3 jaar en iets ouder, zowel voor een eerste kennismaking met Spaanse woorden als voor gezinnen waarin een kind twee talen hoort. Er hoeft hier niets speciaals geleerd te worden: het kind kleurt vertrouwde afbeeldingen in, bekijkt ze en maakt zo geleidelijk kennis met de woorden die onder de tekeningen staan. Ouders kunnen deze woorden hardop uitspreken, de afbeeldingen samen met het kind bekijken en inkleuren, zonder lessen, zonder regels en zonder moeilijke oefeningen.",
      inside: [
        "111 eenvoudige woorden in het Spaans, één woord onder elke afbeelding",
        "Grote tekeningen met dikke lijnen, goed herkenbaar voor een kind",
        "Het woord onder de tekening is gedrukt in grote open letters, die ook ingekleurd kunnen worden",
        "Eén tekening op elke pagina",
        "De tekeningen staan midden op de pagina: handig voor rechts- en linkshandigen",
        "Vertrouwde thema's: dieren, eten, voertuigen, natuur, sprookjesfiguren en meer",
        "Voorin het boek een pagina voor de naam van het kind",
        "114 pagina's op groot formaat 21,6 × 27,9 cm",
      ],
      parents: [
        "Het kind maakt zijn tekening zelf af en bladert door naar de volgende",
        "De grote, eenvoudige afbeeldingen zijn ook voor een jong kind makkelijk in te kleuren",
        "Het boek is ideaal voor een lange reis, een wachtkamer of een regenachtige dag thuis",
        "Het boek is licht en gemakkelijk mee te nemen",
        "Kinderen bladeren erin, zelfs zonder potloden, en vragen hoe elk dier heet",
        "Het wordt gekocht voor het jongste kind in het gezin, wanneer de oudere kinderen al moeilijkere kleurboeken nodig hebben",
      ],
      /* У испанского издания к оценке добавлена вторая фраза: рисунки
         в обеих книгах одни и те же. */
      rating:
        "4,9 van de 5 sterren op Amazon. De tekeningen zijn in beide edities dezelfde.",
      criticTitle: "Wat een onafhankelijke recensent over het boek schreef",
      critic: "5 van de 5 sterren, Readers' Favorite",
      criticBy: "Maalin Ogaja, oktober 2024",
      criticWhy:
        "Vooral genoemd worden de dikke, afgeronde lijnen, de tekening midden op de pagina en het woord onder de afbeelding, dat ook ingekleurd kan worden.",
      whyTitle:
        "Waarom dit boek geschikt is voor een eerste kennismaking met de taal",
      why: [
        "Kennismaken met een taal hoeft geen les te zijn. Het kind bekijkt vertrouwde afbeeldingen en kleurt ze in, en een volwassene kan gewoon benoemen wat erop staat.",
        "U hoeft de taal zelf niet goed te kennen. Onder elke afbeelding staat maar één eenvoudig woord. Het is makkelijk te lezen, hardop uit te spreken en samen met het kind te herhalen.",
        "De afbeelding helpt om het woord te begrijpen. Het kind ziet een vertrouwd voorwerp en tegelijk het woord dat eronder staat. Zo komt het Spaanse woorden tegen in een context die voor het kind begrijpelijk is.",
        "Alleen of samen met de ouders: het kind kan de afbeeldingen gewoon inkleuren. Ouders kunnen ze ook samen met het kind bekijken, de voorwerpen benoemen en nieuwe woorden herhalen.",
        "Het boek is geschikt voor kinderen van 1 tot 3 jaar en iets ouder. In het begin kleurt het kind gewoon de grote afbeeldingen in en hoort het de namen van de voorwerpen. Later kan het de woorden nazeggen en proberen ook de open letters in te kleuren.",
      ],
      faq: [
        {
          q: "Is een kind van één jaar niet te jong voor een kleurboek?",
          a: "Nee. De tekeningen zijn bewust eenvoudig gemaakt en geschikt voor de allerkleinsten. Een kind van één krabbelt misschien nog over de afbeelding heen, terwijl een kind van drie al binnen de lijnen probeert te kleuren. Daardoor kan het boek in verschillende fasen tussen 1 en 3 jaar worden gebruikt.",
        },
        {
          q: "Mijn kind kent nog geen Spaans. Wordt het boek dan niet te moeilijk?",
          a: "Nee. Het kind kleurt gewoon een vertrouwde afbeelding in en ziet het Spaanse woord eronder staan. Er zijn hier geen oefeningen, geen regels en geen toetsen, en het kind hoeft niet te kunnen lezen.",
        },
        {
          q: "Moeten ouders zelf goed Spaans kunnen?",
          a: "Nee. Onder elke tekening staat maar één eenvoudig Spaans woord. Ouders kunnen het afgebeelde voorwerp benoemen, het woord hardop voorlezen of gewoon samen met het kind de afbeelding inkleuren.",
        },
        {
          q: "Welke Spaanse woorden staan er in het boek?",
          a: "Het boek bevat 111 woorden over vertrouwde onderwerpen: dieren, eten, voertuigen, natuur, sprookjesfiguren en meer. Onder elke tekening staat één woord in het Spaans.",
        },
        {
          q: "Staat er in het boek een fonetische weergave of hulp bij de uitspraak van de Spaanse woorden?",
          a: "Nee. Onder elke afbeelding staat alleen het Spaanse woord zelf, in grote open letters die ook ingekleurd kunnen worden. Het boek bevat geen fonetische weergave of uitspraakhulp. Bij twijfel over de uitspraak kunt u die beluisteren in een vertaalapp op uw telefoon.",
        },
        {
          q: "Wat is het verschil tussen de editie met Engelse en die met Spaanse woorden?",
          a: "Alleen de taal van het woord onder de tekening: in de ene editie staan de woorden in het Engels, in de andere in het Spaans. De tekeningen, het papier, het formaat en de volgorde van de pagina's zijn hetzelfde.",
        },
        {
          q: "Is het normaal als het kind bij het kleuren buiten de lijnen gaat?",
          a: "Ja. Het boek bevat grote, eenvoudige tekeningen met dikke lijnen. Op éénjarige leeftijd krabbelt een kind misschien nog over de afbeelding heen, later kleurt het vaker binnen de lijnen. Het hoeft niet precies binnen de lijnen te kleuren.",
        },
        {
          q: "Waarmee kunt u de afbeeldingen in dit boek het beste inkleuren?",
          a: "Kleurpotloden en waskrijt zijn de beste keuze: die drukken niet door het papier heen. Viltstiften geven fellere kleuren, maar de inkt kan doordrukken.",
        },
        {
          q: "Hoe lang kan een kind met dit kleurboek vooruit?",
          a: "Het boek bevat 111 tekeningen, één per pagina. Hoe lang het meegaat, hangt van het kind af: de een kleurt één tekening per keer, de ander meerdere achter elkaar.",
        },
        {
          q: "Kunt u het boek uitproberen voordat u het koopt?",
          a: "Ja. Tien echte pagina's uit het boek kunt u gratis downloaden en thuis printen. Registratie of een e-mailadres is niet nodig.",
        },
      ],
      pair: "Hetzelfde boek met Engelse woorden onder de tekeningen:",
      pairCta: "Eerste woorden in het Engels",
      metaTitle:
        "Eerste woorden in het Spaans - Kleurboek voor kinderen van 1 tot 3 jaar",
      metaDescription:
        "111 grote tekeningen met dikke lijnen, één per pagina, met daaronder een Spaans woord dat ook ingekleurd kan worden. Voor kinderen van 1 tot 3 jaar.",
      altCover: "Cover van het kleurboek met de Spaanse woorden en een leeuw",
      altBannerLead:
        "111 kleurplaten en 111 woorden in het Spaans, daarnaast de cover van het kleurboek met de leeuw",
      altArt: [
        "Eenvoudig: een schildpad met een dikke lijn, één motief op de pagina",
        "Groot: een koe die bijna de hele pagina vult, ingekleurd door een jong kind",
        "Vertrouwd: een lachende rode auto, een van de alledaagse dingen uit het boek",
      ],
      altGift:
        "Het ideale cadeau voor toekomstige kunstenaars: een donut en kleurpotloden",
    },
  },

  /* ---------------------------- ПОЛЬСКИЙ ---------------------------- */
  /* Тексты сняты с общей русской основы владельца и выправлены его
     правками от 26 августа 2026 года.

     В Польше у книжки, где под картинкой стоит слово, есть свое
     привычное название: słownik obrazkowy, картинный словарь.
     Поэтому верхняя строка звучит как Kolorowanka i słownik obrazkowy. */
  pl: {
    en: {
      title: "Pierwsze słowa po angielsku",
      subtitle: "Kolorowanka dla dzieci od 1 do 3 lat",
      head: {
        top: "Kolorowanka i słownik obrazkowy dla dzieci w wieku od 1 do 3 lat",
        title: "Pierwsze słowa po angielsku",
        bottom:
          "111 dużych rysunków z grubym konturem. Pod każdym obrazkiem angielskie słowo.",
      },
      lead: [
        "Proste obrazki do kolorowania z wyraźnymi słowami po angielsku.",
        "Bez długich tekstów, bez gramatyki, bez bariery językowej. W książce są tylko duże rysunki z grubym konturem, odpowiednie dla najmłodszych, i jedno wyraźne słowo pod każdym obrazkiem.",
        "Nadaje się zarówno na pierwsze zetknięcie z językiem, jak i dla dzieci, które słyszą go codziennie w domu. Dziecko może kolorować znajome obrazki samo albo razem z rodzicami i spędzać ten czas wesoło i ciekawie.",
        /* Абзац про десять бесплатных страниц обязателен на каждой
           из восьми страниц. Решение владельца. */
        "Dziesięć stron z książki można wydrukować za darmo, jeszcze przed zakupem. Bez rejestracji, bez adresu e-mail, nie trzeba niczego wypełniać. A jeśli dziecku się spodoba, można kupić całą książkę i dalej wspólnie poznawać nowe słowa, kolorować i cieszyć się wspólnie spędzonym czasem.",
      ],
      forWhom:
        "Dla dzieci w wieku od 1 do 3 lat i trochę starszych, zarówno na pierwsze zetknięcie z angielskimi słowami, jak i dla rodzin, w których dziecko słyszy dwa języki. Nie trzeba się tu niczego specjalnie uczyć: dziecko koloruje znajome obrazki, ogląda je i stopniowo poznaje słowa napisane pod rysunkami. Rodzice mogą wymawiać te słowa na głos oraz razem z dzieckiem oglądać i kolorować obrazki, bez lekcji, bez reguł i bez trudnych zadań.",
      inside: [
        "111 prostych słów po angielsku, jedno słowo pod każdym obrazkiem",
        "Duże, czytelne dla dziecka rysunki z grubym konturem",
        "Słowo pod rysunkiem jest wydrukowane dużymi konturowymi literami, które też można pokolorować",
        "Jeden rysunek na stronie, druga strona pozostaje pusta",
        "Rysunki są umieszczone na środku strony: wygodne zarówno dla praworęcznych, jak i leworęcznych",
        "Znajome tematy: zwierzęta, jedzenie, pojazdy, przyroda, postacie z bajek i inne",
        "Na początku książki strona na imię dziecka",
        "114 stron w dużym formacie 21,6 × 27,9 cm",
      ],
      parents: [
        "Dziecko samo kończy swój rysunek i przewraca stronę, żeby przejść do następnego",
        "Duże, proste obrazki łatwo pokoloruje nawet małe dziecko",
        "Książka jest idealna na długą podróż, do poczekalni albo na deszczowy dzień w domu",
        "Książka jest lekka i łatwo ją zabrać ze sobą",
        "Dzieci przeglądają ją nawet bez kredek i pytają, jak nazywa się każde zwierzę",
        "Kupuje się ją dla najmłodszego dziecka w rodzinie, kiedy starsze potrzebują już trudniejszych kolorowanek",
      ],
      rating: "Ocena 5,0 na 5 w serwisie Amazon.",
      criticTitle: "Co niezależna recenzentka napisała o książce",
      critic: "5 na 5 gwiazdek, Readers' Favorite",
      criticBy: "Maalin Ogaja, październik 2024",
      criticWhy:
        "Szczególnie wyróżniono: gruby, zaokrąglony kontur, rysunek umieszczony na środku strony oraz słowo pod obrazkiem, które też można pokolorować.",
      whyTitle: "Dlaczego ta książka nadaje się na pierwsze zetknięcie z językiem",
      why: [
        "Zetknięcie z językiem nie musi być lekcją. Dziecko ogląda znajome obrazki i koloruje je, a dorosły może po prostu nazywać to, co jest na nich narysowane.",
        "Nie trzeba samemu dobrze znać języka. Pod każdym obrazkiem jest tylko jedno proste słowo. Łatwo je przeczytać, wymówić na głos i powtórzyć razem z dzieckiem.",
        "Obrazek pomaga zrozumieć słowo. Dziecko widzi znajomy przedmiot i jednocześnie słowo napisane pod nim. Tak spotyka angielskie słowa w zrozumiałym dla siebie kontekście.",
        "Samo albo razem z rodzicami: dziecko może po prostu kolorować obrazki. Rodzice mogą też oglądać je razem z dzieckiem, nazywać przedmioty i powtarzać nowe słowa.",
        "Książka nadaje się dla dzieci od 1 do 3 lat i trochę starszych. Na początku dziecko po prostu koloruje duże obrazki i słyszy nazwy przedmiotów. Później może powtarzać słowa i próbować kolorować także konturowe litery.",
      ],
      faq: [
        {
          q: "Czy roczne dziecko nie jest za małe na kolorowankę?",
          a: "Nie. Rysunki są celowo proste i dostosowane do najmłodszych. Roczne dziecko być może jeszcze bazgrze po obrazku, a trzyletnie stara się już kolorować wewnątrz konturu. Dzięki temu z książki można korzystać na różnych etapach między 1. a 3. rokiem życia.",
        },
        {
          q: "Moje dziecko nie zna jeszcze angielskiego. Czy książka nie będzie za trudna?",
          a: "Nie. Dziecko po prostu koloruje znajomy obrazek i widzi pod nim angielskie słowo. Nie ma tu zadań, reguł ani testów, a dziecko nie musi umieć czytać.",
        },
        {
          q: "Czy rodzice sami muszą dobrze znać angielski?",
          a: "Nie. Pod każdym rysunkiem jest tylko jedno proste angielskie słowo. Rodzice mogą nazwać przedstawiony przedmiot, przeczytać słowo na głos albo po prostu kolorować obrazek razem z dzieckiem.",
        },
        {
          q: "Jakie angielskie słowa są w książce?",
          a: "Książka zawiera 111 słów związanych z tematami znanymi dziecku: zwierzęta, jedzenie, pojazdy, przyroda, postacie z bajek i inne. Pod każdym rysunkiem znajduje się jedno słowo po angielsku.",
        },
        {
          q: "Czy w książce jest transkrypcja albo wskazówki dotyczące wymowy angielskich słów?",
          a: "Nie. Pod każdym obrazkiem znajduje się wyłącznie samo angielskie słowo, wydrukowane dużymi konturowymi literami, które też można pokolorować. Książka nie zawiera transkrypcji ani wskazówek dotyczących wymowy. W razie wątpliwości można posłuchać wymowy w aplikacji do tłumaczenia na telefonie.",
        },
        {
          q: "Czym różnią się wydania ze słowami angielskimi i hiszpańskimi?",
          a: "Tylko językiem słowa pod rysunkiem: w jednym wydaniu słowa są po angielsku, w drugim po hiszpańsku. Rysunki, papier, format i kolejność stron są takie same.",
        },
        {
          q: "Czy to normalne, że dziecko koloruje poza konturem?",
          a: "Tak. W książce są duże, proste rysunki z grubym konturem. Roczne dziecko być może jeszcze bazgrze po obrazku, a później częściej koloruje wewnątrz konturu. Nie musi dokładnie trzymać się konturu.",
        },
        {
          q: "Czym najlepiej kolorować obrazki w tej książce?",
          a: "Nadają się kredki ołówkowe, kredki świecowe i flamastry. Jeśli flamaster przebija przez papier, pod stronę można podłożyć dodatkową kartkę. Odwrotna strona każdego rysunku pozostaje pusta.",
        },
        {
          q: "Na jak długo dziecku wystarczy ta kolorowanka?",
          a: "Książka zawiera 111 rysunków, po jednym na stronie. Na jak długo wystarczy, zależy od dziecka: jedno koloruje jeden rysunek naraz, inne kilka z rzędu.",
        },
        {
          q: "Czy można wypróbować książkę przed zakupem?",
          a: "Tak. Dziesięć prawdziwych stron z książki można pobrać za darmo i wydrukować w domu. Nie trzeba się rejestrować ani podawać adresu e-mail.",
        },
      ],
      pair: "Ta sama książka z hiszpańskimi słowami pod rysunkami:",
      pairCta: "Pierwsze słowa po hiszpańsku",
      metaTitle:
        "Pierwsze słowa po angielsku - Kolorowanka dla dzieci od 1 do 3 lat",
      metaDescription:
        "111 dużych rysunków z grubym konturem, po jednym na stronie, z angielskim słowem pod spodem, które też można pokolorować. Dla dzieci od 1 do 3 lat.",
      altCover: "Okładka kolorowanki z angielskimi słowami i lwem",
      altBannerLead:
        "111 obrazków do kolorowania i 111 słów po angielsku, obok okładka kolorowanki z lwem",
      altArt: [
        "Prosto: żółw z grubym konturem, jeden motyw na stronie",
        "Duże: krowa zajmująca niemal całą kartkę, pokolorowana przez małe dziecko",
        "Znajomo: uśmiechnięty czerwony samochód, jeden z codziennych przedmiotów w książce",
      ],
      altGift: "Idealny prezent dla przyszłych artystów: pączek i kredki",
    },
    es: {
      title: "Pierwsze słowa po hiszpańsku",
      subtitle: "Kolorowanka dla dzieci od 1 do 3 lat",
      head: {
        top: "Kolorowanka i słownik obrazkowy dla dzieci w wieku od 1 do 3 lat",
        title: "Pierwsze słowa po hiszpańsku",
        bottom:
          "111 dużych rysunków z grubym konturem. Pod każdym obrazkiem hiszpańskie słowo.",
      },
      lead: [
        "Proste obrazki do kolorowania z wyraźnymi słowami po hiszpańsku.",
        "Bez długich tekstów, bez gramatyki, bez bariery językowej. W książce są tylko duże rysunki z grubym konturem, odpowiednie dla najmłodszych, i jedno wyraźne słowo pod każdym obrazkiem.",
        "Nadaje się zarówno na pierwsze zetknięcie z językiem, jak i dla dzieci, które słyszą go codziennie w domu. Dziecko może kolorować znajome obrazki samo albo razem z rodzicami i spędzać ten czas wesoło i ciekawie.",
        "Dziesięć stron z książki można wydrukować za darmo, jeszcze przed zakupem. Bez rejestracji, bez adresu e-mail, nie trzeba niczego wypełniać. A jeśli dziecku się spodoba, można kupić całą książkę i dalej wspólnie poznawać nowe słowa, kolorować i cieszyć się wspólnie spędzonym czasem.",
      ],
      forWhom:
        "Dla dzieci w wieku od 1 do 3 lat i trochę starszych, zarówno na pierwsze zetknięcie z hiszpańskimi słowami, jak i dla rodzin, w których dziecko słyszy dwa języki. Nie trzeba się tu niczego specjalnie uczyć: dziecko koloruje znajome obrazki, ogląda je i stopniowo poznaje słowa napisane pod rysunkami. Rodzice mogą wymawiać te słowa na głos oraz razem z dzieckiem oglądać i kolorować obrazki, bez lekcji, bez reguł i bez trudnych zadań.",
      inside: [
        "111 prostych słów po hiszpańsku, jedno słowo pod każdym obrazkiem",
        "Duże, czytelne dla dziecka rysunki z grubym konturem",
        "Słowo pod rysunkiem jest wydrukowane dużymi konturowymi literami, które też można pokolorować",
        "Jeden rysunek na stronie, druga strona pozostaje pusta",
        "Rysunki są umieszczone na środku strony: wygodne zarówno dla praworęcznych, jak i leworęcznych",
        "Znajome tematy: zwierzęta, jedzenie, pojazdy, przyroda, postacie z bajek i inne",
        "Na początku książki strona na imię dziecka",
        "114 stron w dużym formacie 21,6 × 27,9 cm",
      ],
      parents: [
        "Dziecko samo kończy swój rysunek i przewraca stronę, żeby przejść do następnego",
        "Duże, proste obrazki łatwo pokoloruje nawet małe dziecko",
        "Książka jest idealna na długą podróż, do poczekalni albo na deszczowy dzień w domu",
        "Książka jest lekka i łatwo ją zabrać ze sobą",
        "Dzieci przeglądają ją nawet bez kredek i pytają, jak nazywa się każde zwierzę",
        "Kupuje się ją dla najmłodszego dziecka w rodzinie, kiedy starsze potrzebują już trudniejszych kolorowanek",
      ],
      /* У испанского издания к оценке добавлена вторая фраза: рисунки
         в обеих книгах одни и те же. */
      rating:
        "Ocena 4,9 na 5 w serwisie Amazon. Rysunki w obu wydaniach są takie same.",
      criticTitle: "Co niezależna recenzentka napisała o książce",
      critic: "5 na 5 gwiazdek, Readers' Favorite",
      criticBy: "Maalin Ogaja, październik 2024",
      criticWhy:
        "Szczególnie wyróżniono: gruby, zaokrąglony kontur, rysunek umieszczony na środku strony oraz słowo pod obrazkiem, które też można pokolorować.",
      whyTitle: "Dlaczego ta książka nadaje się na pierwsze zetknięcie z językiem",
      why: [
        "Zetknięcie z językiem nie musi być lekcją. Dziecko ogląda znajome obrazki i koloruje je, a dorosły może po prostu nazywać to, co jest na nich narysowane.",
        "Nie trzeba samemu dobrze znać języka. Pod każdym obrazkiem jest tylko jedno proste słowo. Łatwo je przeczytać, wymówić na głos i powtórzyć razem z dzieckiem.",
        "Obrazek pomaga zrozumieć słowo. Dziecko widzi znajomy przedmiot i jednocześnie słowo napisane pod nim. Tak spotyka hiszpańskie słowa w zrozumiałym dla siebie kontekście.",
        "Samo albo razem z rodzicami: dziecko może po prostu kolorować obrazki. Rodzice mogą też oglądać je razem z dzieckiem, nazywać przedmioty i powtarzać nowe słowa.",
        "Książka nadaje się dla dzieci od 1 do 3 lat i trochę starszych. Na początku dziecko po prostu koloruje duże obrazki i słyszy nazwy przedmiotów. Później może powtarzać słowa i próbować kolorować także konturowe litery.",
      ],
      faq: [
        {
          q: "Czy roczne dziecko nie jest za małe na kolorowankę?",
          a: "Nie. Rysunki są celowo proste i dostosowane do najmłodszych. Roczne dziecko być może jeszcze bazgrze po obrazku, a trzyletnie stara się już kolorować wewnątrz konturu. Dzięki temu z książki można korzystać na różnych etapach między 1. a 3. rokiem życia.",
        },
        {
          q: "Moje dziecko nie zna jeszcze hiszpańskiego. Czy książka nie będzie za trudna?",
          a: "Nie. Dziecko po prostu koloruje znajomy obrazek i widzi pod nim hiszpańskie słowo. Nie ma tu zadań, reguł ani testów, a dziecko nie musi umieć czytać.",
        },
        {
          q: "Czy rodzice sami muszą dobrze znać hiszpański?",
          a: "Nie. Pod każdym rysunkiem jest tylko jedno proste hiszpańskie słowo. Rodzice mogą nazwać przedstawiony przedmiot, przeczytać słowo na głos albo po prostu kolorować obrazek razem z dzieckiem.",
        },
        {
          q: "Jakie hiszpańskie słowa są w książce?",
          a: "Książka zawiera 111 słów związanych z tematami znanymi dziecku: zwierzęta, jedzenie, pojazdy, przyroda, postacie z bajek i inne. Pod każdym rysunkiem znajduje się jedno słowo po hiszpańsku.",
        },
        {
          q: "Czy w książce jest transkrypcja albo wskazówki dotyczące wymowy hiszpańskich słów?",
          a: "Nie. Pod każdym obrazkiem znajduje się wyłącznie samo hiszpańskie słowo, wydrukowane dużymi konturowymi literami, które też można pokolorować. Książka nie zawiera transkrypcji ani wskazówek dotyczących wymowy. W razie wątpliwości można posłuchać wymowy w aplikacji do tłumaczenia na telefonie.",
        },
        {
          q: "Czym różnią się wydania ze słowami angielskimi i hiszpańskimi?",
          a: "Tylko językiem słowa pod rysunkiem: w jednym wydaniu słowa są po angielsku, w drugim po hiszpańsku. Rysunki, papier, format i kolejność stron są takie same.",
        },
        {
          q: "Czy to normalne, że dziecko koloruje poza konturem?",
          a: "Tak. W książce są duże, proste rysunki z grubym konturem. Roczne dziecko być może jeszcze bazgrze po obrazku, a później częściej koloruje wewnątrz konturu. Nie musi dokładnie trzymać się konturu.",
        },
        {
          q: "Czym najlepiej kolorować obrazki w tej książce?",
          a: "Nadają się kredki ołówkowe, kredki świecowe i flamastry. Jeśli flamaster przebija przez papier, pod stronę można podłożyć dodatkową kartkę. Odwrotna strona każdego rysunku pozostaje pusta.",
        },
        {
          q: "Na jak długo dziecku wystarczy ta kolorowanka?",
          a: "Książka zawiera 111 rysunków, po jednym na stronie. Na jak długo wystarczy, zależy od dziecka: jedno koloruje jeden rysunek naraz, inne kilka z rzędu.",
        },
        {
          q: "Czy można wypróbować książkę przed zakupem?",
          a: "Tak. Dziesięć prawdziwych stron z książki można pobrać za darmo i wydrukować w domu. Nie trzeba się rejestrować ani podawać adresu e-mail.",
        },
      ],
      pair: "Ta sama książka z angielskimi słowami pod rysunkami:",
      pairCta: "Pierwsze słowa po angielsku",
      metaTitle:
        "Pierwsze słowa po hiszpańsku - Kolorowanka dla dzieci od 1 do 3 lat",
      metaDescription:
        "111 dużych rysunków z grubym konturem, po jednym na stronie, z hiszpańskim słowem pod spodem, które też można pokolorować. Dla dzieci od 1 do 3 lat.",
      altCover: "Okładka kolorowanki z hiszpańskimi słowami i lwem",
      altBannerLead:
        "111 obrazków do kolorowania i 111 słów po hiszpańsku, obok okładka kolorowanki z lwem",
      altArt: [
        "Prosto: żółw z grubym konturem, jeden motyw na stronie",
        "Duże: krowa zajmująca niemal całą kartkę, pokolorowana przez małe dziecko",
        "Znajomo: uśmiechnięty czerwony samochód, jeden z codziennych przedmiotów w książce",
      ],
      altGift: "Idealny prezent dla przyszłych artystów: pączek i kredki",
    },
  },

  /* ==================================================================
     Италия

     Текст утвержден: смысл владельцем по-русски, итальянские слова
     сторонним проверяющим. Цена и оценки сверены с карточками
     amazon.it 27 августа 2026 года: обе книги 5,99 евро, книга
     с английскими словами 5,0 из 5, с испанскими 4,9 из 5.

     Своих картинок с итальянскими надписями у страны пока нет,
     поэтому берутся общие из euroArt, с английскими и испанскими
     надписями. Так же начинали Германия и Франция.
     ================================================================== */
  it: {
    en: {
      title: "Prime parole in inglese",
      subtitle: "Libro da colorare per bambini da 1 a 3 anni",
      head: {
        top: "Libro da colorare e dizionario illustrato per bambini da 1 a 3 anni",
        title: "Prime parole in inglese",
        bottom:
          "111 grandi disegni con contorni spessi. Sotto ogni immagine una parola in inglese.",
      },
      lead: [
        "Immagini semplici da colorare con parole chiare in inglese.",
        "Niente testi lunghi, niente grammatica, nessuna barriera linguistica. Nel libro ci sono solo grandi disegni, contorni spessi pensati per i più piccoli e una sola parola ben leggibile sotto ogni immagine.",
        "È adatto sia a un primo approccio alla lingua sia ai bambini che la sentono a casa ogni giorno. Il bambino può colorare immagini familiari da solo o insieme ai genitori, trascorrendo il tempo in modo piacevole e divertente.",
        "Dieci pagine del libro si possono stampare gratuitamente, prima dell'acquisto. Nessuna registrazione, nessun indirizzo e-mail, niente da compilare. E se al bambino piace, potrete acquistare il libro completo e continuare insieme a scoprire nuove parole, colorare e divertirvi.",
      ],
      forWhom:
        "Per bambini da 1 a 3 anni e anche un po' più grandi, sia per un primo approccio alle parole inglesi sia per le famiglie in cui il bambino sente due lingue. Non c'è nulla da studiare appositamente: il bambino colora immagini familiari, le osserva e scopre gradualmente le parole scritte sotto i disegni. I genitori possono pronunciare queste parole ad alta voce e guardare e colorare le immagini insieme al bambino, senza lezioni, regole o compiti difficili.",
      inside: [
        "111 parole semplici in inglese, una parola sotto ogni immagine",
        "Disegni grandi e facili da riconoscere per i bambini, con contorni spessi",
        "La parola sotto il disegno è stampata in grandi lettere a contorno, anch'esse da colorare",
        "Un disegno su ogni pagina",
        "I disegni sono centrati sulla pagina, una disposizione comoda sia per destrimani sia per mancini",
        "Temi familiari ai bambini: animali, cibo, mezzi di trasporto, natura, personaggi delle fiabe e altro ancora",
        "All'inizio del libro c'è una pagina personalizzabile con il nome del bambino",
        "114 pagine, grande formato 21,6 × 27,9 cm",
      ],
      parents: [
        "Il bambino finisce da solo di colorare un'immagine e passa alla successiva",
        "Le immagini grandi e semplici sono facili da colorare anche per i bambini più piccoli",
        "Il libro è comodo da portare in viaggio, in sala d'attesa dal medico o da tenere a casa per una giornata di pioggia",
        "Il libro è leggero e comodo da portare con sé",
        "I bambini lo sfogliano anche senza matite e chiedono come si chiama ogni animale",
        "Viene acquistato per il più piccolo della famiglia, quando i bambini più grandi hanno già bisogno di libri da colorare più complessi",
      ],
      rating: "Valutazione 5,0 su 5 su Amazon.",
      criticTitle: "Che cosa ha detto del libro una recensora indipendente",
      critic: "5 stelle su 5, Readers' Favorite",
      criticWhy:
        "Sono stati evidenziati in particolare i contorni spessi e arrotondati, la posizione del disegno al centro della pagina e la parola sotto l'immagine, anch'essa da colorare.",
      criticBy: "Maalin Ogaja, ottobre 2024",
      whyTitle: "Perché questo libro è adatto a un primo approccio alla lingua",
      why: [
        "Non serve trasformare il primo approccio alla lingua in una lezione. Il bambino osserva immagini familiari e le colora, mentre un adulto può semplicemente nominare gli oggetti raffigurati.",
        "Non serve conoscere bene la lingua. Sotto ogni immagine c'è una sola parola semplice. È facile leggerla, pronunciarla ad alta voce per il bambino e ripeterla insieme.",
        "L'immagine aiuta a capire il significato della parola. Il bambino vede un oggetto familiare e, allo stesso tempo, la parola scritta sotto. In questo modo incontra le parole inglesi in un contesto facile da comprendere.",
        "Si può usare il libro da soli o insieme. Il bambino può semplicemente colorare le immagini, mentre i genitori possono guardarle insieme a lui, nominare gli oggetti e ripetere le nuove parole.",
        "Il libro è adatto alle diverse fasi dai 1 ai 3 anni e anche un po' oltre. All'inizio il bambino colora semplicemente i grandi disegni e ascolta i nomi degli oggetti. Più avanti può ripetere le parole e provare a colorare anche le lettere a contorno.",
      ],
      faq: [
        {
          q: "Non è troppo presto dare un libro da colorare a un bambino di un anno?",
          a: "No. I disegni sono volutamente semplici e pensati per i più piccoli. A un anno il bambino può limitarsi a scarabocchiare sull'immagine, mentre a tre anni cerca già di colorare dentro i contorni. Per questo il libro può essere utilizzato nelle diverse fasi dai 1 ai 3 anni.",
        },
        {
          q: "Se il bambino non conosce ancora l'inglese, gli sarà difficile usare il libro?",
          a: "No. Il bambino colora semplicemente un'immagine familiare e vede la parola inglese scritta sotto. Non ci sono esercizi, regole o test e il bambino non deve saper leggere.",
        },
        {
          q: "I genitori devono conoscere bene l'inglese?",
          a: "No. Sotto ogni disegno è stampata una sola parola semplice in inglese. Il genitore può nominare l'oggetto raffigurato, leggere la parola ad alta voce oppure semplicemente colorare l'immagine insieme al bambino.",
        },
        {
          q: "Quali parole inglesi ci sono nel libro?",
          a: "Il libro contiene 111 parole su temi familiari ai bambini: animali, cibo, mezzi di trasporto, natura, personaggi delle fiabe e altro ancora. Sotto ogni disegno è stampata una parola in inglese.",
        },
        {
          q: "Nel libro ci sono la trascrizione fonetica o indicazioni sulla pronuncia delle parole inglesi?",
          a: "No. Sotto ogni immagine è stampata soltanto la parola inglese, in grandi lettere a contorno che si possono colorare. Il libro non contiene trascrizioni né indicazioni sulla pronuncia. Se non si conosce la pronuncia, la si può ascoltare con un traduttore sul telefono.",
        },
        {
          q: "Qual è la differenza tra l'edizione con le parole inglesi e quella con le parole spagnole?",
          a: "Solo la lingua della parola sotto il disegno: in un'edizione le parole sono in inglese, nell'altra in spagnolo. I disegni, la carta, il formato e l'ordine delle pagine sono identici.",
        },
        {
          q: "È normale se il bambino esce dai contorni mentre colora?",
          a: "Sì. Il libro contiene disegni grandi e semplici con contorni spessi. A un anno il bambino può limitarsi a scarabocchiare sull'immagine, mentre più avanti comincia più spesso a colorare dentro i contorni. Non è necessario colorare il disegno con precisione.",
        },
        {
          q: "Con che cosa è meglio colorare le immagini di questo libro?",
          a: "Matite colorate e pastelli a cera sono la scelta migliore: non trapassano la carta. I pennarelli danno colori più vivaci, ma il loro inchiostro può passare dall'altra parte.",
        },
        {
          q: "Per quanto tempo il bambino potrà usare questo libro da colorare?",
          a: "Il libro contiene 111 disegni, uno per pagina. Quanto a lungo verrà utilizzato dipende dal bambino: c'è chi colora un disegno alla volta e chi ne colora diversi di seguito.",
        },
        {
          q: "Si può provare il libro prima di acquistarlo?",
          a: "Sì. Si possono scaricare gratuitamente e stampare 10 pagine tratte direttamente dal libro. Non servono registrazione né indirizzo e-mail.",
        },
      ],
      pair: "Lo stesso libro con le parole in spagnolo sotto i disegni:",
      pairCta: "Prime parole in spagnolo",
      metaTitle: "Prime parole in inglese - Libro da colorare per bambini da 1 a 3 anni",
      metaDescription:
        "111 grandi disegni con contorni spessi, uno per pagina, con una parola in inglese sotto il disegno, anch'essa da colorare. Per bambini da 1 a 3 anni.",
      altCover: "Copertina del libro da colorare con parole in inglese e un leone",
      altBannerLead:
        "111 immagini da colorare e 111 parole in inglese, accanto alla copertina del libro da colorare con il leone",
      altArt: [
        "Pagina colorata del libro: un leone con sotto la parola inglese Lion",
        "Pagina colorata del libro: una volpe con sotto la parola inglese Fox",
        "Pagina colorata del libro: una mucca con sotto la parola inglese Cow",
      ],
      altGift: "Il regalo perfetto per i futuri artisti: una ciambella e matite colorate",
    },
    es: {
      title: "Prime parole in spagnolo",
      subtitle: "Libro da colorare per bambini da 1 a 3 anni",
      head: {
        top: "Libro da colorare e dizionario illustrato per bambini da 1 a 3 anni",
        title: "Prime parole in spagnolo",
        bottom:
          "111 grandi disegni con contorni spessi. Sotto ogni immagine una parola in spagnolo.",
      },
      lead: [
        "Immagini semplici da colorare con parole chiare in spagnolo.",
        "Niente testi lunghi, niente grammatica, nessuna barriera linguistica. Nel libro ci sono solo grandi disegni, contorni spessi pensati per i più piccoli e una sola parola ben leggibile sotto ogni immagine.",
        "È adatto sia a un primo approccio alla lingua sia ai bambini che la sentono a casa ogni giorno. Il bambino può colorare immagini familiari da solo o insieme ai genitori, trascorrendo il tempo in modo piacevole e divertente.",
        "Dieci pagine del libro si possono stampare gratuitamente, prima dell'acquisto. Nessuna registrazione, nessun indirizzo e-mail, niente da compilare. E se al bambino piace, potrete acquistare il libro completo e continuare insieme a scoprire nuove parole, colorare e divertirvi.",
      ],
      forWhom:
        "Per bambini da 1 a 3 anni e anche un po' più grandi, sia per un primo approccio alle parole spagnole sia per le famiglie in cui il bambino sente due lingue. Non c'è nulla da studiare appositamente: il bambino colora immagini familiari, le osserva e scopre gradualmente le parole scritte sotto i disegni. I genitori possono pronunciare queste parole ad alta voce e guardare e colorare le immagini insieme al bambino, senza lezioni, regole o compiti difficili.",
      inside: [
        "111 parole semplici in spagnolo, una parola sotto ogni immagine",
        "Disegni grandi e facili da riconoscere per i bambini, con contorni spessi",
        "La parola sotto il disegno è stampata in grandi lettere a contorno, anch'esse da colorare",
        "Un disegno su ogni pagina",
        "I disegni sono centrati sulla pagina, una disposizione comoda sia per destrimani sia per mancini",
        "Temi familiari ai bambini: animali, cibo, mezzi di trasporto, natura, personaggi delle fiabe e altro ancora",
        "All'inizio del libro c'è una pagina personalizzabile con il nome del bambino",
        "114 pagine, grande formato 21,6 × 27,9 cm",
      ],
      parents: [
        "Il bambino finisce da solo di colorare un'immagine e passa alla successiva",
        "Le immagini grandi e semplici sono facili da colorare anche per i bambini più piccoli",
        "Il libro è comodo da portare in viaggio, in sala d'attesa dal medico o da tenere a casa per una giornata di pioggia",
        "Il libro è leggero e comodo da portare con sé",
        "I bambini lo sfogliano anche senza matite e chiedono come si chiama ogni animale",
        "Viene acquistato per il più piccolo della famiglia, quando i bambini più grandi hanno già bisogno di libri da colorare più complessi",
      ],
      rating: "Valutazione 4,9 su 5 su Amazon. I disegni sono identici in entrambe le edizioni.",
      criticTitle: "Che cosa ha detto del libro una recensora indipendente",
      critic: "5 stelle su 5, Readers' Favorite",
      criticWhy:
        "Sono stati evidenziati in particolare i contorni spessi e arrotondati, la posizione del disegno al centro della pagina e la parola sotto l'immagine, anch'essa da colorare.",
      criticBy: "Maalin Ogaja, ottobre 2024",
      whyTitle: "Perché questo libro è adatto a un primo approccio alla lingua",
      why: [
        "Non serve trasformare il primo approccio alla lingua in una lezione. Il bambino osserva immagini familiari e le colora, mentre un adulto può semplicemente nominare gli oggetti raffigurati.",
        "Non serve conoscere bene la lingua. Sotto ogni immagine c'è una sola parola semplice. È facile leggerla, pronunciarla ad alta voce per il bambino e ripeterla insieme.",
        "L'immagine aiuta a capire il significato della parola. Il bambino vede un oggetto familiare e, allo stesso tempo, la parola scritta sotto. In questo modo incontra le parole spagnole in un contesto facile da comprendere.",
        "Si può usare il libro da soli o insieme. Il bambino può semplicemente colorare le immagini, mentre i genitori possono guardarle insieme a lui, nominare gli oggetti e ripetere le nuove parole.",
        "Il libro è adatto alle diverse fasi dai 1 ai 3 anni e anche un po' oltre. All'inizio il bambino colora semplicemente i grandi disegni e ascolta i nomi degli oggetti. Più avanti può ripetere le parole e provare a colorare anche le lettere a contorno.",
      ],
      faq: [
        {
          q: "Non è troppo presto dare un libro da colorare a un bambino di un anno?",
          a: "No. I disegni sono volutamente semplici e pensati per i più piccoli. A un anno il bambino può limitarsi a scarabocchiare sull'immagine, mentre a tre anni cerca già di colorare dentro i contorni. Per questo il libro può essere utilizzato nelle diverse fasi dai 1 ai 3 anni.",
        },
        {
          q: "Se il bambino non conosce ancora l'spagnolo, gli sarà difficile usare il libro?",
          a: "No. Il bambino colora semplicemente un'immagine familiare e vede la parola spagnolo scritta sotto. Non ci sono esercizi, regole o test e il bambino non deve saper leggere.",
        },
        {
          q: "I genitori devono conoscere bene l'spagnolo?",
          a: "No. Sotto ogni disegno è stampata una sola parola semplice in spagnolo. Il genitore può nominare l'oggetto raffigurato, leggere la parola ad alta voce oppure semplicemente colorare l'immagine insieme al bambino.",
        },
        {
          q: "Quali parole spagnole ci sono nel libro?",
          a: "Il libro contiene 111 parole su temi familiari ai bambini: animali, cibo, mezzi di trasporto, natura, personaggi delle fiabe e altro ancora. Sotto ogni disegno è stampata una parola in spagnolo.",
        },
        {
          q: "Nel libro ci sono la trascrizione fonetica o indicazioni sulla pronuncia delle parole spagnole?",
          a: "No. Sotto ogni immagine è stampata soltanto la parola spagnolo, in grandi lettere a contorno che si possono colorare. Il libro non contiene trascrizioni né indicazioni sulla pronuncia. Se non si conosce la pronuncia, la si può ascoltare con un traduttore sul telefono.",
        },
        {
          q: "Qual è la differenza tra l'edizione con le parole inglesi e quella con le parole spagnole?",
          a: "Solo la lingua della parola sotto il disegno: in un'edizione le parole sono in inglese, nell'altra in spagnolo. I disegni, la carta, il formato e l'ordine delle pagine sono identici.",
        },
        {
          q: "È normale se il bambino esce dai contorni mentre colora?",
          a: "Sì. Il libro contiene disegni grandi e semplici con contorni spessi. A un anno il bambino può limitarsi a scarabocchiare sull'immagine, mentre più avanti comincia più spesso a colorare dentro i contorni. Non è necessario colorare il disegno con precisione.",
        },
        {
          q: "Con che cosa è meglio colorare le immagini di questo libro?",
          a: "Matite colorate e pastelli a cera sono la scelta migliore: non trapassano la carta. I pennarelli danno colori più vivaci, ma il loro inchiostro può passare dall'altra parte.",
        },
        {
          q: "Per quanto tempo il bambino potrà usare questo libro da colorare?",
          a: "Il libro contiene 111 disegni, uno per pagina. Quanto a lungo verrà utilizzato dipende dal bambino: c'è chi colora un disegno alla volta e chi ne colora diversi di seguito.",
        },
        {
          q: "Si può provare il libro prima di acquistarlo?",
          a: "Sì. Si possono scaricare gratuitamente e stampare 10 pagine tratte direttamente dal libro. Non servono registrazione né indirizzo e-mail.",
        },
      ],
      pair: "Lo stesso libro con le parole in inglese sotto i disegni:",
      pairCta: "Prime parole in inglese",
      metaTitle: "Prime parole in spagnolo - Libro da colorare per bambini da 1 a 3 anni",
      metaDescription:
        "111 grandi disegni con contorni spessi, uno per pagina, con una parola in spagnolo sotto il disegno, anch'essa da colorare. Per bambini da 1 a 3 anni.",
      altCover: "Copertina del libro da colorare con parole in spagnolo e un leone",
      altBannerLead:
        "111 immagini da colorare e 111 parole in spagnolo, accanto alla copertina del libro da colorare con il leone",
      altArt: [
        "Pagina colorata del libro: un leone con sotto la parola spagnolo León",
        "Pagina colorata del libro: una volpe con sotto la parola spagnolo Zorro",
        "Pagina colorata del libro: una mucca con sotto la parola spagnolo Vaca",
      ],
      altGift: "Il regalo perfetto per i futuri artisti: una ciambella e matite colorate",
    },
  },
  /* ----------------------------- ИСПАНИЯ ----------------------------- */
  /* Одна страница: книга с английскими словами, магазин amazon.es.

     Она про другое, чем испанский раздел сайта. Там справочник о первых
     раскрасках, здесь первые слова чужого языка. Разный заголовок,
     разный адрес, разный первый абзац, поэтому в поиске они
     не спорят друг с другом. Блока про вторую книгу здесь нет:
     книга с испанскими словами испанцу не нужна. */
  espana: {
    en: {
      title: "Primeras palabras en inglés",
      subtitle: "Libro de colorear para niños de 1 a 3 años",
      head: {
        top: "Libro de colorear y diccionario ilustrado para niños de 1 a 3 años",
        title: "Primeras palabras en inglés",
        bottom:
          "111 dibujos grandes con contorno grueso. Debajo de cada imagen, una palabra en inglés.",
      },
      lead: [
        "Dibujos sencillos para colorear con palabras claras en inglés.",
        "Sin textos largos, sin gramática, sin barrera del idioma. En el libro solo hay dibujos grandes con contorno grueso, pensados para los más pequeños, y una sola palabra bien legible debajo de cada imagen.",
        "Sirve tanto para el primer contacto con el inglés como para niños que ya lo oyen cada día en casa. Tu hijo puede colorear imágenes conocidas solo o contigo y pasar un rato divertido e interesante.",
        "Diez páginas del libro se pueden imprimir gratis, incluso antes de comprarlo. Sin registro, sin correo electrónico, sin rellenar nada. Y si a tu hijo le gusta, puedes comprar el libro entero y seguir descubriendo juntos nuevas palabras, colorear y disfrutar de ese rato.",
      ],
      forWhom:
        "Para niños de 1 a 3 años y algo mayores, tanto para el primer contacto con las palabras en inglés como para familias en las que el niño oye dos idiomas. Aquí no hay que aprender nada de forma especial: el niño colorea imágenes conocidas, las mira y va conociendo poco a poco las palabras escritas debajo de los dibujos. Los padres pueden pronunciar esas palabras en voz alta, mirar las imágenes y colorearlas junto con el niño, sin clases, sin reglas y sin ejercicios difíciles.",
      inside: [
        "111 palabras sencillas en inglés, una sola palabra debajo de cada imagen",
        "Dibujos grandes con contorno grueso, fáciles de reconocer para un niño",
        "La palabra bajo el dibujo está impresa en letras huecas grandes, que también se pueden colorear",
        "Un dibujo en cada página",
        "Los dibujos están centrados en la página: una disposición cómoda tanto para diestros como para zurdos",
        "Temas conocidos: animales, comida, vehículos, naturaleza, personajes de cuento y muchos más",
        "Al principio del libro, una página para escribir el nombre del niño",
        "114 páginas en formato grande de 21,6 × 27,9 cm",
      ],
      parents: [
        "El niño termina su dibujo por sí mismo y pasa la página para seguir con el siguiente",
        "Las imágenes grandes y sencillas son fáciles de colorear, incluso para un niño pequeño",
        "El libro es ideal para un viaje largo, una sala de espera o un día de lluvia en casa",
        "El libro es ligero y fácil de llevar",
        "Los niños lo hojean incluso sin lápices de colores y preguntan cómo se llama cada animal",
        "Se compra para el más pequeño de la familia, cuando los mayores ya necesitan libros de colorear más difíciles",
      ],
      rating: "Valoración de 5,0 sobre 5 estrellas en Amazon.",
      criticTitle: "Lo que dijo una reseñadora independiente sobre el libro",
      critic: "5 de 5 estrellas, Readers' Favorite",
      criticBy: "Maalin Ogaja, octubre de 2024",
      criticWhy:
        "Se destacan especialmente el contorno grueso y redondeado, el dibujo centrado en la página y la palabra bajo la imagen, que también se puede colorear.",
      whyTitle: "Por qué este libro sirve para el primer contacto con el idioma",
      why: [
        "El contacto con un idioma no tiene por qué ser una clase. El niño mira imágenes conocidas y las colorea, y un adulto puede simplemente nombrar lo que aparece en ellas.",
        "No hace falta que tú mismo conozcas bien el idioma. Debajo de cada imagen hay una sola palabra sencilla. Es fácil de leer, de pronunciar en voz alta y de repetir junto al niño.",
        "La imagen ayuda a entender la palabra. El niño ve un objeto conocido y, al mismo tiempo, la palabra escrita debajo. Así entra en contacto con palabras en inglés en un contexto que puede entender.",
        "Solo o con sus padres: el niño puede limitarse a colorear las imágenes. Los padres también pueden mirarlas con él, nombrar los objetos y repetir juntos las palabras nuevas.",
        "El libro es adecuado para niños de 1 a 3 años y algo mayores. Al principio, el niño simplemente colorea las imágenes grandes y oye el nombre de las cosas. Más adelante puede repetir las palabras e intentar colorear también las letras huecas.",
      ],
      faq: [
        {
          q: "¿No es demasiado pronto para que un niño de un año use un libro de colorear?",
          a: "No. Los dibujos se han diseñado deliberadamente para ser sencillos y adecuados para los más pequeños. Un niño de un año quizá todavía garabatee por encima de la imagen, mientras que uno de tres ya intenta colorear dentro del contorno. Por eso el libro se puede usar en distintas etapas entre 1 y 3 años.",
        },
        {
          q: "Mi hijo todavía no conoce el inglés. ¿No le resultará difícil el libro?",
          a: "No. El niño simplemente colorea una imagen que conoce y ve la palabra en inglés escrita debajo. Aquí no hay ejercicios, ni reglas, ni exámenes, y el niño no necesita saber leer.",
        },
        {
          q: "¿Los padres tienen que saber bien inglés?",
          a: "No. Debajo de cada dibujo hay una sola palabra sencilla en inglés. Los padres pueden nombrar el objeto representado, leer la palabra en voz alta o simplemente colorear la imagen con el niño.",
        },
        {
          q: "¿Qué palabras en inglés aparecen en el libro?",
          a: "El libro contiene 111 palabras relacionadas con temas familiares para el niño: animales, comida, vehículos, naturaleza, personajes de cuento y muchos más. Debajo de cada dibujo aparece una palabra en inglés.",
        },
        {
          q: "¿El libro incluye transcripción fonética o indicaciones de pronunciación de las palabras en inglés?",
          a: "No. Debajo de cada imagen aparece únicamente la palabra en inglés, impresa en letras huecas grandes que también se pueden colorear. El libro no incluye transcripción fonética ni ayuda con la pronunciación. Si tienes dudas sobre la pronunciación, puedes escuchar la palabra en una aplicación de traducción en el móvil.",
        },
        {
          q: "¿Qué diferencia hay entre la edición con palabras en inglés y la que tiene palabras en español?",
          a: "Solo el idioma de la palabra bajo el dibujo: en una edición las palabras están en inglés y en la otra en español. Los dibujos, el papel, el formato y el orden de las páginas son idénticos.",
        },
        {
          q: "¿Es normal que el niño se salga del contorno al colorear?",
          a: "Sí. El libro tiene dibujos grandes y sencillos con contorno grueso. Al año, el niño quizá todavía garabatee por encima de la imagen, y más adelante colorea con más frecuencia dentro del contorno. No hace falta que coloree con precisión.",
        },
        {
          q: "¿Con qué es mejor colorear los dibujos de este libro?",
          a: "Los lápices de colores y las ceras son la mejor opción: no traspasan el papel. Los rotuladores dan colores más vivos, pero su tinta puede pasar al otro lado.",
        },
        {
          q: "¿Cuánto tiempo le puede durar este libro a un niño?",
          a: "El libro contiene 111 dibujos, uno por página. Cuánto tiempo le dure depende del niño: unos colorean un dibujo cada vez y otros varios seguidos.",
        },
        {
          q: "¿Se puede probar el libro antes de comprarlo?",
          a: "Sí. Diez páginas reales del libro se pueden descargar gratis e imprimir en casa. No hace falta registrarse ni dar una dirección de correo electrónico.",
        },
      ],
      metaTitle:
        "Primeras palabras en inglés - Libro de colorear para niños de 1 a 3 años",
      metaDescription:
        "111 dibujos grandes con contorno grueso, uno por página, con una palabra en inglés debajo que también se puede colorear. Para niños de 1 a 3 años.",
      altCover:
        "Portada del libro de colorear con las palabras en inglés y un león",
      altBannerLead:
        "111 imágenes para colorear y 111 palabras en inglés, junto a la portada del libro con el león",
      altArt: [
        "Sencillo: una tortuga de contorno grueso, un solo motivo en la página",
        "Grande: una vaca que ocupa casi toda la hoja, coloreada por un niño pequeño",
        "Conocido: un coche rojo sonriente, uno de los objetos cotidianos del libro",
      ],
      altGift:
        "El regalo ideal para futuros artistas: un dónut y lápices de colores",
    },
  },

  /* ------------------------------ КАНАДА ----------------------------- */
  /* Одна страница: книга с испанскими словами, магазин amazon.ca.

     Страница на английском: мы ждем человека, который ищет испанские
     слова для ребенка и набирает запрос по-английски. Это может быть
     и семья, где испанский слышат дома, и родитель, который хочет
     познакомить ребенка с языком.

     Блока про вторую книгу здесь нет: отправлять такого человека
     к английской книге незачем. */
  canada: {
    es: {
      title: "First words in Spanish",
      subtitle: "Coloring book for children ages 1 to 3",
      head: {
        top: "Coloring book and picture dictionary for children ages 1 to 3",
        title: "First words in Spanish",
        bottom:
          "111 large drawings with thick outlines. One Spanish word under every picture.",
      },
      lead: [
        "Simple pictures to color, with clear words in Spanish.",
        "No long texts, no grammar, no language barrier. The book contains only large drawings with thick outlines, designed for young children, with one clearly printed word under each picture.",
        "Works both as a first introduction to Spanish and for children who already hear the language at home. Your child can color familiar pictures alone or with you and enjoy spending time together.",
        "Ten pages from the book can be printed for free, even before you buy it. No sign-up, no email address, nothing to fill in. And if your child enjoys them, you can buy the whole book and keep discovering new words together, coloring and enjoying the time you spend together.",
      ],
      forWhom:
        "For children ages 1 to 3 and a little older, both as a first introduction to Spanish words and for families where a child hears two languages. There is nothing here that needs to be formally studied: the child colors familiar pictures, looks at them, and gradually becomes familiar with the words printed under the drawings. Parents can say the words out loud, look at the pictures with the child, and color them together, with no lessons, no rules, and no difficult exercises.",
      inside: [
        "111 simple words in Spanish, one word under every picture",
        "Large drawings with thick outlines, easy for a child to recognize",
        "The word under the drawing is printed in large hollow letters that can be colored in too",
        "One drawing per page, the back of the page stays blank",
        "The drawings are centered on the page, making them comfortable for both right-handed and left-handed children.",
        "Familiar themes: animals, food, vehicles, nature, fairy-tale characters and more",
        "A page at the front of the book for the child's name",
        "114 pages in a large 8.5 × 11 in (21.6 × 27.9 cm) format",
      ],
      parents: [
        "The child finishes a drawing on their own and turns the page to start the next one",
        "The large, simple pictures are easy to color, even for a young child",
        "The book is perfect for a long drive, a waiting room or a rainy day at home",
        "The book is lightweight and easy to take along",
        "Children page through it even without pencils and ask what each animal is called",
        "Parents often buy it for the youngest child in the family when the older children are ready for more challenging coloring books.",
      ],
      rating: "Rated 4.9 out of 5 stars on Amazon.",
      criticTitle: "What an independent reviewer said about the book",
      critic: "5 out of 5 stars, Readers' Favorite",
      criticBy: "Maalin Ogaja, October 2024",
      criticWhy:
        "Highlighted in particular: the thick, rounded outline, the drawing centered on the page, and the word under the picture, which can also be colored in.",
      whyTitle: "Why this book works as a first introduction to the language",
      why: [
        "A first introduction to a language does not have to be a lesson. The child looks at familiar pictures and colors them, while an adult can simply name what is shown in each picture.",
        "You do not need to know the language well yourself. There is only one simple word under each picture. It is easy to read, say out loud, and repeat together with your child.",
        "The picture helps make the word understandable. The child sees a familiar object and, at the same time, the word printed underneath it. This way, the child encounters Spanish words in a context they can understand.",
        "Alone or with a parent, the child can simply color the pictures. Parents can also look at the pictures with the child, name the objects, and repeat the new words together.",
        "The book is suitable for children ages 1 to 3 and a little older. At first, the child simply colors the large pictures and hears the names of the objects. Later, they can repeat the words and try coloring the hollow letters too.",
      ],
      faq: [
        {
          q: "Is one year old too early for a coloring book?",
          a: "No. The drawings were deliberately designed to be simple and suitable for young children. A one-year-old may still scribble across the picture, while a three-year-old may already try to color inside the outline. The book can therefore be used at different stages between ages 1 and 3.",
        },
        {
          q: "My child isn't familiar with Spanish yet. Will the book be too hard?",
          a: "No. The child simply colors a familiar picture and sees the Spanish word printed underneath. There are no exercises, no rules and no tests here, and the child does not need to know how to read.",
        },
        {
          q: "Do parents need to know Spanish well themselves?",
          a: "No. There is only one simple Spanish word under each drawing. Parents can name the object shown, read the word out loud, or simply color the picture together with the child.",
        },
        {
          q: "What Spanish words are in the book?",
          a: "The book contains 111 words on familiar themes: animals, food, vehicles, nature, fairy-tale characters and more. One Spanish word is printed under each drawing.",
        },
        {
          q: "Does the book include phonetic spelling or pronunciation help for the Spanish words?",
          a: "No. Only the Spanish word itself appears under each picture, printed in large hollow letters that can be colored in as well. The book contains no phonetic spelling and no pronunciation guide. If you are unsure how a word sounds, you can listen to it in a translation app on your phone.",
        },
        {
          q: "What is the difference between the edition with Spanish words and the one with English words?",
          a: "Only the language of the word under the drawing: in one edition the words are in Spanish, in the other in English. The drawings, the paper, the format and the page order are identical.",
        },
        {
          q: "Is it normal for a child to color outside the lines?",
          a: "Yes. The book has large, simple drawings with thick outlines. At one year old, a child may still scribble across the picture, while later they may color inside the lines more often. Coloring precisely is not the point.",
        },
        {
          q: "What can my child use to color the pictures in this book?",
          a: "Colored pencils, wax crayons, and markers all work. If a marker bleeds through the paper, slip an extra sheet under the page. The back of every drawing stays blank.",
        },
        {
          q: "How long will this coloring book last a child?",
          a: "The book contains 111 drawings, one per page. How long it lasts depends on the child: some color one drawing at a time, others several in a row.",
        },
        {
          q: "Can you try the book before buying it?",
          a: "Yes. Ten real pages from the book can be downloaded for free and printed at home. No sign-up or email address is required.",
        },
      ],
      metaTitle:
        "First words in Spanish - Coloring book for children ages 1 to 3",
      metaDescription:
        "111 large drawings with thick outlines, one per page, with a Spanish word underneath that can be colored in too. For children ages 1 to 3.",
      altCover: "Cover of the coloring book with the Spanish words and a lion",
      altBannerLead:
        "111 pictures to color and 111 words in Spanish, next to the cover of the coloring book with the lion",
      altArt: [
        "Simple: a turtle with a thick outline, one motif on the page",
        "Large: a cow filling almost the whole sheet, colored by a young child",
        "Familiar: a smiling red car, one of the everyday objects in the book",
      ],
      altGift: "The perfect gift for future artists: a donut and colored pencils",
    },
  },
};

/* ==================================================================
   Картинки

   Обложка и три квадратика уже лежат в проекте, баннеры принесены
   из основного каталога издательства. Надписи на них английские или
   испанские, и это правда: так называется сама книга, и покупатель
   должен узнать ее, когда попадет на Amazon.
   ================================================================== */

export const euroArt: Record<
  EditionLang,
  {
    cover: string;
    coverSize: { w: number; h: number };
    bannerLead: string;
    art: [string, string, string];
    gift: string;
  }
> = {
  en: {
    cover: editions.en.cover,
    coverSize: editions.en.coverSize,
    bannerLead: "/art/first-coloring-111-header.webp",
    art: ["/art/simple.webp", "/art/big.webp", "/art/cute.webp"],
    gift: "/art/first-coloring-111-gift.webp",
  },
  es: {
    cover: editions.es.cover,
    coverSize: editions.es.coverSize,
    bannerLead: "/art/first-coloring-111-es-header.webp",
    art: [
      "/art/first-coloring-111-es-simple.webp",
      "/art/first-coloring-111-es-big.webp",
      "/art/first-coloring-111-es-cute.webp",
    ],
    gift: "/art/first-coloring-111-es-gift.webp",
  },
};

/* ==================================================================
   Своя полоса картинок и своя цена для отдельной страницы

   Обычные восемь страниц берут картинки из euroArt: надписи на них
   английские или испанские, одни и те же во всех четырех странах.

   Немецкая страница про английскую книгу получила свои шесть картинок
   с немецкими надписями. Поэтому у нее свой набор, а остальные семь
   страниц продолжают брать общий и не меняются.

   Ключ склеивается из языка страницы и языка книги: "de-en".
   ================================================================== */

export type StripItem = {
  src: string;
  w: number;
  h: number;
  alt: string;
  /** Широкая полоса во всю ширину или один из трех листов в ряду. */
  wide: boolean;
};

export const pageKey = (lang: EuroLang, ed: EditionLang) => `${lang}-${ed}`;

/* Текст страницы. У страны с одной страницей второй нет вовсе,
   поэтому просить ее это ошибка сборки, а не пустая страница. */
export const euroCopyOf = (lang: EuroLang, ed: EditionLang): EuroCopy => {
  const c = euroCopy[lang][ed];
  if (!c) throw new Error(`Нет текста страницы ${lang}-${ed}`);
  return c;
};

export const euroPageOwn: Partial<
  Record<
    string,
    {
      price: string;
      size?: string;
      /** Верхняя строка, разрезанная на два куска. Нужна затем, чтобы
          на узком экране перенос случился в задуманном месте, после
          слова Kinder, а не где придется. На широком экране оба куска
          стоят в одну строку. */
      headTop?: [string, string];
      strip: StripItem[];
    }
  >
> = {
  /* Франция, книга с английскими словами. Картинки свои, надписи
     на них французские, а слова на листах и под мотивами английские:
     так напечатано в самой книге, и покупатель должен узнать ее,
     когда попадет на Amazon.fr. */
  /* Италия, книга с английскими словами. Свои шесть картинок
     с итальянскими надписями. Слова на самих листах английские:
     так напечатано в книге, и покупатель должен узнать ее, когда
     попадет на Amazon.it.
 */
  "it-en": {
    price: "5,99 €",
    size: "21,6 × 27,9 cm",
    strip: [
      {
        src: "/art/it-en-header.webp",
        w: 1600,
        h: 556,
        wide: true,
        alt: "111 immagini da colorare e 111 parole in inglese, accanto alla copertina del libro da colorare con il leone",
      },
      {
        src: "/art/it-en-lion.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Pagina colorata del libro: un leone con sotto la parola inglese Lion",
      },
      {
        src: "/art/it-en-fox.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Pagina colorata del libro: una volpe con sotto la parola inglese Fox",
      },
      {
        src: "/art/it-en-cow.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Pagina colorata del libro: una mucca con sotto la parola inglese Cow",
      },
      {
        src: "/art/it-en-motifs.webp",
        w: 1400,
        h: 864,
        wide: true,
        alt: "Immagini carine e semplici da colorare: dieci disegni del libro, ciascuno con una parola in inglese",
      },
      {
        src: "/art/it-en-gift.webp",
        w: 1600,
        h: 638,
        wide: true,
        alt: "Il regalo perfetto per i futuri artisti: una ciambella e matite colorate",
      },
    ],
  },
  /* Италия, книга с испанскими словами. Свой набор картинок:
     надписи на баннерах итальянские, обложка испанского издания,
     а слова на самих листах испанские, как напечатано в книге. */
  "it-es": {
    price: "5,99 €",
    size: "21,6 × 27,9 cm",
    strip: [
      {
        src: "/art/it-es-header.webp",
        w: 1600,
        h: 556,
        wide: true,
        alt: "111 immagini da colorare e 111 parole in spagnolo, accanto alla copertina del libro da colorare con il leone",
      },
      {
        src: "/art/it-es-lion.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Pagina colorata del libro: un leone con sotto la parola spagnola León",
      },
      {
        src: "/art/it-es-fox.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Pagina colorata del libro: una volpe con sotto la parola spagnola Zorro",
      },
      {
        src: "/art/it-es-cow.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Pagina colorata del libro: una mucca con sotto la parola spagnola Vaca",
      },
      {
        src: "/art/it-es-motifs.webp",
        w: 1400,
        h: 864,
        wide: true,
        alt: "Immagini carine e semplici da colorare: dieci disegni del libro, ciascuno con una parola in spagnolo",
      },
      {
        src: "/art/it-es-gift.webp",
        w: 1600,
        h: 638,
        wide: true,
        alt: "Il regalo perfetto per i futuri artisti: una ciambella e matite colorate",
      },
    ],
  },
  "fr-en": {
    price: "5,99 €",
    headTop: ["Livre de coloriage et imagier pour enfants", "de 1 à 3 ans"],
    size: "21,6 × 27,9 cm",
    strip: [
      {
        src: "/art/fr-en-header.webp",
        w: 1600,
        h: 556,
        wide: true,
        alt: "111 images à colorier et 111 mots en anglais, avec à côté la couverture du livre de coloriage avec le lion",
      },
      {
        src: "/art/fr-en-lion.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Page coloriée tirée du livre : un lion avec le mot anglais Lion en dessous",
      },
      {
        src: "/art/fr-en-fox.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Page coloriée tirée du livre : un renard avec le mot anglais Fox en dessous",
      },
      {
        src: "/art/fr-en-cow.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Page coloriée tirée du livre : une vache avec le mot anglais Cow en dessous",
      },
      {
        src: "/art/fr-en-motifs.webp",
        w: 1400,
        h: 864,
        wide: true,
        alt: "Des images à colorier mignonnes et simples : dix dessins du livre, sous chacun un mot en anglais",
      },
      {
        src: "/art/fr-en-gift.webp",
        w: 1600,
        h: 638,
        wide: true,
        alt: "Le cadeau idéal pour les futurs artistes : un donut et des crayons de couleur",
      },
    ],
  },
  /* Франция, книга с испанскими словами. Надписи на баннерах
     французские, слова на листах и под мотивами испанские: так
     напечатано в самой книге. */
  "fr-es": {
    price: "5,99 €",
    headTop: ["Livre de coloriage et imagier pour enfants", "de 1 à 3 ans"],
    size: "21,6 × 27,9 cm",
    strip: [
      {
        src: "/art/fr-es-header.webp",
        w: 1600,
        h: 530,
        wide: true,
        alt: "111 images à colorier et 111 mots en espagnol, avec à côté la couverture du livre de coloriage avec le lion",
      },
      {
        src: "/art/fr-es-lion.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Page coloriée tirée du livre : un lion avec le mot espagnol León en dessous",
      },
      {
        src: "/art/fr-es-fox.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Page coloriée tirée du livre : un renard avec le mot espagnol Zorro en dessous",
      },
      {
        src: "/art/fr-es-cow.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Page coloriée tirée du livre : une vache avec le mot espagnol Vaca en dessous",
      },
      {
        src: "/art/fr-es-motifs.webp",
        w: 1400,
        h: 865,
        wide: true,
        alt: "Des images à colorier mignonnes et simples : dix dessins du livre, sous chacun un mot en espagnol",
      },
      {
        src: "/art/fr-es-gift.webp",
        w: 1600,
        h: 550,
        wide: true,
        alt: "Le cadeau idéal pour les futurs artistes : un donut et des crayons de couleur",
      },
    ],
  },
  /* Голландия, книга с английскими словами. Надписи на баннерах
     голландские, слова на листах и под мотивами английские: так
     напечатано в самой книге. */
  "nl-en": {
    price: "€ 6,41",
    headTop: ["Kleurboek en beeldwoordenboek voor kinderen", "van 1 tot 3 jaar"],
    size: "21,6 × 27,9 cm",
    strip: [
      {
        src: "/art/nl-en-header.webp",
        w: 1600,
        h: 555,
        wide: true,
        alt: "111 kleurplaten en 111 woorden in het Engels, daarnaast de cover van het kleurboek met de leeuw",
      },
      {
        src: "/art/nl-en-lion.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Ingekleurde pagina uit het boek: een leeuw met daaronder het Engelse woord Lion",
      },
      {
        src: "/art/nl-en-fox.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Ingekleurde pagina uit het boek: een vos met daaronder het Engelse woord Fox",
      },
      {
        src: "/art/nl-en-cow.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Ingekleurde pagina uit het boek: een koe met daaronder het Engelse woord Cow",
      },
      {
        src: "/art/nl-en-motifs.webp",
        w: 1400,
        h: 866,
        wide: true,
        alt: "Leuke en eenvoudige kleurplaten: tien tekeningen uit het boek, onder elke tekening een Engels woord",
      },
      {
        src: "/art/nl-en-gift.webp",
        w: 1600,
        h: 624,
        wide: true,
        alt: "Het ideale cadeau voor toekomstige kunstenaars: een donut en kleurpotloden",
      },
    ],
  },
  /* Голландия, книга с испанскими словами. Надписи на баннерах
     голландские, слова на листах и под мотивами испанские. */
  "nl-es": {
    price: "€ 6,41",
    headTop: ["Kleurboek en beeldwoordenboek voor kinderen", "van 1 tot 3 jaar"],
    size: "21,6 × 27,9 cm",
    strip: [
      {
        src: "/art/nl-es-header.webp",
        w: 1600,
        h: 531,
        wide: true,
        alt: "111 kleurplaten en 111 woorden in het Spaans, daarnaast de cover van het kleurboek met de leeuw",
      },
      {
        src: "/art/nl-es-lion.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Ingekleurde pagina uit het boek: een leeuw met daaronder het Spaanse woord León",
      },
      {
        src: "/art/nl-es-fox.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Ingekleurde pagina uit het boek: een vos met daaronder het Spaanse woord Zorro",
      },
      {
        src: "/art/nl-es-cow.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Ingekleurde pagina uit het boek: een koe met daaronder het Spaanse woord Vaca",
      },
      {
        src: "/art/nl-es-motifs.webp",
        w: 1400,
        h: 866,
        wide: true,
        alt: "Leuke en eenvoudige kleurplaten: tien tekeningen uit het boek, onder elke tekening een Spaans woord",
      },
      {
        src: "/art/nl-es-gift.webp",
        w: 1600,
        h: 541,
        wide: true,
        alt: "Het ideale cadeau voor toekomstige kunstenaars: een donut en kleurpotloden",
      },
    ],
  },
  /* Польша, книга с английскими словами. Надписи на баннерах
     польские, слова на листах и под мотивами английские. */
  "pl-en": {
    price: "30,44 zł",
    headTop: ["Kolorowanka i słownik obrazkowy dla dzieci", "w wieku od 1 do 3 lat"],
    size: "21,6 × 27,9 cm",
    strip: [
      {
        src: "/art/pl-en-header.webp",
        w: 1600,
        h: 556,
        wide: true,
        alt: "111 obrazków do kolorowania i 111 słów po angielsku, obok okładka kolorowanki z lwem",
      },
      {
        src: "/art/pl-en-lion.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Pokolorowana strona z książki: lew, a pod nim angielskie słowo Lion",
      },
      {
        src: "/art/pl-en-fox.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Pokolorowana strona z książki: lis, a pod nim angielskie słowo Fox",
      },
      {
        src: "/art/pl-en-cow.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Pokolorowana strona z książki: krowa, a pod nią angielskie słowo Cow",
      },
      {
        src: "/art/pl-en-motifs.webp",
        w: 1400,
        h: 866,
        wide: true,
        alt: "Urocze i proste obrazki do kolorowania: dziesięć rysunków z książki, pod każdym angielskie słowo",
      },
      {
        src: "/art/pl-en-gift.webp",
        w: 1600,
        h: 622,
        wide: true,
        alt: "Idealny prezent dla przyszłych artystów: pączek i kredki",
      },
    ],
  },
  /* Польша, книга с испанскими словами. Надписи на баннерах польские,
     слова на листах и под мотивами испанские. */
  "pl-es": {
    price: "30,44 zł",
    headTop: ["Kolorowanka i słownik obrazkowy dla dzieci", "w wieku od 1 do 3 lat"],
    size: "21,6 × 27,9 cm",
    strip: [
      {
        src: "/art/pl-es-header.webp",
        w: 1600,
        h: 533,
        wide: true,
        alt: "111 obrazków do kolorowania i 111 słów po hiszpańsku, obok okładka kolorowanki z lwem",
      },
      {
        src: "/art/pl-es-lion.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Pokolorowana strona z książki: lew, a pod nim hiszpańskie słowo León",
      },
      {
        src: "/art/pl-es-fox.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Pokolorowana strona z książki: lis, a pod nim hiszpańskie słowo Zorro",
      },
      {
        src: "/art/pl-es-cow.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Pokolorowana strona z książki: krowa, a pod nią hiszpańskie słowo Vaca",
      },
      {
        src: "/art/pl-es-motifs.webp",
        w: 1400,
        h: 866,
        wide: true,
        alt: "Urocze i proste obrazki do kolorowania: dziesięć rysunków z książki, pod każdym hiszpańskie słowo",
      },
      {
        src: "/art/pl-es-gift.webp",
        w: 1600,
        h: 540,
        wide: true,
        alt: "Idealny prezent dla przyszłych artystów: pączek i kredki",
      },
    ],
  },
  /* Испания, книга с английскими словами. Надписи на баннерах
     испанские, слова на листах и под мотивами английские.
     Три листа со львом, лисой и коровой те же самые, что стоят
     на французской, голландской и польской английских страницах:
     они английские везде. */
  /* Канада, книга с испанскими словами. Надписи на баннерах
     английские, слова на листах и под мотивами испанские.
     Три листа со львом, лисой и коровой те же самые, что стоят
     на французской, голландской и польской испанских страницах. */
  "canada-es": {
    price: "$9.99 CAD",
    headTop: ["Coloring book and picture dictionary", "for children ages 1 to 3"],
    size: "8.5 × 11 in (21.6 × 27.9 cm)",
    strip: [
      {
        src: "/art/ca-es-header.webp",
        w: 1600,
        h: 532,
        wide: true,
        alt: "111 pictures to color and 111 words in Spanish, next to the cover of the coloring book with the lion",
      },
      {
        src: "/art/ca-es-lion.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Colored page from the book: a lion with the Spanish word León underneath",
      },
      {
        src: "/art/ca-es-fox.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Colored page from the book: a fox with the Spanish word Zorro underneath",
      },
      {
        src: "/art/ca-es-cow.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Colored page from the book: a cow with the Spanish word Vaca underneath",
      },
      {
        src: "/art/ca-es-motifs.webp",
        w: 1400,
        h: 866,
        wide: true,
        alt: "Cute and simple pictures to color: ten drawings from the book, each with a Spanish word underneath",
      },
      {
        src: "/art/ca-es-gift.webp",
        w: 1600,
        h: 541,
        wide: true,
        alt: "The perfect gift for future artists: a donut and colored pencils",
      },
    ],
  },
  "espana-en": {
    price: "5,99 €",
    headTop: ["Libro de colorear y diccionario ilustrado", "para niños de 1 a 3 años"],
    size: "21,6 × 27,9 cm",
    strip: [
      {
        src: "/art/es-en-header.webp",
        w: 1600,
        h: 555,
        wide: true,
        alt: "111 imágenes para colorear y 111 palabras en inglés, junto a la portada del libro con el león",
      },
      {
        src: "/art/es-en-lion.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Página coloreada del libro: un león y debajo la palabra inglesa Lion",
      },
      {
        src: "/art/es-en-fox.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Página coloreada del libro: un zorro y debajo la palabra inglesa Fox",
      },
      {
        src: "/art/es-en-cow.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Página coloreada del libro: una vaca y debajo la palabra inglesa Cow",
      },
      {
        src: "/art/es-en-motifs.webp",
        w: 1400,
        h: 865,
        wide: true,
        alt: "Dibujos bonitos y sencillos para colorear: diez imágenes del libro, cada una con una palabra en inglés",
      },
      {
        src: "/art/es-en-gift.webp",
        w: 1600,
        h: 540,
        wide: true,
        alt: "El regalo ideal para futuros artistas: un dónut y lápices de colores",
      },
    ],
  },
  "de-en": {
    /* Цена приблизительная, и это намеренно. Задается она в долларах
       на Amazon.com, а каждый магазин пересчитывает ее сам: свой налог
       на книги и свой курс. Точное число расходится с магазином после
       первого же пересчета, и человек перестает верить всей странице.
       В кабинете KDP на август 2026 стоит 5,99 евро без налога, немец
       платит 6,41 евро с налогом. Округленное число остается правдой
       и при том, и при другом. */
    price: "5,99 €",
    headTop: ["Malbuch und Bildwörterbuch für Kinder", "von 1 bis 3 Jahren"],
    /* Немцы пишут размер через знак умножения, а не через букву x.
       Общий BOOK_SIZE_CM трогать нельзя: он стоит на всех восьми
       страницах сразу, в том числе на французской и польской. */
    size: "21,6 × 27,9 cm",
    strip: [
      {
        src: "/art/de-en-header.webp",
        w: 1600,
        h: 557,
        wide: true,
        alt: "111 Bilder zum Ausmalen und 111 Wörter auf Englisch, daneben das Cover des Malbuchs mit dem Löwen",
      },
      {
        src: "/art/de-en-lion.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Ausgemalte Seite aus dem Buch: ein Löwe und darunter das englische Wort Lion",
      },
      {
        src: "/art/de-en-fox.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Ausgemalte Seite aus dem Buch: ein Fuchs und darunter das englische Wort Fox",
      },
      {
        src: "/art/de-en-cow.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Ausgemalte Seite aus dem Buch: eine Kuh und darunter das englische Wort Cow",
      },
      {
        src: "/art/de-en-motifs.webp",
        w: 1400,
        h: 866,
        wide: true,
        alt: "Niedliche und einfache Malbilder: zehn Zeichnungen aus dem Buch, unter jedem Bild ein englisches Wort",
      },
      {
        src: "/art/de-en-gift.webp",
        w: 1600,
        h: 622,
        wide: true,
        alt: "Das perfekte Geschenk für angehende Künstler: ein Donut und Buntstifte",
      },
    ],
  },
  "de-es": {
    price: "5,99 €",
    headTop: ["Malbuch und Bildwörterbuch für Kinder", "von 1 bis 3 Jahren"],
    size: "21,6 × 27,9 cm",
    strip: [
      {
        src: "/art/de-es-header.webp",
        w: 1600,
        h: 530,
        wide: true,
        alt: "Das erste Malbuch auf Spanisch für Kinder von 1 bis 3 Jahren, daneben das Cover mit dem Löwen",
      },
      {
        src: "/art/de-es-lion.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Ausgemalte Seite aus dem Buch: ein Löwe und darunter das spanische Wort León",
      },
      {
        src: "/art/de-es-fox.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Ausgemalte Seite aus dem Buch: ein Fuchs und darunter das spanische Wort Zorro",
      },
      {
        src: "/art/de-es-cow.webp",
        w: 700,
        h: 991,
        wide: false,
        alt: "Ausgemalte Seite aus dem Buch: eine Kuh und darunter das spanische Wort Vaca",
      },
      {
        src: "/art/de-es-motifs.webp",
        w: 1400,
        h: 866,
        wide: true,
        alt: "Niedliche und einfache Malbilder: zehn Zeichnungen aus dem Buch, unter jedem Bild ein spanisches Wort",
      },
      {
        src: "/art/de-es-gift.webp",
        w: 1600,
        h: 541,
        wide: true,
        alt: "Das perfekte Geschenk für angehende Künstler: ein Donut und Buntstifte",
      },
    ],
  },
};

/* Сведения о книге, одинаковые на всех восьми страницах.

   Адреса страницы с файлом для печати здесь намеренно нет. Она стоит
   на Wix, написана по-английски и считает в долларах: немец или поляк
   нажимал бы кнопку и попадал не туда, куда шел. Вместо нее внизу
   каждой страницы лежат десять настоящих листов из книги, бесплатно
   и на языке самой книги. */
export const euroBook = (ed: EditionLang) => ({
  asin: editions[ed].asin!,
  isbn: editions[ed].isbn!,
  published: editions[ed].published,
  drawings: 111,
  pages: 114,
  ages: "1-3",
  size: BOOK_SIZE_CM,
});

/* Страны, у которых страница одна. Испания: только английская книга,
   испанцу испанские слова не нужны. Канада: только испанская книга. */
export const euroSinglePages: { lang: EuroLang; ed: EditionLang }[] = [
  { lang: "espana", ed: "en" },
  { lang: "canada", ed: "es" },
];

/** Все страницы этого крыла одним списком: для карты сайта и сборки. */
export const euroPages = [
  ...euroLangs.flatMap((lang) =>
    editionLangs.map((ed) => ({ lang, ed }))
  ),
  ...euroSinglePages,
].map(({ lang, ed }) => ({ lang, ed, path: euroPath(lang, ed) }));
