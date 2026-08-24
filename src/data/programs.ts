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
      "Three features of a page matter particularly for group sessions. A thick, clearly visible " +
      "outline suits children who still hold the crayon in the whole hand. One large drawing per " +
      "page helps to keep attention from being pulled away by extra detail. And printing on one " +
      "side only protects the next drawing if marker ink goes through the paper.",
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
          "The book is made for children aged one to three, though it is better to look at what a child " +
          "can do as well as at their age. Past about three and a half, many children find pages like " +
          "these too simple. The sign is a loss of interest rather than neat coloring.",
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
      "Libros para colorear para programas infantiles: guarderías, visitas al hogar, " +
        "intervención temprana y bibliotecas",
    lead:
      "Qué contiene el libro, qué páginas puede imprimir gratuitamente para un grupo y cómo " +
        "pedir varios ejemplares. Información para profesionales que trabajan con niños de uno " +
        "a tres años.",
    body: [
      "Esta página está dirigida a profesionales que utilizan dibujos para colorear en su " +
        "trabajo con niños: personal de guarderías y centros infantiles, programas de visitas " +
        "al hogar e intervención temprana, logopedas, bibliotecarios, responsables de " +
        "actividades infantiles, grupos de padres y otros programas para niños. En todos estos " +
        "casos es importante que el material sea adecuado para distintos niveles de habilidad " +
        "y no requiera una preparación complicada.",
      "Para las actividades en grupo hay tres características especialmente importantes. Un " +
        "contorno grueso y fácil de ver resulta adecuado para niños que todavía sujetan el " +
        "crayón con toda la mano. Un solo dibujo grande por página evita sobrecargar la " +
        "atención con demasiados elementos. Y la impresión por una sola cara protege el dibujo " +
        "siguiente si la tinta del rotulador traspasa el papel.",
      "La palabra debajo de cada dibujo también puede ser útil para el adulto: permite " +
        "nombrar la imagen y empezar una breve conversación con el niño sobre lo que aparece " +
        "en la página. En la edición española, todas las palabras están impresas en español, " +
        "por lo que resulta adecuada para trabajar con niños y familias hispanohablantes.",
      "Las páginas gratuitas de este sitio pueden imprimirse en cualquier cantidad para los " +
        "niños con los que trabaja: en casa, en un aula, una guardería, una biblioteca u otro " +
        "entorno. No es necesario pedir permiso ni citarnos. No está permitido vender estos " +
        "materiales, ofrecer acceso a ellos mediante pago ni distribuirlos como una colección " +
        "propia. Las diez páginas gratuitas están tomadas directamente del libro y permiten " +
        "ver cómo está diseñado.",
      "La edición impresa está disponible en Amazon en español e inglés y allí puede pedir " +
        "la cantidad de ejemplares que necesite. Si necesita un pedido grande para varias " +
        "salas o algún formato que no pueda solicitar de la forma habitual, escríbanos e " +
        "indique el número de niños. Respondemos en español, inglés y ruso.",
    ],
    faq: [
      {
        q: "¿Puedo imprimir sus hojas gratis para todo mi grupo?",
        a:
          "Sí. Las diez páginas gratuitas pueden imprimirse en cualquier cantidad para los " +
            "niños con los que trabaja. No es necesario pedir permiso ni citarnos. No está " +
            "permitido vender estos materiales, ofrecer acceso a ellos mediante pago ni " +
            "distribuirlos como una colección propia.",
      },
      {
        q: "¿Puedo fotocopiar páginas del libro para un grupo?",
        a:
          "No. Las páginas del libro no se pueden fotocopiar. Para imprimir en cualquier " +
            "cantidad están disponibles las páginas gratuitas del sitio. Si necesita un " +
            "ejemplar para cada niño y un pedido normal no se adapta a sus necesidades, " +
            "escríbanos e indique cuántos ejemplares necesita.",
      },
      {
        q: "¿Cómo pido muchos ejemplares a la vez?",
        a:
          "La edición impresa está disponible en Amazon en español e inglés y allí puede " +
            "pedir directamente la cantidad de ejemplares que necesite. Si necesita un pedido " +
            "grande para varias salas o para un programa, escríbanos e indique el número de " +
            "niños.",
      },
      {
        q: "¿La edición en español es una traducción de la inglesa?",
        a:
          "Es una edición independiente en español. Los dibujos son los mismos que en la " +
            "edición inglesa, pero debajo de cada imagen aparece una palabra en español. El " +
            "libro se vende con su propio título en español y está pensado para niños y " +
            "familias hispanohablantes.",
      },
      {
        q: "¿Para qué edad es realmente este libro?",
        a:
          "El libro está pensado para niños de uno a tres años, aunque conviene fijarse no " +
            "solo en la edad, sino también en las habilidades del niño. A partir de los tres " +
            "años y medio, aproximadamente, estas páginas pueden empezar a resultar demasiado " +
            "sencillas para muchos niños. La principal señal es la pérdida de interés, no la " +
            "precisión con la que colorean.",
      },
      {
        q: "¿Puedo dar las hojas impresas a las familias para que se las lleven?",
        a:
          "Sí. Las páginas gratuitas pueden imprimirse y entregarse a las familias con las " +
            "que trabaja. No es necesario pedir un permiso adicional. No está permitido vender " +
            "estos materiales ni distribuirlos como una colección propia.",
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
        "In a group, children may be at different points in the development of drawing skills. Large, " +
        "simple drawings suit both those who still make sweeping marks across the sheet and those who " +
        "are already trying to aim at the drawing. Single sided printing is especially convenient in " +
        "a group: if marker ink goes through the paper, it lands on a blank back rather than on the " +
        "next drawing.",
      es:
        "En un grupo, los niños pueden encontrarse en distintas etapas del desarrollo de sus " +
          "habilidades de dibujo. Los dibujos grandes y sencillos sirven tanto a quienes " +
          "todavía hacen trazos amplios por toda la hoja como a quienes ya intentan colorear " +
          "el propio dibujo. La impresión por una sola cara resulta especialmente práctica: si " +
          "la tinta del rotulador traspasa el papel, llegará al reverso en blanco y no al " +
          "dibujo siguiente.",
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
        "El material que queda en casa después de una visita debe ser fácil de utilizar sin " +
          "instrucciones adicionales. La palabra debajo del dibujo ayuda al adulto a iniciar " +
          "la actividad: nombrar la imagen, mostrársela al niño y dejarle elegir un color. Las " +
          "páginas gratuitas pueden imprimirse para cada familia y entregarse al final de la " +
          "visita.",
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
        "Simple, easily recognizable pictures matter particularly for this kind of session. One " +
        "drawing per page helps to keep the focus on a single word, and the printed word underneath " +
        "lets an adult name the picture the same way every time. In the Spanish edition all the words " +
        "are printed in Spanish.",
      es:
        "Para este tipo de actividades son especialmente útiles los dibujos sencillos y " +
          "fáciles de reconocer. Un solo dibujo por página permite centrarse en una palabra, y " +
          "la palabra impresa debajo ayuda al adulto a nombrar la imagen de forma clara y " +
          "constante. En la edición española, todas las palabras están impresas en español.",
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
        "Una página que se entrega después de una actividad infantil en la biblioteca debe " +
          "ser adecuada para niños diferentes y fácil de imprimir en la cantidad necesaria. " +
          "Las páginas gratuitas de este sitio pueden imprimirse en cualquier cantidad para " +
          "los niños con los que trabaja. Cada una está tomada directamente del libro.",
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
        "En un grupo de padres, el adulto y el niño pueden compartir la misma actividad: el " +
          "niño colorea el dibujo y el adulto lee la palabra en voz alta y habla con él sobre " +
          "lo que aparece en la página. En la edición española, las palabras están impresas en " +
          "español, por lo que la actividad puede realizarse en el idioma de la familia.",
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
    "111 dibujos diferentes, hechos a mano",
    "Contornos gruesos y pocos detalles pequeños",
    "Un dibujo por página",
    "Impreso por una sola cara",
    "La palabra debajo de cada dibujo, en letras huecas que también se colorean",
    "Formato de 8,5 × 11 pulgadas, con ediciones independientes en español e inglés",
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
      "Diez páginas gratuitas del libro en formatos US Letter y A4. Imprima tantas copias " +
        "como necesite para los niños con los que trabaja. No es necesario pedir permiso, " +
        "citarnos ni registrarse.",
    printCta: "Ver todas las hojas gratis",
    termsCta: "Condiciones de uso completas",
    contactTitle: "Varios ejemplares o un formato especial",
    contactText:
      "Escríbanos indicando qué necesita y para cuántos niños. Si necesita un pedido grande, " +
        "libros para varias salas o algún otro formato, le diremos si podemos ofrecer una " +
        "opción adecuada. Respondemos en español, inglés y ruso.",
    contactCta: "Escríbanos",
    toolCta: "Qué página puede ser adecuada para un niño concreto",
    printablesNote:
      "¿Trabaja con un grupo? Las páginas gratuitas pueden imprimirse en cualquier cantidad " +
        "para guarderías, bibliotecas, visitas al hogar, salas de espera y otras actividades " +
        "con niños.",
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
