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
  /* Как проходит занятие за столом: что видно на листе, сколько
     ребенок обычно держится, что делать, если он ушел через минуту,
     и на чем чаще всего спотыкается взрослый. Этого нет больше
     нигде на сайте, и родителю это нужнее описания этапа. */
  atTable: Record<ContentLang, string[]>;
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
    atTable: {
      en: [
        "The sheet is the honest record of this stage. Expect long sweeping arcs that run off the " +
          "paper and onto the table, a knot of marks wherever the hand stopped, and a drawing that " +
          "is barely covered at all. Torn paper is common, because a fist grip presses hard.",
        "A session at this age runs about two to five minutes. That is not a short attention span " +
          "to be fixed. It is what twelve to eighteen months looks like.",
        "If the child walks away after a minute, do not call them back to the table. Leave the " +
          "sheet and the crayons where they were. Toddlers at this stage often return to the same " +
          "page two or three times in one afternoon, and each return lasts a little longer than the " +
          "last.",
        "The most common mistake is guiding the small hand along the outline. There is no inside " +
          "and outside yet, so the correction teaches nothing and usually ends the session. The " +
          "child is not learning to color. They are learning that moving a hand leaves a mark, and " +
          "that is the whole task right now.",
      ],
      es: [
        "La hoja es el registro honesto de esta etapa. Espere trazos largos y amplios que se " +
          "salen del papel y llegan a la mesa, una maraña de marcas allí donde se detuvo la mano y " +
          "un dibujo apenas cubierto. Es normal que el papel se rompa: la mano cerrada presiona con " +
          "fuerza.",
        "Una sesión a esta edad dura entre dos y cinco minutos. No es una falta de atención que " +
          "haya que corregir. Así se ve un niño de doce a dieciocho meses.",
        "Si el niño se marcha al cabo de un minuto, no lo llame de vuelta a la mesa. Deje la hoja " +
          "y los crayones donde estaban. A esta edad los niños suelen volver a la misma página dos " +
          "o tres veces en una tarde, y cada regreso dura un poco más que el anterior.",
        "El error más frecuente es guiar la manita a lo largo del contorno. Todavía no existe un " +
          "dentro y un fuera, así que la corrección no enseña nada y casi siempre acaba con la " +
          "sesión. El niño no está aprendiendo a colorear. Está aprendiendo que mover la mano deja " +
          "una marca, y esa es toda la tarea por ahora.",
      ],
      ru: [
        "Лист честно показывает, что происходит на этом этапе. Ждите длинных размашистых дуг, " +
          "которые уходят за край бумаги на стол, клубка линий там, где рука остановилась, и почти " +
          "нетронутого рисунка. Порванная бумага дело обычное: ладонь давит сильно.",
        "Занятие в этом возрасте длится примерно две-пять минут. Это не короткое внимание, " +
          "которое надо исправлять. Так выглядит ребенок от года до полутора.",
        "Если ребенок ушел через минуту, не зовите его обратно за стол. Оставьте лист и мелки " +
          "там, где они лежали. Дети на этом этапе часто возвращаются к одной и той же странице " +
          "два-три раза за день, и каждый следующий подход длится чуть дольше предыдущего.",
        "Самая частая ошибка взрослого - водить маленькой рукой по контуру. Внутри и снаружи для " +
          "ребенка пока не существует, поэтому поправка ничему не учит и обычно заканчивает " +
          "занятие. Ребенок сейчас учится не раскрашивать. Он учится тому, что движение руки " +
          "оставляет след, и это вся задача.",
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
    atTable: {
      en: [
        "On the sheet you start to see the change. The marks gather nearer the middle of the " +
          "drawing instead of running off the page, round scribbles appear alongside the straight " +
          "sweeps, and one spot often gets colored over and over until the paper shines.",
        "A session now runs about three to seven minutes. The child also starts lifting the " +
          "crayon and putting it down again, rather than dragging it in one continuous motion, " +
          "which is why the page looks busier than it did a few months ago.",
        "If the child leaves after a minute, check the crayon before you check the child. A thin " +
          "marker or a short stub is hard to hold at this age, and a page that has already been " +
          "scribbled over gives nothing new to look at. A fresh sheet often brings them straight " +
          "back.",
        "The most common mistake is turning to a new page every time the child pauses. Pausing is " +
          "part of the work at this stage, and the same drawing returned to three times teaches " +
          "more than three drawings abandoned once each.",
      ],
      es: [
        "En la hoja empieza a notarse el cambio. Las marcas se agrupan más cerca del centro del " +
          "dibujo en lugar de salirse de la página, aparecen garabatos redondeados junto a los " +
          "trazos rectos y un mismo punto se colorea una y otra vez hasta que el papel queda " +
          "brillante.",
        "Ahora la sesión dura entre tres y siete minutos. El niño también empieza a levantar el " +
          "crayón y volver a apoyarlo, en vez de arrastrarlo en un movimiento continuo, y por eso " +
          "la página parece más llena que unos meses atrás.",
        "Si el niño se va al cabo de un minuto, revise el crayón antes que al niño. Un rotulador " +
          "fino o un trozo corto son difíciles de sujetar a esta edad, y una hoja ya garabateada no " +
          "ofrece nada nuevo que mirar. Una hoja limpia suele traerlo de vuelta enseguida.",
        "El error más frecuente es pasar a una página nueva cada vez que el niño se detiene. " +
          "Detenerse forma parte del trabajo en esta etapa, y un mismo dibujo retomado tres veces " +
          "enseña más que tres dibujos abandonados una vez cada uno.",
      ],
      ru: [
        "На листе начинает быть заметна перемена. Линии собираются ближе к середине рисунка, а не " +
          "уходят за край, рядом с прямыми размашистыми появляются круглые каракули, и одно место " +
          "часто закрашивается снова и снова, пока бумага не залоснится.",
        "Занятие теперь длится примерно три-семь минут. Ребенок начинает отрывать мелок и ставить " +
          "его заново, а не тащить одним непрерывным движением, поэтому страница выглядит гуще, чем " +
          "несколько месяцев назад.",
        "Если ребенок ушел через минуту, проверьте сначала мелок, а не ребенка. Тонкий фломастер " +
          "или короткий огрызок в этом возрасте держать трудно, а уже исчерканный лист не дает " +
          "ничего нового. Чистая страница часто возвращает ребенка сразу.",
        "Самая частая ошибка - переворачивать на новую страницу каждый раз, когда ребенок замер. " +
          "Пауза здесь часть работы, и один рисунок, к которому вернулись трижды, дает больше, чем " +
          "три рисунка, брошенных по разу.",
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
    atTable: {
      en: [
        "The sheet changes character here. Most of the color lands on the drawing itself, the " +
          "outline is crossed freely and without concern, and the child often announces what they " +
          "are doing before and during the work. Colors have nothing to do with real life yet: a " +
          "blue cat and a purple apple are normal and are not mistakes.",
        "A session runs about five to ten minutes, and for the first time the child may finish a " +
          "page rather than abandon it.",
        "If the child gives up quickly at this age, look at the page rather than the child. A " +
          "drawing that is too small, or one broken into separate parts to fill, asks for a hand " +
          "that is not ready. One large shape brings them back.",
        "The most common mistake is correcting the color. Saying that a cat is not blue turns a " +
          "child's own decision into a wrong answer, and at this age that is the fastest way to end " +
          "interest in coloring. The second most common is finishing the page for them after they " +
          "walk away.",
      ],
      es: [
        "Aquí la hoja cambia de carácter. La mayor parte del color cae sobre el propio dibujo, el " +
          "contorno se cruza con libertad y sin preocupación, y el niño suele anunciar lo que está " +
          "haciendo antes y durante el trabajo. Los colores todavía no tienen relación con la " +
          "realidad: un gato azul y una manzana morada son normales y no son errores.",
        "La sesión dura entre cinco y diez minutos y, por primera vez, el niño puede terminar una " +
          "página en lugar de abandonarla.",
        "Si a esta edad el niño se rinde enseguida, mire la página antes que al niño. Un dibujo " +
          "demasiado pequeño, o dividido en partes separadas para rellenar, exige una mano que aún " +
          "no está lista. Una sola forma grande lo trae de vuelta.",
        "El error más frecuente es corregir el color. Decir que un gato no es azul convierte una " +
          "decisión del niño en una respuesta equivocada, y a esta edad esa es la manera más rápida " +
          "de acabar con el interés por colorear. El segundo error más común es terminarle la " +
          "página cuando se ha ido.",
      ],
      ru: [
        "Здесь лист меняет характер. Большая часть цвета ложится на сам рисунок, контур " +
          "пересекается свободно и без беспокойства, а ребенок часто объявляет вслух, что он " +
          "делает, до начала и по ходу работы. Цвета пока никак не связаны с настоящей жизнью: " +
          "синяя кошка и фиолетовое яблоко это норма, а не ошибка.",
        "Занятие длится примерно пять-десять минут, и впервые ребенок может закончить страницу, а " +
          "не бросить ее.",
        "Если в этом возрасте ребенок быстро сдается, смотрите на страницу, а не на ребенка. " +
          "Слишком мелкий рисунок или рисунок, разбитый на отдельные части для закрашивания, " +
          "требует руки, которая еще не готова. Одна крупная форма возвращает интерес.",
        "Самая частая ошибка - поправлять цвет. Слова о том, что кошка не бывает синей, " +
          "превращают собственное решение ребенка в неправильный ответ, а в этом возрасте это самый " +
          "быстрый способ отбить желание раскрашивать. Вторая по частоте - дорисовать страницу за " +
          "ребенком, когда он ушел.",
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
    atTable: {
      en: [
        "By now the sheet looks like coloring in the ordinary sense. The color stays inside the " +
          "outline most of the time, the child notices when it does not, and pressure is heavier " +
          "because they want solid coverage rather than a trace. Many children start filling the " +
          "background too, and some return to the same page across several days.",
        "A session runs ten minutes or longer.",
        "If a child this age stops early, it is usually frustration rather than boredom. They can " +
          "now see the gap between what they meant and what is on the paper. Handing them a fresh " +
          "sheet says the first one was a failure. Better to leave it, say what you see rather than " +
          "how good it is, and let them come back to it.",
        "The most common mistake at this stage is staying too long with pages built for younger " +
          "hands. A child who can hold the line needs detail to aim at, and a single large shape " +
          "that was ideal a year ago now finishes in two minutes and teaches nothing.",
      ],
      es: [
        "A estas alturas la hoja ya parece coloreada en el sentido corriente. El color se " +
          "mantiene dentro del contorno la mayor parte del tiempo, el niño se da cuenta cuando se " +
          "sale y presiona más fuerte porque busca un relleno sólido y no un simple trazo. Muchos " +
          "niños empiezan también a colorear el fondo, y algunos vuelven a la misma página durante " +
          "varios días.",
        "La sesión dura diez minutos o más.",
        "Si un niño de esta edad se detiene pronto, suele ser por frustración y no por " +
          "aburrimiento. Ya percibe la distancia entre lo que quería hacer y lo que hay en el " +
          "papel. Darle una hoja nueva le dice que la primera fue un fracaso. Es mejor dejarla, " +
          "comentar lo que uno ve en lugar de lo bien que está, y permitir que vuelva a ella.",
        "El error más frecuente en esta etapa es quedarse demasiado tiempo con páginas pensadas " +
          "para manos más pequeñas. Un niño que ya respeta el contorno necesita detalles a los que " +
          "apuntar, y una sola forma grande que era ideal hace un año ahora se termina en dos " +
          "minutos y no le enseña nada.",
      ],
      ru: [
        "К этому моменту лист выглядит раскрашенным в обычном смысле слова. Цвет большую часть " +
          "времени остается внутри контура, ребенок замечает, когда выходит за него, и нажимает " +
          "сильнее, потому что хочет плотную заливку, а не след. Многие начинают закрашивать и фон, " +
          "а некоторые возвращаются к одной странице несколько дней подряд.",
        "Занятие длится десять минут и дольше.",
        "Если ребенок этого возраста бросает рано, дело обычно в досаде, а не в скуке. Он уже " +
          "видит разницу между тем, что задумал, и тем, что вышло на бумаге. Новый чистый лист в " +
          "такую минуту говорит ему, что первый не удался. Лучше оставить лист, сказать, что вы на " +
          "нем видите, а не насколько хорошо получилось, и дать ребенку вернуться самому.",
        "Самая частая ошибка на этом этапе - слишком долго оставаться со страницами, сделанными " +
          "для рук помладше. Ребенку, который держит контур, нужны детали, куда целиться, а одна " +
          "крупная форма, идеальная год назад, теперь заканчивается за две минуты и ничему не учит.",
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
