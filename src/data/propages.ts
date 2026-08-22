import type { ContentLang } from "./dictionaries";

/* ------------------------------------------------------------------ */
/*  Четыре страницы для тех, кто покупает книгу на работу              */
/* ------------------------------------------------------------------ */

/* Тон здесь один и тот же на всех четырех страницах: разговор с
   коллегой. Мы не объясняем логопеду, как вести занятие, и не учим
   воспитателя работать с группой. Они это знают лучше нас.

   Мы говорим то, что знаем только мы: что внутри книги, сколько она
   стоит, как получить пятнадцать штук, что можно печатать и на каком
   языке напечатано слово под рисунком.

   Цель каждой страницы это покупка. Бесплатные листы стоят здесь как
   образец, который можно распечатать и посмотреть своими глазами
   до заказа, а не как замена книги.

   Чего на этих страницах нет: слов "рабочая тетрадь", "задания",
   "развивающие упражнения", "подготовка к школе". В профессиональной
   среде дошкольного возраста именно на них срабатывает отторжение.
   И нет заявлений, что книгой пользуются такие-то программы: мы не
   знаем, кто покупает, и придумывать себе клиентов нельзя. */

export type ProPageCopy = {
  title: string;
  lead: string;
  body: string[];
  fitTitle: string;
  fit: string[];
  faq: { q: string; a: string }[];
};

export type ProPage = {
  id: "speech" | "home" | "groups" | "daycare";
  slug: Record<ContentLang, string>;
  copy: Record<ContentLang, ProPageCopy>;
};

export const proPages: ProPage[] = [
  /* ---------------------------------------------------------------- */
  {
    id: "speech",
    slug: {
      en: "coloring-book-for-speech-therapy-and-early-intervention",
      es: "libro-para-colorear-para-terapia-del-habla-e-intervencion-temprana",
      ru: "raskraska-dlya-logopeda-i-rannego-vmeshatelstva",
    },
    copy: {
      en: {
        title: "A Spanish coloring book for speech therapy and early intervention with toddlers",
        lead:
          "111 drawings, one per page, the word printed underneath in Spanish. Sold on Amazon in " +
          "English and Spanish, and available in quantity for a caseload.",
        body: [
          "The Spanish edition is a separate book, not a translated one. The drawings are the same " +
            "as in the English edition and the word under each drawing is Spanish, printed in " +
            "outline letters so it can be colored as well. Nothing else is on the page: one " +
            "subject, one word, thick outline, white space around it.",
          "Every drawing is a common noun a child of this age is likely to meet: animals, sea " +
            "animals, food, toys, vehicles, flowers, fairy tale characters. There are 111 of them " +
            "and they do not repeat, so the same book carries a caseload through a year without " +
            "the same page coming up twice.",
          "The paperback is on Amazon at a price that makes one copy per child realistic, and any " +
            "quantity can be ordered there. If you need a set for a whole caseload, or something " +
            "an ordinary order does not cover, write to us. Ten pages from the book are free to " +
            "print here, so you can see the line thickness and the size of the drawings before you " +
            "buy anything.",
        ],
        fitTitle: "What is in the book",
        fit: [
          "One drawing and one word per page, nothing else competing for attention",
          "The word in Spanish in the Spanish edition, in English in the English edition",
          "Thick outlines that hold up under a fist grip and under dot markers",
          "111 different subjects, no repeats",
          "Printed on one side only, so a marker does not come through onto the next page",
          "8.5 by 11 inches, 114 pages",
        ],
        faq: [
          {
            q: "Is the Spanish edition a translation of the English one?",
            a:
              "No, it is a separate book with its own title. The drawings are the same and the word " +
              "under each drawing is Spanish, not an English word with a label added. A family that " +
              "speaks Spanish gets a Spanish book.",
          },
          {
            q: "Can I buy enough copies for my whole caseload?",
            a:
              "Yes. The paperback is on Amazon in both languages and any quantity can be ordered " +
              "there directly. For a larger set, or for anything an ordinary order does not cover, " +
              "write to us and say how many children it is for.",
          },
          {
            q: "Can I print pages instead of buying a copy for each child?",
            a:
              "Ten pages from the book are free here and may be printed in any number for the " +
              "children you work with, including copies for families to keep. The rest of the book " +
              "is not free to copy, which is why the free pages exist.",
          },
          {
            q: "What age does the book actually work for?",
            a:
              "It is made for one to three years old, and in practice it follows the hand rather " +
              "than the birthday. Children still scribbling across the sheet and children already " +
              "aiming at the shape both get something from the same page.",
          },
        ],
      },

      es: {
        title:
          "Un libro para colorear en español para terapia del habla e intervención temprana con niños pequeños",
        lead:
          "111 dibujos, uno por página, con la palabra impresa debajo en español. Se vende en " +
          "Amazon en español e inglés, y se puede pedir en cantidad para toda una lista de niños.",
        body: [
          "La edición en español es un libro aparte, no una traducción. Los dibujos son los mismos " +
            "que en la edición inglesa y la palabra debajo de cada dibujo está en español, en " +
            "letras huecas para que también se pueda colorear. En la página no hay nada más: un " +
            "motivo, una palabra, contorno grueso y espacio en blanco alrededor.",
          "Cada dibujo es un sustantivo corriente que un niño de esta edad se encuentra: animales, " +
            "animales marinos, comida, juguetes, vehículos, flores, personajes de cuentos. Son 111 " +
            "y no se repiten, así que el mismo libro acompaña a toda una lista de niños durante un " +
            "año sin que salga dos veces la misma página.",
          "La edición en papel está en Amazon a un precio que hace realista un ejemplar por niño, " +
            "y allí se puede pedir cualquier cantidad. Si necesita un juego para toda su lista, o " +
            "algo que un pedido normal no cubre, escríbanos. Diez hojas del libro se pueden " +
            "imprimir gratis aquí, así ve el grosor del contorno y el tamaño de los dibujos antes " +
            "de comprar nada.",
        ],
        fitTitle: "Qué hay en el libro",
        fit: [
          "Un dibujo y una palabra por página, sin nada más que compita por la atención",
          "La palabra en español en la edición española, en inglés en la inglesa",
          "Contornos gruesos que aguantan el agarre de puño y los rotuladores de puntos",
          "111 motivos distintos, sin repeticiones",
          "Impreso por una sola cara, el rotulador no traspasa a la página siguiente",
          "8,5 por 11 pulgadas, 114 páginas",
        ],
        faq: [
          {
            q: "¿La edición en español es una traducción de la inglesa?",
            a:
              "No, es un libro aparte con su propio título. Los dibujos son los mismos y la palabra " +
              "debajo de cada dibujo está en español, no es una palabra inglesa con una etiqueta " +
              "añadida. Una familia que habla español recibe un libro en español.",
          },
          {
            q: "¿Puedo comprar ejemplares para toda mi lista de niños?",
            a:
              "Sí. La edición en papel está en Amazon en los dos idiomas y allí se puede pedir " +
              "cualquier cantidad directamente. Para un juego más grande, o para algo que un pedido " +
              "normal no cubre, escríbanos indicando para cuántos niños es.",
          },
          {
            q: "¿Puedo imprimir hojas en vez de comprar un ejemplar por niño?",
            a:
              "Diez hojas del libro son gratis aquí y pueden imprimirse en cualquier cantidad para " +
              "los niños con los que trabaja, incluidas copias para que las familias se las queden. " +
              "El resto del libro no se puede copiar, y para eso están precisamente las hojas " +
              "gratis.",
          },
          {
            q: "¿Para qué edad funciona el libro de verdad?",
            a:
              "Está hecho para niños de uno a tres años, y en la práctica sigue a la mano y no al " +
              "cumpleaños. Tanto el niño que todavía garabatea por toda la hoja como el que ya " +
              "apunta a la forma sacan algo de la misma página.",
          },
        ],
      },

      ru: {
        title: "Раскраска на испанском для логопеда и раннего вмешательства",
        lead:
          "111 рисунков, по одному на странице, слово под рисунком напечатано по-испански. " +
          "Продается на Amazon на испанском и английском, можно заказать на весь список детей.",
        body: [
          "Испанское издание это отдельная книга, а не перевод. Рисунки те же, что в английском " +
            "издании, а слово под каждым рисунком стоит на испанском, контурными буквами, чтобы " +
            "его тоже можно было раскрасить. Больше на странице нет ничего: один предмет, одно " +
            "слово, толстый контур и свободное поле вокруг.",
          "Каждый рисунок это обычное существительное, с которым ребенок этого возраста " +
            "встречается: животные, морские обитатели, еда, игрушки, транспорт, цветы, сказочные " +
            "герои. Их сто одиннадцать, и они не повторяются, поэтому одной книги хватает на " +
            "список детей на целый год без повторов.",
          "Бумажная книга есть на Amazon по цене, при которой экземпляр каждому ребенку " +
            "реалистичен, и там заказывается любое количество. Если нужен набор на весь список " +
            "или что-то, чего обычный заказ не решает, напишите нам. Десять страниц из книги здесь " +
            "бесплатны, их можно распечатать и своими глазами увидеть толщину контура и размер " +
            "рисунка до всякой покупки.",
        ],
        fitTitle: "Что в книге",
        fit: [
          "Один рисунок и одно слово на странице, ничто другое не тянет внимание",
          "Слово на испанском в испанском издании и на английском в английском",
          "Толстый контур, выдерживающий хват кулаком и штампы-дотсы",
          "111 разных предметов, без повторов",
          "Печать с одной стороны, фломастер не проходит на следующую страницу",
          "Формат 8.5 на 11 дюймов, 114 страниц",
        ],
        faq: [
          {
            q: "Испанское издание это перевод английского?",
            a:
              "Нет, это отдельная книга со своим названием. Рисунки те же, а слово под рисунком " +
              "стоит на испанском, а не английское слово с приклеенной подписью. Испаноязычная " +
              "семья получает испанскую книгу.",
          },
          {
            q: "Можно ли купить экземпляры на весь список детей?",
            a:
              "Да. Бумажная книга есть на Amazon на обоих языках, там любое количество заказывается " +
              "напрямую. Для набора побольше или для того, чего обычный заказ не решает, напишите " +
              "нам и укажите, на сколько детей это нужно.",
          },
          {
            q: "Можно ли печатать страницы вместо покупки книги каждому ребенку?",
            a:
              "Десять страниц из книги здесь бесплатны и печатаются в любом количестве для детей, " +
              "с которыми вы работаете, в том числе для семей, которым лист остается насовсем. " +
              "Остальную книгу копировать нельзя, для этого и сделаны бесплатные листы.",
          },
          {
            q: "На какой возраст книга работает на самом деле?",
            a:
              "Она сделана для детей от года до трех, и на деле идет за рукой, а не за днем " +
              "рождения. И ребенок, который еще черкает поперек листа, и тот, кто уже целится в " +
              "форму, получают свое от одной и той же страницы.",
          },
        ],
      },
    },
  },

  /* ---------------------------------------------------------------- */
  {
    id: "home",
    slug: {
      en: "coloring-book-for-home-visiting-programs",
      es: "libro-para-colorear-para-programas-de-visitas-al-hogar",
      ru: "raskraska-dlya-domashnih-vizitov",
    },
    copy: {
      en: {
        title: "A coloring book to leave with families: home visiting programs",
        lead:
          "A book in the family's own language that stays in the home. English and Spanish " +
          "editions on Amazon, any quantity, one per family on your caseload.",
        body: [
          "The book is in the family's language rather than translated into it. The Spanish edition " +
            "is its own book with Spanish words under the drawings, so what stays in the house " +
            "after the visit is a Spanish book and not an English one with a sticker on the cover.",
          "It needs nothing to work: no printer, no scissors, no preparation, no supplies the " +
            "family may not have. A crayon and the page. The word under each drawing is printed in " +
            "outline letters and can be colored too, which gives the adult and the child something " +
            "to do with the same page.",
          "The paperback is on Amazon in both languages and any quantity can be ordered there, so " +
            "one copy per family on a caseload is a single order. If you need a set for a program " +
            "rather than for one visitor, write to us. Ten pages are free to print here, in any " +
            "number, including copies to hand to families to keep.",
        ],
        fitTitle: "What is in the book",
        fit: [
          "The family's own language, in a book of its own rather than a translation",
          "111 drawings, one per page, no preparation and no supplies needed",
          "The word under each drawing, in outline letters that can be colored",
          "Thick outlines, large drawings, printed on one side only",
          "Small and light enough to carry a stack of them in a bag",
          "8.5 by 11 inches, 114 pages",
        ],
        faq: [
          {
            q: "Can I order one copy for every family on my caseload?",
            a:
              "Yes, the paperback is on Amazon in English and Spanish and any quantity can be " +
              "ordered directly. If the order is for a whole program rather than one caseload, " +
              "write to us and say how many families it covers.",
          },
          {
            q: "Can I print pages to hand out during visits?",
            a:
              "Yes. Ten pages from the book are free here and may be printed in any number for the " +
              "children you work with, and given to families to keep. They may not be sold or " +
              "gathered into a collection passed on as someone else's work.",
          },
          {
            q: "Does the family need anything besides the book?",
            a:
              "A crayon or a pencil. The pages are printed on one side, so a marker that soaks " +
              "through marks a blank back rather than the next drawing. Nothing has to be cut out, " +
              "printed or prepared in advance.",
          },
          {
            q: "Is there a Russian edition?",
            a:
              "The Russian edition exists as a printable file rather than a paperback, because " +
              "Amazon does not print books in Russian. If you work with Russian speaking families " +
              "and need it, write to us.",
          },
        ],
      },

      es: {
        title: "Un libro para colorear que se queda en casa: programas de visitas al hogar",
        lead:
          "Un libro en el idioma de la familia que se queda en el hogar. Ediciones en español e " +
          "inglés en Amazon, cualquier cantidad, uno por familia de su lista.",
        body: [
          "El libro está en el idioma de la familia, no traducido a él. La edición en español es un " +
            "libro propio con palabras en español debajo de los dibujos, así que lo que se queda en " +
            "la casa después de la visita es un libro en español y no uno en inglés con una " +
            "pegatina en la portada.",
          "No necesita nada para funcionar: ni impresora, ni tijeras, ni preparación, ni materiales " +
            "que la familia quizá no tenga. Un crayón y la hoja. La palabra debajo de cada dibujo " +
            "está en letras huecas y también se colorea, lo que da al adulto y al niño algo que " +
            "hacer con la misma página.",
          "La edición en papel está en Amazon en los dos idiomas y allí se puede pedir cualquier " +
            "cantidad, así que un ejemplar por familia de una lista es un solo pedido. Si el pedido " +
            "es para un programa entero y no para una sola persona, escríbanos. Diez hojas se " +
            "pueden imprimir gratis aquí, en cualquier cantidad, incluidas copias para que las " +
            "familias se las queden.",
        ],
        fitTitle: "Qué hay en el libro",
        fit: [
          "El idioma de la familia, en un libro propio y no en una traducción",
          "111 dibujos, uno por página, sin preparación y sin materiales especiales",
          "La palabra debajo de cada dibujo, en letras huecas que se colorean",
          "Contornos gruesos, dibujos grandes, impresión por una sola cara",
          "Lo bastante ligero para llevar varios ejemplares en el bolso",
          "8,5 por 11 pulgadas, 114 páginas",
        ],
        faq: [
          {
            q: "¿Puedo pedir un ejemplar para cada familia de mi lista?",
            a:
              "Sí, la edición en papel está en Amazon en español e inglés y allí se puede pedir " +
              "cualquier cantidad directamente. Si el pedido es para un programa entero y no para " +
              "una lista, escríbanos indicando a cuántas familias cubre.",
          },
          {
            q: "¿Puedo imprimir hojas para repartir durante las visitas?",
            a:
              "Sí. Diez hojas del libro son gratis aquí y pueden imprimirse en cualquier cantidad " +
              "para los niños con los que trabaja, y entregarse a las familias para que se las " +
              "queden. No pueden venderse ni reunirse en una colección que se distribuya como obra " +
              "de otra persona.",
          },
          {
            q: "¿La familia necesita algo además del libro?",
            a:
              "Un crayón o un lápiz. Las páginas están impresas por una cara, así que un rotulador " +
              "que traspase marca un dorso en blanco y no el dibujo siguiente. No hay que recortar, " +
              "imprimir ni preparar nada de antemano.",
          },
          {
            q: "¿Existe una edición en ruso?",
            a:
              "La edición en ruso existe como archivo imprimible y no en papel, porque Amazon no " +
              "imprime libros en ruso. Si trabaja con familias rusohablantes y la necesita, " +
              "escríbanos.",
          },
        ],
      },

      ru: {
        title: "Раскраска, которая остается в доме: программы домашних визитов",
        lead:
          "Книга на языке самой семьи, которая остается дома. Английское и испанское издания на " +
          "Amazon, любое количество, по одной на каждую семью из списка.",
        body: [
          "Книга написана на языке семьи, а не переведена на него. Испанское издание это " +
            "собственная книга с испанскими словами под рисунками, поэтому в доме после визита " +
            "остается испанская книга, а не английская с наклейкой на обложке.",
          "Для работы ей не нужно ничего: ни принтера, ни ножниц, ни подготовки, ни материалов, " +
            "которых у семьи может не быть. Мелок и страница. Слово под каждым рисунком напечатано " +
            "контурными буквами и тоже раскрашивается, и это дает занятие взрослому и ребенку на " +
            "одной странице.",
          "Бумажная книга есть на Amazon на обоих языках, там заказывается любое количество, так " +
            "что экземпляр на каждую семью из списка это один заказ. Если заказ идет на программу " +
            "целиком, а не на одного сотрудника, напишите нам. Десять листов здесь бесплатны и " +
            "печатаются в любом количестве, в том числе для семей, которым лист остается насовсем.",
        ],
        fitTitle: "Что в книге",
        fit: [
          "Язык самой семьи, отдельной книгой, а не переводом",
          "111 рисунков, по одному на странице, без подготовки и без особых материалов",
          "Слово под каждым рисунком, контурными буквами, его можно раскрасить",
          "Толстый контур, крупные рисунки, печать с одной стороны",
          "Легкая настолько, что стопку можно носить с собой в сумке",
          "Формат 8.5 на 11 дюймов, 114 страниц",
        ],
        faq: [
          {
            q: "Можно ли заказать по книге на каждую семью из списка?",
            a:
              "Да, бумажная книга есть на Amazon на английском и испанском, там любое количество " +
              "заказывается напрямую. Если заказ идет на всю программу, а не на один список, " +
              "напишите нам и укажите, сколько это семей.",
          },
          {
            q: "Можно ли печатать листы, чтобы раздавать во время визитов?",
            a:
              "Да. Десять страниц из книги здесь бесплатны и печатаются в любом количестве для " +
              "детей, с которыми вы работаете, и остаются у семей насовсем. Нельзя только " +
              "продавать их и собирать в набор, который передается дальше как чужая работа.",
          },
          {
            q: "Нужно ли семье что-то кроме книги?",
            a:
              "Мелок или карандаш. Страницы напечатаны с одной стороны, поэтому фломастер, " +
              "прошедший лист насквозь, пометит пустую оборотную сторону, а не следующий рисунок. " +
              "Ничего не нужно вырезать, печатать и готовить заранее.",
          },
          {
            q: "Есть ли издание на русском?",
            a:
              "Русское издание выходит файлом для печати, а не в бумаге, потому что Amazon не " +
              "печатает книги на русском. Если вы работаете с русскоязычными семьями и оно нужно, " +
              "напишите нам.",
          },
        ],
      },
    },
  },

  /* ---------------------------------------------------------------- */
  {
    id: "groups",
    slug: {
      en: "coloring-book-for-parent-groups-and-libraries",
      es: "libro-para-colorear-para-grupos-de-padres-y-bibliotecas",
      ru: "raskraska-dlya-roditelskih-grupp-i-bibliotek",
    },
    copy: {
      en: {
        title: "The same book for everyone in the room: parent groups and libraries",
        lead:
          "One title, fifteen copies, one language for the whole room. English and Spanish " +
          "editions on Amazon, and ten pages free to print for a session or a giveaway.",
        body: [
          "When the adult and the child sit at the same table, one page has to give both of them " +
            "something. Here the drawing is for the child and the word under it is for the adult, " +
            "printed in outline letters so it can be colored as well as read. In the Spanish " +
            "edition that word is Spanish, in the English edition English.",
          "Fifteen identical copies are easy to work with: everyone is on the same page, literally, " +
            "and nobody is left comparing a different book. There are 111 drawings and they do not " +
            "repeat, so a group can meet through a whole year without going over the same subject " +
            "twice.",
          "The paperback is on Amazon in both languages and any quantity can be ordered there. For " +
            "a set for a series of sessions, or a giveaway larger than an ordinary order, write to " +
            "us and say how many people it is for. Ten pages are free to print here in any number, " +
            "which covers a single session or a handout at the door.",
        ],
        fitTitle: "What is in the book",
        fit: [
          "The word under each drawing, to read aloud as well as color",
          "One drawing per page, so a room of mixed ages works from the same sheet",
          "111 subjects, no repeats across a year of sessions",
          "Separate English and Spanish editions, each with its own words",
          "Thick outlines and large drawings, printed on one side only",
          "8.5 by 11 inches, 114 pages",
        ],
        faq: [
          {
            q: "Can I buy fifteen copies for a group?",
            a:
              "Yes, the paperback is on Amazon in English and Spanish and any quantity can be " +
              "ordered directly. If you need more than an ordinary order covers, or a set for a " +
              "series of sessions, write to us and say how many people it is for.",
          },
          {
            q: "Can I print pages for a session or to hand out at the door?",
            a:
              "Yes, in any number, and no permission or credit is needed. Ten pages from the book " +
              "are free here in US Letter and A4. They may not be sold, put behind a paywall, or " +
              "gathered into a collection passed on as someone else's work.",
          },
          {
            q: "Do the English and Spanish editions have the same drawings?",
            a:
              "Yes. The drawings are identical and only the word under each one differs, which " +
              "means a bilingual room can run both editions side by side on the same subject.",
          },
          {
            q: "What ages does it suit in a mixed group?",
            a:
              "One to three years old, and the pages hold up across that range because each drawing " +
              "is large and simple. A child who scribbles and a child who aims at the shape can " +
              "work on the same page without either one being lost.",
          },
        ],
      },

      es: {
        title: "El mismo libro para toda la sala: grupos de padres y bibliotecas",
        lead:
          "Un título, quince ejemplares, un idioma para toda la sala. Ediciones en español e " +
          "inglés en Amazon, y diez hojas gratis para imprimir para una sesión o un reparto.",
        body: [
          "Cuando el adulto y el niño se sientan a la misma mesa, una hoja tiene que darles algo a " +
            "los dos. Aquí el dibujo es para el niño y la palabra de debajo es para el adulto, en " +
            "letras huecas para colorearla además de leerla. En la edición en español esa palabra " +
            "está en español, y en la inglesa en inglés.",
          "Quince ejemplares iguales son fáciles de manejar: todos están literalmente en la misma " +
            "página y nadie se queda comparando con otro libro. Hay 111 dibujos y no se repiten, " +
            "así que un grupo puede reunirse todo un año sin repetir motivo.",
          "La edición en papel está en Amazon en los dos idiomas y allí se puede pedir cualquier " +
            "cantidad. Para un juego para una serie de sesiones, o un reparto mayor de lo que cubre " +
            "un pedido normal, escríbanos indicando para cuántas personas es. Diez hojas se " +
            "imprimen gratis aquí en cualquier cantidad, lo que cubre una sesión suelta o un " +
            "reparto en la puerta.",
        ],
        fitTitle: "Qué hay en el libro",
        fit: [
          "La palabra debajo de cada dibujo, para leerla en voz alta además de colorearla",
          "Un dibujo por página, para que una sala de edades mezcladas use la misma hoja",
          "111 motivos, sin repeticiones a lo largo de un año de sesiones",
          "Ediciones separadas en español e inglés, cada una con sus palabras",
          "Contornos gruesos y dibujos grandes, impresión por una sola cara",
          "8,5 por 11 pulgadas, 114 páginas",
        ],
        faq: [
          {
            q: "¿Puedo comprar quince ejemplares para un grupo?",
            a:
              "Sí, la edición en papel está en Amazon en español e inglés y allí se puede pedir " +
              "cualquier cantidad directamente. Si necesita más de lo que cubre un pedido normal, o " +
              "un juego para una serie de sesiones, escríbanos indicando para cuántas personas es.",
          },
          {
            q: "¿Puedo imprimir hojas para una sesión o para repartir en la puerta?",
            a:
              "Sí, en cualquier cantidad, y no hace falta permiso ni mención. Diez hojas del libro " +
              "son gratis aquí en tamaño Carta y A4. No pueden venderse, ponerse detrás de un pago " +
              "ni reunirse en una colección que se distribuya como obra de otra persona.",
          },
          {
            q: "¿Las ediciones en español y en inglés tienen los mismos dibujos?",
            a:
              "Sí. Los dibujos son idénticos y solo cambia la palabra de debajo, lo que permite que " +
              "una sala bilingüe use las dos ediciones a la vez sobre el mismo motivo.",
          },
          {
            q: "¿Para qué edades sirve en un grupo mezclado?",
            a:
              "De uno a tres años, y las hojas aguantan ese rango porque cada dibujo es grande y " +
              "simple. Un niño que garabatea y otro que ya apunta a la forma pueden trabajar en la " +
              "misma página sin que ninguno se pierda.",
          },
        ],
      },

      ru: {
        title: "Одна книга на всю комнату: родительские группы и библиотеки",
        lead:
          "Одно название, пятнадцать экземпляров, один язык на всех. Английское и испанское " +
          "издания на Amazon, плюс десять листов бесплатно на встречу или на раздачу.",
        body: [
          "Когда взрослый и ребенок сидят за одним столом, страница должна дать занятие обоим. " +
            "Здесь рисунок для ребенка, а слово под ним для взрослого, напечатано контурными " +
            "буквами, так что его можно и прочитать, и раскрасить. В испанском издании это слово " +
            "испанское, в английском английское.",
          "Пятнадцать одинаковых книг это удобно: все в буквальном смысле на одной странице, и " +
            "никто не сравнивает свою книгу с чужой. Рисунков сто одиннадцать, они не " +
            "повторяются, поэтому группа может собираться целый год и ни разу не вернуться к тому " +
            "же предмету.",
          "Бумажная книга есть на Amazon на обоих языках, там заказывается любое количество. Для " +
            "набора на цикл встреч или раздачи больше обычного заказа напишите нам и скажите, на " +
            "сколько человек. Десять листов здесь бесплатны и печатаются в любом количестве, этого " +
            "хватает на одну встречу или на раздачу при входе.",
        ],
        fitTitle: "Что в книге",
        fit: [
          "Слово под каждым рисунком, его можно прочитать вслух и раскрасить",
          "Один рисунок на странице, поэтому комната разного возраста работает с одного листа",
          "111 предметов, без повторов за год встреч",
          "Отдельные английское и испанское издания, у каждого свои слова",
          "Толстый контур и крупные рисунки, печать с одной стороны",
          "Формат 8.5 на 11 дюймов, 114 страниц",
        ],
        faq: [
          {
            q: "Можно ли купить пятнадцать экземпляров на группу?",
            a:
              "Да, бумажная книга есть на Amazon на английском и испанском, там любое количество " +
              "заказывается напрямую. Если нужно больше, чем берет обычный заказ, или набор на " +
              "цикл встреч, напишите нам и укажите, на сколько человек.",
          },
          {
            q: "Можно ли печатать листы на встречу или на раздачу при входе?",
            a:
              "Да, в любом количестве, разрешение и ссылка на нас не нужны. Десять страниц из книги " +
              "здесь бесплатны в форматах US Letter и A4. Нельзя продавать их, закрывать за плату " +
              "и собирать в набор, который передается дальше как чужая работа.",
          },
          {
            q: "У английского и испанского изданий одинаковые рисунки?",
            a:
              "Да. Рисунки одни и те же, различается только слово под ними, поэтому в двуязычной " +
              "комнате оба издания можно вести рядом по одному и тому же предмету.",
          },
          {
            q: "На какой возраст она подходит в смешанной группе?",
            a:
              "От года до трех, и страницы держат этот разброс, потому что каждый рисунок крупный " +
              "и простой. Ребенок, который черкает, и ребенок, который целится в форму, работают " +
              "на одной странице, и ни один из них не теряется.",
          },
        ],
      },
    },
  },

  /* ---------------------------------------------------------------- */
  {
    id: "daycare",
    slug: {
      en: "coloring-books-for-daycare-and-family-child-care",
      es: "libros-para-colorear-para-guarderias-y-cuidado-infantil-familiar",
      ru: "raskraski-dlya-yasley-i-domashnih-detskih-grupp",
    },
    copy: {
      en: {
        title: "Coloring books for a toddler room: daycare and family child care",
        lead:
          "One book per child or one for the shelf, in English or Spanish. 111 drawings, printed " +
          "on one side, ordered in any quantity on Amazon.",
        body: [
          "A toddler room has as many levels in it as it has children, and the same page has to " +
            "work for all of them. That is why every drawing here is large, simple and alone on the " +
            "page: a child who is still scribbling covers it, and a child who aims fills the parts " +
            "inside it, and neither one is doing the wrong thing.",
          "Printing on one side matters more in a room than anywhere else. A marker goes through " +
            "ordinary paper, and on a double sided page it ruins the drawing underneath. Here it " +
            "marks a blank back instead. The word printed under each drawing is in outline letters " +
            "and can be colored, and in the Spanish edition it is a Spanish word rather than a " +
            "translated one.",
          "The paperback is on Amazon in both languages, and any quantity can be ordered, whether " +
            "that is one copy for the shelf or one for every child. For a set covering several " +
            "rooms, write to us and say how many children it is for. Ten pages are free to print " +
            "here in any number, which is enough to see whether these pages suit your room before " +
            "you order anything.",
        ],
        fitTitle: "What is in the book",
        fit: [
          "Large, simple drawings that work across the levels in one room",
          "One drawing per page, printed on one side only",
          "111 different subjects, enough for a year without repeats",
          "The word under each drawing, Spanish in the Spanish edition",
          "Thick outlines that hold up under a fist grip",
          "8.5 by 11 inches, 114 pages",
        ],
        faq: [
          {
            q: "Can I order a copy for every child in the room?",
            a:
              "Yes. The paperback is on Amazon in English and Spanish and any quantity can be " +
              "ordered directly. For a set covering several rooms or a whole center, write to us " +
              "and say how many children it is for.",
          },
          {
            q: "Can I photocopy pages from the book for the room?",
            a:
              "No, but you do not have to. Ten pages from the book are free here and may be printed " +
              "in any number for the children in your care, including copies sent home with " +
              "families.",
          },
          {
            q: "Will a marker come through the page?",
            a:
              "It goes through ordinary paper, as it does in any book at this price. The pages here " +
              "are printed on one side only, so what it marks is a blank back rather than the next " +
              "drawing. A spare sheet underneath stops it completely.",
          },
          {
            q: "Is it too easy for the older children in a mixed room?",
            a:
              "Past about three and a half most children find these pages easy, and the sign is " +
              "boredom rather than neatness. For those children a scene with more areas to fill, or " +
              "a step by step drawing book, suits better, and we will say so rather than sell you " +
              "the wrong thing.",
          },
        ],
      },

      es: {
        title: "Libros para colorear para una sala de niños pequeños: guarderías y cuidado infantil familiar",
        lead:
          "Un libro por niño o uno para la estantería, en español o en inglés. 111 dibujos, " +
          "impresión por una cara, cualquier cantidad en Amazon.",
        body: [
          "Una sala de niños pequeños tiene tantos niveles como niños, y la misma hoja tiene que " +
            "servir para todos. Por eso cada dibujo de aquí es grande, simple y está solo en la " +
            "página: el niño que todavía garabatea la cubre entera, el que ya apunta rellena las " +
            "partes de dentro, y ninguno de los dos lo está haciendo mal.",
          "La impresión por una cara importa en una sala más que en ningún sitio. El rotulador " +
            "traspasa el papel corriente y en una hoja impresa por los dos lados arruina el dibujo " +
            "de debajo. Aquí marca un dorso en blanco. La palabra impresa debajo de cada dibujo " +
            "está en letras huecas y se colorea, y en la edición en español es una palabra española " +
            "y no una traducida.",
          "La edición en papel está en Amazon en los dos idiomas y se puede pedir cualquier " +
            "cantidad, sea un ejemplar para la estantería o uno para cada niño. Para un juego que " +
            "cubra varias salas, escríbanos indicando para cuántos niños es. Diez hojas se imprimen " +
            "gratis aquí en cualquier cantidad, suficiente para ver si estas páginas encajan en su " +
            "sala antes de pedir nada.",
        ],
        fitTitle: "Qué hay en el libro",
        fit: [
          "Dibujos grandes y simples que sirven para los distintos niveles de una sala",
          "Un dibujo por página, impresión por una sola cara",
          "111 motivos distintos, suficientes para un año sin repetir",
          "La palabra debajo de cada dibujo, en español en la edición española",
          "Contornos gruesos que aguantan el agarre de puño",
          "8,5 por 11 pulgadas, 114 páginas",
        ],
        faq: [
          {
            q: "¿Puedo pedir un ejemplar para cada niño de la sala?",
            a:
              "Sí. La edición en papel está en Amazon en español e inglés y allí se puede pedir " +
              "cualquier cantidad directamente. Para un juego que cubra varias salas o un centro " +
              "entero, escríbanos indicando para cuántos niños es.",
          },
          {
            q: "¿Puedo fotocopiar páginas del libro para la sala?",
            a:
              "No, pero no hace falta. Diez hojas del libro son gratis aquí y pueden imprimirse en " +
              "cualquier cantidad para los niños a su cargo, incluidas copias para mandar a casa " +
              "con las familias.",
          },
          {
            q: "¿El rotulador traspasa la página?",
            a:
              "Traspasa el papel corriente, como en cualquier libro de este precio. Las páginas de " +
              "aquí están impresas por una sola cara, así que lo que marca es un dorso en blanco y " +
              "no el dibujo siguiente. Una hoja suelta debajo lo detiene del todo.",
          },
          {
            q: "¿Resulta demasiado fácil para los mayores de una sala mezclada?",
            a:
              "Pasados los tres años y medio la mayoría encuentra estas hojas fáciles, y la señal " +
              "es el aburrimiento y no la pulcritud. A esos niños les conviene más una escena con " +
              "más zonas que rellenar o un libro de dibujo paso a paso, y se lo diremos en vez de " +
              "venderle lo que no encaja.",
          },
        ],
      },

      ru: {
        title: "Раскраски для группы малышей: ясли и домашние детские группы",
        lead:
          "По книге на ребенка или одна на полку, на английском или испанском. 111 рисунков, " +
          "печать с одной стороны, любое количество на Amazon.",
        body: [
          "В группе малышей столько уровней, сколько детей, и одна и та же страница должна " +
            "подойти всем. Поэтому каждый рисунок здесь крупный, простой и один на странице: " +
            "ребенок, который еще черкает, закрывает его целиком, а тот, кто уже целится, " +
            "закрашивает участки внутри, и оба делают правильно.",
          "Печать с одной стороны в группе важнее, чем где-либо. Фломастер проходит обычную бумагу " +
            "насквозь, и на двусторонней странице он портит рисунок под ней. Здесь он пометит " +
            "пустую оборотную сторону. Слово под каждым рисунком напечатано контурными буквами и " +
            "раскрашивается, а в испанском издании это испанское слово, а не переведенное.",
          "Бумажная книга есть на Amazon на обоих языках, и заказать можно любое количество: и " +
            "один экземпляр на полку, и по книге каждому ребенку. Для набора на несколько групп " +
            "напишите нам и укажите, на сколько детей. Десять листов здесь бесплатны и печатаются " +
            "в любом количестве, этого достаточно, чтобы понять, подходят ли такие страницы вашей " +
            "группе, до всякого заказа.",
        ],
        fitTitle: "Что в книге",
        fit: [
          "Крупные простые рисунки, работающие на разных уровнях внутри одной группы",
          "Один рисунок на странице, печать с одной стороны",
          "111 разных предметов, на год без повторов",
          "Слово под каждым рисунком, в испанском издании испанское",
          "Толстый контур, выдерживающий хват кулаком",
          "Формат 8.5 на 11 дюймов, 114 страниц",
        ],
        faq: [
          {
            q: "Можно ли заказать по книге каждому ребенку в группе?",
            a:
              "Да. Бумажная книга есть на Amazon на английском и испанском, там любое количество " +
              "заказывается напрямую. Для набора на несколько групп или на весь центр напишите нам " +
              "и укажите, на сколько детей.",
          },
          {
            q: "Можно ли копировать страницы книги для группы?",
            a:
              "Нет, но этого и не требуется. Десять страниц из книги здесь бесплатны и печатаются " +
              "в любом количестве для детей, с которыми вы работаете, в том числе для того, чтобы " +
              "отдать их домой семьям.",
          },
          {
            q: "Проходит ли фломастер страницу насквозь?",
            a:
              "Обычную бумагу он проходит, как в любой книге этой цены. Здесь страницы напечатаны " +
              "с одной стороны, поэтому помечена окажется пустая оборотная сторона, а не следующий " +
              "рисунок. Запасной лист снизу убирает это полностью.",
          },
          {
            q: "Не слишком ли это легко для старших в смешанной группе?",
            a:
              "После примерно трех с половиной лет большинству эти страницы легки, и сигналом " +
              "служит скука, а не аккуратность. Таким детям больше подойдет сюжет, где участков " +
              "больше, или книга с рисованием по шагам, и мы скажем об этом, а не продадим " +
              "неподходящее.",
          },
        ],
      },
    },
  },
];

export const proPageBySlug = (lang: ContentLang, slug: string) =>
  proPages.find((p) => p.slug[lang] === slug);

/* Надписи блоков. */
export type ProLabels = {
  listTitle: string;
  listLead: string;
  buyTitle: string;
  buyLead: string;
  bulkTitle: string;
  bulkLead: string;
  bulkCta: string;
  sampleTitle: string;
  sampleLead: string;
  otherPages: string;
  backToSection: string;
};

export const proLabels: Record<ContentLang, ProLabels> = {
  en: {
    listTitle: "Buying for work",
    listLead:
      "Four pages on what the book is, what it costs, how to get many copies and what you may " +
      "print, written for the kind of work you do.",
    buyTitle: "The book",
    buyLead:
      "Paperback, sold and shipped by Amazon in English and in Spanish. Any quantity can be " +
      "ordered there directly.",
    bulkTitle: "More copies than an ordinary order covers",
    bulkLead:
      "Write to us and say what you need and how many children it is for. We answer in English, " +
      "Spanish and Russian.",
    bulkCta: "Write to us",
    sampleTitle: "See it before you order",
    sampleLead:
      "Ten pages from the book, free, in US Letter and A4. Print one and the line thickness and " +
      "the size of the drawing answer the question faster than any description.",
    otherPages: "Other kinds of work",
    backToSection: "All of it on one page",
  },
  es: {
    listTitle: "Comprar para el trabajo",
    listLead:
      "Cuatro páginas sobre qué es el libro, cuánto cuesta, cómo conseguir muchos ejemplares y qué " +
      "puede imprimir, escritas para el tipo de trabajo que hace.",
    buyTitle: "El libro",
    buyLead:
      "Edición en papel, vendida y enviada por Amazon en inglés y en español. Allí se puede pedir " +
      "cualquier cantidad directamente.",
    bulkTitle: "Más ejemplares de los que cubre un pedido normal",
    bulkLead:
      "Escríbanos indicando qué necesita y para cuántos niños. Respondemos en español, inglés y " +
      "ruso.",
    bulkCta: "Escríbanos",
    sampleTitle: "Véalo antes de pedir",
    sampleLead:
      "Diez hojas del libro, gratis, en tamaño Carta y A4. Imprima una y el grosor del contorno y " +
      "el tamaño del dibujo responden a la pregunta más rápido que cualquier descripción.",
    otherPages: "Otros tipos de trabajo",
    backToSection: "Todo en una página",
  },
  ru: {
    listTitle: "Покупка для работы",
    listLead:
      "Четыре страницы о том, что за книга, сколько стоит, как получить много экземпляров и что " +
      "можно печатать, написанные под конкретный вид работы.",
    buyTitle: "Книга",
    buyLead:
      "Бумажное издание, продажа и доставка Amazon, на английском и испанском. Там заказывается " +
      "любое количество напрямую.",
    bulkTitle: "Больше экземпляров, чем берет обычный заказ",
    bulkLead:
      "Напишите нам, что нужно и на сколько детей. Отвечаем по-английски, по-испански и " +
      "по-русски.",
    bulkCta: "Написать нам",
    sampleTitle: "Посмотреть до заказа",
    sampleLead:
      "Десять страниц из книги, бесплатно, в форматах US Letter и A4. Распечатайте одну, и " +
      "толщина контура и размер рисунка ответят на вопрос быстрее любого описания.",
    otherPages: "Другие виды работы",
    backToSection: "Все это на одной странице",
  },
};
