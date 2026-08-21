import type { UiLang } from "./dictionaries";

/* Единственная книга этого сайта. Два издания, английское и испанское,
   это одна и та же книга: те же 111 рисунков, разные подписи под ними.

   Все данные взяты с настоящих карточек на Amazon. Ничего не придумано:
   ни число страниц, ни оценка, ни размер. Расхождение между сайтом
   и карточкой магазина замечает и покупатель, и поисковик. */

export type Edition = {
  lang: UiLang;
  title: string;
  subtitle: string;
  /** Номер книги в Amazon. По нему собирается ссылка на товар. */
  asin: string;
  price: string;
  published: string;
  size: string;
  cover: string;
  coverSize: { w: number; h: number };
  rating: { value: number; count: number };
  lead: string;
  inside: string[];
  /** Кому книга подходит и кому нет. Второе важнее первого:
      родитель, которому честно сказали "не берите", возвращается. */
  forWhom: string;
  notFor: string;
  faq: { q: string; a: string }[];
  slug: string;
  /** Ролик с перелистыванием книги. Снимает главное сомнение
      родителя перед покупкой: что там внутри на самом деле. */
  video: {
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
      узнаваемый предмет. Ровно те три свойства, о которых говорит сайт. */
  artwork: [
    {
      file: "/art/simple.png",
      alt: {
        en: "Simple: an outline turtle drawn with thick lines, one object on the page",
        es: "Simples: una tortuga de contorno grueso, un solo objeto en la página",
      },
    },
    {
      file: "/art/big.png",
      alt: {
        en: "Big: a cow drawing filling the page, colored in by a small child",
        es: "Grandes: una vaca que llena la hoja, coloreada por un niño pequeño",
      },
    },
    {
      file: "/art/cute.png",
      alt: {
        en: "Recognizable: a smiling red car, one of the everyday objects in the book",
        es: "Reconocibles: un coche rojo sonriente, uno de los objetos cotidianos del libro",
      },
    },
  ],
} as const;

export const editions: Record<UiLang, Edition> = {
  en: {
    lang: "en",
    title: "First Coloring Book for Toddlers Ages 1-3",
    subtitle: "111 big, simple drawings, one per page",
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
      "first coloring book, in preschool and daycare, and as a gift when you do not know the " +
      "child well.",
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
      "primer libro para colorear, en preescolar y guardería, y como regalo cuando no se conoce " +
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
};
