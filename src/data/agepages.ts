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
          "Una forma grande que llena la hoja, un contorno muy grueso y crayones gruesos. Qué hace " +
          "la mano a esta edad y cómo transcurre de verdad una sesión.",
        body: [
          "Un niño de un año necesita una hoja en la que un solo dibujo ocupe casi toda la página, " +
            "con un contorno muy grueso y sin zonas separadas que rellenar dentro de la forma. La " +
            "razón está en la mano: el crayón va en el puño y el brazo se mueve desde el hombro, " +
            "así que cada marca sale larga y amplia. Una línea fina desaparece debajo de un crayón " +
            "agarrado así, y el niño no ve ningún resultado de lo que acaba de hacer.",
          "Al año, el niño ni rellena el dibujo ni apunta a él. Hace una marca a propósito y repite " +
            "el movimiento para verlo otra vez, y el objetivo es la hoja misma y no la imagen que " +
            "hay en ella. Las marcas que cruzan el dibujo, se salen del borde y acaban en la mesa " +
            "no son una sesión fallida: así es como se ve esta edad.",
          "Qué mirar en la página: un contorno más o menos tan grueso como el propio crayón, una " +
            "forma que llene la hoja, papel resistente porque a esta edad la presión basta para " +
            "romper uno fino, y un motivo que el niño ya sepa nombrar en voz alta, como una pelota, " +
            "un gato o una manzana. La impresión por una sola cara también importa, porque el " +
            "rotulador traspasa el papel corriente y arruina el dibujo del otro lado.",
          "Una sesión al año dura un minuto o dos, y esa es una duración normal y no corta. Diga en " +
            "voz alta qué hay en la hoja, deje que el niño elija el crayón y no corrija las marcas. " +
            "El momento de parar es cuando el niño se levanta de la mesa, no cuando la página está " +
            "rellena: a esta edad una página rellena normalmente no llega a existir.",
        ],
        doTitle: "Cómo llevar la sesión",
        steps: [
          "Nombre el dibujo en voz alta antes de que el crayón toque el papel, y vuelva a " +
            "nombrarlo cuando el niño levante la vista.",
          "Ofrezca dos o tres crayones para que el niño elija, en vez de darle uno.",
          "Siéntese al lado y dibuje en su propia hoja, nunca en la del niño.",
          "Pare cuando se acabe el interés y deje la misma hoja a mano para volver más tarde.",
        ],
        faq: [
          {
            q: "¿Puede un niño de un año usar un libro para colorear?",
            a:
              "Sí, siempre que la página esté hecha para un agarre de puño: una forma grande, un " +
              "contorno muy grueso y ningún detalle pequeño. Lo que un niño de un año saca de ahí " +
              "es el descubrimiento de que mover la mano deja rastro, más el nombre de lo que hay " +
              "dibujado. Rellenar la forma todavía no forma parte de esto.",
          },
          {
            q: "Mi hijo solo garabatea por toda la hoja. ¿Es normal?",
            a:
              "Es exactamente el aspecto que tiene esta edad. Apuntar exige sujetar el crayón con " +
              "los dedos y mover la muñeca, y al año el brazo entero se balancea desde el hombro. " +
              "Las marcas que cruzan el dibujo y se salen de la hoja son el resultado corriente, " +
              "no una señal de que algo vaya mal.",
          },
          {
            q: "¿Qué crayones sirven para un niño de un año?",
            a:
              "Los gruesos pensados para esta edad, porque una mano pequeña los sujeta con el puño " +
              "y dejan una marca ancha y fácil de ver. Los lápices finos piden un agarre con los " +
              "dedos que llega más tarde, y los rotuladores conviene guardarlos para cuando el " +
              "niño ya apunte al dibujo. A esta edad se colorea con un adulto al lado.",
          },
          {
            q: "¿Cuánto rato debe colorear un niño de un año?",
            a:
              "Un minuto o dos es lo corriente, y cinco minutos es un buen día. La sesión termina " +
              "cuando el niño se levanta, y ese es el final normal y no uno fallido. La misma hoja " +
              "puede volver a salir mañana y muchas veces funciona mejor la segunda vez.",
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
          "Un motivo grande y reconocible, un contorno todavía grueso y dos o tres partes dentro de " +
          "la forma. Qué cambia a los dos años y qué todavía no cambia.",
        body: [
          "A los dos años el niño necesita un motivo grande y reconocible, con contorno grueso y " +
            "dos o tres partes separadas dentro. El crayón ha pasado del puño a los dedos, aunque " +
            "sin firmeza, y las marcas ya incluyen bucles a propósito y trazos de arriba abajo en " +
            "vez de un único barrido largo. Casi todo el color cae en algún punto del dibujo, lo " +
            "que significa que el dibujo por fin se ha convertido en el objetivo.",
          "Lo que no ha cambiado es quedarse dentro de la línea, y exigirlo ahora es la manera más " +
            "rápida de terminar la sesión. Un contorno grueso funciona como referencia visible y no " +
            "como frontera: el niño ve dónde está la forma, apunta a ella y se sale del borde " +
            "continuamente. Dos o tres partes dentro bastan para que use un segundo color a " +
            "propósito, que suele ser lo primero que un padre nota a esta edad.",
          "Un dibujo por página sigue importando más que la variedad. Dos o tres motivos en una " +
            "hoja reparten la atención de un niño que la sostiene unos cinco minutos, y la página " +
            "acaba a medias en tres sitios. Una palabra impresa debajo del dibujo se gana aquí su " +
            "sitio, porque a los dos años el niño nombra lo que hay en la hoja antes de empezar, y " +
            "nombrarlo es la mitad de lo que lo mantiene en la mesa.",
          "Una sesión a los dos años dura unos cinco minutos, a veces diez si el motivo es de los " +
            "preferidos. Pregunte qué hay en la hoja y deje que el niño conteste, ofrezca a elegir " +
            "entre colores en vez de dar un color, y diga lo que ve sin juzgarlo: cuánto azul por " +
            "aquí, una línea que baja hasta abajo por allá. Volver varias veces al mismo dibujo es " +
            "normal y suele significar que estaba bien elegido.",
        ],
        doTitle: "Cómo llevar la sesión",
        steps: [
          "Pregunte qué hay en la hoja y espere la respuesta antes de dar el crayón.",
          "Ofrezca elegir entre dos colores en lugar de escoger usted uno.",
          "Describa lo que ve sin corregirlo y deje en paz las líneas que se salen.",
          "Mantenga una sola hoja delante del niño y guarde las demás.",
        ],
        faq: [
          {
            q: "¿Debe un niño de 2 años quedarse dentro de las líneas?",
            a:
              "No, y no es un objetivo que valga la pena plantearse a esta edad. A los dos años la " +
              "mano todavía está aprendiendo a sujetar el crayón con los dedos y a apuntar a la " +
              "forma. Un contorno grueso le da algo visible a lo que apuntar, y salirse de él es el " +
              "resultado corriente y no un error que haya que corregir.",
          },
          {
            q: "¿Cuánto detalle debe tener un libro para colorear de 2 años?",
            a:
              "Dos o tres partes separadas dentro de una forma grande es lo adecuado, con el " +
              "contorno todavía grueso. Eso basta para que el niño coja un segundo color a " +
              "propósito, y es poco suficiente para que la página parezca terminada aunque solo " +
              "esté coloreada en parte. Los libros llenos de zonas pequeñas son para una edad " +
              "posterior.",
          },
          {
            q: "¿Son buena idea los rotuladores lavables a los dos años?",
            a:
              "Funcionan bien a esta edad, porque el niño ya apunta al dibujo, y los lavables " +
              "salvan la mesa y la ropa. Lo único que conviene comprobar es que la hoja esté " +
              "impresa por una sola cara, porque el rotulador traspasa el papel corriente y " +
              "arruinaría el dibujo siguiente.",
          },
          {
            q: "Mi hijo colorea la misma hoja una y otra vez. ¿Debo cortarlo?",
            a:
              "No hay razón para hacerlo. Repetir un dibujo preferido es la forma en que un niño de " +
              "dos años practica, y el segundo y el tercer intento suelen salir más intencionados " +
              "que el primero. Imprimir otra vez la misma hoja es más fácil que convencerlo de " +
              "pasar a una nueva.",
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
          "Un dibujo grande con tres a seis zonas separadas, un contorno marcado y sitio para " +
          "añadir algo. Dónde encaja todavía un primer libro para colorear y dónde empieza a " +
          "quedarse corto.",
        body: [
          "A los tres años el niño necesita un dibujo grande con tres a seis zonas separadas para " +
            "rellenar, todavía con un contorno marcado. El crayón se sujeta con los dedos y no con " +
            "el puño entero, puede copiar un círculo y una línea recta si se lo piden, y elige un " +
            "color para cada zona a propósito y sabe decir por qué. Casi todo el color cae sobre el " +
            "dibujo, y salirse del contorno sigue siendo frecuente y sigue siendo normal.",
          "Esta es la edad en la que una hoja puede llevar algo más que color. El espacio en el " +
            "borde le da sitio a quien quiera añadir un sol, y una palabra impresa debajo del " +
            "dibujo se convierte en algo que calcar o copiar. Preguntar quién está en la imagen, de " +
            "qué color es y qué está pasando suele obtener una respuesta de verdad a los tres años, " +
            "y esa es la parte de la sesión que más aporta.",
          "La variedad empieza a importar tanto como el tamaño. Un niño de tres años nota cuándo " +
            "dos páginas seguidas se parecen, y un libro de solo animales se agota antes que uno " +
            "que va de animales a comida, vehículos y objetos conocidos. Las sesiones duran diez " +
            "minutos y a veces más, así que una hoja que se acaba demasiado rápido ya es una " +
            "decepción real y no un final normal.",
          "También es la edad en la que un primer libro para colorear empieza a quedarse pequeño, " +
            "normalmente pasados los tres años y medio. La señal es el aburrimiento y no la " +
            "destreza: el niño rellena la página correctamente y la aparta sin interés. Lo que " +
            "viene después es una escena en lugar de un objeto suelto, o un libro de dibujo paso a " +
            "paso donde el niño construye la imagen en vez de rellenar la de otro.",
        ],
        doTitle: "Cómo llevar la sesión",
        steps: [
          "Pregunte quién está en la imagen y qué está pasando, y deje que la respuesta se alargue.",
          "Ponga toda la caja de colores a la vista y no participe en la elección.",
          "Ofrezca el borde de la hoja para lo que el niño quiera añadir.",
          "Cuando una página se rellena bien y se abandona sin interés, suba de nivel.",
        ],
        faq: [
          {
            q: "¿Cuántas zonas debe tener un dibujo para colorear a los 3 años?",
            a:
              "De tres a seis zonas separadas dentro de un dibujo grande funciona bien, con el " +
              "contorno todavía marcado. Es suficiente para que el niño elija un color distinto " +
              "para cada parte, que es lo que quiere hacer a esta edad, y no tantas como para que " +
              "la página dure más que el interés.",
          },
          {
            q: "Mi hijo de 3 años sigue saliéndose de las líneas. ¿Es un problema?",
            a:
              "No. Quedarse dentro del contorno con fiabilidad suele llegar cerca de los cuatro " +
              "años, y hasta entonces la mano está trabajando en apuntar a la forma y dejar encima " +
              "casi todo el color. Señalar los bordes que se salen suele costar más interés del " +
              "que aporta en precisión.",
          },
          {
            q: "¿Cuándo se queda pequeño un primer libro para colorear?",
            a:
              "Cuando el niño rellena una página correctamente y se va de ella sin interés, " +
              "normalmente pasados los tres años y medio. La señal es el aburrimiento y no la " +
              "pulcritud. En ese punto le conviene más una escena con más zonas que rellenar, o un " +
              "libro de dibujo paso a paso, que más hojas del mismo tipo.",
          },
          {
            q: "¿Sirven los lápices de colores a los tres años?",
            a:
              "Normalmente sí, porque el agarre con los dedos que necesitan ya está a esta edad, y " +
              "el lápiz permite un trazo más suave dentro de una zona pequeña. Los crayones y los " +
              "rotuladores lavables siguen funcionando bien, y la mayoría de los niños de tres años " +
              "alternan entre los tres según lo que estén coloreando.",
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
      "Qué le conviene a un niño al año, a los dos y a los tres, con qué esperar en la mesa y qué " +
      "no esperar todavía.",
    otherAges: "Otras edades",
    stageLink: "Cómo se desarrolla la mano en este punto",
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
