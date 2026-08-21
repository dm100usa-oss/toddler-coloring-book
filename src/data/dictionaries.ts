/* Все надписи интерфейса в одном месте. Испанский тут не перевод
   с английского слово в слово, а самостоятельный текст: испаноязычный
   родитель должен читать так, будто сайт писали для него. */

export type UiLang = "en" | "es";
export const activeLangs: UiLang[] = ["en", "es"];

export type Dict = {
  htmlLang: string;
  langName: string;
  nav: {
    home: string;
    ages: string;
    guides: string;
    printables: string;
    book: string;
    about: string;
    terms: string;
  };
  home: {
    /* Заголовок первого экрана. Он же главный ответ на вопрос,
       про что этот сайт. Короткий, без рекламных слов. */
    hero: string;
    lead: string;
    pickerTitle: string;
    pickerLead: string;
    whatTitle: string;
    whatText: string;
    whyTitle: string;
    why: string[];
    printablesTitle: string;
    printablesLead: string;
    printablesCta: string;
    bookTitle: string;
    bookLead: string;
    bookCta: string;
    sourcesTitle: string;
    sourcesLead: string;
  };
  picker: {
    start: string;
    stepOf: (n: number, total: number) => string;
    back: string;
    again: string;
    resultTitle: string;
    canTitle: string;
    lookForTitle: string;
    tryTitle: string;
    tryLead: string;
    bookLine: string;
    disclaimer: string;
    q: {
      age: { q: string; a: { value: string; label: string }[] };
      grip: { q: string; a: { value: string; label: string }[] };
      inside: { q: string; a: { value: string; label: string }[] };
      attention: { q: string; a: { value: string; label: string }[] };
    };
  };
  footer: {
    about: string;
    catalog: string;
    rights: string;
  };
  common: {
    free: string;
    download: string;
    letter: string;
    a4: string;
    amazon: string;
    updated: string;
  };
};

export const dictionaries: Record<UiLang, Dict> = {
  en: {
    htmlLang: "en-US",
    langName: "English",
    nav: {
      home: "Home",
      ages: "By age",
      guides: "Guides",
      printables: "Free pages",
      book: "The book",
      about: "About",
      terms: "Terms and privacy",
    },
    home: {
      hero: "Your child's first coloring book, chosen by what they can actually do",
      lead:
        "A one year old scribbles across the page. A three year old starts staying inside the line. " +
        "The same book does not suit both. Answer four questions about your child and see what fits, " +
        "with free pages to print and try today.",
      pickerTitle: "Find the right first coloring book",
      pickerLead:
        "Four questions, about thirty seconds. Nothing is stored and nothing is sent anywhere.",
      whatTitle: "What this site is",
      whatText:
        "A guide to the very first stage of drawing, from the first scribble to the first shape a " +
        "child colors on purpose. Every claim about what a child can do at a given age is tied to " +
        "published developmental milestones, and the sources are listed at the bottom of this page. " +
        "The site is run by Magic of Discoveries LLC, a small children's book publisher in Miami, " +
        "Florida, and it features one coloring book of our own.",
      whyTitle: "Why a first coloring book is not just a smaller coloring book",
      why: [
        "Line thickness decides everything. A thin outline disappears under a crayon held in a fist, and the child sees no result.",
        "One drawing per page. Two or three subjects on a sheet split the attention of a child who can hold it for a few minutes at most.",
        "The drawing has to fill the sheet. A small picture in the middle of a large page asks for accuracy the hand cannot deliver yet.",
        "The subject has to be recognizable. A toddler colors what they can name, and naming it is half the reason they stay at the table.",
        "Single-sided printing. A marker goes through ordinary book paper, and on a double-sided page it ruins the next drawing.",
      ],
      printablesTitle: "Free pages to print",
      printablesLead:
        "Twenty four drawings, sorted by how hard they are rather than by subject. Print one, hand " +
        "your child a crayon, and you will know within five minutes which level is theirs.",
      printablesCta: "See all free pages",
      bookTitle: "The book behind this site",
      bookLead:
        "We publish one coloring book for this age, and this site exists because we kept answering " +
        "the same questions from parents about it. It is not the only good book for a toddler, and " +
        "the guides here will tell you when a different kind of book suits your child better.",
      bookCta: "About the book",
      sourcesTitle: "Where the developmental facts come from",
      sourcesLead:
        "Ages on this site are typical ranges, not deadlines. Children reach these points at their " +
        "own pace, and a few months either way is ordinary.",
    },
    picker: {
      start: "Start",
      stepOf: (n, total) => `Question ${n} of ${total}`,
      back: "Back",
      again: "Start over",
      resultTitle: "What suits your child now",
      canTitle: "What a child at this stage can usually do",
      lookForTitle: "What to look for in a coloring book",
      tryTitle: "Print these and try today",
      tryLead: "Pages chosen for this stage. Free, no sign up.",
      bookLine: "The book we publish for this stage",
      disclaimer:
        "This is general guidance based on published developmental milestones, not an assessment " +
        "of your child. If you have concerns about your child's development, speak to your pediatrician.",
      q: {
        age: {
          q: "How old is your child?",
          a: [
            { value: "1", label: "Around 1 year" },
            { value: "2", label: "Around 2 years" },
            { value: "3", label: "Around 3 years" },
            { value: "4", label: "4 years or older" },
          ],
        },
        grip: {
          q: "How does your child hold a crayon?",
          a: [
            { value: "fist", label: "In a fist, whole hand" },
            { value: "fingers", label: "With fingers, but not steadily" },
            { value: "pencil", label: "Almost the way an adult holds a pencil" },
          ],
        },
        inside: {
          q: "What happens when your child colors?",
          a: [
            { value: "across", label: "Marks go across the page, anywhere" },
            { value: "near", label: "Marks land on the drawing, but cross the line" },
            { value: "inside", label: "Mostly stays inside the line" },
          ],
        },
        attention: {
          q: "How long does your child stay with one page?",
          a: [
            { value: "short", label: "A minute or two" },
            { value: "medium", label: "About five minutes" },
            { value: "long", label: "Ten minutes or more" },
          ],
        },
      },
    },
    footer: {
      about:
        "Toddler Coloring Book is published by Magic of Discoveries LLC, a children's book " +
        "publisher in Miami, Florida. We write about the first stage of drawing and we publish " +
        "one coloring book for this age.",
      catalog: "Our full catalog",
      rights: "All drawings on this site are our own work.",
    },
    common: {
      free: "Free",
      download: "Download",
      letter: "US Letter",
      a4: "A4",
      amazon: "Buy on Amazon",
      updated: "Updated",
    },
  },

  es: {
    htmlLang: "es",
    langName: "Español",
    nav: {
      home: "Inicio",
      ages: "Por edad",
      guides: "Guías",
      printables: "Dibujos gratis",
      book: "El libro",
      about: "Quiénes somos",
      terms: "Condiciones y privacidad",
    },
    home: {
      hero: "El primer libro para colorear de su hijo, elegido por lo que ya sabe hacer",
      lead:
        "Un niño de un año garabatea por toda la hoja. Uno de tres empieza a quedarse dentro de la " +
        "línea. El mismo libro no sirve para los dos. Responda cuatro preguntas sobre su hijo y vea " +
        "qué le conviene, con dibujos gratis para imprimir hoy mismo.",
      pickerTitle: "Encuentre el primer libro para colorear adecuado",
      pickerLead:
        "Cuatro preguntas, unos treinta segundos. No se guarda nada ni se envía nada a ninguna parte.",
      whatTitle: "Qué es este sitio",
      whatText:
        "Una guía sobre la primera etapa del dibujo, desde el primer garabato hasta la primera forma " +
        "que un niño colorea a propósito. Cada afirmación sobre lo que un niño puede hacer a cierta " +
        "edad se apoya en hitos del desarrollo publicados, y las fuentes están al final de esta " +
        "página. El sitio pertenece a Magic of Discoveries LLC, una pequeña editorial de libros " +
        "infantiles en Miami, Florida, y presenta un libro para colorear propio.",
      whyTitle: "Por qué un primer libro para colorear no es solo un libro más pequeño",
      why: [
        "El grosor de la línea lo decide todo. Un contorno fino desaparece bajo un crayón agarrado con el puño, y el niño no ve ningún resultado.",
        "Un dibujo por página. Dos o tres motivos en una hoja reparten la atención de un niño que apenas la sostiene unos minutos.",
        "El dibujo tiene que llenar la hoja. Una figura pequeña en el centro de una página grande exige una precisión que la mano todavía no tiene.",
        "El motivo tiene que reconocerse. Un niño pequeño colorea lo que sabe nombrar, y nombrarlo es la mitad de la razón por la que sigue en la mesa.",
        "Impresión por una sola cara. El rotulador traspasa el papel corriente y, en una hoja impresa por los dos lados, arruina el dibujo siguiente.",
      ],
      printablesTitle: "Dibujos gratis para imprimir",
      printablesLead:
        "Veinticuatro dibujos, ordenados por dificultad y no por tema. Imprima uno, dele un crayón a " +
        "su hijo y en cinco minutos sabrá cuál es su nivel.",
      printablesCta: "Ver todos los dibujos gratis",
      bookLead:
        "Publicamos un libro para colorear para esta edad, y este sitio existe porque respondíamos " +
        "una y otra vez las mismas preguntas de los padres. No es el único libro bueno para un niño " +
        "pequeño, y las guías de aquí le dirán cuándo le conviene otro tipo de libro.",
      bookTitle: "El libro detrás de este sitio",
      bookCta: "Sobre el libro",
      sourcesTitle: "De dónde salen los datos sobre el desarrollo",
      sourcesLead:
        "Las edades de este sitio son rangos habituales, no plazos. Cada niño llega a estos puntos a " +
        "su ritmo, y unos meses de diferencia en cualquier sentido es algo corriente.",
    },
    picker: {
      start: "Empezar",
      stepOf: (n, total) => `Pregunta ${n} de ${total}`,
      back: "Atrás",
      again: "Empezar de nuevo",
      resultTitle: "Lo que le conviene a su hijo ahora",
      canTitle: "Lo que suele poder hacer un niño en esta etapa",
      lookForTitle: "Qué buscar en un libro para colorear",
      tryTitle: "Imprima estos y pruebe hoy",
      tryLead: "Dibujos elegidos para esta etapa. Gratis, sin registro.",
      bookLine: "El libro que publicamos para esta etapa",
      disclaimer:
        "Esta es una orientación general basada en hitos del desarrollo publicados, no una " +
        "evaluación de su hijo. Si tiene dudas sobre su desarrollo, hable con su pediatra.",
      q: {
        age: {
          q: "¿Qué edad tiene su hijo?",
          a: [
            { value: "1", label: "Alrededor de 1 año" },
            { value: "2", label: "Alrededor de 2 años" },
            { value: "3", label: "Alrededor de 3 años" },
            { value: "4", label: "4 años o más" },
          ],
        },
        grip: {
          q: "¿Cómo agarra el crayón?",
          a: [
            { value: "fist", label: "Con el puño, toda la mano" },
            { value: "fingers", label: "Con los dedos, pero sin firmeza" },
            { value: "pencil", label: "Casi como un adulto agarra un lápiz" },
          ],
        },
        inside: {
          q: "¿Qué pasa cuando colorea?",
          a: [
            { value: "across", label: "Las marcas van por toda la hoja" },
            { value: "near", label: "Caen sobre el dibujo, pero se salen de la línea" },
            { value: "inside", label: "Se queda dentro de la línea casi siempre" },
          ],
        },
        attention: {
          q: "¿Cuánto tiempo sigue con la misma hoja?",
          a: [
            { value: "short", label: "Uno o dos minutos" },
            { value: "medium", label: "Unos cinco minutos" },
            { value: "long", label: "Diez minutos o más" },
          ],
        },
      },
    },
    footer: {
      about:
        "Toddler Coloring Book pertenece a Magic of Discoveries LLC, una editorial de libros " +
        "infantiles en Miami, Florida. Escribimos sobre la primera etapa del dibujo y publicamos " +
        "un libro para colorear para esta edad.",
      catalog: "Nuestro catálogo completo",
      rights: "Todos los dibujos de este sitio son obra nuestra.",
    },
    common: {
      free: "Gratis",
      download: "Descargar",
      letter: "Carta",
      a4: "A4",
      amazon: "Comprar en Amazon",
      updated: "Actualizado",
    },
  },
};
