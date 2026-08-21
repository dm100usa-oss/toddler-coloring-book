import type { UiLang } from "./dictionaries";

/* Страницы для печати.

   Их ровно десять, и это не случайное число. Десять хватает, чтобы
   родитель понял, подходит ли такая книга его ребенку, и не хватает,
   чтобы заменить книгу. Сайт коммерческий, и раздавать половину
   каталога даром здесь незачем.

   Все десять взяты из самой книги, которую сайт продает, и идут
   в том же порядке, что и в ней. Это важно: страница для печати
   тут не приманка со стороны, а честный образец. Родитель печатает
   лист, видит толщину контура и размер рисунка своими глазами,
   и дальше решает сам.

   Файлы лежат в /printables. Английский лист: <id>. Испанский: <id>-es.
   Русский: <id>-ru.
   У каждого три файла: превью .png и две версии для печати,
   -letter.pdf для американской бумаги и -a4.pdf для остального мира. */

export type Sheet = {
  id: string;
  name: Record<UiLang, string>;
};

export const sheets: Sheet[] = [
  { id: "lion", name: { en: "Lion", es: "León", ru: "Лев" } },
  { id: "elephant", name: { en: "Elephant", es: "Elefante", ru: "Слон" } },
  { id: "giraffe", name: { en: "Giraffe", es: "Jirafa", ru: "Жираф" } },
  { id: "zebra", name: { en: "Zebra", es: "Cebra", ru: "Зебра" } },
  { id: "rhino", name: { en: "Rhino", es: "Rinoceronte", ru: "Носорог" } },
  { id: "monkey", name: { en: "Monkey", es: "Mono", ru: "Обезьяна" } },
  { id: "crocodile", name: { en: "Crocodile", es: "Cocodrilo", ru: "Крокодил" } },
  { id: "kangaroo", name: { en: "Kangaroo", es: "Canguro", ru: "Кенгуру" } },
  { id: "bear", name: { en: "Bear", es: "Oso", ru: "Медведь" } },
  { id: "fox", name: { en: "Fox", es: "Zorro", ru: "Лиса" } },
];

export const sheetFile = (id: string, lang: UiLang) =>
  lang === "en" ? id : `${id}-${lang}`;

export const sheetPreview = (id: string, lang: UiLang) =>
  `/printables/${sheetFile(id, lang)}.png`;

export const sheetPdf = (id: string, lang: UiLang, size: "letter" | "a4") =>
  `/printables/${sheetFile(id, lang)}-${size}.pdf`;

/** Несколько листов для показа внутри страницы.
    Берем с начала: порядок тот же, что в книге. */
export const sample = (n = 3) => sheets.slice(0, n);
