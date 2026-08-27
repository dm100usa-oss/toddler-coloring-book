import type { Metadata } from "next";
import "../globals.css";
import { euroUi } from "@/data/euro";
import { SITE_URL, SITE_NAME } from "@/lib/site";

/* Каркас страницы для Испании.

   Отдельный от основного сайта намеренно, как и у четырех европейских
   стран. Эта страница не входит в трехъязычную систему: переключатель
   языков в шапке сайта остается на трех языках.

   Папка называется espana, а не es: папка es занята испанским языком
   самого сайта. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: SITE_NAME, locale: euroUi.espana.locale },
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

export default function EspanaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
