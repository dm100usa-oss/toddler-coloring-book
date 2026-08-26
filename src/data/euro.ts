import { editions } from "./book";

/* ==================================================================
   Восемь страниц для четырех европейских рынков.

   Зачем они есть. Обе книги продаются на amazon.de, amazon.fr,
   amazon.nl и amazon.pl, но карточки там английская и испанская:
   немецкий, французский, голландский и польский родитель не видит
   в своем магазине ни одного слова на своем языке. Эти восемь
   страниц единственное место, где про эти книги написано на его
   языке, и именно поэтому они могут появиться в его Google.

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

export type EuroLang = "de" | "fr" | "nl" | "pl";
export type EditionLang = "en" | "es";

export const euroLangs: EuroLang[] = ["de", "fr", "nl", "pl"];
export const editionLangs: EditionLang[] = ["en", "es"];

/* Магазин Amazon своей страны. Адрес карточки во всех странах
   складывается одинаково: домен плюс номер книги. */
export const amazonHost: Record<EuroLang, string> = {
  de: "www.amazon.de",
  fr: "www.amazon.fr",
  nl: "www.amazon.nl",
  pl: "www.amazon.pl",
};

export const euroAmazonUrl = (lang: EuroLang, asin: string) =>
  `https://${amazonHost[lang]}/dp/${asin}`;

/* Цены приблизительные и это намеренно. Точное число живет до первой
   скидки или пересчета валюты, после чего расходится с магазином,
   и человек, увидевший на сайте одно, а в магазине другое, перестает
   верить всей странице. Сверено с карточками магазинов в августе 2026
   года: Франция 5,99 евро, Голландия 6,41 евро, Польша 30,44 злотых.
   У обеих книг цены совпадают. */
export const euroPrice: Record<EuroLang, string> = {
  de: "ca. 6 €",
  fr: "env. 6 €",
  nl: "ca. € 6,50",
  pl: "ok. 30 zł",
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
export const BOOK_SIZE_CM = "21,6 x 27,9 cm";

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
  faq: { q: string; a: string }[];
  /** Строка со ссылкой на такую же страницу про вторую книгу. */
  pair: string;
  pairCta: string;
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
  footerAbout: string;
  footerLink: string;
  footerLinkNote: string;
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
    parents: "Was Eltern sagen",
    ratingTitle: "Bewertungen",
    criticTitle: "Was eine unabhängige Rezensentin schrieb",
    faq: "Häufige Fragen",
    buyAmazon: "Bei Amazon.de kaufen",
    buyFree: "10 Seiten kostenlos ausdrucken",
    priceLabel: "Taschenbuch bei Amazon.de",
    buyNote: "Verkauf und Versand durch Amazon.",
    freeTitle: "Zehn Seiten aus dem Buch, kostenlos zum Ausdrucken",
    freeLead:
      "Das sind echte Seiten aus dem Buch, mit demselben Wort unter der Zeichnung. Drucken Sie eine Seite aus, geben Sie Ihrem Kind einen Stift, und nach fünf Minuten wissen Sie, ob ein solches Buch zu ihm passt. Ohne Anmeldung und ohne E-Mail-Adresse.",
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
    parents: "Ce que disent les parents",
    ratingTitle: "Évaluations",
    criticTitle: "Ce qu'en a dit une critique indépendante",
    faq: "Questions fréquentes",
    buyAmazon: "Acheter sur Amazon.fr",
    buyFree: "10 pages à imprimer gratuitement",
    priceLabel: "broché sur Amazon.fr",
    buyNote: "Vendu et expédié par Amazon.",
    freeTitle: "Dix pages du livre, à imprimer gratuitement",
    freeLead:
      "Ce sont de vraies pages du livre, avec le même mot sous le dessin. Imprimez-en une, donnez un crayon à votre enfant, et en cinq minutes vous saurez si ce type de livre lui convient. Sans inscription et sans adresse e-mail.",
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
    footerAbout:
      "Publié par Magic of Discoveries LLC, maison d'édition jeunesse à Miami, en Floride.",
    footerLink: "Tout sur les premiers livres de coloriage pour les 1 à 3 ans",
    footerLinkNote: "en anglais",
  },
  nl: {
    htmlLang: "nl",
    locale: "nl-NL",
    inside: "Wat er in het boek zit",
    forWhom: "Voor wie dit boek is",
    parents: "Wat ouders zeggen",
    ratingTitle: "Beoordelingen",
    criticTitle: "Wat een onafhankelijke recensent schreef",
    faq: "Veelgestelde vragen",
    buyAmazon: "Kopen op Amazon.nl",
    buyFree: "10 pagina's gratis printen",
    priceLabel: "paperback op Amazon.nl",
    buyNote: "Verkocht en verzonden door Amazon.",
    freeTitle: "Tien pagina's uit het boek, gratis om te printen",
    freeLead:
      "Dit zijn echte pagina's uit het boek, met hetzelfde woord onder de tekening. Print er één uit, geef uw kind een potlood, en na vijf minuten weet u of zo'n boek bij uw kind past. Zonder registratie en zonder e-mailadres.",
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
    parents: "Co mówią rodzice",
    ratingTitle: "Oceny",
    criticTitle: "Co napisała niezależna recenzentka",
    faq: "Najczęstsze pytania",
    buyAmazon: "Kup na Amazon.pl",
    buyFree: "10 stron do wydruku za darmo",
    priceLabel: "oprawa miękka na Amazon.pl",
    buyNote: "Sprzedaż i wysyłka przez Amazon.",
    freeTitle: "Dziesięć stron z książki, do wydruku za darmo",
    freeLead:
      "To prawdziwe strony z książki, z tym samym słowem pod rysunkiem. Wydrukuj jedną, daj dziecku kredkę, a po pięciu minutach będziesz wiedzieć, czy taka książka mu odpowiada. Bez rejestracji i bez podawania adresu e-mail.",
    freeDownload: "Pobierz",
    freeFormat: "Format A4, do wydruku w domu.",
    freeAlt: (name: string) => `${name}: kolorowanka ze strony książki`,
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
    footerAbout:
      "Wydane przez Magic of Discoveries LLC, wydawnictwo książek dla dzieci z Miami na Florydzie.",
    footerLink: "Wszystko o pierwszych kolorowankach dla dzieci od 1 do 3 lat",
    footerLinkNote: "po angielsku",
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
};

/* ==================================================================
   Тексты страниц

   Смысл всех блоков утвержден владельцем. Менять его нельзя, можно
   только точно передать на каждом языке.

   Ни одного утверждения о пользе для развития здесь нет и быть не
   должно: ни про моторику, ни про интеллект, ни про двуязычие.
   Только проверяемое: толщина контура, один рисунок на странице,
   печать с одной стороны, ребенок доводит рисунок до конца сам.
   ================================================================== */

export const euroCopy: Record<EuroLang, Record<EditionLang, EuroCopy>> = {
  /* ---------------------------- НЕМЕЦКИЙ ---------------------------- */
  de: {
    en: {
      title: "Erste Wörter auf Englisch",
      subtitle: "Malbuch für Kinder von 1 bis 3 Jahren",
      head: {
        top: "Malbuch für Kinder von 1 bis 3 Jahren",
        title: "Erste Wörter auf Englisch",
        bottom:
          "111 große Zeichnungen mit dicken Konturen. Unter jedem Bild ein englisches Wort.",
      },
      lead: [
        "Einfache Malbilder mit klaren Wörtern auf Englisch.",
        "Keine langen Texte, keine Grammatik, keine Sprachbarriere. Im Buch gibt es nur große Zeichnungen, dicke Konturen für die Kleinsten und ein einziges deutliches Wort unter jedem Bild.",
        "Geeignet sowohl für den ersten Kontakt mit der Sprache als auch für ein Kind, das sie zu Hause jeden Tag hört. Ihr Kind kann vertraute Bilder allein oder zusammen mit den Eltern ausmalen und dabei eine fröhliche und interessante Zeit verbringen.",
      ],
      forWhom:
        "Für Kinder von einem bis drei Jahren. Das Kind sieht das Bild und das Wort darunter. Es malt beides aus. Lesen muss es dafür nicht.",
      inside: [
        "111 Zeichnungen, von professionellen Illustratoren von Hand gezeichnet",
        "Dicke Konturen und große Formen: Auch wenn Ihr Kind noch oft über den Rand malt, kommt es damit gut zurecht",
        "Eine Zeichnung pro Seite, einseitig bedruckt: Der Filzstift verdirbt nicht das nächste Bild",
        "Das Wort unter jeder Zeichnung lässt sich ebenfalls ausmalen",
        "Jede Zeichnung ist in der Mitte der Seite platziert: praktisch für Links- und Rechtshänder",
        "Tiere, Meerestiere, Märchenfiguren, Fahrzeuge, Blumen und Essen",
        "Am Anfang des Buches eine Seite, auf der das Kind seinen Namen schreibt",
        "114 Seiten, Format 21,6 x 27,9 cm",
      ],
      parents: [
        "Das Kind malt ein Bild von selbst zu Ende und blättert zum nächsten weiter",
        "Die großen, einfachen Bilder lassen sich fast mühelos ausmalen, und das Kind gewinnt mehr Vertrauen in die eigene Hand",
        "Ein Buch reicht für eine lange Fahrt, für das Wartezimmer und für einen Regentag",
        "Das Buch ist leicht und lässt sich einfach mitnehmen",
        "Kinder blättern darin sogar ohne Stifte und fragen, wie jedes Tier heißt",
        "Man kauft es für das jüngste Kind in der Familie, wenn die älteren schon schwierigere Malbücher brauchen",
      ],
      rating: "Die englische Ausgabe hat bei Amazon 5,0 von 5.",
      critic:
        "Readers' Favorite hat dem Buch fünf Sterne gegeben und dabei die dicke, abgerundete Kontur und die Platzierung der Zeichnung in der Mitte der Seite hervorgehoben.",
      faq: [
        {
          q: "Ist ein Jahr nicht zu früh?",
          a: "Nein. Die Zeichnungen sind bewusst einfach für die Jüngsten gemacht. Ein einjähriges Kind kritzelt über das Bild, ein dreijähriges beginnt, innerhalb der Kontur zu bleiben. Ein Buch reicht für alle drei Jahre.",
        },
        {
          q: "Mein Kind kann diese Sprache nicht, wird es zu schwer?",
          a: "Nein. Es malt das Bild aus, und das Wort darunter sieht es einfach daneben. Keine Aufgaben und kein Lesen.",
        },
        {
          q: "Worin unterscheiden sich die beiden Ausgaben?",
          a: "Nur in der Sprache des Wortes unter der Zeichnung. Zeichnungen, Papier, Format und Reihenfolge der Seiten sind gleich.",
        },
        {
          q: "Der Filzstift geht durch das Papier, was tun?",
          a: "Legen Sie ein zusätzliches Blatt unter die Seite. Das Buch ist nur einseitig bedruckt, deshalb bleibt der Abdruck auf der leeren Rückseite und nicht auf dem nächsten Bild.",
        },
      ],
      pair: "Dasselbe Buch mit spanischen Wörtern unter den Zeichnungen:",
      pairCta: "Erste Wörter auf Spanisch",
      metaTitle: "Erste Wörter auf Englisch - Malbuch für Kinder 1-3 Jahre",
      metaDescription:
        "111 große Zeichnungen mit dicken Konturen, eine pro Seite, mit einem englischen Wort darunter, das sich ebenfalls ausmalen lässt. Für Kinder von 1 bis 3 Jahren.",
      altCover: "Cover des Malbuchs mit englischen Wörtern, mit einem Löwen",
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
        top: "Malbuch für Kinder von 1 bis 3 Jahren",
        title: "Erste Wörter auf Spanisch",
        bottom:
          "111 große Zeichnungen mit dicken Konturen. Unter jedem Bild ein spanisches Wort.",
      },
      lead: [
        "Einfache Malbilder mit klaren Wörtern auf Spanisch.",
        "Keine langen Texte, keine Grammatik, keine Sprachbarriere. Im Buch gibt es nur große Zeichnungen, dicke Konturen für die Kleinsten und ein einziges deutliches Wort unter jedem Bild.",
        "Geeignet sowohl für den ersten Kontakt mit der Sprache als auch für ein Kind, das sie zu Hause jeden Tag hört. Ihr Kind kann vertraute Bilder allein oder zusammen mit den Eltern ausmalen und dabei eine fröhliche und interessante Zeit verbringen.",
      ],
      forWhom:
        "Für Kinder von einem bis drei Jahren. Das Kind sieht das Bild und das Wort darunter. Es malt beides aus. Lesen muss es dafür nicht.",
      inside: [
        "111 Zeichnungen, von professionellen Illustratoren von Hand gezeichnet",
        "Dicke Konturen und große Formen: Auch wenn Ihr Kind noch oft über den Rand malt, kommt es damit gut zurecht",
        "Eine Zeichnung pro Seite, einseitig bedruckt: Der Filzstift verdirbt nicht das nächste Bild",
        "Das Wort unter jeder Zeichnung lässt sich ebenfalls ausmalen",
        "Jede Zeichnung ist in der Mitte der Seite platziert: praktisch für Links- und Rechtshänder",
        "Tiere, Meerestiere, Märchenfiguren, Fahrzeuge, Blumen und Essen",
        "Am Anfang des Buches eine Seite, auf der das Kind seinen Namen schreibt",
        "114 Seiten, Format 21,6 x 27,9 cm",
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
        "Die spanische Ausgabe hat bei Amazon 4,9 von 5. Die Zeichnungen sind in beiden Ausgaben dieselben.",
      critic:
        "Readers' Favorite hat dem Buch fünf Sterne gegeben und dabei die dicke, abgerundete Kontur und die Platzierung der Zeichnung in der Mitte der Seite hervorgehoben.",
      faq: [
        {
          q: "Ist ein Jahr nicht zu früh?",
          a: "Nein. Die Zeichnungen sind bewusst einfach für die Jüngsten gemacht. Ein einjähriges Kind kritzelt über das Bild, ein dreijähriges beginnt, innerhalb der Kontur zu bleiben. Ein Buch reicht für alle drei Jahre.",
        },
        {
          q: "Mein Kind kann diese Sprache nicht, wird es zu schwer?",
          a: "Nein. Es malt das Bild aus, und das Wort darunter sieht es einfach daneben. Keine Aufgaben und kein Lesen.",
        },
        {
          q: "Worin unterscheiden sich die beiden Ausgaben?",
          a: "Nur in der Sprache des Wortes unter der Zeichnung. Zeichnungen, Papier, Format und Reihenfolge der Seiten sind gleich.",
        },
        {
          q: "Der Filzstift geht durch das Papier, was tun?",
          a: "Legen Sie ein zusätzliches Blatt unter die Seite. Das Buch ist nur einseitig bedruckt, deshalb bleibt der Abdruck auf der leeren Rückseite und nicht auf dem nächsten Bild.",
        },
      ],
      pair: "Dasselbe Buch mit englischen Wörtern unter den Zeichnungen:",
      pairCta: "Erste Wörter auf Englisch",
      metaTitle: "Erste Wörter auf Spanisch - Malbuch für Kinder 1-3 Jahre",
      metaDescription:
        "111 große Zeichnungen mit dicken Konturen, eine pro Seite, mit einem spanischen Wort darunter, das sich ebenfalls ausmalen lässt. Für Kinder von 1 bis 3 Jahren.",
      altCover: "Cover des Malbuchs mit spanischen Wörtern, mit einem Löwen",
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
  fr: {
    en: {
      title: "Premiers mots en anglais",
      subtitle: "Livre de coloriage pour enfants de 1 à 3 ans",
      head: {
        top: "Livre de coloriage pour enfants de 1 à 3 ans",
        title: "Premiers mots en anglais",
        bottom:
          "111 grands dessins aux contours épais. Sous chaque image, un mot en anglais.",
      },
      lead: [
        "Des coloriages simples avec des mots clairs en anglais.",
        "Pas de textes longs, pas de grammaire, pas de barrière de la langue. À l'intérieur, uniquement de grands dessins, des contours épais pour les tout-petits et un seul mot bien net sous chaque image.",
        "Convient aussi bien à un premier contact avec la langue qu'à un enfant qui l'entend tous les jours à la maison. Votre enfant peut colorier des images familières seul ou avec ses parents et passer ainsi un moment agréable et amusant.",
      ],
      forWhom:
        "Pour les enfants de 1 à 3 ans. L'enfant voit l'image et le mot en dessous. Il colorie l'un et l'autre. Il n'a pas besoin de savoir lire.",
      inside: [
        "111 dessins, réalisés à la main par des illustrateurs professionnels",
        "Contours épais et grandes formes : même si votre enfant dépasse encore souvent, il colorie sans difficulté",
        "Un dessin par page, impression sur une seule face : le feutre n'abîme pas le dessin suivant",
        "Le mot sous chaque dessin se colorie aussi",
        "Chaque dessin est placé au centre de la feuille : pratique pour un gaucher comme pour un droitier",
        "Animaux, animaux marins, personnages de contes, véhicules, fleurs et nourriture",
        "Au début du livre, une page où l'enfant écrit son prénom",
        "114 pages, format 21,6 x 27,9 cm",
      ],
      parents: [
        "L'enfant termine son dessin tout seul et tourne la page pour le suivant",
        "Les grandes images simples se colorient presque sans effort, et l'enfant prend confiance en son geste",
        "Un seul livre suffit pour un long trajet, une attente ou un jour de pluie",
        "Le livre est léger, on l'emporte facilement avec soi",
        "Les enfants le feuillettent même sans crayons et demandent le nom de chaque animal",
        "On l'achète pour le plus jeune de la famille, quand les aînés ont déjà besoin de coloriages plus difficiles",
      ],
      rating: "L'édition en anglais est notée 5,0 sur 5 sur Amazon.",
      critic:
        "Readers' Favorite a attribué cinq étoiles au livre et a souligné le contour épais et arrondi ainsi que le dessin placé au centre de la page.",
      faq: [
        {
          q: "Un an, n'est-ce pas trop tôt ?",
          a: "Non. Les dessins ont été volontairement conçus pour être simples et adaptés aux plus jeunes. À un an, l'enfant gribouille par-dessus le dessin ; à trois ans, il commence à rester à l'intérieur du contour. Un seul livre suffit pour ces trois années.",
        },
        {
          q: "Mon enfant ne connaît pas cette langue, est-ce que ce sera difficile ?",
          a: "Non. Il colorie l'image, et le mot en dessous, il le voit simplement à côté. Aucun exercice et aucune lecture.",
        },
        {
          q: "Quelle est la différence entre les deux éditions ?",
          a: "Uniquement la langue du mot sous le dessin. Les dessins, le papier, le format et l'ordre des pages sont identiques.",
        },
        {
          q: "Le feutre traverse le papier, que faire ?",
          a: "Glissez une feuille supplémentaire sous la page. Le livre est imprimé sur une seule face, la trace reste donc sur le verso vierge et non sur le dessin suivant.",
        },
      ],
      pair: "Le même livre avec les mots en espagnol sous les dessins :",
      pairCta: "Premiers mots en espagnol",
      metaTitle: "Premiers mots en anglais - Coloriage 1 à 3 ans",
      metaDescription:
        "111 grands dessins aux contours épais, un par page, avec sous chaque image un mot en anglais qui se colorie aussi. Pour les enfants de 1 à 3 ans.",
      altCover: "Couverture du livre de coloriage avec les mots en anglais, avec un lion",
      altBannerLead:
        "First Coloring Book For Toddlers de Ricardo Demi, couverture avec un lion, de 1 à 3 ans",
      altArt: [
        "Simple : une tortue au contour épais, un seul motif sur la page",
        "Grand : une vache qui remplit presque toute la feuille, coloriée par un jeune enfant",
        "Familier : une voiture rouge souriante, un des objets du quotidien du livre",
      ],
      altGift: "Un cadeau pour les petits débutants : un donut et des crayons de couleur",
    },
    es: {
      title: "Premiers mots en espagnol",
      subtitle: "Livre de coloriage pour enfants de 1 à 3 ans",
      head: {
        top: "Livre de coloriage pour enfants de 1 à 3 ans",
        title: "Premiers mots en espagnol",
        bottom:
          "111 grands dessins aux contours épais. Sous chaque image, un mot en espagnol.",
      },
      lead: [
        "Des coloriages simples avec des mots clairs en espagnol.",
        "Pas de textes longs, pas de grammaire, pas de barrière de la langue. À l'intérieur, uniquement de grands dessins, des contours épais pour les tout-petits et un seul mot bien net sous chaque image.",
        "Convient aussi bien à un premier contact avec la langue qu'à un enfant qui l'entend tous les jours à la maison. Votre enfant peut colorier des images familières seul ou avec ses parents et passer ainsi un moment agréable et amusant.",
      ],
      forWhom:
        "Pour les enfants de 1 à 3 ans. L'enfant voit l'image et le mot en dessous. Il colorie l'un et l'autre. Il n'a pas besoin de savoir lire.",
      inside: [
        "111 dessins, réalisés à la main par des illustrateurs professionnels",
        "Contours épais et grandes formes : même si votre enfant dépasse encore souvent, il colorie sans difficulté",
        "Un dessin par page, impression sur une seule face : le feutre n'abîme pas le dessin suivant",
        "Le mot sous chaque dessin se colorie aussi",
        "Chaque dessin est placé au centre de la feuille : pratique pour un gaucher comme pour un droitier",
        "Animaux, animaux marins, personnages de contes, véhicules, fleurs et nourriture",
        "Au début du livre, une page où l'enfant écrit son prénom",
        "114 pages, format 21,6 x 27,9 cm",
      ],
      parents: [
        "L'enfant termine son dessin tout seul et tourne la page pour le suivant",
        "Les grandes images simples se colorient presque sans effort, et l'enfant prend confiance en son geste",
        "Un seul livre suffit pour un long trajet, une attente ou un jour de pluie",
        "Le livre est léger, on l'emporte facilement avec soi",
        "Les enfants le feuillettent même sans crayons et demandent le nom de chaque animal",
        "On l'achète pour le plus jeune de la famille, quand les aînés ont déjà besoin de coloriages plus difficiles",
      ],
      rating:
        "L'édition en espagnol est notée 4,9 sur 5 sur Amazon. Les dessins sont les mêmes dans les deux éditions.",
      critic:
        "Readers' Favorite a attribué cinq étoiles au livre et a souligné le contour épais et arrondi ainsi que le dessin placé au centre de la page.",
      faq: [
        {
          q: "Un an, n'est-ce pas trop tôt ?",
          a: "Non. Les dessins ont été volontairement conçus pour être simples et adaptés aux plus jeunes. À un an, l'enfant gribouille par-dessus le dessin ; à trois ans, il commence à rester à l'intérieur du contour. Un seul livre suffit pour ces trois années.",
        },
        {
          q: "Mon enfant ne connaît pas cette langue, est-ce que ce sera difficile ?",
          a: "Non. Il colorie l'image, et le mot en dessous, il le voit simplement à côté. Aucun exercice et aucune lecture.",
        },
        {
          q: "Quelle est la différence entre les deux éditions ?",
          a: "Uniquement la langue du mot sous le dessin. Les dessins, le papier, le format et l'ordre des pages sont identiques.",
        },
        {
          q: "Le feutre traverse le papier, que faire ?",
          a: "Glissez une feuille supplémentaire sous la page. Le livre est imprimé sur une seule face, la trace reste donc sur le verso vierge et non sur le dessin suivant.",
        },
      ],
      pair: "Le même livre avec les mots en anglais sous les dessins :",
      pairCta: "Premiers mots en anglais",
      metaTitle: "Premiers mots en espagnol - Coloriage 1 à 3 ans",
      metaDescription:
        "111 grands dessins aux contours épais, un par page, avec sous chaque image un mot en espagnol qui se colorie aussi. Pour les enfants de 1 à 3 ans.",
      altCover: "Couverture du livre de coloriage avec les mots en espagnol, avec un lion",
      altBannerLead:
        "El Primer Libro de Colorear para Bebés de Ricardo Demi, couverture avec un lion, de 1 à 3 ans",
      altArt: [
        "Simple : une tortue au contour épais, un seul motif sur la page",
        "Grand : une vache qui remplit presque toute la feuille, coloriée par un jeune enfant",
        "Familier : une voiture rouge souriante, un des objets du quotidien du livre",
      ],
      altGift: "Un cadeau pour les petits débutants : un donut et des crayons de couleur",
    },
  },

  /* --------------------------- ГОЛЛАНДСКИЙ -------------------------- */
  nl: {
    en: {
      title: "Eerste woorden in het Engels",
      subtitle: "Kleurboek voor kinderen van 1 tot 3 jaar",
      head: {
        top: "Kleurboek voor kinderen van 1 tot 3 jaar",
        title: "Eerste woorden in het Engels",
        bottom:
          "111 grote tekeningen met dikke contouren. Onder elke afbeelding een Engels woord.",
      },
      lead: [
        "Eenvoudige kleurplaten met duidelijke woorden in het Engels.",
        "Geen lange teksten, geen grammatica, geen taalbarrière. Binnenin staan alleen grote tekeningen, dikke contouren voor de allerkleinsten en één duidelijk woord onder elke afbeelding.",
        "Geschikt voor een eerste kennismaking met de taal, maar ook voor een kind dat de taal thuis elke dag hoort. Uw kind kan vertrouwde plaatjes zelf inkleuren of samen met de ouders en zo op een leuke en boeiende manier bezig zijn.",
      ],
      forWhom:
        "Voor kinderen van één tot drie jaar. Het kind ziet de tekening en het woord eronder. Het kleurt allebei in. Lezen is daarvoor niet nodig.",
      inside: [
        "111 tekeningen, met de hand gemaakt door professionele illustratoren",
        "Dikke contouren en grote vormen: ook als uw kind nog vaak buiten de lijnen kleurt, gaat het inkleuren gemakkelijk",
        "Eén tekening per pagina, enkelzijdig gedrukt: de stift drukt niet door op de volgende tekening",
        "Het woord onder elke tekening kan ook worden ingekleurd",
        "Elke tekening staat midden op het blad: handig voor zowel links- als rechtshandige kinderen",
        "Dieren, zeedieren, sprookjesfiguren, voertuigen, bloemen en eten",
        "Voorin het boek een pagina waar het kind zijn naam schrijft",
        "114 pagina's, formaat 21,6 x 27,9 cm",
      ],
      parents: [
        "Het kind maakt een tekening zelf af en bladert door naar de volgende",
        "De grote, eenvoudige plaatjes zijn bijna moeiteloos in te kleuren, en het kind krijgt steeds meer vertrouwen in zijn eigen bewegingen",
        "Eén boek is genoeg voor een lange rit, voor de wachtkamer en voor een regendag",
        "Het boek is licht en gemakkelijk mee te nemen",
        "Kinderen bladeren erin zelfs zonder potloden en vragen hoe elk dier heet",
        "Het wordt gekocht voor de jongste in het gezin, wanneer de oudere kinderen al moeilijkere kleurboeken nodig hebben",
      ],
      rating: "De Engelse editie heeft op Amazon 5,0 van de 5.",
      critic:
        "Readers' Favorite gaf het boek vijf sterren en noemde daarbij de dikke, afgeronde contour en de plaatsing van de tekening midden op de pagina.",
      faq: [
        {
          q: "Is één jaar niet te vroeg?",
          a: "Nee. De tekeningen zijn met opzet eenvoudig gemaakt voor de allerjongsten. Een kind van één krabbelt over de tekening heen, een kind van drie begint binnen de contour te blijven. Eén boek is genoeg voor alle drie de jaren.",
        },
        {
          q: "Mijn kind kent deze taal niet, wordt het dan te moeilijk?",
          a: "Nee. Het kleurt de tekening in, en het woord eronder ziet het gewoon ernaast staan. Geen opdrachten en geen lezen.",
        },
        {
          q: "Wat is het verschil tussen de twee edities?",
          a: "Alleen de taal van het woord onder de tekening. De tekeningen, het papier, het formaat en de volgorde van de pagina's zijn hetzelfde.",
        },
        {
          q: "De stift gaat door het papier heen, wat nu?",
          a: "Leg een extra vel onder de pagina. Het boek is enkelzijdig gedrukt, dus de vlek blijft op de lege achterkant en niet op de volgende tekening.",
        },
      ],
      pair: "Hetzelfde boek met Spaanse woorden onder de tekeningen:",
      pairCta: "Eerste woorden in het Spaans",
      metaTitle: "Eerste woorden Engels - Kleurboek voor kinderen 1-3 jaar",
      metaDescription:
        "111 grote tekeningen met dikke contouren, één per pagina, met daaronder een Engels woord dat ook ingekleurd kan worden. Voor kinderen van 1 tot 3 jaar.",
      altCover: "Omslag van het kleurboek met Engelse woorden, met een leeuw",
      altBannerLead:
        "First Coloring Book For Toddlers van Ricardo Demi, omslag met een leeuw, van 1 tot 3 jaar",
      altArt: [
        "Eenvoudig: een schildpad met dikke contour, één motief op de pagina",
        "Groot: een koe die bijna het hele blad vult, ingekleurd door een klein kind",
        "Vertrouwd: een lachende rode auto, een van de alledaagse dingen in het boek",
      ],
      altGift: "Een cadeau voor kleine beginners: een donut en kleurpotloden",
    },
    es: {
      title: "Eerste woorden in het Spaans",
      subtitle: "Kleurboek voor kinderen van 1 tot 3 jaar",
      head: {
        top: "Kleurboek voor kinderen van 1 tot 3 jaar",
        title: "Eerste woorden in het Spaans",
        bottom:
          "111 grote tekeningen met dikke contouren. Onder elke afbeelding een Spaans woord.",
      },
      lead: [
        "Eenvoudige kleurplaten met duidelijke woorden in het Spaans.",
        "Geen lange teksten, geen grammatica, geen taalbarrière. Binnenin staan alleen grote tekeningen, dikke contouren voor de allerkleinsten en één duidelijk woord onder elke afbeelding.",
        "Geschikt voor een eerste kennismaking met de taal, maar ook voor een kind dat de taal thuis elke dag hoort. Uw kind kan vertrouwde plaatjes zelf inkleuren of samen met de ouders en zo op een leuke en boeiende manier bezig zijn.",
      ],
      forWhom:
        "Voor kinderen van één tot drie jaar. Het kind ziet de tekening en het woord eronder. Het kleurt allebei in. Lezen is daarvoor niet nodig.",
      inside: [
        "111 tekeningen, met de hand gemaakt door professionele illustratoren",
        "Dikke contouren en grote vormen: ook als uw kind nog vaak buiten de lijnen kleurt, gaat het inkleuren gemakkelijk",
        "Eén tekening per pagina, enkelzijdig gedrukt: de stift drukt niet door op de volgende tekening",
        "Het woord onder elke tekening kan ook worden ingekleurd",
        "Elke tekening staat midden op het blad: handig voor zowel links- als rechtshandige kinderen",
        "Dieren, zeedieren, sprookjesfiguren, voertuigen, bloemen en eten",
        "Voorin het boek een pagina waar het kind zijn naam schrijft",
        "114 pagina's, formaat 21,6 x 27,9 cm",
      ],
      parents: [
        "Het kind maakt een tekening zelf af en bladert door naar de volgende",
        "De grote, eenvoudige plaatjes zijn bijna moeiteloos in te kleuren, en het kind krijgt steeds meer vertrouwen in zijn eigen bewegingen",
        "Eén boek is genoeg voor een lange rit, voor de wachtkamer en voor een regendag",
        "Het boek is licht en gemakkelijk mee te nemen",
        "Kinderen bladeren erin zelfs zonder potloden en vragen hoe elk dier heet",
        "Het wordt gekocht voor de jongste in het gezin, wanneer de oudere kinderen al moeilijkere kleurboeken nodig hebben",
      ],
      rating:
        "De Spaanse editie heeft op Amazon 4,9 van de 5. De tekeningen zijn in beide edities dezelfde.",
      critic:
        "Readers' Favorite gaf het boek vijf sterren en noemde daarbij de dikke, afgeronde contour en de plaatsing van de tekening midden op de pagina.",
      faq: [
        {
          q: "Is één jaar niet te vroeg?",
          a: "Nee. De tekeningen zijn met opzet eenvoudig gemaakt voor de allerjongsten. Een kind van één krabbelt over de tekening heen, een kind van drie begint binnen de contour te blijven. Eén boek is genoeg voor alle drie de jaren.",
        },
        {
          q: "Mijn kind kent deze taal niet, wordt het dan te moeilijk?",
          a: "Nee. Het kleurt de tekening in, en het woord eronder ziet het gewoon ernaast staan. Geen opdrachten en geen lezen.",
        },
        {
          q: "Wat is het verschil tussen de twee edities?",
          a: "Alleen de taal van het woord onder de tekening. De tekeningen, het papier, het formaat en de volgorde van de pagina's zijn hetzelfde.",
        },
        {
          q: "De stift gaat door het papier heen, wat nu?",
          a: "Leg een extra vel onder de pagina. Het boek is enkelzijdig gedrukt, dus de vlek blijft op de lege achterkant en niet op de volgende tekening.",
        },
      ],
      pair: "Hetzelfde boek met Engelse woorden onder de tekeningen:",
      pairCta: "Eerste woorden in het Engels",
      metaTitle: "Eerste woorden Spaans - Kleurboek voor kinderen 1-3 jaar",
      metaDescription:
        "111 grote tekeningen met dikke contouren, één per pagina, met daaronder een Spaans woord dat ook ingekleurd kan worden. Voor kinderen van 1 tot 3 jaar.",
      altCover: "Omslag van het kleurboek met Spaanse woorden, met een leeuw",
      altBannerLead:
        "El Primer Libro de Colorear para Bebés van Ricardo Demi, omslag met een leeuw, van 1 tot 3 jaar",
      altArt: [
        "Eenvoudig: een schildpad met dikke contour, één motief op de pagina",
        "Groot: een koe die bijna het hele blad vult, ingekleurd door een klein kind",
        "Vertrouwd: een lachende rode auto, een van de alledaagse dingen in het boek",
      ],
      altGift: "Een cadeau voor kleine beginners: een donut en kleurpotloden",
    },
  },

  /* ---------------------------- ПОЛЬСКИЙ ---------------------------- */
  pl: {
    en: {
      title: "Pierwsze słowa po angielsku",
      subtitle: "Kolorowanka dla dzieci od 1 do 3 lat",
      head: {
        top: "Kolorowanka dla dzieci od 1 do 3 lat",
        title: "Pierwsze słowa po angielsku",
        bottom:
          "111 dużych rysunków z grubym konturem. Pod każdym obrazkiem słowo po angielsku.",
      },
      lead: [
        "Proste kolorowanki z wyraźnymi słowami po angielsku.",
        "Bez długich tekstów, bez gramatyki, bez bariery językowej. W środku są tylko duże rysunki, grube kontury dla najmłodszych i jedno wyraźne słowo pod każdym obrazkiem.",
        "Sprawdzi się zarówno przy pierwszym kontakcie z językiem, jak i w przypadku dziecka, które słyszy go w domu codziennie. Dziecko może kolorować znajome obrazki samo albo razem z rodzicami, spędzając czas wesoło i ciekawie.",
      ],
      forWhom:
        "Dla dzieci od roku do trzech lat. Dziecko widzi obrazek i słowo pod nim. Koloruje jedno i drugie. Nie musi do tego umieć czytać.",
      inside: [
        "111 rysunków, wykonanych ręcznie przez zawodowych ilustratorów",
        "Gruby kontur i duże kształty: nawet jeśli dziecko wciąż często wychodzi poza kontur, nadal łatwo mu się koloruje",
        "Jeden rysunek na stronie, druk tylko po jednej stronie: flamaster nie zniszczy następnego rysunku",
        "Słowo pod każdym rysunkiem też można pokolorować",
        "Każdy rysunek jest na środku kartki: wygodnie zarówno dla dzieci leworęcznych, jak i praworęcznych",
        "Zwierzęta, zwierzęta morskie, postacie z bajek, pojazdy, kwiaty i jedzenie",
        "Na początku książki strona, na której dziecko pisze swoje imię",
        "114 stron, format 21,6 x 27,9 cm",
      ],
      parents: [
        "Dziecko samo kończy rysunek i przewraca kartkę po następny",
        "Duże, proste obrazki można kolorować niemal bez wysiłku, a dziecko nabiera pewności ręki",
        "Jedna książka wystarcza na długą podróż, na czekanie w kolejce i na deszczowy dzień",
        "Książka jest lekka i łatwo ją zabrać ze sobą",
        "Dzieci przeglądają ją nawet bez kredek i pytają, jak nazywa się każde zwierzę",
        "Kupuje się ją dla najmłodszego w rodzinie, kiedy starsze potrzebują już trudniejszych kolorowanek",
      ],
      rating: "Wydanie angielskie ma na Amazonie ocenę 5,0 na 5.",
      critic:
        "Readers' Favorite przyznał książce pięć gwiazdek i zwrócił uwagę na gruby, zaokrąglony kontur oraz umieszczenie rysunku na środku strony.",
      faq: [
        {
          q: "Czy rok to nie za wcześnie?",
          a: "Nie. Rysunki są celowo zrobione proste, z myślą o najmłodszych. Roczne dziecko będzie bazgrać po rysunku, trzyletnie zacznie trafiać w kontur. Jedna książka wystarcza na wszystkie trzy lata.",
        },
        {
          q: "Dziecko nie zna tego języka, czy nie będzie mu trudno?",
          a: "Nie będzie. Koloruje obrazek, a słowo pod nim po prostu widzi obok. Żadnych zadań i żadnego czytania.",
        },
        {
          q: "Czym różnią się dwa wydania?",
          a: "Tylko językiem słowa pod rysunkiem. Rysunki, papier, format i kolejność stron są takie same.",
        },
        {
          q: "Flamaster przebija papier, co robić?",
          a: "Podłóż pod stronę zapasową kartkę. W książce druk jest tylko po jednej stronie, więc ślad zostanie na pustym odwrocie, a nie na następnym rysunku.",
        },
      ],
      pair: "Ta sama książka ze słowami po hiszpańsku pod rysunkami:",
      pairCta: "Pierwsze słowa po hiszpańsku",
      metaTitle: "Pierwsze słowa po angielsku - Kolorowanka 1-3 lata",
      metaDescription:
        "111 dużych rysunków z grubym konturem, jeden na stronie, a pod każdym słowo po angielsku, które też można pokolorować. Dla dzieci od 1 do 3 lat.",
      altCover: "Okładka kolorowanki ze słowami po angielsku, z lwem",
      altBannerLead:
        "First Coloring Book For Toddlers autorstwa Ricardo Demi, okładka z lwem, od 1 do 3 lat",
      altArt: [
        "Prosto: żółw z grubym konturem, jeden motyw na stronie",
        "Duże: krowa zajmująca niemal całą kartkę, pokolorowana przez małe dziecko",
        "Znajomo: uśmiechnięty czerwony samochód, jeden z codziennych przedmiotów w książce",
      ],
      altGift: "Prezent dla małych początkujących: pączek i kredki",
    },
    es: {
      title: "Pierwsze słowa po hiszpańsku",
      subtitle: "Kolorowanka dla dzieci od 1 do 3 lat",
      head: {
        top: "Kolorowanka dla dzieci od 1 do 3 lat",
        title: "Pierwsze słowa po hiszpańsku",
        bottom:
          "111 dużych rysunków z grubym konturem. Pod każdym obrazkiem słowo po hiszpańsku.",
      },
      lead: [
        "Proste kolorowanki z wyraźnymi słowami po hiszpańsku.",
        "Bez długich tekstów, bez gramatyki, bez bariery językowej. W środku są tylko duże rysunki, grube kontury dla najmłodszych i jedno wyraźne słowo pod każdym obrazkiem.",
        "Sprawdzi się zarówno przy pierwszym kontakcie z językiem, jak i w przypadku dziecka, które słyszy go w domu codziennie. Dziecko może kolorować znajome obrazki samo albo razem z rodzicami, spędzając czas wesoło i ciekawie.",
      ],
      forWhom:
        "Dla dzieci od roku do trzech lat. Dziecko widzi obrazek i słowo pod nim. Koloruje jedno i drugie. Nie musi do tego umieć czytać.",
      inside: [
        "111 rysunków, wykonanych ręcznie przez zawodowych ilustratorów",
        "Gruby kontur i duże kształty: nawet jeśli dziecko wciąż często wychodzi poza kontur, nadal łatwo mu się koloruje",
        "Jeden rysunek na stronie, druk tylko po jednej stronie: flamaster nie zniszczy następnego rysunku",
        "Słowo pod każdym rysunkiem też można pokolorować",
        "Każdy rysunek jest na środku kartki: wygodnie zarówno dla dzieci leworęcznych, jak i praworęcznych",
        "Zwierzęta, zwierzęta morskie, postacie z bajek, pojazdy, kwiaty i jedzenie",
        "Na początku książki strona, na której dziecko pisze swoje imię",
        "114 stron, format 21,6 x 27,9 cm",
      ],
      parents: [
        "Dziecko samo kończy rysunek i przewraca kartkę po następny",
        "Duże, proste obrazki można kolorować niemal bez wysiłku, a dziecko nabiera pewności ręki",
        "Jedna książka wystarcza na długą podróż, na czekanie w kolejce i na deszczowy dzień",
        "Książka jest lekka i łatwo ją zabrać ze sobą",
        "Dzieci przeglądają ją nawet bez kredek i pytają, jak nazywa się każde zwierzę",
        "Kupuje się ją dla najmłodszego w rodzinie, kiedy starsze potrzebują już trudniejszych kolorowanek",
      ],
      rating:
        "Wydanie hiszpańskie ma na Amazonie ocenę 4,9 na 5. Rysunki w obu wydaniach są te same.",
      critic:
        "Readers' Favorite przyznał książce pięć gwiazdek i zwrócił uwagę na gruby, zaokrąglony kontur oraz umieszczenie rysunku na środku strony.",
      faq: [
        {
          q: "Czy rok to nie za wcześnie?",
          a: "Nie. Rysunki są celowo zrobione proste, z myślą o najmłodszych. Roczne dziecko będzie bazgrać po rysunku, trzyletnie zacznie trafiać w kontur. Jedna książka wystarcza na wszystkie trzy lata.",
        },
        {
          q: "Dziecko nie zna tego języka, czy nie będzie mu trudno?",
          a: "Nie będzie. Koloruje obrazek, a słowo pod nim po prostu widzi obok. Żadnych zadań i żadnego czytania.",
        },
        {
          q: "Czym różnią się dwa wydania?",
          a: "Tylko językiem słowa pod rysunkiem. Rysunki, papier, format i kolejność stron są takie same.",
        },
        {
          q: "Flamaster przebija papier, co robić?",
          a: "Podłóż pod stronę zapasową kartkę. W książce druk jest tylko po jednej stronie, więc ślad zostanie na pustym odwrocie, a nie na następnym rysunku.",
        },
      ],
      pair: "Ta sama książka ze słowami po angielsku pod rysunkami:",
      pairCta: "Pierwsze słowa po angielsku",
      metaTitle: "Pierwsze słowa po hiszpańsku - Kolorowanka 1-3 lata",
      metaDescription:
        "111 dużych rysunków z grubym konturem, jeden na stronie, a pod każdym słowo po hiszpańsku, które też można pokolorować. Dla dzieci od 1 do 3 lat.",
      altCover: "Okładka kolorowanki ze słowami po hiszpańsku, z lwem",
      altBannerLead:
        "El Primer Libro de Colorear para Bebés autorstwa Ricardo Demi, okładka z lwem, od 1 do 3 lat",
      altArt: [
        "Prosto: żółw z grubym konturem, jeden motyw na stronie",
        "Duże: krowa zajmująca niemal całą kartkę, pokolorowana przez małe dziecko",
        "Znajomo: uśmiechnięty czerwony samochód, jeden z codziennych przedmiotów w książce",
      ],
      altGift: "Prezent dla małych początkujących: pączek i kredki",
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

/** Все восемь страниц одним списком: для карты сайта и сборки. */
export const euroPages = euroLangs.flatMap((lang) =>
  editionLangs.map((ed) => ({ lang, ed, path: euroPath(lang, ed) }))
);
