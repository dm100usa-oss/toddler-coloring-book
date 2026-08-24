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
      es: "aproximadamente de 12 a 18 meses",
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
        "Sujeta el crayón con toda la mano y deja marcas en el papel de forma intencionada",
        "Comprende que al mover la mano deja un trazo en el papel y repite el movimiento",
        "Mueve principalmente el hombro y el codo, por eso los trazos son largos y amplios",
      ],
      ru: [
        "Держит мелок всей ладонью и уже осознанно оставляет следы на бумаге",
        "Понимает, что движение руки оставляет след на бумаге, и повторяет его снова",
        "Двигает рукой в основном от плеча и локтя, поэтому линии получаются длинными и " +
          "размашистыми",
      ],
    },
    notYet: {
      en:
        "Aiming at anything is still ahead. The page is the target, not the drawing on it, and " +
        "that is exactly what this stage is for.",
      es:
        "Todavía no sabe dirigir los trazos hacia el dibujo con precisión. En esta etapa, lo " +
          "importante es la hoja y la posibilidad de dejar marcas en ella, no los límites de " +
          "la imagen.",
      ru:
        "Точно попадать по рисунку ребенок пока не умеет. Для него важен сам лист и " +
          "возможность оставлять на нем следы, а не границы картинки.",
    },
    lookFor: {
      en: [
        "Very thick outlines. A thin line vanishes under a fist grip and the child sees nothing happen",
        "One large shape filling the sheet, so any mark lands somewhere that counts",
        "Sturdy paper, because at this stage the crayon presses hard and sometimes tears",
        "Subjects the child can already name out loud: a ball, a cat, an apple",
      ],
      es: [
        "Contornos muy gruesos y fáciles de ver. Una línea fina puede quedar oculta bajo los " +
          "trazos anchos del crayón.",
        "Una sola forma grande que ocupe casi toda la hoja, para que al niño le resulte más " +
          "fácil hacer los trazos sobre el dibujo",
        "Papel suficientemente resistente: los niños pequeños suelen presionar con fuerza el " +
          "crayón y una hoja fina puede romperse",
        "Objetos y animales familiares que el adulto pueda nombrar con el niño: una pelota, " +
          "un gato, una manzana",
      ],
      ru: [
        "Очень толстый и хорошо заметный контур. Тонкую линию малышу сложнее увидеть под " +
          "широкими следами мелка.",
        "Одна крупная форма почти во весь лист, чтобы ребенку было легче попадать по рисунку",
        "Достаточно плотная бумага: маленькие дети нередко сильно нажимают на мелок, и " +
          "тонкий лист может порваться",
        "Знакомые ребенку предметы и животные, которые взрослый может назвать вместе с ним: " +
          "мяч, кошка, яблоко",
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
      es: "aproximadamente de 18 meses a 2 años",
      ru: "примерно от 18 месяцев до 2 лет",
    },
    title: {
      en: "Controlled scribbling",
      es: "Garabatos más controlados",
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
        "Empieza a dibujar por iniciativa propia, sin que un adulto tenga que mostrarle " +
          "cómo, y puede intentar imitar una línea sencilla",
        "Hace de forma intencionada trazos redondeados, bucles y líneas de arriba abajo",
        "Pasa las páginas de un libro de una en una",
        "La mayoría de los trazos ya caen sobre el dibujo",
      ],
      ru: [
        "Начинает рисовать самостоятельно, без показа взрослого, и может попытаться " +
          "повторить простую линию",
        "Осознанно рисует округлые петли и линии сверху вниз",
        "Переворачивает страницы книги по одной",
        "Большая часть линий уже попадает на рисунок",
      ],
    },
    notYet: {
      en:
        "Staying inside a line is still out of reach, and asking for it now is the fastest way to " +
        "make a child put the crayon down.",
      es:
        "Todavía le resulta difícil mantenerse dentro del contorno, y no conviene exigirle " +
          "que coloree con precisión en esta etapa.",
      ru:
        "Оставаться внутри контура ребенку пока трудно, и требовать от него аккуратного " +
          "раскрашивания на этом этапе не стоит.",
    },
    lookFor: {
      en: [
        "Thick outlines still, but the shape can have two or three parts now",
        "One drawing per page, and nothing else on the sheet competing for attention",
        "A word printed under the drawing, so naming comes along with coloring",
        "Single-sided pages, because a marker at this age goes straight through",
      ],
      es: [
        "El contorno debe seguir siendo grueso, pero el dibujo ya puede tener dos o tres partes",
        "Un solo dibujo por página, sin elementos innecesarios alrededor que puedan distraer",
        "Una palabra debajo del dibujo, para que el niño pueda colorear mientras se " +
          "familiariza con su nombre",
        "Impresión por una sola cara: la tinta de un rotulador puede traspasar el papel " +
          "corriente",
      ],
      ru: [
        "Контур по-прежнему должен быть толстым, но рисунок уже может состоять из двух-трех " +
          "частей",
        "Один рисунок на странице, без лишних деталей вокруг, которые могут отвлекать внимание",
        "Слово под рисунком, чтобы ребенок одновременно раскрашивал и знакомился с названием",
        "Печать только с одной стороны: фломастер может пройти сквозь обычную бумагу",
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
      es: "aproximadamente de 2 a 3 años",
      ru: "примерно от 2 до 3 лет",
    },
    title: {
      en: "Aiming at the shape",
      es: "Aprende a dirigir los trazos hacia el dibujo",
      ru: "Учится попадать по рисунку",
    },
    can: {
      en: [
        "Copies a vertical line, a horizontal line and a circle when shown",
        "Holds the crayon with the fingers rather than the whole fist",
        "Aims at the drawing and gets most of the color onto it, crossing the outline freely",
        "Names what is on the page before starting",
      ],
      es: [
        "Puede copiar una línea vertical, una horizontal y un círculo si se le muestra cómo " +
          "hacerlo",
        "Sujeta el crayón con los dedos, en lugar de con toda la mano",
        "Intenta colorear el propio dibujo y aplica la mayor parte del color sobre él, " +
          "aunque todavía se sale del contorno con frecuencia",
        "Reconoce y nombra lo que aparece en la página antes de empezar a colorear",
      ],
      ru: [
        "Может повторить вертикальную и горизонтальную линии и круг, если показать, как это " +
          "сделать",
        "Держит мелок пальцами, а не всей ладонью",
        "Старается раскрашивать сам рисунок и большую часть цвета наносит на него, хотя все " +
          "еще часто выходит за контур",
        "Узнает и называет то, что нарисовано на странице, еще до начала раскрашивания",
      ],
    },
    notYet: {
      en:
        "Neat edges are not the goal yet. Crossing the line at this stage is not a mistake, it is " +
        "what aiming looks like before the hand catches up.",
      es:
        "Mantenerse dentro del contorno todavía no es lo más importante. Salirse de las " +
          "líneas en esta etapa es completamente normal: la precisión de los movimientos aún " +
          "se está desarrollando.",
      ru:
        "Аккуратно оставаться внутри контура пока не главное. Выходить за его границы на " +
          "этом этапе совершенно нормально: точность движений еще развивается.",
    },
    lookFor: {
      en: [
        "Bold outlines, with a few separate areas inside the shape to fill",
        "Drawings the child recognizes without being told what they are",
        "Enough variety that no two pages in a row feel the same",
        "Room at the edge of the page, so a child who wants to add a sun has somewhere to put it",
      ],
      es: [
        "Un contorno bien visible y varias zonas separadas dentro del dibujo que se puedan " +
          "colorear con distintos colores",
        "Dibujos familiares que el niño reconozca sin ayuda",
        "Suficiente variedad para que las páginas consecutivas no parezcan iguales",
        "Algo de espacio libre alrededor del dibujo, por si el niño quiere añadir algo",
      ],
      ru: [
        "Хорошо заметный контур и несколько отдельных участков внутри рисунка, которые можно " +
          "раскрасить разными цветами",
        "Знакомые рисунки, которые ребенок узнает без подсказки",
        "Достаточно разнообразные рисунки, чтобы соседние страницы не казались одинаковыми",
        "Немного свободного места вокруг рисунка, чтобы ребенок при желании мог что-нибудь " +
          "дорисовать",
      ],
    },
    bookFit: "core",
  },

  {
    id: "shape",
    slug: { en: "inside-the-line", es: "dentro-de-la-linea", ru: "vnutri-kontura" },
    ageLabel: {
      en: "about 3 to 4 years and up",
      es: "aproximadamente de 3 a 4 años en adelante",
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
        "Puede copiar un círculo con seguridad y, cerca de los cuatro años, también una cruz",
        "Colorea dentro del contorno la mayor parte del tiempo y se da cuenta cuando se sale",
        "Elige los colores de forma intencionada y puede explicar su elección",
        "Puede dedicar diez minutos o más a una misma página",
      ],
      ru: [
        "Уверенно повторяет круг, а ближе к четырем годам может повторить и крестик",
        "Большую часть времени раскрашивает внутри контура и замечает, когда выходит за его " +
          "границы",
        "Осознанно выбирает цвета и может объяснить свой выбор",
        "Может заниматься одной страницей десять минут и дольше",
      ],
    },
    notYet: {
      en:
        "This is where a first coloring book starts to feel too easy. Boredom here is a good sign, " +
        "not a problem to solve with more of the same.",
      es:
        "En esta etapa, el primer libro para colorear puede empezar a resultarle demasiado " +
          "sencillo. Si termina las páginas con facilidad y pierde el interés rápidamente, " +
          "puede ser el momento de pasar a actividades más complejas.",
      ru:
        "На этом этапе первая раскраска может стать ребенку слишком простой. Если он быстро " +
          "справляется со страницей и теряет интерес, пора переходить к более сложным " +
          "заданиям.",
    },
    lookFor: {
      en: [
        "More areas to fill inside one drawing, and a scene rather than a single object",
        "Something to do besides color: a shape to trace, a word to copy, a background to invent",
        "Step by step drawing, where the child builds the picture instead of filling in someone else's",
      ],
      es: [
        "Más zonas separadas dentro del dibujo y pequeñas escenas en lugar de un solo objeto",
        "Otras actividades además de colorear: repasar una forma, copiar una palabra o " +
          "inventar y dibujar un fondo",
        "Dibujo paso a paso, donde el niño crea la imagen por sí mismo en lugar de limitarse " +
          "a colorear una ya hecha",
      ],
      ru: [
        "Больше отдельных участков внутри рисунка и небольшие сюжеты вместо одного предмета",
        "Дополнительные задания помимо раскрашивания: обвести форму, повторить слово или " +
          "придумать и дорисовать фон",
        "Пошаговое рисование, где ребенок сам создает картинку, а не только раскрашивает " +
          "готовую",
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
