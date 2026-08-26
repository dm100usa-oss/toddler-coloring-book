import type { ContentLang } from "./dictionaries";

/* ------------------------------------------------------------------ */
/*  Инструмент подбора первой раскраски                                */
/* ------------------------------------------------------------------ */

/* Отдельная страница для подборщика, который до сих пор жил только
   внутри главной.

   Смысл переноса не в оформлении. Подборщик на главной показывает
   свой текст только после нажатия кнопок, а значит для поисковика
   и для нейросети его вопросов и ответов просто нет. Здесь весь
   разбор стоит на странице обычным текстом, до всяких нажатий,
   а живой подбор идет ниже как удобство для родителя.

   Родитель ищет словами "раскраска для 2 лет". Поэтому вход на эту
   страницу возрастной, а ответ по-прежнему считается по руке:
   возраст это дверь, поведение руки это ответ. */

export type ToolCopy = {
  title: string;
  /* Короткая строка для выдачи, если обычный заголовок длинный.
     На экране заголовок не меняется. */
  metaTitle?: string;
  /* Подзаголовок страницы. Он же описание для поисковика. */
  lead: string;
  /* Текст выше подборщика. Первый абзац дает прямой ответ целиком:
     именно его берет нейросеть, и он должен работать в одиночку. */
  body: string[];
  faq: { q: string; a: string }[];
};

export const toolCopy: Record<ContentLang, ToolCopy> = {
  en: {
    title: "How to choose a first coloring book for a 1 to 3 year old",
    lead:
      "Answer four questions about what your child does with their hand and see which kind of page " +
      "suits them now. Nothing is stored, no sign up.",
    body: [
      "At around one year old a child needs one large shape filling the sheet, a very thick " +
        "outline and almost no detail inside. At around two the outline stays thick, but the shape " +
        "can have two or three parts. At around three a large drawing with several separate areas " +
        "works, because the child can now choose a different color for each one. From about four " +
        "years old a first coloring book starts to feel too easy, and what suits better is a book " +
        "with more detail inside one drawing or a step by step drawing book.",
      "Age alone is not the best guide. An eighteen month old may already hold a crayon steadily " +
      "with the fingers, while a three year old still makes sweeping marks across the sheet, and " +
      "neither necessarily points to a problem. It is more useful to watch how the crayon is held " +
      "and how closely the marks land on the drawing. The picker below considers both age and what " +
      "the hand does, and gives more weight to the hand.",
      "The picker looks at four signs: age, how the crayon or pencil is held, how closely the marks " +
      "land on the drawing, and how long the child stays with one page. Age is the starting point. " +
      "Aim influences the result most, because it is easy to see while the child is coloring. Time " +
      "on one page counts for less, since it depends a great deal on the mood of the day and on how " +
      "interesting the child finds the drawing. The answers stay in the browser: nothing is sent " +
      "anywhere and nothing is saved.",
      "This picks a page, it does not assess a child. The result answers what suits now, never " +
        "what a child ought to be able to do. Age ranges here come from published developmental " +
        "milestones, listed at the bottom of this page, and a few months either way is ordinary. " +
        "If something about your child's development worries you, that is a conversation for your " +
        "pediatrician rather than for a website.",
    ],
    faq: [
      {
        q: "How do I know my child is ready for a coloring book?",
        a:
          "Age is not the only thing to go by. The sign of readiness is that the child has started making marks on paper on purpose and repeats the movement to see it happen again. That usually appears between twelve and eighteen months. Before then a crayon may interest a child mainly as an object, and there is no hurry with a coloring book. There is no need to wait until a child can stay inside the outline: that is the next skill and it appears noticeably later, about a year and a half on.",
      },
      {
        q: "What kind of coloring page suits a one year old?",
        a:
          "One large shape filling most of the sheet, a very thick outline, and few details inside it. " +
          "At this age a child often holds the crayon in the whole hand and works with broad sweeping " +
          "movements, which is why a large drawing and a clearly visible outline suit them better. " +
          "There is no need to expect a one year old to fill the shape neatly.",
      },
      {
        q: "Should a two year old color inside the lines?",
        a:
          "No. At two a child is still learning to hold the crayon more confidently and to guide it. A " +
          "thick outline works as a clearly visible landmark, and going past it at this age is " +
          "completely normal. Rather than asking for neat edges inside the outline, it is far more " +
          "useful now to keep the child interested in the activity itself.",
      },
      {
        q: "What should a first coloring book have?",
        a:
          "Large recognizable drawings, thick outlines, one drawing per page, very little fine " +
          "detail, single sided printing so a marker does not ruin the next page, and subjects a " +
          "child can already name out loud. A word printed under the drawing helps, because naming " +
          "the picture is half the reason a toddler stays at the table.",
      },
      {
        q: "Which crayons work best for toddlers?",
        a:
          "Thick crayons made for this age are easiest, because a small hand can hold them in a " +
          "fist and they leave a wide visible mark. Washable markers are the practical choice " +
          "later, once the child aims at the drawing. Coloring is an activity for a child sitting " +
          "with an adult nearby, whatever the material.",
      },
      {
        q: "Why print a word under each drawing?",
        a:
          "Because it gives the adult something to say. The child hears the name, looks at the " +
          "picture and connects the two, and the page turns into a short conversation instead of " +
          "a silent task. It also means the same page works twice: once for coloring and once for " +
          "naming what is on it.",
      },
      {
        q: "How long should a toddler color for?",
        a:
          "There is no strict norm. At a year old a child may spend only a minute or two with a " +
          "coloring page, at two around five minutes, and closer to three the interest often lasts " +
          "longer. If the child is tired or has lost interest, you can stop and come back to the " +
          "drawing later. Coloring a favorite picture several times over is completely normal too.",
      },
      {
        q: "Which coloring book is best for a toddler?",
        a:
          "There is no single best one, and any page that names one is guessing. What there is instead is six things you can check in the page photos before you buy. The outline is thick, because a thin line disappears under a wide stroke and the child sees no result. One drawing per page, because several subjects on a sheet split an attention span measured in minutes. The drawing is large and fills the sheet, because the hand moves from the shoulder and anything small is still out of reach. No tiny areas inside the drawing: one simple shape to fill, not ten petals. Printed on one side, or a marker soaks through onto the next drawing. And a sheet of 8.5 by 11 inches or A4, because a smaller format cramps the arm. Our book is built on those six: 111 drawings, one per page, an outline measuring 2.4 to 4.8 millimeters, a drawing filling 70 to 82 percent of the sheet, printed on one side, 8.5 by 11 inches. Two things go beyond the six. Under each drawing there is a word in large outline letters that the child colors just like the drawing, so the page works twice, once for coloring and once for naming what is on it. And every picture sits in the center of the sheet rather than against the spine, which suits a left handed and a right handed child equally. There is one more thing worth judging a recommendation by: we say plainly when our own book is the wrong choice. A child who already stays inside the outline will find it boring, and we write that on every page where the book appears.",
      },
      {
        q: "How thick should the outline be in a coloring book for a toddler?",
        a:
          "There is no standard that sets a number, so treat any figure you see as a benchmark rather than a rule. For comparison: on our free sheets in US Letter size the outline runs between 2.4 and 4.8 millimeters, and the drawing takes up 70 to 82 percent of the width and height of the page. Print one free sheet, hold a ruler against it, and you will have a reference you can compare any page photo against.",
      },
    ],
  },

  es: {
    title: "Cómo elegir el primer libro para colorear para un niño de 1 a 3 años",
    lead:
      "Responda cuatro preguntas sobre cómo dibuja su hijo y cómo sujeta el crayón, y " +
        "descubra qué tipo de página le conviene ahora. No se guarda nada y no hace falta " +
        "registrarse.",
    body: [
      "Alrededor del año, suele ser más adecuada una sola forma grande que ocupe casi toda " +
        "la hoja, con un contorno muy grueso y pocos detalles. Alrededor de los dos años, el " +
        "contorno puede seguir siendo grueso, pero el dibujo ya puede tener dos o tres partes. " +
        "Cerca de los tres años, puede funcionar bien un dibujo grande con varias zonas " +
        "separadas que el niño pueda colorear con distintos colores. A partir de los cuatro " +
        "años, el primer libro para colorear suele empezar a resultar demasiado sencillo, y " +
        "puede ser mejor elegir uno con dibujos más detallados o un libro de dibujo paso a " +
        "paso.",
      "No conviene fijarse únicamente en la edad. Un niño de dieciocho meses puede sujetar " +
        "el crayón con los dedos con bastante seguridad, mientras que uno de tres años todavía " +
        "puede hacer trazos por toda la hoja, y eso no significa necesariamente que haya un " +
        "problema. Por eso es más útil observar cómo sujeta el crayón y con qué precisión " +
        "dirige los trazos hacia el dibujo. El selector tiene en cuenta tanto la edad como " +
        "estas habilidades, pero da más importancia a lo que el niño ya puede hacer.",
      "El selector tiene en cuenta cuatro aspectos: la edad, la forma de sujetar el crayón, " +
        "la precisión de los movimientos y el tiempo que el niño dedica a una página. La edad " +
        "sirve como punto de partida. La precisión es el aspecto que más influye en el " +
        "resultado, porque es fácil observarla mientras el niño colorea. El tiempo que dedica " +
        "a una página tiene menos peso, ya que depende mucho del estado de ánimo y de cuánto " +
        "le interese el dibujo. Las respuestas permanecen en el navegador: no se envían ni se " +
        "guardan.",
      "Esta herramienta ayuda a elegir un tipo de página, no a evaluar el desarrollo de un " +
        "niño. El resultado indica qué puede convenirle ahora, no lo que debería saber hacer a " +
        "una edad determinada. Los rangos de edad se basan en hitos del desarrollo publicados, " +
        "cuyas fuentes aparecen al final de esta página. Una diferencia de algunos meses es " +
        "completamente normal. Si algo le preocupa sobre el desarrollo de su hijo, consúltelo " +
        "con su pediatra.",
    ],
    faq: [
      {
        q: "¿Cómo sé que mi hijo está listo para un libro para colorear?",
        a:
          "No hay que fijarse solo en la edad. La señal de que está listo es que el niño ha empezado a dejar marcas en el papel de forma intencionada y repite el movimiento para volver a ver el resultado. Eso suele aparecer entre los doce y los dieciocho meses. Antes, el crayón puede interesarle sobre todo como objeto, y no hay prisa con el libro para colorear. No hace falta esperar a que sepa colorear dentro del contorno: esa es la siguiente habilidad y aparece bastante más tarde, alrededor de un año y medio después.",
      },
      {
        q: "¿Qué tipo de dibujo para colorear le conviene a un niño de un año?",
        a:
          "Una sola forma grande que ocupe casi toda la hoja, con un contorno muy grueso y " +
            "pocos detalles. A esta edad, el niño suele sujetar el crayón con toda la mano y " +
            "hacer movimientos amplios desde el hombro y el codo. Por eso, un dibujo grande y " +
            "un contorno bien visible resultan más adecuados. No es necesario esperar que un " +
            "niño de un año intente rellenar toda la forma.",
      },
      {
        q: "¿Debe un niño de dos años colorear dentro de las líneas?",
        a:
          "No. A los dos años, el niño todavía está aprendiendo a sujetar el crayón con más " +
            "seguridad y a dirigir sus movimientos. Un contorno grueso sirve como referencia " +
            "visual, pero salirse de él es completamente normal. No hace falta exigir que " +
            "coloree con precisión dentro de las líneas: en esta etapa es mucho más importante " +
            "que disfrute del proceso.",
      },
      {
        q: "¿Qué debe tener un primer libro para colorear?",
        a:
          "Dibujos grandes y reconocibles, contornos gruesos, un solo dibujo por página, " +
            "pocos detalles pequeños e impresión por una sola cara para que el rotulador no " +
            "estropee el dibujo siguiente. Conviene elegir temas familiares para el niño: " +
            "animales, comida, juguetes y objetos cotidianos. Una palabra debajo del dibujo " +
            "también puede ser útil: el adulto puede nombrar la imagen y el niño empieza a " +
            "relacionar la palabra con lo que ve.",
      },
      {
        q: "¿Qué crayones van mejor para los más pequeños?",
        a:
          "Para empezar, suelen ser más cómodos los crayones gruesos pensados para niños " +
            "pequeños. Son fáciles de sujetar con una mano pequeña y dejan un trazo ancho y " +
            "visible. Los rotuladores lavables pueden probarse más adelante, cuando el niño ya " +
            "dirige la mano con mayor seguridad. Sea cual sea el material, es mejor que un " +
            "niño pequeño coloree con un adulto cerca.",
      },
      {
        q: "¿Para qué imprimir una palabra debajo de cada dibujo?",
        a:
          "Permite que el adulto nombre lo que aparece en la página y que el niño relacione " +
            "poco a poco la palabra con la imagen. Así, colorear puede convertirse en una " +
            "pequeña actividad compartida: nombrar el dibujo, repetir la palabra y hablar " +
            "sobre lo que aparece en él.",
      },
      {
        q: "¿Cuánto tiempo debe colorear un niño pequeño?",
        a:
          "No existe una duración exacta. Alrededor del año, un niño puede colorear solo uno " +
            "o dos minutos; a los dos años, unos cinco minutos; y cerca de los tres, el " +
            "interés puede mantenerse durante más tiempo. Si se cansa o pierde el interés, se " +
            "puede terminar la actividad y volver al dibujo más tarde. También es " +
            "completamente normal querer colorear varias veces una imagen favorita.",
      },
      {
        q: "¿Cuál es el mejor libro para colorear para un niño pequeño?",
        a:
          "No existe uno mejor que todos los demás, y cualquier página que nombre uno está adivinando. Lo que sí existe son seis cosas que usted puede comprobar en las fotos de las páginas antes de comprar. El contorno es grueso, porque una línea fina desaparece bajo un trazo ancho y el niño no ve el resultado de su trabajo. Un solo dibujo por página, porque varios objetos en una hoja dispersan una atención que a esta edad dura unos minutos. El dibujo es grande y ocupa casi toda la hoja, porque la mano se mueve desde el hombro y lo pequeño todavía queda fuera de su alcance. Sin zonas diminutas dentro del dibujo: una forma sencilla que rellenar, no diez pétalos. Impresión en una sola cara, o el rotulador traspasará hasta el dibujo siguiente. Y una hoja de 8,5 por 11 pulgadas o A4, porque un formato menor limita el movimiento del brazo. Nuestro libro está hecho sobre esos seis puntos: 111 dibujos, uno por página, un contorno de entre 2,4 y 4,8 milímetros, un dibujo que ocupa entre el 70 y el 82 por ciento de la hoja, impresión en una sola cara y formato de 8,5 por 11 pulgadas. Hay dos cosas que van más allá de los seis. Debajo de cada dibujo hay una palabra en letras huecas grandes que el niño colorea igual que el dibujo, de modo que la página sirve dos veces, una para colorear y otra para nombrar lo que aparece en ella. Y cada imagen está colocada en el centro de la hoja y no junto al lomo, lo que resulta igual de cómodo para un niño diestro y para uno zurdo. Hay algo más por lo que conviene juzgar una recomendación: decimos con claridad cuándo nuestro propio libro no es la opción adecuada. A un niño que ya colorea dentro del contorno le resultará aburrido, y lo escribimos en cada página donde aparece el libro.",
      },
      {
        q: "¿Qué grosor debe tener el contorno en un libro para colorear para niños pequeños?",
        a:
          "No hay ninguna norma que fije una cifra, así que cualquier número que vea conviene tomarlo como referencia y no como regla. Para comparar: en nuestras hojas gratuitas de tamaño US Letter el contorno mide entre 2,4 y 4,8 milímetros, y el dibujo ocupa entre el 70 y el 82 por ciento del ancho y del alto de la página. Imprima una hoja gratuita, mídala con una regla y tendrá una referencia con la que comparar la foto de cualquier página.",
      },
    ],
  },

  ru: {
    title: "Как выбрать первую раскраску для ребенка от 1 до 3 лет",
    lead:
      "Ответьте на четыре вопроса о том, как ребенок рисует и держит карандаш, и узнайте, " +
        "какая раскраска подходит ему сейчас. Ничего не сохраняется, регистрация не нужна.",
    body: [
      "Ребенку около года лучше подходит одна крупная форма почти во весь лист, очень " +
        "толстый контур и минимум деталей. Около двух лет контур по-прежнему должен быть " +
        "толстым, но рисунок уже может состоять из двух-трех частей. Около трех лет подойдет " +
        "крупный рисунок с несколькими отдельными участками, которые ребенок может " +
        "раскрашивать разными цветами. После четырех лет первая раскраска обычно становится " +
        "слишком простой, и лучше выбрать книгу с более детальными рисунками или с пошаговым " +
        "рисованием.",
      "Ориентироваться только на возраст не стоит. Полуторагодовалый ребенок может уже " +
        "уверенно держать мелок пальцами, а трехлетний все еще рисовать размашистые линии по " +
        "всему листу, и это не обязательно говорит о проблеме. Поэтому важнее смотреть на то, " +
        "как ребенок держит мелок и насколько точно попадает по рисунку. Подборщик учитывает и " +
        "возраст, и навыки ребенка, но навыкам придает большее значение.",
      "Подборщик учитывает четыре признака: возраст, способ держать карандаш или мелок, " +
        "точность движений и время, которое ребенок проводит за одной страницей. Возраст " +
        "служит отправной точкой. Больше всего на результат влияет то, насколько точно ребенок " +
        "попадает по рисунку, потому что это легко увидеть во время раскрашивания. Время за " +
        "одной страницей учитывается в меньшей степени: оно сильно зависит от настроения и от " +
        "того, насколько ребенку интересен рисунок. Ответы остаются в браузере, никуда не " +
        "отправляются и не сохраняются.",
      "Этот инструмент помогает подобрать подходящую раскраску, а не оценить развитие " +
        "ребенка. Результат показывает, какой тип страницы может подойти ему сейчас, но не " +
        "говорит, что ребенок обязан что-то уметь в определенном возрасте. Возрастные " +
        "ориентиры основаны на опубликованных материалах о развитии детей, источники указаны " +
        "внизу страницы. Разница в несколько месяцев совершенно естественна. Если вас что-то " +
        "беспокоит в развитии ребенка, лучше обсудить это с педиатром.",
    ],
    faq: [
      {
        q: "Как понять, что ребенок готов к раскраске?",
        a:
          "Ориентироваться можно не только на возраст. Главный признак готовности в том, что ребенок начал осознанно оставлять следы на бумаге и повторяет движение, чтобы снова увидеть результат. Обычно это происходит между двенадцатью и восемнадцатью месяцами. До этого мелок может интересовать ребенка прежде всего как предмет, и с раскраской можно не торопиться. Ждать, пока ребенок научится раскрашивать внутри контура, не нужно: это уже следующий навык, который появляется заметно позже, примерно через полтора года.",
      },
      {
        q: "Какая раскраска подходит ребенку в 1 год?",
        a:
          "Одна крупная форма почти во весь лист, очень толстый контур и минимум деталей. В " +
            "этом возрасте ребенок часто держит мелок всей ладонью и рисует широкими " +
            "размашистыми движениями. Поэтому крупный рисунок и хорошо заметный контур " +
            "подходят ему лучше. Не нужно ждать, что годовалый ребенок будет стараться " +
            "аккуратно закрасить всю форму.",
      },
      {
        q: "Должен ли двухлетний ребенок раскрашивать внутри контура?",
        a:
          "Нет. В два года ребенок еще только учится увереннее держать мелок и направлять " +
            "его движения. Толстый контур служит хорошо заметным ориентиром, но выходить за " +
            "его границы в этом возрасте совершенно нормально. Не стоит требовать от малыша " +
            "аккуратного раскрашивания внутри контура: сейчас гораздо важнее интерес к самому " +
            "процессу.",
      },
      {
        q: "Что должно быть в первой раскраске?",
        a:
          "Крупные узнаваемые рисунки, толстый контур, один рисунок на странице, минимум " +
            "мелких деталей и печать только с одной стороны, чтобы фломастер не испортил " +
            "следующий рисунок. Лучше выбирать знакомые ребенку темы: животных, еду, игрушки и " +
            "обычные предметы. Слово под рисунком тоже полезно: взрослый может назвать " +
            "изображение, а ребенок постепенно связывает слово с картинкой.",
      },
      {
        q: "Какие мелки подходят малышам?",
        a:
          "Для начала лучше всего подходят толстые мелки, предназначенные для малышей. Их " +
            "удобно держать маленькой рукой, а широкий яркий след хорошо заметен на бумаге. " +
            "Смываемые фломастеры можно попробовать позже, когда ребенок уже увереннее " +
            "направляет руку. Независимо от выбранных материалов маленькому ребенку лучше " +
            "раскрашивать рядом со взрослым.",
      },
      {
        q: "Зачем печатать слово под рисунком?",
        a:
          "Так взрослый может назвать то, что изображено на странице, а ребенок услышит " +
            "слово и свяжет его с картинкой. Раскрашивание превращается в небольшое совместное " +
            "занятие: можно назвать рисунок, повторить слово и поговорить о том, что на нем " +
            "изображено.",
      },
      {
        q: "Сколько времени ребенок должен заниматься раскраской?",
        a:
          "Строгой нормы нет. В год ребенок может заниматься раскраской всего минуту-две, в " +
            "два года - около пяти минут, а ближе к трем интерес нередко сохраняется дольше. " +
            "Если ребенок устал или потерял интерес, можно закончить и вернуться к рисунку " +
            "позже. Раскрашивать любимую картинку несколько раз тоже совершенно нормально.",
      },
      {
        q: "Какая раскраска для малыша лучшая?",
        a:
          "Единственно лучшей не существует, и страница, которая называет одну, попросту гадает. Зато есть шесть признаков, которые видно по фотографиям страниц прямо в магазине. Контур толстый, потому что тонкая линия исчезает под широким штрихом и ребенок не видит результата своей работы. Один рисунок на странице, потому что несколько предметов на листе рассеивают внимание, а внимание в этом возрасте держится несколько минут. Рисунок крупный, во весь лист, потому что рука ведет от плеча и мелкое ей пока недоступно. Внутри рисунка нет мелких участков: закрашивать надо одну простую форму, а не десять лепестков. Печать с одной стороны, иначе фломастер проступит на следующий рисунок. И лист 8,5 на 11 дюймов или А4, потому что меньший формат стесняет размах руки. Наша книга сделана по этим шести признакам: 111 рисунков, по одному на странице, контур толщиной от 2,4 до 4,8 миллиметра, рисунок занимает от 70 до 82 процентов листа, печать с одной стороны, формат 8,5 на 11 дюймов. Сверх шести в ней есть еще две вещи. Под каждым рисунком стоит слово крупными полыми буквами, которые ребенок раскрашивает так же, как сам рисунок, поэтому страница работает дважды: один раз на раскрашивание, второй на называние того, что нарисовано. И каждый рисунок расположен по центру листа, а не у корешка, поэтому раскрашивать одинаково удобно и левше, и правше. И есть еще одно, по чему стоит судить о самой рекомендации: мы прямо говорим, когда наша собственная книга не подходит. Ребенку, который уже уверенно раскрашивает внутри контура, она покажется скучной, и мы пишем об этом на каждой странице, где о ней рассказываем.",
      },
      {
        q: "Какой толщины должен быть контур в раскраске для малыша?",
        a:
          "Нормы, которая задавала бы число, не существует, поэтому любую цифру стоит воспринимать как ориентир, а не как правило. Для сравнения: на наших бесплатных листах формата US Letter контур имеет толщину от 2,4 до 4,8 миллиметра, а рисунок занимает от 70 до 82 процентов ширины и высоты страницы. Распечатайте один бесплатный лист, приложите линейку, и у вас будет ориентир, с которым можно сравнить фотографию любой страницы.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Таблица по возрастам                                               */
/* ------------------------------------------------------------------ */

/* Самый цитируемый кусок страницы. Таблицу нейросеть берет целиком,
   потому что ее не надо пересказывать своими словами.

   Строк четыре, а не три: последняя честно говорит, что после четырех
   лет первая раскраска уже мала. Родитель, которому один раз сказали
   правду вместо продажи, возвращается. */

export type AgeRow = {
  id: string;
  /* Этап, к которому этот возраст обычно относится. Связь односторонняя:
     из таблицы можно уйти на страницу этапа и прочитать подробно. */
  stage: string;
  age: Record<ContentLang, string>;
  hand: Record<ContentLang, string>;
  page: Record<ContentLang, string>;
  parts: Record<ContentLang, string>;
  tools: Record<ContentLang, string>;
};

export const ageRows: AgeRow[] = [
  {
    id: "one",
    stage: "scribble",
    age: { en: "About 1 year", es: "Alrededor de 1 año", ru: "Около 1 года" },
    hand: {
      en: "Holds the crayon in a fist, sweeping marks from the shoulder",
      es: "Sujeta el crayón con toda la mano y hace trazos amplios",
      ru: "Держит мелок всей ладонью, рисует широкими размашистыми линиями",
    },
    page: {
      en: "One large shape filling the sheet, very thick outline",
      es: "Una forma grande que ocupa casi toda la hoja, con un contorno muy grueso",
      ru: "Одна крупная форма почти во весь лист, очень толстый контур",
    },
    parts: {
      en: "None, the shape stays whole",
      es: "Ninguna, la forma se mantiene entera",
      ru: "Ни одного, форма остается цельной",
    },
    tools: {
      en: "Thick crayons",
      es: "Crayones gruesos",
      ru: "Толстые мелки",
    },
  },
  {
    id: "two",
    stage: "control",
    age: { en: "About 2 years", es: "Alrededor de 2 años", ru: "Около 2 лет" },
    hand: {
      en: "Fingers, not steadily. Loops and up and down strokes on purpose",
      es: "Lo sujeta con los dedos, pero todavía con poca firmeza. Hace bucles y trazos de " +
            "arriba abajo",
      ru: "Держит мелок пальцами, но пока неуверенно. Рисует петли и линии сверху вниз",
    },
    page: {
      en: "Large recognizable subject, outline still thick",
      es: "Dibujo grande y reconocible, con un contorno todavía grueso",
      ru: "Крупный узнаваемый рисунок, контур по-прежнему толстый",
    },
    parts: {
      en: "Two or three",
      es: "Dos o tres",
      ru: "Два-три",
    },
    tools: {
      en: "Thick crayons, washable markers",
      es: "Crayones gruesos, rotuladores lavables",
      ru: "Толстые мелки, смываемые фломастеры",
    },
  },
  {
    id: "three",
    stage: "aim",
    age: { en: "About 3 years", es: "Alrededor de 3 años", ru: "Около 3 лет" },
    hand: {
      en: "Fingers rather than fist, copies a circle and a straight line",
      es: "Sujeta el crayón con los dedos, no con toda la mano, y puede copiar un círculo y " +
            "una línea recta",
      ru: "Держит карандаш или мелок пальцами, а не всей ладонью, может повторить круг и " +
            "прямую линию",
    },
    page: {
      en: "Large drawing with separate areas to fill differently",
      es: "Dibujo grande con zonas separadas que se pueden colorear con distintos colores",
      ru: "Крупный рисунок с отдельными участками, которые можно раскрашивать разными цветами",
    },
    parts: {
      en: "Three to six",
      es: "De tres a seis",
      ru: "От трех до шести",
    },
    tools: {
      en: "Crayons, colored pencils, washable markers",
      es: "Crayones, lápices de colores, rotuladores lavables",
      ru: "Мелки, карандаши, смываемые фломастеры",
    },
  },
  {
    id: "four",
    stage: "shape",
    age: {
      en: "4 years and older",
      es: "4 años en adelante",
      ru: "4 года и старше",
    },
    hand: {
      en: "Stays inside the outline most of the time and notices when it does not",
      es: "Colorea dentro del contorno la mayor parte del tiempo y se da cuenta cuando se sale",
      ru: "Большую часть времени раскрашивает внутри контура и замечает, когда выходит за " +
            "его границы",
    },
    page: {
      en: "A scene rather than one object, or step by step drawing",
      es: "Un dibujo más complejo o una pequeña escena en lugar de un solo objeto, además de " +
            "actividades de dibujo paso a paso",
      ru: "Более сложный рисунок или небольшая композиция вместо одного предмета, а также " +
            "пошаговое рисование",
    },
    parts: {
      en: "Many, and smaller",
      es: "Muchas y más pequeñas",
      ru: "Много и мельче",
    },
    tools: {
      en: "Colored pencils, markers",
      es: "Lápices de colores, rotuladores",
      ru: "Карандаши, фломастеры",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Надписи блоков инструмента                                         */
/* ------------------------------------------------------------------ */

export type ToolLabels = {
  tableTitle: string;
  tableLead: string;
  colAge: string;
  colHand: string;
  colPage: string;
  colParts: string;
  colTools: string;
  moreAbout: string;
  pickerTitle: string;
  pickerLead: string;
  basisLink: string;
  basisLinkLead: string;
  /* Надпись ссылки с главной на полную страницу инструмента. */
  fullPage: string;
  /* Полоска фактов под названием страницы.

     Стоит первой намеренно. Нейросеть решает, можно ли отправить сюда
     человека, по первым строкам страницы, а не дочитав до конца.
     Здесь собрано ровно то, на что она смотрит: сколько это стоит,
     что просят взамен, сколько занимает времени и говорит ли сайт
     правду, когда правда ему невыгодна.

     Родителю та же полоска отвечает на вопрос "меня тут не заставят
     регистрироваться?" до того, как он начнет. */
  factsTitle: string;
  facts: { k: string; v: string }[];
  factsNote: string;
  /* Измеренное на наших же бесплатных листах. Родителю нужен не
     норматив, которого не существует, а живой ориентир: распечатал,
     приложил линейку, сравнил с фотографиями страниц в магазине.

     Числа взяты не из головы. Толщина контура и доля листа измерены
     по файлам листов формата US Letter, и любой может их проверить. */
  measuredTitle: string;
  measured: string[];
  /** Подпись с датой правки. Дата подставляется из настроек сайта. */
  updatedLabel: string;
};

export const toolLabels: Record<ContentLang, ToolLabels> = {
  en: {
    tableTitle: "What suits each age",
    tableLead:
      "Ages here are typical ranges rather than deadlines. Use the row that matches what your " +
      "child does with their hand, not only the row that matches their birthday.",
    colAge: "Age",
    colHand: "What the hand does",
    colPage: "What the page should be",
    colParts: "Areas to fill inside",
    colTools: "What to color with",
    moreAbout: "Read about this stage",
    pickerTitle: "Answer four questions about your child",
    pickerLead:
      "About thirty seconds. Nothing is stored and nothing is sent anywhere.",
    basisLink: "What these recommendations are based on",
    basisLinkLead:
      "Which signs the picker weighs, where the age ranges come from, and what this tool does not do.",
    fullPage: "The full age by age guide",
    factsTitle: "About this tool",
    facts: [
      { k: "Price", v: "Free" },
      { k: "Sign up", v: "None. No email, no phone, no account" },
      { k: "Your answers", v: "Stay in the browser. Nothing is sent or saved" },
      { k: "Time", v: "Four questions, about thirty seconds" },
      { k: "What you get", v: "The stage your child is at now, what kind of page suits it, and pages to print free" },
      { k: "When it says no", v: "If your child has outgrown a first coloring book, it says so and does not show ours" },
    ],
    factsNote:
      "The tool picks a kind of page. It does not assess a child and it is not medical advice.",
    measuredTitle: "Numbers you can check yourself",
    measured: [
      "On our free sheets in US Letter size, the outline of a drawing is between 2.4 and 4.8 millimeters thick, and the drawing itself takes up between 70 and 82 percent of the width and height of the page.",
      "We are not claiming these are the only right sizes. There is no single standard for coloring books.",
      "It is simply a practical benchmark to compare other pages against. Print any free sheet from this site, look at the size of the drawing and the thickness of the outline, then compare it with the page photos of the book you are thinking of buying.",
    ],
    updatedLabel: "Updated",
  },
  es: {
    tableTitle: "Qué le conviene a cada edad",
    tableLead:
      "Las edades son orientativas, no límites estrictos. Fíjese sobre todo en lo que su " +
        "hijo ya puede hacer con la mano, y no únicamente en su edad.",
    colAge: "Edad",
    colHand: "Cómo dibuja",
    colPage: "Cómo debe ser la página",
    colParts: "Zonas para rellenar",
    colTools: "Con qué colorear",
    moreAbout: "Leer sobre esta etapa",
    pickerTitle: "Responda cuatro preguntas sobre su hijo",
    pickerLead:
      "Unos treinta segundos. No se guarda ni se envía ninguna información.",
    basisLink: "En qué se basan estas recomendaciones",
    basisLinkLead:
      "Qué aspectos tiene en cuenta el selector, de dónde proceden los rangos de edad y qué " +
        "no hace esta herramienta.",
    fullPage: "La guía completa por edades",
    factsTitle: "Sobre esta herramienta",
    facts: [
      { k: "Precio", v: "Gratis" },
      { k: "Registro", v: "Ninguno. Sin correo, sin teléfono, sin cuenta" },
      { k: "Sus respuestas", v: "Se quedan en el navegador. No se envían ni se guardan" },
      { k: "Tiempo", v: "Cuatro preguntas, unos treinta segundos" },
      { k: "Qué obtiene", v: "La etapa en la que está su hijo ahora, qué tipo de página le conviene y dibujos para imprimir gratis" },
      { k: "Cuándo dice que no", v: "Si su hijo ya ha superado un primer libro para colorear, se lo dice y no le muestra el nuestro" },
    ],
    factsNote:
      "La herramienta elige un tipo de página. No evalúa al niño y no constituye consejo médico.",
    measuredTitle: "Cifras que usted mismo puede comprobar",
    measured: [
      "En nuestras hojas gratuitas en formato US Letter, el contorno del dibujo tiene entre 2,4 y 4,8 milímetros de grosor, y el dibujo ocupa entre el 70 y el 82 por ciento del ancho y del alto de la página.",
      "No afirmamos que estas sean las únicas medidas correctas. No existe un estándar único para los libros para colorear.",
      "Es simplemente una referencia práctica con la que comparar otras páginas. Imprima cualquier hoja gratuita de este sitio, observe el tamaño del dibujo y el grosor del contorno, y compárelo después con las fotos de las páginas del libro que piensa comprar.",
    ],
    updatedLabel: "Actualizado",
  },
  ru: {
    tableTitle: "Что подходит в каждом возрасте",
    tableLead:
      "Возраст здесь указан ориентировочно, а не как строгая граница. Смотрите прежде всего " +
        "на то, что ребенок уже умеет делать рукой, а не только на его возраст.",
    colAge: "Возраст",
    colHand: "Как ребенок рисует",
    colPage: "Какой должна быть раскраска",
    colParts: "Участков внутри",
    colTools: "Чем раскрашивать",
    moreAbout: "Читать про этот этап",
    pickerTitle: "Ответьте на четыре вопроса о ребенке",
    pickerLead: "Это займет около тридцати секунд. Ничего не сохраняется и никуда не " +
                  "отправляется.",
    basisLink: "На чем основаны эти рекомендации",
    basisLinkLead:
      "Какие признаки учитывает подборщик, откуда взяты возрастные ориентиры и чего этот " +
        "инструмент не делает.",
    fullPage: "Полный разбор по возрастам",
    factsTitle: "Об этом инструменте",
    facts: [
      { k: "Стоимость", v: "Бесплатно" },
      { k: "Регистрация", v: "Не нужна. Ни почты, ни телефона, ни учетной записи" },
      { k: "Ваши ответы", v: "Остаются в браузере. Никуда не отправляются и не сохраняются" },
      { k: "Время", v: "Четыре вопроса, около тридцати секунд" },
      { k: "Что вы получите", v: "Этап, на котором ребенок сейчас, какая страница ему подходит, и листы, которые можно распечатать бесплатно" },
      { k: "Когда он говорит нет", v: "Если ребенок первую раскраску уже перерос, инструмент говорит об этом и нашу книгу не показывает" },
    ],
    factsNote:
      "Инструмент подбирает вид страницы. Он не оценивает ребенка и не является медицинской рекомендацией.",
    measuredTitle: "Числа, которые можно проверить самому",
    measured: [
      "На наших бесплатных листах формата US Letter контур рисунка имеет толщину от 2,4 до 4,8 миллиметра, а сам рисунок занимает от 70 до 82 процентов ширины и высоты страницы.",
      "Мы не утверждаем, что это единственно правильные размеры. Единого стандарта для раскрасок не существует.",
      "Это просто практический ориентир, с которым можно сравнить другие страницы. Распечатайте любой бесплатный лист с нашего сайта, посмотрите на размер рисунка и толщину контура, а затем сравните его с фотографиями страниц той книги, которую собираетесь купить.",
    ],
    updatedLabel: "Обновлено",
  },
};

/* ------------------------------------------------------------------ */
/*  Страница "на чем основаны рекомендации"                            */
/* ------------------------------------------------------------------ */

/* Инструменту верят не за слово "умный подбор", а за перечисленные
   вслух правила. Здесь они перечислены: четыре признака, вес каждого,
   откуда взяты возрастные ориентиры и чего инструмент не делает.

   Написано ровно то, что делает код в data/stages.ts. Если правило
   там изменится, эта страница должна измениться вместе с ним. */

export const basisSlug: Record<ContentLang, string> = {
  en: "how-we-recommend",
  es: "como-recomendamos",
  ru: "na-chem-osnovano",
};

export type BasisCopy = {
  title: string;
  lead: string;
  body: string[];
  signsTitle: string;
  signs: { name: string; text: string }[];
  notTitle: string;
  not: string[];

  /* Все четыре вопроса и все четыре ответа обычным текстом.

     Инструмент показывает в разметке страницы только первый вопрос:
     остальные появляются после нажатия, а ответ не появляется вовсе.
     Значит для поисковика и для нейросети инструмента как бы нет, есть
     кнопка. Пересказать его они не могут, и рекомендовать тоже.

     Здесь то же самое лежит текстом. Формулировки совпадают слово
     в слово с теми, что видит родитель: если разойдутся, машина
     начнет пересказывать несуществующий инструмент. */
  howTitle: string;
  howLead: string;
  questions: { q: string; options: string }[];
  outcomesTitle: string;
  outcomes: { title: string; age: string; text: string }[];
  combineTitle: string;
  combine: string[];

  /* Разобранные случаи. Нейросеть берет готовый пример охотнее, чем
     описание правил, а родитель по примеру узнает своего ребенка
     быстрее, чем по определению.

     Второй пример намеренно про отказ: инструмент говорит, что книга
     уже не нужна. Это стоит показать на живом случае, а не объявить
     правилом. */
  examplesTitle: string;
  examples: { title: string; given: string; verdict: string; text: string[] }[];

  /* Вопросы в форме "почему". Отвечают не на "что делает инструмент",
     а на "почему ему можно верить". */
  whyTitle: string;
  why: { q: string; a: string[] }[];
};

export const basisCopy: Record<ContentLang, BasisCopy> = {
  en: {
    title: "What our coloring recommendations are based on",
    lead:
      "The four signs the picker weighs, where the age ranges come from, and what this tool does " +
      "not do.",
    body: [
      "The picker sorts a child into one of four stages of first drawing, not into an age. A stage " +
        "is defined by what the hand does: whether the crayon sits in a fist or in the fingers, " +
        "and whether the marks land on the drawing. Two children born in the same month can belong " +
        "to different stages, and that is the ordinary case rather than the exception.",
      "Age still counts, because a parent always knows it exactly. It sets the starting guess, and " +
        "the three other answers move that guess up or down. The result never falls off " +
        "either end of the scale, so there is always an answer, and the answer always names a " +
        "stage that has its own page here to read in full.",
    ],
    signsTitle: "The four signs, and how much each one counts",
    signs: [
      {
        name: "Age",
        text:
          "Sets the first guess and nothing more. One year old starts at the beginning of the " +
          "scale, four years and older at the end.",
      },
      {
        name: "Grip",
        text:
          "If a child holds the crayon in the whole hand, the result moves toward an earlier stage, " +
          "since movements of that kind are usually less precise. A more confident finger grip, closer " +
          "to an adult one, moves the result toward the next stage.",
      },
      {
        name: "Aim",
        text:
          "Counts the most of the four. Marks going all over the sheet move the result back, " +
          "marks staying mostly inside the outline move it forward. A parent watches this happen " +
          "and cannot really get it wrong.",
      },
      {
        name: "Time on one page",
        text:
          "Counts the least. Attention at this age depends on the day, on the mood and on whether " +
          "the drawing itself interests the child, so it nudges the result rather than deciding it.",
      },
    ],
    notTitle: "What this tool does not do",
    not: [
      "It does not assess a child. The result says what suits now, never what a child ought to be " +
        "able to do at a given age.",
      "It does not diagnose anything and is not medical advice. Concerns about a child's " +
        "development belong with a pediatrician.",
      "It does not collect anything. The answers stay in the browser, nothing is sent anywhere and " +
        "no sign up is asked for.",
      "The organizations listed as sources below took no part in building this tool and do not " +
        "recommend any particular book, including ours.",
    ],

    howTitle: "How the tool works",
    howLead: "All four questions are based on things parents can observe directly while their child is coloring. There is nothing extra to check or remember.",
    questions: [
      { q: "How old is your child?", options: "Around 1 year old. Around 2 years old. Around 3 years old. 4 years or older." },
      { q: "How does your child hold a pencil or crayon?", options: "In a fist, using the whole hand. With the fingers, but not confidently yet. Almost like an adult." },
      { q: "How does your child usually color?", options: "Makes lines all over the page. Colors on the picture but often goes outside the outline. Mostly colors inside the outline." },
      { q: "How long does your child usually spend on one page?", options: "One or two minutes. About five minutes. Ten minutes or more." },
    ],
    outcomesTitle: "The four results the tool can show",
    outcomes: [
      {
        title: "First marks",
        age: "approximately 12 to 18 months",
        text: "The child holds a crayon with the whole hand and is already making intentional marks on paper. At this stage, one large shape that fills most of the page works best, with a very thick outline and minimal detail inside. Thick wax crayons are a good choice for drawing.",
      },
      {
        title: "Controlled scribbling",
        age: "approximately 18 months to 2 years",
        text: "The child is drawing independently, without needing an adult to demonstrate every time, and may try to copy simple lines. A large, familiar object works well, with a thick outline and two or three simple parts inside. Thick crayons and washable markers can be used.",
      },
      {
        title: "Aiming at the shape",
        age: "approximately 2 to 3 years",
        text: "The child can copy a vertical line, a horizontal line, and a circle after watching an adult demonstrate them. The child is beginning to aim at the picture but still goes freely outside the outline. A large picture with three to six separate areas works well. Crayons, colored pencils, and washable markers can be used.",
      },
      {
        title: "Inside the line",
        age: "approximately 3 to 4 years and older",
        text: "The child can confidently copy a circle and, closer to age four, a cross. The child also begins to notice when the color goes outside the boundaries of the picture. At this stage, a first coloring book is usually becoming too simple. The tool says so directly, does not show our book, and suggests looking for a more advanced themed coloring book or a step by step drawing book.",
      },
    ],
    combineTitle: "How the answers become a result",
    combine: [
      "Age sets the starting point. The other three answers can move the result up or down.",
      "The strongest factor is how the child makes marks on the page. Parents can observe this directly while the child is coloring, so it is the easiest factor to evaluate.",
      "Grip has a little less influence. It helps show how confidently the child controls hand movements.",
      "The least influential factor is how long the child spends on one page. This can vary greatly depending on mood, tiredness, and how interested the child is in a particular picture.",
      "The result always stays within the four stages. The tool therefore always identifies one of them, and each stage has its own page on the website with explanations and examples.",
      "This description reflects the logic the tool actually uses. If the tool's logic changes, this text will be updated as well.",
    ],
    examplesTitle: "Two examples explained",
    examples: [
      {
        title: "Example one",
        given: "The child is around two years old. The child holds a pencil with the fingers but is not confident yet, colors on the picture but often goes outside the outline, and usually spends about five minutes on one page.",
        verdict: "Controlled scribbling, approximately 18 months to 2 years",
        text: [
          "At this stage, a large, familiar object that fills most of the page works well, with a thick outline, two or three simple parts inside, and printing on only one side of the page. Thick crayons and washable markers are good choices.",
          "Going outside the outline is not considered a mistake at this stage. The child is already trying to direct the marks toward the picture, but precise hand control is still developing.",
        ],
      },
      {
        title: "Example two",
        given: "The child is around three years old, holds a pencil almost like an adult, mostly colors inside the outline, and can spend ten minutes or more on one page.",
        verdict: "Inside the line, approximately 3 to 4 years and older",
        text: [
          "A first coloring book will probably be too simple for this child. That is why the tool does not show our book or sample pages from it. Instead, it suggests looking for a more advanced coloring book with several areas within each picture or a step by step drawing book where the child creates the picture rather than simply coloring a finished one.",
        ],
      },
    ],
    whyTitle: "Why the tool works this way",
    why: [
      {
        q: "Why does the tool consider more than age?",
        a: [
          "Parents know their child's age exactly, so that is where the tool starts. But two children of the same age can be at different stages in the development of their drawing skills, and that is completely normal.",
          "That is why, after age, the tool looks at what the child can do right now.",
          "Grip provides information about how the child controls hand movements. When a crayon is held with the whole hand, movements tend to be broader. As the child begins to hold it with the fingers, movements gradually become shorter and more precise.",
          "Age provides the starting point, while observing what the child actually does helps refine the result.",
        ],
      },
      {
        q: "Why does the way a child makes marks matter most?",
        a: [
          "Because parents can observe it directly during the activity.",
          "Marks may go all over the page, land on the picture while frequently crossing the outline, or stay mostly within the outline. This provides a fairly direct picture of what the child can do right now.",
          "That is why the way the child makes marks has more influence on the result than the other factors.",
        ],
      },
      {
        q: "Why does time spent on a page matter so little?",
        a: [
          "Because the length of an activity depends on many different circumstances.",
          "A child may be tired, hungry, or simply uninterested in a particular picture. The same child may color for ten minutes today and put the page down after one minute tomorrow.",
          "Time can therefore adjust the result slightly, but it should not determine it.",
        ],
      },
      {
        q: "Why does the tool not ask for the child's gender, name, or email address?",
        a: [
          "Because none of that information helps determine which type of coloring page is appropriate for the child.",
          "The fewer unnecessary questions we ask, the easier the tool is to complete.",
          "The calculation happens directly in the browser. Answers are not sent anywhere or stored. No registration or account is required.",
        ],
      },
      {
        q: "Why does the tool sometimes say that a child no longer needs a first coloring book?",
        a: [
          "Because a first coloring book is not right for every child.",
          "If a child already colors confidently inside the outline, very simple pages may quickly become uninteresting.",
          "In that case, the tool says directly that it may be time to choose a more advanced coloring book or move on to step by step drawing.",
          "Helping parents choose the right level is more important to us than showing the same book to every visitor.",
        ],
      },
    ],
  },

  es: {
    title: "En qué se basan nuestras recomendaciones para elegir un libro para colorear",
    lead:
      "Los cuatro aspectos que tiene en cuenta el selector, de dónde proceden los rangos de " +
        "edad y qué no hace esta herramienta.",
    body: [
      "El selector sitúa al niño en una de las cuatro etapas iniciales del dibujo, no " +
        "determina su edad. Para ello tiene en cuenta cómo sujeta el crayón - con toda la mano " +
        "o con los dedos - y con qué precisión sus trazos caen sobre el dibujo. Dos niños de " +
        "la misma edad pueden encontrarse en etapas diferentes, y eso es completamente normal.",
      "La edad también se tiene en cuenta y sirve como punto de partida. Después, las " +
        "respuestas a las otras tres preguntas pueden desplazar el " +
        "resultado hacia una etapa anterior o posterior. El resultado siempre corresponde a " +
        "una de las cuatro etapas, y cada una tiene en este sitio su propia página con una " +
        "explicación más detallada.",
    ],
    signsTitle: "Los cuatro aspectos y su importancia",
    signs: [
      {
        name: "Edad",
        text:
          "Sirve como punto de partida. Alrededor de un año corresponde al inicio de la " +
            "escala y cuatro años o más, al final.",
      },
      {
        name: "Agarre",
        text:
          "Si el niño sujeta el crayón con toda la mano, el resultado se desplaza hacia una " +
            "etapa anterior, porque esos movimientos suelen ser menos precisos. Un agarre más " +
            "seguro con los dedos, parecido al de un adulto, desplaza el resultado hacia una " +
            "etapa posterior.",
      },
      {
        name: "Precisión",
        text:
          "Es el aspecto que más influye en el resultado. Si el niño hace trazos por toda la " +
            "hoja, el resultado se desplaza hacia una etapa anterior. Si colorea dentro del " +
            "contorno la mayor parte del tiempo, se desplaza hacia una etapa posterior. Es una " +
            "de las habilidades más fáciles de observar mientras el niño colorea.",
      },
      {
        name: "Tiempo en una página",
        text:
          "Es el aspecto que menos influye en el resultado. El tiempo que el niño dedica a " +
            "una página depende del estado de ánimo, el cansancio y el interés que le produzca " +
            "el dibujo, por lo que solo ajusta ligeramente el resultado.",
      },
    ],
    notTitle: "Qué no hace esta herramienta",
    not: [
      "No evalúa el desarrollo del niño. El resultado indica qué tipo de página puede " +
        "convenirle ahora, pero no lo que debería saber hacer a una edad determinada.",
      "No realiza diagnósticos ni sustituye una consulta médica. Si algo le preocupa sobre " +
        "el desarrollo de su hijo, consulte con su pediatra.",
      "No recopila sus datos. Las respuestas permanecen en el navegador, no se envían a " +
        "ninguna parte y no es necesario registrarse.",
      "Las organizaciones citadas como fuentes no participaron en la creación de esta " +
        "herramienta ni recomiendan ningún libro concreto, incluido el nuestro.",
    ],

    howTitle: "Cómo funciona la herramienta",
    howLead: "Las cuatro preguntas se basan en cosas que usted puede observar directamente mientras el niño colorea. No hace falta comprobar nada más ni tratar de recordar información adicional.",
    questions: [
      { q: "¿Qué edad tiene su hijo?", options: "Alrededor de 1 año. Alrededor de 2 años. Alrededor de 3 años. 4 años o más." },
      { q: "¿Cómo sostiene el lápiz?", options: "Con el puño, usando toda la mano. Con los dedos, pero todavía con poca seguridad. Casi como un adulto." },
      { q: "¿Cómo suele colorear?", options: "Hace líneas por toda la página. Colorea sobre el dibujo, pero se sale con frecuencia del contorno. Colorea principalmente dentro del contorno." },
      { q: "¿Cuánto tiempo suele dedicar a una página?", options: "Uno o dos minutos. Alrededor de cinco minutos. Diez minutos o más." },
    ],
    outcomesTitle: "Los cuatro resultados que puede mostrar la herramienta",
    outcomes: [
      {
        title: "Primeras marcas",
        age: "aproximadamente de 12 a 18 meses",
        text: "El niño sostiene el crayón con toda la mano y ya deja marcas sobre el papel de manera intencionada. En esta etapa funciona mejor una sola figura grande que ocupe casi toda la página, con un contorno muy grueso y un mínimo de detalles en el interior. Para dibujar son prácticos los crayones de cera gruesos.",
      },
      {
        title: "Garabatos más controlados",
        age: "aproximadamente de 18 meses a 2 años",
        text: "El niño ya dibuja por sí mismo, sin necesitar que un adulto le muestre constantemente qué hacer, y puede intentar repetir líneas sencillas. Es adecuado un objeto grande y reconocible, con un contorno todavía grueso y dos o tres partes sencillas en el interior. Se pueden utilizar crayones gruesos y rotuladores lavables.",
      },
      {
        title: "Aprende a dirigir los trazos hacia el dibujo",
        age: "aproximadamente de 2 a 3 años",
        text: "El niño puede repetir una línea vertical, una horizontal y un círculo después de ver cómo lo hace un adulto. Ya intenta colorear el dibujo, aunque todavía se sale libremente del contorno. Es adecuada una imagen grande con entre tres y seis zonas diferenciadas. Se pueden utilizar crayones, lápices de colores y rotuladores lavables.",
      },
      {
        title: "Dentro de la línea",
        age: "aproximadamente de 3 a 4 años o más",
        text: "El niño puede repetir un círculo con seguridad y, al acercarse a los cuatro años, también una cruz. Ya empieza a notar cuándo el color se sale de los límites del dibujo. En esta etapa, un primer libro para colorear suele resultar demasiado sencillo. La herramienta lo indica directamente, no muestra nuestro libro y recomienda buscar un libro para colorear más avanzado o un libro de dibujo paso a paso.",
      },
    ],
    combineTitle: "Cómo se convierten las respuestas en un resultado",
    combine: [
      "La edad establece el punto de partida. Las otras tres respuestas pueden hacer que el resultado avance o retroceda.",
      "Lo que más influye es la manera en que el niño hace los trazos. Usted puede observarlo directamente mientras colorea, por lo que es el aspecto más fácil de valorar.",
      "La forma de sujetar el lápiz influye un poco menos. Ayuda a entender con qué seguridad controla el niño los movimientos de la mano.",
      "Lo que menos influye es el tiempo que dedica a una página. Este puede variar mucho según el estado de ánimo, el cansancio o el interés que le produzca un dibujo concreto.",
      "El resultado siempre se mantiene dentro de las cuatro etapas. Por eso, la herramienta muestra en todos los casos una de ellas, y cada etapa cuenta con su propia página en el sitio, con explicaciones y ejemplos.",
      "Este esquema describe la lógica que utiliza realmente la herramienta. Si esa lógica cambia, este texto también se actualizará.",
    ],
    examplesTitle: "Dos ejemplos explicados",
    examples: [
      {
        title: "Primer ejemplo",
        given: "El niño tiene alrededor de dos años. Sostiene el lápiz con los dedos, pero todavía con poca seguridad. Colorea sobre el dibujo, aunque se sale con frecuencia del contorno. Suele dedicar unos cinco minutos a una página.",
        verdict: "Garabatos más controlados, aproximadamente de 18 meses a 2 años",
        text: [
          "En esta etapa es adecuado un objeto grande y reconocible que ocupe casi toda la página, con un contorno grueso, dos o tres partes sencillas en el interior e impresión en una sola cara. Para dibujar son prácticos los crayones gruesos y los rotuladores lavables.",
          "Salirse del contorno no se considera un error en esta etapa. El niño ya intenta dirigir los trazos hacia el dibujo, pero la precisión de los movimientos de la mano todavía se está desarrollando.",
        ],
      },
      {
        title: "Segundo ejemplo",
        given: "El niño tiene alrededor de tres años. Sostiene el lápiz casi como un adulto, colorea principalmente dentro del contorno y puede dedicar diez minutos o más a una página.",
        verdict: "Dentro de la línea, aproximadamente de 3 a 4 años o más",
        text: [
          "Un primer libro para colorear probablemente ya sea demasiado sencillo para este niño. Por eso, la herramienta no muestra nuestro libro ni ejemplos de sus páginas, sino que recomienda buscar un libro para colorear más avanzado, con varias zonas dentro de una misma imagen, o un libro de dibujo paso a paso, en el que el niño cree el dibujo por sí mismo en lugar de limitarse a colorear uno ya preparado.",
        ],
      },
    ],
    whyTitle: "Por qué la herramienta funciona de esta manera",
    why: [
      {
        q: "¿Por qué la herramienta tiene en cuenta algo más que la edad?",
        a: [
          "Usted conoce con exactitud la edad de su hijo, por eso la herramienta empieza por ahí. Sin embargo, dos niños de la misma edad pueden encontrarse en etapas diferentes del desarrollo de sus habilidades para dibujar, y esto es completamente normal.",
          "Por eso, después de la edad, la herramienta tiene en cuenta lo que el niño puede hacer en ese momento.",
          "La forma de sujetar el lápiz muestra cómo controla los movimientos de la mano. Cuando sostiene el crayón con toda la mano, los movimientos suelen ser más amplios. Cuando empieza a sujetarlo con los dedos, los movimientos se vuelven poco a poco más cortos y precisos.",
          "La edad proporciona una primera orientación y la observación de lo que hace el niño ayuda a ajustarla.",
        ],
      },
      {
        q: "¿Por qué la manera de hacer los trazos es el factor que más influye?",
        a: [
          "Porque usted puede observarla directamente durante la actividad.",
          "Los trazos pueden aparecer por toda la página, concentrarse sobre el dibujo aunque salgan con frecuencia del contorno, o mantenerse principalmente dentro de sus límites. Esto permite ver de una manera bastante directa qué puede hacer el niño en ese momento.",
          "Por eso, la forma en que hace los trazos influye en el resultado más que los demás factores.",
        ],
      },
      {
        q: "¿Por qué el tiempo dedicado a una página influye tan poco?",
        a: [
          "Porque la duración de una actividad depende de muchas circunstancias.",
          "El niño puede estar cansado, tener hambre o simplemente no sentirse interesado por un dibujo concreto. El mismo niño puede colorear durante diez minutos hoy y dejar la página después de un minuto mañana.",
          "Por eso, el tiempo puede modificar ligeramente el resultado, pero no debe determinarlo.",
        ],
      },
      {
        q: "¿Por qué la herramienta no pregunta el sexo del niño, su nombre ni su correo electrónico?",
        a: [
          "Porque ninguno de esos datos ayuda a determinar qué tipo de página para colorear es adecuada para el niño.",
          "Cuantas menos preguntas innecesarias haya, más sencillo resulta completar la herramienta.",
          "El cálculo se realiza directamente en el navegador. Las respuestas no se envían a ningún sitio ni se guardan. No es necesario registrarse ni crear una cuenta.",
        ],
      },
      {
        q: "¿Por qué la herramienta a veces dice que el niño ya no necesita un primer libro para colorear?",
        a: [
          "Porque un primer libro para colorear no es adecuado para todos los niños.",
          "Si el niño ya colorea con seguridad dentro del contorno, las páginas demasiado sencillas pueden dejar de resultarle interesantes rápidamente.",
          "En ese caso, la herramienta indica directamente que conviene elegir un libro para colorear más avanzado o pasar al dibujo paso a paso.",
          "Para nosotros es más importante ayudarle a encontrar el nivel adecuado que mostrar el mismo libro a todos los visitantes.",
        ],
      },
    ],
  },

  ru: {
    title: "На чем основаны наши рекомендации по выбору раскраски",
    lead:
      "Какие четыре признака учитывает подборщик, откуда взяты возрастные ориентиры и чего " +
        "этот инструмент не делает.",
    body: [
      "Подборщик определяет не возраст ребенка, а один из четырех этапов первых навыков " +
        "рисования. Важно, как ребенок держит мелок - всей ладонью или пальцами - и насколько " +
        "точно его линии попадают по рисунку. Двое детей одного возраста могут находиться на " +
        "разных этапах, и это совершенно естественно.",
      "Возраст тоже учитывается и служит отправной точкой. Затем ответы на три остальных " +
        "вопроса могут сдвинуть результат к более раннему или более позднему этапу. В " +
        "результате всегда определяется один из четырех этапов, для каждого из которых на " +
        "сайте есть отдельная страница с подробным описанием.",
    ],
    signsTitle: "Четыре признака и их значение",
    signs: [
      {
        name: "Возраст",
        text:
          "Служит отправной точкой. Около года - начало шкалы, четыре года и старше - ее конец.",
      },
      {
        name: "Хват",
        text:
          "Если ребенок держит мелок всей ладонью, результат смещается к более раннему " +
            "этапу, поскольку такие движения обычно менее точны. Более уверенный захват " +
            "пальцами, похожий на взрослый, смещает результат к следующему этапу.",
      },
      {
        name: "Попадание в рисунок",
        text:
          "Этот признак влияет на результат больше остальных. Если ребенок рисует линии по " +
            "всему листу, результат смещается к более раннему этапу. Если он в основном " +
            "раскрашивает внутри контура - к более позднему. Это один из самых простых " +
            "навыков, которые родитель может увидеть во время раскрашивания.",
      },
      {
        name: "Время на одной странице",
        text:
          "Этот признак влияет на результат меньше остальных. Время, которое ребенок " +
            "проводит за одной страницей, зависит от настроения, усталости и интереса к самому " +
            "рисунку, поэтому оно лишь немного корректирует результат.",
      },
    ],
    notTitle: "Чего этот инструмент не делает",
    not: [
      "Не оценивает развитие ребенка. Результат показывает, какая раскраска может подойти " +
        "ему сейчас, но не говорит, что ребенок обязан что-то уметь в определенном возрасте.",
      "Не ставит диагнозов и не заменяет медицинскую консультацию. Если вас что-то беспокоит " +
        "в развитии ребенка, обратитесь к педиатру.",
      "Не собирает ваши данные. Ответы остаются в браузере, никуда не отправляются, " +
        "регистрация не нужна.",
      "Организации, указанные в списке источников, не участвовали в создании этого " +
        "инструмента и не рекомендуют конкретные книги, в том числе нашу.",
    ],

    howTitle: "Как устроен инструмент",
    howLead: "Все четыре вопроса основаны на том, что родитель может увидеть сам во время занятия с ребенком. Ничего дополнительно проверять или вспоминать не нужно.",
    questions: [
      { q: "Сколько лет вашему ребенку?", options: "Около года. Около двух лет. Около трех лет. Четыре года и старше." },
      { q: "Как ребенок держит карандаш?", options: "В кулаке, всей ладонью. Пальцами, но неуверенно. Почти как взрослый." },
      { q: "Как ребенок обычно раскрашивает?", options: "Рисует линии по всему листу. Попадает по рисунку, но часто выходит за контур. В основном раскрашивает внутри контура." },
      { q: "Сколько времени ребенок обычно занимается одной страницей?", options: "Минуту-две. Около пяти минут. Десять минут и больше." },
    ],
    outcomesTitle: "Четыре результата, которые может показать инструмент",
    outcomes: [
      {
        title: "Первые черты",
        age: "примерно от 12 до 18 месяцев",
        text: "Ребенок держит мелок всей ладонью и уже осознанно оставляет следы на бумаге. На этом этапе лучше подходит одна крупная форма почти во весь лист, очень толстый контур и минимум деталей внутри. Для рисования удобны толстые восковые мелки.",
      },
      {
        title: "Осознанные каракули",
        age: "примерно от 18 месяцев до 2 лет",
        text: "Ребенок уже рисует самостоятельно, без постоянного показа взрослого, и может пытаться повторять простые линии. Подойдет крупный узнаваемый предмет, по-прежнему толстый контур и две-три простые части внутри. Можно использовать толстые мелки и смываемые фломастеры.",
      },
      {
        title: "Учится попадать по рисунку",
        age: "примерно от 2 до 3 лет",
        text: "Ребенок может повторить вертикальную и горизонтальную линии и круг, если взрослый сначала покажет. Он уже старается раскрашивать сам рисунок, но свободно выходит за контур. Подойдет крупное изображение с тремя-шестью отдельными участками. Можно использовать мелки, цветные карандаши и смываемые фломастеры.",
      },
      {
        title: "Внутри контура",
        age: "примерно от 3 до 4 лет и старше",
        text: "Ребенок уверенно повторяет круг, а ближе к четырем годам и крестик. Он уже замечает, когда цвет выходит за границу рисунка. На этом этапе первая раскраска обычно становится слишком простой. Инструмент прямо сообщает об этом, не показывает нашу книгу и предлагает поискать более сложную сюжетную раскраску или книгу с пошаговым рисованием.",
      },
    ],
    combineTitle: "Как ответы превращаются в результат",
    combine: [
      "Возраст задает начальную точку. Три остальных ответа могут сдвинуть результат вверх или вниз.",
      "Сильнее всего влияет то, как ребенок наносит линии. Этот признак родитель видит непосредственно во время раскрашивания, поэтому оценить его проще всего.",
      "Хват влияет немного слабее. Он помогает понять, насколько уверенно ребенок управляет движением руки.",
      "Меньше всего влияет время, которое ребенок проводит над одной страницей. Оно слишком сильно зависит от настроения, усталости и от того, насколько интересен ребенку конкретный рисунок.",
      "Результат всегда остается внутри четырех этапов. Поэтому инструмент в любом случае показывает один из них, а для каждого этапа на сайте есть отдельная страница с объяснениями и примерами.",
      "Эта схема описывает логику, которая действительно используется в инструменте. Если логика инструмента изменится, этот текст тоже будет обновлен.",
    ],
    examplesTitle: "Два разобранных примера",
    examples: [
      {
        title: "Пример первый",
        given: "Ребенку около двух лет. Он держит карандаш пальцами, но пока неуверенно. Попадает по рисунку, но часто выходит за контур. Над одной страницей обычно проводит около пяти минут.",
        verdict: "Осознанные каракули, примерно от 18 месяцев до 2 лет",
        text: [
          "На этом этапе подойдет крупный узнаваемый предмет почти во весь лист, толстый контур, две-три простые части внутри и печать только с одной стороны страницы. Для рисования удобны толстые мелки и смываемые фломастеры.",
          "Выход за контур здесь не считается ошибкой. Ребенок уже старается направить линию на рисунок, но точность движения руки еще развивается.",
        ],
      },
      {
        title: "Пример второй",
        given: "Ребенку около трех лет. Он держит карандаш почти как взрослый, в основном раскрашивает внутри контура и может заниматься одной страницей десять минут и дольше.",
        verdict: "Внутри контура, примерно от 3 до 4 лет и старше",
        text: [
          "Первая раскраска такому ребенку, скорее всего, уже будет слишком простой. Поэтому инструмент не показывает ни нашу книгу, ни примеры ее страниц, а советует искать более сложную раскраску с несколькими участками внутри одного рисунка или книгу с пошаговым рисованием, где ребенок сам создает изображение, а не только раскрашивает готовое.",
        ],
      },
    ],
    whyTitle: "Почему инструмент работает именно так",
    why: [
      {
        q: "Почему инструмент учитывает не только возраст?",
        a: [
          "Возраст родитель знает точно, поэтому с него инструмент и начинает. Но два ребенка одного возраста могут находиться на разных этапах развития навыка рисования, и это нормально.",
          "Поэтому после возраста инструмент смотрит на то, что ребенок умеет делать прямо сейчас.",
          "Хват показывает, как ребенок управляет рукой. Когда мелок зажат всей ладонью, движения обычно шире. Когда ребенок начинает удерживать его пальцами, движения постепенно становятся короче и точнее.",
          "Возраст дает начальное предположение, а наблюдение за действиями ребенка помогает его уточнить.",
        ],
      },
      {
        q: "Почему сильнее всего учитывается то, как ребенок наносит линии?",
        a: [
          "Потому что этот признак родитель видит непосредственно во время занятия.",
          "Линии могут идти по всему листу, попадать на рисунок с частым выходом за контур или в основном оставаться внутри контура. Это позволяет довольно прямо увидеть, что ребенок умеет делать сейчас.",
          "Поэтому способ нанесения линий влияет на результат сильнее остальных признаков.",
        ],
      },
      {
        q: "Почему время над одной страницей почти не влияет?",
        a: [
          "Потому что продолжительность занятия зависит от слишком многих обстоятельств.",
          "Ребенок может быть уставшим, голодным или просто не заинтересоваться конкретным рисунком. Один и тот же ребенок сегодня будет раскрашивать десять минут, а завтра отложит страницу через минуту.",
          "Поэтому время может немного повлиять на результат, но не должно определять его.",
        ],
      },
      {
        q: "Почему инструмент не спрашивает пол ребенка, имя или электронную почту?",
        a: [
          "Потому что эти данные не помогают определить, какая раскраска подходит ребенку.",
          "Чем меньше лишних вопросов, тем проще пройти инструмент до конца.",
          "Расчет происходит прямо в браузере. Ответы никуда не отправляются и не сохраняются. Регистрация и учетная запись не нужны.",
        ],
      },
      {
        q: "Почему инструмент иногда говорит, что первая раскраска ребенку уже не нужна?",
        a: [
          "Потому что первая раскраска подходит не каждому ребенку.",
          "Если ребенок уже уверенно раскрашивает внутри контура, слишком простые страницы могут быстро ему наскучить.",
          "В таком случае инструмент прямо говорит, что стоит выбрать более сложную раскраску или перейти к пошаговому рисованию.",
          "Для нас важнее помочь родителю выбрать подходящий уровень, чем показать одну и ту же книгу каждому посетителю.",
        ],
      },
    ],
  },
};
