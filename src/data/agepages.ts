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
          "Одна крупная форма во весь лист, очень толстый контур и толстые мелки. Что делает рука " +
          "в этом возрасте и как на самом деле проходит занятие.",
        body: [
          "Годовалому ребенку нужна страница, на которой один рисунок занимает почти весь лист, " +
            "контур очень толстый, а внутри формы нет отдельных участков. Причина в руке: мелок " +
            "лежит в кулаке, рука движется от плеча, и каждая черта выходит длинной и размашистой. " +
            "Тонкая линия под таким мелком пропадает, и ребенок не видит результата того, что " +
            "только что сделал.",
          "В год ребенок не закрашивает рисунок и не целится в него. Он нарочно оставляет след и " +
            "повторяет движение, чтобы увидеть его снова, и мишень для него это сам лист, а не " +
            "картинка на листе. Черты поперек рисунка, за краем листа и по столу это не " +
            "неудавшееся занятие, а то, как этот возраст выглядит.",
          "На что смотреть в странице: контур примерно такой же толстый, как сам мелок, одна форма " +
            "во весь лист, плотная бумага, потому что нажим в этом возрасте легко рвет тонкую, и " +
            "предмет, который ребенок уже может назвать вслух: мяч, кошка, яблоко. Печать с одной " +
            "стороны тоже важна: фломастер проходит обычную бумагу насквозь и портит рисунок с " +
            "обратной стороны.",
          "Занятие в год длится минуту или две, и это нормальная длина, а не короткая. Назовите " +
            "вслух, что нарисовано, дайте ребенку выбрать мелок самому и не поправляйте черты. " +
            "Заканчивать стоит тогда, когда ребенок встал из-за стола, а не тогда, когда страница " +
            "закрашена: в этом возрасте закрашенной страницы обычно и не бывает.",
        ],
        doTitle: "Как проходит занятие",
        steps: [
          "Назовите рисунок вслух до того, как мелок коснется бумаги, и назовите еще раз, когда " +
            "ребенок поднимет глаза.",
          "Предложите два-три мелка на выбор, а не вложите один в руку.",
          "Сядьте рядом и рисуйте на своем листе, а не на детском.",
          "Закончите, когда интерес пропал, и оставьте тот же лист под рукой, чтобы вернуться позже.",
        ],
        faq: [
          {
            q: "Можно ли давать раскраску ребенку в 1 год?",
            a:
              "Можно, если страница сделана под хват кулаком: одна крупная форма, очень толстый " +
              "контур и никаких мелких деталей. Годовалый получает от нее открытие, что от " +
              "движения руки остается след, и название того, что нарисовано. Закрашивание формы в " +
              "это пока не входит.",
          },
          {
            q: "Ребенок просто черкает по всему листу. Это нормально?",
            a:
              "Это ровно то, как выглядит данный возраст. Чтобы целиться, нужно держать мелок " +
              "пальцами и двигать кистью, а в год рука качается от плеча целиком. Черты поперек " +
              "рисунка и за краем листа это обычный результат, а не признак того, что что-то идет " +
              "не так.",
          },
          {
            q: "Какие мелки подходят в 1 год?",
            a:
              "Толстые, сделанные для этого возраста: маленькая рука держит их в кулаке, и след " +
              "выходит широким и хорошо заметным. Тонкие карандаши требуют хвата пальцами, который " +
              "появится позже, а фломастеры лучше оставить на то время, когда ребенок начнет " +
              "целиться в рисунок. В этом возрасте раскрашивают рядом со взрослым.",
          },
          {
            q: "Сколько времени годовалый ребенок раскрашивает?",
            a:
              "Минута-две это обычное дело, пять минут это хороший день. Занятие кончается, когда " +
              "ребенок встал, и это нормальный конец, а не сорванный. Тот же лист можно достать " +
              "завтра, и часто во второй раз он идет лучше.",
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
          "Крупный узнаваемый предмет, по-прежнему толстый контур и две-три части внутри формы. " +
          "Что меняется в два года, а что пока не меняется.",
        body: [
          "В два года ребенку нужен крупный узнаваемый предмет с толстым контуром и двумя-тремя " +
            "отдельными частями внутри. Мелок перешел из кулака в пальцы, хотя держится еще " +
            "неуверенно, а среди черт появились нарочные петли и движения сверху вниз вместо " +
            "одного длинного размаха. Большая часть цвета попадает куда-то на рисунок, а значит " +
            "рисунок наконец стал мишенью.",
          "Не изменилось одно: оставаться внутри контура ребенок пока не может, и требовать этого " +
            "сейчас самый быстрый способ закончить занятие. Толстый контур работает как заметный " +
            "ориентир, а не как граница: ребенок видит, где форма, целится в нее и постоянно " +
            "выходит за край. Двух-трех частей внутри достаточно, чтобы он взял второй цвет " +
            "нарочно, и обычно это первое, что родитель замечает в этом возрасте.",
          "Один рисунок на странице по-прежнему важнее разнообразия. Два-три предмета на листе " +
            "делят внимание ребенка, которого хватает примерно на пять минут, и страница остается " +
            "начатой в трех местах. Слово под рисунком здесь оправдывает свое место: в два года " +
            "ребенок называет то, что нарисовано, еще до начала, и половина интереса держится " +
            "именно на этом.",
          "Занятие в два года идет около пяти минут, иногда десять, если предмет любимый. " +
            "Спросите, кто на листе, и дайте ребенку ответить, предложите выбор из двух цветов " +
            "вместо готового цвета, и говорите о том, что видите, не оценивая: вот здесь много " +
            "синего, а тут линия идет до самого низа. Возвращаться к одному и тому же рисунку " +
            "несколько раз нормально и обычно означает, что он выбран удачно.",
        ],
        doTitle: "Как проходит занятие",
        steps: [
          "Спросите, кто нарисован на листе, и дождитесь ответа, прежде чем дать мелок.",
          "Предложите выбрать из двух цветов, а не выбирайте цвет сами.",
          "Говорите о том, что видите, не поправляя, и не трогайте вышедшие за контур линии.",
          "Держите перед ребенком один лист, остальные уберите.",
        ],
        faq: [
          {
            q: "Должен ли ребенок в 2 года раскрашивать внутри контура?",
            a:
              "Нет, и ставить такую цель в этом возрасте не стоит. В два года рука еще учится " +
              "держать мелок пальцами и вообще целиться в форму. Толстый контур дает ребенку " +
              "заметный ориентир, а выход за него это обычный результат, а не ошибка, которую надо " +
              "исправлять.",
          },
          {
            q: "Сколько деталей должно быть в раскраске для двухлетнего ребенка?",
            a:
              "Две-три отдельные части внутри одной крупной формы, контур при этом остается " +
              "толстым. Этого хватает, чтобы ребенок нарочно взял второй цвет, и этого достаточно " +
              "мало, чтобы страница выглядела законченной, даже когда закрашена лишь частично. " +
              "Книги, плотно набитые мелкими участками, относятся к более старшему возрасту.",
          },
          {
            q: "Подходят ли фломастеры в 2 года?",
            a:
              "Смываемые фломастеры в этом возрасте работают хорошо, потому что ребенок уже " +
              "целится в рисунок, а смываемые спасают стол и одежду. Проверить стоит одно: " +
              "страница должна быть напечатана с одной стороны, иначе фломастер пройдет обычную " +
              "бумагу насквозь и испортит следующий рисунок.",
          },
          {
            q: "Ребенок раскрашивает одну и ту же страницу много раз. Стоит ли это прекращать?",
            a:
              "Причин прекращать нет. Повторение любимого рисунка это и есть способ, которым " +
              "двухлетний ребенок тренируется, и вторая и третья попытки обычно выходят более " +
              "осмысленными, чем первая. Распечатать тот же лист еще раз проще, чем уговорить " +
              "ребенка перейти на новый.",
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
          "Крупный рисунок с тремя-шестью отдельными участками, заметный контур и место, чтобы " +
          "что-то дорисовать. Где первая раскраска еще подходит, а где начинает заканчиваться.",
        body: [
          "В три года ребенку нужен крупный рисунок с тремя-шестью отдельными участками для " +
            "закрашивания и по-прежнему заметным контуром. Мелок держится пальцами, а не всей " +
            "ладонью, круг и прямую линию ребенок повторяет по просьбе, а цвет для каждого участка " +
            "выбирает нарочно и может объяснить выбор. Большая часть цвета ложится на рисунок, а " +
            "выход за контур все еще частый и все еще нормальный.",
          "Это возраст, когда страница может нести не только цвет. Свободное место у края листа " +
            "дает ребенку, который хочет дорисовать солнце, куда его поставить, а слово под " +
            "рисунком превращается в то, что можно обвести или повторить. Вопросы, кто нарисован, " +
            "какого он цвета и что происходит на картинке, в три года обычно получают настоящий " +
            "ответ, и именно эта часть занятия дает больше всего.",
          "Разнообразие становится не менее важным, чем размер. Трехлетний ребенок замечает, когда " +
            "две страницы подряд похожи, и книга из одних животных надоедает быстрее той, где " +
            "животные сменяются едой, транспортом и знакомыми предметами. Занятие идет десять " +
            "минут, а иногда и дольше, поэтому страница, которая заканчивается слишком быстро, " +
            "теперь настоящее разочарование, а не нормальный конец.",
          "Это же возраст, когда первая раскраска начинает становиться мала, обычно где-то после " +
            "трех с половиной лет. Признак не умение, а скука: ребенок аккуратно закрашивает лист " +
            "и откладывает его без интереса. Дальше идет сюжет вместо отдельного предмета или " +
            "книга с рисованием по шагам, где ребенок строит картинку сам, а не закрашивает чужую.",
        ],
        doTitle: "Как проходит занятие",
        steps: [
          "Спросите, кто на картинке и что там происходит, и дайте ответу развернуться.",
          "Выложите весь набор цветов и не участвуйте в выборе.",
          "Предложите край листа для всего, что ребенок захочет дорисовать.",
          "Когда лист закрашивается аккуратно и откладывается без интереса, пора на уровень выше.",
        ],
        faq: [
          {
            q: "Сколько участков должно быть в раскраске для ребенка 3 лет?",
            a:
              "От трех до шести отдельных участков внутри одного крупного рисунка, контур при этом " +
              "остается заметным. Этого хватает, чтобы ребенок выбрал каждому участку свой цвет, а " +
              "именно этого он в три года и хочет, и этого достаточно мало, чтобы страница не " +
              "тянулась дольше, чем держится интерес.",
          },
          {
            q: "Ребенку 3 года, и он все еще выходит за контур. Это плохо?",
            a:
              "Нет. Уверенно оставаться внутри контура обычно получается ближе к четырем годам, а " +
              "до тех пор рука занята тем, чтобы целиться в форму и класть на нее большую часть " +
              "цвета. Замечания про вышедшие за край линии обычно стоят больше потерянного " +
              "интереса, чем дают точности.",
          },
          {
            q: "Когда первая раскраска становится мала?",
            a:
              "Когда ребенок аккуратно закрашивает лист и уходит от него без интереса, обычно " +
              "после трех с половиной лет. Сигнал это скука, а не аккуратность. С этого момента " +
              "лучше подходит сюжет, где участков больше, или книга с рисованием по шагам, а не " +
              "новые страницы того же типа.",
          },
          {
            q: "Подходят ли цветные карандаши в три года?",
            a:
              "Обычно да: хват пальцами, который для них нужен, к этому возрасту уже есть, а " +
              "карандаш позволяет работать мягче внутри небольшого участка. Мелки и смываемые " +
              "фломастеры по-прежнему хороши, и большинство трехлетних детей переходят между всеми " +
              "тремя в зависимости от того, что раскрашивают.",
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
      "Что подходит ребенку в год, в два и в три, что будет происходить за столом и чего пока " +
      "ждать не нужно.",
    otherAges: "Другие возрасты",
    stageLink: "Что происходит с рукой на этом этапе",
    toolLink: "Ответьте на четыре вопроса о ребенке",
  },
};
