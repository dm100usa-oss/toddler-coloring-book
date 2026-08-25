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

/** Кусок статьи: либо абзац, либо подзаголовок. */
export type GuideBlock = string | { h: string };

export type Guide = {
  id: string;
  slug: Record<ContentLang, string>;
  title: Record<ContentLang, string>;
  /* Короткий ответ на вопрос статьи. Стоит сразу под заголовком.
     Именно его забирает поисковик в выдачу и нейросеть в ответ,
     поэтому он должен быть законченным ответом, а не завлекалкой. */
  lead: Record<ContentLang, string>;
  /* Текст статьи. Обычная строка это абзац. Запись вида { h: "..." }
     это подзаголовок внутри статьи.

     Подзаголовки нужны не для красоты. Нейросеть забирает со страницы
     не всю статью, а один кусок, и по заголовку она понимает, о чем
     этот кусок. Без них длинная статья для машины сплошная стена.

     Короткие статьи, где разделов нет, остаются просто списком
     абзацев: старая запись продолжает работать. */
  body: Record<ContentLang, GuideBlock[]>;
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

        "Between about twelve and eighteen months a child can leave a mark on paper on purpose and " +
        "repeat the movement to see it happen again. The crayon is usually held in the whole hand, " +
        "with the movement coming from the shoulder and elbow, so the lines are long and sweeping. " +
        "Aiming them along a drawing comes later.",

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
            "Yes, with the right kind of page. At a year old a child usually holds the crayon in the " +
            "whole hand and makes broad sweeping marks, so one large shape filling most of the sheet, " +
            "with a very thick outline and few details, suits them best. On a page like that it is easier " +
            "for a child to see the traces of their own movements and the result of what they did.",
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
            "Two or three minutes is a perfectly normal length at the very beginning. If the child has " +
            "lost interest, there is no need to ask them to finish the page. Sessions usually grow longer " +
            "as the child gets older.",
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
        "Thick wax crayons are the best place to start. They leave a visible mark without much " +
        "pressure and do not soak through the paper. Washable markers can come later, and colored " +
        "pencils later still, as the movements of the hand become more precise.",
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

        "Thick wax crayons suit first sessions for several reasons. They leave a visible mark with " +
        "almost no pressure, they are comfortable to hold in the whole hand, they have no sharp point " +
        "to catch the paper, and they do not soak through the sheet. Together that makes them a " +
        "convenient first tool for drawing.",

        "Markers give the brightest result and children love them for exactly that reason. The cost " +
        "is that they go straight through ordinary paper, so a double sided page loses the drawing " +
        "on the back, and they mark the table, clothes and skin far more readily than crayons. " +
        "Washable markers solve most of that. A spare sheet under the page solves the rest.",

        "Colored pencils call for a more precise finger grip and steadier pressure. Young children " +
        "often find them harder to use than thick crayons. They are worth trying later, once the " +
        "movements of the hand are more precise and the child wants to color smaller areas.",

        "A few smaller details are worth knowing. Thick triangular crayons sit comfortably in the " +
        "hand and help a child grow used to a more precise grip over time. A left handed child needs " +
        "no special tools, but a drawing placed in the middle of the sheet is usually more " +
        "comfortable, since the hand covers less of the picture while working.",
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
            "For young children, choose washable markers labelled non-toxic. They come off skin, clothes " +
            "and many surfaces more easily, but they can still go through paper, so it is better to put a " +
            "spare sheet underneath. Watch the caps as well: small parts should stay out of a child's " +
            "reach.",
        },
        {
          q: "My child holds the crayon in a fist. Should I correct it?",
          a:
            "No. Holding the crayon in the whole hand is completely normal in the early years. There is " +
            "no need to move a child's fingers by force: the way the crayon is held changes gradually as " +
            "the movements of the hand develop. Thick or triangular crayons can make the grip more " +
            "comfortable without any special exercises.",
        },
        {
          q: "What about paint at this age?",
          a:
            "Yes, paint suits young children too, but it is a somewhat different kind of activity. It " +
            "lets a child experiment with color, mixing and spreading paint over a surface, while " +
            "coloring with crayons or pencils has more to do with guiding the movements of the hand. The " +
            "two go well together.",
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
        "Most of the mess around coloring can be reduced in three simple ways: choose suitable " +
        "materials, give the child a large clear drawing, and end the session when the interest " +
        "fades. That is often enough to keep drawing from turning into a big clean up.",
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
        "It helps to separate two different things. The first is actual marks from crayons or markers " +
        "on the table, the walls, clothes and hands. The second is the child's own work, which may " +
        "look chaotic. Uneven lines and marks outside the outline are completely normal in the early " +
        "years and do not mean the child is drawing the wrong way.",

        "To reduce stray marks around the page, start with the materials. Wax crayons are usually " +
        "easier to remove from hard surfaces, and washable markers come off skin and many fabrics " +
        "more easily. Permanent markers are better kept away from young children.",

        "The right page helps too. A large drawing with a thick outline gives a child a clearly " +
        "visible area to color, which makes it easier to keep the movements on the sheet. That works " +
        "better than repeated requests to be careful.",

        "Session length is the quietest of the three and the most reliable. A child who has finished " +
        "being interested does not put the crayon down politely, they start testing what else the " +
        "crayon does. Ending the session at the first sign of that, rather than at the end of the " +
        "page, prevents almost all of the incidents parents remember.",

        "Two practical arrangements are worth the small effort. Put a spare sheet of paper under the " +
        "page, which catches both marker bleed and overshoot at the edges. And give one sheet at a " +
        "time rather than the open book, which removes the temptation to turn the page mid-drawing " +
        "and halves the surface area available for accidents.",

        "One thing worth knowing before you shop: mess free sets, reusable wipe-clean books and " +
        "water-reveal books each cut down on mess in their own way, and each gives a child a " +
        "different experience at the table. A separate article on this site compares all four " +
        "kinds and says where each one fits.",
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

        "Conviene saber además que los productos «sin manchas», los libros reutilizables de " +
          "superficie borrable y los libros que funcionan con agua reducen la suciedad cada uno " +
          "a su manera, y cada uno ofrece al niño una experiencia distinta. En este sitio hay un " +
          "artículo aparte que compara los cuatro tipos y explica cuándo conviene cada uno.",
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

        "Стоит знать и о том, что наборы «без грязи», многоразовые раскраски со стираемым " +
          "покрытием и водные раскраски уменьшают беспорядок каждый по-своему и дают ребенку " +
          "разный опыт. На сайте есть отдельная статья, где все четыре вида сравниваются между " +
          "собой и сказано, когда какой уместен.",
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
        "Ordinary paper in coloring books often lets marker ink through. The simplest solution is to " +
        "slip an extra sheet of paper or card under the page. It is more convenient still when a book " +
        "is printed on one side only: the ink may then mark a blank back rather than spoiling the " +
        "next drawing.",
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
        "Marker ink often goes through the paper in children's coloring books, and that does not " +
        "necessarily mean the book is badly printed. Paper heavy enough to hold the ink is thicker " +
        "and more expensive, and it adds noticeably to the weight and the price of a book. That is " +
        "why many children's coloring books use ordinary paper and solve the problem with single " +
        "sided printing or a spare sheet under the page.",

        "The simplest solution takes a few seconds: put a clean sheet of paper or thin card under the " +
        "page the child is coloring. Whatever soaks through lands on it. It is worth doing straight " +
        "away when markers come out, rather than after the next drawing has been spoiled.",

        "When choosing a book, look at whether it is printed on one side only. If the back of every " +
        "drawing is blank, marker ink that goes through the paper will not spoil the next picture. " +
        "That is particularly convenient for children who like coloring with markers.",

        "You can also change the tool. Wax crayons and colored pencils do not soak through the paper, " +
        "which makes them more convenient than markers on thin paper. If it does not matter to the " +
        "child whether they use markers, that is the simplest way to avoid marks on the back.",

        "It is better not to dry a page with a hairdryer, press it with an iron, or try to remove the " +
        "ink with solvent. None of that removes marks that have already gone through the paper, and " +
        "it can damage the page.",
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
            "It depends mainly on the weight of the paper. The ordinary paper used in many children's " +
            "coloring books can let marker ink through. It is more useful to look for single sided " +
            "printing: the mark then lands on a blank back rather than spoiling the next drawing.",
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
        "Two or three minutes may be enough at the very beginning. At around two the interest in one " +
        "page often lasts about five minutes, and closer to three it may last ten minutes or longer. " +
        "There is no strict norm, though: if a child gets up and moves on to something else, that is " +
        "completely normal.",
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

        "At this age the length of a session can vary a great deal, even for the same child. One page " +
        "may hold them for a minute while another drawing keeps them much longer. Familiar and " +
        "interesting pictures usually hold attention better, especially when a child can recognize " +
        "and name what is drawn.",

        "There are a few simple ways to make a session more interesting. Choose pictures the child " +
        "knows, such as a dog, a ball or a favorite food. The drawing should be large enough for the " +
        "result to show after a few strokes. And it helps to sit alongside: an adult can color their " +
        "own sheet or simply talk with the child about the picture.",

        "Repeated requests to stay inside the outline, or to finish the page, can have the opposite " +
        "effect and cut the interest short. If a child is tired or starting to be distracted, it is " +
        "better to end the session and come back to it later.",

        "As children grow, they usually begin to spend longer on coloring by themselves. The " +
        "movements of the hand develop, the way the crayon or pencil is held changes, and the " +
        "activity itself becomes clearer and more interesting. There is no need to train the length " +
        "of a coloring session.",
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
            "Yes. Short sessions are completely normal at two. Try offering a drawing the child knows and " +
            "sit down beside them, either coloring your own sheet or talking about the picture. If the " +
            "interest fades after a minute, you can stop and try again another time.",
        },
        {
          q: "Should I make my child finish the page?",
          a:
            "No. A young child does not have to color every page completely. At this stage the process " +
            "matters more: the movements of the hand, the choice of color and the interest in the " +
            "picture. If the child is tired or wants to do something else, the page can be left and " +
            "picked up later.",
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
  /* ---------------------------------------------------------------- */
  /* Сравнение видов раскрасок между собой. Родитель спрашивает "какую
     взять", и до этой статьи страницы, отвечающей на это прямо, на
     сайте не было. Сравнения нейросети разбирают охотнее всего:
     из них удобно собирать ответ. */
  {
    id: "types",
    slug: {
      en: "types-of-coloring-books-for-toddlers",
      es: "tipos-de-libros-para-colorear-para-ninos-pequenos",
      ru: "vidy-raskrasok-dlya-malyshey",
    },
    title: {
      en: "Types of coloring books for toddlers: traditional, reusable, water-reveal and mess-free",
      es: "Tipos de libros para colorear para niños pequeños: tradicional, reutilizable, con agua y sin manchas",
      ru: "Виды раскрасок для малышей: обычная, многоразовая, водная и без грязи",
    },
    lead: {
      en: "For a child who is just beginning to draw, a traditional paper coloring book with thick outlines is usually the best place to start. It is inexpensive, it is okay if a page gets torn or ruined, and most importantly, the child can see a real mark made by their own hand. Reusable, water-reveal and mess-free coloring books have their own advantages: they reduce cleanup, save paper and can be convenient for travel. The best choice depends on what matters most to you at the moment.",
      es: "Para un niño que apenas empieza a dibujar, lo mejor suele ser un libro para colorear tradicional, de papel, con contornos gruesos. Es económico, no pasa nada si alguna página se estropea y, lo más importante, el niño puede ver la huella real que deja con su propia mano. Los libros reutilizables, los que funcionan con agua y los que no manchan también tienen sus ventajas: requieren menos limpieza, permiten ahorrar papel y son cómodos para llevar de viaje. Por eso, la elección depende de lo que sea más importante para usted en cada momento.",
      ru: "Для ребенка, который только начинает рисовать, лучше всего подходит обычная бумажная раскраска с толстым контуром. Она недорогая, ее не жалко испортить, а главное - ребенок видит настоящий след от своей руки. Многоразовые, водные и раскраски без грязи удобны по-своему: с ними меньше уборки, не нужно постоянно расходовать бумагу, их удобно брать в дорогу. Поэтому выбирать стоит в зависимости от того, что вам сейчас важнее.",
    },
    body: {
      en: [
        "When parents choose a coloring book for their toddler for the first time, they often find several very different products sitting next to one another on the same shelf. They may all be called coloring books, but they work differently and give children different experiences. Here is how the main types compare and when each one can be useful.",
        { h: "Traditional paper coloring books" },
        "These are regular paper pages with printed outlines that children color with crayons, colored pencils or markers.",
        "What they offer. The child makes a real mark that stays on the page. For a toddler, this is one of the most important discoveries in early drawing: I moved my hand, and a line appeared on the paper. The page can be saved, displayed on the refrigerator, dated or kept in a folder. A few months later, you can look back and see how your child's lines and drawings have changed.",
        "Limitations. The pages get used up. A toddler may tear or crumple a page, and that is completely normal at this age. Markers may also bleed through thin paper.",
        "When they work best. From the beginning, often around twelve to eighteen months, when a child starts making intentional marks on paper. Traditional paper coloring books are the basic option. The other types are better viewed as additions rather than replacements.",
        { h: "Reusable coloring books with wipe-clean pages" },
        "These coloring books have laminated pages or pages made from a durable plastic-like material. Children draw with a dry-erase marker, wipe the page clean and use it again.",
        "What they offer. The same page can be colored many times. This can be especially useful when a child loves one particular picture and wants to return to it again and again. Reusable books last a long time and are easy to take along.",
        "Limitations. A smooth wipe-clean surface feels different from paper. The marker glides more easily, so the child does not experience the same resistance as with paper and a crayon or pencil. The finished picture also disappears when it is erased, so you cannot save it and look back later to see how the child's drawing has changed.",
        "When they work best. As a supplement to traditional paper coloring. They can be especially convenient in the car, on an airplane or while waiting at a doctor's office.",
        { h: "Water-reveal coloring books" },
        "At first, the page may look almost blank. The child moves a brush or special water-filled pen across it, and colors appear. After the page dries, the colors fade and the page can be used again.",
        "What they offer. This is one of the cleanest options, because plain water does not leave colorful marks on clothing or furniture. Young children often enjoy watching the picture appear. A chunky water pen may also be easier for a toddler to hold than a regular pencil.",
        "Limitations. The child does not choose the colors independently. The colors are already built into the page and simply appear when they come into contact with water. For that reason, this activity is closer to revealing a prepared picture than traditional coloring. It gives less practice with choosing colors and filling in an outlined area.",
        "When they work best. Water-reveal books can be introduced fairly early, around age one. They are a simple way for a child to discover the idea that when I move my hand, something happens on the page. They are also useful for travel or visits. A water-reveal book can be used before a traditional coloring book or alongside one.",
        { h: "Mess-free coloring books" },
        "These products use special markers that show color only on the paper designed to work with them. The markers do not normally produce visible color on ordinary tables, walls, hands or clothing.",
        "What they offer. The main advantage is obvious: there is much less risk of ending up with marker on the table, clothing or walls. For parents of toddlers, that can make coloring much easier to manage.",
        "Limitations. The markers work only with their special paper. When the pages are gone, you need replacement pages or another set. On a per-page basis, this option is often more expensive than an ordinary paper coloring book. The child is also using a material that behaves differently from regular crayons and markers, which leave marks on many surfaces.",
        "When they work best. When avoiding stains and minimizing cleanup are especially important, at home, while traveling or during activities with a group of children.",
        { h: "How to choose" },
        "If your child is around one year old and just beginning to draw, choose a simple paper coloring book with very thick outlines and one large picture per page. A water-reveal book can be used alongside it.",
        "For travel, reusable and water-reveal coloring books can be convenient, because they are easy to carry and help keep mess to a minimum.",
        "If your child colors at home and you are constantly cleaning marks from different surfaces, a mess-free coloring book may be worth trying. But it is still useful to keep regular paper and traditional drawing materials available.",
        "For a group of children, ordinary paper coloring pages are often the simplest and least expensive choice. Each child can have a separate page, and a torn or spoiled sheet is easy to replace.",
        "There is also one general rule that matters more than the type of coloring book. For a toddler, four features are especially helpful: thick outlines, one large picture per page, a familiar object or character, and printing on only one side of the sheet. A beautiful reusable book filled with tiny details may be less suitable for a young child than a simple page with one big elephant.",
      ],
      es: [
        "Cuando los padres eligen por primera vez un libro para colorear para su pequeño, se encuentran con varias opciones muy diferentes. En la tienda pueden estar unas junto a otras y llamarse todas libros para colorear, aunque funcionan de manera distinta y ofrecen experiencias diferentes al niño. Veamos en qué se diferencian y cuándo conviene utilizar cada una.",
        { h: "Libro para colorear tradicional de papel" },
        "Es una hoja de papel con un dibujo impreso que el niño colorea con crayones, lápices de colores o rotuladores.",
        "Qué aporta. El niño deja una huella real que no desaparece. Para un pequeño, este es uno de los principales descubrimientos de sus primeras experiencias con el dibujo: mueve la mano y aparece una línea sobre el papel. La página se puede guardar, colocar en el refrigerador, marcar con la fecha o archivar en una carpeta. Después de unos meses será interesante observar cómo han cambiado las líneas y los dibujos del niño.",
        "Limitaciones. Las páginas se gastan. El niño puede romper o arrugar alguna, y a esta edad es completamente normal. Además, los rotuladores pueden traspasar el papel si es demasiado fino.",
        "Cuándo conviene. Desde el principio, aproximadamente entre los doce y los dieciocho meses, cuando el niño empieza a dejar marcas sobre el papel de manera intencionada. Este es el tipo básico de libro para colorear. Las demás opciones sirven más como complemento que como sustituto.",
        { h: "Libro para colorear reutilizable con superficie borrable" },
        "Las páginas están plastificadas o impresas sobre un material plástico resistente. El niño dibuja con un rotulador borrable en seco y después se puede limpiar la página con un paño para volver a utilizarla.",
        "Qué aporta. La misma página se puede colorear muchas veces. Resulta especialmente útil cuando al niño le gusta una imagen determinada y quiere volver a ella una y otra vez. El libro dura mucho tiempo y es cómodo para llevar fuera de casa.",
        "Limitaciones. La superficie lisa se comporta de manera diferente al papel. El rotulador se desliza con mayor facilidad, por lo que el niño no siente la misma resistencia que ofrecen el papel y un crayón o un lápiz. Además, el dibujo termina borrándose: no se puede guardar para observar más adelante cómo ha cambiado el dibujo del niño.",
        "Cuándo conviene. Como complemento de un libro tradicional de papel. Es especialmente práctico en el automóvil, en el avión o, por ejemplo, mientras se espera en la consulta del médico.",
        { h: "Libro para colorear con agua" },
        "Al principio, la página parece casi vacía. El niño pasa sobre ella un pincel o un rotulador especial lleno de agua y la imagen empieza a mostrar sus colores. Después de un tiempo, la página se seca y vuelve a quedar casi vacía.",
        "Qué aporta. Es una de las opciones más limpias: el agua no deja manchas de color en la ropa ni en los muebles. A los niños suele gustarles el efecto de ver cómo aparece la imagen. Además, un rotulador grueso de agua suele ser más fácil de sujetar para un pequeño que un lápiz convencional.",
        "Limitaciones. El niño no elige los colores por sí mismo: ya están incorporados en la página y simplemente aparecen al entrar en contacto con el agua. Por eso, se parece más a un juego en el que se revela una imagen preparada de antemano que al coloreado tradicional. La práctica específica de colorear es menor.",
        "Cuándo conviene. Se puede ofrecer bastante pronto, aproximadamente desde el año de edad. Es una buena forma de descubrir por primera vez que al mover la mano algo aparece en la página, y también resulta práctico para viajes o visitas. Puede utilizarse antes de un libro tradicional de papel o junto con él.",
        { h: "Libro para colorear sin manchas" },
        "Utiliza rotuladores especiales cuyo color aparece únicamente sobre el papel diseñado para ellos. En una mesa normal, las paredes, las manos o la ropa, el color de estos rotuladores no aparece.",
        "Qué aporta. Su principal ventaja es evidente: reduce considerablemente el riesgo de terminar con la mesa, la ropa o las paredes pintadas. Para los padres de niños pequeños puede ser una solución muy cómoda.",
        "Limitaciones. Los rotuladores solo funcionan con el papel especial. Cuando se terminan las páginas, es necesario comprar otro juego o páginas adicionales. Calculado por página, este sistema suele resultar más caro que un libro tradicional de papel. Además, el niño se acostumbra a utilizar un material que no deja marcas en otras superficies, mientras que los lápices y rotuladores convencionales se comportan de otra manera.",
        "Cuándo conviene. Cuando es especialmente importante evitar manchas y reducir la limpieza. Por ejemplo, en casa, durante un viaje o en actividades con un grupo de niños.",
        { h: "Cómo elegir" },
        "Si el niño tiene alrededor de un año y apenas empieza a dibujar, elija un libro sencillo de papel con contornos muy gruesos y un solo dibujo grande por página. También puede utilizar junto a él un libro para colorear con agua.",
        "Si va de viaje, los libros reutilizables o los que funcionan con agua son opciones cómodas: ocupan poco espacio y ayudan a evitar manchas.",
        "Si el niño dibuja en casa y usted tiene que limpiar constantemente diferentes superficies, puede probar un libro para colorear sin manchas. Sin embargo, también conviene mantener el papel tradicional entre los materiales que utiliza habitualmente.",
        "Si necesita libros para colorear para un grupo de niños, las hojas de papel tradicionales suelen ser la opción más sencilla y económica: cada niño puede recibir su propia página y una hoja estropeada se sustituye fácilmente.",
        "Y hay una regla general que es más importante que el tipo de libro. Para un niño pequeño son especialmente importantes cuatro cosas: un contorno grueso, un solo dibujo grande por página, un objeto o personaje reconocible y la impresión en una sola cara de la hoja. Un bonito libro reutilizable lleno de pequeños detalles puede resultar menos adecuado para un niño pequeño que una sencilla hoja con un elefante grande.",
      ],
      ru: [
        "Родитель, который впервые выбирает раскраску для малыша, сталкивается с несколькими совершенно разными вариантами. В магазине они могут лежать рядом и называться раскрасками, хотя устроены по-разному и дают ребенку разный опыт. Разберемся, чем они отличаются и когда какой вариант лучше использовать.",
        { h: "Обычная бумажная раскраска" },
        "Это лист бумаги с напечатанным контуром, который ребенок раскрашивает мелками, карандашами или фломастерами.",
        "Что это дает. Ребенок оставляет настоящий след, который не исчезает. Для малыша это одно из главных открытий первых занятий рисованием: он провел рукой - и на бумаге появилась линия. Страницу можно сохранить, повесить на холодильник, подписать датой или убрать в папку. Через несколько месяцев будет интересно посмотреть, как изменились линии и рисунки ребенка.",
        "Ограничения. Такие раскраски расходуются. Ребенок может порвать или смять страницу, и в этом возрасте это совершенно нормально. А фломастеры могут просвечивать или проходить сквозь тонкую бумагу.",
        "Когда уместно. С самого начала, примерно с двенадцати-восемнадцати месяцев, когда ребенок начинает осознанно оставлять следы на бумаге. Это основной вид раскраски. Остальные варианты скорее дополняют его, чем заменяют.",
        { h: "Многоразовая раскраска со стираемым покрытием" },
        "Страницы такой раскраски заламинированы или напечатаны на плотном пластике. Ребенок рисует маркером сухого стирания, затем рисунок можно стереть тряпочкой и начать заново.",
        "Что это дает. Одну и ту же страницу можно раскрашивать много раз. Это особенно удобно, если ребенку нравится определенная картинка и он хочет возвращаться к ней снова и снова. Раскраска долго не заканчивается, ее удобно брать с собой.",
        "Ограничения. Скользкая поверхность отличается от обычной бумаги. Маркер движется по ней легче, поэтому ребенок не чувствует того же сопротивления, которое дают бумага и мелок или карандаш. Кроме того, рисунок потом стирается - его нельзя сохранить и через некоторое время посмотреть, как изменились рисунки ребенка.",
        "Когда уместно. Как дополнение к обычной бумажной раскраске. Особенно удобно использовать ее в машине, самолете или, например, во время ожидания у врача.",
        { h: "Водная раскраска" },
        "Страница сначала выглядит почти пустой. Ребенок проводит по ней кисточкой или специальным маркером, наполненным обычной водой, и изображение становится цветным. Через некоторое время страница высыхает и снова становится почти пустой.",
        "Что это дает. Это один из самых чистых вариантов: вода не оставляет цветных следов на одежде и мебели. Детям обычно нравится сам эффект появления картинки. Кроме того, толстый водный маркер малышу часто легче держать, чем обычный карандаш.",
        "Ограничения. Ребенок не выбирает цвета самостоятельно - они уже заложены в странице и просто проявляются при контакте с водой. Поэтому это скорее игра с появлением готового изображения, чем обычное раскрашивание. Навык раскрашивания здесь тренируется меньше.",
        "Когда уместно. Такой вариант можно предлагать довольно рано, примерно с года. Он хорошо подходит для первого знакомства с принципом «двигаю рукой - на странице что-то появляется», а также для дороги или гостей. Водная раскраска может использоваться перед обычной бумажной или вместе с ней.",
        { h: "Раскраска без грязи" },
        "Для нее используются специальные маркеры, которые проявляют цвет только на предназначенной для них бумаге. На обычном столе, обоях, руках или одежде цвет от такого маркера не появляется.",
        "Что это дает. Главное преимущество понятно сразу: значительно меньше риск получить разрисованный стол, одежду или стены. Для родителей маленьких детей это действительно удобно.",
        "Ограничения. Маркеры работают только со специальной бумагой. Когда страницы заканчиваются, приходится покупать новый набор или дополнительные листы. В пересчете на одну страницу такой вариант обычно обходится дороже обычной бумажной раскраски. Кроме того, ребенок привыкает к материалу, который не оставляет следов на окружающих поверхностях, тогда как обычные карандаши и фломастеры ведут себя иначе.",
        "Когда уместно. Когда особенно важно избежать пятен и лишней уборки. Например, дома, в дороге или при занятиях с группой детей.",
        { h: "Как выбирать" },
        "Если ребенку около года и он только начинает рисовать, выбирайте простую бумажную раскраску с очень толстым контуром и одним крупным рисунком на странице. Рядом можно использовать и водную раскраску.",
        "Если вы собираетесь в дорогу, удобны многоразовые или водные раскраски: они занимают мало места и помогают избежать пятен.",
        "Если ребенок рисует дома, а вам постоянно приходится отмывать поверхности, можно попробовать раскраски без грязи. Но обычную бумагу тоже стоит оставить для регулярных занятий.",
        "Если вы выбираете раскраски для группы детей, обычные бумажные листы часто оказываются самым простым и недорогим вариантом: каждому ребенку можно дать отдельную страницу, а испорченный лист легко заменить.",
        "И есть общее правило, которое важнее самого вида раскраски. Для малыша особенно важны четыре вещи: толстый контур, один крупный рисунок на странице, узнаваемый предмет или персонаж и печать только с одной стороны листа. Красивая многоразовая книжка с множеством мелких деталей может оказаться менее удобной для малыша, чем простой лист с большим слоном.",
      ],
    },
    faq: {
      en: [
        {
          q: "What type of coloring book is best for a one year old?",
          a: "Start with a traditional paper coloring book that has one large picture covering most of the page and a thick outline. A water-reveal coloring book can also be useful at this age because it creates very little mess, although the child does not choose the colors independently: they appear when the page gets wet. The two types can easily be used together at home.",
        },
        {
          q: "Is a reusable coloring book better because it never runs out?",
          a: "Not necessarily. It simply has different advantages. It lasts a long time, creates little mess and is convenient for travel. But the finished picture is erased, and the smooth surface feels different from regular paper. For early drawing experiences, paper remains valuable, while a reusable coloring book works well as an additional option.",
        },
        {
          q: "Do water-reveal coloring books really count as drawing?",
          a: "They are somewhere in between. The child moves water across the page, and the colors built into the paper appear automatically. The child cannot choose those colors independently. It is an engaging way to discover that moving a hand can change what appears on a page, but traditional coloring gives a child a different experience.",
        },
        {
          q: "Is a mess-free coloring book worth buying if my child draws on the walls?",
          a: "It can definitely reduce unwanted marks while the child is using the special markers and paper. However, a mess-free system does not by itself teach a child where drawing is and is not allowed. It is still useful to gradually introduce regular paper and traditional drawing materials.",
        },
        {
          q: "Can I make a reusable coloring page myself?",
          a: "Yes. Put a regular printed coloring page inside a clear plastic sheet protector and draw over it with a dry-erase marker. It is a simple, inexpensive way to turn almost any coloring page, including the free printable pages on this site, into a reusable activity.",
        },
      ],
      es: [
        {
          q: "¿Con qué tipo de libro para colorear es mejor empezar al año de edad?",
          a: "Con uno tradicional de papel, en el que un dibujo grande ocupe casi toda la página y esté rodeado por un contorno grueso. También puede utilizarse un libro para colorear con agua: casi no mancha, aunque el niño no elige los colores por sí mismo, ya que aparecen al entrar en contacto con el agua. Ambos tipos pueden utilizarse juntos en casa.",
        },
        {
          q: "¿Es mejor un libro reutilizable que uno tradicional porque no se acaba?",
          a: "No necesariamente. Simplemente tiene otras ventajas: dura mucho tiempo, casi no mancha y resulta cómodo para los viajes. Sin embargo, el dibujo se borra y la superficie lisa es diferente al papel tradicional. Por eso, para las primeras experiencias con el dibujo, el papel sigue siendo importante y el libro reutilizable funciona bien como complemento.",
        },
        {
          q: "¿Los libros para colorear con agua realmente cuentan como dibujo?",
          a: "Son más bien una opción intermedia. El niño pasa agua sobre la página y los colores incorporados en el papel aparecen automáticamente. No puede elegirlos por sí mismo. Es una forma interesante de descubrir cómo el movimiento de la mano modifica una imagen en la página, pero el coloreado tradicional ofrece al niño una experiencia diferente.",
        },
        {
          q: "¿Vale la pena comprar un libro para colorear sin manchas si el niño pinta las paredes?",
          a: "Realmente ayuda a evitar manchas mientras el niño utiliza los rotuladores y el papel especiales. Sin embargo, este tipo de libro no enseña por sí solo dónde se puede dibujar y dónde no. Por eso, también conviene introducir poco a poco el papel y los materiales de dibujo tradicionales.",
        },
        {
          q: "¿Puedo hacer yo mismo un libro para colorear reutilizable?",
          a: "Sí. Se puede colocar una página impresa normal dentro de una funda de plástico transparente y dibujar sobre ella con un rotulador borrable en seco. Es una forma sencilla y económica de convertir prácticamente cualquier hoja, incluidas las páginas gratuitas de este sitio, en una página reutilizable.",
        },
      ],
      ru: [
        {
          q: "С какой раскраски лучше начинать в год?",
          a: "С обычной бумажной, где один крупный рисунок занимает почти всю страницу и обведен толстой линией. Для начала подойдет и водная раскраска: она почти не пачкает, хотя ребенок не выбирает цвета самостоятельно - они проявляются при контакте с водой. Эти два вида раскрасок вполне можно использовать дома вместе.",
        },
        {
          q: "Многоразовая раскраска лучше обычной, раз она не заканчивается?",
          a: "Не обязательно. У нее просто другие преимущества: она долго служит, почти не пачкает и удобна в дороге. Но рисунок стирается, а гладкая поверхность отличается от обычной бумаги. Поэтому для первых занятий бумажная раскраска остается важной, а многоразовую удобно использовать как дополнение.",
        },
        {
          q: "Водные раскраски вообще считаются рисованием?",
          a: "Это скорее промежуточный вариант. Ребенок проводит по странице водой, а заложенные в бумаге цвета проявляются сами. Выбирать цвета самостоятельно он не может. Это интересное первое знакомство с тем, как движение руки меняет изображение на странице, но обычное раскрашивание дает ребенку другой опыт.",
        },
        {
          q: "Стоит ли покупать раскраску без грязи, если ребенок рисует на стенах?",
          a: "Она действительно помогает избежать пятен, пока ребенок пользуется специальными маркерами и бумагой. Но сама по себе такая раскраска не объясняет ребенку, где можно рисовать, а где нельзя. Поэтому обычную бумагу и обычные материалы для рисования тоже стоит постепенно вводить.",
        },
        {
          q: "Можно ли сделать многоразовую раскраску самому?",
          a: "Да. Обычную распечатанную страницу можно вложить в прозрачный файл и рисовать поверх него маркером сухого стирания. Это простой и недорогой способ превратить практически любой лист, в том числе бесплатные страницы с этого сайта, в многоразовый.",
        },
      ],
    },
  },
  /* ---------------------------------------------------------------- */
  /* Что означают надписи на упаковке. Здесь только объяснение
     маркировки и ссылки на первоисточники, без оценки товаров и без
     медицинских утверждений.

     Отдельно про размер мелка. Распространенное объяснение, будто
     детские мелки делают толстыми из-за запрета на мелкие детали,
     неверно: письменные принадлежности выведены из-под этого запрета
     прямо, в 16 CFR 1501.3. В статье это сказано вслух, потому что
     ошибку повторяют многие. */
  {
    id: "labels",
    slug: {
      en: "what-crayon-labels-mean",
      es: "que-significan-las-indicaciones-de-una-caja-de-crayones",
      ru: "chto-napisano-na-upakovke-melkov",
    },
    title: {
      en: "What the labels on a box of crayons actually mean",
      es: "Qué significan las indicaciones de una caja de crayones",
      ru: "Что написано на упаковке мелков и что это значит",
    },
    lead: {
      en: "In the United States, art materials are subject to federal labeling requirements, and the statement Conforms to ASTM D-4236 is commonly found on their packaging. It tells you that the product has been evaluated and labeled under the applicable requirements, but by itself it does not make one box of crayons better than another. The voluntary AP Seal from ACMI adds information: it identifies art materials evaluated through ACMI's certification program that meet its criteria. The CL Seal is used for products that require cautionary labeling and is not used on children's art materials.",
      es: "En Estados Unidos los materiales de arte están sujetos a requisitos federales de etiquetado, y por eso la indicación Conforms to ASTM D-4236 aparece en la mayoría de los envases. Significa que el producto ha sido evaluado y etiquetado conforme a esos requisitos, pero por sí sola no permite distinguir un producto de otro. El sello AP de ACMI es voluntario y aporta información adicional: identifica materiales evaluados dentro del programa de certificación de ACMI que cumplen sus criterios. El sello CL se utiliza en productos que requieren etiquetado de precaución y no se utiliza en materiales infantiles.",
      ru: "В США к товарам для творчества применяются федеральные требования к оценке и маркировке, поэтому надпись Conforms to ASTM D-4236 встречается почти на любой упаковке. Она говорит, что товар оценили и подписали по этим требованиям, но сама по себе не делает один набор мелков лучше другого. Печать AP от ACMI добровольная и дает дополнительную информацию: товар прошел оценку в программе ACMI и отвечает ее критериям. Печать CL ставится на товары, которым нужны предупреждения, и на детских товарах не используется.",
    },
    body: {
      en: [
        "A parent standing in a store may see several statements, symbols and seals on a box of crayons. At first glance, it can be difficult to tell which ones matter. Some markings are connected to federal requirements, while others come from voluntary certification programs. Here is what the most common ones actually mean.",
        "A quick note before we begin: this article describes United States rules and labeling. It explains what the labels mean, and it does not evaluate the safety of any particular product or provide medical advice. Always follow the manufacturer's age recommendations, instructions and warnings. Questions about your child's health are best discussed with a pediatrician or another qualified healthcare professional.",
        { h: "Conforms to ASTM D-4236: what it means" },
        "This is one of the most common statements found on art material packaging, and it is easy to misunderstand.",
        "The Labeling of Hazardous Art Materials Act, or LHAMA, was enacted in 1988 and amended the Federal Hazardous Substances Act. Its requirements are reflected in 16 CFR 1500.14. Art materials offered for sale to consumers in the United States must undergo a toxicological assessment for potential chronic health hazards, and that assessment must be reviewed at least every five years. Art materials must also carry an appropriate statement of conformance, such as Conforms to ASTM D-4236, whenever practicable.",
        "The important point is that this statement is not a special award or a premium safety seal. It is part of the regulatory framework for art materials. If a product presents hazards that require warnings, those warnings must appear in the labeling. So when you are comparing two boxes of crayons, the ASTM D-4236 statement alone does not tell you that one is a better choice than the other.",
        "Source: United States Consumer Product Safety Commission, Art Materials guidance.",
        { h: "The AP Seal: a voluntary certification" },
        "ACMI, the Art and Creative Materials Institute, is a nonprofit organization rather than a government agency. Its certification program is voluntary, which means an ACMI seal tells you something beyond the basic fact that a product is sold as an art material in the United States.",
        "AP stands for Approved Product. According to ACMI, the AP Seal identifies art materials evaluated in its certification program by a board-certified toxicologist and found to contain no materials in sufficient quantities to be toxic or injurious to humans, including children, or to cause acute or chronic health problems as defined by the applicable standards. ACMI specifically recommends looking for the AP Seal when choosing creative materials for younger children.",
        { h: "What the CL Seal means" },
        "CL stands for Cautionary Labeling. The CL Seal identifies art materials that require cautionary labeling for known health risks and that carry information about their proper use. ACMI states that the CL Seal does not appear on children's art materials and that products carrying it should not be given to children in sixth grade or younger. So for a toddler, a product with the CL Seal is not the right choice.",
        "Source: Art and Creative Materials Institute, Materials Safety guidance.",
        { h: "What about the word non-toxic?" },
        "The words non-toxic on a package are not the same thing as the ACMI AP Seal. The AP Seal represents certification through a specific ACMI program and a toxicological evaluation under that program, while a stand-alone non-toxic claim on packaging is simply a statement by the manufacturer.",
        "That does not mean a manufacturer using the term non-toxic is making a misleading claim. It simply means that a general statement on a package and a specific third-party certification seal are not the same thing.",
        { h: "Crayon size and choking hazards" },
        "Size matters when you are choosing art materials for a toddler, but there is a detail in the United States rules that is worth knowing, because it is often described incorrectly.",
        "Federal small parts rules use a special test cylinder to identify objects that may present a choking, aspiration or ingestion hazard for children under three. The cylinder is approximately 2.25 inches long and 1.25 inches wide. However, writing materials such as crayons, chalk, pencils and pens are specifically exempt from the small parts ban, and that exemption is listed in 16 CFR 1501.3. Paper articles and paint sets appear on the same list of exemptions.",
        "So it would not be correct to say that crayons for toddlers are made thick because thinner ones are prohibited under that rule. Thick crayons are easier for a small hand to hold and leave a broad, visible mark, and that is reason enough to choose them.",
        "For parents, the practical advice is simpler: choose crayons that the manufacturer intends for your child's age, look at whether the size and shape suit small hands, follow the warnings and instructions on the package, and stay nearby while your child is drawing.",
        "Source: United States Code of Federal Regulations, 16 CFR Part 1501.",
        { h: "Lead in paint and surface coatings" },
        "Lead in paint and similar surface coatings is regulated separately in the United States. Under 16 CFR Part 1303, paint and similar surface coatings subject to the rule may not contain lead in excess of 0.009 percent, or 90 parts per million. Parents do not need to test for lead themselves in a store: these requirements apply to the products and coatings covered by the regulation.",
        "Source: United States Consumer Product Safety Commission.",
        { h: "Age recommendations on the package" },
        "The age recommendation on a box is useful, because it tells you the age group the manufacturer intends the product for.",
        "But two boxes labeled for the same age can still be quite different. The crayons may differ in thickness, length, shape or ease of use. So it helps to look at the product itself as well as at the number on the package, and to read the manufacturer's instructions and warnings.",
        { h: "What to check in the store in thirty seconds" },
        "Look for the AP Seal. Its absence does not by itself mean a product is unsafe, but the seal tells you the product went through ACMI certification and a toxicological evaluation.",
        "If you see a CL Seal, that product is not intended for a toddler. ACMI does not use the CL Seal on children's art materials.",
        "Check the manufacturer's age recommendation and read any warnings or special instructions.",
        "Look at the size and shape of the crayons and consider whether they suit your child's stage of development.",
        "And there is one thing no label or certification can replace: at this age a child colors with an adult nearby.",
      ],
      es: [
        "Los padres llegan a una tienda y encuentran en una caja de crayones varias indicaciones, símbolos y sellos. A simple vista es difícil saber cuáles son realmente importantes. Algunas marcas son obligatorias por ley y, por eso, aparecen en prácticamente todos los productos. Otras proceden de programas de certificación voluntarios. Veamos qué significa cada una.",
        "Antes de empezar, una aclaración: a continuación hablamos de las normas de Estados Unidos. Explicamos el significado de las diferentes indicaciones y certificaciones, pero no evaluamos la seguridad de productos concretos ni ofrecemos recomendaciones médicas. Conviene seguir siempre las recomendaciones de edad, las instrucciones y las advertencias del fabricante. Las cuestiones relacionadas con la salud del niño es mejor consultarlas con un pediatra u otro profesional sanitario.",
        { h: "Conforms to ASTM D-4236: qué significa" },
        "Es una de las frases más frecuentes en los envases de materiales de arte y manualidades, y su significado suele interpretarse de forma incorrecta.",
        "En 1988 se aprobó en Estados Unidos la ley sobre el etiquetado de materiales de arte potencialmente peligrosos, conocida como LHAMA, que modificó la ley federal sobre sustancias peligrosas. Los requisitos correspondientes se reflejan en 16 CFR 1500.14. Los materiales de arte que se venden a los consumidores en Estados Unidos deben someterse a una evaluación toxicológica sobre posibles efectos crónicos para la salud, y esa evaluación debe revisarse al menos una vez cada cinco años. Además, el producto debe incluir una declaración de conformidad, como Conforms to ASTM D-4236, siempre que resulte posible.",
        "Lo importante es que esta frase no es un premio ni un sello especial de seguridad: forma parte del marco normativo de los materiales de arte. Si un producto presenta riesgos que requieren advertencias, esas advertencias deben aparecer en el etiquetado. Por eso, al comparar dos cajas de crayones, la declaración de conformidad con ASTM D-4236 por sí sola no indica que una sea mejor opción que la otra.",
        "Fuente: Comisión de Seguridad de Productos del Consumidor de Estados Unidos, sección sobre materiales de arte.",
        { h: "El sello AP: una certificación voluntaria" },
        "ACMI, el Art and Creative Materials Institute, es una organización sin fines de lucro y no un organismo gubernamental. La participación en su programa de certificación es voluntaria, de modo que un sello de ACMI aporta información que va más allá del simple hecho de que el producto se venda como material de arte en Estados Unidos.",
        "AP significa Approved Product, producto aprobado. Según ACMI, el sello AP identifica materiales de arte evaluados dentro de su programa de certificación por un toxicólogo colegiado, que no contienen materiales en cantidades suficientes para resultar tóxicos o dañinos para las personas, incluidos los niños, ni para causar problemas de salud agudos o crónicos según las normas aplicables. ACMI recomienda expresamente buscar el sello AP al elegir materiales creativos para los niños más pequeños.",
        { h: "Qué significa el sello CL" },
        "CL significa Cautionary Labeling, etiquetado de precaución. Este sello identifica materiales de arte que requieren advertencias por riesgos conocidos para la salud y que incluyen información sobre su uso correcto. ACMI indica que el sello CL no aparece en materiales infantiles y que los productos que lo llevan no deben entregarse a niños de sexto grado o menores. Por lo tanto, para un niño pequeño un producto con el sello CL no es la opción adecuada.",
        "Fuente: Art and Creative Materials Institute, sección sobre seguridad de los materiales.",
        { h: "¿Y la palabra non-toxic?" },
        "La indicación non-toxic en un envase no es lo mismo que el sello AP de ACMI. Detrás del sello AP hay una certificación dentro de un programa concreto y una evaluación toxicológica realizada en ese programa, mientras que una mención aislada de non-toxic en el envase es simplemente una afirmación del fabricante.",
        "Esto no significa que un fabricante que utilice la expresión non-toxic esté engañando al consumidor. Solo significa que una declaración general en el envase y el sello de un programa independiente de certificación no son lo mismo.",
        { h: "El tamaño del crayón y el riesgo de asfixia" },
        "El tamaño importa al elegir materiales para un niño pequeño, pero hay un detalle de la normativa estadounidense que conviene conocer, porque a menudo se explica de forma incorrecta.",
        "Las normas federales sobre piezas pequeñas utilizan un cilindro especial de prueba para identificar objetos que pueden suponer un riesgo de asfixia, aspiración o ingestión para menores de tres años. El cilindro mide aproximadamente 2,25 pulgadas de largo y 1,25 pulgadas de ancho. Sin embargo, los materiales de escritura, como crayones, tizas, lápices y bolígrafos, están expresamente excluidos de esa prohibición, y la exclusión figura en 16 CFR 1501.3. En la misma lista de exclusiones aparecen los artículos de papel y los juegos de pinturas.",
        "Por eso no sería correcto decir que los crayones para niños pequeños son gruesos porque los más finos estén prohibidos por esa norma. Un crayón grueso es más fácil de sujetar para una mano pequeña y deja una marca ancha y visible, y eso ya es razón suficiente para elegirlo.",
        "Para los padres, el consejo práctico es más sencillo: elija crayones que el fabricante destine a la edad de su hijo, fíjese en si el tamaño y la forma resultan cómodos para una mano pequeña, siga las advertencias e instrucciones del envase y permanezca cerca mientras el niño dibuja.",
        "Fuente: Código de Reglamentos Federales de Estados Unidos, 16 CFR Parte 1501.",
        { h: "Plomo en pinturas y recubrimientos" },
        "En Estados Unidos, el contenido de plomo en las pinturas y en determinados recubrimientos superficiales está regulado por separado. De acuerdo con 16 CFR Parte 1303, las pinturas y recubrimientos sujetos a la norma no pueden contener plomo por encima del 0,009 por ciento, equivalente a 90 partes por millón. El comprador no necesita comprobar personalmente este valor en la tienda: los requisitos se aplican a los productos y recubrimientos cubiertos por la regulación.",
        "Fuente: Comisión de Seguridad de Productos del Consumidor de Estados Unidos.",
        { h: "La edad indicada en el envase" },
        "La indicación de edad es útil, porque señala para qué grupo de edad ha diseñado el fabricante el producto.",
        "Sin embargo, dos cajas con la misma edad indicada pueden ser bastante diferentes: los crayones pueden variar en grosor, longitud, forma o facilidad de uso. Por eso conviene mirar el producto en sí, además de la cifra impresa, y leer las instrucciones y advertencias del fabricante.",
        { h: "Qué comprobar en la tienda en treinta segundos" },
        "Busque el sello AP. Su ausencia no significa por sí sola que el producto sea peligroso, pero su presencia indica que el producto pasó por la certificación de ACMI y por una evaluación toxicológica.",
        "Si ve el sello CL, ese producto no está destinado a un niño pequeño. ACMI no utiliza el sello CL en materiales infantiles.",
        "Consulte la recomendación de edad del fabricante y lea las advertencias o instrucciones especiales.",
        "Fíjese en el tamaño y la forma de los crayones y valore si resultan adecuados para la etapa en la que está su hijo.",
        "Y hay algo que ningún sello puede sustituir: a esta edad el niño colorea con un adulto cerca.",
      ],
      ru: [
        "Родитель приходит в магазин и видит на коробке мелков несколько надписей, значков и печатей. По внешнему виду трудно понять, какие из них действительно важны. Одни маркировки связаны с федеральными требованиями и поэтому встречаются практически повсеместно, другие производитель получает добровольно. Разберемся, что именно они означают.",
        "Сразу оговоримся: ниже речь идет об американских правилах. Мы объясняем значение маркировки, а не оцениваем безопасность конкретных товаров и не даем медицинских рекомендаций. Для каждого товара стоит следовать возрастным рекомендациям, инструкциям и предупреждениям изготовителя, а вопросы, связанные со здоровьем ребенка, обсуждать с педиатром или другим специалистом.",
        { h: "Conforms to ASTM D-4236: что это значит" },
        "Это одна из самых распространенных надписей на упаковках товаров для творчества, и ее значение часто понимают неправильно.",
        "В 1988 году в США был принят закон о маркировке опасных материалов для творчества, известный как LHAMA. Соответствующие требования отражены в 16 CFR 1500.14. Товары для творчества, которые продаются в США, должны проходить токсикологическую оценку на предмет возможного длительного воздействия на здоровье, и такая оценка должна повторяться не реже одного раза в пять лет. Кроме того, на товаре должна стоять надпись о соответствии, например Conforms to ASTM D-4236, там, где это практически возможно.",
        "Важно понимать, что эта надпись не награда и не особый знак безопасности, а часть общих требований к товарам для творчества. Если у товара есть риски, требующие предупреждений, эти предупреждения должны быть в маркировке. Поэтому при сравнении двух наборов мелков сама по себе надпись о соответствии ASTM D-4236 не говорит, что один из них лучше другого.",
        "Источник: Комиссия по безопасности потребительских товаров США, раздел о материалах для творчества.",
        { h: "Печать AP: добровольная сертификация" },
        "ACMI, Институт материалов для искусства и творчества, это некоммерческая организация, а не государственное ведомство. Участие в его программе сертификации добровольное, поэтому печать ACMI говорит больше, чем сам факт, что товар продается в США как материал для творчества.",
        "AP расшифровывается как Approved Product, одобренный продукт. По описанию ACMI, эта печать обозначает материалы, которые прошли оценку в программе организации у сертифицированного токсиколога и не содержат веществ в количествах, способных быть токсичными или вредными для людей, включая детей, либо вызывать острые или хронические проблемы со здоровьем в понимании применимых стандартов. ACMI прямо рекомендует искать печать AP при выборе материалов для детей младшего возраста.",
        { h: "Что означает печать CL" },
        "CL расшифровывается как Cautionary Labeling, предупреждающая маркировка. Такая печать обозначает материалы, которым нужны предупреждения об известных рисках и указания по правильному использованию. ACMI указывает, что печать CL не ставится на детские материалы и что товары с ней не следует давать детям шестого класса и младше. Поэтому для малыша товар с печатью CL не подойдет.",
        "Источник: Институт материалов для искусства и творчества, раздел о безопасности материалов.",
        { h: "А что означает слово non-toxic" },
        "Надпись non-toxic на упаковке и печать AP от ACMI это не одно и то же. За печатью AP стоит сертификация в конкретной программе и проведенная в ней токсикологическая оценка, а отдельно написанное слово non-toxic это утверждение самого производителя.",
        "Это не значит, что производитель, использующий слово non-toxic, вводит покупателя в заблуждение. Просто общая надпись на упаковке и знак независимой программы сертификации говорят о разном.",
        { h: "Размер мелка и опасность удушья" },
        "Размер действительно важен при выборе материалов для малыша, но в американских правилах тут есть тонкость, о которой стоит знать, потому что ее часто пересказывают неверно.",
        "Федеральные правила о мелких деталях используют специальный испытательный цилиндр, чтобы выявлять предметы, опасные для детей младше трех лет с точки зрения удушья, вдыхания и проглатывания. Цилиндр примерно 2,25 дюйма в длину и 1,25 дюйма в ширину. При этом письменные принадлежности, в том числе мелки, мел, карандаши и ручки, прямо выведены из-под этого запрета, и это исключение записано в 16 CFR 1501.3. В том же списке исключений стоят изделия из бумаги и наборы красок.",
        "Поэтому было бы неверно объяснять толщину детских мелков тем, что тонкие запрещены этим правилом. Толстый мелок удобнее держать маленькой руке и оставляет широкий заметный след, и этого вполне достаточно, чтобы его выбрать.",
        "Практический вывод для родителя проще: выбирайте мелки, которые изготовитель предназначил для возраста вашего ребенка, смотрите, удобны ли они маленькой руке, следуйте предупреждениям и указаниям на упаковке и будьте рядом, пока ребенок рисует.",
        "Источник: свод федеральных правил США, 16 CFR, часть 1501.",
        { h: "Свинец в красках и покрытиях" },
        "Содержание свинца в красках и некоторых поверхностных покрытиях в США регулируется отдельно. По 16 CFR, часть 1303, в красках и покрытиях, подпадающих под это правило, свинца не может быть больше 0,009 процента, то есть больше 90 частей на миллион. Покупателю не нужно самостоятельно проверять этот показатель в магазине: требования действуют для продукции, на которую распространяется регулирование.",
        "Источник: Комиссия по безопасности потребительских товаров США.",
        { h: "Возраст на упаковке" },
        "Возрастная маркировка полезна: она показывает, для какой возрастной группы производитель предназначил товар.",
        "Но два набора с одинаковой возрастной пометкой могут заметно отличаться: мелки бывают разной толщины, длины и формы и по-разному удобны в руке. Поэтому стоит смотреть не только на цифру на коробке, но и на сам товар, а также читать инструкции и предупреждения изготовителя.",
        { h: "Что посмотреть в магазине за тридцать секунд" },
        "Найдите печать AP. Ее отсутствие само по себе не означает, что товар опасен, но с ней вы знаете, что товар прошел сертификацию ACMI и токсикологическую оценку.",
        "Если на упаковке есть печать CL, этот товар не предназначен для малыша: ACMI не ставит эту печать на детские материалы.",
        "Посмотрите возрастную рекомендацию изготовителя и прочитайте предупреждения и особые указания.",
        "Обратите внимание на размер и форму мелка и подумайте, подходят ли они вашему ребенку сейчас.",
        "И есть то, чего не заменит ни одна маркировка: в этом возрасте ребенок рисует рядом со взрослым.",
      ],
    },
    faq: {
      en: [
        {
          q: "Does Conforms to ASTM D-4236 mean the crayons are safe?",
          a: "It means the art material has been evaluated and labeled under the requirements associated with ASTM D-4236 and United States art material regulations. The statement alone is not a special safety award and is not a way to rank two boxes of crayons. Products that require hazard warnings must carry the appropriate labeling separately.",
        },
        {
          q: "What is the difference between the AP and CL Seals?",
          a: "AP stands for Approved Product, and ACMI uses that seal for products that meet the criteria of its toxicological certification program. CL stands for Cautionary Labeling and is used on products that require cautionary information about known health risks and proper use. ACMI does not use the CL Seal on children's art materials.",
        },
        {
          q: "Why are crayons for toddlers often so thick?",
          a: "Thicker crayons are easier for small hands to grasp and make broad, visible marks. Their thickness should not be explained as a requirement of the federal small parts ban, because writing materials such as crayons are specifically exempt from that ban under 16 CFR 1501.3. When choosing crayons, follow the manufacturer's age recommendation and consider the size and shape that suit your child.",
        },
        {
          q: "Who decides what age is printed on a box of crayons?",
          a: "The manufacturer identifies the age group the product is intended for. That information matters, but products carrying the same age recommendation can still differ considerably in thickness, length and shape. It helps to look at the product's design and size as well as its instructions and warnings.",
        },
        {
          q: "What should I do if my child puts a crayon in their mouth?",
          a: "Choose art materials that the manufacturer identifies as appropriate for your child's age, pay attention to their size, and stay nearby while your child is drawing. If your child swallows something or you are concerned about an exposure or their condition, seek appropriate medical advice.",
        },
      ],
      es: [
        {
          q: "¿La indicación Conforms to ASTM D-4236 significa que los crayones son seguros?",
          a: "Significa que el material ha sido evaluado y etiquetado conforme a los requisitos asociados a ASTM D-4236 y a la normativa estadounidense sobre materiales de arte. La indicación por sí sola no es un premio especial de seguridad ni sirve para comparar dos cajas de crayones. Si un producto requiere advertencias sobre riesgos, estas deben aparecer por separado en el etiquetado.",
        },
        {
          q: "¿Cuál es la diferencia entre el sello AP y el sello CL?",
          a: "AP significa Approved Product y ACMI lo utiliza en productos que cumplen los criterios de su programa de certificación toxicológica. CL significa Cautionary Labeling y se utiliza en productos que requieren advertencias sobre riesgos conocidos e información sobre su uso correcto. ACMI no utiliza el sello CL en materiales infantiles.",
        },
        {
          q: "¿Por qué los crayones para niños pequeños son tan gruesos?",
          a: "Los crayones gruesos son más fáciles de sujetar para una mano pequeña y dejan una marca ancha y visible. Su grosor no debe explicarse como una exigencia de la prohibición federal sobre piezas pequeñas, porque los materiales de escritura como los crayones están expresamente excluidos de esa prohibición en 16 CFR 1501.3. Al elegirlos, siga la recomendación de edad del fabricante y valore el tamaño y la forma que le convienen a su hijo.",
        },
        {
          q: "¿Alguien verifica la edad indicada en el envase?",
          a: "El fabricante indica para qué grupo de edad está pensado el producto. Esa información importa, pero dos productos con la misma recomendación pueden ser bastante distintos en grosor, longitud y forma. Conviene fijarse también en el diseño y el tamaño del producto y leer sus instrucciones y advertencias.",
        },
        {
          q: "¿Qué hago si mi hijo se lleva el crayón a la boca?",
          a: "Elija materiales que el fabricante considere adecuados para la edad de su hijo, fíjese en su tamaño y permanezca cerca mientras el niño dibuja. Si el niño ha tragado algo o le preocupa su estado, busque atención médica.",
        },
      ],
      ru: [
        {
          q: "Надпись Conforms to ASTM D-4236 означает, что мелки безопасны?",
          a: "Она означает, что товар оценили и подписали по требованиям, связанным со стандартом ASTM D-4236 и американскими правилами для материалов для творчества. Сама по себе эта надпись не является особым знаком безопасности и не позволяет сравнить два набора мелков между собой. Если товару нужны предупреждения о рисках, они указываются в маркировке отдельно.",
        },
        {
          q: "Чем печать AP отличается от печати CL?",
          a: "AP означает Approved Product, и ACMI ставит эту печать на товары, отвечающие критериям ее программы токсикологической сертификации. CL означает Cautionary Labeling и ставится на товары, которым нужны предупреждения об известных рисках и указания по правильному использованию. На детских материалах печать CL не используется.",
        },
        {
          q: "Почему мелки для малышей делают такими толстыми?",
          a: "Толстый мелок удобнее держать маленькой руке и оставляет широкий заметный след. А вот объяснять его толщину федеральным запретом на мелкие детали было бы неверно: письменные принадлежности, в том числе мелки, прямо выведены из-под этого запрета в 16 CFR 1501.3. При выборе стоит опираться на возрастные рекомендации изготовителя и на то, удобен ли мелок вашему ребенку.",
        },
        {
          q: "Возраст на упаковке кто-то проверяет?",
          a: "Изготовитель указывает, для какой возрастной группы предназначен товар. Эта информация важна, но два набора с одинаковой пометкой могут заметно отличаться по толщине, длине и форме мелков. Поэтому стоит смотреть и на сам товар, и на его инструкции и предупреждения.",
        },
        {
          q: "Что делать, если ребенок тянет мелок в рот?",
          a: "Выбирайте материалы, которые изготовитель считает подходящими для возраста вашего ребенка, обращайте внимание на их размер и будьте рядом, пока ребенок рисует. Если ребенок что-то проглотил или вас беспокоит его состояние, обратитесь за медицинской помощью.",
        },
      ],
    },
  },
];

export const guideBySlug = (lang: ContentLang, slug: string) =>
  guides.find((g) => g.slug[lang] === slug);
