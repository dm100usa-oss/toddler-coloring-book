import type { ContentLang } from "./dictionaries";
import type { StageId } from "./stages";

/* Руководства.

   Темы выбраны не наугад. Каждая взята из того, что родители на самом
   деле набирают в поиске: чем рисовать малышу, как обойтись без грязи,
   что делать, когда фломастер проходит насквозь, можно ли давать
   раскраску годовалому, сколько ребенок вообще выдерживает за столом.

   Правило письма то же, что и везде на сайте: каждый абзац закончен
   сам по себе. Нейросеть вырывает из страницы один кусок, и он должен
   работать в одиночку, без "как мы писали выше".

   Порядок в списке это порядок в меню. Первой стоит статья про возраст:
   это самый частый вопрос из всех. */

export type Guide = {
  id: string;
  slug: Record<ContentLang, string>;
  title: Record<ContentLang, string>;
  /* Короткий ответ на вопрос статьи. Стоит сразу под заголовком.
     Именно его забирает поисковик в выдачу и нейросеть в ответ,
     поэтому он должен быть законченным ответом, а не завлекалкой. */
  lead: Record<ContentLang, string>;
  body: Record<ContentLang, string[]>;
  faq: Record<ContentLang, { q: string; a: string }[]>;
  /* Этап, к которому статья ближе всего. Связывает статью
     со страницей этапа в обе стороны. */
  stage?: StageId;
};

export const guides: Guide[] = [
  /* ---------------------------------------------------------------- */
  {
    id: "age-to-start",
    slug: {
      en: "what-age-can-a-toddler-start-coloring",
      es: "a-que-edad-puede-empezar-a-colorear-un-nino",
      ru: "v-kakom-vozraste-rebenok-mozhet-raskrashivat",
    },
    stage: "scribble",
    title: {
      en: "What age can a child start coloring?",
      es: "¿A qué edad puede empezar a colorear un niño?",
      ru: "В каком возрасте ребенок может начать раскрашивать?",
    },
    lead: {
      en:
        "Most children make their first deliberate marks on paper between twelve and eighteen " +
        "months, holding a crayon in a fist. That is the real beginning. Staying inside a line is " +
        "a separate skill that arrives closer to three, and waiting for it before handing over a " +
        "crayon means waiting about eighteen months too long.",
      es:
        "La mayoría de los niños empiezan a dejar marcas intencionadas en el papel entre los " +
          "doce y los dieciocho meses, normalmente sujetando el crayón con toda la mano. Ese " +
          "es el comienzo del dibujo. La capacidad de colorear dentro del contorno aparece " +
          "bastante más tarde, cerca de los tres o cuatro años, así que no es necesario " +
          "esperar hasta entonces para ofrecerle un crayón.",
      ru:
        "Большинство детей начинают осознанно оставлять следы на бумаге примерно между " +
          "двенадцатью и восемнадцатью месяцами, обычно держа мелок всей ладонью. Это и есть " +
          "начало знакомства с рисованием. Умение раскрашивать внутри контура появляется " +
          "значительно позже, ближе к трем-четырем годам, поэтому ждать его, прежде чем дать " +
          "ребенку мелок, не нужно.",
    },
    body: {
      en: [
        "The question behind the question is usually different: not when a child can hold a crayon, " +
        "but when giving one stops being a waste of paper. The honest answer is that it is never a " +
        "waste, because what the child is learning at twelve months has nothing to do with the " +
        "picture. They are learning that their own movement changes the world outside their body. " +
        "That is the whole lesson, and a scribbled-over page is proof it landed.",

        "Around twelve to fifteen months a child can make a mark and will repeat it deliberately to " +
        "watch it happen again. The grip is a fist, the movement comes from the shoulder and elbow, " +
        "and the marks are long and sweeping. Nothing about this is aimed at anything.",

        "By about eighteen months to two years the scribbling becomes controlled. The child " +
        "scribbles without being shown first, can copy a line someone else has just drawn, and " +
        "produces looping round marks and up and down strokes on purpose. The marks now mostly land " +
        "on the drawing rather than all over the table.",

        "Between two and three the child starts aiming. They can copy a vertical line, a horizontal " +
        "line and a circle, and they get most of the color onto the drawing while crossing the " +
        "outline freely. This is the stage parents most often misread as failure. Crossing the line " +
        "here is not a mistake, it is what aiming looks like before the hand catches up with the eye.",

        "Around three, and more reliably closer to four, staying inside the outline becomes possible " +
        "and the child begins to notice when the color goes out. A cross can be copied around four. " +
        "This is also the point where a book made for the first stage starts to feel too easy.",

        "The practical rule for the first crayon is simple. Give a thick crayon, not a pencil or a " +
        "marker. Sit the child at a table with one sheet, not a whole book. Expect the first " +
        "sessions to last two or three minutes and to end when the child stands up, not when the " +
        "page is finished. None of that is a problem to fix. It is exactly what the beginning looks " +
        "like.",
      ],
      es: [
        "A muchos padres les preocupa si tiene sentido dar un libro para colorear a un niño " +
          "que todavía se limita a garabatear. Sí lo tiene: a esta edad no está aprendiendo a " +
          "colorear con precisión, sino a comprender la relación entre el movimiento de la " +
          "mano y el trazo que aparece en el papel. Incluso una hoja llena de líneas " +
          "desordenadas representa una experiencia nueva e importante para el niño.",

        "Entre los doce y los quince meses, aproximadamente, un niño ya puede dejar una " +
          "marca de forma intencionada y repetir el movimiento para verla de nuevo. Suele " +
          "sujetar el crayón con toda la mano y mover el brazo desde el hombro y el codo, por " +
          "lo que los trazos son largos y amplios. Todavía no sabe dirigirlos con precisión " +
          "hacia el dibujo.",

        "Entre los dieciocho meses y los dos años, aproximadamente, los garabatos se vuelven " +
          "más controlados. El niño empieza a dibujar por iniciativa propia, puede intentar " +
          "imitar una línea que acaba de hacer un adulto y aparecen trazos redondeados, bucles " +
          "y líneas de arriba abajo. Poco a poco, cada vez más trazos caen sobre el propio " +
          "dibujo.",

        "Entre los dos y los tres años, el niño empieza a dirigir los movimientos de la mano " +
          "con mayor precisión. Puede copiar una línea vertical, una horizontal y un círculo, " +
          "y al colorear intenta cada vez más hacerlo sobre el propio dibujo, aunque todavía " +
          "se sale del contorno con frecuencia. Es completamente normal: la precisión de los " +
          "movimientos aún se está desarrollando.",

        "A partir de los tres años, aproximadamente, al niño le resulta cada vez más fácil " +
          "colorear dentro del contorno y, cerca de los cuatro, suele darse cuenta con mayor " +
          "frecuencia cuando se sale. Alrededor de esta edad, un primer libro para colorear " +
          "sencillo también puede empezar a resultarle demasiado fácil.",

        "Para el primer contacto con el dibujo, lo mejor es empezar con crayones gruesos. " +
          "Ofrézcale una sola hoja en lugar del libro entero y no espere una actividad larga: " +
          "al principio, el interés puede durar solo dos o tres minutos. Puede terminar en " +
          "cuanto el niño quiera hacer otra cosa. En esta primera etapa es completamente " +
          "normal.",
      ],
      ru: [
        "Родителей часто волнует, есть ли смысл давать раскраску ребенку, который пока " +
          "просто черкает по бумаге. Смысл есть: в этом возрасте малыш учится не аккуратно " +
          "раскрашивать, а понимать связь между движением руки и следом, который появляется на " +
          "бумаге. Даже лист, покрытый беспорядочными линиями, для него является результатом " +
          "важного нового опыта.",

        "Примерно с двенадцати до пятнадцати месяцев ребенок уже может осознанно оставлять " +
          "след на бумаге и повторять движение, чтобы увидеть его снова. Мелок он обычно " +
          "держит всей ладонью, двигая рукой от плеча и локтя, поэтому линии получаются " +
          "длинными и размашистыми. Точно направлять их по рисунку ребенок пока не умеет.",

        "Примерно от восемнадцати месяцев до двух лет каракули становятся более осознанными. " +
          "Ребенок начинает рисовать самостоятельно, может попытаться повторить показанную " +
          "взрослым линию, появляются округлые петли и движения сверху вниз. Постепенно все " +
          "больше линий попадает на сам рисунок.",

        "Между двумя и тремя годами ребенок начинает точнее направлять движения руки. Он " +
          "может повторить вертикальную и горизонтальную линии и круг, а во время " +
          "раскрашивания все чаще попадает по самому рисунку, хотя по-прежнему свободно " +
          "выходит за контур. Это совершенно нормально: точность движений еще развивается.",

        "Примерно после трех лет ребенку становится легче раскрашивать внутри контура, а " +
          "ближе к четырем он уже чаще замечает, когда выходит за его границы. Примерно в этом " +
          "же возрасте простая первая раскраска может начать казаться ему слишком легкой.",

        "Для первого знакомства с рисованием лучше выбрать толстые восковые мелки. Дайте " +
          "ребенку один лист, а не целую книгу, и не ждите долгого занятия: вначале интерес " +
          "может сохраняться всего две-три минуты. Заканчивать можно, как только ребенок " +
          "захочет переключиться на что-то другое. Для самого первого этапа это совершенно " +
          "нормально.",
      ],
    },
    faq: {
      en: [
        {
          q: "Can a 1 year old use a coloring book?",
          a:
            "Yes, with the right kind of page. At one year old a child holds the crayon in a fist " +
            "and makes sweeping marks without aiming, so the page needs a very thick outline and " +
            "one large shape filling the sheet. On that kind of page any mark lands somewhere that " +
            "counts and the child sees a result. On a page of small detailed drawings nothing " +
            "visible happens and the child loses interest in under a minute.",
        },
        {
          q: "Is it safe to give a one year old crayons?",
          a:
            "Use crayons labelled non-toxic and large enough that they cannot be swallowed, and stay " +
            "at the table while the child uses them. Children at this age put things in their " +
            "mouths, and a thick chunky crayon is chosen as much for that reason as for the grip.",
        },
        {
          q: "How long should the first coloring session last?",
          a:
            "Two or three minutes is normal at the very beginning and is not a sign of a short " +
            "attention span. End the session when the child stands up rather than trying to finish " +
            "the page. Sessions lengthen on their own over months as the child gets more out of them.",
        },
      ],
      es: [
        {
          q: "¿Puede un niño de 1 año usar un libro para colorear?",
          a:
            "Sí, siempre que se elija una página adecuada. Alrededor del año, el niño suele " +
              "sujetar el crayón con toda la mano y hacer trazos amplios, por lo que conviene " +
              "una sola forma grande que ocupe casi toda la hoja, con un contorno muy grueso y " +
              "pocos detalles. En una página así le resulta más fácil ver los trazos que hace " +
              "y el resultado de sus movimientos.",
        },
        {
          q: "¿Es seguro darle crayones a un niño de un año?",
          a:
            "Utilice crayones destinados a niños pequeños, con indicación de que no son " +
              "tóxicos y de un tamaño suficiente para reducir el riesgo de que puedan " +
              "tragarse. Mientras dibuja, un adulto debe permanecer cerca, ya que a esta edad " +
              "los niños suelen llevarse objetos a la boca.",
        },
        {
          q: "¿Cuánto debe durar la primera sesión de colorear?",
          a:
            "Dos o tres minutos es una duración completamente normal al principio. Si el " +
              "niño pierde el interés, no es necesario pedirle que termine la página. Con el " +
              "tiempo, estas actividades suelen durar más.",
        },
      ],
      ru: [
        {
          q: "Можно ли давать раскраску ребенку в год?",
          a:
            "Да, если выбрать подходящую страницу. В год ребенок обычно держит мелок всей " +
              "ладонью и рисует широкими размашистыми линиями, поэтому лучше всего подходит " +
              "одна крупная форма почти во весь лист с очень толстым контуром и минимумом " +
              "деталей. На такой странице малышу проще увидеть следы своих движений и сам " +
              "результат рисования.",
        },
        {
          q: "Безопасно ли давать мелки годовалому?",
          a:
            "Выбирайте мелки, предназначенные для маленьких детей, с маркировкой о " +
              "нетоксичности и достаточно крупные, чтобы снизить риск проглатывания. Во время " +
              "рисования взрослый должен находиться рядом: в этом возрасте дети часто тянут " +
              "предметы в рот.",
        },
        {
          q: "Сколько должно длиться первое занятие?",
          a:
            "В самом начале две-три минуты - совершенно нормальная продолжительность " +
              "занятия. Если ребенок потерял интерес, не нужно просить его закончить страницу. " +
              "Со временем такие занятия обычно становятся дольше.",
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    id: "what-to-draw-with",
    slug: {
      en: "crayons-markers-or-colored-pencils-for-toddlers",
      es: "crayones-rotuladores-o-lapices-de-colores-para-ninos",
      ru: "chem-risovat-malyshu-melki-flomastery-karandashi",
    },
    stage: "control",
    title: {
      en: "Crayons, markers or colored pencils: what to give a toddler",
      es: "Crayones, rotuladores o lápices: qué darle a un niño pequeño",
      ru: "Чем рисовать малышу: восковые мелки, фломастеры или цветные карандаши",
    },
    lead: {
      en:
        "Thick crayons first, for at least the first year of drawing. They need no grip strength, " +
        "they will not tear the page, they do not bleed through, and they leave a wide mark a child " +
        "can actually see. Markers come later, colored pencils later still, and both for specific " +
        "reasons rather than as an upgrade.",
      es:
        "Para empezar, suelen ser más adecuados los crayones gruesos, especialmente durante " +
          "las primeras etapas del dibujo. Dejan un trazo visible sin necesidad de presionar " +
          "mucho, son fáciles de sujetar con una mano pequeña y no traspasan el papel. Más " +
          "adelante se pueden probar rotuladores lavables y, después, lápices de colores, a " +
          "medida que los movimientos de la mano se vuelven más precisos.",
      ru:
        "Для начала лучше всего подходят толстые восковые мелки. Они легко оставляют " +
          "заметный след, не требуют сильного нажима и не пропитывают бумагу насквозь. Позже " +
          "можно попробовать смываемые фломастеры, а затем и цветные карандаши - по мере того " +
          "как движения руки становятся точнее.",
    },
    body: {
      en: [
        "The choice matters more than it looks, because at this age the tool decides whether the " +
        "child sees a result. A child who presses hard and gets a faint line concludes that nothing " +
        "is happening and stops. Everything below follows from that one fact.",

        "Thick crayons are the right first tool for four separate reasons. They mark with almost no " +
        "pressure, so a hand that has no strength yet still produces a strong line. They are wide " +
        "enough to be held in a fist, which is how a child holds things before the fingers take " +
        "over. They cannot tear paper, which a sharp pencil in a heavy fist easily can. And they do " +
        "not go through the page, so a marked sheet stays a marked sheet.",

        "Markers give the brightest result and children love them for exactly that reason. The cost " +
        "is that they go straight through ordinary paper, so a double sided page loses the drawing " +
        "on the back, and they mark the table, clothes and skin far more readily than crayons. " +
        "Washable markers solve most of that. A spare sheet under the page solves the rest.",

        "Colored pencils need a finger grip and steady pressure, both of which most children do not " +
        "have before about three. Given earlier, the pencil either leaves nothing visible or snaps. " +
        "They come into their own once a child stays inside the line and wants finer control, which " +
        "is a real want and not one to rush.",

        "Two smaller things are worth knowing. Chunky triangular or egg-shaped crayons encourage the " +
        "fingers to sit where they will eventually need to sit, which is a gentle nudge rather than " +
        "a training device. And a child who is left handed needs nothing different in the way of " +
        "tools, but does benefit from a drawing placed in the middle of the page rather than off to " +
        "one side, where a left hand covers it while working.",
      ],
      es: [
        "La elección del material importa más de lo que puede parecer. Un niño pequeño " +
          "necesita ver enseguida el resultado del movimiento de su mano. Si tiene que " +
          "presionar con fuerza y apenas aparece un trazo, puede perder rápidamente el interés " +
          "por la actividad.",

        "Los crayones gruesos son una buena opción para las primeras actividades por varias " +
          "razones. Dejan un trazo visible con poca presión, son fáciles de sujetar con toda " +
          "la mano, no tienen una punta afilada que pueda dañar el papel y no traspasan la " +
          "hoja. Todo esto los convierte en una herramienta cómoda para empezar a dibujar.",

        "Los rotuladores dejan colores intensos, y por eso gustan a muchos niños. Sin " +
          "embargo, la tinta puede traspasar el papel corriente y dejar manchas en la mesa, la " +
          "ropa o la piel. Para los más pequeños, conviene elegir rotuladores lavables y " +
          "colocar una hoja adicional debajo de la página.",

        "Los lápices de colores requieren un agarre más preciso con los dedos y cierta " +
          "presión constante. Para un niño pequeño suelen resultar más difíciles de usar que " +
          "los crayones gruesos. Se pueden introducir más adelante, cuando los movimientos de " +
          "la mano sean más precisos y al niño le interese colorear zonas más pequeñas.",

        "Hay otros dos detalles que pueden ser útiles. Los crayones gruesos de forma " +
          "triangular pueden resultar cómodos de sujetar y ayudar al niño a acostumbrarse poco " +
          "a poco a un agarre más preciso. Los niños zurdos no necesitan materiales " +
          "especiales, pero un dibujo centrado en la página suele resultar más cómodo, porque " +
          "la mano tapa menos la imagen mientras colorean.",
      ],
      ru: [
        "Выбор инструмента важнее, чем может показаться. Маленькому ребенку нужно сразу " +
          "видеть результат движения руки. Если инструмент требует сильного нажима и оставляет " +
          "едва заметный след, интерес к рисованию может быстро исчезнуть.",

        "Толстые восковые мелки, которые также называют восковыми карандашами, хорошо " +
          "подходят для первых занятий по нескольким причинам. Они оставляют заметный след " +
          "почти без нажима, их удобно держать всей ладонью, они не протыкают бумагу острым " +
          "кончиком и не пропитывают лист насквозь. Все это делает их удобным первым " +
          "инструментом для рисования.",

        "Фломастеры дают яркий цвет, и именно поэтому они нравятся многим детям. Но чернила " +
          "могут проходить сквозь обычную бумагу и оставлять следы на столе, одежде и коже. " +
          "Поэтому для малышей удобнее выбирать смываемые фломастеры, а под страницу " +
          "подкладывать дополнительный лист бумаги.",

        "Цветные карандаши требуют более точного захвата пальцами и достаточного нажима. " +
          "Маленькому ребенку ими часто пользоваться сложнее, чем толстыми мелками. " +
          "Попробовать карандаши можно позже, когда движения руки станут точнее и ребенку " +
          "будет интересно раскрашивать более мелкие участки.",

        "Есть еще несколько полезных деталей. Толстые трехгранные мелки удобно лежат в руке " +
          "и помогают ребенку постепенно привыкать к более точному захвату. Для левши " +
          "специальные инструменты не нужны, но рисунок, расположенный по центру листа, обычно " +
          "удобнее: рука меньше закрывает изображение во время раскрашивания.",
      ],
    },
    faq: {
      en: [
        {
          q: "Are washable markers safe for a two year old?",
          a:
            "Washable markers labelled non-toxic are widely used at this age, and the washable " +
            "formula is what makes the difference on skin, clothes and furniture. They still go " +
            "through paper, so put a spare sheet underneath. Keep the caps out of reach: they are " +
            "small enough to be a choking hazard.",
        },
        {
          q: "My child holds the crayon in a fist. Should I correct it?",
          a:
            "No. A fist grip is normal and expected before about two and a half, and correcting it " +
            "by force usually ends the drawing session rather than fixing the grip. The finger grip " +
            "arrives on its own as the hand develops. Chunky triangular crayons gently encourage it " +
            "without any instruction.",
        },
        {
          q: "What about paint at this age?",
          a:
            "Paint works and children enjoy it, but it is a different activity rather than a step up " +
            "from crayons. It teaches color and coverage rather than the aiming and control that a " +
            "coloring page builds. Most families do both and use paint when they have time to clean up.",
        },
      ],
      es: [
        {
          q: "¿Son seguros los rotuladores lavables para un niño de dos años?",
          a:
            "Para los niños pequeños, elija rotuladores lavables con indicación de que no " +
              "son tóxicos. Suelen limpiarse con mayor facilidad de la piel, la ropa y muchas " +
              "superficies, aunque la tinta todavía puede traspasar el papel, por lo que " +
              "conviene colocar una hoja adicional debajo. Mantenga también los capuchones " +
              "fuera de su alcance, ya que son piezas pequeñas.",
        },
        {
          q: "Mi hijo agarra el crayón con el puño. ¿Debo corregirlo?",
          a:
            "No. Sujetar el crayón con toda la mano es completamente normal en las primeras " +
              "etapas. No conviene colocarle los dedos a la fuerza: la forma de sujetar el " +
              "crayón cambia gradualmente a medida que se desarrollan los movimientos de la " +
              "mano. Los crayones gruesos o triangulares pueden facilitar un agarre cómodo sin " +
              "necesidad de ejercicios especiales.",
        },
        {
          q: "¿Y la pintura a esta edad?",
          a:
            "La pintura también es adecuada para los niños pequeños, pero es un tipo de " +
              "actividad diferente. Permite experimentar con el color, las mezclas y la " +
              "aplicación de pintura sobre una superficie, mientras que colorear con crayones " +
              "o lápices está más relacionado con dirigir los movimientos de la mano. Ambas " +
              "actividades pueden complementarse perfectamente.",
        },
      ],
      ru: [
        {
          q: "Безопасны ли смываемые фломастеры для двухлетнего?",
          a:
            "Для маленьких детей выбирайте смываемые фломастеры с маркировкой о " +
              "нетоксичности. Они легче отмываются с кожи, одежды и многих поверхностей, но " +
              "все равно могут проходить сквозь бумагу, поэтому под страницу лучше подложить " +
              "дополнительный лист. Следите и за колпачками: мелкие детали должны оставаться " +
              "вне доступа ребенка.",
        },
        {
          q: "Ребенок держит мелок в кулаке. Надо ли поправлять?",
          a:
            "Нет. В раннем возрасте держать мелок всей ладонью совершенно нормально. Не " +
              "стоит силой переставлять пальцы ребенка: способ держать мелок постепенно " +
              "меняется по мере развития движений руки. Толстые или трехгранные мелки могут " +
              "сделать захват удобнее без специальных упражнений.",
        },
        {
          q: "А краски в этом возрасте?",
          a:
            "Да, краски тоже подходят маленьким детям, но это немного другой вид занятия. " +
              "Они позволяют экспериментировать с цветом, смешиванием и нанесением краски на " +
              "поверхность, тогда как раскрашивание мелками или карандашами больше связано с " +
              "направлением движений руки. Эти занятия прекрасно дополняют друг друга.",
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    id: "mess",
    slug: {
      en: "coloring-with-a-toddler-without-the-mess",
      es: "colorear-con-un-nino-pequeno-sin-ensuciarlo-todo",
      ru: "kak-raskrashivat-s-malyshom-bez-gryazi",
    },
    stage: "control",
    title: {
      en: "Coloring with a toddler without the mess",
      es: "Colorear con un niño pequeño sin ensuciarlo todo",
      ru: "Как раскрашивать с малышом и не испачкать все вокруг",
    },
    lead: {
      en:
        "Most of the mess comes from three things: the wrong tool, a page that gives the child " +
        "nothing to aim at, and a session that runs past the point where the child was still " +
        "interested. Fixing those three removes most of the cleaning, and does more than any mat " +
        "or smock.",
      es:
        "La mayor parte del desorden al colorear puede reducirse con tres medidas sencillas: " +
          "elegir materiales adecuados, ofrecer un dibujo grande y claro y terminar la " +
          "actividad cuando el niño pierda el interés. A menudo, esto es suficiente para que " +
          "colorear no termine convirtiéndose en una gran limpieza.",
      ru:
        "Большую часть беспорядка во время раскрашивания можно уменьшить тремя простыми " +
          "способами: выбрать подходящие материалы, дать ребенку крупный и понятный рисунок и " +
          "закончить занятие, когда он потеряет интерес. Часто этого оказывается достаточно, " +
          "чтобы рисование не превращалось в большую уборку.",
    },
    body: {
      en: [
        "It helps to separate two different worries that get called the same thing. One is marks " +
        "where they should not be: the table, the wall, the child. The other is the page itself " +
        "looking chaotic. The second is not mess at all, it is what drawing looks like at this age, " +
        "and treating it as a problem is the fastest way to make a child stop enjoying it.",

        "For marks in the wrong place, the tool does most of the work. Crayons stay largely where " +
        "they are put and wipe off hard surfaces easily. Washable markers are made for exactly this " +
        "situation and come off skin and most fabrics. Ordinary permanent markers do not belong " +
        "anywhere near a two year old, and neither do open paint pots on a carpet.",

        "For the page, the fix is aiming. A child scribbles past the edge of the paper mainly when " +
        "there is nothing on the paper worth staying on. A large drawing with a thick outline gives " +
        "the hand a target, and a target keeps the crayon on the sheet far more effectively than " +
        "any instruction to be careful.",

        "Session length is the quietest of the three and the most reliable. A child who has finished " +
        "being interested does not put the crayon down politely, they start testing what else the " +
        "crayon does. Ending the session at the first sign of that, rather than at the end of the " +
        "page, prevents almost all of the incidents parents remember.",

        "Two practical arrangements are worth the small effort. Put a spare sheet of paper under the " +
        "page, which catches both marker bleed and overshoot at the edges. And give one sheet at a " +
        "time rather than the open book, which removes the temptation to turn the page mid-drawing " +
        "and halves the surface area available for accidents.",

        "One thing worth knowing before you shop: searching for mess free coloring will mostly turn " +
        "up a different product, the kind with special pens that only develop on treated paper. " +
        "Those work as advertised and are genuinely tidy, but the child colors with a pen that " +
        "shows nothing anywhere else, which is a different activity from drawing on paper. Both " +
        "have their place. They are not substitutes for each other.",
      ],
      es: [
        "Conviene distinguir dos cosas. Una son las marcas de crayón o rotulador que acaban " +
          "en la mesa, las paredes, la ropa o las manos. Otra es que el propio dibujo del niño " +
          "parezca desordenado. Los trazos irregulares y las líneas que salen del contorno son " +
          "completamente normales a esta edad y no significan que el niño esté coloreando mal.",

        "Para reducir las marcas accidentales fuera del papel, lo primero es elegir " +
          "materiales adecuados. Los crayones suelen ser más fáciles de limpiar de las " +
          "superficies duras, y los rotuladores lavables se eliminan mejor de la piel y de " +
          "muchos tejidos. Los rotuladores permanentes no son apropiados para que un niño " +
          "pequeño coloree.",

        "También ayuda elegir bien la página. Un dibujo grande con un contorno grueso ofrece " +
          "al niño una zona claramente visible para colorear y le facilita mantener los " +
          "movimientos dentro de la hoja. Suele ser más eficaz que recordarle constantemente " +
          "que tenga cuidado.",

        "Otra causa frecuente del desorden es alargar demasiado la actividad. Cuando el niño " +
          "pierde el interés por el dibujo, puede empezar a probar el crayón sobre la mesa, " +
          "los muebles u otras superficies. Por eso conviene terminar cuando aparezcan las " +
          "primeras señales de cansancio o aburrimiento y volver al dibujo más tarde.",

        "Hay dos medidas sencillas que ayudan mucho. Coloque debajo de la página una hoja " +
          "adicional o un trozo de cartón: protegerá la superficie tanto de la tinta que " +
          "traspase el papel como de los trazos que salgan por los bordes. Además, puede darle " +
          "al niño una sola hoja en lugar del libro abierto para que le resulte más fácil " +
          "concentrarse en un dibujo.",

        "También conviene distinguir los libros para colorear normales de los productos que " +
          "se venden como actividades «sin manchas». Estos utilizan rotuladores especiales " +
          "cuyo color solo aparece sobre un papel preparado para ellos. Son prácticos, " +
          "especialmente para viajar, pero no sustituyen el dibujo normal con crayones o " +
          "rotuladores sobre papel. Son simplemente dos tipos de actividad diferentes.",
      ],
      ru: [
        "Важно различать две вещи. Первая - реальные следы мелков или фломастеров на столе, " +
          "стенах, одежде и руках. Вторая - сама детская работа, которая может выглядеть " +
          "хаотично. Неровные линии и выходы за контур в раннем возрасте совершенно нормальны " +
          "и не означают, что ребенок рисует неправильно.",

        "Чтобы уменьшить случайные следы вокруг, прежде всего выбирайте подходящие " +
          "материалы. Восковые мелки обычно проще убрать с твердых поверхностей, а смываемые " +
          "фломастеры легче отмываются с кожи и многих тканей. Перманентные маркеры маленькому " +
          "ребенку для рисования лучше не давать.",

        "Помогает и правильно выбранная страница. Крупный рисунок с толстым контуром дает " +
          "ребенку хорошо заметную область для раскрашивания, поэтому ему проще удерживать " +
          "движения в пределах листа. Это эффективнее постоянных просьб рисовать аккуратнее.",

        "Еще одна причина беспорядка - слишком долгое занятие. Когда ребенок теряет интерес " +
          "к рисунку, он может начать пробовать мелок на столе, мебели или других " +
          "поверхностях. Поэтому лучше закончить занятие при первых признаках усталости или " +
          "скуки, а к рисунку вернуться позже.",

        "Есть два простых приема. Подложите под страницу дополнительный лист бумаги или " +
          "кусок картона: он защитит поверхность от чернил, прошедших сквозь бумагу, и от " +
          "линий, случайно вышедших за край. И давайте ребенку по одному листу вместо открытой " +
          "книги - так ему проще сосредоточиться на одном рисунке.",

        "Стоит также отличать обычные раскраски от наборов, которые продаются как " +
          "«раскрашивание без грязи». В таких наборах используются специальные фломастеры, " +
          "цвет которых проявляется только на предназначенной для них бумаге. Это удобно, " +
          "особенно в дороге, но такой набор не заменяет обычное рисование мелками или " +
          "фломастерами на бумаге. Это просто два разных вида занятий.",
      ],
    },
    faq: {
      en: [
        {
          q: "How do I get crayon off a wall?",
          a:
            "Warm water with a little dish soap on a soft cloth removes most crayon from painted " +
            "walls, working gently so the paint is not rubbed. A magic eraser sponge handles what is " +
            "left but can dull a matte finish, so test a hidden patch first. Check the crayon " +
            "packaging: many brands publish removal instructions for their own product.",
        },
        {
          q: "Are mess free coloring books the same thing as a regular coloring book?",
          a:
            "No. Mess free sets use special pens that only show up on their own treated paper, so " +
            "nothing marks the table or the child. They are genuinely tidy and useful for travel, " +
            "but the child is not drawing on ordinary paper and cannot use the same pen anywhere " +
            "else. They work alongside a paper coloring book rather than replacing it.",
        },
        {
          q: "Should my child wear a smock?",
          a:
            "With crayons it is rarely necessary. With markers or paint an old shirt is easier than " +
            "a proper smock and works as well. The bigger saving is choosing washable tools in the " +
            "first place.",
        },
      ],
      es: [
        {
          q: "¿Cómo quito el crayón de una pared?",
          a:
            "Empiece con agua tibia y una pequeña cantidad de lavavajillas en un paño suave. " +
              "Frote con cuidado para no dañar la pintura de la pared. Una esponja de melamina " +
              "puede ayudar con las marcas que queden, pero también puede alterar el aspecto " +
              "de una superficie mate, así que pruébela primero en una zona poco visible. " +
              "Conviene consultar además las recomendaciones del fabricante de los crayones.",
        },
        {
          q: "¿Los libros para colorear sin manchas son lo mismo que un libro normal?",
          a:
            "No. Los productos «sin manchas» utilizan rotuladores especiales cuyo color solo " +
              "aparece sobre el papel preparado para ellos. Son prácticos y ayudan a evitar " +
              "manchas en la mesa o la ropa, especialmente durante los viajes. Pero se trata " +
              "de una actividad diferente y no sustituyen el dibujo normal sobre papel.",
        },
        {
          q: "¿Debe llevar babi mi hijo?",
          a:
            "Con crayones, normalmente no hace falta. Si el niño utiliza rotuladores o " +
              "pintura, puede ponerse una camiseta o una camisa vieja. La forma más sencilla " +
              "de reducir las manchas es elegir desde el principio materiales lavables.",
        },
      ],
      ru: [
        {
          q: "Как оттереть восковой мелок со стены?",
          a:
            "Начните с теплой воды и небольшого количества средства для мытья посуды на " +
              "мягкой ткани. Не трите слишком сильно, чтобы не повредить краску на стене. " +
              "Меламиновая губка иногда помогает удалить оставшиеся следы, но может изменить " +
              "вид матовой поверхности, поэтому сначала проверьте ее на незаметном участке. " +
              "Также стоит посмотреть рекомендации производителя мелков на упаковке.",
        },
        {
          q: "Раскраска без грязи это то же самое, что обычная раскраска?",
          a:
            "Нет. В таких наборах используются специальные фломастеры, которые проявляют " +
              "цвет только на предназначенной для них бумаге. Это удобно и помогает избежать " +
              "пятен на столе и одежде, особенно в дороге. Но это другой вид занятия, который " +
              "не заменяет обычное рисование на бумаге.",
        },
        {
          q: "Нужен ли ребенку фартук?",
          a:
            "С восковыми мелками фартук обычно не нужен. При рисовании фломастерами или " +
              "красками можно надеть на ребенка старую футболку или рубашку. А самый простой " +
              "способ уменьшить количество пятен - сразу выбирать смываемые материалы.",
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    id: "bleed-through",
    slug: {
      en: "marker-bleeds-through-coloring-book-pages",
      es: "el-rotulador-traspasa-las-hojas-del-libro",
      ru: "flomaster-prohodit-bumagu-naskvoz",
    },
    stage: "aim",
    title: {
      en: "The marker goes through the page. What to do",
      es: "El rotulador traspasa la hoja. Qué hacer",
      ru: "Фломастер проходит бумагу насквозь. Что делать",
    },
    lead: {
      en:
        "Ordinary book paper does not stop a marker, and almost no coloring book at this price is " +
        "printed on paper that would. A spare sheet slipped under the page solves it completely in " +
        "one move. Choosing a book printed on one side only solves it permanently, because a marker " +
        "that soaks through then ruins a blank back rather than the next drawing.",
      es:
        "El papel corriente de muchos libros para colorear puede dejar pasar la tinta de los " +
          "rotuladores. La solución más sencilla es colocar una hoja adicional o un cartón " +
          "debajo de la página. También resulta muy práctico que el libro esté impreso por una " +
          "sola cara: así, si la tinta traspasa el papel, dejará una marca en el reverso en " +
          "blanco y no estropeará el dibujo siguiente.",
      ru:
        "Обычная бумага в раскрасках часто пропускает чернила фломастера. Самое простое " +
          "решение - подложить под страницу дополнительный лист бумаги или картона. Еще " +
          "удобнее, если книга напечатана только с одной стороны: тогда чернила могут оставить " +
          "след на пустом обороте, но не испортят следующий рисунок.",
    },
    body: {
      en: [
        "This is the single most common complaint in reviews of children's coloring books, and it " +
        "is worth understanding why it happens rather than treating it as a defect. Paper thick " +
        "enough to stop a marker costs several times more per page and makes the book heavier and " +
        "far more expensive. A book that used it would cost three or four times as much, which for " +
        "a book a child will scribble through in a month is a trade most parents would not choose " +
        "if it were spelled out.",

        "The one move that fixes it takes a second. Put a plain sheet of paper, or a piece of card, " +
        "under the page the child is working on. Whatever soaks through lands on that sheet. It " +
        "works with every book, costs nothing, and is worth doing as a habit rather than after the " +
        "first ruined drawing.",

        "The structural fix is to buy a book printed on one side only. Then the back of every " +
        "drawing is blank by design, and a marker that goes through marks an empty sheet. This is " +
        "worth checking before buying: it is easy to see in the look inside preview, and books " +
        "rarely state it on the cover. A book with a drawing on both sides of every sheet loses two " +
        "pictures every time a marker is used.",

        "The other approach is to change the tool rather than the paper. Crayons do not bleed at " +
        "all. Colored pencils do not bleed. Only markers and paint do, and markers are the ones " +
        "children reach for because the color is brighter. If bleed matters more than brightness on " +
        "a given day, that is a two second decision at the crayon box.",

        "One thing not to do: pressing a hot iron or a hairdryer on a page to dry it, or trying to " +
        "lift marker ink off paper with solvent. Neither works on book paper and both usually make " +
        "a small problem into a torn page.",
      ],
      es: [
        "La tinta de los rotuladores puede traspasar el papel de muchos libros infantiles " +
          "para colorear, y eso no significa necesariamente que el libro esté mal impreso. " +
          "Para impedirlo por completo se necesita un papel más grueso, que aumenta el coste y " +
          "el peso del libro. Por eso, muchos libros utilizan papel corriente y solucionan el " +
          "problema mediante impresión por una sola cara o colocando una hoja adicional " +
          "debajo.",

        "La solución más sencilla lleva solo unos segundos: coloque una hoja de papel o un " +
          "cartón fino debajo de la página que está coloreando el niño. La tinta que traspase " +
          "quedará en esa hoja. Conviene hacerlo desde el principio cuando se utilizan " +
          "rotuladores, en lugar de esperar a que se estropee el dibujo siguiente.",

        "Al elegir un libro, fíjese en si está impreso por una sola cara. Si el reverso de " +
          "cada dibujo está en blanco, la tinta que traspase el papel no estropeará la " +
          "ilustración siguiente. Es especialmente práctico para los niños a los que les gusta " +
          "colorear con rotuladores.",

        "Otra opción es cambiar de material. Los crayones y los lápices de colores no " +
          "traspasan el papel como la tinta de los rotuladores. Si al niño no le importa " +
          "utilizar otro material, es la forma más sencilla de evitar marcas en el reverso.",

        "No intente secar la página con un secador o una plancha ni eliminar la tinta con " +
          "disolventes. Estas medidas no solucionan las marcas que ya han traspasado el papel " +
          "y pueden dañar la página.",
      ],
      ru: [
        "Чернила фломастеров нередко проходят сквозь бумагу в детских раскрасках, и это не " +
          "обязательно означает, что книга напечатана плохо. Чтобы полностью удерживать " +
          "чернила, нужна более плотная и дорогая бумага, которая заметно увеличивает " +
          "стоимость и вес книги. Поэтому многие детские раскраски печатают на обычной бумаге, " +
          "а проблему решают односторонней печатью или дополнительным листом под страницей.",

        "Самый простой способ занимает несколько секунд: положите под страницу, которую " +
          "раскрашивает ребенок, чистый лист бумаги или тонкий картон. Чернила, прошедшие " +
          "насквозь, останутся на нем. Лучше делать это сразу при использовании фломастеров, а " +
          "не после того, как будет испорчен следующий рисунок.",

        "При выборе книги обратите внимание на одностороннюю печать. Если оборот каждого " +
          "рисунка пустой, чернила фломастера, прошедшие сквозь бумагу, не испортят следующую " +
          "картинку. Это особенно удобно для детей, которые любят раскрашивать фломастерами.",

        "Можно также выбрать другой инструмент. Восковые мелки и цветные карандаши не " +
          "пропитывают бумагу насквозь, поэтому для тонкой бумаги они удобнее фломастеров. " +
          "Если ребенку не принципиально рисовать именно фломастерами, это самый простой " +
          "способ избежать следов на обороте.",

        "Не стоит пытаться сушить страницу феном, проглаживать ее утюгом или удалять чернила " +
          "растворителем. Это не устранит следы, прошедшие сквозь бумагу, зато может повредить " +
          "страницу.",
      ],
    },
    faq: {
      en: [
        {
          q: "Which coloring books do not bleed through?",
          a:
            "Bleed depends on the paper weight, and almost no children's coloring book in the usual " +
            "price range uses paper heavy enough to stop a marker. What separates a good book from " +
            "a bad one here is not the paper but the printing: single sided printing means a marker " +
            "that soaks through marks a blank back instead of the next drawing.",
        },
        {
          q: "Will a coloring book bleed with crayons?",
          a:
            "No. Crayon is wax and sits on the surface of the paper rather than soaking into it, so " +
            "it does not come through to the other side at any pressure a small child can apply. " +
            "The same is true of colored pencils.",
        },
        {
          q: "Can I still use markers on thin paper?",
          a:
            "Yes, with a spare sheet underneath. That catches everything that soaks through and the " +
            "child never notices the difference. It is the simplest habit to build and it removes " +
            "the problem entirely.",
        },
      ],
      es: [
        {
          q: "¿Qué libros para colorear no traspasan?",
          a:
            "Depende principalmente del grosor del papel. El papel corriente de muchos " +
              "libros infantiles para colorear puede dejar pasar la tinta de los rotuladores. " +
              "Por eso, suele ser más útil fijarse en si el libro está impreso por una sola " +
              "cara: así, la tinta quedará en un reverso en blanco y no estropeará el dibujo " +
              "siguiente.",
        },
        {
          q: "¿Traspasa un libro para colorear con crayones?",
          a:
            "No. El crayón queda sobre la superficie del papel y no penetra en él como la " +
              "tinta de un rotulador. Lo mismo ocurre con los lápices de colores.",
        },
        {
          q: "¿Puedo usar rotuladores igualmente en papel fino?",
          a:
            "Sí. Coloque una hoja adicional o un trozo de cartón debajo de la página. " +
              "Recogerá la tinta que traspase y protegerá tanto la página siguiente como la " +
              "superficie de la mesa.",
        },
      ],
      ru: [
        {
          q: "Какие раскраски не пропускают фломастер?",
          a:
            "Это зависит прежде всего от плотности бумаги. Обычная бумага многих детских " +
              "раскрасок может пропускать чернила фломастера. Поэтому полезнее обращать " +
              "внимание на одностороннюю печать: тогда след останется на пустом обороте и не " +
              "испортит следующий рисунок.",
        },
        {
          q: "Проходят ли насквозь восковые мелки?",
          a:
            "Нет. Восковой мелок остается на поверхности бумаги и не впитывается в нее, как " +
              "чернила фломастера. То же относится и к обычным цветным карандашам.",
        },
        {
          q: "Можно ли все-таки пользоваться фломастерами на тонкой бумаге?",
          a:
            "Да. Просто подложите под страницу дополнительный лист бумаги или кусок картона. " +
              "Он примет на себя чернила, прошедшие насквозь, и защитит следующую страницу или " +
              "поверхность стола.",
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    id: "attention",
    slug: {
      en: "how-long-will-a-toddler-sit-and-color",
      es: "cuanto-tiempo-aguanta-coloreando-un-nino-pequeno",
      ru: "skolko-rebenok-sidit-za-raskraskoy",
    },
    stage: "aim",
    title: {
      en: "How long will a toddler actually sit and color?",
      es: "¿Cuánto tiempo suele colorear un niño pequeño?",
      ru: "Сколько времени маленький ребенок обычно занимается раскраской?",
    },
    lead: {
      en:
        "Two or three minutes at the very beginning, around five minutes for most two year olds, " +
        "and ten minutes or more once a child is staying inside the line and choosing colors on " +
        "purpose. A session that ends when the child stands up is a normal session, not a failed one.",
      es:
        "Al principio pueden bastar dos o tres minutos. Alrededor de los dos años, el " +
          "interés por una misma página suele durar unos cinco minutos y, cerca de los tres, " +
          "puede mantenerse diez minutos o más. No existe una duración exacta: si el niño se " +
          "levanta y decide hacer otra cosa, es completamente normal.",
      ru:
        "В самом начале ребенку может быть достаточно двух-трех минут. Примерно в два года " +
          "интерес к одной странице нередко сохраняется около пяти минут, а ближе к трем годам " +
          "- десять минут и дольше. Но строгой нормы нет: если ребенок встал и переключился на " +
          "другое занятие, это совершенно нормально.",
    },
    body: {
      en: [
        "Parents usually ask this question because a session ended much faster than expected and " +
        "they are trying to work out whether something is wrong. Almost always nothing is. The " +
        "expectation is what needs adjusting, not the child.",

        "Attention at this age is not a fixed quantity. The same child will spend ninety seconds on " +
        "one page and eight minutes on the next, and the difference is usually the page rather than " +
        "the day. A drawing the child recognizes and can name holds them longer than one they " +
        "cannot, for the simple reason that naming it is half of what makes it interesting.",

        "Three things reliably lengthen a session, and none of them involve asking a child to " +
        "concentrate. A subject the child knows: a dog holds a two year old better than an " +
        "elaborate fantasy creature. A drawing large enough that progress is visible after a few " +
        "strokes. And an adult sitting at the table doing the same thing on their own sheet, which " +
        "works better than any encouragement offered from across the room.",

        "Two things reliably shorten it. Asking the child to stay inside the line before they are " +
        "able to, which turns a pleasant activity into a test they keep failing. And carrying on " +
        "after the child has finished being interested, which is the moment when the crayon starts " +
        "being used on the table instead.",

        "Sessions lengthen on their own over months. There is nothing to train and no exercise to " +
        "do. What changes is the hand, the grip and the amount the child gets out of the activity, " +
        "and all three move forward without any adult effort at all.",
      ],
      es: [
        "Los padres suelen hacerse esta pregunta cuando la actividad termina mucho antes de " +
          "lo que esperaban. En la mayoría de los casos no hay motivo para preocuparse: a los " +
          "niños pequeños les cuesta permanecer mucho tiempo en una misma actividad y la " +
          "duración suele aumentar gradualmente con la edad.",

        "A esta edad, la duración puede variar mucho incluso en un mismo niño. Puede dedicar " +
          "un minuto a una página y mucho más tiempo a otra. Los dibujos familiares e " +
          "interesantes suelen mantener mejor su atención, especialmente si reconoce y puede " +
          "nombrar lo que aparece en ellos.",

        "Hay varias formas sencillas de hacer la actividad más interesante. Elija imágenes " +
          "familiares para el niño, como un perro, una pelota o su comida favorita. El dibujo " +
          "debe ser lo bastante grande para que el resultado se vea después de unos pocos " +
          "trazos. También ayuda sentarse a su lado: el adulto puede colorear su propia hoja o " +
          "simplemente hablar con el niño sobre lo que aparece en la página.",

        "En cambio, pedirle constantemente que no se salga del contorno o que termine toda " +
          "la página puede hacer que pierda el interés más rápido. Si está cansado o empieza a " +
          "distraerse, es mejor terminar la actividad y volver a ella más tarde.",

        "A medida que crece, el niño suele dedicar por sí mismo más tiempo a colorear. Se " +
          "desarrollan los movimientos de la mano, cambia la forma de sujetar el crayón o el " +
          "lápiz y la propia actividad se vuelve más comprensible e interesante. No es " +
          "necesario entrenar específicamente la duración de las sesiones.",
      ],
      ru: [
        "Родители часто задают этот вопрос, когда занятие заканчивается гораздо быстрее, чем " +
          "они ожидали. В большинстве случаев беспокоиться не о чем: маленьким детям трудно " +
          "долго заниматься одним делом, и продолжительность занятия постепенно увеличивается " +
          "с возрастом.",

        "В этом возрасте продолжительность занятия может сильно меняться даже у одного и " +
          "того же ребенка. Одну страницу он раскрашивает минуту, а другой рисунок может " +
          "увлечь его гораздо дольше. Знакомые и интересные изображения обычно удерживают " +
          "внимание лучше, особенно если ребенок может узнать и назвать то, что нарисовано.",

        "Есть несколько простых способов сделать занятие интереснее. Выбирайте знакомые " +
          "ребенку изображения, например собаку, мяч или любимую еду. Рисунок должен быть " +
          "достаточно крупным, чтобы результат был заметен уже после нескольких движений. И " +
          "полезно сидеть рядом: взрослый может раскрашивать свой лист или просто " +
          "разговаривать с ребенком о том, что изображено.",

        "А вот постоянные просьбы не выходить за контур или обязательно закончить страницу " +
          "могут, наоборот, быстро снизить интерес. Если ребенок устал или начал отвлекаться, " +
          "лучше закончить занятие и вернуться к нему позже.",

        "По мере взросления ребенок обычно сам начинает заниматься раскрашиванием дольше. " +
          "Развиваются движения руки, меняется способ держать карандаш или мелок, а само " +
          "занятие становится понятнее и интереснее. Специально тренировать продолжительность " +
          "раскрашивания не нужно.",
      ],
    },
    faq: {
      en: [
        {
          q: "My two year old colors for one minute and walks away. Is that normal?",
          a:
            "Yes. Short sessions are ordinary at two, and they get longer over months without any " +
            "intervention. Try a drawing the child can name out loud and sit down to color your own " +
            "sheet beside them: both reliably add time without asking the child to concentrate.",
        },
        {
          q: "Should I make my child finish the page?",
          a:
            "No. Finishing is an adult idea of what a coloring page is for. At this age the value is " +
            "in the marks made, not in complete coverage, and requiring completion is the most " +
            "common way children come to dislike coloring.",
        },
        {
          q: "Does coloring improve attention span?",
          a:
            "Coloring is one of many activities where children practice staying with a task, along " +
            "with building, sorting and looking at books. Time spent this way is useful, but " +
            "attention span at this age is driven mostly by ordinary development rather than by any " +
            "particular activity.",
        },
      ],
      es: [
        {
          q: "Mi hijo de dos años colorea un minuto y se va. ¿Es normal?",
          a:
            "Sí. Las sesiones cortas son completamente normales a los dos años. Pruebe con " +
              "un dibujo que el niño conozca y pueda nombrar, y siéntese a su lado para " +
              "colorear su propia hoja o hablar sobre la imagen. Si pierde el interés al cabo " +
              "de un minuto, puede terminar y volver a intentarlo en otro momento.",
        },
        {
          q: "¿Debo hacer que termine la hoja?",
          a:
            "No. Un niño pequeño no tiene que terminar de colorear todas las páginas. En " +
              "esta etapa, lo importante es el proceso: mover la mano, elegir colores e " +
              "interesarse por el dibujo. Si se cansa o quiere hacer otra cosa, puede dejar la " +
              "página y volver a ella más tarde.",
        },
        {
          q: "¿Colorear mejora la capacidad de atención?",
          a:
            "Colorear es una de las muchas actividades tranquilas en las que el niño aprende " +
              "poco a poco a permanecer más tiempo con una misma tarea. Sin embargo, la " +
              "atención depende de muchos factores y no se desarrolla gracias a una sola " +
              "actividad. Los libros para colorear pueden formar parte del juego y el " +
              "aprendizaje, pero no son un entrenamiento específico de la atención.",
        },
      ],
      ru: [
        {
          q: "Двухлетний раскрашивает минуту и уходит. Это нормально?",
          a:
            "Да. Короткие занятия в два года совершенно нормальны. Попробуйте предложить " +
              "знакомый ребенку рисунок и сядьте рядом, чтобы раскрашивать свой лист или " +
              "разговаривать о картинке. Если интерес пропал через минуту, можно закончить и " +
              "попробовать снова в другой раз.",
        },
        {
          q: "Надо ли заставлять ребенка дораскрасить страницу?",
          a:
            "Нет. Маленькому ребенку не обязательно полностью закрашивать каждую страницу. " +
              "На этом этапе важнее сам процесс: движения рукой, выбор цвета и интерес к " +
              "рисунку. Если ребенок устал или хочет заняться чем-то другим, страницу можно " +
              "оставить и вернуться к ней позже.",
        },
        {
          q: "Улучшает ли раскрашивание внимание?",
          a:
            "Раскрашивание - одно из многих спокойных занятий, во время которых ребенок " +
              "постепенно учится дольше заниматься одним делом. Но развитие внимания зависит " +
              "от множества факторов и не сводится к одному виду занятий. Раскраски могут быть " +
              "полезной частью игры и обучения, но не являются специальной тренировкой " +
              "внимания.",
        },
      ],
    },
  },
];

export const guideBySlug = (lang: ContentLang, slug: string) =>
  guides.find((g) => g.slug[lang] === slug);
