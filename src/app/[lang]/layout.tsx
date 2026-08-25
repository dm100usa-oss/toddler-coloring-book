import type { Metadata } from "next";
import "../globals.css";
import { Header, Footer } from "@/components/Chrome";
import { activeLangs, dictionaries } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}. Choosing a first coloring book by what your child can do`,
    template: `%s | ${SITE_NAME}`,
  },
  /* Значок сайта и картинка для соцсетей еще не сделаны.
     Пока их нет, здесь не должно быть ничего: ссылка на файл,
     которого нет, дает ошибку при каждой загрузке страницы,
     а чужой значок с другого сайта хуже, чем никакого. */
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: { card: "summary" },
};

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
