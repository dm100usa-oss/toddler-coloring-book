import type { UiLang } from "./dictionaries";

/* Раздел вопросов.

   Здесь только те вопросы, которых нет на других страницах сайта.
   Повторять уже отвеченное нельзя: один и тот же текст на двух адресах
   ослабляет оба, и поисковик начинает выбирать между ними вместо того,
   чтобы уверенно показывать один. Вопросы, разобранные в статьях, на
   возрастных страницах и на страницах для тех, кто покупает книгу на
   работу, собраны внизу раздела указателем со ссылками.

   Каждый ответ написан так, чтобы читаться отдельно, без соседних.
   Именно по одному ответу нейросеть цитирует страницу, и если ответ
   опирается на предыдущий, процитировать его нельзя.

   Заявлений о пользе для здоровья и развития здесь нет нигде. Там, где
   они напрашивались, стоит проверяемый факт. Утверждение, которое нельзя
   подтвердить, обесценивает и все остальные. */

export type FaqItem = {
  q: string;
  /** Ответ абзацами. Разбивка сохраняется: сплошной текст в двадцать
      строк человек не читает, а машина хуже вычленяет из него ответ. */
  a: string[];
};

export type FaqGroup = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const faq: Record<UiLang, FaqGroup[]> = {
  en: [
    {
      id: "choose",
      title: "Choosing a first coloring book",
      items: [
        {
          q: "Which coloring book should I choose for a child aged 1 to 3?",
          a: [
            "A good first coloring book differs from an ordinary one in six ways, and all " +
              "six are visible in the page photos before you buy.",
            "The outline is thick. A thin line disappears under a wide stroke and the child " +
              "cannot see the result of their work.",
            "One drawing per page. Several objects on a sheet split the attention, and " +
              "attention at this age lasts a few minutes.",
            "The drawing is large and fills the sheet. The hand moves from the shoulder, so " +
              "anything small is still out of reach.",
            "No tiny areas inside the drawing. There should be one simple shape to fill, " +
              "not ten petals.",
            "Printed on one side. Otherwise a marker soaks through and ruins the next " +
              "drawing.",
            "A sheet of 8.5 by 11 inches or A4. A smaller format cramps the arm.",
            "Our book is built on those six points: 111 drawings, one per page, thick " +
              "outline, printed on one side, 8.5 by 11 inches. Under each drawing there is a " +
              "word printed in large letters that a child colors just like the drawing. At " +
              "the front of the book there is a page where a child writes their name.",
          ],
        },
      ],
    },
    {
      id: "buying",
      title: "Before buying",
      items: [
        {
          q: "How is your book different from the dozens of similar books on Amazon?",
          a: [
            "In three ways you can check without taking our word for it.",
            "All 111 drawings are hand drawn by illustrators, not assembled from existing " +
              "stock sets.",
            "Customer ratings: five out of five from nineteen ratings on the English " +
              "edition, four point nine from twenty-six on the Spanish edition.",
            "Readers' Favorite, an independent review site, gave the book five stars. The " +
              "review is open, signed with the reviewer's name, and published on their site " +
              "rather than ours.",
            "There is a fourth thing that is rarely said out loud: we state plainly who the " +
              "book is wrong for. If a child already holds a pencil with their fingers and " +
              "colors small details without straying, they need a different book, and we say " +
              "so.",
          ],
        },
        {
          q: "Why 111 drawings and not 100?",
          a: [
            "Round numbers look good on a cover. We kept the drawings that passed the " +
              "check: simple shape, drawing that fills the sheet, animal with a friendly " +
              "face. That came to 111. We did not drop eleven of them to make the number " +
              "tidy.",
          ],
        },
        {
          q: "Are the drawings made by a person or generated with AI?",
          a: [
            "By people. All 111 are hand drawn by professional illustrators, and that is " +
              "recorded in the publisher's data.",
          ],
        },
        {
          q: "Is there a next book when a child outgrows this one?",
          a: [
            "Yes. Once a child starts staying inside the outline with confidence, " +
              "step-by-step drawing books suit them: there the child draws rather than fills " +
              "in something already made. The publisher issues those, and they are at " +
              "magicofdiscoveries.com. The sign that the moment has come: the child finishes " +
              "a page without straying and asks for something harder.",
          ],
        },
        {
          q: "I have two children of different ages. Which book should I choose?",
          a: [
            "If the younger one is between one and three and the older is four or five, one " +
              "book covers both, though differently. The younger colors the whole drawing; " +
              "the older colors the word, invents a background, or uses several colors. If " +
              "the older child is six or more, they need their own book: this one will feel " +
              "too easy.",
          ],
        },
        {
          q: "Is it worth buying the book early, before the first birthday?",
          a: [
            "There is no need. The book starts to matter when a child leaves marks on paper " +
              "on purpose, not when they only bang the crayon about. That usually happens " +
              "between twelve and eighteen months. Bought earlier, the book will most likely " +
              "sit and wait a while.",
          ],
        },
        {
          q: "For a first try, is it better to buy the book or print a few pages?",
          a: [
            "Start with the pages. This site has ten pages from the book that can be " +
              "downloaded and printed free, with no email and no sign up. Print one, hand " +
              "your child a crayon, and within a few minutes you will know whether this kind " +
              "of page suits them. If it does, the book gives you another hundred and one of " +
              "the same kind.",
          ],
        },
        {
          q: "Can I see inside the book before buying?",
          a: [
            "Yes, in three ways. The site has a video where the whole book is flipped " +
              "through with no editing: cover, back cover, and page after page in order. " +
              "Twenty pages are also published as they look in the book, along with the list " +
              "of all 111 drawings by theme. And ten pages can be downloaded and printed.",
          ],
        },
      ],
    },
    {
      id: "child",
      title: "About the child",
      items: [
        {
          q: "My child is left-handed. Does the book work?",
          a: [
            "Yes. Each drawing sits in the center of the page rather than against the " +
              "spine, and printing is on one side. Nothing gets in the way of the left hand " +
              "and the spine does not press on the wrist. No separate edition for left-handed " +
              "children is needed.",
          ],
        },
        {
          q: "My child tears the pages. What should I do?",
          a: [
            "Tearing paper at this age is normal: the child is working out what paper does. " +
              "The simplest fix is to cut the page out in advance and hand it over loose. " +
              "Then what gets torn is one drawing, not the whole book. One-sided printing " +
              "means any page can be cut out without losing the drawing on the back.",
          ],
        },
        {
          q: "My child puts the crayon in their mouth. When does that stop?",
          a: [
            "Usually closer to two, when the mouth stops being the main way of getting to " +
              "know an object. Until then, use non-toxic crayons suited to the child's age " +
              "according to the maker's guidance, and stay beside them rather than in the " +
              "next room.",
          ],
        },
        {
          q: "My child refuses to color. Should I insist?",
          a: [
            "Do not insist. A refusal usually means the task is not within reach yet or the " +
              "moment is wrong. Put the book away and offer it again a few days later. It " +
              "helps to start yourself: sit down and color your own page in silence, without " +
              "inviting the child. Children join an activity far more readily than they " +
              "answer a request.",
          ],
        },
        {
          q: "My child colors everything one color. Should I offer others?",
          a: [
            "You can offer, but do not push. Choosing a single color at this age does not " +
              "show a lack of imagination, it shows the child is busy with something else: " +
              "learning to move their hand. In time they will most likely start reaching for " +
              "more colors, usually closer to three.",
          ],
        },
        {
          q: "My child colors the word instead of the picture. Is that wrong?",
          a: [
            "No, the word is printed in large letters for exactly that: the child colors " +
              "them just like the drawing. Tracing and filling them in is a first meeting " +
              "with the shape of letters. The order does not matter: word first, drawing " +
              "after, or only the word.",
          ],
        },
        {
          q: "Should I say the colors out loud while we color?",
          a: [
            "Say them, but do not test. The difference matters. Mentioning calmly which " +
              "color you are using is fine. Asking which color it is and waiting for the " +
              "right answer is not: the activity turns into an exam and the child leaves. The " +
              "same goes for the names of the animals.",
          ],
        },
        {
          q: "Should I show a finished example of how it ought to look?",
          a: [
            "No. A finished example sets a bar the child cannot reach, and that is the " +
              "quickest way to put them off. Coloring at this age is not about matching a " +
              "model, it is about moving the hand and seeing the mark it leaves.",
          ],
        },
        {
          q: "My child asks the adult to do the coloring. What now?",
          a: [
            "Do color, but beside them and on your own page. The request usually means the " +
              "child wants your company, not a finished result. If they insist you color " +
              "theirs, fill in a small patch and hand the crayon back.",
          ],
        },
        {
          q: "My child colors at daycare but not at home. Why?",
          a: [
            "Often it comes down to the setting. At daycare it is a shared activity: " +
              "everyone is at the table doing the same thing. At home the child is alone at " +
              "the table and the adult is busy elsewhere. Try sitting down beside them with a " +
              "page of your own.",
          ],
        },
      ],
    },
    {
      id: "howto",
      title: "How to go about it",
      items: [
        {
          q: "What time of day is best for coloring?",
          a: [
            "When the child has slept and is not hungry. Usually that means the morning. In " +
              "the evening, tired after daycare, a child drops the page within a minute, and " +
              "that is about tiredness rather than the book.",
          ],
        },
        {
          q: "Table or floor: where should the child sit?",
          a: [
            "At a table, if their feet reach something to rest on. With feet dangling the " +
              "body is busy keeping balance and less attention is left for the hand. The " +
              "floor works too if the child lies on their stomach propped on their elbows. " +
              "What does not work is coloring on an adult's lap: the hand has nothing to rest " +
              "on.",
          ],
        },
        {
          q: "What should I do with finished pages?",
          a: [
            "Many people cut them out, write the date on them and keep them in a folder. " +
              "Six months later you can see how the stroke has changed, and it is more " +
              "interesting than it sounds. One-sided printing means a page can be cut out " +
              "without losing the drawing on the back.",
          ],
        },
        {
          q: "How do I keep the book from falling apart?",
          a: [
            "The book is glued, and pulling pages out sharply spreads the block. Cutting is " +
              "better: hold a ruler against the spine and run a craft knife along it. If the " +
              "book travels, cut a few sheets out in advance and take those.",
          ],
        },
        {
          q: "Can we color on the road, in a car or on a plane?",
          a: [
            "Yes, and it is one of the reasons the book gets bought. Crayons are better in " +
              "a car: with any movement of the car a marker can slip and mark the seat. Take " +
              "a few cut-out sheets and a stiff folder underneath instead of a table.",
          ],
        },
        {
          q: "How many pages a day is normal?",
          a: [
            "As many as the child wants. Some do half a page at a time, others five in a " +
              "row. One page a week is normal too. There are no right numbers here, and " +
              "comparing with other children serves no purpose.",
          ],
        },
      ],
    },
    {
      id: "file",
      title: "The printable file",
      items: [
        {
          q: "How does the printable file differ from the paperback?",
          a: [
            "The drawings are the same, all 111. The difference is that you print the file " +
              "yourself, at home or at a print shop, and you can print it as many times as " +
              "you like. The paperback is printed and shipped by Amazon. The Russian edition " +
              "exists only as a file: Amazon does not print books in Russian.",
          ],
        },
        {
          q: "Can I take the file to a print shop or a copy shop?",
          a: [
            "Yes. The file is bought once and printed as many times as your family needs. A " +
              "print shop will run it on heavier paper than a home printer, and the result " +
              "holds up better.",
          ],
        },
        {
          q: "Do I need a color printer?",
          a: [
            "No. All the drawings are black outlines on white. An ordinary black and white " +
              "printer is entirely enough.",
          ],
        },
        {
          q: "Can I print the same drawing many times?",
          a: [
            "Yes, and that is the main advantage of the file. A favorite animal can be " +
              "printed twenty times over. And if a page gets spoiled, you simply print it " +
              "again.",
          ],
        },
        {
          q: "When do I get the file after paying?",
          a: [
            "The link arrives by email right after payment. If it does not appear, check " +
              "the spam folder: messages with links and attachments often land there.",
          ],
        },
      ],
    },
    {
      id: "language",
      title: "Language",
      items: [
        {
          q: "We are a bilingual family. Which edition should we buy?",
          a: [
            "The one you speak at home with your child. The drawings in the English and " +
              "Spanish editions are the same; only the word underneath changes. If both " +
              "languages matter in your family, some families buy both editions: the drawing " +
              "is familiar, the word is different, and the child notices the difference on " +
              "their own.",
          ],
        },
        {
          q: "Do the words under the drawings help with learning letters?",
          a: [
            "The word under each drawing is printed in large letters that a child colors " +
              "just like the drawing, tracing their shape by hand. We are not claiming this " +
              "will make a child read: it is simply a first look at what letters are shaped " +
              "like.",
          ],
        },
        {
          q: "Will there be editions in other languages?",
          a: [
            "At the moment the book comes out in English and Spanish in print, and in " +
              "Russian as a printable file. It is too early to say anything about other " +
              "languages.",
          ],
        },
      ],
    },
    {
      id: "gift",
      title: "Gifts and delivery",
      items: [
        {
          q: "Can the book be sent straight to the person receiving it?",
          a: [
            "Yes. When you place the order on Amazon you enter the recipient's address " +
              "instead of your own, and gift wrapping and a short note are offered right " +
              "there.",
          ],
        },
        {
          q: "What should I write on a gift if I barely know the child?",
          a: [
            "The book is made for the whole span from one to three rather than for one " +
              "particular age. A note only needs to say that it is a first coloring book, " +
              "with large drawings and a thick outline, and that it can be started right " +
              "away.",
          ],
        },
      ],
    },
    {
      id: "groups",
      title: "Buying for daycare, preschool and programs",
      items: [
        {
          q: "How do I order in an organization's name rather than my own?",
          a: [
            "Through an Amazon Business account. It is a free type of account for " +
              "organizations. It provides invoices for bookkeeping, payment under the " +
              "organization's details, and several people on one order. You open it on the " +
              "Amazon Business site.",
          ],
        },
        {
          q: "Can I get a payment document for bookkeeping?",
          a: [
            "Yes. An Amazon Business account issues an invoice for every order. If the " +
              "organization is exempt from sales tax, Amazon runs a separate tax exemption " +
              "program: the certificate is uploaded once, and after that the tax is not " +
              "applied to qualifying purchases. The conditions and the list of documents are " +
              "on that program's page.",
          ],
        },
        {
          q: "Is there a discount from ten copies up?",
          a: [
            "Discounts on the book are not ours to give. The price of the paperback is set " +
              "by Amazon, which also prints it, and there is no markup for quantity there: " +
              "ten books cost what ten books cost. Amazon Business sometimes has its own " +
              "volume offers, and those show up in the order itself.",
          ],
        },
        {
          q: "How long does delivery take for an order of fourteen books?",
          a: [
            "The book is printed when it is ordered rather than kept in stock, so printing " +
              "comes first and shipping after. The exact timing is shown by Amazon at " +
              "checkout, and that is the figure to go by: it depends on the country, the " +
              "quantity and the shipping method chosen.",
          ],
        },
        {
          q: "Can English and Spanish copies be ordered together?",
          a: [
            "Yes. They are two different books, each with its own number, and both editions " +
              "can go into the same cart. How Amazon splits the shipments is up to Amazon: " +
              "they may arrive together or separately.",
          ],
        },
        {
          q: "The children in my group speak two languages. How do I hand out the books?",
          a: [
            "The drawings are the same in both editions and only the word underneath " +
              "changes. So the books can be handed out by each family's language while the " +
              "activity stays shared: every child has the same pictures in front of them. " +
              "Some groups buy several copies of each edition and rotate them.",
          ],
        },
        {
          q: "Why do groups buy the Spanish edition more often than the English one?",
          a: [
            "In our orders the Spanish edition does often go in large quantities. Why " +
              "exactly, we do not know: sales data does not say who is buying or what for, " +
              "and any explanation would be a guess on our part. What is certain is that the " +
              "Spanish edition exists as a book of its own, with the same 111 drawings, and " +
              "can be ordered in the same quantities as the English one.",
          ],
        },
        {
          q: "Does the book suit early intervention programs and Head Start?",
          a: [
            "The book is made for the one to three age range and for the first stage of " +
              "drawing, when a child is only learning to leave marks on paper. To that span " +
              "it does correspond. We are not going to claim it meets the requirements of any " +
              "particular program: those differ from program to program, and the person " +
              "running it should decide. The site has separate pages for people buying the " +
              "book for work.",
          ],
        },
        {
          q: "Do you have materials for teachers besides this book?",
          a: [
            "Yes. Magic of Discoveries publishes step-by-step drawing books for older " +
              "children and worksheets for the classroom. The book catalogue is at " +
              "magicofdiscoveries.com, and the worksheets are in the publisher's store on " +
              "Teachers Pay Teachers.",
          ],
        },
      ],
    },
    {
      id: "where",
      title: "Where to buy",
      items: [
        {
          q: "Which countries can the book be bought in?",
          a: [
            "The paperback is sold on Amazon in nine countries: the United States, Canada, " +
              "the United Kingdom, Germany, France, Spain, Italy, Japan and Australia. The " +
              "printable file is bought in our shop and is available from anywhere.",
          ],
        },
        {
          q: "Does the book come from the United States, and how long is the wait?",
          a: [
            "It does not have to come from there. Amazon prints its books on demand across " +
              "a network of printing sites in several countries and works with the one " +
              "nearest the buyer, so an order placed on a European Amazon is filled from " +
              "Europe and arrives as an ordinary delivery rather than an international " +
              "parcel. The price is shown in local currency. The exact timing is shown by " +
              "Amazon at checkout.",
          ],
        },
        {
          q: "Why does the book turn up in shops other than Amazon?",
          a: [
            "The book is published through Amazon's publishing service, and that same " +
              "service passes it on through its distributors. That is how it reaches other " +
              "shops and library catalogues. The official page for the book, however, is a " +
              "single one, on Amazon, and that is where the buy buttons on this site lead.",
          ],
        },
      ],
    },
    {
      id: "about",
      title: "Who we are",
      items: [
        {
          q: "Who is behind this site, and why should this information be trusted?",
          a: [
            "The site is run by Magic of Discoveries LLC, a children's book publisher in " +
              "Miami, Florida. The book discussed here is ours: the English edition carries " +
              "the number 978-1-963328-27-1 and the Spanish edition 978-1-963328-20-2. Both " +
              "are listed in Wikidata, the international knowledge base, as editions in their " +
              "own right.",
            "Everything we state about a child's age rests on public sources: the CDC, the " +
              "American Academy of Pediatrics, and the National Library of Medicine's " +
              "reference work. The links sit on the pages where those statements are made, " +
              "and anyone can open them and check.",
          ],
        },
        {
          q: "The site is free. What is in it for you?",
          a: [
            "We are a publisher and we sell a book. The reference part of the site, the " +
              "picker, and the ten free printable pages exist so that a parent can work " +
              "things out and try before buying rather than after. There is no charge for " +
              "using the site, we do not ask for an email address, and there are no ads.",
          ],
        },
      ],
    },
  ],
  es: [
    {
      id: "choose",
      title: "Elegir el primer libro para colorear",
      items: [
        {
          q: "¿Qué libro para colorear elegir para un niño de 1 a 3 años?",
          a: [
            "Un buen primer libro para colorear se distingue de uno cualquiera por seis " +
              "rasgos, y los seis se ven en las fotos de las páginas antes de comprarlo.",
            "El contorno es grueso. Una línea fina desaparece bajo un trazo ancho y el niño " +
              "no ve el resultado de su trabajo.",
            "Un dibujo por página. Varios objetos en la misma hoja dispersan la atención, y " +
              "a esta edad la atención dura pocos minutos.",
            "El dibujo es grande y ocupa la hoja entera. La mano se mueve desde el hombro, " +
              "así que lo pequeño todavía queda fuera de su alcance.",
            "Dentro del dibujo no hay zonas diminutas. Hay que colorear una forma simple, " +
              "no diez pétalos.",
            "Impresión por una sola cara. De lo contrario el rotulador traspasa y estropea " +
              "el dibujo siguiente.",
            "Hoja de 21,6 x 27,9 cm o A4. Un formato menor limita el movimiento del brazo.",
            "Nuestro libro está hecho siguiendo esos seis rasgos: 111 dibujos, uno por " +
              "página, contorno grueso, impresión por una sola cara y hoja de 21,6 x 27,9 cm. " +
              "Debajo de cada dibujo hay una palabra impresa en letras grandes que el niño " +
              "colorea igual que el dibujo. Al principio del libro hay una página donde el " +
              "niño escribe su nombre.",
          ],
        },
      ],
    },
    {
      id: "buying",
      title: "Antes de comprar",
      items: [
        {
          q: "¿En qué se diferencia su libro de las decenas de libros parecidos que hay en " +
              "Amazon?",
          a: [
            "En tres cosas que se pueden comprobar sin tener que creernos.",
            "Los 111 dibujos están hechos a mano por ilustradores, no montados a partir de " +
              "colecciones ya existentes.",
            "La valoración de los compradores: cinco sobre cinco con diecinueve " +
              "valoraciones en la edición en inglés y cuatro coma nueve con veintiséis en la " +
              "edición en español.",
            "Readers' Favorite, una web de reseñas independiente, le dio cinco estrellas. " +
              "La reseña está abierta, firmada con el nombre de la reseñadora y publicada en " +
              "su web, no en la nuestra.",
            "Y hay una cuarta cosa de la que no se suele hablar: decimos abiertamente a " +
              "quién no le conviene el libro. Si el niño ya sujeta el lápiz con los dedos y " +
              "colorea detalles pequeños sin salirse, necesita otro libro, y así lo decimos.",
          ],
        },
        {
          q: "¿Por qué 111 dibujos y no 100?",
          a: [
            "Las cifras redondas quedan bien en una portada. Nosotros conservamos los " +
              "dibujos que pasaron la revisión: forma simple, dibujo que llena la hoja y " +
              "animal con cara amable. Salieron 111. No quitamos once solo para que la cifra " +
              "quedara bonita.",
          ],
        },
        {
          q: "¿Los dibujos están hechos por una persona o generados con IA?",
          a: [
            "Por personas. Los 111 están dibujados a mano por ilustradores profesionales, y " +
              "así consta en los datos de la editorial.",
          ],
        },
        {
          q: "¿Hay continuación cuando el niño supere este libro?",
          a: [
            "Sí. Cuando el niño empieza a mantenerse dentro del contorno con seguridad, le " +
              "vienen bien los libros de dibujo paso a paso, donde dibuja él en lugar de " +
              "colorear algo ya hecho. La editorial los publica y están en " +
              "magicofdiscoveries.com. La señal de que ha llegado el momento: el niño termina " +
              "la página sin salirse y pide algo más difícil.",
          ],
        },
        {
          q: "Tengo dos hijos de edades distintas. ¿Qué libro elegir?",
          a: [
            "Si el pequeño tiene entre uno y tres años y el mayor cuatro o cinco, un solo " +
              "libro sirve para los dos, pero de forma distinta. El pequeño colorea el dibujo " +
              "entero; el mayor colorea la palabra, inventa un fondo o usa varios colores. Si " +
              "el mayor tiene seis años o más, necesita su propio libro: este le parecerá " +
              "demasiado fácil.",
          ],
        },
        {
          q: "¿Merece la pena comprar el libro antes del año?",
          a: [
            "No hace falta. El libro empieza a tener sentido cuando el niño deja marcas en " +
              "el papel a propósito, no cuando solo golpea con el crayón. Eso suele ocurrir " +
              "entre los doce y los dieciocho meses. Si se compra antes, es probable que " +
              "tenga que esperar un tiempo para usarlo.",
          ],
        },
        {
          q: "Para empezar, ¿es mejor el libro o unas cuantas hojas impresas?",
          a: [
            "Empiece por las hojas. En esta web hay diez páginas del libro que se descargan " +
              "e imprimen gratis, sin correo electrónico y sin registro. Imprima una, dele un " +
              "crayón al niño y en unos minutos verá si este tipo de página le conviene o no. " +
              "Si le conviene, el libro le da otras ciento una del mismo tipo.",
          ],
        },
        {
          q: "¿Se puede ver el libro por dentro antes de comprarlo?",
          a: [
            "Sí, de tres maneras. En la web hay un vídeo donde se pasa el libro entero sin " +
              "cortes: portada, contraportada y todas las páginas en orden. También están " +
              "publicadas veinte páginas tal como se ven en el libro y la lista de los 111 " +
              "dibujos por temas. Y diez páginas se pueden descargar e imprimir.",
          ],
        },
      ],
    },
    {
      id: "child",
      title: "Sobre el niño",
      items: [
        {
          q: "Mi hijo es zurdo. ¿Le sirve el libro?",
          a: [
            "Sí. Cada dibujo está centrado en la página, no pegado al lomo, y la impresión " +
              "es por una sola cara. Nada estorba a la mano izquierda y el lomo no presiona " +
              "la muñeca. No hace falta una edición aparte para niños zurdos.",
          ],
        },
        {
          q: "El niño rompe las páginas. ¿Qué hago?",
          a: [
            "A esta edad romper papel es normal: el niño está averiguando qué hace ese " +
              "material. Lo más práctico es recortar la página de antemano y dársela suelta. " +
              "Así lo que se rompe es un dibujo y no el libro entero. La impresión por una " +
              "sola cara permite recortar cualquier página sin perder el dibujo del reverso.",
          ],
        },
        {
          q: "El niño se lleva el crayón a la boca. ¿Cuándo deja de hacerlo?",
          a: [
            "Suele pasar hacia los dos años, cuando la boca deja de ser su principal forma " +
              "de conocer los objetos. Hasta entonces, use crayones no tóxicos y adecuados a " +
              "la edad del niño según la indicación del fabricante, y quédese al lado, no en " +
              "la habitación contigua.",
          ],
        },
        {
          q: "El niño se niega a colorear. ¿Insisto o no?",
          a: [
            "No insista. La negativa suele significar que la tarea todavía no está a su " +
              "alcance o que el momento no es bueno. Guarde el libro y propóngalo unos días " +
              "después. Ayuda empezar usted: siéntese y coloree su propia página en silencio, " +
              "sin invitar al niño. Los niños se suman a una actividad más a menudo de lo que " +
              "responden a una petición.",
          ],
        },
        {
          q: "El niño lo colorea todo de un solo color. ¿Le ofrezco otros?",
          a: [
            "Puede ofrecérselos, pero sin insistir. Elegir un solo color a esta edad no " +
              "indica falta de imaginación, indica que el niño está ocupado en otra cosa: " +
              "está aprendiendo a mover la mano. Con el tiempo, probablemente empezará a " +
              "elegir más colores, normalmente hacia los tres años.",
          ],
        },
        {
          q: "El niño colorea la palabra y no el dibujo. ¿Está mal?",
          a: [
            "No, la palabra está impresa en letras grandes justamente para eso: el niño las " +
              "colorea igual que el dibujo. Al repasarlas y rellenarlas conoce por primera " +
              "vez su forma. El orden da igual: primero la palabra y luego el dibujo, o solo " +
              "la palabra.",
          ],
        },
        {
          q: "¿Conviene decir los colores en voz alta mientras coloreamos?",
          a: [
            "Dígalos, pero sin examinar. La diferencia es grande. Comentar con tranquilidad " +
              "de qué color está coloreando usted viene bien. Preguntarle qué color es y " +
              "esperar la respuesta correcta, no: la actividad se convierte en un examen y el " +
              "niño se marcha. Lo mismo pasa con los nombres de los animales.",
          ],
        },
        {
          q: "¿Hay que enseñarle un modelo de cómo debe quedar?",
          a: [
            "No. Un modelo terminado marca un listón que el niño no puede alcanzar, y es la " +
              "forma más rápida de quitarle las ganas. A esta edad colorear no consiste en " +
              "parecerse a un modelo, sino en llevar la mano y ver la marca que deja.",
          ],
        },
        {
          q: "El niño pide que coloree el adulto. ¿Qué hago?",
          a: [
            "Coloree, pero al lado y en su propia página. La petición suele significar que " +
              "el niño quiere su compañía, no un resultado terminado. Si insiste en que " +
              "coloree la suya, rellene un trozo pequeño y devuélvale el crayón.",
          ],
        },
        {
          q: "En la guardería colorea y en casa no. ¿Por qué?",
          a: [
            "Muchas veces es cuestión del ambiente. En la guardería es una actividad común: " +
              "todos están en la mesa haciendo lo mismo. En casa el niño está solo en la mesa " +
              "y el adulto está en otra cosa. Pruebe a sentarse al lado y ponerse con su " +
              "propia página.",
          ],
        },
      ],
    },
    {
      id: "howto",
      title: "Cómo hacerlo",
      items: [
        {
          q: "¿A qué hora del día es mejor colorear?",
          a: [
            "Cuando el niño ha dormido y no tiene hambre. Suele ser por la mañana. Por la " +
              "tarde, cansado tras la guardería, deja la página al minuto, y eso no tiene que " +
              "ver con el libro sino con el cansancio.",
          ],
        },
        {
          q: "¿Dónde sentar al niño: en la mesa o en el suelo?",
          a: [
            "En la mesa, si los pies le llegan a algún apoyo. Con los pies colgando el " +
              "cuerpo se ocupa de mantener el equilibrio y a la mano le queda menos atención. " +
              "El suelo también vale si el niño se tumba boca abajo y se apoya en los codos. " +
              "Lo que no funciona es colorear en el regazo de un adulto: la mano se queda sin " +
              "apoyo.",
          ],
        },
        {
          q: "¿Qué hacer con las páginas terminadas?",
          a: [
            "Mucha gente las recorta, les pone la fecha y las guarda en una carpeta. Al " +
              "cabo de medio año se ve cómo ha cambiado el trazo, y resulta más interesante " +
              "de lo que parece. La impresión por una sola cara permite recortar la página " +
              "sin perder el dibujo del reverso.",
          ],
        },
        {
          q: "¿Cómo guardar el libro para que no se deshaga?",
          a: [
            "El libro va encolado, y si se arrancan las páginas de un tirón el bloque se " +
              "abre. Es mejor cortarlas: apoye una regla junto al lomo y pase un cúter. Si el " +
              "libro sale de viaje, recorte unas cuantas hojas antes y llévese solo esas.",
          ],
        },
        {
          q: "¿Se puede colorear de viaje, en el coche o en el avión?",
          a: [
            "Sí, y es uno de los motivos por los que se compra el libro. En el coche van " +
              "mejor los crayones: con cualquier movimiento del coche el rotulador puede " +
              "desviarse y manchar el asiento. Lleve unas hojas recortadas y una carpeta " +
              "rígida debajo en lugar de mesa.",
          ],
        },
        {
          q: "¿Cuántas páginas al día son normales?",
          a: [
            "Las que quiera el niño. Unos hacen media página de una vez y otros cinco " +
              "seguidas. Una página a la semana también es normal. Aquí no hay cifras " +
              "correctas y no tiene sentido comparar con otros niños.",
          ],
        },
      ],
    },
    {
      id: "file",
      title: "El archivo para imprimir",
      items: [
        {
          q: "¿En qué se diferencia el archivo para imprimir del libro en papel?",
          a: [
            "Los dibujos son los mismos, los 111. La diferencia es que el archivo lo " +
              "imprime usted, en casa o en una imprenta, y puede imprimirlo tantas veces como " +
              "quiera. El libro en papel lo imprime y lo envía Amazon. La edición en ruso " +
              "existe solo como archivo: Amazon no imprime libros en ruso.",
          ],
        },
        {
          q: "¿Se puede llevar el archivo a una imprenta o a una copistería?",
          a: [
            "Sí. El archivo se compra una vez y se imprime tantas veces como necesite su " +
              "familia. Una imprenta lo imprimirá en papel más grueso que el de casa y el " +
              "cuaderno saldrá más resistente.",
          ],
        },
        {
          q: "¿Hace falta una impresora en color?",
          a: [
            "No. Todos los dibujos son de contorno, en blanco y negro. Una impresora " +
              "corriente en blanco y negro sirve perfectamente.",
          ],
        },
        {
          q: "¿Se puede imprimir el mismo dibujo muchas veces?",
          a: [
            "Sí, y es la principal ventaja del archivo. El animal favorito se puede " +
              "imprimir veinte veces. Y si una página se estropea, basta con imprimirla de " +
              "nuevo.",
          ],
        },
        {
          q: "¿Cuándo recibo el archivo después de pagar?",
          a: [
            "El enlace llega al correo justo después del pago. Si no aparece, revise la " +
              "carpeta de correo no deseado: los mensajes con enlaces y adjuntos acaban allí " +
              "a menudo.",
          ],
        },
      ],
    },
    {
      id: "language",
      title: "Idioma",
      items: [
        {
          q: "Somos una familia bilingüe. ¿Qué edición comprar?",
          a: [
            "La del idioma en que hablan con el niño en casa. Los dibujos de la edición en " +
              "inglés y la edición en español son los mismos; solo cambia la palabra de " +
              "debajo. Si en casa hay dos idiomas y los dos importan, hay familias que " +
              "compran las dos ediciones: el dibujo es conocido, la palabra es distinta y el " +
              "niño nota la diferencia por su cuenta.",
          ],
        },
        {
          q: "¿Las palabras debajo de los dibujos ayudan a aprender las letras?",
          a: [
            "La palabra debajo de cada dibujo está impresa en letras grandes que el niño " +
              "colorea igual que el dibujo, repasando su forma con la mano. No afirmamos que " +
              "después vaya a leer: es simplemente un primer contacto con el aspecto de las " +
              "letras.",
          ],
        },
        {
          q: "¿Habrá ediciones en otros idiomas?",
          a: [
            "Ahora mismo el libro se publica en inglés y español en papel, y en ruso como " +
              "archivo para imprimir. Sobre otros idiomas es pronto para decir nada.",
          ],
        },
      ],
    },
    {
      id: "gift",
      title: "Regalo y envío",
      items: [
        {
          q: "¿Se puede enviar el libro directamente a quien lo recibe?",
          a: [
            "Sí. Al hacer el pedido en Amazon se indica la dirección del destinatario en " +
              "lugar de la suya, y ahí mismo están la opción de envoltorio de regalo y el " +
              "espacio para una nota corta.",
          ],
        },
        {
          q: "¿Qué escribir en el regalo si apenas conozco al niño?",
          a: [
            "El libro está pensado para todo el tramo de uno a tres años y no para una edad " +
              "concreta. En la nota basta con decir que es un primer libro para colorear, con " +
              "dibujos grandes y contorno grueso, y que se puede empezar enseguida.",
          ],
        },
      ],
    },
    {
      id: "groups",
      title: "Compras para guarderías, colegios y programas",
      items: [
        {
          q: "¿Cómo hacer la compra a nombre de una organización y no a título personal?",
          a: [
            "Con una cuenta de Amazon Business. Es un tipo de cuenta gratuita para " +
              "organizaciones. Permite obtener facturas para la contabilidad, pagar con los " +
              "datos de la entidad y tener varias personas en un mismo pedido. Se abre en la " +
              "web de Amazon Business.",
          ],
        },
        {
          q: "¿Se puede obtener un justificante de pago para la contabilidad?",
          a: [
            "Sí. La cuenta de Amazon Business emite factura de cada pedido. Si la " +
              "organización está exenta del impuesto sobre ventas, Amazon tiene un programa " +
              "aparte de exención fiscal: el certificado se sube una vez y a partir de ahí el " +
              "impuesto no se aplica a las compras que reúnan los requisitos. Las condiciones " +
              "y los documentos figuran en la página de ese programa.",
          ],
        },
        {
          q: "¿Hay descuento a partir de diez ejemplares?",
          a: [
            "Los descuentos sobre el libro no dependen de nosotros. El precio del libro en " +
              "papel lo fija Amazon, que además lo imprime, y allí no hay recargo por " +
              "cantidad: diez libros cuestan lo que cuestan diez libros. Amazon Business " +
              "tiene a veces sus propias ofertas por volumen, y se ven en el propio pedido.",
          ],
        },
        {
          q: "¿Cuánto tarda el envío de un pedido de catorce libros?",
          a: [
            "El libro se imprime cuando se pide, no está almacenado, así que primero se " +
              "imprime y después empieza el envío. El plazo lo indica Amazon al tramitar el " +
              "pedido, y es el dato al que conviene atenerse: depende del país, de la " +
              "cantidad y del tipo de envío elegido.",
          ],
        },
        {
          q: "¿Se pueden pedir juntos ejemplares en inglés y en español?",
          a: [
            "Sí. Son dos libros distintos, con su propio número cada uno, y las dos " +
              "ediciones se pueden añadir al mismo carrito. Amazon decide después cómo agrupa " +
              "los envíos, así que pueden llegar juntos o por separado.",
          ],
        },
        {
          q: "En el grupo hay niños que hablan dos idiomas. ¿Cómo reparto los libros?",
          a: [
            "Los dibujos son los mismos en las dos ediciones y solo cambia la palabra de " +
              "debajo. Por eso los libros se pueden repartir según el idioma de cada familia " +
              "y hacer la actividad en común: todos los niños tienen delante las mismas " +
              "imágenes. Hay grupos que compran varios ejemplares de cada edición y los van " +
              "intercambiando.",
          ],
        },
        {
          q: "¿Por qué los grupos compran más la edición en español que la inglesa?",
          a: [
            "En nuestros pedidos la edición en español sale con frecuencia en cantidades " +
              "grandes. Por qué ocurre exactamente no lo sabemos: los datos de venta no dicen " +
              "quién compra ni para qué, y cualquier explicación sería una suposición " +
              "nuestra. Lo que sí consta es que la edición en español existe como libro " +
              "propio, con los mismos 111 dibujos, y que se puede pedir en la misma cantidad " +
              "que la inglesa.",
          ],
        },
        {
          q: "¿Sirve el libro para programas de atención temprana y Head Start?",
          a: [
            "El libro está pensado para la franja de uno a tres años y para la primera " +
              "etapa del dibujo, cuando el niño apenas aprende a dejar marcas en el papel. A " +
              "ese tramo sí corresponde. No vamos a afirmar que cumpla los requisitos de un " +
              "programa concreto: cada programa tiene los suyos y esa decisión corresponde a " +
              "quien lo dirige. En la web hay páginas específicas para quienes compran el " +
              "libro para su trabajo.",
          ],
        },
        {
          q: "¿Tienen material para docentes además de este libro?",
          a: [
            "Sí. La editorial Magic of Discoveries publica libros de dibujo paso a paso " +
              "para niños algo mayores y fichas de trabajo para el aula. El catálogo de " +
              "libros está en magicofdiscoveries.com y las fichas en la tienda de la " +
              "editorial en Teachers Pay Teachers.",
          ],
        },
      ],
    },
    {
      id: "where",
      title: "Dónde comprarlo",
      items: [
        {
          q: "¿En qué países se puede comprar el libro?",
          a: [
            "El libro en papel se vende en Amazon en nueve países: Estados Unidos, Canadá, " +
              "Reino Unido, Alemania, Francia, España, Italia, Japón y Australia. El archivo " +
              "para imprimir se compra en nuestra tienda y está disponible desde cualquier " +
              "lugar.",
          ],
        },
        {
          q: "¿El libro llega desde Estados Unidos? ¿Cuánto hay que esperar?",
          a: [
            "No hace falta que llegue de allí. Amazon imprime sus libros bajo demanda en " +
              "una red de imprentas repartidas por varios países y trabaja con la más cercana " +
              "al comprador, de modo que un pedido hecho en Amazon.es se atiende desde Europa " +
              "y llega con un envío normal, no como un paquete internacional. El precio " +
              "aparece en moneda local. El plazo exacto lo indica Amazon al tramitar el " +
              "pedido.",
          ],
        },
        {
          q: "¿Por qué el libro aparece en tiendas que no son Amazon?",
          a: [
            "El libro está publicado a través del servicio editorial de Amazon, y es ese " +
              "mismo servicio el que lo distribuye después a través de sus distribuidores. " +
              "Por esa vía llega a otras tiendas y a catálogos de bibliotecas. La página " +
              "oficial del libro, en cambio, es una sola, la de Amazon, y es a ella a donde " +
              "llevan los botones de compra de esta web.",
          ],
        },
      ],
    },
    {
      id: "about",
      title: "Quiénes somos",
      items: [
        {
          q: "¿Quién está detrás de esta web y por qué se puede confiar en esta información?",
          a: [
            "La web la lleva Magic of Discoveries LLC, una editorial de libros infantiles " +
              "de Miami, Florida. El libro del que se habla aquí lo publicamos nosotros: la " +
              "edición en inglés tiene el número 978-1-963328-27-1 y la edición en español el " +
              "978-1-963328-20-2. Las dos figuran en Wikidata, la base de conocimiento " +
              "internacional, como ediciones independientes.",
            "Todo lo que afirmamos sobre la edad del niño se apoya en fuentes públicas: los " +
              "CDC, la Academia Americana de Pediatría y el manual de la Biblioteca Nacional " +
              "de Medicina de Estados Unidos. Los enlaces están en las páginas donde hacemos " +
              "esas afirmaciones y cualquiera puede abrirlos y comprobarlos.",
          ],
        },
        {
          q: "La web es gratuita. ¿Cuál es su interés?",
          a: [
            "Somos una editorial y vendemos un libro. La parte de consulta de la web, el " +
              "selector y las diez páginas gratuitas para imprimir existen para que un padre " +
              "o una madre pueda informarse y probar antes de comprar, y no después. No se " +
              "paga nada por acceder a la web, no pedimos el correo electrónico y no hay " +
              "publicidad.",
          ],
        },
      ],
    },
  ],
  ru: [
    {
      id: "choose",
      title: "Выбор первой раскраски",
      items: [
        {
          q: "Какую раскраску выбрать ребенку от года до трех?",
          a: [
            "Хорошая первая раскраска отличается от обычной шестью признаками, и все шесть " +
              "видно по фотографиям страниц прямо в магазине.",
            "Контур толстый. Тонкая линия исчезает под широким штрихом, и ребенок не видит " +
              "результата своей работы.",
            "Один рисунок на странице. Несколько предметов на листе рассеивают внимание, а " +
              "внимание в этом возрасте держится несколько минут.",
            "Рисунок крупный, во весь лист. Рука ведет от плеча, мелкое ей пока недоступно.",
            "Внутри рисунка нет мелких участков. Закрашивать надо одну простую форму, а не " +
              "десять лепестков.",
            "Печать с одной стороны. Иначе фломастер проступит на следующий рисунок.",
            "Лист 8,5 на 11 дюймов или А4. Меньший формат стесняет размах руки.",
            "Наша книга сделана по этим шести признакам: 111 рисунков, по одному на " +
              "странице, толстый контур, печать с одной стороны, лист 8,5 на 11 дюймов. Под " +
              "каждым рисунком стоит слово, напечатанное крупными буквами, которые ребенок " +
              "раскрашивает так же, как сам рисунок. В начале книги страница, где ребенок " +
              "пишет свое имя.",
          ],
        },
      ],
    },
    {
      id: "buying",
      title: "Перед покупкой",
      items: [
        {
          q: "Чем ваша книга отличается от десятков похожих книг на Amazon?",
          a: [
            "Тремя вещами, которые можно проверить, не веря нам на слово.",
            "Все 111 рисунков нарисованы вручную художниками, а не собраны из готовых " +
              "наборов.",
            "Оценка покупателей: пять из пяти по девятнадцати отзывам у английского " +
              "издания, четыре и девять по двадцати шести у испанского.",
            "Независимая площадка Readers' Favorite поставила книге пять звезд. Рецензия " +
              "открыта, подписана именем рецензента и лежит на их сайте, а не на нашем.",
            "Есть и четвертое, о чем обычно не говорят: мы прямо пишем, кому книга не " +
              "подойдет. Если ребенок уже уверенно держит карандаш пальцами и аккуратно " +
              "закрашивает мелкие детали, ему нужна другая книга, и мы так и говорим.",
          ],
        },
        {
          q: "Почему рисунков 111, а не 100?",
          a: [
            "Круглое число ставят ради обложки. Мы отобрали столько рисунков, сколько " +
              "прошли проверку: форма простая, рисунок заполняет лист, животное выглядит " +
              "дружелюбно. Получилось 111. Отбрасывать одиннадцать ради красивой цифры мы не " +
              "стали.",
          ],
        },
        {
          q: "Рисунки нарисованы человеком или созданы с помощью ИИ?",
          a: [
            "Человеком. Все 111 нарисованы профессиональными иллюстраторами вручную, и так " +
              "записано в данных издательства.",
          ],
        },
        {
          q: "Есть ли продолжение, когда ребенок эту книгу перерастет?",
          a: [
            "Да. Когда ребенок начинает уверенно оставаться внутри контура, ему подходят " +
              "книги с пошаговым рисованием: там он рисует сам, а не закрашивает готовое. " +
              "Такие книги того же издательства есть на magicofdiscoveries.com. Признак, что " +
              "пора переходить: ребенок закрашивает страницу до конца, не выходя за линию, и " +
              "просит что-нибудь посложнее.",
          ],
        },
        {
          q: "Детей двое и они разного возраста. Какую книгу выбрать?",
          a: [
            "Если младшему от года до трех, а старшему четыре или пять, одной книги хватит " +
              "на обоих, но по-разному. Младший закрашивает рисунок целиком, старший " +
              "раскрашивает слово под рисунком, придумывает фон или раскрашивает в несколько " +
              "цветов. Если старшему шесть и больше, ему нужна отдельная книга: эта покажется " +
              "ему слишком простой.",
          ],
        },
        {
          q: "Стоит ли покупать книгу заранее, до года?",
          a: [
            "Смысла нет. Раскраска становится нужна, когда ребенок начинает специально " +
              "оставлять след на бумаге, а не просто стучать мелком. Обычно это происходит " +
              "между двенадцатью и восемнадцатью месяцами. Если купить раньше, книга, скорее " +
              "всего, какое-то время просто полежит.",
          ],
        },
        {
          q: "Что лучше для первого раза: книга или несколько распечатанных листов?",
          a: [
            "Начните с листов. У нас на сайте есть десять страниц из книги, их можно " +
              "скачать и распечатать бесплатно, без почты и регистрации. Распечатайте одну, " +
              "дайте ребенку мелок, и через несколько минут станет ясно, подходит ребенку " +
              "такая раскраска или нет. Если идет, книга даст еще сто одну страницу того же " +
              "вида.",
          ],
        },
        {
          q: "Можно ли посмотреть книгу внутри до покупки?",
          a: [
            "Да, тремя способами. На сайте есть ролик, где книгу листают целиком, без " +
              "монтажа: обложка, оборот и все страницы по порядку. Там же выложены двадцать " +
              "страниц в том виде, как они выглядят в книге, и список всех 111 рисунков по " +
              "темам. И десять страниц можно скачать и распечатать.",
          ],
        },
      ],
    },
    {
      id: "child",
      title: "О ребенке",
      items: [
        {
          q: "Ребенок левша. Подойдет ли книга?",
          a: [
            "Да. Каждый рисунок стоит в центре страницы, а не у корешка, и печать идет с " +
              "одной стороны. Левой руке ничего не мешает, корешок не давит на запястье. " +
              "Отдельного издания для левшей не требуется.",
          ],
        },
        {
          q: "Ребенок рвет страницы. Что делать?",
          a: [
            "В этом возрасте рвать бумагу нормально: ребенок изучает, что она умеет. Проще " +
              "всего заранее вырезать страницу из книги и дать лист отдельно. Так порванным " +
              "окажется один рисунок, а не вся книга. Печать с одной стороны позволяет " +
              "вырезать любую страницу, не теряя рисунок на обороте.",
          ],
        },
        {
          q: "Ребенок тянет мелок в рот. Когда это проходит?",
          a: [
            "Обычно ближе к двум годам, когда рот перестает быть главным способом " +
              "знакомиться с предметом. До этого берите нетоксичные мелки, подходящие ребенку " +
              "по возрасту согласно указанию производителя, и занимайтесь рядом, а не в " +
              "соседней комнате.",
          ],
        },
        {
          q: "Ребенок отказывается раскрашивать. Настаивать или нет?",
          a: [
            "Не настаивайте. Отказ обычно значит, что задача сейчас не по руке или момент " +
              "неудачный. Уберите книгу и предложите через несколько дней. Помогает начать " +
              "самому: сядьте и раскрашивайте свою страницу молча, не приглашая ребенка. Дети " +
              "чаще присоединяются к занятию, чем откликаются на просьбу.",
          ],
        },
        {
          q: "Ребенок раскрашивает все одним цветом. Предлагать ли другие?",
          a: [
            "Можно предложить, но не настаивать. Выбор одного цвета в этом возрасте не " +
              "говорит об отсутствии воображения, а говорит о том, что ребенок занят другим: " +
              "он учится вести руку. Со временем он, скорее всего, начнет брать больше " +
              "цветов, обычно ближе к трем годам.",
          ],
        },
        {
          q: "Ребенок раскрашивает слово, а не картинку. Это ошибка?",
          a: [
            "Нет, слово под рисунком для этого и напечатано крупными буквами: их ребенок " +
              "раскрашивает так же, как сам рисунок. Обводя и закрашивая буквы, он впервые " +
              "знакомится с их формой. Порядок неважен: можно сначала слово, потом рисунок, " +
              "или только слово.",
          ],
        },
        {
          q: "Надо ли называть цвета вслух во время занятия?",
          a: [
            "Называйте, но без проверки. Разница большая. Сказать спокойно, каким цветом вы " +
              "сейчас раскрашиваете, полезно. Спрашивать, какой это цвет, и ждать правильного " +
              "ответа не стоит: занятие превращается в экзамен, и ребенок уходит. То же с " +
              "названиями животных.",
          ],
        },
        {
          q: "Надо ли показывать образец, как должно получиться?",
          a: [
            "Нет. Готовый образец задает планку, до которой ребенок не дотянется, и это " +
              "лучший способ отбить желание. Раскрашивание в этом возрасте не про сходство с " +
              "образцом, а про то, чтобы вести руку и видеть след.",
          ],
        },
        {
          q: "Ребенок просит, чтобы раскрашивал взрослый. Как быть?",
          a: [
            "Раскрашивайте, но рядом, на своей странице. Просьба обычно значит, что ребенок " +
              "хочет вашего участия, а не готового результата. Если он просит раскрасить " +
              "именно его страницу, закрасьте маленький кусок и верните мелок.",
          ],
        },
        {
          q: "В саду раскрашивает, а дома нет. Почему?",
          a: [
            "Часто дело в обстановке. В саду это общее занятие: все сидят за столом, все " +
              "заняты одним делом. Дома ребенок один за столом, а взрослый занят другим. " +
              "Попробуйте сесть рядом и заняться своей страницей.",
          ],
        },
      ],
    },
    {
      id: "howto",
      title: "Как заниматься",
      items: [
        {
          q: "В какое время дня лучше раскрашивать?",
          a: [
            "Когда ребенок выспался и не голоден. Обычно это первая половина дня. Вечером " +
              "после сада уставший ребенок бросает страницу через минуту, и это не про " +
              "раскраску, а про усталость.",
          ],
        },
        {
          q: "Где сажать ребенка: за стол или на пол?",
          a: [
            "За стол, если ноги достают до опоры. Когда ноги висят, тело держит равновесие, " +
              "и на руку остается меньше внимания. Пол тоже годится, если ребенок лежит на " +
              "животе и опирается на локти. Что не годится, так это раскрашивать на коленях у " +
              "взрослого: рука не имеет опоры.",
          ],
        },
        {
          q: "Что делать с готовыми страницами?",
          a: [
            "Многие вырезают, ставят дату и складывают в папку. Через полгода видно, как " +
              "изменился штрих, и это интереснее, чем кажется. Печать с одной стороны " +
              "позволяет вырезать страницу, не теряя рисунок на обороте.",
          ],
        },
        {
          q: "Как хранить книгу, чтобы она не рассыпалась?",
          a: [
            "Книга на клею, и если вырывать страницы рывком, блок расходится. Проще резать: " +
              "приложите линейку к корешку и проведите канцелярским ножом. Если книгу берут в " +
              "дорогу, вырежьте несколько листов заранее и возьмите их, а книгу оставьте " +
              "дома.",
          ],
        },
        {
          q: "Можно ли раскрашивать в дороге, в машине или в самолете?",
          a: [
            "Да, и это одна из причин, по которой книгу покупают. В машине лучше восковые " +
              "мелки: при любом движении машины фломастер может уйти в сторону и испачкать " +
              "сиденье. Возьмите не всю книгу, а несколько вырезанных листов и плотную папку " +
              "под них вместо стола.",
          ],
        },
        {
          q: "Сколько страниц в день - это нормально?",
          a: [
            "Столько, сколько хочет ребенок. У одних это полстраницы за раз, у других пять " +
              "страниц подряд. Одна страница в неделю тоже нормально. Норм здесь нет, и " +
              "сравнивать с другими детьми смысла нет.",
          ],
        },
      ],
    },
    {
      id: "file",
      title: "Файл для печати",
      items: [
        {
          q: "Чем файл для печати отличается от бумажной книги?",
          a: [
            "Рисунки те же, все 111. Разница в том, что файл вы печатаете сами, дома или в " +
              "типографии, и печатать можно сколько угодно раз. Бумажную книгу печатает и " +
              "присылает Amazon. Русское издание существует только файлом: Amazon не печатает " +
              "книги на русском языке.",
          ],
        },
        {
          q: "Можно ли отдать файл в типографию или фотоателье?",
          a: [
            "Да. Файл покупается один раз и печатается столько раз, сколько нужно вашей " +
              "семье. Типография напечатает его на бумаге плотнее домашней, и книга получится " +
              "крепче.",
          ],
        },
        {
          q: "Нужен ли цветной принтер?",
          a: [
            "Нет. Все рисунки черно-белые, контурные. Обычный черно-белый принтер подходит " +
              "полностью.",
          ],
        },
        {
          q: "Можно ли печатать один и тот же рисунок много раз?",
          a: [
            "Да, и это главное преимущество файла. Любимого зверя можно распечатать " +
              "двадцать раз. А если страница испорчена, ее достаточно напечатать заново.",
          ],
        },
        {
          q: "Когда я получу файл после оплаты?",
          a: [
            "Ссылка приходит на почту сразу после оплаты. Если письма нет, проверьте папку " +
              "со спамом: письма с вложениями и ссылками часто попадают туда.",
          ],
        },
      ],
    },
    {
      id: "language",
      title: "Язык",
      items: [
        {
          q: "Семья двуязычная. Какое издание брать?",
          a: [
            "Берите то, на котором вы говорите с ребенком дома. Рисунки в английском и " +
              "испанском изданиях одни и те же, отличается только слово под рисунком. Если " +
              "языка в семье два и оба важны, некоторые берут оба издания: рисунок знакомый, " +
              "а слово другое, и ребенок сам замечает разницу.",
          ],
        },
        {
          q: "Помогают ли слова под рисунками запоминать буквы?",
          a: [
            "Слово под каждым рисунком напечатано крупными буквами, которые ребенок " +
              "раскрашивает так же, как сам рисунок, обводя их форму рукой. Мы не утверждаем, " +
              "что после этого он начнет читать: это просто первое знакомство с тем, как " +
              "выглядят буквы.",
          ],
        },
        {
          q: "Появятся ли издания на других языках?",
          a: [
            "Сейчас книга выходит на английском и испанском в бумаге и на русском файлом " +
              "для печати. О других языках говорить рано.",
          ],
        },
      ],
    },
    {
      id: "gift",
      title: "Подарок и доставка",
      items: [
        {
          q: "Можно ли отправить книгу сразу получателю?",
          a: [
            "Да. При оформлении заказа на Amazon указывается адрес получателя, а не ваш, и " +
              "там же есть подарочная упаковка и место для короткой записки.",
          ],
        },
        {
          q: "Что написать в подарок, если ребенка знаешь плохо?",
          a: [
            "Книга рассчитана на весь промежуток от года до трех, а не на один конкретный " +
              "возраст. В записке достаточно написать, что это первая раскраска, крупные " +
              "рисунки и толстый контур, и что раскрашивать ее можно начинать сразу.",
          ],
        },
      ],
    },
    {
      id: "groups",
      title: "Закупка для сада, школы и программы",
      items: [
        {
          q: "Как оформить закупку на организацию, а не на себя?",
          a: [
            "Через учетную запись Amazon Business. Это бесплатный вид учетной записи для " +
              "организаций. Он дает счета для отчетности, оплату по реквизитам организации и " +
              "несколько сотрудников в одном заказе. Открывается на сайте Amazon Business.",
          ],
        },
        {
          q: "Можно ли получить документ об оплате для отчетности?",
          a: [
            "Да. Учетная запись Amazon Business выдает счет на каждый заказ. Если " +
              "организация освобождена от налога с продаж, у Amazon есть отдельная программа " +
              "налогового освобождения: свидетельство загружается один раз, и дальше налог не " +
              "начисляется на подходящие покупки. Условия и список документов смотрите на " +
              "странице этой программы у Amazon.",
          ],
        },
        {
          q: "Есть ли скидка при заказе от десяти экземпляров?",
          a: [
            "Скидки на книгу назначаем не мы. Цену на бумажную книгу устанавливает и " +
              "печатает Amazon, наценки за количество там нет: десять книг стоят как десять " +
              "книг. У Amazon Business бывают собственные предложения по количеству, они " +
              "видны в самом заказе.",
          ],
        },
        {
          q: "Сколько занимает доставка при заказе сразу четырнадцати книг?",
          a: [
            "Книга печатается по заказу, а не лежит на складе: сначала печать, потом " +
              "обычная доставка. Точный срок показывает Amazon при оформлении заказа, и " +
              "ориентироваться стоит именно на него: срок зависит от страны, количества и " +
              "выбранного способа доставки.",
          ],
        },
        {
          q: "Можно ли заказать вместе английские и испанские экземпляры?",
          a: [
            "Да. Это две разные книги, у каждой свой номер, и обе кладутся в одну корзину. " +
              "Как Amazon разобьет отправку, решает он сам: посылки могут прийти вместе, а " +
              "могут по отдельности.",
          ],
        },
        {
          q: "В группе дети говорят на двух языках. Как распределить книги?",
          a: [
            "Рисунки в обоих изданиях одни и те же, отличается слово под рисунком. Поэтому " +
              "книги можно раздать по языку семьи, а занятие вести общее: перед детьми " +
              "одинаковые картинки. Некоторые группы берут по несколько экземпляров каждого " +
              "издания и меняют их между детьми.",
          ],
        },
        {
          q: "Почему испанское издание берут группами чаще английского?",
          a: [
            "По нашим заказам испанское издание действительно нередко берут крупными " +
              "партиями. Почему именно так, мы не знаем: данные о продажах не говорят, кто " +
              "покупает и зачем, и любое объяснение было бы нашей догадкой. Достоверно " +
              "известно другое: испанское издание существует отдельной книгой с теми же 111 " +
              "рисунками и заказать его можно в том же количестве, что и английское.",
          ],
        },
        {
          q: "Подходит ли книга для программ раннего развития и Head Start?",
          a: [
            "Книга рассчитана на возраст от года до трех и на самый первый этап рисования, " +
              "когда ребенок только учится оставлять след на бумаге. Этому промежутку она " +
              "соответствует. Утверждать, что она отвечает требованиям какой-либо конкретной " +
              "программы, мы не будем: такие требования у каждой программы свои, и решать " +
              "должен тот, кто программу ведет. На сайте есть отдельные страницы для тех, кто " +
              "покупает книгу на работу.",
          ],
        },
        {
          q: "Есть ли у вас материалы для учителей, кроме этой книги?",
          a: [
            "Да. Издательство Magic of Discoveries выпускает книги по пошаговому рисованию " +
              "для детей постарше и рабочие листы для занятий. Каталог книг на " +
              "magicofdiscoveries.com, рабочие листы в магазине издательства на Teachers Pay " +
              "Teachers.",
          ],
        },
      ],
    },
    {
      id: "where",
      title: "Где купить",
      items: [
        {
          q: "В каких странах можно купить книгу?",
          a: [
            "Бумажная книга продается на Amazon в девяти странах: США, Канада, " +
              "Великобритания, Германия, Франция, Испания, Италия, Япония, Австралия. Файл " +
              "для печати покупается в нашем магазине и доступен откуда угодно.",
          ],
        },
        {
          q: "Придет ли книга из Америки и сколько ждать?",
          a: [
            "Из Америки везти не обязательно. Amazon печатает книги по заказу в сети " +
              "типографий в разных странах и работает с ближайшей к покупателю, поэтому " +
              "заказ, сделанный на европейском Amazon, обслуживается из Европы и приходит " +
              "обычной доставкой, а не международной посылкой. Цена указана в местных " +
              "деньгах. Точный срок Amazon показывает при оформлении заказа.",
          ],
        },
        {
          q: "Почему книга встречается в магазинах, кроме Amazon?",
          a: [
            "Книга издана через издательскую службу Amazon, и она же рассылает книгу дальше " +
              "по своим распространителям. Через них книга попадает в другие магазины и в " +
              "библиотечные каталоги. Официальная страница книги при этом одна, на Amazon, и " +
              "на нее ведут кнопки покупки на этом сайте.",
          ],
        },
      ],
    },
    {
      id: "about",
      title: "О нас и о сайте",
      items: [
        {
          q: "Кто стоит за этим сайтом и почему этой информации можно доверять?",
          a: [
            "Сайт ведет Magic of Discoveries LLC, издательство детских книг из Майами, " +
              "Флорида. Книга, о которой идет речь, выпущена нами: у английского издания " +
              "номер 978-1-963328-27-1, у испанского 978-1-963328-20-2. Обе книги записаны в " +
              "международной базе знаний Wikidata как самостоятельные издания.",
            "Все, что мы утверждаем о возрасте ребенка, опирается на открытые источники: " +
              "CDC, Американскую академию педиатрии и справочник Национальной медицинской " +
              "библиотеки США. Ссылки стоят на страницах, где эти утверждения сделаны, и их " +
              "можно открыть и проверить.",
          ],
        },
        {
          q: "Сайт бесплатный. В чем ваш интерес?",
          a: [
            "Мы издательство и продаем книгу. Справочная часть сайта, подборщик и десять " +
              "бесплатных страниц для печати сделаны затем, чтобы родитель мог разобраться и " +
              "попробовать до покупки, а не после. Никакой оплаты за доступ к сайту нет, " +
              "почту мы не спрашиваем, рекламы на сайте нет.",
          ],
        },
      ],
    },
  ],
};

/** Все вопросы одного языка подряд. Нужно для машинной разметки
    и для служебного файла: там группы не важны, важен полный список. */
export const faqFlat = (lang: UiLang): FaqItem[] =>
  faq[lang].flatMap((g) => g.items);
