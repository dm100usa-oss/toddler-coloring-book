import type { Metadata } from "next";
import "../globals.css";
import { euroUi } from "@/data/euro";
import { SITE_URL, SITE_NAME } from "@/lib/site";

/* Каркас страницы для Канады.

   Отдельный от основного сайта намеренно, как у остальных страниц
   этого крыла. Язык страницы английский, но папка называется canada,
   а не en: папка en занята английским языком самого сайта, и две
   страницы там спорили бы друг с другом. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: SITE_NAME, locale: euroUi.canada.locale },
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

export default function CanadaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
