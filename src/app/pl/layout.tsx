import type { Metadata } from "next";
import "../globals.css";
import { euroUi } from "@/data/euro";
import { SITE_URL, SITE_NAME } from "@/lib/site";

/* Каркас страниц для Польши.

   Отдельный от основного сайта намеренно. Эти страницы не входят
   в трехъязычную систему: переключатель языков в шапке сайта остается
   на трех языках, и ни одна из остальных страниц не переводится.
   Здесь только своя простая шапка с баннером и свой короткий подвал. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: SITE_NAME, locale: euroUi.pl.locale },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function EuroLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
