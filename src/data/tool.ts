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
      "Responda cuatro preguntas sobre lo que su hijo hace con la mano y vea qué tipo de página le " +
      "conviene ahora. No se guarda nada y no hace falta registrarse.",
    body: [
      "Alrededor del año, un niño necesita una sola forma grande que llene la hoja, un contorno " +
        "muy grueso y casi ningún detalle dentro. Alrededor de los dos años el contorno sigue " +
        "siendo grueso, pero la forma ya puede tener dos o tres partes. Alrededor de los tres " +
        "funciona un dibujo grande con varias zonas separadas, porque el niño ya puede elegir un " +
        "color distinto para cada una. A partir de los cuatro años un primer libro para colorear " +
        "empieza a resultar demasiado fácil, y le conviene más un libro con más detalle dentro de " +
        "un mismo dibujo o un libro de dibujo paso a paso.",
      "La edad no es lo que decide. Un niño de dieciocho meses puede sostener el crayón con los " +
        "dedos con firmeza, mientras que uno de tres todavía garabatea por toda la hoja, y los dos " +
        "se desarrollan con normalidad. La mano lo muestra con más honestidad que el cumpleaños: " +
        "cómo agarra el crayón y si las marcas caen sobre el dibujo. Por eso el selector de abajo " +
        "pregunta por la edad y por la mano, y da más peso a la mano.",
      "El selector mira cuatro señales: edad, agarre, puntería y cuánto tiempo se queda el niño " +
        "con una página. La edad da la primera suposición. La puntería es la que más la corrige, " +
        "porque el padre o la madre la ve con sus propios ojos y ahí no hay error posible. El " +
        "tiempo en una página es lo que menos pesa, porque la atención depende del día y de si el " +
        "dibujo le interesa. Las respuestas se quedan en el navegador: no se envían a ninguna " +
        "parte y no se guardan.",
      "Esto elige una página, no evalúa a un niño. El resultado responde qué le conviene ahora, " +
        "nunca qué debería saber hacer. Los rangos de edad vienen de hitos del desarrollo " +
        "publicados, indicados al final de esta página, y unos meses de diferencia en cualquier " +
        "sentido es algo corriente. Si algo del desarrollo de su hijo le preocupa, esa " +
        "conversación es con su pediatra y no con un sitio web.",
    ],
    faq: [
      {
        q: "¿Qué tipo de dibujo para colorear le conviene a un niño de un año?",
        a:
          "Una sola forma grande que llene la hoja, un contorno muy grueso y casi nada dentro. A " +
          "esta edad el niño agarra el crayón con el puño y mueve el hombro, así que las marcas " +
          "son largas y amplias y una línea fina desaparece debajo. Un niño de un año no intenta " +
          "rellenar la forma, y no hace falta que lo haga.",
      },
      {
        q: "¿Debe un niño de dos años colorear dentro de las líneas?",
        a:
          "No. A los dos años todavía está aprendiendo a sujetar el crayón con los dedos y a " +
          "apuntar al dibujo. Un contorno grueso sirve como referencia visible, pero salirse de él " +
          "es normal y esperable. Exigir bordes limpios a esta edad es la manera más rápida de que " +
          "el niño suelte el crayón.",
      },
      {
        q: "¿Qué debe tener un primer libro para colorear?",
        a:
          "Dibujos grandes y reconocibles, contornos gruesos, un dibujo por página, muy pocos " +
          "detalles finos, impresión por una sola cara para que el rotulador no arruine la hoja " +
          "siguiente, y motivos que el niño ya sepa nombrar. Una palabra impresa debajo del dibujo " +
          "ayuda, porque nombrar la imagen es la mitad de la razón por la que sigue en la mesa.",
      },
      {
        q: "¿Qué crayones van mejor para los más pequeños?",
        a:
          "Los crayones gruesos pensados para esta edad son los más fáciles, porque una mano " +
          "pequeña los sostiene con el puño y dejan una marca ancha y visible. Los rotuladores " +
          "lavables son la opción práctica más adelante, cuando el niño ya apunta al dibujo. " +
          "Colorear es una actividad para hacer con un adulto cerca, sea cual sea el material.",
      },
      {
        q: "¿Para qué imprimir una palabra debajo de cada dibujo?",
        a:
          "Porque le da al adulto algo que decir. El niño oye el nombre, mira la imagen y une las " +
          "dos cosas, y la página se convierte en una conversación corta en lugar de una tarea " +
          "silenciosa. Además la misma hoja sirve dos veces: una para colorear y otra para nombrar " +
          "lo que hay en ella.",
      },
      {
        q: "¿Cuánto tiempo debe colorear un niño pequeño?",
        a:
          "No hay una cifra que alcanzar. Uno o dos minutos es lo corriente al año, cinco minutos " +
          "es habitual a los dos, y diez minutos o más aparece cerca de los tres. Parar cuando el " +
          "niño pierde el interés y volver a la misma hoja más tarde está bien, y repetir muchas " +
          "veces el dibujo preferido también.",
      },
    ],
  },

  ru: {
    title: "Как выбрать первую раскраску для ребенка от 1 до 3 лет",
    lead:
      "Ответьте на четыре вопроса о том, что ребенок делает рукой, и увидите, какая страница ему " +
      "подходит сейчас. Ничего не сохраняется, регистрация не нужна.",
    body: [
      "Ребенку около года подходит одна крупная форма во весь лист, очень толстый контур и почти " +
        "никаких деталей внутри. Около двух лет контур остается толстым, но форма уже может " +
        "состоять из двух-трех частей. Около трех лет работает крупный рисунок с несколькими " +
        "отдельными участками, потому что ребенок уже выбирает для каждого свой цвет. После " +
        "четырех лет первая раскраска начинает казаться слишком легкой, и подойдет книга, где " +
        "внутри одного рисунка больше подробностей, или книга с рисованием по шагам.",
      "Решает здесь не возраст. Полуторагодовалый ребенок может уверенно держать мелок пальцами, " +
        "а трехлетний все еще черкать поперек листа, и оба развиваются нормально. Рука показывает " +
        "точнее, чем дата рождения: как ребенок держит мелок и попадают ли черты по рисунку. " +
        "Поэтому подбор ниже спрашивает и про возраст, и про руку, а руку считает важнее.",
      "Подбор смотрит на четыре признака: возраст, хват, попадание в рисунок и время на одной " +
        "странице. Возраст дает первую догадку. Попадание правит ее сильнее всего, потому что " +
        "родитель видит его своими глазами и тут не ошибется. Время на одной странице весит " +
        "меньше остального: усидчивость сильно зависит от дня и от того, интересен ли ребенку сам " +
        "рисунок. Ответы остаются в браузере, никуда не уходят и нигде не сохраняются.",
      "Это подбор страницы, а не оценка ребенка. Ответ говорит, что подойдет сейчас, и никогда не " +
        "говорит, что ребенок должен уметь. Возрастные ориентиры взяты из опубликованных " +
        "материалов о развитии, они названы внизу страницы, и несколько месяцев в любую сторону " +
        "это обычное дело. Если вас что-то беспокоит в развитии ребенка, это разговор с " +
        "педиатром, а не с сайтом.",
    ],
    faq: [
      {
        q: "Какая раскраска подходит ребенку в 1 год?",
        a:
          "Одна крупная форма во весь лист, очень толстый контур и почти ничего внутри. В этом " +
          "возрасте ребенок держит мелок в кулаке и двигает плечом, поэтому черты выходят " +
          "длинными и размашистыми, а тонкая линия под ними пропадает. Годовалый не пытается " +
          "закрасить форму целиком, и этого от него не нужно.",
      },
      {
        q: "Должен ли двухлетний ребенок раскрашивать внутри контура?",
        a:
          "Нет. В два года ребенок еще учится держать мелок пальцами и вообще целиться в рисунок. " +
          "Толстый контур работает как заметный ориентир, но выходить за него нормально и " +
          "ожидаемо. Требовать аккуратных краев в этом возрасте это самый быстрый способ добиться " +
          "того, что мелок будет отложен.",
      },
      {
        q: "Что должно быть в первой раскраске?",
        a:
          "Крупные узнаваемые рисунки, толстый контур, один рисунок на странице, минимум мелких " +
          "деталей, печать с одной стороны, чтобы фломастер не испортил следующий лист, и темы, " +
          "которые ребенок уже может назвать вслух. Слово под рисунком помогает: половина " +
          "интереса малыша держится именно на том, что картинку можно назвать.",
      },
      {
        q: "Какие мелки подходят малышам?",
        a:
          "Проще всего толстые мелки, сделанные для этого возраста: маленькая рука держит их в " +
          "кулаке, и след выходит широким и заметным. Смываемые фломастеры удобны позже, когда " +
          "ребенок уже целится в рисунок. Раскрашивание в любом случае занятие рядом со взрослым, " +
          "какой бы материал ни был выбран.",
      },
      {
        q: "Зачем печатать слово под рисунком?",
        a:
          "Потому что взрослому есть что сказать. Ребенок слышит название, смотрит на картинку и " +
          "связывает одно с другим, и страница превращается в короткий разговор вместо молчаливой " +
          "работы. К тому же один лист работает дважды: сначала его раскрашивают, потом называют " +
          "то, что на нем нарисовано.",
      },
      {
        q: "Сколько времени ребенок должен заниматься раскраской?",
        a:
          "Никакой нормы нет. Минута-две это обычное дело в год, около пяти минут привычно в два " +
          "года, десять минут и больше появляются ближе к трем. Закончить, когда ребенок потерял " +
          "интерес, и вернуться к тому же листу позже это нормально, и много раз повторять один " +
          "любимый рисунок тоже нормально.",
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
      es: "Agarra el crayón con el puño, marcas amplias desde el hombro",
      ru: "Держит мелок в кулаке, размашистые черты от плеча",
    },
    page: {
      en: "One large shape filling the sheet, very thick outline",
      es: "Una forma grande que llena la hoja, contorno muy grueso",
      ru: "Одна крупная форма во весь лист, очень толстый контур",
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
      es: "Con los dedos, sin firmeza. Bucles y trazos arriba abajo a propósito",
      ru: "Пальцами, но неуверенно. Нарочные петли и черты сверху вниз",
    },
    page: {
      en: "Large recognizable subject, outline still thick",
      es: "Motivo grande y reconocible, contorno todavía grueso",
      ru: "Крупный узнаваемый предмет, контур по-прежнему толстый",
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
      es: "Con los dedos y no con el puño, copia un círculo y una línea recta",
      ru: "Пальцами, а не кулаком, повторяет круг и прямую линию",
    },
    page: {
      en: "Large drawing with separate areas to fill differently",
      es: "Dibujo grande con zonas separadas para rellenar de otro color",
      ru: "Крупный рисунок с отдельными участками под разные цвета",
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
      es: "Se queda dentro del contorno casi siempre y nota cuándo se sale",
      ru: "Большую часть времени остается внутри контура и замечает, когда вышел",
    },
    page: {
      en: "A scene rather than one object, or step by step drawing",
      es: "Una escena en vez de un objeto suelto, o dibujo paso a paso",
      ru: "Сюжет вместо одного предмета или рисование по шагам",
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
      "Las edades de aquí son rangos habituales y no plazos. Use la fila que coincide con lo que " +
      "su hijo hace con la mano, y no solo la que coincide con su cumpleaños.",
    colAge: "Edad",
    colHand: "Qué hace la mano",
    colPage: "Cómo debe ser la página",
    colParts: "Zonas para rellenar",
    colTools: "Con qué colorear",
    moreAbout: "Leer sobre esta etapa",
    pickerTitle: "Responda cuatro preguntas sobre su hijo",
    pickerLead:
      "Unos treinta segundos. No se guarda nada ni se envía nada a ninguna parte.",
    basisLink: "En qué se basan estas recomendaciones",
    basisLinkLead:
      "Qué señales pesa el selector, de dónde salen los rangos de edad y qué no hace esta herramienta.",
    fullPage: "La guía completa por edades",
  },
  ru: {
    tableTitle: "Что подходит в каждом возрасте",
    tableLead:
      "Возраст здесь это обычный разброс, а не срок. Смотрите на ту строку, которая совпадает с " +
      "тем, что ребенок делает рукой, а не только на ту, что совпадает с днем рождения.",
    colAge: "Возраст",
    colHand: "Что делает рука",
    colPage: "Какой должна быть страница",
    colParts: "Участков внутри",
    colTools: "Чем раскрашивать",
    moreAbout: "Читать про этот этап",
    pickerTitle: "Ответьте на четыре вопроса о ребенке",
    pickerLead: "Около тридцати секунд. Ничего не сохраняется и никуда не уходит.",
    basisLink: "На чем основаны эти рекомендации",
    basisLinkLead:
      "Какие признаки учитывает подбор, откуда взяты возрастные ориентиры и чего этот инструмент не делает.",
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
    title: "En qué se basan nuestras recomendaciones para colorear",
    lead:
      "Las cuatro señales que pesa el selector, de dónde salen los rangos de edad y qué no hace " +
      "esta herramienta.",
    body: [
      "El selector sitúa al niño en una de las cuatro etapas del primer dibujo, no en una edad. " +
        "Una etapa se define por lo que hace la mano: si el crayón está en el puño o en los dedos, " +
        "y si las marcas caen sobre el dibujo. Dos niños nacidos el mismo mes pueden estar en " +
        "etapas distintas, y ese es el caso corriente y no la excepción.",
      "La edad cuenta igualmente, porque un padre siempre la sabe con exactitud. Marca la " +
        "suposición inicial, y las tres preguntas sobre la mano mueven esa suposición hacia " +
        "delante o hacia atrás. El resultado nunca se sale de la escala, así que siempre hay una " +
        "respuesta, y esa respuesta siempre nombra una etapa que tiene aquí su propia página para " +
        "leerla entera.",
    ],
    signsTitle: "Las cuatro señales y cuánto pesa cada una",
    signs: [
      {
        name: "Edad",
        text:
          "Marca la primera suposición y nada más. Un año empieza al principio de la escala, " +
          "cuatro años en adelante al final.",
      },
      {
        name: "Agarre",
        text:
          "Un crayón sujeto con el puño mueve el resultado hacia el principio de la escala sea " +
          "cual sea la edad, porque una mano entera que se mueve desde el hombro todavía no puede " +
          "apuntar. Un agarre parecido al de un adulto lo mueve hacia delante.",
      },
      {
        name: "Puntería",
        text:
          "Es la que más pesa de las cuatro. Marcas por toda la hoja mueven el resultado hacia " +
          "atrás, marcas que se quedan casi siempre dentro del contorno lo mueven hacia delante. " +
          "Es algo que el padre o la madre ve suceder y ahí no hay error posible.",
      },
      {
        name: "Tiempo en una página",
        text:
          "Es la que menos pesa. La atención a esta edad depende del día, del humor y de si el " +
          "dibujo le interesa al niño, así que empuja el resultado en lugar de decidirlo.",
      },
    ],
    notTitle: "Qué no hace esta herramienta",
    not: [
      "No evalúa al niño. El resultado dice qué le conviene ahora, nunca qué debería saber hacer " +
        "a una edad determinada.",
      "No diagnostica nada y no es consejo médico. Las dudas sobre el desarrollo de un niño son " +
        "para el pediatra.",
      "No recoge nada. Las respuestas se quedan en el navegador, no se envía nada a ninguna parte " +
        "y no se pide registro.",
      "Las organizaciones citadas como fuentes más abajo no participaron en la creación de esta " +
        "herramienta y no recomiendan ningún libro concreto, tampoco el nuestro.",
    ],
  },

  ru: {
    title: "На чем основаны наши рекомендации по раскраскам",
    lead:
      "Четыре признака, которые учитывает подбор, откуда взяты возрастные ориентиры и чего этот " +
      "инструмент не делает.",
    body: [
      "Подбор относит ребенка к одному из четырех этапов первого рисования, а не к возрасту. Этап " +
        "определяется тем, что делает рука: лежит мелок в кулаке или в пальцах и попадают ли " +
        "черты по рисунку. Двое детей, родившихся в один месяц, могут оказаться на разных этапах, " +
        "и это обычное дело, а не исключение.",
      "Возраст при этом учитывается, потому что родитель всегда знает его точно. Он задает " +
        "первую догадку, а три вопроса про руку сдвигают эту догадку вперед или назад. Итог " +
        "никогда не выходит за края шкалы, поэтому ответ есть всегда, и в ответе всегда назван " +
        "этап, у которого здесь же есть своя страница с подробным разбором.",
    ],
    signsTitle: "Четыре признака и вес каждого",
    signs: [
      {
        name: "Возраст",
        text:
          "Задает первую догадку и больше ничего. Год это начало шкалы, четыре года и старше ее " +
          "конец.",
      },
      {
        name: "Хват",
        text:
          "Мелок в кулаке сдвигает итог к началу шкалы в любом возрасте, потому что рука, которая " +
          "движется от плеча целиком, еще не умеет целиться. Хват, похожий на взрослый, сдвигает " +
          "итог вперед.",
      },
      {
        name: "Попадание в рисунок",
        text:
          "Весит больше остальных трех. Черты по всему листу сдвигают итог назад, черты, которые " +
          "в основном остаются внутри контура, сдвигают вперед. Родитель видит это своими глазами " +
          "и тут не ошибется.",
      },
      {
        name: "Время на одной странице",
        text:
          "Весит меньше всех. Усидчивость в этом возрасте зависит от дня, от настроения и от " +
          "того, интересен ли ребенку сам рисунок, поэтому она только подталкивает итог, а не " +
          "решает его.",
      },
    ],
    notTitle: "Чего этот инструмент не делает",
    not: [
      "Не оценивает ребенка. Ответ говорит, что подойдет сейчас, и никогда не говорит, что " +
        "ребенок должен уметь в таком-то возрасте.",
      "Не ставит никаких диагнозов и не является медицинской рекомендацией. С вопросами о " +
        "развитии ребенка обращаются к педиатру.",
      "Ничего не собирает. Ответы остаются в браузере, никуда не отправляются, регистрация не " +
        "нужна.",
      "Организации, названные внизу в источниках, не участвовали в создании этого инструмента и " +
        "не рекомендуют никакую конкретную книгу, в том числе нашу.",
    ],
  },
};
