import { dictionaries } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";
import { PDF_PRICE_LABEL, pdfFormats } from "@/lib/pdfShop";

/* Покупка файла для печати прямо здесь.

   Кнопка одна, и цена на ней одна: два размера листа это не два товара,
   а один и тот же файл под разную бумагу. Показывать две кнопки по 4.99
   рядом означало бы намекать, что платить надо дважды.

   Размер выбирается после нажатия. Подсказка о том, кому какой лист
   подходит, стоит внутри самой кнопки второй строкой.

   Раскрытие сделано без скриптов, на обычной разметке, поэтому работает
   всегда и одинаково на главной, на страницах этапов и в подборщике.
   Отправка формы обычная, тоже без скриптов: браузер сам уходит на
   страницу оплаты Stripe.

   Цена и название товара берутся на нашей стороне, в обработчике
   оплаты. Из браузера приходит только номер книги, размер листа, язык
   и адрес возврата: цене, присланной снаружи, доверять нельзя. */
export function BuyPdf({
  lang,
  book,
  back,
}: {
  lang: UiLang;
  /** Номер книги в магазине. */
  book: string;
  /** Куда вернуть человека, если он передумал платить. */
  back: string;
}) {
  const t = dictionaries[lang].sec;

  return (
    <details className="buy-pdf">
      <summary className="btn btn--sky">
        {t.buyPdf} · {PDF_PRICE_LABEL}
      </summary>
      <div className="buy-pdf__pick">
        <p className="buy-pdf__lead">{t.pdfPickSize}</p>
        {pdfFormats.map((format) => (
          <form key={format} action="/api/checkout" method="post">
            <input type="hidden" name="book" value={book} />
            <input type="hidden" name="format" value={format} />
            <input type="hidden" name="lang" value={lang} />
            <input type="hidden" name="back" value={back} />
            <button type="submit" className="btn buy-pdf__size">
              <span className="buy-pdf__name">
                {format === "letter" ? t.buyPdfLetter : t.buyPdfA4}
              </span>
              <span className="buy-pdf__hint">
                {format === "letter" ? t.pdfLetterHint : t.pdfA4Hint}
              </span>
            </button>
          </form>
        ))}
        {/* Что покупатель получает. Стоит внутри блока покупки, а не
            под всеми кнопками: снаружи это читалось бы как примечание
            и к покупке на Amazon тоже, хотя относится только к файлу. */}
        <p className="buy-pdf__note">{t.pdfNote}</p>
      </div>
    </details>
  );
}
