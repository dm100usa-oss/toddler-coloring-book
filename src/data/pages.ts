import type { UiLang, ContentLang } from "./dictionaries";

/* Тексты разделов. Вынесены из словаря интерфейса намеренно:
   там короткие надписи, а здесь связный текст, который человек читает
   и который цитируют нейросети. Смешивать их в одном файле неудобно.

   Правило для всех текстов этого сайта: каждый абзац закончен сам по себе.
   Никаких "как мы писали выше" и "смотрите следующий раздел". Нейросеть
   вырывает из страницы один кусок, и он должен работать в одиночку. */

export type SectionCopy = {
  title: string;
  lead: string;
  /* Абзацы основного текста. */
  body: string[];
  faq?: { q: string; a: string }[];
};

/* ------------------------------------------------------------------ */
/*  Что означают цифры на обложке                                      */
/* ------------------------------------------------------------------ */

/* Родители ищут раскраску по возрасту: 1-3, 2-4, 3-5. Это видно
   в подсказках самого магазина, куда ни начни печатать. Но цифра
   на обложке не стандарт и ничего не гарантирует: издатель ставит
   ее сам, и два разных 2-4 могут отличаться вдвое по сложности.

   Этот блок объясняет, что за каждой цифрой стоит на самом деле.
   Он закрывает самый частый запрос темы и одновременно делает то,
   чего не делает ни один каталог раскрасок: переводит цифру
   в понятное родителю поведение ребенка. */

export type AgeLabel = {
  label: string;
  /* Этап, которому эта цифра соответствует на самом деле. */
  stage: string;
  means: Record<ContentLang, string>;
  watch: Record<ContentLang, string>;
};

export const ageLabels: AgeLabel[] = [
  {
    label: "1-3",
    stage: "scribble",
    means: {
      en:
        "The widest label on the shelf, and the hardest book to make well. It has to work for a " +
        "child who scribbles across the sheet and for one who is starting to aim, which is only " +
        "possible if every drawing stays very simple and very large.",
      es:
        "Es el rango de edad más amplio y uno de los más difíciles para un libro para " +
          "colorear. Debe servir tanto a un niño que todavía garabatea por toda la hoja como a " +
          "otro que ya intenta dirigir los trazos hacia el dibujo. Por eso, las imágenes " +
          "tienen que seguir siendo muy grandes y sencillas.",
      ru:
        "Самый широкий возрастной диапазон и одна из самых сложных задач для раскраски. Она " +
          "должна подойти и ребенку, который пока рисует линии по всему листу, и тому, кто уже " +
          "старается попадать по рисунку. Поэтому изображения должны оставаться очень крупными " +
          "и простыми.",
    },
    watch: {
      en:
        "Check that the drawings are simple enough for the youngest end. Many books labelled 1-3 " +
        "are really made for a three year old, and a one year old gets nothing from them.",
      es:
        "Compruebe que los dibujos sean adecuados para los niños más pequeños del rango " +
          "indicado. Muchos libros marcados para edades de 1 a 3 años están pensados en " +
          "realidad para niños algo mayores y pueden resultar demasiado difíciles para un niño " +
          "de un año.",
      ru:
        "Проверьте, подходят ли рисунки самым маленьким детям из указанного возрастного " +
          "диапазона. Многие книги с пометкой 1-3 года на самом деле рассчитаны на детей " +
          "постарше и могут оказаться слишком сложными для годовалого ребенка.",
    },
  },
  {
    label: "2-4",
    stage: "aim",
    means: {
      en:
        "The most useful label for a child who already aims at the drawing and gets most of the " +
        "color onto it. Outlines are still bold, but there are more separate areas inside one shape " +
        "than in a 1-3 book.",
      es:
        "Este rango suele ser adecuado para un niño que ya intenta colorear el propio dibujo " +
          "y deja la mayor parte del color sobre él. El contorno debe seguir siendo fácil de " +
          "ver, pero dentro de la imagen puede haber más zonas separadas que en un libro para " +
          "niños de 1 a 3 años.",
      ru:
        "Такой возрастной диапазон часто подходит ребенку, который уже старается " +
          "раскрашивать сам рисунок и большую часть цвета наносит на него. Контур все еще " +
          "должен быть хорошо заметным, но внутри рисунка уже может быть больше отдельных " +
          "участков, чем в раскраске для детей 1-3 лет.",
    },
    watch: {
      en:
        "This range overlaps heavily with 1-3. If your child is closer to two than four, a good " +
        "1-3 book often suits better than a crowded 2-4 one.",
      es:
        "Los rangos de 1 a 3 y de 2 a 4 años se solapan bastante. Por eso, al elegir " +
          "conviene fijarse no solo en la edad indicada en la portada, sino también en las " +
          "propias páginas: el tamaño de los dibujos, el grosor del contorno y la cantidad de " +
          "detalles.",
      ru:
        "Диапазоны 1-3 и 2-4 года заметно пересекаются. Поэтому при выборе лучше смотреть не " +
          "только на цифры на обложке, но и на сами страницы: размер рисунков, толщину контура " +
          "и количество деталей.",
    },
  },
  {
    label: "3-5",
    stage: "shape",
    means: {
      en:
        "For a child who stays inside the line without effort and wants something to happen on the " +
        "page beyond filling shapes. Expect scenes rather than single objects, and often something " +
        "to do besides color: a shape to trace, a word to copy, a maze.",
      es:
        "Para un niño que ya colorea dentro del contorno con bastante seguridad y busca " +
          "actividades más complejas. Pueden ser adecuadas pequeñas escenas en lugar de un " +
          "solo objeto y actividades adicionales, como repasar una forma, copiar una palabra o " +
          "resolver un laberinto sencillo.",
      ru:
        "Для ребенка, который уже уверенно раскрашивает внутри контура и хочет более сложных " +
          "заданий. Подойдут небольшие сюжеты вместо одного предмета и дополнительные задания: " +
          "обвести форму, повторить слово или пройти простой лабиринт.",
    },
    watch: {
      en:
        "Given to a two year old, a 3-5 book usually produces frustration rather than practice. " +
        "The detail is too fine for a hand that cannot stop at a line yet.",
      es:
        "Para un niño de dos años, un libro de 3 a 5 años suele resultar demasiado complejo. " +
          "Los detalles pequeños exigen una precisión de movimientos que todavía se está " +
          "desarrollando a esta edad.",
      ru:
        "Для двухлетнего ребенка раскраска 3-5 лет часто оказывается слишком сложной. Мелкие " +
          "детали требуют большей точности движений, которая в этом возрасте еще развивается.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Раздел: по возрасту                                                */
/* ------------------------------------------------------------------ */

export const agesCopy: Record<ContentLang, SectionCopy> = {
  en: {
    title: "Coloring by age: what a child can actually do at 1, 2, 3 and 4",
    lead:
      "Parents buy a coloring book by the age printed on the cover. That number tells you who the " +
      "book was made for, not whether it fits the child in front of you. This page describes what " +
      "changes in a child's hand between one and four years old, and what kind of page suits each " +
      "point along the way.",
    body: [
      "Drawing skills develop gradually. First a child discovers that moving a hand leaves a mark " +
      "on paper. Then the lines become more deliberate: loops appear, along with up and down " +
      "strokes and attempts to repeat a line an adult has shown. Later the child begins to aim more " +
      "accurately at the drawing, and only after that gradually learns to color inside the outline.",

      "Two children of the same age can be at different points along this path, and that is " +
      "entirely natural. A difference of a few months is quite ordinary, so it is better to look " +
      "not only at age but at what the child can already do.",

      "This is why a coloring book that says ages 1 to 3 on the cover has a hard job. It has to work " +
      "for a child who scribbles across the sheet and for a child who is starting to aim, which is " +
      "only possible if the drawings stay very simple and very large. A book that instead aims at " +
      "the middle of that range ends up too hard at one end and too dull at the other.",

      "The practical advice is simple: judge a book by its pages as well as by the age on the " +
      "cover. For a first coloring book what matters is a thick outline, one large drawing per " +
      "page, pictures the child knows, and printing on one side only. All of that can be seen by " +
      "simply looking inside the book.",
    ],
    faq: [
      {
        q: "At what age can a child start coloring?",
        a:
          "Most children make their first deliberate marks on paper somewhere between twelve and " +
          "eighteen months, holding a crayon in a fist. That is coloring in the only sense that " +
          "matters at that age: the child discovers that moving a hand leaves a trace and repeats " +
          "it on purpose. Staying inside a line is a different skill that arrives around three.",
      },
      {
        q: "Why does my two year old color right across the drawing?",
        a:
          "Because aiming and stopping are two different abilities, and stopping comes later. A two " +
          "year old can usually aim the crayon at the drawing and get most of the color onto it, " +
          "while crossing the outline freely. Crossing the line at this age is not a mistake, it is " +
          "what aiming looks like before the hand catches up with the eye.",
      },
      {
        q: "Is my child behind if they still scribble at three?",
        a:
          "Not on its own. Children reach these points at their own pace and a few months either " +
          "way is ordinary, especially if the child has had little time with crayons. What matters " +
          "is that the pattern moves forward over months rather than staying frozen. If you have " +
          "concerns about your child's development, your pediatrician is the right person to ask.",
      },
      {
        q: "What is the difference between a coloring book for ages 1-3 and one for ages 2-4?",
        a:
          "In practice, how many separate areas there are to fill inside one drawing. A 1-3 book " +
          "keeps one large shape with few parts, so a child who cannot stop at a line still " +
          "produces something that looks finished. A 2-4 book puts more parts inside the same " +
          "shape, which suits a child who already aims at the drawing. The two ranges overlap " +
          "heavily, and for a two year old a good 1-3 book often works better than a crowded 2-4 one.",
      },
      {
        q: "Is the age on the cover of a coloring book a standard?",
        a:
          "There is no single standard that sets the age figures on the cover of a coloring book. The " +
          "publisher chooses the range, which is why two books both labelled ages 2-4 can differ " +
          "noticeably in difficulty. When choosing, it is better to look at the pages themselves: the " +
          "size of the drawings, the thickness of the outline and the amount of detail.",
      },
      {
        q: "My child is four and finds coloring boring. What now?",
        a:
          "Boredom at four usually means the page has stopped asking anything of the child. The fix " +
          "is not an easier book but a fuller one: a scene with several areas to fill instead of a " +
          "single object, or a step by step drawing book where the child builds the picture rather " +
          "than filling in someone else's.",
      },
    ],
  },

  es: {
    title: "Colorear según la edad: qué suele ser adecuado al año, a los dos, a los tres y a " +
             "los cuatro años",
    lead:
      "Los padres suelen elegir un libro para colorear por la edad indicada en la portada. " +
        "Sin embargo, ese número solo señala el grupo de edad para el que la editorial creó el " +
        "libro. Es más importante observar lo que el niño ya sabe hacer con la mano. Aquí " +
        "explicamos cómo suelen cambiar las habilidades de dibujo entre el año y los cuatro " +
        "años y qué tipo de páginas pueden resultar más adecuadas en cada etapa.",
    body: [
      "Las habilidades de dibujo se desarrollan gradualmente. Primero, el niño descubre que " +
        "el movimiento de la mano deja un trazo en el papel. Después, los trazos se vuelven " +
        "más intencionados: aparecen bucles, líneas de arriba abajo e intentos de imitar una " +
        "línea hecha por un adulto. Más adelante, empieza a dirigir los movimientos hacia el " +
        "dibujo y, solo después, aprende poco a poco a colorear dentro del contorno.",

      "Dos niños de la misma edad pueden encontrarse en etapas diferentes del desarrollo de " +
        "las habilidades de dibujo, y es completamente natural. Una diferencia de algunos " +
        "meses es habitual, por lo que conviene fijarse no solo en la edad, sino también en lo " +
        "que el niño ya sabe hacer.",

      "Por eso, un libro marcado para niños de 1 a 3 años tiene una tarea difícil. Debe " +
        "servir tanto a un niño que todavía hace trazos amplios por toda la hoja como a otro " +
        "que ya intenta colorear el dibujo. Para conseguirlo, las imágenes deben ser grandes, " +
        "sencillas y sin demasiados detalles pequeños.",

      "El consejo práctico es sencillo: no se fije únicamente en la edad de la portada, sino " +
        "también en las páginas. Para un primer libro para colorear son importantes un " +
        "contorno grueso, un solo dibujo grande por página, imágenes familiares para el niño e " +
        "impresión por una sola cara. Todo esto puede comprobarse simplemente mirando el " +
        "interior del libro.",
    ],
    faq: [
      {
        q: "¿A qué edad puede empezar a colorear un niño?",
        a:
          "La mayoría de los niños empiezan a dejar marcas intencionadas en el papel entre " +
            "los doce y los dieciocho meses, normalmente sujetando el crayón con toda la mano. " +
            "En esta etapa, el niño descubre principalmente la relación entre el movimiento de " +
            "la mano y el trazo que aparece en el papel. La capacidad de colorear dentro del " +
            "contorno llega bastante más tarde.",
      },
      {
        q: "¿Por qué mi hijo de dos años colorea por encima del dibujo?",
        a:
          "Porque dirigir el crayón hacia el dibujo y detener el movimiento al llegar al " +
            "contorno son habilidades que no se desarrollan al mismo tiempo. A los dos años, " +
            "el niño ya puede intentar colorear el propio dibujo, pero todavía se sale de sus " +
            "límites con frecuencia. Es completamente normal a esta edad.",
      },
      {
        q: "¿Mi hijo va retrasado si a los tres años todavía garabatea?",
        a:
          "Por sí solo, esto no significa que exista un retraso. Los niños desarrollan las " +
            "habilidades de dibujo a ritmos diferentes, y una diferencia de algunos meses es " +
            "completamente normal. Lo importante es observar cómo cambian sus habilidades con " +
            "el tiempo. Si algo le preocupa sobre el desarrollo de su hijo, consulte con su " +
            "pediatra.",
      },
      {
        q: "¿Qué diferencia hay entre un libro para colorear de 1 a 3 años y uno de 2 a 4?",
        a:
          "La principal diferencia no suele estar en las cifras de la portada, sino en la " +
            "complejidad de las páginas. En un libro para niños de 1 a 3 años, los dibujos " +
            "suelen ser más grandes y sencillos, con pocas partes separadas. En los libros de " +
            "2 a 4 años puede haber más detalles. Como ambos rangos se solapan bastante, " +
            "conviene fijarse en las habilidades del niño y en el diseño de las páginas.",
      },
      {
        q: "¿La edad de la portada de un libro para colorear es un estándar?",
        a:
          "No existe un estándar único que determine las edades indicadas en la portada de " +
            "un libro para colorear. Es la editorial quien establece el rango, por lo que dos " +
            "libros marcados para edades de 2 a 4 años pueden tener niveles de dificultad muy " +
            "diferentes. Al elegir, conviene mirar las páginas: el tamaño de los dibujos, el " +
            "grosor del contorno y la cantidad de detalles.",
      },
      {
        q: "Mi hijo tiene cuatro años y colorear le aburre. ¿Y ahora qué?",
        a:
          "Si a los cuatro años los libros para colorear sencillos ya no le interesan, " +
            "probablemente necesite actividades más complejas. Puede probar dibujos con más " +
            "zonas separadas, pequeñas escenas o libros de dibujo paso a paso, donde el niño " +
            "cree la imagen por sí mismo.",
      },
    ],
  },

  ru: {
    title: "Раскраски по возрасту: что подходит ребенку в год, два, три и четыре",
    lead:
      "Родители часто выбирают раскраску по возрасту, указанному на обложке. Но эта цифра " +
        "лишь показывает, для какой возрастной группы издатель создавал книгу. Гораздо важнее " +
        "то, что ребенок уже умеет делать рукой. Здесь мы рассказываем, как меняются навыки " +
        "рисования примерно от года до четырех лет и какие страницы лучше подходят на разных " +
        "этапах.",
    body: [
      "Навыки рисования развиваются постепенно. Сначала ребенок обнаруживает, что движение " +
        "руки оставляет след на бумаге. Затем линии становятся более осознанными: появляются " +
        "петли, движения сверху вниз и попытки повторить показанную взрослым линию. Позже " +
        "ребенок начинает точнее попадать по рисунку и только затем постепенно учится " +
        "раскрашивать внутри контура.",

      "Двое детей одного возраста могут находиться на разных этапах развития навыков " +
        "рисования, и это совершенно естественно. Разница в несколько месяцев вполне обычна, " +
        "поэтому ориентироваться лучше не только на возраст, но и на то, что ребенок уже " +
        "умеет.",

      "Поэтому у раскраски с пометкой 1-3 года непростая задача. Она должна подойти и " +
        "ребенку, который пока рисует размашистые линии по всему листу, и тому, кто уже " +
        "старается попадать по рисунку. Для этого изображения должны быть крупными, простыми и " +
        "без лишних мелких деталей.",

      "Практический совет простой: оценивайте не только возраст на обложке, но и сами " +
        "страницы. Для первой раскраски важны толстый контур, один крупный рисунок на " +
        "странице, знакомые ребенку изображения и печать только с одной стороны. Все это можно " +
        "увидеть, просто заглянув внутрь книги.",
    ],
    faq: [
      {
        q: "В каком возрасте ребенок может начать раскрашивать?",
        a:
          "Большинство детей начинают осознанно оставлять следы на бумаге примерно между " +
            "двенадцатью и восемнадцатью месяцами, обычно держа мелок всей ладонью. На этом " +
            "этапе ребенок прежде всего открывает для себя связь между движением руки и " +
            "появляющейся линией. Умение раскрашивать внутри контура появляется значительно " +
            "позже.",
      },
      {
        q: "Почему двухлетний ребенок закрашивает прямо поверх рисунка?",
        a:
          "Потому что умение попадать по рисунку и умение вовремя остановить движение у " +
            "контура развиваются не одновременно. В два года ребенок уже может стараться " +
            "раскрашивать сам рисунок, но при этом часто выходит за его границы. Для этого " +
            "возраста это совершенно нормально.",
      },
      {
        q: "Ребенок в три года все еще черкает. Он отстает?",
        a:
          "Само по себе это еще не говорит об отставании. Дети осваивают навыки рисования в " +
            "разном темпе, и разница в несколько месяцев вполне естественна. Важно наблюдать " +
            "за тем, как навыки ребенка меняются со временем. Если вас беспокоит его развитие, " +
            "лучше обсудить это с педиатром.",
      },
      {
        q: "Чем раскраска 1-3 отличается от раскраски 2-4?",
        a:
          "Главное различие обычно не в цифрах на обложке, а в сложности самих страниц. В " +
            "раскраске для детей 1-3 лет рисунки, как правило, крупнее и проще, с небольшим " +
            "количеством отдельных частей. В книгах 2-4 года деталей может быть больше. Эти " +
            "возрастные диапазоны заметно пересекаются, поэтому лучше ориентироваться на " +
            "навыки ребенка и устройство конкретной страницы.",
      },
      {
        q: "Возраст на обложке раскраски это стандарт?",
        a:
          "Нет единого стандарта, который определял бы возрастные цифры на обложке " +
            "раскраски. Диапазон указывает издатель, поэтому две книги с одинаковой пометкой " +
            "2-4 года могут заметно отличаться по сложности. При выборе лучше смотреть на сами " +
            "страницы: размер рисунков, толщину контура и количество деталей.",
      },
      {
        q: "Ребенку четыре, и раскрашивать ему скучно. Что дальше?",
        a:
          "Если в четыре года простые раскраски уже неинтересны, ребенку, скорее всего, " +
            "нужны более сложные задания. Можно попробовать рисунки с большим количеством " +
            "отдельных участков, небольшие сюжеты или книги с пошаговым рисованием, где " +
            "ребенок сам создает картинку.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Раздел: бесплатные листы                                           */
/* ------------------------------------------------------------------ */

export const printablesCopy: Record<UiLang, SectionCopy> = {
  en: {
    title: "Ten pages from the book, free to print",
    lead:
      "Ten drawings taken straight out of the book, in the order they appear in it. Print one, hand " +
      "your child a crayon, and in five minutes you will know whether this kind of page suits them. " +
      "Free, no sign up, nothing to enter.",
    body: [
      "These are samples rather than a collection. Ten pages is enough to see how thick the outline " +
      "is, how much of the sheet one drawing takes up and whether your child stays with it. It is " +
      "not enough to replace the book, and it is not meant to be.",

      "We think that is the honest way round. A parent who has printed a page and watched their own " +
      "child use it knows something no product description can tell them. If the answer turns out " +
      "to be no, the printing cost you a sheet of paper rather than the price of a book.",

      "Every page comes in two paper sizes. US Letter for the United States and Canada, A4 for " +
      "Europe, Latin America and most of the rest of the world. Print single sided: a marker goes " +
      "through ordinary paper, and on a double sided sheet it ruins whatever is on the back.",

      "These drawings are our own work. You may print them at home, in a classroom, in a daycare or " +
      "in a library, as many copies as you need. You may not sell them or gather them into a " +
      "collection of your own.",
    ],
    faq: [
      {
        q: "Do I need to sign up or give an email address?",
        a:
          "No. Every page downloads directly as a PDF. There is no form, no account and no email " +
          "required at any point.",
      },
      {
        q: "Are these the same drawings that are in the book?",
        a:
          "Yes. These ten are taken straight from the book, unchanged, in the order they appear in " +
          "it. The book has 111 drawings in total, so what you see here is a sample of it rather " +
          "than a separate set.",
      },
      {
        q: "Which paper size should I choose?",
        a:
          "US Letter if you are in the United States or Canada, A4 almost everywhere else. If you " +
          "print the wrong one the drawing still comes out, just with uneven margins.",
      },
      {
        q: "Can I use these in my classroom or daycare?",
        a:
          "Yes. Print as many copies as you need for children in your care, at home, in a " +
          "classroom, a daycare or a library. The one thing not allowed is selling them or bundling " +
          "them into a collection you distribute as your own.",
      },
    ],
  },

  es: {
    title: "Diez páginas del libro, gratis para imprimir",
    lead:
      "Diez dibujos sacados directamente del libro y presentados en el mismo orden. Imprima " +
        "uno, dele un crayón a su hijo y en unos minutos podrá comprobar si este tipo de " +
        "página le resulta adecuado. Gratis, sin registro y sin formularios.",
    body: [
      "Son páginas de muestra, no una colección independiente. Diez dibujos son suficientes " +
        "para valorar el grosor del contorno, el tamaño de las imágenes y el interés que " +
        "despiertan en el niño.",

      "Así puede comprobar si el libro es adecuado antes de comprarlo. Imprima una página y " +
        "observe si al niño le resulta cómodo colorear ese tipo de dibujo y si la actividad le " +
        "interesa. Si la página no le conviene, lo sabrá antes de comprar el libro.",

      "Cada página está disponible en dos formatos: US Letter para Estados Unidos y Canadá, " +
        "y A4 para Europa, América Latina y la mayoría de los demás países. Conviene imprimir " +
        "por una sola cara, especialmente si el niño utiliza rotuladores, ya que la tinta " +
        "puede traspasar el papel corriente.",

      "Todos estos dibujos han sido creados por nosotros. Puede imprimirlos gratuitamente " +
        "para actividades en casa, en un aula, una guardería o una biblioteca, en tantas " +
        "copias como necesite. No está permitido venderlos ni incluirlos en colecciones " +
        "propias para su distribución.",
    ],
    faq: [
      {
        q: "¿Hay que registrarse o dar un correo?",
        a:
          "No. Cada página se descarga directamente en formato PDF. No es necesario " +
            "registrarse, proporcionar una dirección de correo electrónico ni rellenar " +
            "formularios.",
      },
      {
        q: "¿Son los mismos dibujos que están en el libro?",
        a:
          "Sí. Estos diez dibujos están tomados directamente del libro, sin cambios y en el " +
            "mismo orden en que aparecen. El libro contiene 111 dibujos en total, por lo que " +
            "estas páginas gratuitas permiten ver cómo está diseñado antes de comprarlo.",
      },
      {
        q: "¿Qué tamaño de papel elijo?",
        a:
          "Elija US Letter si está en Estados Unidos o Canadá y A4 en Europa, América Latina " +
            "y la mayoría de los demás países. Si utiliza el otro formato, la página también " +
            "se imprimirá, aunque los márgenes pueden quedar diferentes.",
      },
      {
        q: "¿Puedo usarlos en mi aula o guardería?",
        a:
          "Sí. Puede imprimir tantas copias como necesite para los niños con los que trabaja " +
            "en casa, en un aula, una guardería o una biblioteca. No está permitido vender " +
            "estos materiales ni distribuirlos como una colección propia.",
      },
    ],
  },

  ru: {
    title: "Десять страниц из книги, бесплатно для печати",
    lead:
      "Десять рисунков прямо из книги, в том же порядке. Распечатайте один из них, дайте " +
        "ребенку карандаш или мелок, и уже через несколько минут вы поймете, подходит ли ему " +
        "такая раскраска. Бесплатно, без регистрации и заполнения форм.",
    body: [
      "Это образцы страниц, а не отдельный набор раскрасок. Десяти рисунков достаточно, " +
        "чтобы оценить толщину контура, размер изображений и то, насколько ребенку интересно с " +
        "ними заниматься.",

      "Так вы сможете оценить раскраску до покупки. Распечатайте одну страницу и посмотрите, " +
        "удобно ли ребенку раскрашивать такой рисунок и интересно ли ему занятие. Если " +
        "страница не подойдет, вы узнаете об этом заранее.",

      "Каждая страница доступна в двух форматах: US Letter для США и Канады и A4 для России, " +
        "Европы и большинства других стран. Лучше печатать только с одной стороны, особенно " +
        "если ребенок пользуется фломастерами: чернила могут пройти сквозь обычную бумагу.",

      "Все эти рисунки созданы нами. Вы можете бесплатно печатать их для занятий дома, в " +
        "детском саду, школе или библиотеке в любом необходимом количестве. Нельзя продавать " +
        "рисунки или включать их в собственные наборы для распространения.",
    ],
    faq: [
      {
        q: "Нужно ли регистрироваться или оставлять почту?",
        a:
          "Нет. Каждая страница скачивается напрямую в формате PDF. Регистрация, электронная " +
            "почта и заполнение форм не требуются.",
      },
      {
        q: "Это те же рисунки, что в книге?",
        a:
          "Да. Эти десять рисунков взяты прямо из книги без изменений и расположены в том же " +
            "порядке. Всего в книге 111 рисунков, поэтому бесплатные страницы позволяют " +
            "заранее увидеть, как она устроена.",
      },
      {
        q: "Какой формат бумаги выбрать?",
        a:
          "Для России, Европы и большинства стран за пределами Северной Америки выбирайте " +
            "A4. Для США и Канады - US Letter. При выборе другого формата страница все равно " +
            "напечатается, но размер полей может отличаться.",
      },
      {
        q: "Можно ли использовать их в детском саду?",
        a:
          "Да. Вы можете распечатать столько копий, сколько нужно для детей, с которыми " +
            "занимаетесь дома, в группе, детском саду, школе или библиотеке. Нельзя продавать " +
            "эти материалы или распространять их как собственный набор.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Раздел: о нас                                                      */
/* ------------------------------------------------------------------ */

export const aboutCopy: Record<UiLang, SectionCopy> = {
  en: {
    title: "Who runs this site",
    lead:
      "Toddler Coloring Book is published by Magic of Discoveries LLC, a small children's book " +
      "publisher in Miami, Florida, run by Ricardo and Maria Demi.",
    body: [
      "We publish coloring books, step by step drawing books and picture stories for young " +
      "children, in English and in Spanish. One of those books is a coloring book for ages one to " +
      "three, and this site exists because of the questions parents kept asking us about it. Not " +
      "questions about the book: questions about their child. Is my one year old too young. Why " +
      "does she color right over the picture. What do I do when the marker goes through the page.",

      "Answering those properly takes more room than a product description allows, and the answers " +
      "are useful whether or not anyone buys anything from us. So they live here, on their own site, " +
      "written plainly and backed by published developmental research rather than by our opinion.",

      "We are not doctors and nothing here is medical advice or an assessment of any individual " +
      "child. The ages we give are typical ranges taken from published developmental milestones, " +
      "and the sources are named on every page where we use them. If you have a concern about how " +
      "your child is developing, your pediatrician is the right person to ask.",

      "We feature one book of our own, and we say plainly when it does not suit a child. A book " +
      "made for the first stage of drawing will bore a four year old who already stays inside the " +
      "line, and telling a parent that costs us one sale and earns a reader who comes back.",
    ],
  },

  es: {
    title: "Quién está detrás de este sitio",
    lead:
      "Toddler Coloring Book es un proyecto de Magic of Discoveries LLC, una pequeña " +
        "editorial de libros infantiles de Miami, Florida. Ricardo y Maria Demi están detrás " +
        "del proyecto y de este sitio.",
    body: [
      "Publicamos libros para colorear, libros de dibujo paso a paso y cuentos ilustrados " +
        "para niños en inglés y español. Uno de nuestros libros es un primer libro para " +
        "colorear para niños de uno a tres años. Este sitio nació a partir de preguntas que " +
        "los padres nos hacían con frecuencia: si un niño de un año es demasiado pequeño para " +
        "empezar a colorear, por qué dibuja por encima de la imagen o qué hacer cuando la " +
        "tinta del rotulador traspasa el papel.",

      "Estas preguntas requieren más espacio del que permite la descripción de un libro, y " +
        "las respuestas pueden ser útiles independientemente de que alguien compre nuestro " +
        "libro o no. Por eso las hemos reunido en este sitio y hemos intentado explicarlas con " +
        "claridad, basándonos en información publicada sobre el desarrollo infantil.",

      "No somos médicos, por lo que la información de este sitio no constituye consejo " +
        "médico ni una evaluación del desarrollo de un niño concreto. Los rangos de edad se " +
        "basan en información publicada sobre hitos del desarrollo, y las fuentes se indican " +
        "en las páginas donde se utilizan. Si algo le preocupa sobre el desarrollo de su hijo, " +
        "consulte con su pediatra.",

      "En este sitio presentamos uno de nuestros propios libros y explicamos claramente " +
        "cuándo puede dejar de ser adecuado para un niño. Si ya colorea dentro del contorno " +
        "con facilidad y las páginas sencillas han dejado de interesarle, probablemente sea " +
        "mejor elegir un libro más complejo.",
    ],
  },

  ru: {
    title: "Кто ведет этот сайт",
    lead:
      "Toddler Coloring Book (Раскраска для малышей) - проект небольшого издательства " +
        "детских книг Magic of Discoveries LLC из Майами, штат Флорида. Сайтом занимаются " +
        "Рикардо и Мария Деми.",
    body: [
      "Мы издаем раскраски, книги с пошаговым рисованием и иллюстрированные книги для детей " +
        "на английском и испанском языках. Одна из наших книг - первая раскраска для малышей " +
        "от года до трех лет. Этот сайт появился благодаря вопросам родителей: не рано ли " +
        "давать раскраску в год, почему ребенок рисует поверх картинки, что делать, если " +
        "фломастер проходит сквозь бумагу.",

      "На такие вопросы трудно подробно ответить в описании книги, а информация может быть " +
        "полезна независимо от того, собираетесь вы покупать нашу раскраску или нет. Поэтому " +
        "мы собрали ответы на отдельном сайте и постарались изложить их простым языком, " +
        "опираясь на опубликованные материалы о развитии детей.",

      "Мы не врачи, поэтому информация на сайте не является медицинской рекомендацией или " +
        "оценкой развития конкретного ребенка. Возрастные ориентиры основаны на опубликованных " +
        "материалах, а источники указаны на страницах, где мы на них ссылаемся. Если вас " +
        "что-то беспокоит в развитии ребенка, обратитесь к педиатру.",

      "На этом сайте представлена одна наша раскраска, и мы прямо говорим, когда она ребенку " +
        "уже не подходит. Если он уверенно раскрашивает внутри контура и простые страницы ему " +
        "наскучили, лучше выбрать более сложную книгу.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Раздел: руководства                                                */
/* ------------------------------------------------------------------ */

export const guidesCopy: Record<ContentLang, SectionCopy> = {
  en: {
    title: "Guides for parents: the practical side of coloring with a toddler",
    lead:
      "The questions that come up once the book is already on the table. What to draw with, what " +
      "to do about the mess, why the marker goes through the page, and how long a small child will " +
      "actually sit there. Short answers first, the reasoning underneath.",
    body: [
      "None of these are questions about coloring books. They are questions about a specific child " +
      "at a specific table on a specific afternoon, which is why product descriptions never answer " +
      "them well. Each guide below takes one of them and answers it fully, so nothing sends you " +
      "off to read something else first.",
    ],
  },
  es: {
    title: "Guías para padres: consejos prácticos para colorear con niños pequeños",
    lead:
      "Preguntas que suelen surgir cuando el libro ya está sobre la mesa: qué materiales " +
        "utilizar, cómo reducir el desorden, qué hacer si el rotulador traspasa el papel y " +
        "cuánto tiempo suele dedicar un niño pequeño a una página. En cada guía encontrará " +
        "primero una respuesta breve y después una explicación más detallada.",
    body: [
      "Estas preguntas no se refieren tanto al libro como a la actividad con un niño " +
        "concreto. Por eso, una descripción de producto no suele ser suficiente. Cada guía se " +
        "centra en una cuestión práctica y ofrece una explicación completa en un solo lugar.",
    ],
  },
  ru: {
    title: "Статьи для родителей: практические советы о раскрашивании с малышом",
    lead:
      "Вопросы, которые возникают, когда раскраска уже лежит на столе: чем лучше рисовать, " +
        "как уменьшить беспорядок, что делать, если фломастер проходит сквозь бумагу, и " +
        "сколько времени маленький ребенок обычно занимается одной страницей. В каждой статье " +
        "сначала дан короткий ответ, а затем подробное объяснение.",
    body: [
      "Это вопросы не столько о самой раскраске, сколько о занятиях с конкретным ребенком. " +
        "Поэтому обычного описания книги здесь недостаточно. Каждая статья посвящена одному " +
        "практическому вопросу и дает подробный ответ в одном месте.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Раздел: права и приватность                                        */
/* ------------------------------------------------------------------ */

/* Обычно такую страницу пишут формально, потому что так надо.
   Здесь она написана как настоящий ответ на три вопроса, которые
   родитель действительно задает: можно ли печатать это в детском саду,
   следите ли вы за мной, и зарабатываете ли вы на ссылке на магазин.

   Третий вопрос особенно важен. Сайт, который прямо говорит,
   что зарабатывает с продажи, вызывает больше доверия, чем сайт,
   который делает вид, что советует бескорыстно. */

export const termsCopy: Record<UiLang, SectionCopy> = {
  en: {
    title: "Using our drawings, and what this site does with your data",
    lead:
      "Short version: print our free pages as much as you like, at home or in a classroom, but do " +
      "not sell them. We do not ask for your email, we set no advertising cookies, and we earn a " +
      "commission when someone buys our book through a link here.",
    body: [
      "The drawings on this site are our own work, made by illustrators we commissioned, and taken " +
      "from books we publish. You may download and print them for children in your care: at home, " +
      "in a classroom, in a daycare, in a library or in a waiting room, in as many copies as you " +
      "need. No permission is required and no attribution is required.",

      "What you may not do is sell them, put them behind a paywall, or gather them into a " +
      "collection you distribute as your own work, whether free or paid. That includes uploading " +
      "them to a print on demand service or to a site that sells teaching resources.",

      "On data, the honest answer is that there is very little to report. Downloading a page " +
      "requires no account, no email address and no form. We do not run advertising and we set no " +
      "advertising cookies. If we later add basic visitor statistics, this page will say so " +
      "plainly and will name the tool used.",

      "Links to Amazon on this site are affiliate links, which means we receive a commission if " +
      "you buy through them. This costs you nothing extra and does not change the price. We say so " +
      "on every page where such a link appears, because a recommendation is worth less when the " +
      "reader does not know how the recommender is paid.",

      "The book featured here is our own, so our interest in you buying it is direct rather than " +
      "commission based. That is exactly why this site says plainly when the book is the wrong " +
      "choice for a child. A recommendation that never says no is not a recommendation.",

      "Nothing on this site is medical advice or an assessment of any individual child. The " +
      "developmental ranges we give come from published sources, named on the pages where we use " +
      "them. If you have a concern about your child's development, your pediatrician is the right " +
      "person to ask.",
    ],
  },
  es: {
    title: "Uso de nuestros dibujos y privacidad",
    lead:
      "En resumen: puede imprimir nuestras páginas gratuitas tantas veces como necesite para " +
        "utilizarlas en casa o con un grupo de niños, pero no puede venderlas. No pedimos su " +
        "dirección de correo electrónico ni utilizamos cookies publicitarias. Algunos enlaces " +
        "a Amazon son enlaces de afiliado, por lo que podemos recibir una comisión si realiza " +
        "una compra a través de ellos.",
    body: [
      "Todos los dibujos de este sitio han sido creados para nuestros libros por " +
        "ilustradores con los que trabajamos. Puede descargarlos e imprimirlos gratuitamente " +
        "para actividades con niños en casa, en un aula, una guardería, una biblioteca u otro " +
        "entorno educativo, en tantas copias como necesite. Para este uso no es necesario " +
        "pedir permiso ni citarnos.",

      "No está permitido vender estos dibujos, ofrecer acceso a ellos mediante pago, " +
        "incluirlos en colecciones propias ni distribuirlos como si fueran un trabajo propio, " +
        "ya sea de forma gratuita o de pago. Tampoco pueden subirse a servicios de impresión " +
        "bajo demanda ni a plataformas de venta de materiales educativos.",

      "En cuanto a los datos, el sitio funciona de forma muy sencilla. Para descargar las " +
        "páginas no es necesario crear una cuenta, proporcionar una dirección de correo " +
        "electrónico ni rellenar formularios. No mostramos publicidad ni utilizamos cookies " +
        "publicitarias. Si en el futuro añadimos un sistema de estadísticas de visitas, lo " +
        "indicaremos aquí y especificaremos qué herramienta utilizamos.",

      "Algunos enlaces a Amazon de este sitio son enlaces de afiliado. Si realiza una compra " +
        "a través de uno de ellos, podemos recibir una comisión. El precio para usted no " +
        "cambia. En las páginas que contienen estos enlaces lo indicamos expresamente.",

      "El libro que presentamos en este sitio es nuestro, por lo que tenemos un interés " +
        "directo en su venta. Precisamente por eso consideramos importante explicar con " +
        "claridad también cuándo puede no ser adecuado para un niño. Una recomendación solo " +
        "resulta útil si tiene en cuenta tanto las ventajas como las limitaciones.",

      "La información de este sitio no constituye consejo médico ni una evaluación del " +
        "desarrollo de un niño concreto. Los rangos de edad se basan en fuentes publicadas, " +
        "que se indican en las páginas correspondientes. Si algo le preocupa sobre el " +
        "desarrollo de su hijo, consulte con su pediatra.",
    ],
  },

  ru: {
    title: "Использование наших рисунков и конфиденциальность",
    lead:
      "Коротко: бесплатные листы можно печатать в любом количестве для занятий дома или в " +
        "группе, но нельзя продавать. Мы не просим у вас адрес электронной почты и не " +
        "используем рекламные файлы cookie. Некоторые ссылки на Amazon являются партнерскими, " +
        "и мы можем получить комиссию, если вы совершите покупку по такой ссылке.",
    body: [
      "Все рисунки на этом сайте созданы для наших книг художниками, с которыми мы работаем. " +
        "Вы можете бесплатно скачивать и печатать их для занятий с детьми дома, в группе, " +
        "детском саду, школе, библиотеке или другом образовательном учреждении в любом " +
        "необходимом количестве. Дополнительное разрешение или ссылка на нас для такого " +
        "использования не требуются.",

      "Нельзя продавать эти рисунки, предоставлять к ним платный доступ, включать их в " +
        "собственные наборы или распространять как свою работу - платно или бесплатно. Также " +
        "нельзя загружать их в сервисы печати по требованию или на площадки для продажи " +
        "учебных материалов.",

      "Что касается данных, сайт устроен максимально просто. Для скачивания страниц не нужны " +
        "учетная запись, электронная почта или заполнение формы. Мы не показываем рекламу и не " +
        "используем рекламные файлы cookie. Если в будущем на сайте появится система " +
        "статистики посещений, мы укажем это здесь и назовем используемый инструмент.",

      "Некоторые ссылки на Amazon на этом сайте являются партнерскими. Если вы совершите " +
        "покупку по такой ссылке, мы можем получить комиссию. Для вас цена при этом не " +
        "меняется. На страницах с такими ссылками мы сообщаем об этом отдельно.",

      "Книга, представленная на этом сайте, издана нами, поэтому мы напрямую заинтересованы " +
        "в ее продаже. Именно поэтому для нас важно ясно говорить и о тех случаях, когда она " +
        "ребенку не подходит. Рекомендация полезна только тогда, когда учитывает не только " +
        "преимущества, но и ограничения.",

      "Информация на этом сайте не является медицинской рекомендацией или оценкой развития " +
        "конкретного ребенка. Возрастные ориентиры основаны на опубликованных источниках, " +
        "которые указаны на соответствующих страницах. Если вас беспокоит развитие ребенка, " +
        "обратитесь к педиатру.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Раздел вопросов                                                     */
/* ------------------------------------------------------------------ */

/* Вводный текст раздела. Сами вопросы лежат отдельно, в faq.ts:
   их полсотни на язык, и держать их здесь значило бы утопить в них
   все остальные разделы. */

export const faqCopy: Record<UiLang, SectionCopy> = {
  en: {
    title: "Frequently Asked Questions About First Coloring Books",
    lead:
      "Answers to what parents, teachers and program staff actually ask about the first " +
      "stage of coloring, about the book itself, and about buying and printing it.",
    body: [
      "Every answer here is written to be read on its own. Nothing refers back to an " +
        "earlier answer and nothing depends on the one below it, so any single question " +
        "can be read straight from a search result without the rest of the page.",
      "Where an answer would have been easier to write as a promise, it states a fact " +
        "instead. We do not claim that coloring develops anything in particular, and where " +
        "we do not know something, we say so. Everything about a child's age rests on the " +
        "public sources listed at the foot of the reference pages.",
      "Questions already answered elsewhere on this site are not repeated here. They are " +
        "gathered at the end of this page as a list of links to the pages where they " +
        "belong.",
    ],
  },
  es: {
    title: "Preguntas frecuentes sobre los primeros libros para colorear",
    lead:
      "Respuestas a lo que de verdad preguntan las familias, los docentes y el personal de " +
      "los programas sobre la primera etapa de colorear, sobre el libro y sobre cómo " +
      "comprarlo o imprimirlo.",
    body: [
      "Cada respuesta está escrita para leerse por separado. Ninguna remite a otra anterior " +
        "ni depende de la siguiente, así que cualquier pregunta se entiende aunque se llegue " +
        "a ella directamente desde un buscador.",
      "Donde habría sido más fácil escribir una promesa, hay un dato comprobable. No " +
        "afirmamos que colorear desarrolle nada en concreto, y cuando no sabemos algo, lo " +
        "decimos. Todo lo relativo a la edad del niño se apoya en las fuentes públicas que " +
        "figuran al pie de las páginas de consulta.",
      "Las preguntas ya respondidas en otras páginas de esta web no se repiten aquí. Están " +
        "recogidas al final de esta página en forma de enlaces a las páginas que les " +
        "corresponden.",
    ],
  },
  ru: {
    title: "Часто задаваемые вопросы о первых раскрасках",
    lead:
      "Ответы на то, что родители, воспитатели и специалисты спрашивают на самом деле: о " +
      "первом этапе раскрашивания, о самой книге, о покупке и о печати.",
    body: [
      "Каждый ответ написан так, чтобы читаться отдельно. Ни один не ссылается на " +
        "предыдущий и не зависит от следующего, поэтому любой вопрос понятен, даже если " +
        "человек попал прямо на него из поиска.",
      "Там, где проще было бы написать обещание, стоит проверяемый факт. Мы не утверждаем, " +
        "что раскрашивание что-то развивает, а когда чего-то не знаем, так и говорим. Все, " +
        "что касается возраста ребенка, опирается на открытые источники, перечисленные " +
        "внизу справочных страниц.",
      "Вопросы, уже разобранные на других страницах сайта, здесь не повторяются. Они " +
        "собраны внизу этой страницы ссылками на те страницы, где им место.",
    ],
  },
};
