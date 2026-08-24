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
          "Un libro para colorear en español para logopedas y programas de intervención " +
            "temprana",
        lead:
          "111 dibujos, uno por página, con la palabra en español debajo de cada imagen. El " +
            "libro está disponible en Amazon en español e inglés, y se puede pedir la cantidad " +
            "de ejemplares necesaria para todo el grupo.",
        body: [
          "La edición en español es una versión independiente del libro. Los dibujos son los " +
            "mismos que en la edición inglesa, pero debajo de cada imagen aparece una palabra " +
            "en español impresa con letras de contorno que también se pueden colorear. En cada " +
            "página hay un solo dibujo, una palabra, un contorno grueso y espacio libre " +
            "alrededor.",
          "Cada página muestra algo familiar para un niño pequeño: animales, animales " +
            "marinos, comida, juguetes, vehículos, flores y personajes de cuentos. En total " +
            "hay 111 dibujos diferentes, sin repeticiones, por lo que el libro ofrece material " +
            "para muchas sesiones.",
          "La edición impresa se vende en Amazon, donde puede pedir la cantidad de " +
            "ejemplares que necesite. Si necesita un pedido grande para un programa o tiene " +
            "alguna necesidad especial, escríbanos. También puede imprimir gratis diez páginas " +
            "del libro para comprobar de antemano el grosor del contorno y el tamaño de los " +
            "dibujos.",
        ],
        fitTitle: "Qué hay en el libro",
        fit: [
          "Un dibujo y una palabra por página, sin elementos innecesarios que distraigan la " +
            "atención",
          "La palabra aparece en español en la edición española y en inglés en la edición " +
            "inglesa",
          "Contornos gruesos, adecuados para las primeras etapas del coloreado y para " +
            "rotuladores de puntos",
          "111 motivos distintos, sin repeticiones",
          "Impresión por una sola cara, para que el rotulador no estropee el dibujo siguiente",
          "8,5 por 11 pulgadas, 114 páginas",
        ],
        faq: [
          {
            q: "¿La edición en español es una traducción de la inglesa?",
            a:
              "No. Es una edición independiente con su propio título. Los dibujos son los " +
                "mismos, pero debajo de cada uno aparece una palabra en español. Así, una " +
                "familia hispanohablante recibe una versión completamente en español.",
          },
          {
            q: "¿Puedo comprar ejemplares para toda mi lista de niños?",
            a:
              "Sí. La edición impresa está disponible en Amazon en ambos idiomas y allí " +
                "puede pedir la cantidad de ejemplares que necesite. Si necesita un pedido " +
                "grande para un programa, escríbanos e indique para cuántos niños sería.",
          },
          {
            q: "¿Puedo imprimir hojas en vez de comprar un ejemplar por niño?",
            a:
              "Diez páginas del libro están disponibles aquí gratuitamente y pueden " +
                "imprimirse en cualquier cantidad para los niños con los que trabaja, " +
                "incluidas copias para entregar a las familias. El resto de las páginas del " +
                "libro no se pueden copiar.",
          },
          {
            q: "¿Para qué edad está pensado el libro?",
            a:
              "El libro está pensado para niños de uno a tres años, aunque conviene fijarse " +
                "no solo en la edad, sino también en sus habilidades. Puede servir tanto a un " +
                "niño que todavía hace trazos amplios por toda la hoja como a otro que ya " +
                "intenta colorear el dibujo.",
          },
        ],
      },

      ru: {
        title: "Раскраска на испанском языке для логопедов и программ раннего вмешательства",
        lead:
          "111 рисунков, по одному на странице, с названием на испанском языке под каждым " +
            "рисунком. Книга продается на Amazon на испанском и английском языках, можно " +
            "заказать нужное количество экземпляров для всей группы.",
        body: [
          "Испанское издание - отдельная версия книги. Рисунки в нем те же, что и в " +
            "английском, но под каждым изображением напечатано испанское слово контурными " +
            "буквами, которое тоже можно раскрасить. На странице нет ничего лишнего: один " +
            "рисунок, одно слово, толстый контур и свободное пространство вокруг.",
          "Каждый рисунок изображает знакомый ребенку предмет, животное или персонажа: " +
            "животных, морских обитателей, еду, игрушки, транспорт, цветы и сказочных героев. " +
            "Всего в книге 111 разных рисунков без повторов, поэтому материала хватит для " +
            "занятий в течение длительного времени.",
          "Бумажная книга продается на Amazon, где можно заказать необходимое количество " +
            "экземпляров. Если вам нужен крупный заказ для программы или особые условия, " +
            "напишите нам. Десять страниц из книги доступны здесь бесплатно: их можно " +
            "распечатать и заранее оценить толщину контура и размер рисунков.",
        ],
        fitTitle: "Что в книге",
        fit: [
          "Один рисунок и одно слово на странице, без лишних элементов, отвлекающих внимание",
          "В испанском издании слово напечатано по-испански, в английском - по-английски",
          "Толстый контур, удобный для первых попыток раскрашивания и работы точечными " +
            "маркерами",
          "111 разных предметов, без повторов",
          "Печать только с одной стороны: фломастер не испортит следующий рисунок",
          "Формат 8.5 на 11 дюймов, 114 страниц",
        ],
        faq: [
          {
            q: "Испанское издание это перевод английского?",
            a:
              "Нет. Это отдельное издание со своим названием. Рисунки те же, но под каждым " +
                "из них напечатано слово на испанском языке. Испаноязычная семья получает " +
                "полноценную испанскую версию книги.",
          },
          {
            q: "Можно ли купить экземпляры на весь список детей?",
            a:
              "Да. Бумажная книга продается на Amazon на обоих языках, и там можно заказать " +
                "нужное количество экземпляров. Если вам нужен крупный заказ для программы, " +
                "напишите нам и укажите количество детей.",
          },
          {
            q: "Можно ли печатать страницы вместо покупки книги каждому ребенку?",
            a:
              "Десять страниц из книги доступны здесь бесплатно, и их можно печатать в любом " +
                "количестве для детей, с которыми вы работаете, в том числе отдавать семьям. " +
                "Остальные страницы книги копировать нельзя.",
          },
          {
            q: "На какой возраст рассчитана книга?",
            a:
              "Книга создана для детей от года до трех лет, но при выборе лучше " +
                "ориентироваться не только на возраст, но и на навыки ребенка. Она подходит и " +
                "тем, кто пока рисует размашистые линии по всему листу, и тем, кто уже " +
                "старается раскрашивать сам рисунок.",
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
        title: "Un libro para colorear para programas de visitas al hogar",
        lead:
          "Un libro en el idioma de la familia que puede quedarse en casa después de la " +
            "visita. Las ediciones en español e inglés están disponibles en Amazon y se puede " +
            "pedir un ejemplar para cada familia.",
        body: [
          "La edición en español es una versión independiente del libro, con palabras en " +
            "español debajo de los dibujos. Así, después de la visita, una familia " +
            "hispanohablante puede quedarse con un libro completamente en su idioma.",
          "No hace falta impresora, tijeras ni preparación previa. Basta con el libro y unos " +
            "crayones o lápices. La palabra debajo de cada dibujo está impresa con letras de " +
            "contorno que también se pueden colorear, de modo que una misma página permite " +
            "mirar la imagen, nombrarla y colorearla juntos.",
          "La edición impresa está disponible en Amazon en ambos idiomas y allí puede pedir " +
            "la cantidad de ejemplares necesaria para las familias. Si el pedido es para todo " +
            "un programa, escríbanos. Las diez páginas gratuitas pueden imprimirse en " +
            "cualquier cantidad y entregarse a las familias después de la visita.",
        ],
        fitTitle: "Qué hay en el libro",
        fit: [
          "Ediciones independientes en español e inglés",
          "111 dibujos, uno por página, sin preparación previa ni materiales especiales",
          "La palabra debajo de cada dibujo, en letras huecas que se colorean",
          "Contornos gruesos, dibujos grandes, impresión por una sola cara",
          "El libro es fácil de llevar a las visitas al hogar",
          "8,5 por 11 pulgadas, 114 páginas",
        ],
        faq: [
          {
            q: "¿Puedo pedir un ejemplar para cada familia de mi lista?",
            a:
              "Sí. La edición impresa está disponible en Amazon en español e inglés y allí " +
                "puede pedir la cantidad de ejemplares que necesite. Si necesita libros para " +
                "todo un programa, escríbanos e indique el número de familias.",
          },
          {
            q: "¿Puedo imprimir hojas para repartir durante las visitas?",
            a:
              "Sí. Diez páginas del libro están disponibles aquí gratuitamente y pueden " +
                "imprimirse en cualquier cantidad para los niños con los que trabaja y " +
                "entregarse después a las familias. No está permitido vender estos materiales " +
                "ni distribuirlos como una colección propia.",
          },
          {
            q: "¿La familia necesita algo además del libro?",
            a:
              "Solo hace falta un crayón, un lápiz o un rotulador. Las páginas están " +
                "impresas por una sola cara, por lo que, si la tinta traspasa el papel, " +
                "llegará al reverso en blanco y no al dibujo siguiente. No es necesario " +
                "recortar, imprimir ni preparar nada de antemano.",
          },
          {
            q: "¿Existe una edición en ruso?",
            a:
              "La edición en ruso está disponible como archivo para imprimir, no como libro " +
                "impreso. Si trabaja con familias rusohablantes y necesita esta versión, " +
                "escríbanos.",
          },
        ],
      },

      ru: {
        title: "Раскраска для программ домашних визитов",
        lead:
          "Книга на языке семьи, которую можно оставить дома после визита. Английское и " +
            "испанское издания продаются на Amazon, поэтому можно заказать по экземпляру для " +
            "каждой семьи.",
        body: [
          "Испанское издание - полноценная отдельная версия книги с испанскими словами под " +
            "рисунками. Поэтому после визита у испаноязычной семьи остается книга на ее языке.",
          "Для занятий не нужны принтер, ножницы или предварительная подготовка. Достаточно " +
            "книги и мелков или карандашей. Слово под каждым рисунком напечатано контурными " +
            "буквами и тоже раскрашивается, поэтому на одной странице можно одновременно " +
            "рассматривать картинку, называть ее и раскрашивать.",
          "Бумажная книга продается на Amazon на обоих языках, где можно заказать нужное " +
            "количество экземпляров для семей. Если заказ оформляется для целой программы, " +
            "напишите нам. Десять бесплатных страниц можно печатать в любом количестве и " +
            "оставлять семьям после визита.",
        ],
        fitTitle: "Что в книге",
        fit: [
          "Отдельные издания на английском и испанском языках",
          "111 рисунков, по одному на странице, без предварительной подготовки и специальных " +
            "материалов",
          "Слово под каждым рисунком, контурными буквами, его можно раскрасить",
          "Толстый контур, крупные рисунки, печать с одной стороны",
          "Книгу удобно брать с собой на домашние визиты",
          "Формат 8.5 на 11 дюймов, 114 страниц",
        ],
        faq: [
          {
            q: "Можно ли заказать по книге на каждую семью из списка?",
            a:
              "Да. Бумажная книга продается на Amazon на английском и испанском языках, и " +
                "там можно заказать нужное количество экземпляров. Если книги нужны для всей " +
                "программы, напишите нам и укажите количество семей.",
          },
          {
            q: "Можно ли печатать листы, чтобы раздавать во время визитов?",
            a:
              "Да. Десять страниц из книги доступны здесь бесплатно, и их можно печатать в " +
                "любом количестве для детей, с которыми вы работаете, а затем оставлять " +
                "семьям. Нельзя продавать эти материалы или распространять их как собственный " +
                "набор.",
          },
          {
            q: "Нужно ли семье что-то кроме книги?",
            a:
              "Только мелок, карандаш или фломастер. Страницы напечатаны с одной стороны, " +
                "поэтому чернила фломастера, прошедшие сквозь бумагу, попадут на пустой " +
                "оборот, а не на следующий рисунок. Ничего не нужно вырезать, распечатывать " +
                "или готовить заранее.",
          },
          {
            q: "Есть ли издание на русском?",
            a:
              "Русская версия доступна в виде файла для печати, а не бумажной книги. Если вы " +
                "работаете с русскоязычными семьями и вам нужна такая версия, напишите нам.",
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
        title: "Un mismo libro para todo el grupo: grupos de padres y bibliotecas",
        lead:
          "Ejemplares iguales para todo el grupo, en español o en inglés. Las ediciones " +
            "impresas están disponibles en Amazon y diez páginas del libro pueden imprimirse " +
            "gratuitamente para una sesión o para repartir entre los participantes.",
        body: [
          "Cuando el adulto y el niño se sientan juntos a la mesa, una misma página puede " +
            "convertirse en una actividad compartida. El niño colorea el dibujo y el adulto " +
            "lee la palabra que aparece debajo y nombra la imagen. La palabra está impresa con " +
            "letras de contorno, por lo que también se puede colorear. En la edición española " +
            "aparece en español y en la inglesa, en inglés.",
          "Tener ejemplares iguales facilita las actividades en grupo, porque todos pueden " +
            "trabajar con la misma página. El libro contiene 111 dibujos diferentes, sin " +
            "repeticiones, por lo que ofrece material para muchas sesiones.",
          "La edición impresa está disponible en Amazon en ambos idiomas y allí puede pedir " +
            "la cantidad de ejemplares que necesite. Si necesita un pedido grande para una " +
            "serie de sesiones o un programa, escríbanos e indique el número de participantes. " +
            "Las diez páginas gratuitas pueden imprimirse en cualquier cantidad para " +
            "utilizarlas en actividades o repartirlas.",
        ],
        fitTitle: "Qué hay en el libro",
        fit: [
          "La palabra debajo de cada dibujo, para leerla en voz alta además de colorearla",
          "Un dibujo grande por página, adecuado para niños con distintos niveles de habilidad",
          "111 dibujos diferentes, sin repeticiones",
          "Ediciones independientes en español e inglés, con las palabras en el idioma " +
            "correspondiente",
          "Contornos gruesos y dibujos grandes, impresión por una sola cara",
          "8,5 por 11 pulgadas, 114 páginas",
        ],
        faq: [
          {
            q: "¿Puedo comprar quince ejemplares para un grupo?",
            a:
              "Sí. La edición impresa está disponible en Amazon en español e inglés y allí " +
                "puede pedir la cantidad de ejemplares que necesite. Si necesita un pedido " +
                "grande para una serie de sesiones, escríbanos e indique el número de " +
                "participantes.",
          },
          {
            q: "¿Puedo imprimir hojas para una sesión o para repartir en la puerta?",
            a:
              "Sí. Las diez páginas gratuitas pueden imprimirse en cualquier cantidad y no " +
                "es necesario pedir permiso ni citarnos. Están disponibles en formatos US " +
                "Letter y A4. No está permitido venderlas, ofrecer acceso a ellas mediante " +
                "pago ni distribuirlas como una colección propia.",
          },
          {
            q: "¿Las ediciones en español y en inglés tienen los mismos dibujos?",
            a:
              "Sí. Los dibujos son los mismos en ambas ediciones; solo cambia la palabra que " +
                "aparece debajo. Por eso, en un grupo bilingüe se pueden utilizar al mismo " +
                "tiempo las ediciones en español e inglés trabajando con el mismo dibujo.",
          },
          {
            q: "¿Para qué edades sirve en un grupo mezclado?",
            a:
              "El libro está pensado para niños de uno a tres años. Los dibujos grandes y " +
                "sencillos permiten utilizar las mismas páginas con niños que se encuentran en " +
                "etapas diferentes: desde quienes todavía hacen trazos amplios por toda la " +
                "hoja hasta quienes ya intentan colorear dentro de la forma.",
          },
        ],
      },

      ru: {
        title: "Одна книга для всей группы: родительские группы и библиотеки",
        lead:
          "Одинаковые книги для всей группы на английском или испанском языке. Бумажные " +
            "издания продаются на Amazon, а десять страниц из книги можно бесплатно " +
            "распечатать для встречи или раздать участникам.",
        body: [
          "Когда взрослый и ребенок сидят за одним столом, одна страница может стать " +
            "совместным занятием. Ребенок раскрашивает рисунок, а взрослый читает слово под " +
            "ним и называет изображение. Слово напечатано контурными буквами, поэтому его тоже " +
            "можно раскрасить. В испанском издании слова напечатаны по-испански, в английском " +
            "- по-английски.",
          "Одинаковые экземпляры удобны для групповых занятий: все участники могут работать " +
            "с одной и той же страницей. В книге 111 разных рисунков без повторов, поэтому " +
            "материала хватит на множество встреч.",
          "Бумажная книга продается на Amazon на обоих языках, где можно заказать нужное " +
            "количество экземпляров. Если вам нужен крупный заказ для цикла встреч или " +
            "программы, напишите нам и укажите количество участников. Десять бесплатных " +
            "страниц можно печатать в любом количестве для занятий и раздачи.",
        ],
        fitTitle: "Что в книге",
        fit: [
          "Слово под каждым рисунком, его можно прочитать вслух и раскрасить",
          "Один крупный рисунок на странице, подходящий детям с разным уровнем навыков",
          "111 разных рисунков без повторов",
          "Отдельные английское и испанское издания со словами на соответствующем языке",
          "Толстый контур и крупные рисунки, печать с одной стороны",
          "Формат 8.5 на 11 дюймов, 114 страниц",
        ],
        faq: [
          {
            q: "Можно ли купить пятнадцать экземпляров на группу?",
            a:
              "Да. Бумажная книга продается на Amazon на английском и испанском языках, и " +
                "там можно заказать нужное количество экземпляров. Если вам нужен крупный " +
                "заказ для цикла встреч, напишите нам и укажите количество участников.",
          },
          {
            q: "Можно ли печатать листы на встречу или на раздачу при входе?",
            a:
              "Да. Десять бесплатных страниц можно печатать в любом количестве, разрешение и " +
                "ссылка на нас не требуются. Они доступны в форматах US Letter и A4. Нельзя " +
                "продавать эти материалы, предоставлять к ним платный доступ или " +
                "распространять их как собственный набор.",
          },
          {
            q: "У английского и испанского изданий одинаковые рисунки?",
            a:
              "Да. Рисунки в обеих версиях одинаковые, отличается только слово под каждым из " +
                "них. Поэтому в двуязычной группе можно одновременно использовать английское и " +
                "испанское издания, работая с одним и тем же рисунком.",
          },
          {
            q: "На какой возраст она подходит в смешанной группе?",
            a:
              "Книга рассчитана на детей от года до трех лет. Крупные и простые рисунки " +
                "позволяют использовать одни и те же страницы с детьми разного уровня: и с " +
                "теми, кто пока рисует размашистые линии, и с теми, кто уже старается " +
                "раскрашивать внутри формы.",
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
        title: "Libros para colorear para guarderías y centros de cuidado infantil",
        lead:
          "Un ejemplar para cada niño o uno para el grupo, en español o en inglés. 111 " +
            "dibujos, impresión por una sola cara y la posibilidad de pedir en Amazon la " +
            "cantidad de ejemplares que necesite.",
        body: [
          "En un grupo de niños pequeños puede haber distintos niveles de habilidad. Por " +
            "eso, cada dibujo del libro es grande, sencillo y ocupa una página independiente. " +
            "El niño que todavía hace trazos amplios puede trabajar libremente sobre ella, " +
            "mientras que quien ya controla mejor la mano puede intentar colorear las " +
            "distintas zonas.",
          "La impresión por una sola cara resulta especialmente práctica en actividades de " +
            "grupo. La tinta de un rotulador puede traspasar el papel corriente, pero en este " +
            "libro llegará al reverso en blanco y no estropeará el dibujo siguiente. La " +
            "palabra debajo de cada imagen está impresa con letras de contorno y también se " +
            "puede colorear. En la edición española, todas las palabras están en español.",
          "La edición impresa está disponible en Amazon en ambos idiomas. Puede pedir un " +
            "ejemplar para el grupo o uno para cada niño. Si necesita un pedido grande para " +
            "varias salas o grupos, escríbanos e indique el número de niños. También puede " +
            "imprimir diez páginas gratuitas para comprobar de antemano si este tipo de dibujo " +
            "es adecuado para su grupo.",
        ],
        fitTitle: "Qué hay en el libro",
        fit: [
          "Dibujos grandes y sencillos para niños con distintos niveles de habilidad dentro " +
            "de un mismo grupo",
          "Un dibujo por página, impresión por una sola cara",
          "111 dibujos diferentes, sin repeticiones",
          "Una palabra debajo de cada dibujo, en español en la edición española",
          "Contornos gruesos y fáciles de ver",
          "8,5 por 11 pulgadas, 114 páginas",
        ],
        faq: [
          {
            q: "¿Puedo pedir un ejemplar para cada niño de la sala?",
            a:
              "Sí. La edición impresa está disponible en Amazon en español e inglés y allí " +
                "puede pedir la cantidad de ejemplares que necesite. Si necesita un pedido " +
                "grande para varias salas o para todo el centro, escríbanos e indique el " +
                "número de niños.",
          },
          {
            q: "¿Puedo fotocopiar páginas del libro para la sala?",
            a:
              "Las páginas del libro no se pueden fotocopiar. Para actividades de grupo " +
                "hemos preparado diez páginas gratuitas que pueden imprimirse en cualquier " +
                "cantidad y, si lo desea, entregarse a los niños para llevar a casa.",
          },
          {
            q: "¿El rotulador traspasa la página?",
            a:
              "La tinta de los rotuladores puede traspasar el papel corriente. Como el libro " +
                "está impreso por una sola cara, llegará al reverso en blanco y no estropeará " +
                "el dibujo siguiente. Colocar una hoja de papel o un cartón debajo de la " +
                "página también ayuda a proteger la superficie.",
          },
          {
            q: "¿Resulta demasiado fácil para los mayores de una sala mezclada?",
            a:
              "A partir de los tres años y medio, aproximadamente, estas páginas pueden " +
                "empezar a resultar demasiado sencillas para muchos niños. La principal señal " +
                "es que pierden el interés. En ese caso, suele ser mejor elegir un libro con " +
                "dibujos más complejos o uno de dibujo paso a paso.",
          },
        ],
      },

      ru: {
        title: "Раскраски для ясельных групп и домашних детских садов",
        lead:
          "По книге для каждого ребенка или один экземпляр для группы, на английском или " +
            "испанском языке. 111 рисунков, печать только с одной стороны, нужное количество " +
            "экземпляров можно заказать на Amazon.",
        body: [
          "В группе малышей дети часто находятся на разных этапах развития навыков " +
            "рисования. Поэтому каждый рисунок в книге крупный, простой и занимает отдельную " +
            "страницу. Ребенок, который пока рисует размашистые линии, может свободно работать " +
            "с такой страницей, а тот, кто уже лучше управляет рукой, старается раскрашивать " +
            "отдельные участки.",
          "Печать только с одной стороны особенно удобна для групповых занятий. Чернила " +
            "фломастера могут пройти сквозь обычную бумагу, но в этой книге они попадут на " +
            "пустой оборот и не испортят следующий рисунок. Слово под изображением напечатано " +
            "контурными буквами и тоже раскрашивается. В испанском издании все слова написаны " +
            "по-испански.",
          "Бумажная книга продается на Amazon на обоих языках, и можно заказать как один " +
            "экземпляр для группы, так и по книге для каждого ребенка. Если вам нужен крупный " +
            "заказ для нескольких групп, напишите нам и укажите количество детей. Десять " +
            "бесплатных страниц можно распечатать заранее и проверить, подходят ли такие " +
            "рисунки вашей группе.",
        ],
        fitTitle: "Что в книге",
        fit: [
          "Крупные простые рисунки для детей с разным уровнем навыков в одной группе",
          "Один рисунок на странице, печать с одной стороны",
          "111 разных рисунков без повторов",
          "Слово под каждым рисунком, в испанском издании - на испанском языке",
          "Толстый и хорошо заметный контур",
          "Формат 8.5 на 11 дюймов, 114 страниц",
        ],
        faq: [
          {
            q: "Можно ли заказать по книге каждому ребенку в группе?",
            a:
              "Да. Бумажная книга продается на Amazon на английском и испанском языках, и " +
                "там можно заказать нужное количество экземпляров. Если вам нужен крупный " +
                "заказ для нескольких групп или всего центра, напишите нам и укажите " +
                "количество детей.",
          },
          {
            q: "Можно ли копировать страницы книги для группы?",
            a:
              "Страницы самой книги копировать нельзя. Для групповых занятий мы подготовили " +
                "десять бесплатных страниц, которые можно печатать в любом количестве и при " +
                "необходимости отдавать детям домой.",
          },
          {
            q: "Проходит ли фломастер страницу насквозь?",
            a:
              "Чернила фломастера могут проходить сквозь обычную бумагу. Поскольку книга " +
                "напечатана только с одной стороны, они попадут на пустой оборот и не испортят " +
                "следующий рисунок. Дополнительный лист бумаги или картона под страницей " +
                "защитит и поверхность под книгой.",
          },
          {
            q: "Не слишком ли это легко для старших в смешанной группе?",
            a:
              "Примерно после трех с половиной лет эти страницы многим детям уже могут " +
                "показаться слишком простыми. Главный признак - ребенку становится скучно. В " +
                "таком случае лучше выбрать раскраску с более сложными рисунками или книгу с " +
                "пошаговым рисованием.",
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
      "Cuatro páginas sobre el libro, su precio, los pedidos de varios ejemplares y las " +
        "condiciones para imprimir los materiales gratuitos, pensadas para distintos tipos de " +
        "trabajo con niños.",
    buyTitle: "El libro",
    buyLead:
      "Las ediciones impresas en español e inglés se venden y se envían a través de Amazon. " +
        "Allí puede pedir directamente la cantidad de ejemplares que necesite.",
    bulkTitle: "Si necesita más ejemplares de los que puede pedir de la forma habitual",
    bulkLead:
      "Escríbanos indicando qué necesita y para cuántos niños. Respondemos en español, inglés y " +
      "ruso.",
    bulkCta: "Escríbanos",
    sampleTitle: "Véalo antes de pedir",
    sampleLead:
      "Diez páginas del libro disponibles gratuitamente en formatos US Letter y A4. Imprima " +
        "una para comprobar de antemano el grosor del contorno y el tamaño del dibujo.",
    otherPages: "Otros tipos de trabajo",
    backToSection: "Todo en una página",
  },
  ru: {
    listTitle: "Покупка для работы",
    listLead:
      "Четыре страницы о книге, ее стоимости, заказе большого количества экземпляров и " +
        "правилах печати бесплатных материалов - для разных видов работы с детьми.",
    buyTitle: "Книга",
    buyLead:
      "Бумажные издания на английском и испанском языках продаются и доставляются через " +
        "Amazon. Там можно напрямую заказать нужное количество экземпляров.",
    bulkTitle: "Если нужно больше экземпляров, чем позволяет обычный заказ",
    bulkLead:
      "Напишите нам, что именно вам нужно и для какого количества детей. Мы отвечаем на " +
        "английском, испанском и русском языках.",
    bulkCta: "Написать нам",
    sampleTitle: "Посмотреть до заказа",
    sampleLead:
      "Десять бесплатных страниц из книги в форматах US Letter и A4. Распечатайте одну " +
        "страницу, чтобы заранее оценить толщину контура и размер рисунка.",
    otherPages: "Другие виды работы",
    backToSection: "Все это на одной странице",
  },
};
