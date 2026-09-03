/* ---------------------------------------------------------------------------
   Готовит файлы книг к продаже. Запускается сам перед каждой сборкой сайта.

   Берет рукописи из knigi/<id>/rukopis/ и раскладывает их в public/dl,
   каждую в свою папку со случайным на вид именем. Имя считается из
   тайного слова DOWNLOAD_SECRET, поэтому подобрать его нельзя,
   а при новой сборке оно остается тем же, и старые ссылки не ломаются.

   Папка public/dl в хранилище кода не попадает, она создается заново
   при каждой сборке.

   Устройство временное. Когда книги переедут в файловое хранилище
   Vercel, меняются только этот скрипт и функция assetPath в
   src/lib/pdfShop.ts. Больше нигде на сайте о месте хранения не знают.

   Список книг и правило имен намеренно повторяют src/lib/pdfShop.ts.
   Этот файл выполняется до сборки, когда читать код сайта еще нельзя.
   При добавлении книги дописать ее в оба места.
--------------------------------------------------------------------------- */

import { createHmac } from "node:crypto";
import { existsSync, mkdirSync, copyFileSync, rmSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const BOOKS = [
  "first-coloring-book-111-en",
  "first-coloring-book-111-es",
  "first-coloring-book-111-ru",
];

const FORMATS = ["letter", "a4"];

const secret = process.env.DOWNLOAD_SECRET;
if (!secret || secret.length < 24) {
  console.error(
    "\n  Не задано тайное слово DOWNLOAD_SECRET.\n" +
      "  Без него файлы книг разложить нельзя: их адреса стало бы можно подобрать.\n" +
      "  Добавьте переменную DOWNLOAD_SECRET в настройках проекта.\n"
  );
  process.exit(1);
}

const folder = (id, format) =>
  createHmac("sha256", secret)
    .update(`asset:${id}:${format}`)
    .digest("hex")
    .slice(0, 32);

/* Название файла для покупателя берем из данных книги. Читаем их
   простым поиском по тексту: разбирать код сайта здесь нечем. */
const source = readFileSync(join(root, "src/data/book.ts"), "utf8");

function slugOf(id) {
  const at = source.indexOf(`pdfId: "${id}"`);
  if (at < 0) return id;
  const near = source.slice(at, at + 4000);
  const hit = near.match(/slug: "([^"]+)"/);
  return hit ? hit[1] : id;
}

const outRoot = join(root, "public", "dl");
rmSync(outRoot, { recursive: true, force: true });

let done = 0;
const missing = [];

for (const id of BOOKS) {
  for (const format of FORMATS) {
    const from = join(root, "knigi", id, "rukopis", `${id}-${format}.pdf`);
    if (!existsSync(from)) {
      missing.push(`${id}-${format}`);
      continue;
    }
    const suffix = format === "letter" ? "letter-8.5x11" : "a4";
    const dir = join(outRoot, folder(id, format));
    mkdirSync(dir, { recursive: true });
    copyFileSync(from, join(dir, `${slugOf(id)}-${suffix}.pdf`));
    done += 1;
  }
}

if (missing.length) {
  console.error("\n  Не найдены файлы книг: " + missing.join(", ") + "\n");
  process.exit(1);
}

console.log(`  Книги готовы к продаже: ${done} файлов.`);
