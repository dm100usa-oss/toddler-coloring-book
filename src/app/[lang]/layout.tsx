import type { Metadata } from "next";
import "../globals.css";
import { Header, Footer } from "@/components/Chrome";
import { activeLangs, dictionaries } from "@/data/dictionaries";
import { editions } from "@/data/book";
import type { UiLang } from "@/data/dictionaries";
import { SITE_NAME, SITE_URL, SHARE } from "@/lib/site";

/* Общие сведения о странице для мессенджеров и соцсетей. Задаются
   здесь один раз и достаются всем страницам сразу: своя картинка на
   каждом языке, чтобы ссылка на любую из семидесяти восьми страниц
   разворачивалась в карточку, а не оставалась серой строкой.

   Карточка выбрана широкая, а не мелкая квадратная: картинка сделана
   ровно под нее. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = (activeLangs.includes(lang as UiLang) ? lang : "en") as UiLang;
  const image = {
    url: SHARE.url(l),
    width: SHARE.w,
    height: SHARE.h,
    alt: editions[l].title,
  };
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME}. Choosing a first coloring book by what your child can do`,
      template: `%s | ${SITE_NAME}`,
    },
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      locale: dictionaries[l].htmlLang,
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image] },

    /* Значок сайта.

       Файлы лежали в public с самого начала, но подключены не были
       нигде. Из-за этого во вкладке браузера значок иногда появлялся,
       а иногда нет: браузер сам стучится по адресу /favicon.ico и
       находит файл случайно. А на телефоне при добавлении сайта на
       экран, в закладках и в выдаче поиска значка не было вовсе,
       потому что для этого нужны явные строки.

       Теперь подключены все три случая: вкладка браузера, экран
       телефона Apple и экран телефона Android через манифест. */
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
}

export function generateStaticParams() {
  return activeLangs.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  /* Неизвестный первый кусок адреса это не повод обрывать страницу.
     Каркас собирается на английском, а сама страница внутри покажет
     "страницы нет" и вернет правильный код ответа. */
  const l = (activeLangs.includes(lang as UiLang) ? lang : "en") as UiLang;
  /* Baloo 2 и Caveat Brush кириллицы не знают: русский заголовок в них
     развалился бы на системный шрифт. Для русской версии заголовки
     набираются Nunito, а рукописная строка шрифтом Caveat. */
  return (
    <html lang={dictionaries[l].htmlLang}>
      <body>
        <Header lang={l} />
        <main>{children}</main>
        <Footer lang={l} />
      </body>
    </html>
  );
}
