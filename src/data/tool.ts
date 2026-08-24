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
      "Age is not what decides this. An eighteen month old may already hold a crayon steadily " +
        "with the fingers, while a three year old still scribbles across the sheet, and both are " +
        "developing normally. The hand shows it more honestly than the birthday: how the crayon is " +
        "held, and whether the marks land on the drawing. That is why the picker below asks about " +
        "age and about the hand, and weighs the hand more heavily.",
      "The picker looks at four signs: age, grip, aim, and how long the child stays with one page. " +
        "Age gives the first guess. Aim corrects it the most, because a parent sees it with their " +
        "own eyes and cannot really get it wrong. Time on one page counts least, since attention " +
        "depends on the day and on whether the drawing itself is interesting. The answers stay in " +
        "the browser: nothing is sent anywhere and nothing is saved.",
      "This picks a page, it does not assess a child. The result answers what suits now, never " +
        "what a child ought to be able to do. Age ranges here come from published developmental " +
        "milestones, listed at the bottom of this page, and a few months either way is ordinary. " +
        "If something about your child's development worries you, that is a conversation for your " +
        "pediatrician rather than for a website.",
    ],
    faq: [
      {
        q: "What kind of coloring page suits a one year old?",
        a:
          "One large shape that fills the sheet, a very thick outline, and almost nothing inside " +
          "it. At this age a child holds the crayon in a fist and moves from the shoulder, so the " +
          "marks are long and sweeping and a thin line disappears underneath them. A one year old " +
          "is not trying to fill the shape, and does not need to.",
      },
      {
        q: "Should a two year old color inside the lines?",
        a:
          "No. At two a child is still learning to hold the crayon with the fingers and to aim at " +
          "the drawing at all. A thick outline works as a visible target, but going over it is " +
          "normal and expected. Asking for neat edges at this age is the fastest way to make a " +
          "child put the crayon down.",
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
          "There is no target. One or two minutes is ordinary at a year old, five minutes is " +
          "common at two, and ten minutes or more happens closer to three. Stopping when the " +
          "child loses interest and coming back to the same page later is fine, and repeating one " +
          "favorite drawing many times is fine too.",
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
        "the three questions about the hand move that guess up or down. The result never falls off " +
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
          "A crayon held in a fist moves the result toward the beginning of the scale whatever " +
          "the age, because the whole hand moving from the shoulder cannot aim yet. An adult " +
          "style grip moves it forward.",
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
        "respuestas a las tres preguntas sobre las habilidades del niño pueden desplazar el " +
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
      "Возраст тоже учитывается и служит отправной точкой. Затем ответы на три вопроса о " +
        "навыках ребенка могут сдвинуть результат к более раннему или более позднему этапу. В " +
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
  },
};
