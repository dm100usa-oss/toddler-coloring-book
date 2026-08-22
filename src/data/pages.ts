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
        "La etiqueta más amplia del estante y el libro más difícil de hacer bien. Tiene que servir " +
        "a un niño que garabatea por toda la hoja y a otro que empieza a apuntar, y eso solo es " +
        "posible si cada dibujo se mantiene muy simple y muy grande.",
      ru:
        "Самая широкая пометка на полке и самая трудная книга. Она должна подойти и ребенку, " +
        "который черкает поперек листа, и тому, кто уже целится в рисунок, а это возможно, только " +
        "если каждый рисунок остается очень простым и очень крупным.",
    },
    watch: {
      en:
        "Check that the drawings are simple enough for the youngest end. Many books labelled 1-3 " +
        "are really made for a three year old, and a one year old gets nothing from them.",
      es:
        "Compruebe que los dibujos son bastante simples para el extremo más pequeño. Muchos libros " +
        "marcados de 1 a 3 están hechos en realidad para un niño de tres años, y uno de un año no " +
        "saca nada de ellos.",
      ru:
        "Проверьте, достаточно ли просты рисунки для младшего края. Многие книги с пометкой 1-3 " +
        "сделаны на самом деле для трехлетнего, и годовалому в них делать нечего.",
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
        "La etiqueta más útil para un niño que ya apunta al dibujo y deja casi todo el color " +
        "encima. Los contornos siguen siendo marcados, pero hay más zonas separadas dentro de una " +
        "misma forma que en un libro de 1 a 3.",
      ru:
        "Самая полезная пометка для ребенка, который уже целится в рисунок и попадает по нему " +
        "большей частью цвета. Контур все еще толстый, но внутри одной формы больше отдельных " +
        "участков, чем в книге 1-3.",
    },
    watch: {
      en:
        "This range overlaps heavily with 1-3. If your child is closer to two than four, a good " +
        "1-3 book often suits better than a crowded 2-4 one.",
      es:
        "Este rango se solapa mucho con el de 1 a 3. Si su hijo está más cerca de los dos que de " +
        "los cuatro, un buen libro de 1 a 3 suele convenirle más que uno de 2 a 4 recargado.",
      ru:
        "Этот диапазон сильно накладывается на 1-3. Если ребенок ближе к двум, чем к четырем, " +
        "хорошая книга 1-3 подойдет ему чаще, чем перегруженная 2-4.",
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
        "Para un niño que se queda dentro de la línea sin esfuerzo y quiere que en la hoja pase " +
        "algo más que rellenar formas. Espere escenas en vez de objetos sueltos, y a menudo algo " +
        "que hacer además de colorear: una forma que calcar, una palabra que copiar, un laberinto.",
      ru:
        "Для ребенка, который без усилий остается внутри контура и хочет, чтобы на листе " +
        "происходило что-то помимо закрашивания. Ждите сюжетов вместо отдельных предметов и часто " +
        "занятия помимо цвета: обвести форму, повторить слово, пройти лабиринт.",
    },
    watch: {
      en:
        "Given to a two year old, a 3-5 book usually produces frustration rather than practice. " +
        "The detail is too fine for a hand that cannot stop at a line yet.",
      es:
        "Dado a un niño de dos años, un libro de 3 a 5 suele producir frustración en vez de " +
        "práctica. El detalle es demasiado fino para una mano que todavía no sabe parar en una línea.",
      ru:
        "Двухлетнему книга 3-5 обычно приносит не тренировку, а раздражение. Детали слишком " +
        "мелкие для руки, которая еще не умеет остановиться у линии.",
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
      "Drawing develops in the same order for every child, and the order matters more than the " +
      "calendar. A child first discovers that moving a hand leaves a mark. Then the marks become " +
      "deliberate: loops, up and down strokes, shapes copied from someone else. Then the child " +
      "starts aiming at something on the page. Only after that does staying inside a line become " +
      "possible, and it arrives gradually rather than one morning.",

      "Two children of exactly the same age can sit at different points on this path, and both are " +
      "developing normally. A few months either way is ordinary. What is worth paying attention to " +
      "is not the pace but the order: the steps do not get skipped.",

      "This is why a coloring book that says ages 1 to 3 on the cover has a hard job. It has to work " +
      "for a child who scribbles across the sheet and for a child who is starting to aim, which is " +
      "only possible if the drawings stay very simple and very large. A book that instead aims at " +
      "the middle of that range ends up too hard at one end and too dull at the other.",

      "The practical consequence for a parent is small and useful: judge the book by the page, not " +
      "by the age on the cover. Thick outline, one drawing filling the sheet, a subject the child " +
      "can name, nothing printed on the back. Those four things decide whether a child stays at the " +
      "table, and they are visible in three seconds of looking inside.",
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
          "No. There is no standard behind those numbers and no body that checks them. The " +
          "publisher chooses the range, which is why two books both labelled ages 2-4 can differ " +
          "by a factor of two in difficulty. Judge the book by looking inside at the line thickness " +
          "and how much of the sheet one drawing takes up, not by the number on the cover.",
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
    title: "Colorear por edad: qué puede hacer de verdad un niño a los 1, 2, 3 y 4 años",
    lead:
      "Los padres compran un libro para colorear por la edad impresa en la portada. Ese número dice " +
      "para quién se hizo el libro, no si le sirve al niño que uno tiene delante. Esta página " +
      "describe qué cambia en la mano de un niño entre el año y los cuatro años, y qué tipo de hoja " +
      "conviene en cada punto del camino.",
    body: [
      "El dibujo se desarrolla en el mismo orden en todos los niños, y el orden importa más que el " +
      "calendario. Primero el niño descubre que mover la mano deja una marca. Después las marcas se " +
      "vuelven intencionadas: bucles, trazos de arriba abajo, formas copiadas de otra persona. " +
      "Luego empieza a apuntar a algo de la hoja. Solo después se hace posible quedarse dentro de " +
      "una línea, y llega poco a poco, no de un día para otro.",

      "Dos niños exactamente de la misma edad pueden estar en puntos distintos de este camino, y " +
      "los dos se desarrollan con normalidad. Unos meses de diferencia en cualquier sentido es algo " +
      "corriente. Lo que merece atención no es el ritmo sino el orden: los pasos no se saltan.",

      "Por eso un libro que pone de 1 a 3 años en la portada tiene una tarea difícil. Tiene que " +
      "servir a un niño que garabatea por toda la hoja y a uno que empieza a apuntar, y eso solo es " +
      "posible si los dibujos se mantienen muy simples y muy grandes. Un libro que en cambio apunta " +
      "al centro de ese rango acaba siendo demasiado difícil en un extremo y demasiado soso en el otro.",

      "La consecuencia práctica para un padre es pequeña y útil: juzgue el libro por la página, no " +
      "por la edad de la portada. Contorno grueso, un dibujo que llene la hoja, un motivo que el " +
      "niño sepa nombrar, nada impreso en el reverso. Esas cuatro cosas deciden si el niño se queda " +
      "en la mesa, y se ven en tres segundos de mirar dentro.",
    ],
    faq: [
      {
        q: "¿A qué edad puede empezar a colorear un niño?",
        a:
          "La mayoría de los niños hace sus primeras marcas intencionadas en el papel entre los doce " +
          "y los dieciocho meses, agarrando el crayón con el puño. Eso es colorear en el único " +
          "sentido que importa a esa edad: el niño descubre que mover la mano deja rastro y lo " +
          "repite a propósito. Quedarse dentro de la línea es otra habilidad distinta que llega " +
          "alrededor de los tres años.",
      },
      {
        q: "¿Por qué mi hijo de dos años colorea por encima del dibujo?",
        a:
          "Porque apuntar y detenerse son dos capacidades distintas, y detenerse llega después. Un " +
          "niño de dos años suele poder apuntar el crayón al dibujo y dejar casi todo el color " +
          "encima, saliéndose del contorno sin problema. Salirse de la línea a esta edad no es un " +
          "error, es el aspecto que tiene apuntar antes de que la mano alcance al ojo.",
      },
      {
        q: "¿Mi hijo va retrasado si a los tres años todavía garabatea?",
        a:
          "Por sí solo, no. Cada niño llega a estos puntos a su ritmo y unos meses de diferencia es " +
          "algo corriente, sobre todo si ha pasado poco tiempo con crayones. Lo que importa es que " +
          "el patrón avance a lo largo de los meses y no se quede congelado. Si tiene dudas sobre el " +
          "desarrollo de su hijo, su pediatra es la persona indicada.",
      },
      {
        q: "¿Qué diferencia hay entre un libro para colorear de 1 a 3 años y uno de 2 a 4?",
        a:
          "En la práctica, cuántas zonas separadas hay que rellenar dentro de un mismo dibujo. Un " +
          "libro de 1 a 3 mantiene una forma grande con pocas partes, así que un niño que no sabe " +
          "parar en una línea produce igualmente algo que parece terminado. Un libro de 2 a 4 pone " +
          "más partes dentro de la misma forma, lo que conviene a un niño que ya apunta al dibujo. " +
          "Los dos rangos se solapan mucho, y para un niño de dos años un buen libro de 1 a 3 suele " +
          "funcionar mejor que uno de 2 a 4 recargado.",
      },
      {
        q: "¿La edad de la portada de un libro para colorear es un estándar?",
        a:
          "No. No hay ningún estándar detrás de esos números ni ningún organismo que los " +
          "compruebe. La editorial elige el rango, y por eso dos libros marcados los dos de 2 a 4 " +
          "años pueden diferir al doble en dificultad. Juzgue el libro mirando dentro el grosor de " +
          "la línea y cuánto ocupa un dibujo en la hoja, no por el número de la portada.",
      },
      {
        q: "Mi hijo tiene cuatro años y colorear le aburre. ¿Y ahora qué?",
        a:
          "El aburrimiento a los cuatro suele significar que la hoja ha dejado de pedirle algo al " +
          "niño. La solución no es un libro más fácil sino uno más lleno: una escena con varias " +
          "zonas que rellenar en vez de un objeto suelto, o un libro de dibujo paso a paso donde el " +
          "niño construya la imagen en lugar de rellenar la de otro.",
      },
    ],
  },

  ru: {
    title: "Раскрашивание по возрасту: что ребенок умеет в год, два, три и четыре",
    lead:
      "Родители выбирают раскраску по возрасту на обложке. Эта цифра говорит, для кого книгу " +
      "делали, а не о том, подойдет ли она ребенку, который сидит перед вами. Здесь описано, что " +
      "меняется в руке ребенка между годом и четырьмя годами и какая страница подходит в каждой " +
      "точке пути.",
    body: [
      "Рисование развивается в одном и том же порядке у всех детей, и порядок важнее календаря. " +
      "Сначала ребенок обнаруживает, что от движения руки остается след. Потом черты становятся " +
      "осознанными: петли, движения сверху вниз, линии, повторенные за кем-то. Потом ребенок " +
      "начинает целиться в то, что нарисовано на листе. И только после этого становится возможным " +
      "оставаться внутри контура, причем приходит это постепенно, а не за одно утро.",

      "Двое детей одного и того же возраста могут находиться в разных точках этого пути, и оба " +
      "развиваются нормально. Несколько месяцев в любую сторону это обычное дело. Внимания стоит " +
      "не темп, а порядок: шаги не пропускаются.",

      "Поэтому у раскраски с пометкой от 1 до 3 лет на обложке трудная задача. Она должна " +
      "работать и для ребенка, который черкает поперек листа, и для того, кто начинает целиться, " +
      "а это возможно, только если рисунки остаются очень простыми и очень крупными. Книга, " +
      "которая вместо этого целится в середину диапазона, оказывается слишком трудной с одного " +
      "края и слишком скучной с другого.",

      "Практический вывод для родителя маленький и полезный: судите о книге по странице, а не по " +
      "возрасту на обложке. Толстый контур, один рисунок во весь лист, предмет, который ребенок " +
      "может назвать, ничего не напечатано с обратной стороны. Эти четыре вещи решают, останется " +
      "ли ребенок за столом, и видны за три секунды, если заглянуть внутрь.",
    ],
    faq: [
      {
        q: "В каком возрасте ребенок может начать раскрашивать?",
        a:
          "Большинство детей делает первые осознанные черты на бумаге где-то между двенадцатью и " +
          "восемнадцатью месяцами, держа мелок в кулаке. Это и есть раскрашивание в том " +
          "единственном смысле, который имеет значение в этом возрасте: ребенок обнаруживает, что " +
          "от движения руки остается след, и повторяет движение нарочно. Оставаться внутри " +
          "контура это другое умение, и приходит оно ближе к трем годам.",
      },
      {
        q: "Почему двухлетний ребенок закрашивает прямо поверх рисунка?",
        a:
          "Потому что попадать и останавливаться это две разные способности, и остановка приходит " +
          "позже. Двухлетний обычно уже может направить мелок в рисунок и попасть по нему большей " +
          "частью цвета, свободно выходя за контур. Выход за контур в этом возрасте не ошибка, а " +
          "то, как выглядит попадание, пока рука не догнала глаз.",
      },
      {
        q: "Ребенок в три года все еще черкает. Он отстает?",
        a:
          "Сам по себе этот признак ни о чем не говорит. Каждый ребенок приходит к этим точкам в " +
          "своем темпе, и несколько месяцев в любую сторону это обычное дело, особенно если мелок " +
          "он держал в руках нечасто. Важно, что картина меняется от месяца к месяцу, а не стоит " +
          "на месте. Если вас беспокоит развитие ребенка, спросить об этом нужно педиатра.",
      },
      {
        q: "Чем раскраска 1-3 отличается от раскраски 2-4?",
        a:
          "На практике числом отдельных участков внутри одного рисунка. В книге 1-3 одна крупная " +
          "форма из немногих частей, поэтому у ребенка, который не умеет остановиться у линии, " +
          "все равно получается страница, похожая на законченную. В книге 2-4 внутри той же формы " +
          "больше частей, и это подходит ребенку, который уже целится в рисунок. Диапазоны сильно " +
          "накладываются, и двухлетнему хорошая книга 1-3 часто подходит лучше, чем перегруженная " +
          "2-4.",
      },
      {
        q: "Возраст на обложке раскраски это стандарт?",
        a:
          "Нет. За этими числами не стоит никакого стандарта, и никто их не проверяет. Диапазон " +
          "выбирает издатель, поэтому две книги с одинаковой пометкой 2-4 могут отличаться по " +
          "сложности вдвое. Судите по тому, что видно внутри: толщина линии и сколько листа " +
          "занимает один рисунок, а не по числу на обложке.",
      },
      {
        q: "Ребенку четыре, и раскрашивать ему скучно. Что дальше?",
        a:
          "Скука в четыре года обычно означает, что страница перестала что-либо требовать от " +
          "ребенка. Помогает не более легкая книга, а более наполненная: сюжет с несколькими " +
          "участками вместо отдельного предмета или книга с рисованием по шагам, где ребенок " +
          "строит картинку сам, а не закрашивает чужую.",
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
      "Diez dibujos sacados directamente del libro, en el mismo orden en que aparecen en él. " +
      "Imprima uno, dele un crayón a su hijo y en cinco minutos sabrá si este tipo de hoja le " +
      "conviene. Gratis, sin registro, sin nada que rellenar.",
    body: [
      "Son muestras, no una colección. Diez páginas bastan para ver lo grueso que es el contorno, " +
      "cuánto ocupa un dibujo en la hoja y si su hijo se queda con ella. No bastan para sustituir " +
      "el libro, y no pretenden hacerlo.",

      "Nos parece que ese es el orden honesto. Un padre que ha impreso una hoja y ha visto a su " +
      "propio hijo usarla sabe algo que ninguna descripción de producto puede contarle. Si la " +
      "respuesta resulta ser que no, imprimir le costó una hoja de papel en vez del precio de un libro.",

      "Cada hoja viene en dos tamaños de papel. Carta para Estados Unidos y Canadá, A4 para Europa, " +
      "América Latina y casi todo el resto del mundo. Imprima por una sola cara: el rotulador " +
      "traspasa el papel corriente y en una hoja impresa por los dos lados arruina lo que haya detrás.",

      "Estos dibujos son obra nuestra. Puede imprimirlos en casa, en un aula, en una guardería o en " +
      "una biblioteca, tantas copias como necesite. No puede venderlos ni reunirlos en una " +
      "colección propia.",
    ],
    faq: [
      {
        q: "¿Hay que registrarse o dar un correo?",
        a:
          "No. Cada hoja se descarga directamente en PDF. No hay formulario, ni cuenta, ni correo " +
          "en ningún momento.",
      },
      {
        q: "¿Son los mismos dibujos que están en el libro?",
        a:
          "Sí. Estos diez están tomados directamente del libro, sin cambios, en el orden en que " +
          "aparecen en él. El libro tiene 111 dibujos en total, así que lo que ve aquí es una " +
          "muestra suya y no un conjunto aparte.",
      },
      {
        q: "¿Qué tamaño de papel elijo?",
        a:
          "Carta si está en Estados Unidos o Canadá, A4 en casi todos los demás sitios. Si imprime " +
          "el que no toca el dibujo sale igual, solo que con márgenes desiguales.",
      },
      {
        q: "¿Puedo usarlos en mi aula o guardería?",
        a:
          "Sí. Imprima tantas copias como necesite para los niños a su cargo, en casa, en un aula, " +
          "en una guardería o en una biblioteca. Lo único que no se permite es venderlos ni " +
          "reunirlos en una colección que distribuya como propia.",
      },
    ],
  },

  ru: {
    title: "Десять страниц из книги, бесплатно для печати",
    lead:
      "Десять рисунков прямо из книги, в том же порядке, что и в ней. Распечатайте один, дайте " +
      "ребенку карандаш, и за пять минут станет ясно, подходит ли ему такая страница. " +
      "Бесплатно, без регистрации, ничего вводить не нужно.",
    body: [
      "Это образцы, а не набор. Десяти страниц хватает, чтобы увидеть, какой толщины контур, " +
      "сколько листа занимает один рисунок и остается ли ребенок за столом. Заменить книгу они " +
      "не могут, и такой задачи у них нет.",

      "Нам кажется, что честно именно так. Родитель, который распечатал лист и посмотрел на " +
      "своего ребенка с карандашом, знает то, чего не скажет ни одно описание товара. Если " +
      "ответ окажется отрицательным, вы потратили лист бумаги, а не стоимость книги.",

      "Каждая страница есть в двух форматах бумаги. US Letter для США и Канады, A4 для России, " +
      "Европы и большей части мира. Печатайте с одной стороны: фломастер проходит обычную " +
      "бумагу насквозь и на двусторонней печати портит то, что с обратной стороны.",

      "Эти рисунки наша собственная работа. Их можно печатать дома, в детском саду, в школе " +
      "или в библиотеке, в любом количестве. Нельзя продавать их и собирать в собственный набор.",
    ],
    faq: [
      {
        q: "Нужно ли регистрироваться или оставлять почту?",
        a:
          "Нет. Каждая страница скачивается напрямую файлом PDF. Ни формы, ни учетной записи, " +
          "ни почты ни на каком шаге не требуется.",
      },
      {
        q: "Это те же рисунки, что в книге?",
        a:
          "Да. Эти десять взяты прямо из книги, без изменений, в том же порядке. Всего в книге " +
          "111 рисунков, так что здесь вы видите образец, а не отдельный набор.",
      },
      {
        q: "Какой формат бумаги выбрать?",
        a:
          "A4 в России, Европе и почти везде за пределами Северной Америки. US Letter в США и " +
          "Канаде. Если выбрать не тот, рисунок все равно напечатается, только поля будут неровными.",
      },
      {
        q: "Можно ли использовать их в детском саду?",
        a:
          "Да. Печатайте столько копий, сколько нужно детям, с которыми вы занимаетесь: дома, в " +
          "группе, в саду, в школе или в библиотеке. Нельзя только продавать их или собирать в " +
          "набор, который вы распространяете как свой.",
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
      "Toddler Coloring Book pertenece a Magic of Discoveries LLC, una pequeña editorial de libros " +
      "infantiles en Miami, Florida, llevada por Ricardo y Maria Demi.",
    body: [
      "Publicamos libros para colorear, libros de dibujo paso a paso y cuentos ilustrados para " +
      "niños pequeños, en inglés y en español. Uno de esos libros es un libro para colorear de uno " +
      "a tres años, y este sitio existe por las preguntas que los padres nos hacían una y otra vez. " +
      "No preguntas sobre el libro: preguntas sobre su hijo. Si el de un año es demasiado pequeño. " +
      "Por qué colorea justo por encima del dibujo. Qué hacer cuando el rotulador traspasa la hoja.",

      "Responder a eso como es debido ocupa más espacio del que permite la descripción de un " +
      "producto, y las respuestas sirven igual compre alguien algo o no. Así que viven aquí, en su " +
      "propio sitio, escritas con claridad y apoyadas en investigación publicada sobre el " +
      "desarrollo, no en nuestra opinión.",

      "No somos médicos y nada de lo que hay aquí es consejo médico ni una evaluación de ningún " +
      "niño concreto. Las edades que damos son rangos habituales tomados de hitos del desarrollo " +
      "publicados, y las fuentes aparecen nombradas en cada página donde las usamos. Si tiene " +
      "dudas sobre cómo se desarrolla su hijo, su pediatra es la persona indicada.",

      "Presentamos un libro propio, y decimos claramente cuándo no le conviene a un niño. Un libro " +
      "hecho para la primera etapa del dibujo aburrirá a un niño de cuatro años que ya se queda " +
      "dentro de la línea, y decírselo a un padre nos cuesta una venta y nos gana un lector que vuelve.",
    ],
  },

  ru: {
    title: "Кто ведет этот сайт",
    lead:
      "Toddler Coloring Book (Раскраска для малышей) выпускает Magic of Discoveries LLC, " +
      "небольшое издательство детских книг в Майами, штат Флорида. Им занимаются Рикардо и " +
      "Мария Деми.",
    body: [
      "Мы издаем раскраски, книги с рисованием по шагам и книжки с картинками для маленьких " +
      "детей, на английском и испанском. Одна из этих книг раскраска для возраста от года до " +
      "трех, и этот сайт появился из вопросов, которые нам задавали родители. Причем не о " +
      "книге, а о своем ребенке. Не рано ли в год. Почему она закрашивает прямо поверх " +
      "картинки. Что делать, если фломастер проходит бумагу насквозь.",

      "Ответить на это как следует в описании товара негде, а сами ответы полезны независимо " +
      "от того, купит человек что-нибудь у нас или нет. Поэтому они живут здесь, на отдельном " +
      "сайте, написаны простыми словами и опираются на опубликованные исследования развития, " +
      "а не на наше мнение.",

      "Мы не врачи, и ничто здесь не является медицинским советом или оценкой конкретного " +
      "ребенка. Возраст, который мы называем, это обычный разброс из опубликованных норм " +
      "развития, и источники названы на каждой странице, где мы на них опираемся. Если вас " +
      "беспокоит, как развивается ваш ребенок, спросить нужно педиатра.",

      "На сайте одна наша книга, и мы прямо говорим, когда она ребенку не подходит. Книга для " +
      "первого этапа рисования наскучит четырехлетнему, который уже уверенно остается внутри " +
      "контура. Сказать об этом стоит нам одной продажи и приносит читателя, который вернется.",
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
    title: "Guías para padres: la parte práctica de colorear con un niño pequeño",
    lead:
      "Las preguntas que aparecen cuando el libro ya está sobre la mesa. Con qué dibujar, qué hacer " +
      "con la suciedad, por qué el rotulador traspasa la hoja y cuánto tiempo aguanta ahí sentado " +
      "de verdad un niño pequeño. Primero las respuestas cortas, el razonamiento debajo.",
    body: [
      "Ninguna de estas es una pregunta sobre libros para colorear. Son preguntas sobre un niño " +
      "concreto en una mesa concreta una tarde concreta, y por eso las descripciones de producto " +
      "nunca las responden bien. Cada guía de abajo toma una de ellas y la responde entera, sin " +
      "mandarle antes a leer otra cosa.",
    ],
  },
  ru: {
    title: "Статьи для родителей: практическая сторона раскрашивания с малышом",
    lead:
      "Вопросы, которые появляются, когда книга уже лежит на столе. Чем рисовать, что делать с " +
      "грязью, почему фломастер проходит бумагу насквозь и сколько маленький ребенок на самом " +
      "деле там просидит. Сначала короткий ответ, следом рассуждение.",
    body: [
      "Ни один из этих вопросов не про раскраски. Это вопросы про конкретного ребенка за " +
      "конкретным столом в конкретный день, и поэтому описания товаров на них никогда не " +
      "отвечают как следует. Каждая статья ниже берет один такой вопрос и отвечает на него " +
      "целиком, не отправляя читать что-то другое сначала.",
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
    title: "Uso de nuestros dibujos y qué hace este sitio con sus datos",
    lead:
      "Versión corta: imprima nuestras hojas gratis cuanto quiera, en casa o en un aula, pero no " +
      "las venda. No pedimos su correo, no ponemos cookies de publicidad, y ganamos una comisión " +
      "cuando alguien compra nuestro libro a través de un enlace de aquí.",
    body: [
      "Los dibujos de este sitio son obra nuestra, hechos por ilustradores que contratamos, y " +
      "tomados de libros que publicamos. Puede descargarlos e imprimirlos para los niños a su " +
      "cargo: en casa, en un aula, en una guardería, en una biblioteca o en una sala de espera, en " +
      "tantas copias como necesite. No hace falta permiso ni hace falta citarnos.",

      "Lo que no puede hacer es venderlos, ponerlos detrás de un muro de pago, ni reunirlos en una " +
      "colección que distribuya como obra propia, sea gratis o de pago. Eso incluye subirlos a un " +
      "servicio de impresión bajo demanda o a un sitio que vende recursos didácticos.",

      "Sobre los datos, la respuesta honesta es que hay muy poco que contar. Descargar una hoja no " +
      "requiere cuenta, ni correo, ni formulario. No mostramos publicidad y no ponemos cookies " +
      "publicitarias. Si más adelante añadimos estadísticas básicas de visitas, esta página lo " +
      "dirá con claridad y nombrará la herramienta usada.",

      "Los enlaces a Amazon de este sitio son enlaces de afiliado, lo que significa que recibimos " +
      "una comisión si usted compra a través de ellos. A usted no le cuesta nada más y el precio " +
      "no cambia. Lo decimos en cada página donde aparece un enlace así, porque una recomendación " +
      "vale menos cuando el lector no sabe cómo cobra quien recomienda.",

      "El libro que presentamos aquí es nuestro, así que nuestro interés en que lo compre es " +
      "directo y no por comisión. Precisamente por eso este sitio dice con claridad cuándo el " +
      "libro no es la opción adecuada para un niño. Una recomendación que nunca dice que no, no es " +
      "una recomendación.",

      "Nada de lo que hay en este sitio es consejo médico ni una evaluación de ningún niño " +
      "concreto. Los rangos de desarrollo que damos vienen de fuentes publicadas, nombradas en las " +
      "páginas donde las usamos. Si tiene dudas sobre el desarrollo de su hijo, su pediatra es la " +
      "persona indicada.",
    ],
  },

  ru: {
    title: "Использование наших рисунков и что сайт делает с вашими данными",
    lead:
      "Коротко: печатайте наши бесплатные листы сколько угодно, дома или в группе, но не " +
      "продавайте их. Мы не спрашиваем вашу почту, не ставим рекламных куки и получаем " +
      "комиссию, когда книгу покупают по ссылке отсюда.",
    body: [
      "Рисунки на этом сайте наша собственная работа: их сделали художники, которых мы наняли, " +
      "и взяты они из книг, которые мы издаем. Вы можете скачивать и печатать их для детей, с " +
      "которыми занимаетесь: дома, в группе, в детском саду, в школе, в библиотеке или в " +
      "поликлинике, в любом количестве. Разрешение не требуется, ссылка на нас не требуется.",

      "Чего делать нельзя: продавать их, закрывать доступ к ним за плату или собирать в " +
      "собственный набор и распространять как свою работу, платно или бесплатно. Сюда же " +
      "относится загрузка их в сервисы печати по требованию и на площадки, торгующие " +
      "материалами для занятий.",

      "О данных честный ответ такой: рассказывать почти нечего. Чтобы скачать страницу, не " +
      "нужны ни учетная запись, ни почта, ни форма. Рекламы мы не показываем и рекламных куки " +
      "не ставим. Если позже мы добавим простой счетчик посещений, эта страница скажет об " +
      "этом прямо и назовет инструмент.",

      "Ссылки на Amazon на этом сайте партнерские: мы получаем комиссию, если вы покупаете по " +
      "ним. Вам это не стоит ничего дополнительно и не меняет цену. Мы говорим об этом на " +
      "каждой странице, где такая ссылка стоит, потому что рекомендация стоит дешевле, когда " +
      "читатель не знает, как рекомендующему платят.",

      "Книга на этом сайте наша собственная, так что наш интерес к вашей покупке прямой, а не " +
      "комиссионный. Именно поэтому сайт прямо говорит, когда книга ребенку не подходит. " +
      "Рекомендация, которая никогда не говорит нет, это не рекомендация.",

      "Ничто на этом сайте не является медицинским советом или оценкой конкретного ребенка. " +
      "Возрастные рамки, которые мы называем, взяты из опубликованных источников, названных на " +
      "тех страницах, где мы ими пользуемся. Если вас беспокоит развитие вашего ребенка, " +
      "спросить нужно педиатра.",
    ],
  },
};
