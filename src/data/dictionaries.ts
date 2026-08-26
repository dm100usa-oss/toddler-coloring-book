/* Все надписи интерфейса в одном месте. Испанский тут не перевод
   с английского слово в слово, а самостоятельный текст: испаноязычный
   родитель должен читать так, будто сайт писали для него. */

export type UiLang = "en" | "es" | "ru";
export const activeLangs: UiLang[] = ["en", "es", "ru"];

/* Языки, на которых написана вся справочная часть сайта: этапы
   первого рисования и статьи. Теперь это все три языка.

   Отдельный тип оставлен намеренно. Справочная часть и интерфейс
   растут по-разному: интерфейс может появиться на новом языке за
   один вечер, а связный текст статей пишется отдельно. Пока тип
   стоит на месте, страница, которой нет, честно отвечает
   "страницы нет", а не подставляет английский текст. */
export type ContentLang = "en" | "es" | "ru";
export const contentLangs: ContentLang[] = ["en", "es", "ru"];
export const isContentLang = (l: UiLang): l is ContentLang =>
  (contentLangs as UiLang[]).includes(l);

/** Разделы, которые есть на данном языке. */
export const navFor = (
  l: UiLang
): ("tools" | "programs" | "ages" | "guides" | "printables" | "about")[] =>
  isContentLang(l)
    ? ["tools", "ages", "guides", "printables", "programs", "about"]
    : ["printables", "about"];

export type Dict = {
  htmlLang: string;
  langName: string;
  nav: {
    home: string;
    tools: string;
    programs: string;
    ages: string;
    guides: string;
    printables: string;
    faq: string;
    about: string;
    terms: string;
  };
  home: {
    /* Три надписи с баннера в шапке, настоящими буквами. На картинке
       они нарисованы, и машина их не читает; здесь они есть текстом.
       Порядок тот же, что на картинке: крупная строка, строка сверху,
       строка снизу. Последняя разбита на вопросы. */
    bannerTitle: string;
    bannerSubtitle: string;
    bannerQuestions: string[];
    /* Заголовок, открывающий руководство. На экране его нет: он нужен,
       чтобы машина читала страницу как руководство, внутри которого
       книга стоит примером. */
    guideTitle: string;
    /* Заголовок первого экрана. Он же главный ответ на вопрос,
       про что этот сайт. Короткий, без рекламных слов. */
    hero: string;
    lead: string;
    pickerTitle: string;
    pickerLead: string;
    whatTitle: string;
    whatText: string;
    whyTitle: string;
    why: string[];
    printablesTitle: string;
    printablesLead: string;
    printablesCta: string;
    bookTitle: string;
    bookLead: string;
    bookCta: string;
    sourcesTitle: string;
    sourcesLead: string;
  };
  picker: {
    start: string;
    stepOf: (n: number, total: number) => string;
    back: string;
    again: string;
    resultTitle: string;
    canTitle: string;
    lookForTitle: string;
    tryTitle: string;
    tryLead: string;
    /* Блок примеров в ответе инструмента. Раньше здесь стояли три
       бесплатных листа кнопками для скачивания, причем всем показывались
       одни и те же три. Теперь это примеры страниц из книги, подобранные
       по этапу, а скачивание живет на своей странице, одной кнопкой ниже.

       Так примеры берутся из всех 111 рисунков, а не из десяти простых
       зверей, и разница между этапами наконец видна глазом. */
    exTitle: string;
    exLead: string;
    bookLine: string;
    disclaimer: string;
    q: {
      age: { q: string; a: { value: string; label: string }[] };
      grip: { q: string; a: { value: string; label: string }[] };
      inside: { q: string; a: { value: string; label: string }[] };
      attention: { q: string; a: { value: string; label: string }[] };
    };
  };
  /* Надписи страниц справочной части: заголовки блоков, подписи
     к картинкам, короткие пояснения. Раньше они стояли прямо в коде
     страниц выбором из двух языков. С третьим языком такой выбор
     молча подставлял бы русскому читателю испанский текст, поэтому
     все эти надписи собраны здесь и разобраны по языкам наравне
     с остальным словарем. */
  sec: {
    questions: string;
    /** Указатель внизу раздела вопросов: где отвечено остальное. */
    faqElsewhere: string;
    faqElsewhereLead: string;
    /** Ссылка на раздел вопросов с других страниц. */
    faqAll: string;
    coverAgeTitle: string;
    coverAgeLead: string;
    agesLabel: (n: string) => string;
    watchOut: string;
    stagesInOrder: string;
    stagesHome: string;
    lookForPage: string;
    /** Заголовок раздела про то, как проходит занятие за столом. */
    atTable: string;
    stagePages: string;
    neighbours: string;
    tryToday: string;
    whereFits: string;
    readNext: string;
    /** Статьи, относящиеся к этому этапу. Заголовок и вводная фраза.
        Фраза нужна не для красоты: из нее и человек, и машина
        понимают, почему эти статьи стоят именно здесь. */
    stageReading: string;
    stageReadingLead: string;
    /** Страница с цифрой возраста, на которую уводит статья и этап. */
    ageForStage: string;
    /** Заголовок над списком статей в разделе статей. Без него список
        висел вообще без заголовка, и для машины раздел выглядел пустым. */
    guidesList: string;
    /** Заголовок над сеткой из десяти листов. Нужен, чтобы названия
        листов ушли уровнем ниже и не спорили по важности с разделами. */
    sheetsList: string;
    /** На странице бесплатных листов: какой лист какому этапу. */
    sheetsByStage: string;
    sheetsByStageLead: string;
    /** На странице правил подбора: каждый исход ведет на свою страницу. */
    outcomeLink: string;
    buyNote: string;
    bookOneLiner: string;
    outgrown: string;
    soon: string;
    buyPdf: string;
    /** Стоит рядом с подписью про Amazon, когда на странице обе
        кнопки. Без нее человек видит вторую кнопку и не понимает,
        чем она отличается от первой. */
    pdfNote: string;
    stageTitle: (title: string, age: string) => string;
    /* То же название этапа, но для строки в выдаче поиска: без слова
       "раскрашивание" и без "примерно". Заголовок, который читает
       человек на странице, строится по stageTitle и не меняется. */
    stageMetaTitle: (title: string, age: string) => string;
    sheetAlt: (name: string) => string;
    pageAlt: (name: string) => string;
  };
  footer: {
    about: string;
    catalog: string;
    rights: string;
    /** Оговорка о том, чем этот сайт не является. Стоит в подвале, то
        есть на каждой странице сразу: человек, пришедший из поиска
        прямо на статью, до страницы прав может не дойти никогда.
        Про деньги и документы здесь не лишнее: в разделе для программ
        сайт объясняет, как открыть счет организации и как работает
        освобождение от налога. */
    disclaimer: string;
    disclaimerLink: string;
  };
  common: {
    free: string;
    download: string;
    letter: string;
    a4: string;
    amazon: string;
    updated: string;
  };
};

export const dictionaries: Record<UiLang, Dict> = {
  en: {
    htmlLang: "en-US",
    langName: "English",
    nav: {
      home: "Home",
      tools: "Choose a book",
      programs: "For programs",
      ages: "By age",
      guides: "Guides",
      printables: "Free pages",
      faq: "FAQ",
      about: "About",
      terms: "Terms and privacy",
    },
    home: {
      hero: "Your child's first coloring book, chosen by what they can actually do",
      lead:
        "A one year old scribbles across the page. A three year old starts staying inside the line. " +
        "The same book does not suit both. Answer four questions about your child and see what fits, " +
        "with free pages to print and try today.",
      guideTitle: "Everything about first coloring books for toddlers ages 1-3",
      bannerTitle: "First Coloring Books for Toddlers",
      bannerSubtitle:
        "A practical guide to first coloring books for toddlers ages 1-3",
      bannerQuestions: [
        "When should you introduce crayons and colored pencils?",
        "Which coloring books work best for ages 1-3?",
        "How do you turn those first marks into play, learning, and joy?",
      ],
      pickerTitle: "Find the right first coloring book",
      pickerLead:
        "Four questions, about thirty seconds. Nothing is stored and nothing is sent anywhere.",
      whatTitle: "What this site is",
      whatText:
        "A guide to the very first stage of drawing, from the first scribble to the first shape a " +
        "child colors on purpose. Every claim about what a child can do at a given age is tied to " +
        "published developmental milestones, and the sources are listed at the bottom of this page. " +
        "The site is run by Magic of Discoveries LLC, a small children's book publisher in Miami, " +
        "Florida, and it features one coloring book of our own.",
      whyTitle: "Why a first coloring book is not just a smaller coloring book",
      why: [
        "Line thickness decides everything. A thin outline disappears under a crayon held in a fist, and the child sees no result.",
        "One drawing per page. Two or three subjects on a sheet split the attention of a child who can hold it for a few minutes at most.",
        "The drawing has to fill the sheet. A small picture in the middle of a large page asks for accuracy the hand cannot deliver yet.",
        "The subject has to be recognizable. A toddler colors what they can name, and naming it is half the reason they stay at the table.",
        "Single-sided printing. A marker goes through ordinary book paper, and on a double-sided page it ruins the next drawing.",
      ],
      printablesTitle: "Free pages to print",
      printablesLead:
        "Twenty four drawings, sorted by how hard they are rather than by subject. Print one, hand " +
        "your child a crayon, and you will know within five minutes which level is theirs.",
      printablesCta: "See all free pages",
      bookTitle: "The book behind this site",
      bookLead:
        "We publish one coloring book for this age, and this site exists because we kept answering " +
        "the same questions from parents about it. It is not the only good book for a toddler, and " +
        "the guides here will tell you when a different kind of book suits your child better.",
      bookCta: "About the book",
      sourcesTitle: "Where the developmental facts come from",
      sourcesLead:
        "Ages on this site are typical ranges, not deadlines. Children reach these points at their " +
        "own pace, and a few months either way is ordinary.",
    },
    picker: {
      start: "Start",
      stepOf: (n, total) => `Question ${n} of ${total}`,
      back: "Back",
      again: "Start over",
      resultTitle: "What suits your child now",
      canTitle: "What a child at this stage can usually do",
      lookForTitle: "What to look for in a coloring book",
      tryTitle: "Print these and try today",
      tryLead: "Pages chosen for this stage. Free, no sign up.",
      exTitle: "What a suitable page looks like",
      exLead:
        "Three drawings from the book, chosen for this stage. Look at how much of the sheet the " +
        "drawing takes up and how many separate areas there are inside it.",
      bookLine: "The book we publish for this stage",
      disclaimer:
        "This is general guidance based on published developmental milestones, not an assessment " +
        "of your child. If you have concerns about your child's development, speak to your pediatrician.",
      q: {
        age: {
          q: "How old is your child?",
          a: [
            { value: "1", label: "Around 1 year" },
            { value: "2", label: "Around 2 years" },
            { value: "3", label: "Around 3 years" },
            { value: "4", label: "4 years or older" },
          ],
        },
        grip: {
          q: "How does your child hold a crayon?",
          a: [
            { value: "fist", label: "In a fist, whole hand" },
            { value: "fingers", label: "With fingers, but not steadily" },
            { value: "pencil", label: "Almost the way an adult holds a pencil" },
          ],
        },
        inside: {
          q: "What happens when your child colors?",
          a: [
            { value: "across", label: "Marks go across the page, anywhere" },
            { value: "near", label: "Marks land on the drawing, but cross the line" },
            { value: "inside", label: "Mostly stays inside the line" },
          ],
        },
        attention: {
          q: "How long does your child stay with one page?",
          a: [
            { value: "short", label: "A minute or two" },
            { value: "medium", label: "About five minutes" },
            { value: "long", label: "Ten minutes or more" },
          ],
        },
      },
    },
    sec: {
      questions: "Questions parents ask",
      faqElsewhere: "Answered elsewhere on this site",
      faqElsewhereLead:
        "These come up just as often, but each belongs on a page of its own, next to the " +
        "rest of that subject. Repeating them here would only split the answer in two.",
      faqAll: "All questions about the book and about coloring",
      coverAgeTitle: "What the age on the cover actually means",
      coverAgeLead:
        "There is no standard behind these numbers and no body that checks them. The publisher " +
        "chooses the range, which is why two books both labelled ages 2-4 can differ by a factor " +
        "of two in difficulty. Here is what each label usually means and where it misleads.",
      agesLabel: (n) => `Ages ${n}`,
      watchOut: "Watch out",
      stagesInOrder: "The four stages, in order",
      stagesHome: "The four stages of first drawing",
      lookForPage: "What to look for in a page",
      atTable: "How it actually goes at the table",
      stagePages: "Pages for this stage, free to print",
      neighbours: "Before and after this stage",
      tryToday: "Try it on a page today",
      whereFits: "Where this fits in development",
      readNext: "Read next",
      stageReading: "Questions parents ask at this stage",
      stageReadingLead:
        "These guides answer the questions that come up most often while a child is at this " +
        "stage: what to draw with, how long a child usually sits with one page, and what to do " +
        "about the mess.",
      ageForStage: "If you were looking for an age instead",
      guidesList: "All the guides",
      sheetsList: "The ten sheets, free to download",
      sheetsByStage: "Which sheet suits which stage",
      sheetsByStageLead:
        "The ten sheets are not equally simple. The number of separate areas inside the drawing " +
        "and the thickness of the outline are measured on each one, and that is what decides the " +
        "level. Pick by what your child is doing now, not by age alone.",
      outcomeLink: "Full page about this stage",
      buyNote: "Sold and shipped by Amazon. We earn from the sale.",
      bookOneLiner:
        "We publish one coloring book for this age: 111 drawings, thick outlines, one per page, " +
        "printed on one side.",
      outgrown:
        "Our own book is made for an earlier stage than this, so we are not going to suggest it. " +
        "What suits your child now is a book with more to fill inside one drawing, or a step by " +
        "step drawing book.",
      soon: "Printable file, coming soon",
      buyPdf: "Get the printable file",
      pdfNote:
        "The printable file opens in our own shop and arrives by email after checkout. Print it " +
        "at home as many times as you need.",
      stageTitle: (title, age) => `${title}: coloring at ${age}`,
      stageMetaTitle: (title, age) => `${title}: ${age.replace(/^about /, "")}`,
      sheetAlt: (name) => `Free printable coloring page: ${name}`,
      pageAlt: (name) =>
        `Page from the book, free to print: ${name}, thick outlines, one drawing per page`,
    },
    footer: {
      about:
        "Toddler Coloring Book is published by Magic of Discoveries LLC, a children's book " +
        "publisher in Miami, Florida. We write about the first stage of drawing and we publish " +
        "one coloring book for this age.",
      catalog: "Our full catalog",
      rights: "All drawings on this site are our own work.",
      disclaimer:
        "Everything on this site is general information, not advice about a particular child " +
        "or a particular situation. It is not medical, legal or tax advice. Age ranges come " +
        "from published developmental milestones and describe children in general; questions " +
        "about your own child belong with your pediatrician, and questions about purchasing, " +
        "invoices or tax with your own accountant or adviser.",
      disclaimerLink: "Full terms",
    },
    common: {
      free: "Free",
      download: "Download",
      letter: "US Letter",
      a4: "A4",
      amazon: "Buy on Amazon",
      updated: "Updated",
    },
  },

  es: {
    htmlLang: "es",
    langName: "Español",
    nav: {
      home: "Inicio",
      tools: "Elegir un libro",
      programs: "Para programas",
      ages: "Por edad",
      guides: "Guías",
      printables: "Dibujos gratis",
      faq: "Preguntas frecuentes",
      about: "Quiénes somos",
      terms: "Derechos y privacidad",
    },
    home: {
      hero: "El primer libro para colorear de su hijo, elegido según lo que ya sabe hacer",
      lead:
        "Un niño de un año suele garabatear por toda la hoja. Uno de tres empieza a intentar " +
          "colorear dentro del contorno. El mismo tipo de página no siempre sirve para ambos. " +
          "Responda cuatro preguntas sobre su hijo y descubra qué tipo de libro puede " +
          "convenirle ahora, con dibujos gratis para imprimir.",
      guideTitle: "Todo sobre los primeros libros para colorear para bebés de 1 a 3 años",
      bannerTitle: "El primer libro de colorear para bebés",
      bannerSubtitle:
        "Una guía práctica sobre los primeros libros para colorear para bebés de 1 a 3 años",
      bannerQuestions: [
        "¿Cuándo empezar con crayones y lápices de colores?",
        "¿Qué libros para colorear elegir para niños de 1 a 3 años?",
        "¿Cómo convertir sus primeros trazos en juego, aprendizaje y alegría?",
      ],
      pickerTitle: "Encuentre el primer libro para colorear adecuado",
      pickerLead:
        "Cuatro preguntas, unos treinta segundos. No guardamos ni enviamos sus respuestas.",
      whatTitle: "Qué es este sitio",
      whatText:
        "Este sitio está dedicado a la primera etapa del dibujo: desde los primeros " +
          "garabatos hasta los primeros intentos de colorear formas sencillas de manera " +
          "intencionada. La información sobre lo que los niños suelen poder hacer a distintas " +
          "edades se basa en hitos del desarrollo publicados. Las fuentes aparecen al final de " +
          "esta página. El sitio pertenece a Magic of Discoveries LLC, una pequeña editorial " +
          "de libros infantiles de Miami, Florida.",
      whyTitle: "Por qué el primer libro para colorear es diferente",
      why: [
        "El grosor de la línea importa. A un niño pequeño le cuesta más ver un contorno " +
          "fino, sobre todo cuando apenas está aprendiendo a sujetar el crayón y todavía se " +
          "sale con frecuencia de los límites del dibujo.",
        "Un dibujo por página. Varios elementos en una misma hoja pueden distraer a un niño " +
          "pequeño, que todavía tiene dificultad para mantener la atención durante mucho " +
          "tiempo.",
        "El dibujo debe ser grande. Una imagen pequeña en una página grande exige una " +
          "precisión de movimientos que el niño todavía no tiene.",
        "El dibujo debe ser reconocible. A los niños pequeños les resulta más interesante " +
          "colorear animales, objetos y otras imágenes que ya conocen y pueden nombrar.",
        "Impresión por una sola cara. La tinta de un rotulador puede traspasar el papel " +
          "corriente y estropear el dibujo del reverso.",
      ],
      printablesTitle: "Dibujos gratis para imprimir",
      printablesLead:
        "Veinticuatro dibujos ordenados por dificultad, no por tema. Imprima uno, dele un " +
          "crayón a su hijo y en unos minutos podrá hacerse una idea de qué tipo de página le " +
          "conviene.",
      printablesCta: "Ver todos los dibujos gratis",
      bookLead:
        "Publicamos un libro para colorear para esta edad, y este sitio nació de las " +
          "preguntas que los padres nos hacían una y otra vez. No es el único libro que puede " +
          "ser adecuado para un niño pequeño, y nuestras guías también explican cuándo " +
          "conviene elegir otro tipo de libro.",
      bookTitle: "El libro detrás de este sitio",
      bookCta: "Sobre el libro",
      sourcesTitle: "En qué se basa la información sobre el desarrollo",
      sourcesLead:
        "Las edades que aparecen en este sitio son orientativas, no límites estrictos. Cada " +
          "niño se desarrolla a su propio ritmo, y una diferencia de algunos meses es " +
          "completamente normal.",
    },
    picker: {
      start: "Empezar",
      stepOf: (n, total) => `Pregunta ${n} de ${total}`,
      back: "Atrás",
      again: "Empezar de nuevo",
      resultTitle: "Qué le conviene a su hijo ahora",
      canTitle: "Qué suele poder hacer un niño en esta etapa",
      lookForTitle: "Qué buscar al elegir un libro para colorear",
      tryTitle: "Imprima estos dibujos y pruébelos hoy",
      tryLead: "Dibujos seleccionados para esta etapa. Gratis y sin registro.",
      exTitle: "Cómo es una página adecuada",
      exLead:
        "Tres dibujos del libro, elegidos para esta etapa. Fíjese en cuánta hoja ocupa el dibujo " +
          "y en cuántas zonas separadas hay dentro de él.",
      bookLine: "El libro que publicamos para esta etapa",
      disclaimer:
        "Esta es una orientación general basada en hitos del desarrollo publicados, no una " +
          "evaluación del desarrollo de su hijo. Si algo le preocupa, consulte con su " +
          "pediatra.",
      q: {
        age: {
          q: "¿Qué edad tiene su hijo?",
          a: [
            { value: "1", label: "Alrededor de 1 año" },
            { value: "2", label: "Alrededor de 2 años" },
            { value: "3", label: "Alrededor de 3 años" },
            { value: "4", label: "4 años o más" },
          ],
        },
        grip: {
          q: "¿Cómo sujeta el crayón?",
          a: [
            { value: "fist", label: "Con toda la mano" },
            { value: "fingers", label: "Con los dedos, pero todavía con poca firmeza" },
            { value: "pencil", label: "Casi como un adulto sujeta un lápiz" },
          ],
        },
        inside: {
          q: "¿Cómo suele colorear?",
          a: [
            { value: "across", label: "Hace trazos por toda la hoja" },
            { value: "near", label: "Colorea sobre el dibujo, pero se sale con frecuencia " +
                                      "del contorno" },
            { value: "inside", label: "Colorea dentro del contorno la mayor parte del tiempo" },
          ],
        },
        attention: {
          q: "¿Cuánto tiempo suele dedicar a una misma página?",
          a: [
            { value: "short", label: "Uno o dos minutos" },
            { value: "medium", label: "Unos cinco minutos" },
            { value: "long", label: "Diez minutos o más" },
          ],
        },
      },
    },
    sec: {
      questions: "Preguntas que hacen los padres",
      faqElsewhere: "Respondidas en otras páginas de esta web",
      faqElsewhereLead:
        "Se preguntan con la misma frecuencia, pero cada una pertenece a su propia página, " +
        "junto al resto de ese tema. Repetirlas aquí solo partiría la respuesta en dos.",
      faqAll: "Todas las preguntas sobre el libro y sobre colorear",
      coverAgeTitle: "Qué significa realmente la edad indicada en la portada",
      coverAgeLead:
        "No existe un estándar único que determine las edades indicadas en la portada de un " +
          "libro para colorear. Es la editorial quien elige el rango, por lo que dos libros " +
          "marcados para niños de 2 a 4 años pueden tener niveles de dificultad muy distintos. " +
          "Aquí explicamos qué suelen significar estas edades y por qué no conviene fijarse " +
          "únicamente en ellas.",
      agesLabel: (n) => `De ${n} años`,
      watchOut: "Ojo",
      stagesInOrder: "Las cuatro etapas, en orden",
      stagesHome: "Las cuatro etapas del primer dibujo",
      lookForPage: "En qué fijarse en una página",
      atTable: "Cómo transcurre en realidad la sesión",
      stagePages: "Hojas para esta etapa, gratis",
      neighbours: "Antes y después de esta etapa",
      tryToday: "Pruébelo hoy con una sola página",
      whereFits: "Cómo se relaciona esta etapa con el desarrollo del niño",
      readNext: "Siga leyendo",
      stageReading: "Preguntas que surgen en esta etapa",
      stageReadingLead:
        "Estas guías responden a lo que más se pregunta mientras el niño está en esta etapa: " +
        "con qué conviene dibujar, cuánto tiempo suele durar una página y qué hacer con la " +
        "suciedad.",
      ageForStage: "Si buscaba una edad concreta",
      guidesList: "Todas las guías",
      sheetsList: "Las diez hojas, gratis para descargar",
      sheetsByStage: "Qué hoja corresponde a cada etapa",
      sheetsByStageLead:
        "Las diez hojas no son igual de sencillas. En cada una están medidos el número de zonas " +
        "separadas dentro del dibujo y el grosor del contorno, y eso es lo que determina el " +
        "nivel. Elija por lo que su hijo hace ahora, no solo por la edad.",
      outcomeLink: "Página completa sobre esta etapa",
      buyNote: "Vendido y enviado por Amazon. Nosotros ganamos con la venta.",
      bookOneLiner:
        "Publicamos un libro para colorear para esta edad: 111 dibujos con contornos " +
          "gruesos, uno por página e impresos por una sola cara.",
      outgrown:
        "Nuestro libro está pensado para una etapa anterior, así que aquí no se lo " +
          "recomendamos. En este momento, al niño probablemente le convenga más un libro con " +
          "dibujos más detallados o uno de dibujo paso a paso, donde pueda crear la imagen por " +
          "sí mismo.",
      soon: "Archivo para imprimir, próximamente",
      buyPdf: "Conseguir el archivo para imprimir",
      pdfNote:
        "El archivo para imprimir se abre en nuestra propia tienda y llega por correo tras la " +
        "compra. Se puede imprimir en casa tantas veces como haga falta.",
      stageTitle: (title, age) => `${title}: colorear a ${age}`,
      stageMetaTitle: (title, age) => `${title}: ${age.replace(/^aproximadamente de /, "")}`,
      sheetAlt: (name) => `Dibujo para colorear gratis: ${name}`,
      pageAlt: (name) =>
        `Página del libro, gratis para imprimir: ${name}, contornos gruesos, un dibujo por página`,
    },
    footer: {
      about:
        "Toddler Coloring Book es un proyecto de Magic of Discoveries LLC, una editorial de " +
          "libros infantiles de Miami, Florida. Aquí hablamos de las primeras etapas del " +
          "dibujo y publicamos materiales para niños pequeños.",
      catalog: "Nuestro catálogo completo",
      rights: "Todos los dibujos de este sitio han sido creados por nosotros.",
      disclaimer:
        "Todo lo que publicamos en este sitio es información general, no una recomendación " +
          "sobre un niño concreto ni sobre una situación concreta. No constituye consejo " +
          "médico, jurídico ni fiscal. Los rangos de edad proceden de fuentes publicadas y " +
          "describen a los niños en general: si algo le preocupa sobre su hijo, consulte con " +
          "su pediatra, y para cuestiones de compra, facturación o impuestos, con su asesor.",
      disclaimerLink: "Condiciones completas",
    },
    common: {
      free: "Gratis",
      download: "Descargar",
      letter: "Carta",
      a4: "A4",
      amazon: "Comprar en Amazon",
      updated: "Actualizado",
    },
  },
  ru: {
    htmlLang: "ru",
    langName: "Русский",
    nav: {
      home: "Главная",
      tools: "Подбор раскраски",
      programs: "Для программ",
      ages: "По возрасту",
      guides: "Статьи",
      printables: "Бесплатные листы",
      faq: "Часто задаваемые вопросы",
      about: "О нас",
      terms: "Права и конфиденциальность",
    },
    home: {
      hero: "Первая книга-раскраска для малышей от 1 до 3 лет",
      lead:
        "111 больших простых рисунков с толстыми линиями, по одному на странице. Животные, " +
          "морские обитатели, сказочные герои, транспорт, цветы и еда. Слово под каждым " +
          "рисунком тоже можно раскрасить, поэтому ребенок постепенно знакомится с буквами.",
      guideTitle: "Все о первых раскрасках для малышей от 1 до 3 лет",
      bannerTitle: "Первые раскраски для малыша",
      bannerSubtitle:
        "Все о первых раскрасках для малышей от 1 до 3 лет",
      bannerQuestions: [
        "Когда знакомить ребенка с мелками и карандашами?",
        "Какие раскраски выбрать в 1-3 года?",
        "Как превратить первые линии в игру, развитие и радость?",
      ],
      pickerTitle: "Какая раскраска подойдет вашему ребенку",
      pickerLead: "Четыре вопроса, около тридцати секунд. Мы ничего не сохраняем и никуда не " +
                    "передаем.",
      whatTitle: "Что это за сайт",
      whatText:
        "Этот сайт посвящен самому первому этапу рисования: от первых линий до первых " +
          "попыток осознанно раскрашивать простые формы. Информация о том, что обычно умеют " +
          "дети в разном возрасте, основана на опубликованных нормах развития. Источники " +
          "указаны внизу страницы. Сайт ведет издательство Magic of Discoveries LLC из Майами, " +
          "штат Флорида.",
      whyTitle: "Почему первая раскраска отличается от обычной",
      why: [
        "Толщина линии имеет значение. Тонкий контур малышу сложнее увидеть, особенно когда " +
          "он только учится держать карандаш и еще часто выходит за границы рисунка.",
        "Один рисунок на странице. Несколько предметов на одном листе могут отвлекать " +
          "малыша, которому пока трудно долго удерживать внимание.",
        "Рисунок должен быть крупным. Маленькую картинку на большой странице сложнее " +
          "раскрашивать: она требует точности движений, которой у малыша пока нет.",
        "Рисунок должен быть узнаваемым. Малышу интереснее раскрашивать животных, предметы и " +
          "другие образы, которые он уже знает и может назвать.",
        "Печать только с одной стороны. Фломастер может пройти сквозь бумагу и испортить " +
          "рисунок на обороте.",
      ],
      printablesTitle: "Бесплатные листы для печати",
      printablesLead:
        "Десять рисунков прямо из книги, в том же порядке. Распечатайте один из них, дайте " +
          "ребенку карандаш, и уже через несколько минут вы поймете, подходит ли ему такая " +
          "раскраска.",
      printablesCta: "Посмотреть все бесплатные листы",
      bookTitle: "Книга",
      bookLead:
        "На английском и испанском книга выходит в печатном виде, а русская версия доступна " +
          "в виде файла для печати дома.",
      bookCta: "О книге",
      sourcesTitle: "На чем основаны данные о развитии",
      sourcesLead:
        "Возраст на этом сайте указан ориентировочно, а не как строгая граница. Каждый " +
          "ребенок развивается в своем темпе, поэтому разница в несколько месяцев совершенно " +
          "естественна.",
    },
    picker: {
      start: "Начать",
      stepOf: (n, total) => `Вопрос ${n} из ${total}`,
      back: "Назад",
      again: "Начать заново",
      resultTitle: "Что подходит вашему ребенку сейчас",
      canTitle: "Что обычно умеет ребенок на этом этапе",
      lookForTitle: "На что обратить внимание при выборе раскраски",
      tryTitle: "Распечатайте и попробуйте сегодня",
      tryLead: "Листы, подобранные для этого этапа. Бесплатно и без регистрации.",
      exTitle: "Как выглядит подходящая страница",
      exLead:
        "Три рисунка из книги, подобранные для этого этапа. Посмотрите, сколько листа занимает " +
          "рисунок и сколько внутри него отдельных участков.",
      bookLine: "Наша книга для этого этапа",
      disclaimer:
        "Это общая информация, основанная на опубликованных нормах развития, а не оценка " +
          "развития вашего ребенка. Если вас что-то беспокоит, поговорите с педиатром.",
      q: {
        age: {
          q: "Сколько лет вашему ребенку?",
          a: [
            { value: "1", label: "Около года" },
            { value: "2", label: "Около двух лет" },
            { value: "3", label: "Около трех лет" },
            { value: "4", label: "Четыре года и старше" },
          ],
        },
        grip: {
          q: "Как ребенок держит карандаш?",
          a: [
            { value: "fist", label: "В кулаке, всей ладонью" },
            { value: "fingers", label: "Пальцами, но неуверенно" },
            { value: "pencil", label: "Почти как взрослый" },
          ],
        },
        inside: {
          q: "Как ребенок обычно раскрашивает?",
          a: [
            { value: "across", label: "Рисует линии по всему листу" },
            { value: "near", label: "Попадает по рисунку, но часто выходит за контур" },
            { value: "inside", label: "В основном раскрашивает внутри контура" },
          ],
        },
        attention: {
          q: "Сколько времени ребенок обычно занимается одной страницей?",
          a: [
            { value: "short", label: "Минуту-две" },
            { value: "medium", label: "Около пяти минут" },
            { value: "long", label: "Десять минут и больше" },
          ],
        },
      },
    },
    sec: {
      questions: "Что спрашивают родители",
      faqElsewhere: "Отвечено на других страницах сайта",
      faqElsewhereLead:
        "Эти вопросы задают не реже, но каждому место на своей странице, рядом с остальным " +
        "по той же теме. Повторить их здесь значило бы разделить ответ надвое.",
      faqAll: "Все вопросы о книге и о раскрашивании",
      coverAgeTitle: "Что на самом деле означает возраст на обложке",
      coverAgeLead:
        "Возраст на обложке не определяется единым стандартом. Его указывает издатель, " +
          "поэтому две книги с одинаковой маркировкой 2-4 года могут заметно отличаться по " +
          "сложности. Разберемся, что обычно означают такие возрастные пометки и почему " +
          "ориентироваться только на них не стоит.",
      agesLabel: (n) => `Возраст ${n}`,
      watchOut: "Осторожно",
      stagesInOrder: "Четыре этапа по порядку",
      stagesHome: "Четыре этапа первого рисования",
      lookForPage: "На что обратить внимание на странице",
      atTable: "Как это проходит за столом на самом деле",
      stagePages: "Страницы для этого этапа, бесплатно",
      neighbours: "До и после этого этапа",
      tryToday: "Попробуйте сегодня на одном листе",
      whereFits: "Как этот этап связан с развитием ребенка",
      readNext: "Читайте дальше",
      stageReading: "Что чаще всего спрашивают на этом этапе",
      stageReadingLead:
        "Эти статьи отвечают на вопросы, которые возникают именно сейчас: чем рисовать, " +
        "сколько ребенок обычно сидит над одной страницей и что делать с грязью вокруг стола.",
      ageForStage: "Если вы искали по возрасту",
      guidesList: "Все статьи раздела",
      sheetsList: "Десять листов, скачать бесплатно",
      sheetsByStage: "Какой лист какому этапу подходит",
      sheetsByStageLead:
        "Десять листов не одинаково простые. На каждом посчитано, сколько внутри рисунка " +
        "отдельных участков, и измерена толщина контура, от этого и зависит уровень. " +
        "Выбирайте по тому, что ребенок делает сейчас, а не только по возрасту.",
      outcomeLink: "Подробная страница об этом этапе",
      buyNote: "Файл для печати. Его можно распечатывать дома столько раз, сколько нужно.",
      bookOneLiner:
        "Мы выпускаем одну раскраску для этого возраста: 111 рисунков с толстым контуром, по " +
          "одному на странице, печать только с одной стороны.",
      outgrown:
        "Наша книга рассчитана на более ранний этап, поэтому здесь мы ее не предлагаем. " +
          "Сейчас ребенку лучше подойдет раскраска с более детальными рисунками или книга с " +
          "пошаговым рисованием, где он сможет создавать рисунок сам.",
      soon: "Файл для печати, скоро появится",
      buyPdf: "Купить файл для печати",
      pdfNote:
        "Файл для печати открывается в нашем собственном магазине и приходит на почту после " +
        "оплаты. Печатать его дома можно столько раз, сколько нужно.",
      stageTitle: (title, age) => `${title}: раскрашивание ${age}`,
      stageMetaTitle: (title, age) => `${title}: ${age.replace(/^примерно /, "")}`,
      sheetAlt: (name) => `Бесплатная раскраска для печати: ${name}`,
      pageAlt: (name) =>
        `Страница из книги, бесплатно для печати: ${name}, толстый контур, один рисунок на странице`,
    },
    footer: {
      about:
        "Toddler Coloring Book (Раскраска для малышей) - проект издательства Magic of " +
          "Discoveries LLC из Майами, штат Флорида. Здесь мы рассказываем о первых этапах " +
          "рисования и создаем раскраски для самых маленьких.",
      catalog: "Наш каталог",
      rights: "Все рисунки на этом сайте созданы нами.",
      disclaimer:
        "Все, что мы публикуем на этом сайте, носит справочный характер и не является " +
          "рекомендацией по конкретному ребенку или конкретной ситуации. Это не медицинская, " +
          "не юридическая и не налоговая консультация. Возрастные ориентиры взяты из " +
          "опубликованных источников и описывают детей в целом: если вас что-то беспокоит в " +
          "развитии вашего ребенка, обратитесь к педиатру, а по вопросам покупки, документов " +
          "и налогов - к своему специалисту.",
      disclaimerLink: "Подробные условия",
    },
    common: {
      free: "Бесплатно",
      download: "Скачать",
      letter: "US Letter",
      a4: "A4",
      amazon: "Купить на Amazon",
      updated: "Обновлено",
    },
  },
};
