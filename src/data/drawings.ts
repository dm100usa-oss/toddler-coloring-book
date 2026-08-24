import type { UiLang } from "./dictionaries";

/* Все 111 рисунков книги, в том порядке, в каком они идут в ней.
   Сами рисунки вырезаны из книги без подписи: подпись ставится
   на странице обычным шрифтом. Полая буква из книги сделана для
   раскрашивания, в мелком размере она не читается, а текстом
   подпись читают и человек, и поисковик.

   Рисунок один на три языка, меняется только слово под ним. */

export type DrawingGroup =
  | "land" | "water" | "fantasy" | "vehicles"
  | "sports" | "things" | "nature" | "food";

export type Drawing = {
  /** Номер в книге, он же имя файла. */
  n: number;
  group: DrawingGroup;
  name: Record<UiLang, string>;
};

export const drawings: Drawing[] = [
  { n: 1, group: "land", name: { en: "Lion", es: "León", ru: "Лев" } },
  { n: 2, group: "land", name: { en: "Elephant", es: "Elefante", ru: "Слон" } },
  { n: 3, group: "land", name: { en: "Zebra", es: "Cebra", ru: "Зебра" } },
  { n: 4, group: "land", name: { en: "Parrot", es: "Loro", ru: "Попугай" } },
  { n: 5, group: "land", name: { en: "Crocodile", es: "Cocodrilo", ru: "Крокодил" } },
  { n: 6, group: "land", name: { en: "Monkey", es: "Mono", ru: "Обезьяна" } },
  { n: 7, group: "land", name: { en: "Kangaroo", es: "Canguro", ru: "Кенгуру" } },
  { n: 8, group: "land", name: { en: "Rhino", es: "Rinoceronte", ru: "Носорог" } },
  { n: 9, group: "land", name: { en: "Flamingo", es: "Flamenco", ru: "Фламинго" } },
  { n: 10, group: "land", name: { en: "Lemur", es: "Lémur", ru: "Лемур" } },
  { n: 11, group: "land", name: { en: "Hummingbird", es: "Colibrí", ru: "Колибри" } },
  { n: 12, group: "land", name: { en: "Giraffe", es: "Jirafa", ru: "Жираф" } },
  { n: 13, group: "land", name: { en: "Koala", es: "Koala", ru: "Коала" } },
  { n: 14, group: "land", name: { en: "Frog", es: "Rana", ru: "Лягушка" } },
  { n: 15, group: "land", name: { en: "Alpaca", es: "Alpaca", ru: "Альпака" } },
  { n: 16, group: "land", name: { en: "Bunny", es: "Conejo", ru: "Кролик" } },
  { n: 17, group: "land", name: { en: "Owl", es: "Lechuza", ru: "Сова" } },
  { n: 18, group: "land", name: { en: "Hedgehog", es: "Erizo", ru: "Еж" } },
  { n: 19, group: "land", name: { en: "Goat", es: "Cabra", ru: "Коза" } },
  { n: 20, group: "land", name: { en: "Bat", es: "Murciélago", ru: "Летучая мышь" } },
  { n: 21, group: "land", name: { en: "Raccoon", es: "Mapache", ru: "Енот" } },
  { n: 22, group: "land", name: { en: "Bear", es: "Oso", ru: "Медведь" } },
  { n: 23, group: "land", name: { en: "Fox", es: "Zorro", ru: "Лиса" } },
  { n: 24, group: "land", name: { en: "Chicken", es: "Gallina", ru: "Курица" } },
  { n: 25, group: "land", name: { en: "Chameleon", es: "Camaleón", ru: "Хамелеон" } },
  { n: 26, group: "land", name: { en: "Cow", es: "Vaca", ru: "Корова" } },
  { n: 27, group: "land", name: { en: "Beaver", es: "Castor", ru: "Бобр" } },
  { n: 28, group: "land", name: { en: "Eagle", es: "Águila", ru: "Орел" } },
  { n: 29, group: "land", name: { en: "Hamster", es: "Hámster", ru: "Хомяк" } },
  { n: 30, group: "land", name: { en: "Cat", es: "Gato", ru: "Кошка" } },
  { n: 31, group: "land", name: { en: "Dog", es: "Perro", ru: "Собака" } },
  { n: 32, group: "land", name: { en: "Squirrel", es: "Ardilla", ru: "Белка" } },
  { n: 33, group: "land", name: { en: "Duck", es: "Pato", ru: "Утка" } },
  { n: 34, group: "land", name: { en: "Deer", es: "Ciervo", ru: "Олень" } },
  { n: 35, group: "land", name: { en: "Mouse", es: "Ratón", ru: "Мышь" } },
  { n: 36, group: "land", name: { en: "Bee", es: "Abeja", ru: "Пчела" } },
  { n: 37, group: "land", name: { en: "Dragonfly", es: "Libélula", ru: "Стрекоза" } },
  { n: 38, group: "land", name: { en: "Snail", es: "Caracol", ru: "Улитка" } },
  { n: 39, group: "land", name: { en: "Butterfly", es: "Mariposa", ru: "Бабочка" } },
  { n: 40, group: "water", name: { en: "Shark", es: "Tiburón", ru: "Акула" } },
  { n: 41, group: "water", name: { en: "Dolphin", es: "Delfín", ru: "Дельфин" } },
  { n: 42, group: "water", name: { en: "Whale", es: "Ballena", ru: "Кит" } },
  { n: 43, group: "water", name: { en: "Crab", es: "Cangrejo", ru: "Краб" } },
  { n: 44, group: "water", name: { en: "Octopus", es: "Pulpo", ru: "Осьминог" } },
  { n: 45, group: "water", name: { en: "Jellyfish", es: "Medusa", ru: "Медуза" } },
  { n: 46, group: "water", name: { en: "Sea turtle", es: "Tortuga", ru: "Морская черепаха" } },
  { n: 47, group: "water", name: { en: "Angelfish", es: "Pez ángel", ru: "Рыба-ангел" } },
  { n: 48, group: "water", name: { en: "Seahorse", es: "Hipocampo", ru: "Морской конек" } },
  { n: 49, group: "water", name: { en: "Seal", es: "Foca", ru: "Тюлень" } },
  { n: 50, group: "water", name: { en: "Clown fish", es: "Pez payaso", ru: "Рыба-клоун" } },
  { n: 51, group: "water", name: { en: "Shellfish", es: "Molusco", ru: "Моллюск" } },
  { n: 52, group: "water", name: { en: "Axolotl", es: "Ajolote", ru: "Аксолотль" } },
  { n: 53, group: "water", name: { en: "Pufferfish", es: "Pez globo", ru: "Рыба-шар" } },
  { n: 54, group: "water", name: { en: "Shrimp", es: "Camarón", ru: "Креветка" } },
  { n: 55, group: "water", name: { en: "Manta ray", es: "Raya", ru: "Скат" } },
  { n: 56, group: "fantasy", name: { en: "Mermaid", es: "Sirena", ru: "Русалка" } },
  { n: 57, group: "fantasy", name: { en: "Unicorn", es: "Unicornio", ru: "Единорог" } },
  { n: 58, group: "fantasy", name: { en: "Dragon", es: "Dragón", ru: "Дракон" } },
  { n: 59, group: "fantasy", name: { en: "Crown", es: "Corona", ru: "Корона" } },
  { n: 60, group: "fantasy", name: { en: "Dwarf", es: "Gnomo", ru: "Гном" } },
  { n: 61, group: "fantasy", name: { en: "Griffin", es: "Grifo", ru: "Грифон" } },
  { n: 62, group: "fantasy", name: { en: "Troll", es: "Trol", ru: "Тролль" } },
  { n: 63, group: "fantasy", name: { en: "Fairy", es: "Hada", ru: "Фея" } },
  { n: 64, group: "fantasy", name: { en: "Magic cauldron", es: "Caldera mágica", ru: "Волшебный " +
                                                                                       "котел" } },
  { n: 65, group: "fantasy", name: { en: "Wizard's hat", es: "Sombrero de mago", ru: "Шляпа волшебника" } },
  { n: 66, group: "fantasy", name: { en: "Magic potion", es: "Poción mágica", ru: "Волшебное зелье" } },
  { n: 67, group: "vehicles", name: { en: "Car", es: "Coche", ru: "Машина" } },
  { n: 68, group: "vehicles", name: { en: "Helicopter", es: "Helicóptero", ru: "Вертолет" } },
  { n: 69, group: "vehicles", name: { en: "Airplane", es: "Avión", ru: "Самолет" } },
  { n: 70, group: "vehicles", name: { en: "Hot air balloon", es: "Globo aerostático", ru: "Воздушный шар" } },
  { n: 71, group: "vehicles", name: { en: "Ship", es: "Nave", ru: "Корабль" } },
  { n: 72, group: "vehicles", name: { en: "Submarine", es: "Submarino", ru: "Подводная лодка" } },
  { n: 73, group: "vehicles", name: { en: "Rocket", es: "Cohete", ru: "Ракета" } },
  { n: 74, group: "vehicles", name: { en: "Scooter", es: "Scooter", ru: "Скутер" } },
  { n: 75, group: "sports", name: { en: "Skateboard", es: "Monopatín", ru: "Скейтборд" } },
  { n: 76, group: "sports", name: { en: "Kite", es: "Cometa", ru: "Воздушный змей" } },
  { n: 77, group: "sports", name: { en: "Badminton", es: "Bádminton", ru: "Бадминтон" } },
  { n: 78, group: "sports", name: { en: "American football", es: "Fútbol americano", ru: "Американский футбол" } },
  { n: 79, group: "sports", name: { en: "Camera", es: "Cámara", ru: "Камера" } },
  { n: 80, group: "sports", name: { en: "Drum", es: "Tambor", ru: "Барабан" } },
  { n: 81, group: "sports", name: { en: "Beach ball", es: "Pelota de playa", ru: "Пляжный мяч" } },
  { n: 82, group: "things", name: { en: "Sunglasses", es: "Gafas", ru: "Очки" } },
  { n: 83, group: "things", name: { en: "Beach umbrella", es: "Sombrilla de playa", ru: "Пляжный зонт" } },
  { n: 84, group: "things", name: { en: "Beach hat", es: "Sombrero", ru: "Шляпа" } },
  { n: 85, group: "things", name: { en: "Globe", es: "Globo terráqueo", ru: "Глобус" } },
  { n: 86, group: "things", name: { en: "Present", es: "Regalo", ru: "Подарок" } },
  { n: 87, group: "things", name: { en: "Gamepad", es: "Mando de videojuegos", ru: "Геймпад" } },
  { n: 88, group: "nature", name: { en: "Maple leaf", es: "Hoja de arce", ru: "Кленовый лист" } },
  { n: 89, group: "nature", name: { en: "Rose", es: "Rosa", ru: "Роза" } },
  { n: 90, group: "nature", name: { en: "Mushroom", es: "Seta", ru: "Гриб" } },
  { n: 91, group: "nature", name: { en: "Clover", es: "Trébol", ru: "Клевер" } },
  { n: 92, group: "nature", name: { en: "Sunflower", es: "Girasol", ru: "Подсолнух" } },
  { n: 93, group: "nature", name: { en: "Pine cone", es: "Piña", ru: "Шишка" } },
  { n: 94, group: "nature", name: { en: "Cactus", es: "Cacto", ru: "Кактус" } },
  { n: 95, group: "nature", name: { en: "Lily of the valley", es: "Muguete", ru: "Ландыш" } },
  { n: 96, group: "nature", name: { en: "Lotus", es: "Loto", ru: "Лотос" } },
  { n: 97, group: "nature", name: { en: "Tulip", es: "Tulipán", ru: "Тюльпан" } },
  { n: 98, group: "food", name: { en: "Cake", es: "Torta", ru: "Торт" } },
  { n: 99, group: "food", name: { en: "Ice cream", es: "Helado", ru: "Мороженое" } },
  { n: 100, group: "food", name: { en: "Watermelon", es: "Sandía", ru: "Арбуз" } },
  { n: 101, group: "food", name: { en: "Carrot", es: "Zanahoria", ru: "Морковь" } },
  { n: 102, group: "food", name: { en: "Broccoli", es: "Brócoli", ru: "Брокколи" } },
  { n: 103, group: "food", name: { en: "Orange", es: "Naranja", ru: "Апельсин" } },
  { n: 104, group: "food", name: { en: "Cherry", es: "Guinda", ru: "Вишня" } },
  { n: 105, group: "food", name: { en: "Avocado", es: "Aguacate", ru: "Авокадо" } },
  { n: 106, group: "food", name: { en: "Strawberry", es: "Fresa", ru: "Клубника" } },
  { n: 107, group: "food", name: { en: "Pear", es: "Pera", ru: "Груша" } },
  { n: 108, group: "food", name: { en: "Pineapple", es: "Piña", ru: "Ананас" } },
  { n: 109, group: "food", name: { en: "Lemon", es: "Limón", ru: "Лимон" } },
  { n: 110, group: "food", name: { en: "Pumpkin", es: "Calabaza", ru: "Тыква" } },
  { n: 111, group: "food", name: { en: "Donut", es: "Buñuelo", ru: "Пончик" } },
];

/** Названия групп. */
export const groupTitles: Record<DrawingGroup, Record<UiLang, string>> = {
  land: { en: "Land animals", es: "Animales terrestres", ru: "Животные суши" },
  water: { en: "Sea animals", es: "Animales marinos", ru: "Морские животные" },
  fantasy: { en: "Fairy-tale characters", es: "Personajes de cuento", ru: "Сказочные герои" },
  vehicles: { en: "Vehicles", es: "Vehículos", ru: "Транспорт" },
  sports: { en: "Sports and play", es: "Deportes y juegos", ru: "Спорт и игры" },
  things: { en: "Everyday things", es: "Objetos cotidianos", ru: "Предметы" },
  nature: { en: "Flowers and nature", es: "Flores y naturaleza", ru: "Цветы и природа" },
  food: { en: "Food", es: "Comida", ru: "Еда" },
};

export const groupOrder: DrawingGroup[] = [
  "land", "water", "fantasy", "vehicles", "sports", "things", "nature", "food",
];

/* Двадцать рисунков для верхней сетки. Это не наш выбор: ровно эти
   отобраны для обложки, оборота обложки и рекламных баннеров книги.
   Отбор уже сделан и проверен, второй раз его делать незачем. */
export const featured: number[] = [
  1, 23, 22, 24, 16, 29, 34, 9,
  41, 48, 47, 46,
  26, 67, 69, 72,
  89, 104, 106, 111,
];

export const drawingFile = (n: number) =>
  `/drawings/${String(n).padStart(3, "0")}.webp`;

/** Страница книги целиком, вместе со словом полыми буквами.
    Слово в книге на каждом языке свое, поэтому и файл свой.
    Такие страницы стоят в верхней двадцатке: по ним сразу видно,
    что слово под рисунком тоже раскрашивается. */
export const pageFile = (n: number, lang: UiLang) =>
  `/pages/${lang}/${String(n).padStart(3, "0")}.webp`;

export const drawingByNumber = (n: number) =>
  drawings.find((d) => d.n === n);

/** Рисунки одной группы. */
export const drawingsOfGroup = (g: DrawingGroup) =>
  drawings.filter((d) => d.group === g);

/** Все названия одной строкой. Уходит в машинную часть страницы:
    по этому списку нейросеть отвечает на вопрос про конкретного
    зверя или предмет. */
export const allNames = (lang: UiLang) => drawings.map((d) => d.name[lang]);
