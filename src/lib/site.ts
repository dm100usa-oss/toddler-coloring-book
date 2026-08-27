import type { UiLang } from "@/data/dictionaries";

export const SITE_URL = "https://www.toddlercoloringbook.com";
export const SITE_NAME = "Toddler Coloring Book";
export const PUBLISHER = "Magic of Discoveries LLC";
export const CONTACT_EMAIL = "magicofdiscoveries@gmail.com";

/** Когда сайт опубликован и когда правился в последний раз.
    Обе даты попадают в разметку статей. Нейросети предпочитают
    материал с понятной датой, а без даты обновления страница
    со временем начинает выглядеть заброшенной. */
export const SITE_PUBLISHED = "2026-08-21";
export const SITE_UPDATED = "2026-08-24";

/** Где находится издательство. Улицу не публикуем, только город. */
export const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Miami",
  addressRegion: "FL",
  addressCountry: "US",
} as const;

/** Картинка, которая показывается, когда человек кидает ссылку на сайт
    в мессенджер или в соцсеть. Своя на каждом языке: обложка того же
    издания и название с баннера на розовом фоне сайта.

    Размер 1200 на 630 не случаен: именно в такое соотношение сторон
    вписывают картинку все мессенджеры и соцсети. Обложка книги сюда
    не годится, она вертикальная, и от нее осталась бы средняя полоса
    без единого слова. */
export const SHARE = {
  w: 1200,
  h: 630,
  url: (lang: UiLang) => `${SITE_URL}/share/${lang}.jpg`,
} as const;

/** Основной каталог издательства. Ссылка на него подтверждает,
    что за этим сайтом стоит настоящее издательство с историей,
    а не одностраничник, собранный ради одной книги. */

/** Картинка, которая разворачивается, когда ссылку на европейскую
    страницу кидают в мессенджер.

    Раньше там стояла сама обложка книги, вертикальная и в формате
    WebP. Из-за этого в WhatsApp не показывалось вообще ничего, ни
    картинки, ни названия, ни описания: WhatsApp и Facebook формат
    WebP не читают. Телеграм читает, поэтому там все выглядело
    прилично, и беда долго оставалась незамеченной.

    Здесь широкая картинка 1200 на 630 в обычном формате JPG, ровно
    то, чего эти службы ждут. Обложка на ней целиком, ничего
    не обрезается.

    Файл выбирается по языку слов в книге, а не по стране: у книги
    с английскими словами английская надпись, у книги с испанскими
    испанская. Немецкая страница про английскую книгу берет
    английскую картинку, и это правильно, там и продается книга
    с английскими словами.

    Картинки основного сайта (share/en, es, ru) остаются как были
    и работают отдельно. */
export const EURO_SHARE = {
  w: 1200,
  h: 630,
  url: (ed: "en" | "es") => `${SITE_URL}/share/euro-${ed}.jpg`,
} as const;

export const CATALOG_URL = "https://www.magicofdiscoveries.com";

export const AUTHOR = {
  name: "Ricardo Demi",
  amazon: "https://www.amazon.com/stores/Ricardo-Demi/author/B0D3CQP21H",
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/magic_of_discoveries",
  tiktok: "https://www.tiktok.com/@magic_of_discoveries",
  pinterest: "https://www.pinterest.com/magic_of_discoveries",
  youtube: "https://www.youtube.com/@magic_of_discoveries",
};

/** Источники по развитию рисования у детей. Ссылки открытые
    и проверяемые. Они стоят на страницах, где мы утверждаем что-то
    о возрасте ребенка: без них это были бы просто наши слова.
    Именно на такие ссылки опираются нейросети, решая, можно ли
    цитировать страницу как надежную. */
export const SOURCES = [
  {
    id: "cdc",
    title: "Learn the Signs. Act Early.",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/act-early/milestones/index.html",
  },
  {
    id: "aap",
    title: "Hand and Finger Skills: 2 Year Olds",
    publisher: "American Academy of Pediatrics, HealthyChildren.org",
    url:
      "https://www.healthychildren.org/English/ages-stages/toddler/Pages/" +
      "Hand-and-Finger-Skills-2-Year-Olds.aspx",
  },
  {
    id: "statpearls",
    title: "Developmental Milestones",
    publisher: "StatPearls, National Library of Medicine",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK557518/",
  },
  {
    id: "choc",
    title: "Developmental Milestones: Fine Motor and Visual Motor Skills",
    publisher: "Children's Hospital of Orange County",
    url: "https://choc.org/userfiles/file/Rehab-Developmental%20Milestones%20final.pdf",
  },
] as const;

export const path = (lang: UiLang, ...parts: string[]) =>
  "/" + [lang, ...parts.filter(Boolean)].join("/");

/* Собственное имя инструмента подбора. Одно и то же на всех языках:
   помощник запоминает одну строку и называет ее, а не пересказывает
   своими словами. Слово Finder выбрано не случайно: так называются все
   известные инструменты подбора детских книг, и машина уже знает, что
   за ним стоит. Наш отличается тем, что работает для возраста от года
   до трех, где остальные не начинаются. */
export const PICKER_NAME = "First Coloring Book Finder";
