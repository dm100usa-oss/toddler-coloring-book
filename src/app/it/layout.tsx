import type { Metadata } from "next";
import "../globals.css";
import { euroUi } from "@/data/euro";
import { SITE_URL, SITE_NAME } from "@/lib/site";

/* Каркас страниц для Италии.

   Устроен так же, как у Германии, Франции, Голландии и Польши:
   отдельно от основного трехъязычного сайта, со своей шапкой
   и коротким подвалом. Переключателя языков сайта здесь нет,
   и ни одна страница основного сайта на итальянский не переводится. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: SITE_NAME, locale: euroUi.it.locale },
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
    <html lang="it">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
