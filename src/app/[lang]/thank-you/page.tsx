import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { activeLangs } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";
import { shopCopy } from "@/data/shopCopy";
import { hasPdf, type PdfFormat } from "@/lib/pdfShop";
import { signDownload } from "@/lib/pdfAssets";
import { paidOrder } from "@/lib/stripe";
import { homePath } from "@/lib/routes";

/* Страница после оплаты.

   Ссылка на файл выдается только после того, как Stripe подтвердил,
   что деньги получены. Номер заказа в адресе сам по себе ничего не
   открывает: мы каждый раз спрашиваем у Stripe, оплачен ли он.

   Поисковикам страница закрыта: показывать ее в выдаче незачем. */

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ s?: string }>;
}) {
  const { lang: raw } = await params;
  if (!activeLangs.includes(raw as UiLang)) notFound();
  const lang = raw as UiLang;
  const t = shopCopy[lang];

  const { s } = await searchParams;

  let link: string | null = null;
  /* Покупка для аналитики. Считается только когда Stripe подтвердил
     оплату, и один раз на заказ: если человек обновит страницу или
     вернется к ней из письма, второй покупки не появится. Номер заказа
     уходит в аналитику как номер сделки, по нему Google и сам убирает
     повторы. */
  let purchase: string | null = null;
  if (s) {
    try {
      const order = await paidOrder(s);
      if (order && hasPdf(order.book)) {
        const format = (
          order.format === "a4" ? "a4" : "letter"
        ) as PdfFormat;
        link = `/api/download?t=${signDownload(order.book, format, s)}`;
        const data = JSON.stringify({
          transaction_id: s,
          value: order.amount,
          currency: order.currency,
          items: [{ item_id: order.book, item_variant: format, price: order.amount, quantity: 1 }],
        }).replace(/</g, "\\u003c");
        purchase = `(function(){var k='ga_purchase_${s}';try{if(localStorage.getItem(k))return;localStorage.setItem(k,'1');}catch(e){}if(typeof gtag==='function'){gtag('event','purchase',${data});}})();`;
      }
    } catch (error) {
      console.error("thank-you lookup failed", error);
    }
  }

  return (
    <main className="wrap thanks">
      {purchase ? <script dangerouslySetInnerHTML={{ __html: purchase }} /> : null}
      {link ? (
        <>
          <h1>{t.title}</h1>
          <p className="lead">{t.lead}</p>
          <p className="buys">
            <a className="btn btn--sky" href={link}>
              {t.download}
            </a>
          </p>
          <p className="note">{t.expiry}</p>
          <p className="note">{t.emailed}</p>
          <p className="note">{t.help}</p>
        </>
      ) : (
        <>
          <h1>{t.title}</h1>
          <p className="lead">{t.notFound}</p>
        </>
      )}
      <p>
        <Link href={homePath(lang)}>{t.backHome}</Link>
      </p>
    </main>
  );
}
