import Link from "next/link";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import type { UiLang } from "@/data/dictionaries";
import { homePath, sectionPath } from "@/lib/routes";
import { SITE_NAME, PUBLISHER, CATALOG_URL, CONTACT_EMAIL } from "@/lib/site";

export function Header({ lang }: { lang: UiLang }) {
  const t = dictionaries[lang];
  return (
    <header>
      <div className="masthead">
        <p className="brand">
          <Link href={homePath(lang)}>
            <span>Toddler</span> <span>Coloring</span> <span>Book</span>
          </Link>
        </p>
        <p className="tagline">
          {lang === "en"
            ? "The first stage of drawing, explained"
            : "La primera etapa del dibujo, explicada"}
        </p>
        {/* Переключатель языка ведет на ту же по смыслу страницу, а не на
            главную: человека, читавшего про двухлетних, нельзя выкидывать
            в начало только за то, что он сменил язык. Здесь стоит главная,
            потому что точный адрес знает каждая страница отдельно. */}
        <nav className="langbar" aria-label="Language">
          {activeLangs.map((l) => (
            <Link key={l} href={homePath(l)} aria-current={l === lang ? "true" : undefined}>
              {dictionaries[l].langName}
            </Link>
          ))}
        </nav>
      </div>
      <nav className="nav" aria-label={lang === "en" ? "Main" : "Principal"}>
        <ul>
          <li><Link href={sectionPath(lang, "ages")}>{t.nav.ages}</Link></li>
          <li><Link href={sectionPath(lang, "guides")}>{t.nav.guides}</Link></li>
          <li><Link href={sectionPath(lang, "printables")}>{t.nav.printables}</Link></li>
          <li><Link href={sectionPath(lang, "book")}>{t.nav.book}</Link></li>
          <li><Link href={sectionPath(lang, "about")}>{t.nav.about}</Link></li>
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
