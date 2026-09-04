import { createHmac, timingSafeEqual } from "node:crypto";
import { editions } from "@/data/book";
import type { UiLang } from "@/data/dictionaries";
import { hasPdf, type PdfBookId, type PdfFormat } from "@/lib/pdfShop";

/* ---------------------------------------------------------------------------
   Где лежит купленный файл и как выдается ссылка на него.

   Отделено от pdfShop.ts намеренно. Здесь работа с тайным словом, и она
   возможна только на сервере. Кнопка покупки живет в том числе внутри
   подборщика, который работает в браузере, и ей нужны только цена
   и список размеров листа. Если бы все лежало в одном файле, тайная
   часть уехала бы в браузер вместе с кнопкой.

   Это же и есть то самое единственное место, которое знает, где лежит
   файл. Книги лежат в закрытом файловом хранилище Vercel Blob, публичного
   адреса у них нет. Забрать файл может только сам сайт после проверки
   оплаты, в src/app/api/download/route.ts.
--------------------------------------------------------------------------- */

/** Издание по номеру книги в магазине. */
function editionOf(id: PdfBookId) {
  return Object.values(editions).find((e) => e.pdfId === id);
}

/* ---------------------------------------------------------------------------
   Тайное слово. Им подписываются ссылки на скачивание.
   Если его нет, сборка должна упасть заметно, а не тихо начать раздавать
   ссылки с подписью, которую может подделать кто угодно.
--------------------------------------------------------------------------- */
function secret(): string {
  const value = process.env.DOWNLOAD_SECRET;
  if (!value || value.length < 24) {
    throw new Error(
      "DOWNLOAD_SECRET не задан или слишком короткий. " +
        "Без него ссылки на файлы можно подобрать."
    );
  }
  return value;
}

/** Имя файла, которое покупатель увидит у себя в загрузках. */
export function assetFileName(id: PdfBookId, format: PdfFormat): string {
  const base = editionOf(id)?.slug ?? String(id);
  const suffix = format === "letter" ? "letter-8.5x11" : "a4";
  return `${base}-${suffix}.pdf`;
}

/* Папка этого сайта внутри общей кладовки.

   Кладовка books-pdf одна на два сайта: этот и каталог издательства.
   Чтобы файлы не путались, каждый сайт держит свои в своей папке.

   Имя файла в кладовке совпадает с тем, которое покупатель увидит
   у себя в загрузках. Имена на двух сайтах разные, поэтому одна
   и та же книга лежит в кладовке дважды. Это осознанно: так покупателю
   приходит файл с понятным именем, и никакого переименования на лету
   делать не нужно. */
const STORE_FOLDER = "toddlercoloringbook/";

/** Единственное место на сайте, которое знает, где лежит купленный файл.
    Это адрес внутри закрытой кладовки, а не адрес в интернете:
    открыть его в браузере нельзя. */
export function blobPath(id: PdfBookId, format: PdfFormat): string {
  return STORE_FOLDER + assetFileName(id, format);
}

/* ---------------------------------------------------------------------------
   Подписанная ссылка на скачивание.

   Внутри ссылки лежит номер книги, размер листа и срок годности.
   Подпись считается тайным словом, поэтому подделать содержимое нельзя:
   любая правка ломает подпись, и файл не отдается.
--------------------------------------------------------------------------- */

/* Сколько ссылка живет и сколько раз по ней можно скачать.

   Тридцать дней и пять скачиваний, как в каталоге издательства.
   Пять скачиваний покрывают все обычные случаи: оборвалась связь,
   не нашел файл в загрузках, купил с телефона а печатает с компьютера.
   А раздать ссылку знакомым дальше пятого уже не выйдет. */
export const DOWNLOAD_TTL_MS = 30 * 24 * 60 * 60 * 1000;
export const DOWNLOAD_LIMIT = 5;

const b64url = (input: Buffer | string) =>
  Buffer.from(input).toString("base64url");

export function signDownload(
  id: PdfBookId,
  format: PdfFormat,
  /** Номер заказа в Stripe. По нему ведется счет скачиваний. */
  session: string,
  expiresAt = Date.now() + DOWNLOAD_TTL_MS
): string {
  const payload = b64url(
    JSON.stringify({ i: id, f: format, s: session, e: expiresAt })
  );
  const mac = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${mac}`;
}

export type DownloadClaim = {
  id: PdfBookId;
  format: PdfFormat;
  session: string;
};

export function verifyDownload(token: string): DownloadClaim | null {
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return null;

  const expected = createHmac("sha256", secret())
    .update(payload)
    .digest("base64url");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.e !== "number" || Date.now() > data.e) return null;
    if (!hasPdf(data.i)) return null;
    if (data.f !== "letter" && data.f !== "a4") return null;
    return { id: data.i, format: data.f, session: String(data.s ?? "") };
  } catch {
    return null;
  }
}

/** Готовая ссылка на скачивание, которую можно положить в письмо. */
export const downloadUrl = (
  origin: string,
  id: PdfBookId,
  format: PdfFormat,
  session: string
) => `${origin}/api/download?t=${signDownload(id, format, session)}`;

/** Название товара в чеке Stripe и в письме. */
export function pdfProductName(id: PdfBookId, lang: UiLang): string {
  return editionOf(id)?.title ?? editions[lang].title;
}
