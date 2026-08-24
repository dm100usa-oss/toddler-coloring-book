import type { ContentLang } from "./dictionaries";

/* ------------------------------------------------------------------ */
/*  Раздел для тех, кто работает с малышами                            */
/* ------------------------------------------------------------------ */

/* Этот раздел появился не из догадки, а из продаж: испанское издание
   покупают по четырнадцать-шестнадцать штук за раз. Столько детей не
   бывает в одной группе малышей, значит покупает не родитель и не
   одна группа. Так покупают на список семей или на две группы сразу.

   Отсюда весь тон раздела. Человек, который берет пятнадцать книг,
   не спрашивает, полезно ли раскрашивание. Он спрашивает другое:
   можно ли печатать это на всю группу, подойдет ли книга детям,
   которые еще не попадают в контур, и что делать, если нужно много
   экземпляров. Раздел отвечает на эти вопросы и не уговаривает.

   Чего здесь нет и быть не может: заявлений, что книгой пользуются
   такие-то программы. Мы не знаем, кто именно покупает, и придумывать
   себе клиентов нельзя. Все написано как описание того, что в книге
   есть, а решает читатель сам. */

export type ProgramsCopy = {
  title: string;
  lead: string;
  body: string[];
  faq: { q: string; a: string }[];
};

export const programsCopy: Record<ContentLang, ProgramsCopy> = {
  en: {
    title: "Coloring books for toddler programs: daycare, home visiting, early intervention and libraries",
    lead:
      "What is in the book, what you may print for a group, and how to get more than a few copies. " +
      "Written for people who work with children aged one to three.",
    body: [
      "This page is for adults who use coloring pages at work rather than at home: toddler rooms " +
        "in daycare centers, home visiting programs, early intervention and speech services, " +
        "library story time, parent groups and church nurseries. What all of that work has in " +
        "common is a group of children at different levels and very little time to prepare, which " +
        "changes what makes a page usable.",
      "Three things decide whether a page works with this age. The outline has to be thick enough " +
        "to survive a crayon held in a fist, or half the children see no result from what they " +
        "did. One drawing per page, because two or three subjects split attention that lasts a few " +
        "minutes. Printing on one side only, because a marker goes through ordinary paper and " +
        "otherwise ruins the next sheet in the pile.",
      "The word printed under each drawing is there for the adult as much as for the child. It " +
        "gives you something to say and something to point at, and it turns a coloring page into a " +
        "short exchange about what is on it. In a Spanish speaking setting the word is in Spanish, " +
        "because the Spanish edition is a separate book with its own words rather than an English " +
        "book with a translated cover.",
      "The free pages on this site may be printed in any number for children in your care, at " +
        "home, in a classroom, in a daycare, in a library or in a waiting room. No permission and " +
        "no attribution are needed. What is not allowed is selling them, putting them behind a " +
        "paywall, or gathering them into a collection you pass on as your own work. Ten pages are " +
        "available, taken from the book itself and in the same order, so what you print is an " +
        "honest sample of what the book looks like.",
      "For the book itself, the paperback is sold on Amazon in English and in Spanish and can be " +
        "ordered in any quantity there. If you need many copies, a set for several rooms, or a " +
        "printable file for a group, write to us and say what you need and how many children it " +
        "is for. We answer in English, Spanish and Russian.",
    ],
    faq: [
      {
        q: "Can I print your free pages for my whole group?",
        a:
          "Yes, in as many copies as you need, and no permission or credit is required. That " +
          "covers homes, classrooms, daycare centers, libraries and waiting rooms. The one limit " +
          "is that the pages may not be sold, put behind a paywall, or collected into a set that " +
          "is passed on as someone else's work.",
      },
      {
        q: "Can I photocopy pages from the book for a group?",
        a:
          "No. The free pages on this site are made to be printed in any number, and copying the " +
          "book instead is not something we can allow. If you need one copy per child and a bulk " +
          "order is a problem, write to us and describe the situation rather than working around it.",
      },
      {
        q: "How do I order many copies at once?",
        a:
          "The paperback is on Amazon in English and in Spanish, and any quantity can be ordered " +
          "there directly. For larger orders, sets for several rooms, or anything an ordinary " +
          "order does not cover, write to us and say how many children it is for.",
      },
      {
        q: "Is the Spanish edition a translated version of the English one?",
        a:
          "It is a separate book. The drawings are the same, and the word under each drawing is in " +
          "Spanish, not an English word with a label added. It is sold under its own title, so a " +
          "Spanish speaking family or classroom gets a Spanish book rather than a translated one.",
      },
      {
        q: "What age is this book actually for?",
        a:
          "One to three years old, and the working range is wider than the number on the cover " +
          "suggests, because what matters is what the hand does rather than the birthday. Past " +
          "about three and a half most children find these pages too easy, and the signal is " +
          "boredom rather than neatness.",
      },
      {
        q: "Can I give the printed pages to families to take home?",
        a:
          "Yes. Printing pages and handing them to the families you work with is exactly what the " +
          "free pages are for, and no permission is needed. The only thing that is not allowed is " +
          "selling them or presenting them as a collection of your own.",
      },
    ],
  },

  es: {
    title:
      "Libros para colorear para programas de primera infancia: guarderías, visitas al hogar, intervención temprana y bibliotecas",
    lead:
      "Qué hay en el libro, qué puede imprimir para un grupo y cómo conseguir más de unos pocos " +
      "ejemplares. Escrito para quienes trabajan con niños de uno a tres años.",
    body: [
      "Esta página es para adultos que usan dibujos para colorear en su trabajo y no en casa: " +
        "salas de bebés y niños pequeños en guarderías, programas de visitas al hogar, " +
        "intervención temprana y terapia del habla, hora del cuento en bibliotecas, grupos de " +
        "padres y salas infantiles de iglesias. Todo ese trabajo tiene algo en común: un grupo de " +
        "niños con niveles distintos y muy poco tiempo para preparar, y eso cambia lo que hace " +
        "que una hoja sirva.",
      "Tres cosas deciden si una hoja funciona a esta edad. El contorno tiene que ser lo bastante " +
        "grueso para sobrevivir a un crayón agarrado con el puño, o la mitad de los niños no verá " +
        "ningún resultado de lo que hizo. Un dibujo por página, porque dos o tres motivos reparten " +
        "una atención que dura unos minutos. Impresión por una sola cara, porque el rotulador " +
        "traspasa el papel corriente y si no arruina la hoja siguiente del montón.",
      "La palabra impresa debajo de cada dibujo está ahí tanto para el adulto como para el niño. " +
        "Le da algo que decir y algo que señalar, y convierte una hoja para colorear en un " +
        "intercambio corto sobre lo que hay en ella. En un entorno hispanohablante la palabra está " +
        "en español, porque la edición en español es un libro aparte con sus propias palabras y no " +
        "un libro en inglés con la portada traducida.",
      "Las hojas gratis de este sitio pueden imprimirse en la cantidad que haga falta para los " +
        "niños a su cargo, en casa, en un aula, en una guardería, en una biblioteca o en una sala " +
        "de espera. No hace falta permiso ni mención. Lo que no se permite es venderlas, ponerlas " +
        "detrás de un pago o reunirlas en una colección que se distribuya como obra propia. Hay " +
        "diez hojas disponibles, tomadas del propio libro y en el mismo orden, así que lo que " +
        "imprime es una muestra honesta de cómo es el libro.",
      "En cuanto al libro, la edición en papel se vende en Amazon en inglés y en español y allí " +
        "se puede pedir cualquier cantidad. Si necesita muchos ejemplares, un juego para varias " +
        "salas o un archivo imprimible para un grupo, escríbanos indicando qué necesita y para " +
        "cuántos niños. Respondemos en español, inglés y ruso.",
    ],
    faq: [
      {
        q: "¿Puedo imprimir sus hojas gratis para todo mi grupo?",
        a:
          "Sí, en tantas copias como necesite, y no hace falta permiso ni mención. Eso incluye " +
          "casas, aulas, guarderías, bibliotecas y salas de espera. El único límite es que las " +
          "hojas no pueden venderse, ponerse detrás de un pago ni reunirse en un conjunto que se " +
          "distribuya como obra de otra persona.",
      },
      {
        q: "¿Puedo fotocopiar páginas del libro para un grupo?",
        a:
          "No. Las hojas gratis de este sitio están hechas para imprimirse en cualquier cantidad, " +
          "y copiar el libro en su lugar no es algo que podamos permitir. Si necesita un ejemplar " +
          "por niño y un pedido grande le resulta complicado, escríbanos y cuéntenos la situación " +
          "en vez de buscar un rodeo.",
      },
      {
        q: "¿Cómo pido muchos ejemplares a la vez?",
        a:
          "La edición en papel está en Amazon en inglés y en español, y allí se puede pedir " +
          "cualquier cantidad directamente. Para pedidos más grandes, juegos para varias salas o " +
          "cualquier cosa que un pedido normal no cubra, escríbanos diciendo para cuántos niños es.",
      },
      {
        q: "¿La edición en español es una traducción de la inglesa?",
        a:
          "Es un libro aparte. Los dibujos son los mismos y la palabra debajo de cada dibujo está " +
          "en español, no es una palabra inglesa con una etiqueta añadida. Se vende con su propio " +
          "título, así que una familia o un aula hispanohablante recibe un libro en español y no " +
          "un libro traducido.",
      },
      {
        q: "¿Para qué edad es realmente este libro?",
        a:
          "De uno a tres años, y el rango real es más amplio de lo que sugiere el número de la " +
          "portada, porque lo que importa es lo que hace la mano y no el cumpleaños. Pasados los " +
          "tres años y medio la mayoría de los niños encuentra estas hojas demasiado fáciles, y la " +
          "señal es el aburrimiento y no la pulcritud.",
      },
      {
        q: "¿Puedo dar las hojas impresas a las familias para que se las lleven?",
        a:
          "Sí. Imprimir hojas y entregarlas a las familias con las que trabaja es exactamente para " +
          "lo que están las hojas gratis, y no hace falta permiso. Lo único que no se permite es " +
          "venderlas o presentarlas como una colección propia.",
      },
    ],
  },

  ru: {
    title: "Раскраски для детских программ: ясли, домашние визиты, раннее вмешательство и библиотеки",
    lead:
      "Что входит в книгу, какие страницы можно бесплатно печатать для группы и как заказать " +
        "большое количество экземпляров. Информация для специалистов, работающих с детьми от " +
        "года до трех лет.",
    body: [
      "Эта страница предназначена для специалистов, которые используют раскраски в работе с " +
        "детьми: сотрудников яслей и детских центров, программ домашних визитов и раннего " +
        "вмешательства, логопедов, библиотекарей, ведущих детских занятий, организаторов " +
        "родительских групп и других детских программ. Во всех этих случаях важно, чтобы " +
        "материал подходил детям с разным уровнем навыков и не требовал долгой подготовки.",
      "Для групповых занятий особенно важны три особенности страницы. Толстый и хорошо " +
        "заметный контур подходит детям, которые еще держат мелок всей ладонью. Один крупный " +
        "рисунок на странице помогает не перегружать внимание лишними деталями. А печать " +
        "только с одной стороны защищает следующий рисунок, если чернила фломастера проходят " +
        "сквозь бумагу.",
      "Слово под каждым рисунком полезно и взрослому: оно помогает назвать изображение и " +
        "начать короткий разговор с ребенком о том, что нарисовано. В испанском издании слова " +
        "напечатаны по-испански, поэтому его удобно использовать с испаноязычными детьми и " +
        "семьями.",
      "Бесплатные страницы с этого сайта можно печатать в любом количестве для детей, с " +
        "которыми вы работаете: дома, в группе, детском саду, библиотеке или другом " +
        "учреждении. Разрешение и ссылка на нас не требуются. Нельзя продавать эти материалы, " +
        "предоставлять к ним платный доступ или распространять их как собственный набор. Все " +
        "десять бесплатных страниц взяты непосредственно из книги и позволяют увидеть, как она " +
        "устроена.",
      "Бумажная книга продается на Amazon на английском и испанском языках, где можно " +
        "заказать нужное количество экземпляров. Если вам требуется крупный заказ для " +
        "нескольких групп или другой вариант, который нельзя оформить обычным способом, " +
        "напишите нам и укажите количество детей. Мы отвечаем на английском, испанском и " +
        "русском языках.",
    ],
    faq: [
      {
        q: "Можно ли печатать ваши бесплатные листы на всю группу?",
        a:
          "Да. Десять бесплатных страниц можно печатать в любом количестве для детей, с " +
            "которыми вы работаете. Разрешение и ссылка на нас не требуются. Нельзя продавать " +
            "эти материалы, предоставлять к ним платный доступ или распространять их как " +
            "собственный набор.",
      },
      {
        q: "Можно ли копировать страницы из самой книги для группы?",
        a:
          "Нет. Страницы самой книги копировать нельзя. Для печати в любом количестве " +
            "предназначены бесплатные страницы на сайте. Если вам нужен отдельный экземпляр " +
            "для каждого ребенка и обычный заказ не подходит, напишите нам и расскажите, какое " +
            "количество требуется.",
      },
      {
        q: "Как заказать много экземпляров сразу?",
        a:
          "Бумажная книга продается на Amazon на английском и испанском языках, где можно " +
            "напрямую заказать нужное количество экземпляров. Если вам требуется крупный заказ " +
            "для нескольких групп или программы, напишите нам и укажите количество детей.",
      },
      {
        q: "Испанское издание это перевод английского?",
        a:
          "Это отдельное испанское издание. Рисунки в нем те же, что и в английской версии, " +
            "но под каждым изображением напечатано слово на испанском языке. Книга продается " +
            "под собственным испанским названием и полностью рассчитана на испаноязычных детей " +
            "и семьи.",
      },
      {
        q: "На какой возраст книга рассчитана на самом деле?",
        a:
          "Книга рассчитана на детей от года до трех лет, но лучше ориентироваться не только " +
            "на возраст, а на навыки ребенка. Примерно после трех с половиной лет многим детям " +
            "такие страницы уже кажутся слишком простыми. Главный признак - потеря интереса, а " +
            "не идеальная аккуратность раскрашивания.",
      },
      {
        q: "Можно ли отдавать распечатанные листы семьям с собой?",
        a:
          "Да. Бесплатные страницы как раз можно распечатывать и отдавать семьям, с которыми " +
            "вы работаете. Дополнительное разрешение не требуется. Нельзя только продавать эти " +
            "материалы или распространять их как собственный набор.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Кому это подходит                                                  */
/* ------------------------------------------------------------------ */

/* Пять видов работы с малышами. У каждого свой вопрос к книге,
   и написано именно про этот вопрос, а не про книгу вообще.

   Формулировки в втором лице: "если вы ведете". Это описание того,
   что в книге есть, а не заявление о том, что ей кто-то пользуется:
   мы не знаем, кто именно покупает, и придумывать себе клиентов
   нельзя. */

export type Audience = {
  id: string;
  name: Record<ContentLang, string>;
  text: Record<ContentLang, string>;
};

export const audiences: Audience[] = [
  {
    id: "daycare",
    name: {
      en: "Daycare and toddler rooms",
      es: "Guarderías y salas de niños pequeños",
      ru: "Ясли и группы малышей",
    },
    text: {
      en:
        "A group of eight has eight different levels in it, and one page has to work for the child " +
        "who scribbles across the sheet and for the one who already aims. Very simple, very large " +
        "drawings are what covers both. Single sided printing matters more here than anywhere: a " +
        "marker that soaks through marks a blank back rather than the next child's drawing.",
      es:
        "Un grupo de ocho tiene dentro ocho niveles distintos, y una misma hoja tiene que servir al " +
        "niño que garabatea por toda la hoja y al que ya apunta. Dibujos muy simples y muy grandes " +
        "es lo que cubre a los dos. La impresión por una cara importa aquí más que en ningún sitio: " +
        "un rotulador que traspasa marca un dorso en blanco y no el dibujo del niño siguiente.",
      ru:
        "В группе дети могут находиться на разных этапах развития навыков рисования. Крупные " +
          "и простые рисунки подходят и тем, кто пока рисует размашистые линии по всему листу, " +
          "и тем, кто уже старается попадать по рисунку. Печать только с одной стороны " +
          "особенно удобна в группе: если чернила фломастера пройдут сквозь бумагу, они " +
          "попадут на пустой оборот, а не на следующий рисунок.",
    },
  },
  {
    id: "home-visiting",
    name: {
      en: "Home visiting programs",
      es: "Programas de visitas al hogar",
      ru: "Программы домашних визитов",
    },
    text: {
      en:
        "What is left in the home has to keep working after you leave, which means the parent needs " +
        "something to say rather than a worksheet to finish. The word under the drawing is that " +
        "script: name it, point at it, let the child choose the color. Pages can be printed for " +
        "every family on your list and handed over to keep.",
      es:
        "Lo que queda en la casa tiene que seguir funcionando cuando usted se va, y eso significa " +
        "que la madre o el padre necesita algo que decir y no una ficha que terminar. La palabra " +
        "debajo del dibujo es ese guion: nombrarlo, señalarlo, dejar que el niño elija el color. " +
        "Las hojas pueden imprimirse para cada familia de su lista y entregarse para que se queden.",
      ru:
        "Материал, который остается дома после визита, должен быть понятен семье без " +
          "дополнительных инструкций. Слово под рисунком помогает взрослому начать занятие: " +
          "назвать изображение, показать его ребенку и предложить выбрать цвет. Бесплатные " +
          "страницы можно распечатать для каждой семьи и оставить после визита.",
    },
  },
  {
    id: "early-intervention",
    name: {
      en: "Early intervention and speech services",
      es: "Intervención temprana y terapia del habla",
      ru: "Раннее вмешательство и логопеды",
    },
    text: {
      en:
        "Naming is the point of the page here, and the drawing has to be recognizable without being " +
        "explained first. One subject per sheet keeps the target single, and the printed word gives " +
        "the same label every session. In Spanish the word is Spanish, which is the part that is " +
        "hardest to find in materials for this age.",
      es:
        "Aquí lo importante de la hoja es nombrar, y el dibujo tiene que reconocerse sin que haya " +
        "que explicarlo antes. Un motivo por hoja mantiene un solo objetivo, y la palabra impresa " +
        "da la misma etiqueta en cada sesión. En español la palabra es española, que es justo lo " +
        "más difícil de encontrar en materiales para esta edad.",
      ru:
        "Для таких занятий особенно важны простые и легко узнаваемые изображения. Один " +
          "рисунок на странице помогает сосредоточиться на одном слове, а подпись под ним " +
          "позволяет взрослому каждый раз называть изображение одинаково. В испанском издании " +
          "все слова напечатаны по-испански.",
    },
  },
  {
    id: "libraries",
    name: {
      en: "Libraries and story time",
      es: "Bibliotecas y hora del cuento",
      ru: "Библиотеки и детские часы",
    },
    text: {
      en:
        "A page handed out after story time has to be printable in unknown numbers and has to work " +
        "for whoever walks in, at any age between one and three. The free pages here can be printed " +
        "in any quantity with no permission and no attribution, and each one is a page from the " +
        "book rather than a sample made to look good.",
      es:
        "Una hoja que se reparte después de la hora del cuento tiene que poder imprimirse en " +
        "cantidades desconocidas y servir a quien entre por la puerta, a cualquier edad entre uno " +
        "y tres años. Las hojas gratis de aquí pueden imprimirse en cualquier cantidad sin permiso " +
        "ni mención, y cada una es una página del libro y no una muestra hecha para lucir.",
      ru:
        "Страница, которую раздают после детского занятия в библиотеке, должна подходить " +
          "разным детям и легко печататься в нужном количестве. Бесплатные листы с этого сайта " +
          "можно печатать без ограничений по количеству для детей, с которыми вы работаете. " +
          "Каждый из них взят непосредственно из книги.",
    },
  },
  {
    id: "parents",
    name: {
      en: "Parent groups and church nurseries",
      es: "Grupos de padres y salas infantiles de iglesias",
      ru: "Группы для родителей и церковные детские комнаты",
    },
    text: {
      en:
        "Here the adult and the child work at the same table, and the page has to give both of them " +
        "something to do. The child colors, the adult reads the word out loud and asks what is on " +
        "the page. For a Spanish speaking group the Spanish edition carries Spanish words, so the " +
        "reading part is in the family's own language.",
      es:
        "Aquí el adulto y el niño trabajan en la misma mesa, y la hoja tiene que darles algo que " +
        "hacer a los dos. El niño colorea, el adulto lee la palabra en voz alta y pregunta qué hay " +
        "en la hoja. Para un grupo hispanohablante la edición en español lleva palabras en español, " +
        "así que la parte de leer está en el idioma de la familia.",
      ru:
        "В родительской группе взрослый и ребенок могут заниматься одной страницей вместе: " +
          "ребенок раскрашивает рисунок, а взрослый читает слово вслух и говорит с ним о том, " +
          "что изображено. В испанском издании слова напечатаны по-испански, поэтому занятие " +
          "можно проводить на языке семьи.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Что в книге, коротким списком                                      */
/* ------------------------------------------------------------------ */

/* Человек, который берет пятнадцать книг, читает не рекламу, а
   характеристики. Здесь только проверяемое: то, что он увидит,
   открыв книгу. */

export const specs: Record<ContentLang, string[]> = {
  en: [
    "111 drawings, all different, hand drawn",
    "Thick outlines, no small detail",
    "One drawing per page",
    "Printed on one side only",
    "The word under each drawing, in outline letters that can be colored too",
    "8.5 by 11 inches, separate English and Spanish editions",
  ],
  es: [
    "111 dibujos, todos distintos, hechos a mano",
    "Contornos gruesos, sin detalles pequeños",
    "Un dibujo por página",
    "Impreso por una sola cara",
    "La palabra debajo de cada dibujo, en letras huecas que también se colorean",
    "8,5 por 11 pulgadas, ediciones separadas en inglés y en español",
  ],
  ru: [
    "111 разных рисунков, нарисованных вручную",
    "Толстый контур и минимум мелких деталей",
    "Один рисунок на странице",
    "Печать с одной стороны",
    "Слово под каждым рисунком, контурными буквами, его тоже можно раскрасить",
    "Формат 8.5 × 11 дюймов, отдельные издания на английском и испанском языках",
  ],
};

/* ------------------------------------------------------------------ */
/*  Надписи блоков                                                     */
/* ------------------------------------------------------------------ */

export type ProgramsLabels = {
  audiencesTitle: string;
  specsTitle: string;
  printTitle: string;
  printText: string;
  printCta: string;
  termsCta: string;
  contactTitle: string;
  contactText: string;
  contactCta: string;
  toolCta: string;
  /* Короткая строка на странице бесплатных листов. */
  printablesNote: string;
  printablesCta: string;
};

export const programsLabels: Record<ContentLang, ProgramsLabels> = {
  en: {
    audiencesTitle: "Where this kind of page is used",
    specsTitle: "What is in the book",
    printTitle: "Printing for a group",
    printText:
      "Ten pages from the book, free, in US Letter and A4. Print as many copies as you need for " +
      "the children you work with. No permission, no attribution, no account.",
    printCta: "See all free pages",
    termsCta: "Full terms of use",
    contactTitle: "Many copies, or something we do not sell yet",
    contactText:
      "Write to us and say what you need and how many children it is for. Larger orders, sets for " +
      "several rooms, a printable file for a group: if it is possible, we will say so, and if it " +
      "is not, we will say that too. We answer in English, Spanish and Russian.",
    contactCta: "Write to us",
    toolCta: "Which page suits a specific child",
    printablesNote:
      "Working with a group? These pages may be printed in any number for daycare, a library, a " +
      "home visit or a waiting room.",
    printablesCta: "For programs and specialists",
  },
  es: {
    audiencesTitle: "Dónde se usa este tipo de hoja",
    specsTitle: "Qué hay en el libro",
    printTitle: "Imprimir para un grupo",
    printText:
      "Diez hojas del libro, gratis, en tamaño Carta y A4. Imprima tantas copias como necesite " +
      "para los niños con los que trabaja. Sin permiso, sin mención, sin cuenta.",
    printCta: "Ver todas las hojas gratis",
    termsCta: "Condiciones de uso completas",
    contactTitle: "Muchos ejemplares, o algo que todavía no vendemos",
    contactText:
      "Escríbanos indicando qué necesita y para cuántos niños. Pedidos grandes, juegos para varias " +
      "salas, un archivo imprimible para un grupo: si es posible, se lo diremos, y si no lo es, " +
      "también. Respondemos en español, inglés y ruso.",
    contactCta: "Escríbanos",
    toolCta: "Qué hoja le conviene a un niño concreto",
    printablesNote:
      "¿Trabaja con un grupo? Estas hojas pueden imprimirse en cualquier cantidad para una " +
      "guardería, una biblioteca, una visita al hogar o una sala de espera.",
    printablesCta: "Para programas y profesionales",
  },
  ru: {
    audiencesTitle: "Где такие страницы используют",
    specsTitle: "Что в книге",
    printTitle: "Печать на группу",
    printText:
      "Десять бесплатных страниц из книги в форматах US Letter и A4. Печатайте столько " +
        "экземпляров, сколько нужно для детей, с которыми вы работаете. Разрешение, ссылка на " +
        "нас и регистрация не требуются.",
    printCta: "Посмотреть все бесплатные листы",
    termsCta: "Полные условия использования",
    contactTitle: "Большое количество экземпляров или особый формат",
    contactText:
      "Напишите нам, что именно вам нужно и для какого количества детей. Крупный заказ, " +
        "книги для нескольких групп или другой формат - мы сообщим, можем ли предложить " +
        "подходящий вариант. Отвечаем на английском, испанском и русском языках.",
    contactCta: "Написать нам",
    toolCta: "Какая страница подойдет конкретному ребенку",
    printablesNote:
      "Работаете с группой? Бесплатные страницы можно печатать в любом количестве для яслей, " +
        "библиотеки, домашних визитов, поликлиники и других занятий с детьми.",
    printablesCta: "Для программ и специалистов",
  },
};
