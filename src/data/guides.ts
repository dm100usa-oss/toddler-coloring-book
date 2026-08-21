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
    },
    stage: "scribble",
    title: {
      en: "What age can a child start coloring?",
      es: "¿A qué edad puede empezar a colorear un niño?",
    },
    lead: {
      en:
        "Most children make their first deliberate marks on paper between twelve and eighteen " +
        "months, holding a crayon in a fist. That is the real beginning. Staying inside a line is " +
        "a separate skill that arrives closer to three, and waiting for it before handing over a " +
        "crayon means waiting about eighteen months too long.",
      es:
        "La mayoría de los niños hace sus primeras marcas intencionadas en el papel entre los doce " +
        "y los dieciocho meses, agarrando el crayón con el puño. Ese es el comienzo real. Quedarse " +
        "dentro de la línea es otra habilidad distinta que llega más cerca de los tres años, y " +
        "esperar a eso para darle un crayón significa esperar unos dieciocho meses de más.",
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
        "La pregunta que hay detrás de la pregunta suele ser otra: no cuándo puede un niño sostener " +
        "un crayón, sino cuándo deja de ser un desperdicio de papel dárselo. La respuesta honesta " +
        "es que nunca lo es, porque lo que el niño aprende a los doce meses no tiene nada que ver " +
        "con el dibujo. Está aprendiendo que su propio movimiento cambia el mundo fuera de su " +
        "cuerpo. Esa es toda la lección, y una hoja llena de garabatos es la prueba de que caló.",

        "Alrededor de los doce a quince meses un niño puede hacer una marca y la repite a propósito " +
        "para verla otra vez. Agarra con el puño, el movimiento sale del hombro y del codo, y las " +
        "marcas son largas y amplias. Nada de esto apunta a nada.",

        "Hacia los dieciocho meses o dos años el garabato se vuelve controlado. El niño garabatea " +
        "sin que se lo enseñen antes, puede imitar una línea que otra persona acaba de dibujar, y " +
        "hace marcas redondas en bucle y trazos de arriba abajo a propósito. Ahora las marcas caen " +
        "casi todas sobre el dibujo y no por toda la mesa.",

        "Entre los dos y los tres años el niño empieza a apuntar. Puede copiar una línea vertical, " +
        "una horizontal y un círculo, y deja casi todo el color sobre el dibujo mientras se sale " +
        "del contorno sin problema. Esta es la etapa que los padres confunden más a menudo con un " +
        "fracaso. Salirse de la línea aquí no es un error, es el aspecto que tiene apuntar antes de " +
        "que la mano alcance al ojo.",

        "Alrededor de los tres años, y con más seguridad cerca de los cuatro, quedarse dentro del " +
        "contorno se hace posible y el niño empieza a notar cuándo el color se sale. Una cruz se " +
        "copia hacia los cuatro. Este es también el punto en el que un libro hecho para la primera " +
        "etapa empieza a resultar demasiado fácil.",

        "La regla práctica para el primer crayón es sencilla. Dele un crayón grueso, no un lápiz ni " +
        "un rotulador. Siente al niño en una mesa con una hoja, no con un libro entero. Cuente con " +
        "que las primeras sesiones duren dos o tres minutos y terminen cuando el niño se levante, " +
        "no cuando la hoja esté acabada. Nada de eso es un problema que haya que arreglar. Es " +
        "exactamente el aspecto que tiene el principio.",
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
            "Sí, con el tipo de hoja adecuado. Al año el niño agarra el crayón con el puño y hace " +
            "marcas amplias sin apuntar, así que la hoja necesita un contorno muy grueso y una sola " +
            "forma grande que llene el papel. En ese tipo de hoja cualquier marca cae donde cuenta " +
            "y el niño ve un resultado. En una hoja de dibujos pequeños y detallados no pasa nada " +
            "visible y el niño pierde el interés en menos de un minuto.",
        },
        {
          q: "¿Es seguro darle crayones a un niño de un año?",
          a:
            "Use crayones marcados como no tóxicos y lo bastante grandes como para que no se puedan " +
            "tragar, y quédese en la mesa mientras el niño los usa. A esta edad los niños se llevan " +
            "las cosas a la boca, y un crayón grueso se elige tanto por eso como por el agarre.",
        },
        {
          q: "¿Cuánto debe durar la primera sesión de colorear?",
          a:
            "Dos o tres minutos es normal al principio y no es señal de poca atención. Termine la " +
            "sesión cuando el niño se levante en vez de intentar acabar la hoja. Las sesiones se " +
            "alargan solas a lo largo de los meses según el niño saca más de ellas.",
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
    },
    stage: "control",
    title: {
      en: "Crayons, markers or colored pencils: what to give a toddler",
      es: "Crayones, rotuladores o lápices: qué darle a un niño pequeño",
    },
    lead: {
      en:
        "Thick crayons first, for at least the first year of drawing. They need no grip strength, " +
        "they will not tear the page, they do not bleed through, and they leave a wide mark a child " +
        "can actually see. Markers come later, colored pencils later still, and both for specific " +
        "reasons rather than as an upgrade.",
      es:
        "Primero crayones gruesos, al menos durante el primer año de dibujo. No exigen fuerza en la " +
        "mano, no rompen la hoja, no traspasan el papel y dejan una marca ancha que el niño ve de " +
        "verdad. Los rotuladores llegan después, los lápices de colores más tarde aún, y ambos por " +
        "razones concretas, no como una mejora.",
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
        "La elección importa más de lo que parece, porque a esta edad la herramienta decide si el " +
        "niño ve un resultado. Un niño que aprieta fuerte y obtiene una línea tenue concluye que no " +
        "pasa nada y lo deja. Todo lo que sigue nace de ese único hecho.",

        "Los crayones gruesos son la primera herramienta adecuada por cuatro razones distintas. " +
        "Marcan casi sin presión, así que una mano que todavía no tiene fuerza produce igualmente " +
        "una línea fuerte. Son lo bastante anchos para agarrarse con el puño, que es como agarra un " +
        "niño antes de que los dedos tomen el relevo. No pueden romper el papel, cosa que un lápiz " +
        "afilado en un puño pesado sí hace con facilidad. Y no traspasan la hoja, así que una hoja " +
        "marcada sigue siendo una hoja marcada.",

        "Los rotuladores dan el resultado más vivo y a los niños les encantan justo por eso. El " +
        "precio es que traspasan el papel corriente, así que una hoja impresa por los dos lados " +
        "pierde el dibujo del reverso, y manchan la mesa, la ropa y la piel mucho más fácilmente " +
        "que los crayones. Los rotuladores lavables resuelven casi todo eso. Una hoja suelta debajo " +
        "resuelve el resto.",

        "Los lápices de colores piden un agarre con los dedos y una presión constante, y la mayoría " +
        "de los niños no tiene ninguna de las dos cosas antes de los tres años. Dados antes, el " +
        "lápiz o no deja nada visible o se parte. Cobran sentido cuando el niño ya se queda dentro " +
        "de la línea y quiere más control fino, que es un deseo real y no conviene apresurar.",

        "Hay dos detalles menores que vale la pena saber. Los crayones gruesos triangulares o con " +
        "forma de huevo animan a los dedos a colocarse donde acabarán teniendo que colocarse, lo " +
        "cual es un empujón suave y no un aparato de entrenamiento. Y un niño zurdo no necesita " +
        "herramientas distintas, pero sí agradece un dibujo colocado en el centro de la hoja y no " +
        "hacia un lado, donde la mano izquierda lo tapa mientras trabaja.",
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
            "Los rotuladores lavables marcados como no tóxicos se usan mucho a esta edad, y la " +
            "fórmula lavable es lo que marca la diferencia en la piel, la ropa y los muebles. Aun " +
            "así traspasan el papel, así que ponga una hoja suelta debajo. Mantenga los capuchones " +
            "fuera del alcance: son lo bastante pequeños para atragantarse.",
        },
        {
          q: "Mi hijo agarra el crayón con el puño. ¿Debo corregirlo?",
          a:
            "No. El agarre con el puño es normal y esperable antes de los dos años y medio, y " +
            "corregirlo a la fuerza suele terminar la sesión de dibujo en vez de arreglar el " +
            "agarre. El agarre con los dedos llega solo a medida que la mano se desarrolla. Los " +
            "crayones gruesos triangulares lo favorecen sin ninguna instrucción.",
        },
        {
          q: "¿Y la pintura a esta edad?",
          a:
            "La pintura funciona y a los niños les gusta, pero es una actividad distinta y no un " +
            "paso por encima de los crayones. Enseña color y cobertura más que la puntería y el " +
            "control que construye una hoja para colorear. La mayoría de las familias hace las dos " +
            "cosas y saca la pintura cuando tiene tiempo de limpiar.",
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
    },
    stage: "control",
    title: {
      en: "Coloring with a toddler without the mess",
      es: "Colorear con un niño pequeño sin ensuciarlo todo",
    },
    lead: {
      en:
        "Most of the mess comes from three things: the wrong tool, a page that gives the child " +
        "nothing to aim at, and a session that runs past the point where the child was still " +
        "interested. Fixing those three removes most of the cleaning, and does more than any mat " +
        "or smock.",
      es:
        "Casi toda la suciedad viene de tres cosas: la herramienta equivocada, una hoja que no le " +
        "da al niño nada a lo que apuntar, y una sesión que se alarga más allá del punto en que el " +
        "niño seguía interesado. Arreglar esas tres cosas quita casi toda la limpieza, y sirve más " +
        "que cualquier mantel o babi.",
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
        "Ayuda separar dos preocupaciones distintas que se llaman igual. Una son las marcas donde no " +
        "deberían estar: la mesa, la pared, el niño. La otra es que la hoja misma quede caótica. Lo " +
        "segundo no es suciedad en absoluto, es el aspecto que tiene dibujar a esta edad, y tratarlo " +
        "como un problema es la manera más rápida de que el niño deje de disfrutarlo.",

        "Para las marcas en el sitio equivocado, la herramienta hace casi todo el trabajo. Los " +
        "crayones se quedan en gran medida donde se ponen y se limpian fácil de las superficies " +
        "duras. Los rotuladores lavables están hechos justo para esta situación y salen de la piel " +
        "y de casi todos los tejidos. Los rotuladores permanentes corrientes no pintan nada cerca " +
        "de un niño de dos años, y tampoco los botes de pintura abiertos sobre una alfombra.",

        "Para la hoja, la solución es la puntería. Un niño garabatea más allá del borde del papel " +
        "sobre todo cuando en el papel no hay nada que merezca quedarse. Un dibujo grande con " +
        "contorno grueso le da a la mano un objetivo, y un objetivo mantiene el crayón sobre la " +
        "hoja mucho mejor que cualquier instrucción de tener cuidado.",

        "La duración de la sesión es la más silenciosa de las tres y la más fiable. Un niño que ha " +
        "terminado de estar interesado no suelta el crayón con educación, empieza a probar qué más " +
        "hace el crayón. Terminar la sesión a la primera señal de eso, y no al final de la hoja, " +
        "evita casi todos los incidentes que los padres recuerdan.",

        "Dos arreglos prácticos merecen el pequeño esfuerzo. Ponga una hoja suelta debajo de la " +
        "página, que recoge tanto lo que traspasa el rotulador como lo que se sale por los bordes. " +
        "Y dé una hoja cada vez en lugar del libro abierto, lo que quita la tentación de pasar de " +
        "página a media faena y reduce a la mitad la superficie disponible para accidentes.",

        "Una cosa que conviene saber antes de comprar: buscar colorear sin manchas suele llevar a " +
        "otro producto, el de los rotuladores especiales que solo aparecen sobre papel tratado. " +
        "Funcionan como prometen y son de verdad limpios, pero el niño colorea con un rotulador que " +
        "no muestra nada en ningún otro sitio, lo cual es una actividad distinta de dibujar en " +
        "papel. Cada cosa tiene su lugar. No son sustitutos la una de la otra.",
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
            "Agua tibia con un poco de jabón de vajilla en un paño suave quita casi todo el crayón " +
            "de las paredes pintadas, frotando con suavidad para no dañar la pintura. Una esponja " +
            "borradora se lleva lo que quede pero puede apagar un acabado mate, así que pruebe " +
            "primero en una zona escondida. Mire el envase del crayón: muchas marcas publican " +
            "instrucciones para quitar su propio producto.",
        },
        {
          q: "¿Los libros para colorear sin manchas son lo mismo que un libro normal?",
          a:
            "No. Los juegos sin manchas usan rotuladores especiales que solo aparecen sobre su " +
            "propio papel tratado, así que nada mancha la mesa ni al niño. Son de verdad limpios y " +
            "útiles para viajar, pero el niño no dibuja sobre papel corriente y no puede usar ese " +
            "rotulador en ningún otro sitio. Funcionan junto a un libro de papel, no en su lugar.",
        },
        {
          q: "¿Debe llevar babi mi hijo?",
          a:
            "Con crayones casi nunca hace falta. Con rotuladores o pintura, una camisa vieja es más " +
            "cómoda que un babi de verdad y funciona igual. El ahorro mayor está en elegir " +
            "herramientas lavables desde el principio.",
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
    },
    stage: "aim",
    title: {
      en: "The marker goes through the page. What to do",
      es: "El rotulador traspasa la hoja. Qué hacer",
    },
    lead: {
      en:
        "Ordinary book paper does not stop a marker, and almost no coloring book at this price is " +
        "printed on paper that would. A spare sheet slipped under the page solves it completely in " +
        "one move. Choosing a book printed on one side only solves it permanently, because a marker " +
        "that soaks through then ruins a blank back rather than the next drawing.",
      es:
        "El papel de libro corriente no detiene un rotulador, y casi ningún libro para colorear a " +
        "este precio está impreso en un papel que lo hiciera. Una hoja suelta metida debajo lo " +
        "resuelve del todo de una vez. Elegir un libro impreso por una sola cara lo resuelve para " +
        "siempre, porque entonces el rotulador que traspasa arruina un reverso en blanco y no el " +
        "dibujo siguiente.",
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
        "Esta es la queja más frecuente en las reseñas de libros infantiles para colorear, y vale la " +
        "pena entender por qué pasa en vez de tratarlo como un defecto. Un papel lo bastante grueso " +
        "para detener un rotulador cuesta varias veces más por página y hace el libro más pesado y " +
        "mucho más caro. Un libro que lo usara costaría tres o cuatro veces más, lo cual, para un " +
        "libro que un niño va a garabatear en un mes, es un cambio que la mayoría de los padres no " +
        "elegiría si se lo explicaran.",

        "El gesto que lo arregla lleva un segundo. Ponga una hoja de papel corriente, o un cartón, " +
        "debajo de la página en la que trabaja el niño. Lo que traspase cae en esa hoja. Funciona " +
        "con cualquier libro, no cuesta nada, y conviene hacerlo por costumbre y no después del " +
        "primer dibujo arruinado.",

        "El arreglo de fondo es comprar un libro impreso por una sola cara. Entonces el reverso de " +
        "cada dibujo está en blanco por diseño, y un rotulador que traspasa marca una hoja vacía. " +
        "Vale la pena comprobarlo antes de comprar: se ve fácil en la vista previa del interior, y " +
        "los libros rara vez lo dicen en la portada. Un libro con dibujo en las dos caras de cada " +
        "hoja pierde dos ilustraciones cada vez que se usa un rotulador.",

        "El otro camino es cambiar la herramienta en vez del papel. Los crayones no traspasan nada. " +
        "Los lápices de colores tampoco. Solo lo hacen los rotuladores y la pintura, y los " +
        "rotuladores son los que los niños buscan porque el color es más vivo. Si un día importa " +
        "más que no traspase que el color, esa es una decisión de dos segundos junto a la caja.",

        "Una cosa que no hay que hacer: pasar una plancha caliente o un secador por la hoja para " +
        "secarla, ni intentar levantar la tinta del rotulador con disolvente. Ninguna de las dos " +
        "funciona en papel de libro y las dos suelen convertir un problema pequeño en una hoja rota.",
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
            "Que traspase depende del gramaje del papel, y casi ningún libro infantil para colorear " +
            "en el rango de precio habitual usa un papel lo bastante grueso para detener un " +
            "rotulador. Lo que separa aquí un buen libro de uno malo no es el papel sino la " +
            "impresión: por una sola cara, el rotulador que traspasa marca un reverso en blanco y " +
            "no el dibujo siguiente.",
        },
        {
          q: "¿Traspasa un libro para colorear con crayones?",
          a:
            "No. El crayón es cera y se queda en la superficie del papel en vez de calar, así que no " +
            "pasa al otro lado con ninguna presión que pueda hacer un niño pequeño. Lo mismo vale " +
            "para los lápices de colores.",
        },
        {
          q: "¿Puedo usar rotuladores igualmente en papel fino?",
          a:
            "Sí, con una hoja suelta debajo. Recoge todo lo que traspasa y el niño no nota la " +
            "diferencia. Es la costumbre más sencilla de adquirir y elimina el problema por completo.",
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
    },
    stage: "aim",
    title: {
      en: "How long will a toddler actually sit and color?",
      es: "¿Cuánto tiempo aguanta coloreando de verdad un niño pequeño?",
    },
    lead: {
      en:
        "Two or three minutes at the very beginning, around five minutes for most two year olds, " +
        "and ten minutes or more once a child is staying inside the line and choosing colors on " +
        "purpose. A session that ends when the child stands up is a normal session, not a failed one.",
      es:
        "Dos o tres minutos al principio, unos cinco minutos para la mayoría de los niños de dos " +
        "años, y diez minutos o más cuando el niño ya se queda dentro de la línea y elige los " +
        "colores a propósito. Una sesión que termina cuando el niño se levanta es una sesión " +
        "normal, no una fracasada.",
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
        "Los padres suelen hacer esta pregunta porque una sesión terminó mucho antes de lo esperado " +
        "y están intentando averiguar si algo va mal. Casi siempre no va mal nada. Lo que hay que " +
        "ajustar es la expectativa, no al niño.",

        "La atención a esta edad no es una cantidad fija. El mismo niño pasará noventa segundos en " +
        "una hoja y ocho minutos en la siguiente, y la diferencia suele estar en la hoja más que en " +
        "el día. Un dibujo que el niño reconoce y sabe nombrar lo retiene más que uno que no, por " +
        "la sencilla razón de que nombrarlo es la mitad de lo que lo hace interesante.",

        "Tres cosas alargan la sesión de forma fiable, y ninguna consiste en pedirle al niño que se " +
        "concentre. Un motivo que el niño conozca: un perro retiene a un niño de dos años mejor que " +
        "una criatura fantástica elaborada. Un dibujo lo bastante grande como para que el avance se " +
        "vea después de unos pocos trazos. Y un adulto sentado a la mesa haciendo lo mismo en su " +
        "propia hoja, que funciona mejor que cualquier ánimo dado desde el otro lado de la " +
        "habitación.",

        "Dos cosas la acortan de forma fiable. Pedirle al niño que se quede dentro de la línea antes " +
        "de que pueda, lo que convierte una actividad agradable en un examen que suspende una y " +
        "otra vez. Y seguir después de que el niño haya terminado de estar interesado, que es el " +
        "momento en que el crayón empieza a usarse sobre la mesa.",

        "Las sesiones se alargan solas a lo largo de los meses. No hay nada que entrenar ni ningún " +
        "ejercicio que hacer. Lo que cambia es la mano, el agarre y lo que el niño saca de la " +
        "actividad, y las tres cosas avanzan sin ningún esfuerzo por parte del adulto.",
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
            "Sí. Las sesiones cortas son corrientes a los dos años, y se alargan con los meses sin " +
            "ninguna intervención. Pruebe con un dibujo que el niño sepa nombrar en voz alta y " +
            "siéntese a colorear su propia hoja a su lado: las dos cosas añaden tiempo sin pedirle " +
            "que se concentre.",
        },
        {
          q: "¿Debo hacer que termine la hoja?",
          a:
            "No. Terminar es una idea adulta de para qué sirve una hoja para colorear. A esta edad " +
            "el valor está en las marcas hechas, no en cubrirlo todo, y exigir que se acabe es la " +
            "manera más común de que a un niño acabe disgustándole colorear.",
        },
        {
          q: "¿Colorear mejora la capacidad de atención?",
          a:
            "Colorear es una de muchas actividades en las que los niños practican quedarse con una " +
            "tarea, junto con construir, clasificar y mirar libros. El tiempo dedicado así es útil, " +
            "pero la atención a esta edad depende sobre todo del desarrollo normal y no de ninguna " +
            "actividad concreta.",
        },
      ],
    },
  },
];

export const guideBySlug = (lang: ContentLang, slug: string) =>
  guides.find((g) => g.slug[lang] === slug);
