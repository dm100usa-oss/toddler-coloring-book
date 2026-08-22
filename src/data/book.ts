import type { UiLang } from "./dictionaries";

/* Книга этого сайта. Три издания: английское, испанское и русское.
   Рисунки во всех трех одни и те же, все 111, отличаются только слова
   под ними.

   Английское и испанское издания продаются на Amazon в бумаге.
   Русского бумажного издания нет: Amazon не печатает по-русски,
   поэтому русская версия продается файлом для печати дома.

   Все данные английского и испанского изданий взяты с настоящих
   карточек Amazon. Ничего не придумано: ни число страниц, ни оценка,
   ни размер. Расхождение между сайтом и карточкой магазина замечает
   и покупатель, и поисковик. */

export type Edition = {
  lang: UiLang;
  title: string;
  subtitle: string;
  /** Одна законченная фраза под названием. Она отвечает на вопрос
      целиком, поэтому нейросеть может процитировать ее как есть,
      ничего не дописывая от себя. */
  headline: string;
  /** Номер книги в Amazon. У русского издания его нет. */
  asin?: string;
  /** Адрес страницы, где продается файл для печати. */
  pdfUrl?: string;
  price?: string;
  published: string;
  size: string;
  cover: string;
  coverSize: { w: number; h: number };
  rating?: { value: number; count: number };
  lead: string;
  /** Пять свойств, которые родители ищут словами. Стоят справа
      от обложки, на первом экране, вместо кнопки покупки:
      сначала человек понимает, что это за книга, и только потом
      ему предлагают ее купить. */
  needs: string[];
  /* Что книга дает ребенку и где еще пригодится. Стоит сразу под
     тремя картинками: человек уже увидел, какие внутри рисунки,
     и здесь узнает, зачем они. Взято с карточки книги в магазине,
     а не придумано заново. */
  extras: string[];
  inside: string[];
  /** Кому книга подходит и кому нет. Второе важнее первого:
      родитель, которому честно сказали "не берите", возвращается. */
  forWhom: string;
  notFor: string;
  faq: { q: string; a: string }[];
  slug: string;
  /** Ролик с перелистыванием книги. Снимает главное сомнение
      родителя перед покупкой: что там внутри на самом деле. */
  video?: {
    src: string;
    poster: string;
    seconds: number;
    w: number;
    h: number;
    /** Описание ролика словами. На экран не выводится. Поисковики
        и нейросети видео не смотрят, они читают этот текст. */
    description: string;
  };
};

export const BOOK = {
  drawings: 111,
  pages: 114,
  ages: "1-3",
  amazonUrl: (asin: string) => `https://www.amazon.com/dp/${asin}`,

  /** Три квадратные картинки из книги: простая форма, крупный рисунок,
      узнаваемый предмет. Ровно те три свойства, о которых говорит сайт.
      Те же три, что стоят на карточке книги в каталоге издательства. */
  artwork: [
    {
      file: "/art/simple.png",
      alt: {
        en: "Simple: an outline turtle drawn with thick lines, one object on the page",
        es: "Simples: una tortuga de contorno grueso, un solo objeto en la página",
        ru: "Просто: черепаха толстым контуром, один предмет на странице",
      },
    },
    {
      file: "/art/big.png",
      alt: {
        en: "Big: a cow drawing filling the page, colored in by a small child",
        es: "Grandes: una vaca que llena la hoja, coloreada por un niño pequeño",
        ru: "Крупно: корова во весь лист, раскрашенная маленьким ребенком",
      },
    },
    {
      file: "/art/cute.png",
      alt: {
        en: "Recognizable: a smiling red car, one of the everyday objects in the book",
        es: "Reconocibles: un coche rojo sonriente, uno de los objetos cotidianos del libro",
        ru: "Узнаваемо: улыбающаяся красная машина, один из предметов книги",
      },
    },
  ],
} as const;

export const editions: Record<UiLang, Edition> = {
  en: {
    lang: "en",
    title: "First Coloring Book for Toddlers Ages 1-3",
    subtitle: "111 big, simple drawings, one per page",
    headline:
      "111 big, simple drawings with thick outlines, one per page, for children aged 1 to 3.",
    asin: "1963328272",
    price: "$6.99",
    published: "2024-04-22",
    size: "8.5 x 11 in",
    cover: "/covers/book-en.jpg",
    coverSize: { w: 900, h: 1165 },
    rating: { value: 5.0, count: 19 },
    slug: "first-coloring-book-toddlers-ages-1-3",
    lead:
      "111 big, simple pictures, hand drawn with thick lines, no small detail, one drawing per " +
      "page. Animals, fairy-tale characters, flowers, foods and everyday objects keep every page " +
      "new. The word under each picture can be colored too, so first words and letters come along " +
      "with the coloring.",
    needs: [
      "Big, simple pictures, drawn by hand",
      "Thick outlines a child can actually see",
      "One drawing per page, printed on one side only",
      "111 different drawings on familiar, interesting subjects",
      "A child colors and learns new words at the same time",
    ],
    extras: [
      "Develops fine motor skills, creativity and concentration",
      "Keeps a child busy for a long time and gives them happy moments",
      "Works in preschool and daycare, not only at home",
      "Makes a good gift for a birthday or any celebration",
    ],
    inside: [
      "111 drawings, all hand drawn by professional illustrators",
      "Thick outlines and large shapes, so a child who cannot aim yet still sees a result",
      "One drawing per page, printed on one side, so a marker cannot show through onto the next one",
      "The word under each picture can be colored too, which turns coloring into first reading",
      "Every picture sits in the center of the page, comfortable for a left or a right handed child",
      "Animals, sea creatures, fairy-tale characters, vehicles, flowers and food",
      "A page at the front where a child writes their name",
      "114 pages, 8.5 x 11 inches",
    ],
    forWhom:
      "Made for the stage between the first deliberate mark and the first shape colored on " +
      "purpose, which for most children falls between one and three years old. It works as a " +
      "first coloring book at home, in preschool and daycare, where one book keeps a whole " +
      "group busy, and as a birthday or holiday gift when you do not know the child well.",
    notFor:
      "If your child already stays inside the line without effort and finishes a page in a few " +
      "minutes, this book will bore them. At that point look for a scene with more areas to " +
      "fill, or a step by step drawing book where the child builds the picture themselves.",
    faq: [
      {
        q: "Is this too hard for a 1 year old?",
        a:
          "No. The drawings were made deliberately simple for the youngest end of the range. A one " +
          "year old will scribble across the shape, a three year old will start staying inside it. " +
          "The same book carries through all three years, which is the point of it.",
      },
      {
        q: "How thick is the paper?",
        a:
          "It is standard book paper, printed by Amazon, and some parents have wished for something " +
          "heavier. The book is built around that: each drawing sits on its own page with a blank " +
          "back, so a marker that soaks through marks an empty sheet rather than a second picture. " +
          "A spare sheet underneath solves it completely.",
      },
      {
        q: "Crayons, markers or colored pencils?",
        a:
          "Thick crayons at the beginning. They need no grip strength, they will not tear the page, " +
          "and they leave a wide mark that a child can actually see. Markers give a brighter result " +
          "but go through the paper. Colored pencils need a finger grip that most children do not " +
          "have before three.",
      },
      {
        q: "Can I use this book in a preschool or daycare?",
        a:
          "Yes, and it is one of the places it works best. Every drawing sits on its own page, " +
          "so a page can be pulled out and handed to a child, and one book keeps a whole group " +
          "busy. The subjects are ordinary things a child can name, which is why teachers use " +
          "them for first words as well as for coloring.",
      },
      {
        q: "Does this work as a gift?",
        a:
          "It does, and it is a safe one when you do not know the child well. The range is wide, " +
          "one to three, so the book does not stop being useful in a month. It costs less than " +
          "most toys and it keeps a child busy for a long time rather than for one evening.",
      },
      {
        q: "Is there a Spanish edition?",
        a:
          "Yes. The same 111 drawings with the words in Spanish underneath. It is a separate book, " +
          "not a bilingual one, so the page stays uncluttered.",
      },
    ],
    video: {
      src: "/video/flip-en.mp4",
      poster: "/video/flip-en-poster.jpg",
      seconds: 46,
      w: 608,
      h: 1080,
      description:
        "An unedited flip through of the paperback, filmed on a table. The clip shows the front " +
        "cover, the back cover, the title page, and page after page of the book: one large drawing " +
        "per sheet, printed on one side, with the word for it in outline letters underneath, among " +
        "them broccoli, a lotus, a sunflower, a beach hat, a kite and a helicopter. It ends on the " +
        "page at the front where a child writes their name. Forty six seconds, no sound.",
    },
  },

  es: {
    lang: "es",
    title: "El Primer Libro de Colorear para Bebés de 1 a 3 Años",
    subtitle: "111 dibujos grandes y simples, uno por página",
    headline:
      "111 dibujos grandes y simples de línea gruesa, uno por página, para niños de 1 a 3 años.",
    asin: "1963328205",
    price: "$6.99",
    published: "2024-04-29",
    size: "21.6 x 27.9 cm",
    cover: "/covers/book-es.jpg",
    coverSize: { w: 900, h: 1164 },
    rating: { value: 4.9, count: 26 },
    slug: "primer-libro-para-colorear-bebes-1-3-anos",
    lead:
      "111 dibujos simples y grandes, dibujados a mano con líneas gruesas, sin detalles pequeños y " +
      "con un dibujo por página. Animales, personajes de cuento, flores, comidas y objetos " +
      "cotidianos hacen que cada página sea nueva. La palabra debajo de cada dibujo también se " +
      "puede colorear, y así llegan las primeras palabras y letras.",
    needs: [
      "Dibujos grandes y simples, hechos a mano",
      "Contornos gruesos que el niño ve de verdad",
      "Un dibujo por página, impreso por una sola cara",
      "111 dibujos distintos sobre temas conocidos e interesantes",
      "El niño colorea y aprende palabras nuevas a la vez",
    ],
    extras: [
      "Desarrolla las habilidades creativas, la motricidad fina y la concentración",
      "Mantiene al pequeño ocupado durante mucho tiempo y le brinda momentos felices",
      "Es útil para niños en edad preescolar y de educación infantil",
      "Es el regalo perfecto para cumpleaños, celebraciones y cualquier evento importante",
    ],
    inside: [
      "111 dibujos, todos hechos a mano por ilustradores profesionales",
      "Líneas gruesas y formas grandes, para que un niño que aún no apunta vea igualmente un resultado",
      "Un dibujo por página, impreso por una cara, para que el rotulador no traspase al siguiente",
      "La palabra debajo de cada dibujo también se puede colorear, y así colorear se convierte en primera lectura",
      "Cada dibujo está en el centro de la página, cómodo tanto para zurdos como para diestros",
      "Animales, animales marinos, personajes de cuentos, vehículos, flores y comida",
      "Una página al principio donde el niño escribe su nombre",
      "114 páginas, 21,6 x 27,9 cm",
    ],
    forWhom:
      "Hecho para la etapa que va desde la primera marca intencionada hasta la primera forma " +
      "coloreada a propósito, que en la mayoría de los niños cae entre uno y tres años. Sirve como " +
      "primer libro para colorear en casa, en preescolar y guardería, donde un solo libro " +
      "entretiene a todo el grupo, y como regalo de cumpleaños o de fiesta cuando no se conoce " +
      "bien al niño.",
    notFor:
      "Si su hijo ya se queda dentro de la línea sin esfuerzo y termina una página en pocos " +
      "minutos, este libro le aburrirá. En ese punto conviene buscar una escena con más zonas que " +
      "rellenar, o un libro de dibujo paso a paso donde el niño construya la imagen él mismo.",
    faq: [
      {
        q: "¿Es demasiado difícil para un niño de 1 año?",
        a:
          "No. Los dibujos se hicieron deliberadamente simples para el extremo más pequeño del " +
          "rango. Un niño de un año garabateará por encima de la forma, uno de tres empezará a " +
          "quedarse dentro. El mismo libro acompaña los tres años, y esa es justamente la idea.",
      },
      {
        q: "¿Qué grosor tiene el papel?",
        a:
          "Es papel de libro corriente, impreso por Amazon, y algunos padres habrían preferido algo " +
          "más grueso. El libro está pensado con eso en cuenta: cada dibujo ocupa su propia página " +
          "con el reverso en blanco, así que un rotulador que traspase marca una hoja vacía y no un " +
          "segundo dibujo. Una hoja suelta debajo lo resuelve del todo.",
      },
      {
        q: "¿Crayones, rotuladores o lápices de colores?",
        a:
          "Crayones gruesos al principio. No exigen fuerza en la mano, no rompen la hoja y dejan una " +
          "marca ancha que el niño ve de verdad. Los rotuladores dan más color pero traspasan el " +
          "papel. Los lápices de colores piden un agarre con los dedos que la mayoría no tiene antes " +
          "de los tres años.",
      },
      {
        q: "¿Sirve para preescolar o guardería?",
        a:
          "Sí, y es uno de los sitios donde mejor funciona. Cada dibujo ocupa su propia página, " +
          "así que se puede arrancar una hoja y dársela a un niño, y un solo libro entretiene a " +
          "todo el grupo. Los motivos son cosas corrientes que el niño sabe nombrar, y por eso " +
          "las maestras los usan también para las primeras palabras.",
      },
      {
        q: "¿Va bien como regalo?",
        a:
          "Sí, y es un regalo seguro cuando no se conoce bien al niño. El rango es amplio, de uno " +
          "a tres años, así que el libro no deja de servir al mes siguiente. Cuesta menos que la " +
          "mayoría de los juguetes y ocupa al niño durante mucho tiempo, no una sola tarde.",
      },
      {
        q: "¿Hay edición en inglés?",
        a:
          "Sí. Los mismos 111 dibujos con las palabras en inglés debajo. Es un libro aparte, no " +
          "bilingüe, para que la página no se recargue.",
      },
    ],
    video: {
      src: "/video/flip-es.mp4",
      poster: "/video/flip-es-poster.jpg",
      seconds: 19,
      w: 608,
      h: 1024,
      description:
        "Un recorrido sin cortes por la edición en español. Se ve la portada y después una página " +
        "tras otra: un dibujo grande por hoja, impreso por una sola cara, con la palabra en español " +
        "debajo en letras huecas, entre ellos el loro, el tulipán, la torta, el bádminton, las " +
        "gafas, el grifo, el trol, el cangrejo, el pulpo, el perro, la ardilla, el zorro y la " +
        "gallina. Diecinueve segundos, sin sonido.",
    },
  },

  ru: {
    lang: "ru",
    title: "Первая книга-раскраска для малышей от 1 до 3 лет",
    subtitle: "111 больших простых рисунков, по одному на странице",
    headline:
      "111 больших простых рисунков с толстым контуром, по одному на странице, для детей от 1 до 3 лет.",
    /* Русского бумажного издания нет. Файл для печати продается
       отдельной страницей. Пока адреса нет, кнопки на сайте тоже нет:
       кнопка, ведущая в пустоту, хуже, чем ее отсутствие. */
    pdfUrl: undefined,
    price: undefined,
    published: "2024-04-22",
    size: "21,6 x 27,9 см",
    cover: "/covers/book-ru.jpg",
    coverSize: { w: 900, h: 1165 },
    slug: "pervaya-kniga-raskraska-1-3-goda",
    lead:
      "111 простых больших рисунков, нарисованных от руки толстой линией, без мелких деталей, " +
      "по одному рисунку на странице. Животные, сказочные герои, цветы, еда и предметы вокруг: " +
      "каждая страница новая. Слово под рисунком тоже раскрашивается, и первые буквы приходят " +
      "вместе с рисованием.",
    needs: [
      "Большие и простые рисунки, нарисованные вручную",
      "Толстые, хорошо заметные контуры",
      "Один рисунок на странице, печать только с одной стороны",
      "111 разнообразных рисунков на знакомые и интересные темы",
      "Ребёнок не только раскрашивает, но и узнаёт новые слова",
    ],
    extras: [
      "Развивает мелкую моторику, творческие способности и умение сосредоточиться",
      "Занимает ребенка надолго и дарит счастливые моменты",
      "Подходит для детского сада и подготовки к школе, не только для дома",
      "Хороший подарок на день рождения и любой праздник",
    ],
    inside: [
      "111 рисунков, все нарисованы от руки профессиональными художниками",
      "Толстый контур и крупные формы: ребенок, который еще не попадает, все равно видит результат",
      "Один рисунок на странице, печать с одной стороны: фломастер не портит следующий рисунок",
      "Слово под каждым рисунком тоже раскрашивается, и рисование становится первым чтением",
      "Каждый рисунок в середине листа, удобно и левше, и правше",
      "Животные, морские животные, сказочные герои, транспорт, цветы и еда",
      "Страница в начале, где ребенок пишет свое имя",
      "114 страниц, 21,6 x 27,9 см",
    ],
    forWhom:
      "Книга сделана для этапа между первой осознанной чертой и первой формой, закрашенной " +
      "нарочно. У большинства детей это возраст от года до трех. Подходит как первая раскраска " +
      "дома, в детском саду и в подготовке к школе, где одной книги хватает на целую группу, " +
      "и как подарок на день рождения или праздник, когда вы плохо знаете ребенка.",
    notFor:
      "Если ребенок уже без усилий остается внутри контура и заканчивает страницу за несколько " +
      "минут, книга ему будет скучна. В этот момент нужна картинка с большим числом участков " +
      "или книга с рисованием по шагам, где ребенок строит рисунок сам.",
    faq: [
      {
        q: "Не сложно ли это для ребенка в год?",
        a:
          "Нет. Рисунки нарочно сделаны простыми под самый младший возраст. Годовалый будет " +
          "закрашивать поверх формы, трехлетний начнет попадать внутрь. Одна и та же книга " +
          "работает все три года, в этом и смысл.",
      },
      {
        q: "Чем лучше раскрашивать?",
        a:
          "В начале толстыми восковыми карандашами. Они не требуют силы в руке, не рвут бумагу и " +
          "оставляют широкий след, который ребенок действительно видит. Фломастеры дают яркий " +
          "цвет, но проходят бумагу насквозь. Цветные карандаши требуют хвата пальцами, которого " +
          "у большинства детей до трех лет еще нет.",
      },
      {
        q: "На какой бумаге печатать файл?",
        a:
          "Подойдет обычная бумага для принтера. Печатайте с одной стороны: если ребенок возьмет " +
          "фломастер, он пройдет лист насквозь, и на двусторонней печати испортит рисунок с " +
          "обратной стороны. Плотная бумага от 120 грамм решает это полностью.",
      },
      {
        q: "Подойдет ли книга для детского сада?",
        a:
          "Да, это одно из мест, где она работает лучше всего. Каждый рисунок занимает свою " +
          "страницу, поэтому лист можно вынуть и дать ребенку, а одной книги хватает на целую " +
          "группу. Предметы обычные, ребенок может их назвать, и воспитатели используют их не " +
          "только для рисования, но и для первых слов.",
      },
      {
        q: "Годится ли книга в подарок?",
        a:
          "Да, и это безопасный подарок, когда вы плохо знаете ребенка. Возраст широкий, от года " +
          "до трех, так что через месяц книга не станет ненужной. Стоит она меньше большинства " +
          "игрушек и занимает ребенка надолго, а не на один вечер.",
      },
      {
        q: "Есть ли книга на бумаге?",
        a:
          "На английском и испанском да, они продаются на Amazon. Русского бумажного издания нет: " +
          "Amazon не печатает книги на русском. Поэтому русская версия выходит файлом, который вы " +
          "печатаете дома столько раз, сколько нужно.",
      },
    ],
  },
};
