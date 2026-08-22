import type { ContentLang } from "./dictionaries";

/* ------------------------------------------------------------------ */
/*  Этапы первого рисования                                            */
/* ------------------------------------------------------------------ */

/* Четыре этапа, а не четыре возраста. Это принципиально.
   Ребенок попадает в этап по тому, что он делает рукой, а не по дате
   рождения: полуторагодовалый может уже уверенно держать карандаш,
   а трехлетний все еще черкать поперек листа, и оба нормальны.

   За каждым утверждением "ребенок в этом возрасте обычно умеет"
   стоит опубликованный ориентир развития. Ссылки лежат в lib/site.ts
   и выводятся внизу страниц. Без них это были бы просто наши слова,
   а страница, за которой не стоит источник, не годится ни для
   родителя, ни для нейросети, решающей, можно ли ее цитировать. */

export type StageId = "scribble" | "control" | "aim" | "shape";

export type Stage = {
  id: StageId;
  /* Адрес страницы на каждом языке. Испанский родитель должен видеть
     испанский адрес: английское слово в адресе испанской страницы
     выглядит как недоделка и для человека, и для поисковика. */
  slug: Record<ContentLang, string>;
  /* Типичный возраст. Именно типичный: это диапазон, а не рубеж. */
  ageLabel: Record<ContentLang, string>;
  title: Record<ContentLang, string>;
  /* Что рука ребенка обычно уже делает на этом этапе. */
  can: Record<ContentLang, string[]>;
  /* Чего от ребенка на этом этапе ждать рано. Этот кусок важнее
     предыдущего: почти все разочарования родителя растут из того,
     что от ребенка ждут следующего этапа. */
  notYet: Record<ContentLang, string>;
  /* Каким должен быть лист, чтобы ребенок увидел результат. */
  lookFor: Record<ContentLang, string[]>;
  /* Подходит ли наша книга этому этапу и насколько честно. */
  bookFit: "core" | "edge" | "outgrown";
};

export const stages: Stage[] = [
  {
    id: "scribble",
    slug: { en: "first-marks", es: "primeras-marcas", ru: "pervye-cherty" },
    ageLabel: {
      en: "about 12 to 18 months",
      es: "unos 12 a 18 meses",
      ru: "примерно от 12 до 18 месяцев",
    },
    title: { en: "First marks", es: "Primeras marcas", ru: "Первые черты" },
    can: {
      en: [
        "Holds a crayon in a fist and makes marks on paper on purpose",
        "Understands that moving the hand leaves a trace, and repeats it to see it happen again",
        "Moves from the shoulder and elbow, so the marks are long and sweeping",
      ],
      es: [
        "Agarra el crayón con el puño y hace marcas en el papel a propósito",
        "Entiende que mover la mano deja rastro, y lo repite para verlo otra vez",
        "Mueve el hombro y el codo, así que las marcas son largas y amplias",
      ],
      ru: [
        "Держит мелок в кулаке и нарочно оставляет след на бумаге",
        "Понимает, что от движения руки остается след, и повторяет движение, чтобы увидеть это снова",
        "Двигает плечом и локтем, поэтому черты выходят длинными и размашистыми",
      ],
    },
    notYet: {
      en:
        "Aiming at anything is still ahead. The page is the target, not the drawing on it, and " +
        "that is exactly what this stage is for.",
      es:
        "Apuntar a algo todavía está por venir. El objetivo es la hoja, no el dibujo que hay en " +
        "ella, y para eso sirve precisamente esta etapa.",
      ru:
        "Целиться во что-то ребенок пока не умеет. Мишень для него это сам лист, а не рисунок " +
        "на листе, и ровно для этого нужен первый этап.",
    },
    lookFor: {
      en: [
        "Very thick outlines. A thin line vanishes under a fist grip and the child sees nothing happen",
        "One large shape filling the sheet, so any mark lands somewhere that counts",
        "Sturdy paper, because at this stage the crayon presses hard and sometimes tears",
        "Subjects the child can already name out loud: a ball, a cat, an apple",
      ],
      es: [
        "Contornos muy gruesos. Una línea fina desaparece bajo el puño y el niño no ve que pase nada",
        "Una sola forma grande que llene la hoja, para que cualquier marca caiga donde cuenta",
        "Papel resistente, porque en esta etapa el crayón aprieta fuerte y a veces rompe",
        "Motivos que el niño ya sepa nombrar en voz alta: una pelota, un gato, una manzana",
      ],
      ru: [
        "Очень толстый контур. Тонкая линия пропадает под мелком, зажатым в кулаке, и ребенок не видит, что что-то произошло",
        "Одна крупная форма во весь лист, чтобы любая черта попадала туда, где она заметна",
        "Плотная бумага: на этом этапе нажим сильный, и тонкий лист иногда рвется",
        "Предметы, которые ребенок уже может назвать вслух: мяч, кошка, яблоко",
      ],
    },
    bookFit: "core",
  },

  {
    id: "control",
    slug: {
      en: "controlled-scribbling",
      es: "garabato-con-control",
      ru: "osoznannye-karakuli",
    },
    ageLabel: {
      en: "about 18 months to 2 years",
      es: "de unos 18 meses a 2 años",
      ru: "примерно от 18 месяцев до 2 лет",
    },
    title: {
      en: "Controlled scribbling",
      es: "Garabato con control",
      ru: "Осознанные каракули",
    },
    can: {
      en: [
        "Scribbles without being shown first, and can copy a line someone else draws",
        "Makes round looping marks and up and down strokes on purpose",
        "Turns the pages of a book one at a time",
        "Keeps most of the marks somewhere on the drawing rather than all over the table",
      ],
      es: [
        "Garabatea sin que se lo enseñen antes, y puede imitar una línea que dibuja otra persona",
        "Hace marcas redondas en bucle y trazos de arriba abajo a propósito",
        "Pasa las páginas de un libro de una en una",
        "Deja la mayoría de las marcas sobre el dibujo y no por toda la mesa",
      ],
      ru: [
        "Начинает черкать сам, без показа, и может повторить линию, которую нарисовал кто-то другой",
        "Нарочно делает круглые петли и черты сверху вниз",
        "Переворачивает страницы книги по одной",
        "Большая часть черт попадает на рисунок, а не на стол вокруг",
      ],
    },
    notYet: {
      en:
        "Staying inside a line is still out of reach, and asking for it now is the fastest way to " +
        "make a child put the crayon down.",
      es:
        "Quedarse dentro de la línea todavía no está a su alcance, y exigirlo ahora es la manera " +
        "más rápida de que el niño suelte el crayón.",
      ru:
        "Оставаться внутри контура ребенку пока не по силам, и требовать этого сейчас это самый " +
        "быстрый способ добиться того, что мелок будет отложен.",
    },
    lookFor: {
      en: [
        "Thick outlines still, but the shape can have two or three parts now",
        "One drawing per page, and nothing else on the sheet competing for attention",
        "A word printed under the drawing, so naming comes along with coloring",
        "Single-sided pages, because a marker at this age goes straight through",
      ],
      es: [
        "Contornos todavía gruesos, pero la forma ya puede tener dos o tres partes",
        "Un dibujo por página, y nada más en la hoja que compita por la atención",
        "Una palabra impresa debajo del dibujo, para que nombrar acompañe al colorear",
        "Hojas impresas por una cara, porque a esta edad el rotulador traspasa",
      ],
      ru: [
        "Контур по-прежнему толстый, но форма уже может состоять из двух-трех частей",
        "Один рисунок на странице, и рядом ничего, что отвлекало бы внимание",
        "Слово под рисунком, чтобы называние шло вместе с раскрашиванием",
        "Печать с одной стороны: фломастер в этом возрасте проходит лист насквозь",
      ],
    },
    bookFit: "core",
  },

  {
    id: "aim",
    slug: {
      en: "aiming-at-the-shape",
      es: "apuntando-a-la-forma",
      ru: "popadanie-v-risunok",
    },
    ageLabel: {
      en: "about 2 to 3 years",
      es: "de unos 2 a 3 años",
      ru: "примерно от 2 до 3 лет",
    },
    title: {
      en: "Aiming at the shape",
      es: "Apuntando a la forma",
      ru: "Попадание в рисунок",
    },
    can: {
      en: [
        "Copies a vertical line, a horizontal line and a circle when shown",
        "Holds the crayon with the fingers rather than the whole fist",
        "Aims at the drawing and gets most of the color onto it, crossing the outline freely",
        "Names what is on the page before starting",
      ],
      es: [
        "Copia una línea vertical, una horizontal y un círculo cuando se lo muestran",
        "Agarra el crayón con los dedos y no con todo el puño",
        "Apunta al dibujo y deja casi todo el color encima, saliéndose del contorno sin problema",
        "Nombra lo que hay en la hoja antes de empezar",
      ],
      ru: [
        "Повторяет вертикальную линию, горизонтальную линию и круг, если показать",
        "Держит мелок пальцами, а не всей ладонью",
        "Целится в рисунок и попадает по нему большей частью цвета, свободно выходя за контур",
        "Называет то, что нарисовано на листе, еще до начала",
      ],
    },
    notYet: {
      en:
        "Neat edges are not the goal yet. Crossing the line at this stage is not a mistake, it is " +
        "what aiming looks like before the hand catches up.",
      es:
        "Los bordes limpios todavía no son el objetivo. Salirse de la línea en esta etapa no es un " +
        "error, es el aspecto que tiene apuntar antes de que la mano llegue.",
      ru:
        "Аккуратные края пока не цель. Выход за контур на этом этапе не ошибка, а то, как " +
        "выглядит попадание, пока рука не догнала глаз.",
    },
    lookFor: {
      en: [
        "Bold outlines, with a few separate areas inside the shape to fill",
        "Drawings the child recognizes without being told what they are",
        "Enough variety that no two pages in a row feel the same",
        "Room at the edge of the page, so a child who wants to add a sun has somewhere to put it",
      ],
      es: [
        "Contornos marcados, con algunas zonas separadas dentro de la forma para rellenar",
        "Dibujos que el niño reconozca sin que le digan qué son",
        "Suficiente variedad para que dos páginas seguidas no se parezcan",
        "Espacio en el borde de la hoja, para que quien quiera añadir un sol tenga dónde ponerlo",
      ],
      ru: [
        "Хорошо заметный контур и несколько отдельных участков внутри формы, которые можно закрасить по-разному",
        "Рисунки, которые ребенок узнает сам, без подсказки",
        "Достаточно разнообразия, чтобы две страницы подряд не были похожи",
        "Свободное место у края листа, чтобы ребенку, который хочет дорисовать солнце, было где его поставить",
      ],
    },
    bookFit: "core",
  },

  {
    id: "shape",
    slug: { en: "inside-the-line", es: "dentro-de-la-linea", ru: "vnutri-kontura" },
    ageLabel: {
      en: "about 3 to 4 years and up",
      es: "de unos 3 a 4 años en adelante",
      ru: "примерно от 3 до 4 лет и старше",
    },
    title: { en: "Inside the line", es: "Dentro de la línea", ru: "Внутри контура" },
    can: {
      en: [
        "Copies a circle accurately, and a cross closer to four years old",
        "Stays inside the outline most of the time and notices when the color goes out",
        "Chooses colors on purpose and can explain the choice",
        "Sits with one page for ten minutes or longer",
      ],
      es: [
        "Copia un círculo con precisión, y una cruz más cerca de los cuatro años",
        "Se queda dentro del contorno casi siempre y nota cuándo el color se sale",
        "Elige los colores a propósito y sabe explicar por qué",
        "Se queda con la misma hoja diez minutos o más",
      ],
      ru: [
        "Точно повторяет круг, а ближе к четырем годам и крестик",
        "Большую часть времени остается внутри контура и замечает, когда цвет вышел наружу",
        "Выбирает цвета нарочно и может объяснить выбор",
        "Занят одной страницей десять минут и дольше",
      ],
    },
    notYet: {
      en:
        "This is where a first coloring book starts to feel too easy. Boredom here is a good sign, " +
        "not a problem to solve with more of the same.",
      es:
        "Aquí es donde un primer libro para colorear empieza a resultar demasiado fácil. Aburrirse " +
        "en este punto es buena señal, no un problema que se arregle con más de lo mismo.",
      ru:
        "Здесь первая раскраска начинает казаться слишком легкой. Скука в этой точке хороший " +
        "знак, а не задача, которую решают такими же страницами.",
    },
    lookFor: {
      en: [
        "More areas to fill inside one drawing, and a scene rather than a single object",
        "Something to do besides color: a shape to trace, a word to copy, a background to invent",
        "Step by step drawing, where the child builds the picture instead of filling in someone else's",
      ],
      es: [
        "Más zonas que rellenar dentro de un mismo dibujo, y una escena en vez de un objeto suelto",
        "Algo que hacer además de colorear: una forma que calcar, una palabra que copiar, un fondo que inventar",
        "Dibujo paso a paso, donde el niño construye la imagen en vez de rellenar la de otro",
      ],
      ru: [
        "Больше участков внутри одного рисунка и сюжет вместо отдельного предмета",
        "Занятие помимо раскрашивания: форма, которую надо обвести, слово, которое можно повторить, фон, который можно придумать",
        "Рисование по шагам, где ребенок строит картинку сам, а не закрашивает чужую",
      ],
    },
    bookFit: "outgrown",
  },
];

export const stageById = (id: StageId) => stages.find((s) => s.id === id)!;

/** Находит этап по адресу страницы на нужном языке. */
export const stageBySlug = (lang: ContentLang, slug: string) =>
  stages.find((s) => s.slug[lang] === slug);

/* ------------------------------------------------------------------ */
/*  Как ответы превращаются в этап                                      */
/* ------------------------------------------------------------------ */

/* Возраст дает первую догадку, а поведение руки ее правит.
   Поведение весит больше возраста намеренно: родитель точно знает,
   сколько ребенку лет, но именно рука показывает, где он на самом деле.
   Итог никогда не выходит за края шкалы, поэтому ответ есть всегда. */

export type Answers = {
  age: string;
  grip: string;
  inside: string;
  attention: string;
};

const ORDER: StageId[] = ["scribble", "control", "aim", "shape"];

export function pickStage(a: Answers): StageId {
  const base: Record<string, number> = { "1": 0, "2": 1.6, "3": 2.6, "4": 3 };
  let score = base[a.age] ?? 1.5;

  /* Хват. Кулак это почти всегда самое начало, независимо от возраста. */
  if (a.grip === "fist") score -= 0.9;
  if (a.grip === "pencil") score += 0.7;

  /* Попадание в рисунок. Самый честный признак из всех четырех:
     его родитель видит своими глазами, тут не ошибешься. */
  if (a.inside === "across") score -= 1.1;
  if (a.inside === "inside") score += 1.1;

  /* Внимание. Влияет слабее: усидчивость сильно зависит от дня,
     от настроения и от того, интересен ли ребенку сам рисунок. */
  if (a.attention === "short") score -= 0.4;
  if (a.attention === "long") score += 0.4;

  const i = Math.max(0, Math.min(ORDER.length - 1, Math.round(score)));
  return ORDER[i];
}
