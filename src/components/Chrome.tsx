import Link from "next/link";
import { dictionaries, activeLangs, navFor } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";
import { homePath, sectionPath } from "@/lib/routes";
import { SITE_NAME, PUBLISHER, CATALOG_URL, CONTACT_EMAIL } from "@/lib/site";

/* Шапка сайта. Наверху рисованный баннер книги: название, возраст,
   число рисунков и перечень тем сразу, одной картинкой. Свой баннер
   на каждом языке.

   Баннеры обрезаны сверху и снизу по самому рисунку: в исходных
   файлах сверху и снизу оставались пустые поля, из-за которых шапка
   занимала весь первый экран и обложку книги приходилось искать
   прокруткой. */
const banners: Record<UiLang, { src: string; w: number; h: number; alt: string }> = {
  en: {
    src: "/banner/top-en.jpg",
    w: 2172,
    h: 490,
    alt:
      "First Coloring Book for Toddlers Ages 1-3: 111 amazing and cute pictures to color. " +
      "Animals, sea animals, fairy-tale characters, food, toys and more",
  },
  es: {
    src: "/banner/top-es.jpg",
    w: 2172,
    h: 487,
    alt:
      "El Primer Libro de Colorear para Bebés de 1 a 3 Años: 111 dibujos sorprendentes y " +
      "adorables. Animales, animales marinos, personajes de cuentos, alimentos y juguetes",
  },
  ru: {
    src: "/banner/top-ru.jpg",
    w: 2364,
    h: 526,
    alt:
      "Первая книга-раскраска для малышей 1-3 года: 111 удивительных и милых рисунков. " +
      "Животные, морские обитатели, сказочные персонажи, продукты и игрушки",
  },
};

export function Header({ lang }: { lang: UiLang }) {
  const t = dictionaries[lang];
  const banner = banners[lang];
  return (
    <header>
      <div className="masthead masthead--art">
        <Link className="masthead__banner" href={homePath(lang)}>
          <img
            src={banner.src}
            alt={banner.alt}
            width={banner.w}
            height={banner.h}
            fetchPriority="high"
          />
        </Link>

        {/* Переключатель языка ведет на главную того языка. Точный
            адрес знает каждая страница отдельно, здесь стоит главная. */}
        <nav className="langbar" aria-label="Language">
          {activeLangs.map((l) => (
            <Link key={l} href={homePath(l)} aria-current={l === lang ? "true" : undefined}>
              {dictionaries[l].langName}
            </Link>
          ))}
        </nav>
      </div>

      {/* Раздела "книга" в меню нет: книга это и есть главная. */}
      <nav className="nav" aria-label={lang === "en" ? "Main" : lang === "es" ? "Principal" : "Основное"}>
        <ul>
          {navFor(lang).map((s) => (
            <li key={s}>
              <Link href={sectionPath(lang, s)}>{t.nav[s]}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function Footer({ lang }: { lang: UiLang }) {
  const t = dictionaries[lang];
  return (
    <footer className="footer">
      {/* Строка о том, кто мы. Стоит на каждой странице: и человек,
          и нейросеть должны на любой странице понимать, чей это сайт. */}
      <p className="footer__about">{t.footer.about}</p>
      <p>
        <a href={CATALOG_URL} rel="noopener">{t.footer.catalog}</a>
        {" · "}
        {/* Права и приватность стоят в подвале, а не в меню: страница
            нужная, но не та, ради которой человек пришел. */}
        <Link href={sectionPath(lang, "terms")}>{t.nav.terms}</Link>
        {" · "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        © {new Date().getFullYear()} {PUBLISHER}. {t.footer.rights}
      </p>
      <p style={{ opacity: 0.7, fontSize: "var(--t-micro)" }}>{SITE_NAME}</p>
    </footer>
  );
}
