import type { EuroLang, EditionLang } from "./euro";

/* ==================================================================
   Восемь страниц бесплатной печати для четырех рынков.

   Германия, Франция, Голландия, Польша, по две страницы на страну:
   одна с английскими листами, одна с испанскими.

   Зачем они есть. Человек ищет "распечатать раскраски бесплатно".
   Такой запрос набирают чаще, чем ищут книгу, и Amazon на нем
   не стоит на пути. Страница дает ровно то, что человек искал:
   десять настоящих листов, сразу, без регистрации. Он печатает,
   ребенок раскрашивает, человек видит, что листы со словами и что
   это часть книги. Если понравилось, он идет за книгой сам.

   Испания и Канада сюда не входят. Там язык страницы испанский
   и английский, а такие страницы на сайте уже есть в основном
   разделе.

   Продавать здесь ничего не надо. Продажа случится на торговой
   странице, куда ведут три ссылки: строка над заголовком, первый
   абзац и блок внизу. Больше ставить нельзя: страница начнет
   читаться как реклама, и человек, пришедший за бесплатным листом,
   уйдет.

   Ссылка всегда ведет на торговую страницу той же страны и того же
   издания. Немецкая страница с английскими листами ведет на немецкую
   торговую про английскую книгу, с испанскими на немецкую про
   испанскую. Перепутать нельзя: человек попадет не на ту книгу.

   Ни одного утверждения о пользе для развития здесь нет и быть
   не должно. Только проверяемое: рисунки крупные, контур толстый,
   слово контурными буквами, печать с одной стороны.

   hreflang здесь не ставится, как и на торговых страницах: это
   не переводы друг друга, а разные материалы для разных стран.

   Тексты написаны на каждом языке отдельно и проверены сторонними
   носителями языка. Владелец утверждает русский смысл, иностранный
   текст проверяют другие люди. Менять эти строки без такой проверки
   нельзя.
   ================================================================== */

export type FreeCopy = {
  /** Три строки наверху страницы: мелкая, крупная, пояснение. */
  head: { top: string; title: string; bottom: string };
  /** Три абзаца. В первом стоит ссылка на книгу. */
  lead: [string, string, string];
  /** Надпись самой ссылки в первом абзаце и на кнопке внизу. */
  bookLink: string;
  /** Заголовок блока с десятью листами. */
  sheetsTitle: string;
  /** Подпись под каждым листом. Имя зверя подставляется на языке
      страны, оно лежит в euroUi[lang].animals. */
  sheetCaption: (name: string) => string;
  /** Кнопка под всеми листами: один файл со всеми десятью. */
  downloadAll: string;
  /** Строка про формат под кнопкой. */
  formatNote: string;
  faq: { q: string; a: string }[];
  /** Блок внизу страницы, откуда человек уходит за книгой. */
  bottomTitle: string;
  bottomText: string;
  /** Что для поиска: заголовок вкладки и описание под ссылкой. */
  metaTitle: string;
  metaDescription: string;
  /** Строка с кнопкой, которая стоит на торговой странице и ведет
      сюда. Живет здесь, а не в euro.ts, чтобы весь текст про
      бесплатную печать лежал в одном файле. */
  fromBook: string;
  fromBookCta: string;
};

/* Адреса. Каждый дословно повторяет то, что человек набирает
   в поиске своей страны: "раскраски бесплатно распечатать" плюс
   пометка про язык слов на листах. */
export const freeSlug: Record<string, Record<EditionLang, string>> = {
  de: {
    en: "malvorlagen-kostenlos-ausdrucken-englisch",
    es: "malvorlagen-kostenlos-ausdrucken-spanisch",
  },
  fr: {
    en: "coloriages-gratuits-a-imprimer-anglais",
    es: "coloriages-gratuits-a-imprimer-espagnol",
  },
  nl: {
    en: "kleurplaten-gratis-printen-engels",
    es: "kleurplaten-gratis-printen-spaans",
  },
  pl: {
    en: "kolorowanki-do-druku-za-darmo-angielski",
    es: "kolorowanki-do-druku-za-darmo-hiszpanski",
  },
  it: {
    en: "disegni-da-colorare-gratis-da-stampare-inglese",
    es: "disegni-da-colorare-gratis-da-stampare-spagnolo",
  },
};

export const freePath = (lang: EuroLang, ed: EditionLang) =>
  `/${lang}/${freeSlug[lang][ed]}`;

/* ==================================================================
   Германия

   Текст утвержден: смысл владельцем по-русски, немецкие слова двумя
   сторонними проверяющими. Оба вернули почти одно и то же, взят
   их общий вариант.
   ================================================================== */

const de = (ed: EditionLang): FreeCopy => {
  /* Название книги ровно то же, что стоит на торговой странице этой
     страны, и то же, что человек увидит на Amazon. */
  const book = ed === "en" ? "Erste Wörter auf Englisch" : "Erste Wörter auf Spanisch";
  /* Язык слов на листах. В немецком прилагательное склоняется,
     поэтому форм две, а не одна. */
  const word = ed === "en" ? "englisches" : "spanisches";
  const wordDat = ed === "en" ? "englischen" : "spanischen";
  const wordPl = ed === "en" ? "englischen" : "spanischen";

  return {
    head: {
      top: `10 Seiten aus dem Buch „${book}“ für Kinder von 1 bis 3 Jahren`,
      title: "Kostenlose Malvorlagen für Kinder zum Ausdrucken",
      bottom: `Große, einfache Zeichnungen mit dickem Umriss und einem ${wordDat} Wort unter jedem Bild`,
    },
    lead: [
      `Hier können Sie zehn echte Seiten aus dem Buch „${book}“ kostenlos ausdrucken. Unter jeder Zeichnung steht ein einzelnes ${word} Wort in großen Umrissbuchstaben, sodass Ihr Kind sowohl das Bild als auch das Wort ausmalen kann. Alle zehn Seiten stehen sofort bereit, ohne Anmeldung und ohne E-Mail-Adresse.`,
      "Drucken Sie eine Seite aus, geben Sie Ihrem Kind einen Stift und schauen Sie, wie Ihr Kind reagiert. Sie müssen nichts ausfüllen: keine Anmeldung, keine E-Mail-Adresse. Die Seiten lassen sich direkt öffnen und herunterladen.",
      "Die Zeichnungen sind einfach und groß. Ein einjähriges Kind kritzelt vielleicht noch quer über das Bild, ein dreijähriges versucht schon, innerhalb der Konturen zu bleiben. Beides ist normal: In diesem Alter zählt vor allem das Interesse am Stift und am Ausmalen.",
    ],
    bookLink: "Das Buch ansehen",
    sheetsTitle: "10 kostenlose Malvorlagen zum Ausdrucken",
    sheetCaption: (name) => `Ausmalbild „${name}“: kostenlos herunterladen und ausdrucken`,
    downloadAll: "Alle 10 Malvorlagen herunterladen",
    formatNote:
      "A4-Format, ideal zum Ausdrucken zu Hause. Jedes Motiv auf einem separaten Blatt, einseitig gedruckt.",
    faq: [
      {
        q: "Muss ich etwas bezahlen oder mich anmelden?",
        a: "Nein. Die Seiten sind kostenlos, lassen sich direkt herunterladen und eine E-Mail-Adresse wird nicht benötigt.",
      },
      {
        q: "Darf ich sie für eine Kindergruppe ausdrucken?",
        a: "Ja. Die kostenlosen Seiten dürfen für den privaten Gebrauch zu Hause sowie für eine Kindergruppe oder Schulklasse ausgedruckt werden. Die Dateien selbst weiterzuverkaufen oder digital weiterzuverbreiten ist nicht gestattet.",
      },
      {
        q: "Auf welchem Papier soll ich drucken?",
        a: "Normales Druckerpapier genügt. Malt Ihr Kind mit Filzstiften, nehmen Sie besser etwas dickeres Papier oder legen Sie ein zweites Blatt darunter.",
      },
      {
        q: "Sind das alle Seiten aus dem Buch?",
        a: "Nein. Das Buch enthält 111 Zeichnungen, zehn davon finden Sie hier.",
      },
    ],
    bottomTitle: "Möchten Sie mehr solcher Seiten?",
    bottomText: `Diese zehn Seiten stammen aus dem Buch „${book}“. Das vollständige Buch enthält 111 einfache Zeichnungen, und unter jedem Bild steht ein ${word} Wort.`,
    metaTitle: "Kostenlose Malvorlagen zum Ausdrucken für Kinder ab 1 Jahr",
    metaDescription: `10 kostenlose Ausmalseiten aus dem Buch „${book}“: große Motive mit dicken Konturen und ${wordPl} Wörtern. A4-Format, sofort druckbar ohne Anmeldung.`,
    fromBook:
      "Diese zehn Vorlagen finden Sie auch auf einer eigenen Seite, dort können Sie alle Motive gesammelt in einer Datei herunterladen.",
    fromBookCta: "Kostenlose Malvorlagen zum Ausdrucken",
  };
};

/* ==================================================================
   Франция

   Текст утвержден: смысл владельцем по-русски, французские слова
   сторонними проверяющими.
   ================================================================== */

const fr = (ed: EditionLang): FreeCopy => {
  const book = ed === "en" ? "Premiers mots en anglais" : "Premiers mots en espagnol";
  /* Прилагательное согласуется с числом: одно слово под рисунком
     и много слов в описании для поиска. */
  const word = ed === "en" ? "anglais" : "espagnol";
  const wordPl = ed === "en" ? "anglais" : "espagnols";

  return {
    head: {
      top: `10 pages du livre « ${book} » pour les enfants de 1 à 3 ans`,
      title: "Coloriages gratuits à imprimer pour les enfants",
      bottom: `Grands dessins simples aux contours épais, avec un mot ${word} sous chaque image`,
    },
    lead: [
      `Vous pouvez imprimer gratuitement dix vraies pages du livre « ${book} ». Sous chaque dessin figure un seul mot ${word}, écrit en grandes lettres creuses, afin que votre enfant puisse colorier aussi bien l'image que le mot. Les dix pages sont disponibles immédiatement, sans inscription et sans adresse e-mail.`,
      "Imprimez une page, donnez un crayon à votre enfant et observez sa réaction. Vous n'avez rien à remplir : ni inscription, ni adresse e-mail. Les pages s'ouvrent et se téléchargent directement.",
      "Les dessins sont simples et grands. Un enfant d'un an gribouillera peut-être encore par-dessus l'image, tandis qu'un enfant de trois ans essaie déjà de ne pas dépasser les contours. C'est tout à fait normal dans les deux cas : à cet âge, c'est avant tout l'intérêt pour le crayon et le coloriage qui compte.",
    ],
    bookLink: "Voir le livre",
    sheetsTitle: "10 coloriages gratuits à imprimer",
    sheetCaption: (name) => `Coloriage « ${name} » : à télécharger et à imprimer gratuitement`,
    downloadAll: "Télécharger les 10 coloriages",
    formatNote: "Format A4, à imprimer chez vous. Un dessin par feuille, imprimé sur une seule face.",
    faq: [
      {
        q: "Faut-il payer ou s'inscrire ?",
        a: "Non. Les pages sont gratuites, se téléchargent directement et aucune adresse e-mail n'est demandée.",
      },
      {
        q: "Puis-je les imprimer pour un groupe d'enfants ?",
        a: "Oui. Les pages gratuites peuvent être imprimées pour un usage privé à la maison ainsi que pour un groupe d'enfants ou une classe. En revanche, revendre ou redistribuer les fichiers eux-mêmes n'est pas autorisé.",
      },
      {
        q: "Sur quel papier imprimer ?",
        a: "Du papier d'imprimante ordinaire suffit. Si votre enfant dessine au feutre, prenez plutôt un papier un peu plus épais ou glissez une seconde feuille dessous.",
      },
      {
        q: "S'agit-il de toutes les pages du livre ?",
        a: "Non. Le livre contient 111 dessins, dont dix sont disponibles ici.",
      },
    ],
    bottomTitle: "Envie d'autres pages comme celles-ci ?",
    bottomText: `Ces dix pages sont tirées du livre « ${book} ». Le livre complet contient 111 dessins simples, et sous chaque image figure un mot ${word}.`,
    metaTitle: "Coloriages gratuits à imprimer pour enfants dès 1 an",
    metaDescription: `10 coloriages gratuits du livre « ${book} » : grands dessins aux contours épais et mots ${wordPl}. Format A4, téléchargement direct sans inscription.`,
    fromBook:
      "Retrouvez également ces dix coloriages sur une page dédiée pour les télécharger tous ensemble en un seul fichier.",
    fromBookCta: "Coloriages gratuits à imprimer",
  };
};

/* ==================================================================
   Польша

   Текст утвержден: смысл владельцем по-русски, польские слова
   сторонними проверяющими.
   ================================================================== */

const pl = (ed: EditionLang): FreeCopy => {
  const book = ed === "en" ? "Pierwsze słowa po angielsku" : "Pierwsze słowa po hiszpańsku";
  /* В польском прилагательное склоняется, поэтому форм три:
     именительный падеж под рисунком, творительный в строке под
     заголовком и множественное число в описании для поиска. */
  const word = ed === "en" ? "angielskie" : "hiszpańskie";
  const wordIns = ed === "en" ? "angielskim" : "hiszpańskim";
  const wordPl = ed === "en" ? "angielskimi" : "hiszpańskimi";

  return {
    head: {
      top: `10 stron z książki „${book}” dla dzieci od 1 do 3 lat`,
      title: "Darmowe kolorowanki dla dzieci do druku",
      bottom: `Duże, proste rysunki z grubym konturem i ${wordIns} słowem pod każdym obrazkiem`,
    },
    lead: [
      `Tutaj można za darmo wydrukować dziesięć prawdziwych stron z książki „${book}”. Pod każdym rysunkiem znajduje się jedno ${word} słowo zapisane dużymi konturowymi literami, dzięki czemu dziecko może pokolorować zarówno obrazek, jak i samo słowo. Wszystkie dziesięć stron jest dostępnych od razu, bez rejestracji i bez adresu e-mail.`,
      "Wydrukuj stronę, daj dziecku kredkę i zobacz, jak zareaguje. Niczego nie trzeba wypełniać: żadnej rejestracji ani adresu e-mail. Strony można od razu otworzyć i pobrać.",
      "Rysunki są proste i duże. Roczne dziecko może na razie po prostu bazgrać po obrazku, a trzylatek już stara się nie wychodzić poza kontur. Jedno i drugie jest normalne: w tym wieku liczy się przede wszystkim samo zainteresowanie kredką i kolorowaniem.",
    ],
    bookLink: "Zobacz książkę",
    sheetsTitle: "10 darmowych kolorowanek do druku",
    sheetCaption: (name) => `Kolorowanka „${name}”: pobierz i wydrukuj za darmo`,
    downloadAll: "Pobierz wszystkie 10 kolorowanek",
    formatNote: "Format A4, do druku w domu. Każdy rysunek na osobnej kartce (druk jednostronny).",
    faq: [
      {
        q: "Czy trzeba za coś płacić albo się rejestrować?",
        a: "Nie. Strony są darmowe, można je pobrać od razu, a adres e-mail nie jest potrzebny.",
      },
      {
        q: "Czy mogę je wydrukować dla grupy dzieci?",
        a: "Tak. Darmowe strony można drukować do użytku prywatnego w domu, a także dla grupy dzieci lub klasy szkolnej. Odsprzedawanie samych plików ani ich dalsze rozpowszechnianie nie jest dozwolone.",
      },
      {
        q: "Na jakim papierze drukować?",
        a: "Wystarczy zwykły papier do drukarki. Jeśli dziecko maluje flamastrami, lepiej wziąć nieco grubszy papier albo podłożyć drugą kartkę.",
      },
      {
        q: "Czy to wszystkie strony z książki?",
        a: "Nie. Książka zawiera 111 rysunków, dziesięć z nich znajdziesz tutaj.",
      },
    ],
    bottomTitle: "Chcesz więcej takich stron?",
    bottomText: `Tych dziesięć stron pochodzi z książki „${book}”. Pełna książka zawiera 111 prostych rysunków, a pod każdym obrazkiem znajduje się ${word} słowo.`,
    metaTitle: "Darmowe kolorowanki do druku dla dzieci od 1 roku życia",
    metaDescription: `10 darmowych kolorowanek z książki „${book}”: duże rysunki z grubym konturem i ${wordPl} słowami. Format A4, do pobrania od razu, bez rejestracji.`,
    fromBook:
      "Te dziesięć kolorowanek znajdziesz również na osobnej stronie, gdzie możesz pobrać wszystkie rysunki razem w jednym pliku.",
    fromBookCta: "Darmowe kolorowanki do druku",
  };
};

/* ==================================================================
   Голландия

   Текст утвержден: смысл владельцем по-русски, голландские слова
   сторонними проверяющими.
   ================================================================== */

const nl = (ed: EditionLang): FreeCopy => {
  const book =
    ed === "en" ? "Eerste woorden in het Engels" : "Eerste woorden in het Spaans";
  /* Прилагательное в единственном числе после "een" стоит без
     окончания, во множественном с окончанием. */
  const word = ed === "en" ? "Engels" : "Spaans";
  const wordPl = ed === "en" ? "Engelse" : "Spaanse";

  return {
    head: {
      top: `10 pagina's uit het boek „${book}” voor kinderen van 1 tot 3 jaar`,
      title: "Gratis kleurplaten voor kinderen om te printen",
      bottom: `Grote, eenvoudige tekeningen met een dikke omtrek en een ${word} woord onder elke afbeelding`,
    },
    lead: [
      `Hier kunt u tien echte pagina's uit het boek „${book}” gratis printen. Onder elke tekening staat één ${word} woord in grote holle letters, zodat uw kind zowel de afbeelding als het woord kan inkleuren. Alle tien pagina's zijn meteen beschikbaar, zonder registratie en zonder e-mailadres.`,
      "Print een pagina uit, geef uw kind een potlood en kijk hoe het reageert. U hoeft niets in te vullen: geen registratie, geen e-mailadres. De pagina's zijn direct te openen en te downloaden.",
      "De tekeningen zijn eenvoudig en groot. Een kind van één jaar krabbelt misschien nog dwars over de afbeelding, terwijl een driejarige al probeert binnen de lijntjes te blijven. Dat is in beide gevallen normaal: op deze leeftijd telt vooral de belangstelling voor het potlood en voor het kleuren.",
    ],
    bookLink: "Bekijk het boek",
    sheetsTitle: "10 gratis kleurplaten om te printen",
    sheetCaption: (name) => `Kleurplaat „${name}”: gratis downloaden en printen`,
    downloadAll: "Alle 10 kleurplaten downloaden",
    formatNote: "A4-formaat, om thuis te printen. Elke tekening op een apart vel, enkelzijdig bedrukt.",
    faq: [
      {
        q: "Moet ik betalen of me registreren?",
        a: "Nee. De pagina's zijn gratis, ze zijn direct te downloaden en een e-mailadres is niet nodig.",
      },
      {
        q: "Mag ik ze printen voor een groep kinderen?",
        a: "Ja. De gratis pagina's mogen voor privégebruik thuis worden geprint en ook voor een groep kinderen of een schoolklas. De bestanden zelf doorverkopen of verder verspreiden is niet toegestaan.",
      },
      {
        q: "Op wat voor papier moet ik printen?",
        a: "Gewoon printerpapier volstaat. Kleurt uw kind met viltstiften, neem dan liever iets dikker papier of leg er een tweede vel onder.",
      },
      {
        q: "Zijn dit alle pagina's uit het boek?",
        a: "Nee. Het boek bevat 111 tekeningen, tien daarvan vindt u hier.",
      },
    ],
    bottomTitle: "Wilt u meer van dit soort pagina's?",
    bottomText: `Deze tien pagina's komen uit het boek „${book}”. Het volledige boek bevat 111 eenvoudige tekeningen, en onder elke afbeelding staat een ${word} woord.`,
    metaTitle: "Gratis kleurplaten om te printen voor kinderen vanaf 1 jaar",
    metaDescription: `10 gratis kleurplaten uit het boek „${book}”: grote tekeningen met dikke omtrekken en ${wordPl} woorden. A4-formaat, direct te downloaden, zonder registratie.`,
    fromBook:
      "Deze tien kleurplaten vindt u ook op een aparte pagina, waar u alle tekeningen samen in één bestand kunt downloaden.",
    fromBookCta: "Gratis kleurplaten om te printen",
  };
};

/* ==================================================================
   Италия

   Текст утвержден: смысл владельцем по-русски, итальянские слова
   сторонним проверяющим.
   ================================================================== */

const it = (ed: EditionLang): FreeCopy => {
  const book = ed === "en" ? "Prime parole in inglese" : "Prime parole in spagnolo";
  const word = ed === "en" ? "inglese" : "spagnolo";
  const wordPl = ed === "en" ? "inglesi" : "spagnole";

  return {
    head: {
      top: `10 pagine del libro «${book}» per bambini da 1 a 3 anni`,
      title: "Disegni da colorare gratis da stampare per bambini",
      bottom: `Grandi disegni semplici con contorni spessi e una parola in ${word} sotto ogni immagine`,
    },
    lead: [
      `Qui potete stampare gratuitamente dieci pagine tratte direttamente dal libro «${book}». Sotto ogni disegno c'è una parola in ${word}, stampata in grandi lettere a contorno, così il bambino può colorare sia l'immagine sia la parola stessa. Tutte e dieci le pagine sono disponibili subito, senza registrazione e senza indirizzo e-mail.`,
      "Stampate una pagina, date una matita al bambino e osservate come reagisce. Non c'è nulla da compilare: né registrazione né indirizzo e-mail. Le pagine si aprono e si scaricano subito.",
      "I disegni sono semplici e grandi. Un bambino di un anno può ancora limitarsi a scarabocchiare sopra l'immagine, mentre uno di tre anni cerca già di non uscire dai contorni. Entrambi i modi di colorare sono normali: a questa età conta soprattutto l'interesse per la matita e per il colorare.",
    ],
    bookLink: "Scopri il libro",
    sheetsTitle: "10 disegni da colorare gratis da stampare",
    sheetCaption: (name) => `Disegno da colorare «${name}»: scarica e stampa gratis`,
    downloadAll: "Scarica tutti e 10 i disegni",
    formatNote: "Formato A4, da stampare a casa. Ogni disegno su un foglio separato, stampato su un solo lato.",
    faq: [
      {
        q: "Bisogna pagare qualcosa o registrarsi?",
        a: "No. Le pagine sono gratuite, si scaricano subito e non serve alcun indirizzo e-mail.",
      },
      {
        q: "Si possono stampare per un gruppo di bambini?",
        a: "Sì. Le pagine gratuite si possono stampare per uso privato a casa e anche per attività con i bambini in un gruppo o in una classe. Non è consentito rivendere o distribuire i file.",
      },
      {
        q: "Su che tipo di carta conviene stampare?",
        a: "Va bene la normale carta da stampante. Se il bambino colora con i pennarelli, meglio usare una carta un po' più spessa oppure mettere un secondo foglio sotto.",
      },
      {
        q: "Sono tutte le pagine del libro?",
        a: "No. Il libro contiene 111 disegni, qui ne trovate dieci.",
      },
    ],
    bottomTitle: "Volete altre pagine come queste?",
    bottomText: `Queste dieci pagine sono tratte dal libro «${book}». Il libro completo contiene 111 disegni semplici e sotto ognuno c'è una parola in ${word}.`,
    metaTitle: "Disegni da colorare gratis da stampare per bambini da 1 anno in su",
    metaDescription: `10 disegni da colorare gratis tratti dal libro «${book}»: grandi disegni con contorni spessi e parole ${wordPl}. Formato A4, si scaricano subito, senza registrazione.`,
    fromBook:
      "Questi dieci disegni si trovano anche su una pagina dedicata, dove potete scaricarli tutti in un unico file.",
    fromBookCta: "Disegni da colorare gratis da stampare",
  };
};

/* ==================================================================
   Готовые языки

   Страна попадает сюда только после того, как ее текст проверили
   носители языка. Страницы собираются по этому списку: пока страны
   тут нет, ее страниц не существует ни на сайте, ни в карте сайта.
   ================================================================== */

export const freeCopy: Partial<Record<EuroLang, (ed: EditionLang) => FreeCopy>> = {
  de,
  fr,
  nl,
  pl,
  it,
};

/** Страны, у которых страницы бесплатной печати уже готовы. */
export const freeLangs = Object.keys(freeCopy) as EuroLang[];

export const hasFreePage = (lang: EuroLang) => lang in freeCopy;

export const freeCopyOf = (lang: EuroLang, ed: EditionLang): FreeCopy =>
  freeCopy[lang]!(ed);

/** Все готовые страницы одним списком: для карты сайта и подвала. */
export const freePages = freeLangs.flatMap((lang) =>
  (["en", "es"] as EditionLang[]).map((ed) => ({
    lang,
    ed,
    path: freePath(lang, ed),
  }))
);
