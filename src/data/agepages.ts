import type { ContentLang } from "./dictionaries";
import type { StageId } from "./stages";

/* ------------------------------------------------------------------ */
/*  Страницы по возрастам                                              */
/* ------------------------------------------------------------------ */

/* Родитель ищет словами "раскраска для 2 лет". Не "раскраска для
   ребенка, который целится в рисунок", а именно так, с цифрой.
   Эти три страницы отвечают на такой запрос.

   Со страницами этапов они не спорят, потому что отвечают на другой
   вопрос. Страница этапа объясняет, что происходит с рукой ребенка
   и почему. Возрастная страница отвечает родителю, который стоит
   перед полкой: что брать, что будет происходить за столом и что
   считать нормальным. Одна про развитие, другая про сегодняшний
   вечер, и каждая ссылается на другую.

   Возраст здесь всегда разброс, а не рубеж. Ребенок в два года может
   вести себя как на странице про год, и это норма, о чем на каждой
   странице сказано прямо. */

export type AgePageCopy = {
  title: string;
  lead: string;
  body: string[];
  doTitle: string;
  steps: string[];
  faq: { q: string; a: string }[];
};

export type AgePage = {
  id: "one" | "two" | "three";
  /* Этап, к которому этот возраст обычно относится. Из возрастной
     страницы можно уйти на страницу этапа и прочитать подробно. */
  stage: StageId;
  slug: Record<ContentLang, string>;
  copy: Record<ContentLang, AgePageCopy>;
};

export const agePages: AgePage[] = [
  /* ---------------------------------------------------------------- */
  {
    id: "one",
    stage: "scribble",
    slug: {
      en: "coloring-pages-for-1-year-olds",
      es: "dibujos-para-colorear-para-ninos-de-1-ano",
      ru: "raskraski-dlya-rebenka-1-god",
    },
    copy: {
      en: {
        title: "Coloring pages for a 1 year old: what suits and what to expect",
        lead:
          "One large shape filling the sheet, a very thick outline and thick crayons. What the " +
          "hand does at this age, and how a session actually goes.",
        body: [
          "A one year old needs a page where a single drawing takes up almost the whole sheet, the " +
            "outline is very thick, and there is nothing separate to fill inside the shape. The " +
            "reason is in the hand: the crayon sits in a fist and the arm moves from the shoulder, " +
            "so every mark comes out long and sweeping. A thin line disappears under a crayon held " +
            "that way, and the child sees no result from what they just did.",
          "At one, a child is not filling the drawing and not aiming at it. They make a mark on " +
            "purpose and repeat the movement to watch it happen again, and the target is the sheet " +
            "itself rather than the picture on it. Marks that cross the drawing, run off the edge " +
            "and land on the table are not a failed session, they are what this age looks like.",
          "What to look for on the page: an outline about as thick as the crayon itself, one shape " +
            "filling the sheet, sturdy paper because the pressure at this age is heavy enough to " +
            "tear a thin one, and a subject the child can already name out loud, like a ball, a cat " +
            "or an apple. Single sided printing matters too, since a marker goes straight through " +
            "ordinary paper and ruins the drawing on the other side.",
          "A session at one year old lasts a minute or two, and that is a normal length rather than " +
            "a short one. Say out loud what is on the page, let the child pick the crayon " +
            "themselves, and leave the marks alone. The right moment to stop is when the child gets " +
            "up from the table, not when the page is filled in: at this age a filled in page " +
            "usually does not happen at all.",
        ],
        doTitle: "How to run the session",
        steps: [
          "Name the drawing out loud before the crayon touches the paper, and name it again when " +
            "the child looks up.",
          "Offer two or three crayons and let the child choose, rather than handing over one.",
          "Sit beside the child and mark on your own sheet, not on theirs.",
          "Stop when interest goes, and leave the same page out to come back to later.",
        ],
        faq: [
          {
            q: "Can a one year old use a coloring book at all?",
            a:
              "Yes, as long as the page is built for a fist grip: one large shape, a very thick " +
              "outline and no small detail. What a one year old gets from it is the discovery that " +
              "moving the hand leaves a trace, plus the name of whatever is drawn there. Filling " +
              "the shape is not part of it yet.",
          },
          {
            q: "My child just scribbles across the whole page. Is that normal?",
            a:
              "It is exactly what this age looks like. Aiming needs the crayon held in the fingers " +
              "and the movement coming from the wrist, and at one year old the whole arm swings " +
              "from the shoulder instead. Marks that cross the drawing and run off the sheet are " +
              "the ordinary result, not a sign that anything went wrong.",
          },
          {
            q: "Which crayons work for a one year old?",
            a:
              "Thick ones made for this age, because a small hand holds them in a fist and they " +
              "leave a wide mark that is easy to see. Thin pencils need a finger grip that comes " +
              "later, and markers are best kept for when the child aims at the drawing. Coloring " +
              "at this age happens with an adult sitting alongside.",
          },
          {
            q: "How long should a one year old sit and color?",
            a:
              "A minute or two is ordinary, and five minutes is a good day. The session ends when " +
              "the child stands up, and that is the normal ending rather than a failed one. The " +
              "same page can come out again tomorrow and often works better the second time.",
          },
        ],
      },

      es: {
        title: "Dibujos para colorear para un niño de 1 año: qué le conviene y qué esperar",
        lead:
          "Una forma grande que ocupe casi toda la hoja, un contorno muy grueso y crayones " +
            "gruesos. Qué suele poder hacer un niño a esta edad y cómo puede ser su primer " +
            "contacto con un libro para colorear.",
        body: [
          "Para un niño de un año, lo más adecuado suele ser una página con un solo dibujo " +
            "que ocupe casi toda la hoja, un contorno muy grueso y sin pequeños detalles " +
            "separados. A esta edad, el niño suele sujetar el crayón con toda la mano y mover " +
            "el brazo desde el hombro, por lo que los trazos son largos y amplios. Un contorno " +
            "grueso y bien visible resulta mucho más fácil de distinguir mientras dibuja.",
          "Alrededor del año, el niño normalmente todavía no intenta rellenar el dibujo con " +
            "precisión. Lo importante es el descubrimiento de que al mover la mano aparece un " +
            "trazo en el papel y que puede repetirlo una y otra vez. Por eso, hacer líneas " +
            "sobre el dibujo y fuera de sus límites es completamente natural en esta etapa.",
          "Al elegir una página, conviene fijarse en varios aspectos: un contorno muy " +
            "visible, una sola forma grande que ocupe casi toda la hoja, pocos detalles " +
            "pequeños y un papel suficientemente resistente. Es mejor elegir imágenes " +
            "familiares que puedan nombrarse en voz alta, como una pelota, un gato o una " +
            "manzana. La impresión por una sola cara también resulta práctica, sobre todo si " +
            "el niño utiliza rotuladores.",
          "Alrededor del año, el interés por una página puede durar solo uno o dos minutos, " +
            "y es completamente normal. Nombre lo que aparece en el dibujo, deje que el niño " +
            "elija un crayón y permita que dibuje a su manera. No es necesario esperar a que " +
            "coloree toda la imagen: la actividad puede terminar en cuanto pierda el interés.",
        ],
        doTitle: "Cómo acompañar la actividad",
        steps: [
          "Nombre el dibujo antes de empezar a colorear y vuelva a repetir su nombre durante " +
            "la actividad.",
          "Ofrezca dos o tres crayones para que el niño elija, en lugar de escoger el color " +
            "por él.",
          "Siéntese a su lado. Si quiere mostrarle un ejemplo, dibuje en su propia hoja, no " +
            "en la del niño.",
          "Termine la actividad cuando el niño pierda el interés. Siempre puede volver al " +
            "mismo dibujo más tarde.",
        ],
        faq: [
          {
            q: "¿Puede un niño de un año usar un libro para colorear?",
            a:
              "Sí, siempre que el libro esté pensado para los más pequeños: una sola forma " +
                "grande, un contorno muy grueso y pocos detalles. Alrededor del año, el niño " +
                "está descubriendo principalmente cómo el crayón deja un trazo en el papel y " +
                "empieza a relacionar la imagen con su nombre. Todavía no es necesario que " +
                "coloree la forma con precisión.",
          },
          {
            q: "Mi hijo solo garabatea por toda la hoja. ¿Es normal?",
            a:
              "Sí. Alrededor del año, el niño normalmente todavía no sabe dirigir el crayón " +
                "con precisión hacia el dibujo. Suele sujetarlo con toda la mano y hacer " +
                "movimientos amplios con el brazo. Por eso, los trazos sobre el dibujo y fuera " +
                "de sus límites son completamente normales a esta edad.",
          },
          {
            q: "¿Qué crayones sirven para un niño de un año?",
            a:
              "Conviene elegir crayones gruesos pensados para niños pequeños. Son fáciles de " +
                "sujetar con toda la mano y dejan un trazo ancho y visible. Los lápices de " +
                "colores finos suelen resultar más difíciles porque requieren un agarre más " +
                "preciso con los dedos. A esta edad, es mejor colorear con un adulto cerca.",
          },
          {
            q: "¿Cuánto rato debe colorear un niño de un año?",
            a:
              "Uno o dos minutos es una duración completamente normal para un niño de un " +
                "año. A veces el interés dura más y otras veces desaparece casi de inmediato. " +
                "Termine la actividad cuando deje de interesarle y, si quiere, vuelva al mismo " +
                "dibujo más tarde.",
          },
        ],
      },

      ru: {
        title: "Раскраска для ребенка в 1 год: что подходит и чего ждать",
        lead:
          "Одна крупная форма почти во весь лист, очень толстый контур и толстые мелки. Что " +
            "обычно умеет ребенок в этом возрасте и как может проходить первое знакомство с " +
            "раскраской.",
        body: [
          "Годовалому ребенку лучше подходит страница, где один рисунок занимает почти весь " +
            "лист, контур очень толстый, а внутри нет мелких отдельных деталей. В этом " +
            "возрасте ребенок часто держит мелок всей ладонью и двигает рукой от плеча, " +
            "поэтому линии получаются длинными и размашистыми. Хорошо заметный толстый контур " +
            "при таких движениях увидеть гораздо легче.",
          "В год ребенок обычно еще не старается аккуратно закрасить рисунок. Для него " +
            "важнее само открытие: движение руки оставляет след на бумаге, и это можно " +
            "повторять снова и снова. Поэтому линии поперек рисунка и за его границами на этом " +
            "этапе совершенно естественны.",
          "При выборе страницы обратите внимание на несколько вещей: очень заметный контур, " +
            "одна крупная форма почти во весь лист, минимум мелких деталей и достаточно " +
            "плотная бумага. Лучше выбирать знакомые ребенку изображения, которые можно " +
            "назвать вслух: мяч, кошку, яблоко. Печать только с одной стороны удобнее, " +
            "особенно если ребенок пользуется фломастерами.",
          "В год интерес к одной странице может длиться всего минуту-две, и это совершенно " +
            "нормально. Назовите то, что нарисовано, предложите ребенку выбрать мелок и " +
            "позвольте ему рисовать так, как получается. Не нужно ждать, пока вся картинка " +
            "будет закрашена: занятие можно закончить, как только ребенок потерял интерес.",
        ],
        doTitle: "Как проходит занятие",
        steps: [
          "Назовите рисунок до начала раскрашивания и повторите название еще раз во время " +
            "занятия.",
          "Предложите ребенку два-три мелка на выбор, а не выбирайте цвет за него.",
          "Сядьте рядом. Если хотите показать пример, рисуйте на своем листе, а не на листе " +
            "ребенка.",
          "Закончите занятие, когда ребенок потеряет интерес. К тому же рисунку всегда можно " +
            "вернуться позже.",
        ],
        faq: [
          {
            q: "Можно ли давать раскраску ребенку в 1 год?",
            a:
              "Можно, если раскраска рассчитана на самых маленьких: одна крупная форма, " +
                "очень толстый контур и минимум мелких деталей. В год ребенок прежде всего " +
                "знакомится с тем, как мелок оставляет след на бумаге, и постепенно связывает " +
                "изображение с его названием. Аккуратно закрашивать форму от него пока не " +
                "требуется.",
          },
          {
            q: "Ребенок просто черкает по всему листу. Это нормально?",
            a:
              "Да. В год ребенок обычно еще не умеет точно направлять мелок по рисунку. Он " +
                "часто держит его всей ладонью и рисует широкими движениями руки. Поэтому " +
                "линии поперек рисунка и за его границами в этом возрасте совершенно " +
                "естественны.",
          },
          {
            q: "Какие мелки подходят в 1 год?",
            a:
              "Лучше выбирать толстые мелки, предназначенные для маленьких детей. Их удобно " +
                "держать всей ладонью, а широкий след хорошо заметен на бумаге. Тонкими " +
                "цветными карандашами пользоваться сложнее, потому что они требуют более " +
                "точного захвата пальцами. Маленькому ребенку лучше раскрашивать рядом со " +
                "взрослым.",
          },
          {
            q: "Сколько времени годовалый ребенок раскрашивает?",
            a:
              "Минута-две - совершенно нормальное время для годовалого ребенка. Иногда " +
                "интерес сохраняется дольше, иногда исчезает почти сразу. Закончите занятие, " +
                "когда ребенку станет неинтересно, и при желании вернитесь к тому же рисунку " +
                "позже.",
          },
        ],
      },
    },
  },

  /* ---------------------------------------------------------------- */
  {
    id: "two",
    stage: "control",
    slug: {
      en: "coloring-pages-for-2-year-olds",
      es: "dibujos-para-colorear-para-ninos-de-2-anos",
      ru: "raskraski-dlya-rebenka-2-goda",
    },
    copy: {
      en: {
        title: "Coloring pages for a 2 year old: what suits and what to expect",
        lead:
          "A large recognizable subject, an outline that is still thick, and two or three parts " +
          "inside the shape. What changes at two, and what does not change yet.",
        body: [
          "At two a child needs a large recognizable subject with a thick outline and two or three " +
            "separate parts inside it. The crayon has moved from the fist to the fingers, though " +
            "not steadily, and the marks now include deliberate loops and up and down strokes " +
            "rather than one long sweep. Most of the color lands somewhere on the drawing, which " +
            "means the drawing has finally become the target.",
          "What has not changed is staying inside the line, and asking for it now is the fastest " +
            "way to end the session. A thick outline works as a visible landmark rather than a " +
            "border: the child can see where the shape is, aims at it, and goes over the edge " +
            "constantly. Two or three parts inside the shape are enough for the child to use a " +
            "second color on purpose, which is usually the first thing a parent notices at this age.",
          "One drawing per page still matters more than variety. Two or three subjects on one sheet " +
            "split the attention of a child who holds it for about five minutes, and the page ends " +
            "up half done in three places. A word printed under the drawing earns its space here, " +
            "because at two the child names what is on the page before starting, and naming it is " +
            "half of what keeps them at the table.",
          "A session at two runs about five minutes, sometimes ten if the subject is a favorite. " +
            "Ask what is on the page and let the child answer, offer a choice of color rather than " +
            "a color, and say what you see instead of judging it: a lot of blue here, a line all " +
            "the way down there. Coming back to the same drawing several times is normal and often " +
            "means it was chosen well.",
        ],
        doTitle: "How to run the session",
        steps: [
          "Ask what is on the page and wait for the answer before handing over a crayon.",
          "Offer a choice between two colors rather than picking one.",
          "Describe what you see without correcting it, and leave the crossed lines alone.",
          "Keep one page in front of the child at a time, and put the rest away.",
        ],
        faq: [
          {
            q: "Should a 2 year old stay inside the lines?",
            a:
              "No, and it is not a goal worth setting at this age. At two the hand is still " +
              "learning to hold the crayon with the fingers and to aim at the shape at all. A thick " +
              "outline gives the child something visible to aim at, and crossing it is the ordinary " +
              "result rather than a mistake to correct.",
          },
          {
            q: "How much detail should a coloring book for a 2 year old have?",
            a:
              "Two or three separate parts inside one large shape is about right, with the outline " +
              "still thick. That is enough for a child to reach for a second color on purpose, and " +
              "few enough that the page still looks finished when only part of it is colored. " +
              "Books crowded with small areas belong to a later age.",
          },
          {
            q: "Are washable markers a good idea at two?",
            a:
              "They work well at this age, since the child now aims at the drawing, and washable " +
              "ones save the table and the clothes. The one thing to check is that the page is " +
              "printed on one side only, because a marker goes through ordinary paper and would " +
              "otherwise ruin the next drawing.",
          },
          {
            q: "My child colors the same page over and over. Should I stop that?",
            a:
              "There is no reason to. Repeating a favorite drawing is how a two year old practices, " +
              "and the second and third attempt usually look more deliberate than the first. " +
              "Printing the same page again is easier than persuading a child to move on to a new one.",
          },
        ],
      },

      es: {
        title: "Dibujos para colorear para un niño de 2 años: qué le conviene y qué esperar",
        lead:
          "Un dibujo grande y reconocible, un contorno todavía grueso y dos o tres partes " +
            "dentro de la forma. Qué cambia aproximadamente a los dos años y qué todavía sigue " +
            "igual.",
        body: [
          "Alrededor de los dos años, ya puede ser adecuado un dibujo grande y reconocible, " +
            "con un contorno grueso y dos o tres partes separadas. Muchos niños empiezan a " +
            "sujetar el crayón con los dedos con mayor seguridad y sus movimientos se vuelven " +
            "más dirigidos: aparecen trazos redondeados, bucles y líneas de arriba abajo. Cada " +
            "vez intentan con más frecuencia colorear el propio dibujo.",
          "Sin embargo, mantenerse dentro del contorno todavía resulta difícil y no conviene " +
            "exigir precisión. El contorno grueso funciona como una referencia visual, no como " +
            "un límite que el niño deba respetar perfectamente. Dos o tres partes separadas " +
            "dentro del dibujo son suficientes para que pueda probar distintos colores sin que " +
            "la página tenga demasiados detalles.",
          "Un solo dibujo grande por página sigue siendo más adecuado que varios dibujos " +
            "pequeños. Los elementos adicionales pueden distraer, especialmente si el niño " +
            "solo colorea durante unos minutos. La palabra debajo del dibujo también empieza a " +
            "ser útil: el niño ya reconoce muchas imágenes y puede nombrarlas junto con el " +
            "adulto.",
          "A los dos años, un niño puede colorear durante unos cinco minutos y, a veces, más " +
            "si el dibujo le gusta especialmente. Pregúntele qué aparece en la página, deje " +
            "que elija un color y hable sobre lo que ven sin juzgar el resultado. Volver " +
            "varias veces a un dibujo favorito es completamente normal.",
        ],
        doTitle: "Cómo acompañar la actividad",
        steps: [
          "Pregunte qué aparece en la página y dele tiempo para responder.",
          "Ofrézcale elegir entre dos colores en lugar de escoger el color por él.",
          "Hable sobre lo que ve sin corregir al niño ni llamar la atención sobre los trazos " +
            "que salen del contorno.",
          "Deje una sola hoja delante del niño y guarde las demás por el momento.",
        ],
        faq: [
          {
            q: "¿Debe un niño de 2 años quedarse dentro de las líneas?",
            a:
              "No, no conviene plantearlo como objetivo a esta edad. A los dos años, el niño " +
                "todavía está aprendiendo a sujetar el crayón con mayor seguridad y a dirigir " +
                "los movimientos de la mano. Un contorno grueso le ayuda a ver los límites del " +
                "dibujo, pero salirse de ellos es completamente normal.",
          },
          {
            q: "¿Cuánto detalle debe tener un libro para colorear de 2 años?",
            a:
              "Dos o tres partes separadas dentro de un dibujo grande suelen ser " +
                "suficientes, y el contorno debe seguir siendo grueso y bien visible. Así, el " +
                "niño puede probar a colorear distintas partes con diferentes colores sin que " +
                "la página resulte demasiado complicada.",
          },
          {
            q: "¿Son buena idea los rotuladores lavables a los dos años?",
            a:
              "Sí, se pueden utilizar rotuladores lavables si al niño le resulta cómodo " +
                "dibujar con ellos. Dejan un trazo intenso y visible y suelen limpiarse con " +
                "facilidad de las manos y de muchas superficies. Es preferible elegir páginas " +
                "impresas por una sola cara, porque la tinta puede traspasar el papel " +
                "corriente.",
          },
          {
            q: "Mi hijo colorea la misma hoja una y otra vez. ¿Debo cortarlo?",
            a:
              "No. Repetir un dibujo favorito es completamente normal: el niño se " +
                "familiariza mejor con los movimientos de la mano, los colores y la propia " +
                "imagen. Si quiere volver a colorear el mismo dibujo, simplemente puede " +
                "imprimirlo otra vez.",
          },
        ],
      },

      ru: {
        title: "Раскраска для ребенка в 2 года: что подходит и чего ждать",
        lead:
          "Крупный узнаваемый рисунок, по-прежнему толстый контур и две-три части внутри " +
            "формы. Что меняется примерно к двум годам, а что пока остается прежним.",
        body: [
          "Примерно в два года ребенку уже может подойти крупный узнаваемый рисунок с " +
            "толстым контуром и двумя-тремя отдельными частями внутри. Многие дети начинают " +
            "держать мелок пальцами увереннее, а движения становятся более направленными: " +
            "появляются округлые линии, петли и штрихи сверху вниз. Ребенок все чаще старается " +
            "рисовать именно по картинке.",
          "При этом оставаться внутри контура ребенку пока трудно, и требовать от него " +
            "аккуратности не стоит. Толстый контур служит хорошо заметным ориентиром, а не " +
            "строгой границей. Двух-трех отдельных частей внутри рисунка достаточно, чтобы " +
            "ребенок мог попробовать разные цвета, не перегружая страницу деталями.",
          "Один крупный рисунок на странице по-прежнему удобнее нескольких мелких. Лишние " +
            "предметы могут отвлекать внимание, особенно если ребенок занимается " +
            "раскрашиванием всего несколько минут. Слово под рисунком тоже становится " +
            "полезным: ребенок уже узнает многие изображения и может называть их вместе со " +
            "взрослым.",
          "В два года ребенок может заниматься раскраской около пяти минут, а иногда и " +
            "дольше, если рисунок ему особенно нравится. Спросите, кто или что изображено на " +
            "странице, предложите выбрать цвет и говорите о том, что видите, не оценивая " +
            "результат. Возвращаться к любимому рисунку несколько раз совершенно нормально.",
        ],
        doTitle: "Как проходит занятие",
        steps: [
          "Спросите, кто или что нарисовано на странице, и дайте ребенку время ответить.",
          "Предложите выбрать один из двух цветов, а не выбирайте цвет за ребенка.",
          "Говорите о том, что видите, не исправляя ребенка и не обращая внимания на линии " +
            "за контуром.",
          "Оставьте перед ребенком один лист, а остальные пока уберите.",
        ],
        faq: [
          {
            q: "Должен ли ребенок в 2 года раскрашивать внутри контура?",
            a:
              "Нет, ставить такую цель в этом возрасте не стоит. В два года ребенок еще " +
                "учится увереннее держать мелок и направлять движения руки. Толстый контур " +
                "помогает видеть границы рисунка, но выходить за них в этом возрасте " +
                "совершенно нормально.",
          },
          {
            q: "Сколько деталей должно быть в раскраске для двухлетнего ребенка?",
            a:
              "Достаточно двух-трех отдельных частей внутри одного крупного рисунка, при " +
                "этом контур должен оставаться толстым и хорошо заметным. Ребенок сможет " +
                "попробовать раскрасить разные части разными цветами, но страница не будет " +
                "перегружена мелкими деталями.",
          },
          {
            q: "Подходят ли фломастеры в 2 года?",
            a:
              "Смываемые фломастеры можно использовать, если ребенку удобно ими рисовать. " +
                "Они дают яркий заметный след и легко смываются с рук и многих поверхностей. " +
                "Лучше выбирать страницы с печатью только с одной стороны, потому что чернила " +
                "могут пройти сквозь обычную бумагу.",
          },
          {
            q: "Ребенок раскрашивает одну и ту же страницу много раз. Стоит ли это прекращать?",
            a:
              "Нет. Повторять любимый рисунок совершенно нормально: ребенок лучше знакомится " +
                "с движениями руки, цветами и самим изображением. Если ему хочется снова " +
                "раскрасить ту же картинку, можно просто распечатать ее еще раз.",
          },
        ],
      },
    },
  },

  /* ---------------------------------------------------------------- */
  {
    id: "three",
    stage: "aim",
    slug: {
      en: "coloring-pages-for-3-year-olds",
      es: "dibujos-para-colorear-para-ninos-de-3-anos",
      ru: "raskraski-dlya-rebenka-3-goda",
    },
    copy: {
      en: {
        title: "Coloring pages for a 3 year old: what suits and what to expect",
        lead:
          "A large drawing with three to six separate areas, a bold outline and room to add " +
          "something. Where a first coloring book still fits, and where it starts running out.",
        body: [
          "At three a child needs a large drawing with three to six separate areas to fill, still " +
            "with a bold outline. The crayon is held with the fingers rather than the whole fist, a " +
            "circle and a straight line can be copied on request, and the child picks a color for " +
            "each area on purpose and can say why. Most of the color lands on the drawing, and " +
            "crossing the outline is still frequent and still normal.",
          "This is the age when a page can carry more than color. Room at the edge of the sheet " +
            "gives a child who wants to add a sun somewhere to put it, and a word printed under the " +
            "drawing turns into something to trace or copy. Asking who is in the picture, what " +
            "color they are and what is happening on the page usually gets a real answer at three, " +
            "which is the part of the session that does the most.",
          "Variety starts to matter as much as size. A three year old notices when two pages in a " +
            "row are alike, and a book of nothing but animals runs out of interest faster than one " +
            "that moves between animals, food, vehicles and familiar objects. Sessions run ten " +
            "minutes and sometimes longer, so a page that ends too quickly is now a real " +
            "disappointment rather than a normal ending.",
          "It is also the age where a first coloring book begins to be outgrown, usually somewhere " +
            "past three and a half. The sign is boredom rather than skill: the child fills a page " +
            "correctly and puts it aside without interest. What follows is a scene rather than a " +
            "single object, or a step by step drawing book where the child builds the picture " +
            "instead of filling in someone else's.",
        ],
        doTitle: "How to run the session",
        steps: [
          "Ask who is in the picture and what is happening, and let the answer run.",
          "Put out the full set of colors and stay out of the choosing.",
          "Offer the edge of the page for anything the child wants to add.",
          "When a page gets filled in correctly and abandoned without interest, move up a level.",
        ],
        faq: [
          {
            q: "How many areas should a coloring page have for a 3 year old?",
            a:
              "Three to six separate areas inside one large drawing works well, with the outline " +
              "still bold. That is enough for the child to choose a different color for each part, " +
              "which is what a three year old wants to do, and not so many that the page takes " +
              "longer than the interest lasts.",
          },
          {
            q: "My 3 year old still goes outside the lines. Is that a problem?",
            a:
              "No. Staying inside the outline reliably usually arrives closer to four, and until " +
              "then aiming at the shape and getting most of the color onto it is what the hand is " +
              "working on. Pointing out the crossed edges tends to cost more interest than it gains " +
              "accuracy.",
          },
          {
            q: "When is a first coloring book outgrown?",
            a:
              "When the child fills a page correctly and walks away from it without interest, " +
              "usually somewhere past three and a half. The signal is boredom rather than neatness. " +
              "At that point a scene with more areas to fill, or a step by step drawing book, suits " +
              "better than more pages of the same kind.",
          },
          {
            q: "Are colored pencils suitable at three?",
            a:
              "Usually yes, since the finger grip needed for them is in place at this age, and " +
              "pencils allow a lighter touch inside a small area. Crayons and washable markers " +
              "still work well, and most three year olds move between all three depending on what " +
              "they are coloring.",
          },
        ],
      },

      es: {
        title: "Dibujos para colorear para un niño de 3 años: qué le conviene y qué esperar",
        lead:
          "Un dibujo grande con entre tres y seis zonas separadas, un contorno bien visible " +
            "y algo de espacio libre para que el niño pueda añadir sus propios detalles. " +
            "Cuándo sigue siendo adecuado un primer libro para colorear y cuándo puede ser el " +
            "momento de pasar a actividades más complejas.",
        body: [
          "Alrededor de los tres años, ya puede ser adecuado un dibujo grande con entre tres " +
            "y seis zonas separadas y un contorno todavía bien visible. Muchos niños a esta " +
            "edad sujetan el crayón con los dedos, pueden copiar un círculo y una línea recta " +
            "y empiezan a elegir distintos colores de forma intencionada para diferentes " +
            "partes del dibujo. Aun así, salirse del contorno sigue siendo completamente " +
            "normal.",
          "A esta edad, colorear puede combinarse con otras actividades sencillas. El " +
            "espacio libre alrededor del dibujo permite añadir algún detalle, y la palabra " +
            "debajo de la imagen se puede repasar o intentar copiar. También puede preguntarle " +
            "al niño quién aparece, de qué color es o qué está ocurriendo en el dibujo, " +
            "convirtiendo la actividad en una pequeña conversación.",
          "La variedad de dibujos empieza a ser cada vez más importante. Resulta más " +
            "interesante cuando los animales se alternan con comida, vehículos, personajes de " +
            "cuentos y objetos familiares. A los tres años, el interés por una misma página " +
            "puede durar más tiempo, por lo que un dibujo demasiado sencillo puede empezar a " +
            "aburrir rápidamente.",
          "Alrededor de esta edad, el primer libro para colorear puede empezar poco a poco a " +
            "resultar demasiado sencillo, especialmente cerca de los cuatro años. La principal " +
            "señal es que el niño termina la página con facilidad y pierde rápidamente el " +
            "interés. En ese caso, puede pasar a dibujos más detallados, pequeñas escenas o " +
            "actividades de dibujo paso a paso.",
        ],
        doTitle: "Cómo acompañar la actividad",
        steps: [
          "Pregunte quién aparece en el dibujo y qué está ocurriendo, y dele tiempo para " +
            "responder con calma.",
          "Ponga a su alcance todos los colores y deje que el niño elija por sí mismo.",
          "Deje algo de espacio libre alrededor del dibujo por si el niño quiere añadir " +
            "algún detalle.",
          "Si termina la página con facilidad y pierde rápidamente el interés, puede probar " +
            "una actividad más compleja.",
        ],
        faq: [
          {
            q: "¿Cuántas zonas debe tener un dibujo para colorear a los 3 años?",
            a:
              "Entre tres y seis zonas separadas dentro de un dibujo grande suele ser " +
                "suficiente, con un contorno todavía bien visible. Así, el niño puede utilizar " +
                "varios colores sin que la página tenga demasiados detalles.",
          },
          {
            q: "Mi hijo de 3 años sigue saliéndose de las líneas. ¿Es un problema?",
            a:
              "No. A los tres años, muchos niños todavía se salen del contorno con " +
                "frecuencia. La precisión de los movimientos se desarrolla gradualmente, por " +
                "lo que el interés por colorear es más importante que conseguir bordes " +
                "perfectos.",
          },
          {
            q: "¿Cuándo se queda pequeño un primer libro para colorear?",
            a:
              "Cuando el niño termina con facilidad los dibujos grandes y sencillos y pierde " +
                "rápidamente el interés. A menudo ocurre cerca de los cuatro años, pero no " +
                "existe una edad exacta. En ese momento, puede ser mejor probar libros con más " +
                "detalles, pequeñas escenas o actividades de dibujo paso a paso.",
          },
          {
            q: "¿Sirven los lápices de colores a los tres años?",
            a:
              "Por lo general, sí. Alrededor de los tres años, a muchos niños ya les resulta " +
                "más cómodo sujetar un lápiz con los dedos, por lo que se pueden introducir " +
                "poco a poco los lápices de colores. Los crayones gruesos y los rotuladores " +
                "lavables también siguen siendo adecuados: la elección depende de lo que le " +
                "resulte más cómodo e interesante al niño.",
          },
        ],
      },

      ru: {
        title: "Раскраска для ребенка в 3 года: что подходит и чего ждать",
        lead:
          "Крупный рисунок с тремя-шестью отдельными участками, заметный контур и немного " +
            "свободного места, чтобы ребенок мог что-нибудь дорисовать. Когда первая раскраска " +
            "еще подходит, а когда уже пора переходить к более сложным заданиям.",
        body: [
          "Примерно в три года ребенку уже может подойти крупный рисунок с тремя-шестью " +
            "отдельными участками и по-прежнему хорошо заметным контуром. Многие дети в этом " +
            "возрасте держат мелок пальцами, могут повторить круг и прямую линию и начинают " +
            "осознанно выбирать разные цвета для отдельных частей рисунка. При этом выходить " +
            "за контур все еще совершенно нормально.",
          "В этом возрасте раскрашивание можно дополнить другими простыми заданиями. " +
            "Свободное место вокруг рисунка позволяет что-нибудь дорисовать, а слово под " +
            "картинкой можно обвести или попробовать повторить. Можно спрашивать ребенка, кто " +
            "изображен, какого он цвета и что происходит на картинке, превращая раскрашивание " +
            "в небольшую беседу.",
          "Разнообразие рисунков становится все важнее. Ребенку интереснее, когда животные " +
            "чередуются с едой, транспортом, сказочными героями и знакомыми предметами. В три " +
            "года интерес к одной странице может сохраняться дольше, поэтому слишком простой " +
            "рисунок иногда уже быстро надоедает.",
          "Примерно в этом возрасте первая раскраска постепенно может становиться слишком " +
            "простой, особенно ближе к четырем годам. Главный признак - ребенок легко " +
            "справляется со страницей и быстро теряет к ней интерес. Тогда можно переходить к " +
            "более детальным рисункам, небольшим сюжетам или пошаговому рисованию.",
        ],
        doTitle: "Как проходит занятие",
        steps: [
          "Спросите, кто или что изображено на картинке и что там происходит, и дайте " +
            "ребенку спокойно ответить.",
          "Предложите весь набор цветов и позвольте ребенку выбирать самостоятельно.",
          "Оставьте вокруг рисунка немного свободного места, если ребенок захочет что-нибудь " +
            "дорисовать.",
          "Если ребенок легко справляется со страницей и быстро теряет интерес, можно " +
            "попробовать более сложную раскраску.",
        ],
        faq: [
          {
            q: "Сколько участков должно быть в раскраске для ребенка 3 лет?",
            a:
              "Обычно достаточно от трех до шести отдельных участков внутри одного крупного " +
                "рисунка, при этом контур должен оставаться хорошо заметным. Так ребенок " +
                "сможет использовать несколько цветов, а страница не будет перегружена " +
                "деталями.",
          },
          {
            q: "Ребенку 3 года, и он все еще выходит за контур. Это плохо?",
            a:
              "Нет. В три года многие дети все еще часто выходят за контур. Точность " +
                "движений развивается постепенно, поэтому гораздо важнее интерес к " +
                "раскрашиванию, чем аккуратные края.",
          },
          {
            q: "Когда первая раскраска становится мала?",
            a:
              "Когда ребенок легко справляется с простыми крупными рисунками и быстро теряет " +
                "к ним интерес. Часто это происходит ближе к четырем годам, но строгой " +
                "возрастной границы нет. Тогда лучше попробовать раскраски с большим " +
                "количеством деталей, небольшими сюжетами или пошаговым рисованием.",
          },
          {
            q: "Подходят ли цветные карандаши в три года?",
            a:
              "Обычно да. К трем годам многим детям уже удобнее держать карандаш пальцами, " +
                "поэтому можно постепенно пробовать цветные карандаши. Толстые мелки и " +
                "смываемые фломастеры тоже по-прежнему подходят - выбор зависит от того, чем " +
                "ребенку удобнее и интереснее рисовать.",
          },
        ],
      },
    },
  },
];

export const agePageBySlug = (lang: ContentLang, slug: string) =>
  agePages.find((p) => p.slug[lang] === slug);

/* Надписи блоков возрастных страниц. */
export type AgePageLabels = {
  listTitle: string;
  listLead: string;
  otherAges: string;
  stageLink: string;
  toolLink: string;
};

export const agePageLabels: Record<ContentLang, AgePageLabels> = {
  en: {
    listTitle: "Age by age",
    listLead:
      "What suits a child at one, at two and at three, with what to expect at the table and what " +
      "not to expect yet.",
    otherAges: "Other ages",
    stageLink: "How the hand develops at this point",
    toolLink: "Answer four questions about your child",
  },
  es: {
    listTitle: "Edad por edad",
    listLead:
      "Qué suele convenir a un niño alrededor del año, de los dos y de los tres años, cómo " +
        "puede desarrollarse la actividad y qué no conviene esperar todavía.",
    otherAges: "Otras edades",
    stageLink: "Cómo se desarrollan las habilidades de la mano en esta etapa",
    toolLink: "Responda cuatro preguntas sobre su hijo",
  },
  ru: {
    listTitle: "Разбор по возрастам",
    listLead:
      "Что подходит ребенку примерно в год, два и три года, как может проходить занятие и " +
        "чего пока не стоит от него ожидать.",
    otherAges: "Другие возрасты",
    stageLink: "Что обычно умеет ребенок на этом этапе",
    toolLink: "Ответьте на четыре вопроса о ребенке",
  },
};
