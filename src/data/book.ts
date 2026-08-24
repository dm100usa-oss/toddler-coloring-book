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
  /* Одна строка, которая остается на экране после списков. Все
     остальное, что было в длинном вводном абзаце, уже стоит выше
     в пунктах: повторять его второй раз незачем. */
  note: string;
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
  /** Что говорят родители, купившие книгу. Написано нами по смыслу
      отзывов на Amazon, своими словами и без имен: чужой текст
      в кавычках на своем сайте это чужая собственность. Сюда идет
      только то, чего нет в списках выше: как книга ведет себя
      в жизни, а не из чего она состоит. Иначе страница начинает
      повторять сама себя, и человек перестает ее читать. */
  parents: string[];
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

/* Магазин, где издательство продает файлы для печати. Тот же самый,
   что стоит на карточках книг в основном каталоге: человек, пришедший
   с обоих сайтов, попадает в одно и то же место. */
const WIX = "https://dvchbooks.wixsite.com/website-13/product-page/";

export const BOOK = {
  drawings: 111,
  pages: 114,
  ages: "1-3",
  amazonUrl: (asin: string) => `https://www.amazon.com/dp/${asin}`,

  /** Отзывы на карточке книги. Отдельный адрес, а не якорь на середину
      страницы: Amazon держит для отзывов собственную страницу, и она
      открывается сразу на них, без прокрутки. */
  reviewsUrl: (asin: string) =>
    `https://www.amazon.com/product-reviews/${asin}`,

  /** Три квадратные картинки из книги: простая форма, крупный рисунок,
      узнаваемый предмет. Ровно те три свойства, о которых говорит сайт.
      Те же три, что стоят на карточке книги в каталоге издательства. */
  artwork: [
    {
      file: "/art/simple.png",
      alt: {
        en: "Simple: an outline turtle drawn with thick lines, one object on the page",
        es: "Simples: una tortuga con contorno grueso y un solo dibujo en la página",
        ru: "Просто: черепаха с толстым контуром, один рисунок на странице",
      },
    },
    {
      file: "/art/big.png",
      alt: {
        en: "Big: a cow drawing filling the page, colored in by a small child",
        es: "Grandes: una vaca que ocupa casi toda la hoja, coloreada por un niño pequeño",
        ru: "Крупно: корова почти во весь лист, раскрашенная маленьким ребенком",
      },
    },
    {
      file: "/art/cute.png",
      alt: {
        en: "Recognizable: a smiling red car, one of the everyday objects in the book",
        es: "Reconocibles: un coche rojo sonriente, uno de los dibujos del libro",
        ru: "Узнаваемо: улыбающаяся красная машина, один из рисунков книги",
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
    pdfUrl: WIX + "english-4",
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
    note:
      "The word under each picture can be colored too, so first words and letters come along " +
      "with the coloring.",
    needs: [
      "Big, simple pictures, drawn by hand",
      "Thick outlines a child can actually see",
      "One drawing per page, printed on one side only",
      "111 different drawings on familiar, interesting subjects",
      "A child colors and learns new words at the same time",
      "Ten drawings from the book can be printed right now, free and without signing up",
    ],
    extras: [
      "Develops fine motor skills, creativity and concentration",
      "Keeps a child busy for a long time and gives them happy moments",
      "Works in preschool and daycare, not only at home",
      "Makes a good gift for a birthday or any celebration",
      "The word under each picture can be colored too, so first words and letters come along with the coloring",
    ],
    inside: [
      "111 drawings, all hand drawn by professional illustrators",
      "Thick outlines and large shapes, so a child who is still learning to aim can see a clear " +
      "result",
      "One drawing per page, printed on one side, so a marker cannot show through onto the next one",
      "The word under each picture can be colored too, which brings first words and letters into " +
      "the coloring",
      "Every picture sits in the center of the page, comfortable for a left or a right handed child",
      "Animals, sea creatures, fairy-tale characters, vehicles, flowers and food",
      "A page at the front where a child writes their name",
      "114 pages, 8.5 x 11 inches",
    ],
    parents: [
      "A child finishes one picture on their own and turns the page for the next one",
      "Large, simple pictures color in almost without effort, and a child starts to trust " +
      "their own hand",
      "Right for the age, which is what parents mention more often than anything else",
      "One book is enough for a long drive, a waiting room or a rainy afternoon",
      "Light enough that it leaves the house with you",
      "Children look through the pages even without crayons and ask what each animal is called",
      "Enough different subjects, from a mermaid to a submarine to a donut, that a child can " +
      "pick",
      "Bought for the youngest in the family, when the older ones have moved on to harder " +
      "coloring books",
      "Finished pages get cut out, dated and kept",
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
          "No. The drawings were made deliberately simple for the youngest end of the range. At one a " +
          "child may scribble across the shape, while closer to three they often begin to stay inside " +
          "it. The same book is meant to work across all three years.",
      },
      {
        q: "How thick is the paper?",
        a:
          "It is standard book paper, printed by Amazon, and some parents have wished for something " +
          "heavier. The book is built around that: each drawing sits on its own page with a blank back, " +
          "so a marker that soaks through marks an empty sheet rather than a second picture. A spare " +
          "sheet underneath takes care of most of it.",
      },
      {
        q: "Crayons, markers or colored pencils?",
        a:
          "Thick crayons at the beginning. They mark with very little pressure, they are easier on the " +
          "page, and they leave a wide mark that a child can actually see. Markers give a brighter " +
          "result but go through the paper. Colored pencils call for a more precise finger grip, which " +
          "usually comes later.",
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
      "111 dibujos grandes y simples con líneas gruesas, uno por página, para bebés de 1 a 3 " +
        "años.",
    asin: "1963328205",
    pdfUrl: WIX + "spanish-4",
    price: "$6.99",
    published: "2024-04-29",
    size: "21.6 x 27.9 cm",
    cover: "/covers/book-es.jpg",
    coverSize: { w: 900, h: 1164 },
    rating: { value: 4.9, count: 26 },
    slug: "primer-libro-para-colorear-bebes-1-3-anos",
    lead:
      "111 dibujos grandes y simples, hechos a mano con líneas gruesas, sin detalles " +
        "pequeños y con un solo dibujo por página. Animales, personajes de cuentos, flores, " +
        "comida y objetos cotidianos: en cada página hay algo nuevo para colorear. La palabra " +
        "debajo de cada dibujo también se puede colorear, para que el niño empiece a " +
        "familiarizarse con las palabras y las letras.",
    note:
      "La palabra debajo de cada dibujo también se puede colorear, para que el niño empiece " +
        "a familiarizarse con las palabras y las letras.",
    needs: [
      "Dibujos grandes y simples, hechos a mano",
      "Contornos gruesos y bien definidos",
      "Un dibujo por página, impreso por una sola cara",
      "111 dibujos distintos sobre temas conocidos e interesantes",
      "El niño colorea y, al mismo tiempo, descubre y aprende palabras nuevas",
      "Diez dibujos del libro se pueden imprimir ahora mismo, gratis y sin registro",
    ],
    extras: [
      "Ayuda a desarrollar la motricidad fina, la creatividad y la atención",
      "Entretiene al pequeño durante mucho tiempo y convierte el momento de colorear en una " +
        "actividad agradable",
      "Adecuado tanto para casa como para preescolar y guardería",
      "Una buena opción como regalo de cumpleaños o para otra ocasión especial",
      "La palabra debajo de cada dibujo también se puede colorear, para que el niño empiece " +
        "a familiarizarse con las letras",
    ],
    inside: [
      "111 dibujos, todos hechos a mano por ilustradores profesionales",
      "Líneas gruesas y formas grandes: aunque el niño todavía se salga con frecuencia del " +
        "contorno, le resultará cómodo colorear",
      "Un dibujo por página e impresión por una sola cara, para que el rotulador no estropee " +
        "el dibujo siguiente",
      "La palabra debajo de cada dibujo también se puede colorear, para que el niño empiece " +
        "a familiarizarse con las letras y las palabras",
      "Cada dibujo está centrado en la página, para que resulte cómodo tanto a niños zurdos " +
        "como diestros",
      "Animales, animales marinos, personajes de cuentos, vehículos, flores y comida",
      "Una página al principio del libro donde el niño puede escribir su nombre",
      "114 páginas, 21,6 x 27,9 cm",
    ],
    parents: [
      "El niño termina un dibujo por su cuenta y pasa la página para el siguiente",
      "Los dibujos grandes y simples se colorean casi sin esfuerzo, y el niño empieza a confiar " +
        "en su propia mano",
      "Adecuado para la edad, que es lo que más mencionan los padres",
      "Un solo libro alcanza para un viaje largo, una sala de espera o una tarde de lluvia",
      "Pesa poco, así que sale de casa con la familia",
      "Los niños hojean el libro incluso sin lápices y preguntan cómo se llama cada animal",
      "Hay temas de sobra, de una sirena a un submarino o una rosquilla, y el niño puede elegir",
      "Se compra para el más pequeño de la casa, cuando los mayores ya pasaron a libros más " +
        "difíciles",
      "Las páginas terminadas se recortan, se les pone la fecha y se guardan",
    ],
    forWhom:
      "El libro está pensado para niños que empiezan a dibujar y a colorear formas sencillas " +
        "de manera intencionada. Por lo general, esta etapa corresponde a edades de uno a tres " +
        "años. Puede ser su primer libro para colorear en casa, en preescolar o en la " +
        "guardería, y también es una buena opción como regalo de cumpleaños o para otra " +
        "ocasión, incluso si no conoce muy bien al niño.",
    notFor:
      "Si su hijo ya colorea dentro del contorno con facilidad y termina una página en pocos " +
        "minutos, este libro puede resultarle demasiado sencillo. En ese caso, conviene elegir " +
        "un libro con dibujos más detallados o uno de dibujo paso a paso, donde el niño cree " +
        "la imagen por sí mismo.",
    faq: [
      {
        q: "¿Es demasiado difícil para un niño de 1 año?",
        a:
          "No. Los dibujos se han hecho deliberadamente simples para los más pequeños. Un " +
            "niño de un año puede limitarse a pasar el crayón por el dibujo y salirse del " +
            "contorno, mientras que cerca de los tres años ya empezará a intentar colorear " +
            "dentro de la forma. Por eso, el mismo libro puede acompañar distintas etapas de " +
            "aprendizaje.",
      },
      {
        q: "¿Qué grosor tiene el papel?",
        a:
          "Es papel de libro corriente, impreso por Amazon, y algunos padres preferirían que " +
            "fuera más grueso. Por eso, cada dibujo está impreso en una sola cara y el reverso " +
            "queda en blanco: si el rotulador traspasa el papel, manchará una página vacía y " +
            "no el dibujo siguiente. Colocar una hoja suelta debajo ofrece una protección " +
            "adicional.",
      },
      {
        q: "¿Crayones, rotuladores o lápices de colores?",
        a:
          "Para empezar, lo mejor son los crayones gruesos. Son fáciles de sujetar con una " +
            "mano pequeña, dejan una marca visible sin necesidad de presionar mucho y no " +
            "suelen dañar el papel. Los rotuladores dan un color más intenso, pero pueden " +
            "traspasar la hoja. Los lápices de colores requieren un agarre más preciso y " +
            "suelen resultar más difíciles para los niños pequeños.",
      },
      {
        q: "¿Sirve para preescolar o guardería?",
        a:
          "Sí. El libro funciona bien para actividades en preescolar o guardería. Cada " +
            "dibujo ocupa una página independiente, por lo que se puede trabajar con una " +
            "página concreta con cada niño. Los dibujos representan animales, objetos y otros " +
            "elementos familiares, de modo que también pueden utilizarse para aprender y " +
            "practicar palabras nuevas.",
      },
      {
        q: "¿Va bien como regalo?",
        a:
          "Sí. Es una buena opción como regalo incluso si no conoce muy bien al niño. Está " +
            "pensado para un periodo amplio, de uno a tres años, por lo que puede seguir " +
            "utilizándolo a medida que desarrolla nuevas habilidades. Es un regalo sencillo y " +
            "útil que puede entretener al pequeño durante mucho tiempo.",
      },
      {
        q: "¿Hay edición en inglés?",
        a:
          "Sí. Son los mismos 111 dibujos, pero con las palabras en inglés debajo. Es una " +
            "edición independiente, no bilingüe, para que las páginas sigan siendo sencillas y " +
            "no estén sobrecargadas.",
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
      "111 больших простых рисунков с толстым контуром, по одному на странице. Для детей от " +
        "1 до 3 лет.",
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
      "111 больших простых рисунков, нарисованных от руки толстыми линиями, без мелких " +
        "деталей, по одному на странице. Животные, сказочные герои, цветы, еда и знакомые " +
        "предметы - на каждой странице новый рисунок. Слово под рисунком тоже можно " +
        "раскрасить, поэтому ребенок постепенно знакомится не только с картинками, но и с " +
        "буквами.",
    note:
      "Слово под рисунком тоже можно раскрасить, поэтому ребенок постепенно знакомится не " +
        "только с картинками, но и с буквами.",
    needs: [
      "Большие и простые рисунки, нарисованные вручную",
      "Толстые, четкие контуры",
      "Один рисунок на странице, печать только с одной стороны",
      "111 разных рисунков на знакомые и интересные детям темы",
      "Ребенок не только раскрашивает, но и узнает и запоминает новые слова",
      "Десять рисунков из книги можно распечатать прямо сейчас, бесплатно и без регистрации",
    ],
    extras: [
      "Помогает развивать мелкую моторику, творческие способности и внимание",
      "Надолго увлекает ребенка и превращает раскрашивание в приятное занятие",
      "Подходит не только для дома, но и для занятий в детском саду и подготовки к школе",
      "Подойдет в качестве подарка на день рождения или другой праздник",
      "Слово под рисунком тоже можно раскрасить, поэтому ребенок постепенно знакомится с " +
        "буквами",
    ],
    inside: [
      "111 рисунков, нарисованных от руки профессиональными художниками",
      "Толстый контур и крупные формы: даже если ребенок пока часто выходит за границы " +
        "рисунка, ему все равно удобно раскрашивать",
      "Один рисунок на странице и печать только с одной стороны: фломастер не испортит " +
        "следующий рисунок",
      "Слово под каждым рисунком тоже можно раскрасить - так ребенок постепенно знакомится с " +
        "буквами и словами",
      "Каждый рисунок расположен по центру листа, поэтому раскрашивать удобно и левше, и правше",
      "Животные, морские животные, сказочные герои, транспорт, цветы и еда",
      "В начале книги есть страница, где ребенок может написать свое имя",
      "114 страниц, 21,6 x 27,9 см",
    ],
    parents: [
      "Ребенок заканчивает рисунок сам и переворачивает страницу за следующим",
      "Крупные простые картинки раскрашиваются почти без усилий, и ребенок начинает верить " +
        "своей руке",
      "Подходит по возрасту, и это то, что родители отмечают чаще всего",
      "Одной книги хватает на долгую дорогу, на ожидание в очереди и на дождливый день",
      "Книга легкая, ее берут с собой из дома",
      "Дети листают ее даже без карандашей и спрашивают, как называется каждое животное",
      "Тем много, от русалки до подводной лодки и пончика, ребенку есть из чего выбрать",
      "Ее берут младшему в семье, когда старшим уже нужны раскраски посложнее",
      "Готовые страницы вырезают, подписывают датой и оставляют на память",
    ],
    forWhom:
      "Книга создана для детей, которые только начинают рисовать и учатся осознанно " +
        "раскрашивать простые формы. Обычно это возраст от одного до трех лет. Она подойдет " +
        "как первая раскраска для занятий дома или в детском саду, а также станет хорошим " +
        "подарком на день рождения или другой праздник, даже если вы не очень хорошо знаете " +
        "ребенка.",
    notFor:
      "Если ребенок уже легко раскрашивает внутри контура и справляется со страницей за " +
        "несколько минут, эта книга может показаться ему слишком простой. В таком случае лучше " +
        "выбрать раскраску с более детальными рисунками или книгу с пошаговым рисованием, где " +
        "ребенок сам создает рисунок.",
    faq: [
      {
        q: "Не слишком ли это сложно для годовалого ребенка?",
        a:
          "Нет. Рисунки специально сделаны простыми и рассчитаны на самых маленьких. В год " +
            "ребенок может просто проводить карандашом по рисунку и выходить за контур, а " +
            "ближе к трем годам уже старается раскрашивать внутри формы. Поэтому одна и та же " +
            "книга подходит детям с разным уровнем навыков.",
      },
      {
        q: "Чем лучше раскрашивать?",
        a:
          "Для начала лучше выбрать толстые восковые мелки или карандаши. Их удобно держать " +
            "маленькой рукой, они легко оставляют заметный след и не требуют сильного нажима. " +
            "Фломастеры дают яркий цвет, но могут просвечивать или проходить сквозь бумагу. " +
            "Обычными цветными карандашами маленьким детям пользоваться сложнее: они требуют " +
            "более точного захвата и сильнее нажима.",
      },
      {
        q: "На какой бумаге печатать файл?",
        a:
          "Подойдет обычная бумага для принтера. Лучше печатать только с одной стороны: если " +
            "ребенок рисует фломастером, чернила могут пройти сквозь лист и испортить рисунок " +
            "на обороте. Для фломастеров можно использовать более плотную бумагу, например от " +
            "120 г/м².",
      },
      {
        q: "Подойдет ли книга для детского сада?",
        a:
          "Да. Книга хорошо подходит для занятий в детском саду. Каждый рисунок расположен " +
            "на отдельной странице, поэтому нужный лист можно распечатать для каждого ребенка. " +
            "Рисунки изображают знакомых животных, предметы и другие понятные детям образы, " +
            "поэтому их можно использовать не только для раскрашивания, но и для знакомства с " +
            "новыми словами.",
      },
      {
        q: "Годится ли книга в подарок?",
        a:
          "Да. Такая раскраска подойдет в качестве подарка, даже если вы не очень хорошо " +
            "знаете ребенка. Она рассчитана на широкий для этого возраста период - от одного " +
            "до трех лет, поэтому ребенок сможет пользоваться ею по мере развития навыков. Это " +
            "простой и полезный подарок, который может надолго увлечь малыша.",
      },
      {
        q: "Почему в ролике слова английские?",
        a:
          "В ролике показано английское издание. Рисунки во всех изданиях одинаковые: те же " +
            "111 рисунков и в том же порядке. Отличается только слово под каждым рисунком. В " +
            "русской версии все слова написаны по-русски.",
      },
      {
        q: "Есть ли книга на бумаге?",
        a:
          "Да, английское и испанское издания продаются на Amazon. Русского бумажного " +
            "издания нет, поэтому русская версия доступна в виде файла для печати. Его можно " +
            "распечатывать дома столько раз, сколько нужно.",
      },
    ],
    /* Ролик английский: русского издания на бумаге нет, снимать нечего.
       Рисунки во всех изданиях одни и те же, поэтому ролик честно
       показывает то, что получит покупатель. Что съемка с английского
       издания, сказано прямо под роликом и в вопросах. */
    video: {
      src: "/video/flip-en.mp4",
      poster: "/video/flip-en-poster.jpg",
      seconds: 46,
      w: 608,
      h: 1080,
      description:
        "Книга снята без монтажа, просто на столе. В ролике показаны обложка, оборот, " +
          "титульная страница и все страницы по порядку: один крупный рисунок на листе, печать " +
          "только с одной стороны, под рисунком - слово, которое тоже можно раскрасить. Среди " +
          "рисунков есть брокколи, лотос, подсолнух, пляжная шляпа, воздушный змей и вертолет. " +
          "В конце находится страница, где ребенок может написать свое имя. Ролик длится 46 " +
          "секунд, без звука. Показано английское издание, но рисунки во всех изданиях " +
          "одинаковые.",
    },
  },
};
