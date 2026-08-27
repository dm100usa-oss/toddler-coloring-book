# Toddler Coloring Book

Source for [toddlercoloringbook.com](https://www.toddlercoloringbook.com), a
reference site about first coloring books for children ages 1 to 3.

The site answers the questions parents actually ask before and after they hand
a small child a crayon: whether one year old is too young, why a toddler
colors straight over the picture, what to do when a marker bleeds through the
page, which drawings suit which stage. It is published by Magic of Discoveries
LLC, a children's book publisher in Miami, Florida.

Ten pages from one of the publisher's coloring books can be printed from the
site for free, in US Letter and A4, with no sign-up and no email address.

## What is here

- Guides, stage pages and age pages about early coloring
- A FAQ in three languages
- Free printable sheets
- Pages for daycares, home visiting programs and speech therapy practices
- Market pages for buyers outside the United States

The site itself is published in English, Spanish and Russian. The market pages
stand apart from that three-language system: each one is written for a single
country in the language spoken there, and links to that country's Amazon store.

| Path | Country | Language |
| --- | --- | --- |
| `/de/malbuch-erste-woerter-englisch` | Germany | German |
| `/de/malbuch-erste-woerter-spanisch` | Germany | German |
| `/fr/coloriage-premiers-mots-anglais` | France | French |
| `/fr/coloriage-premiers-mots-espagnol` | France | French |
| `/nl/kleurboek-eerste-woorden-engels` | Netherlands | Dutch |
| `/nl/kleurboek-eerste-woorden-spaans` | Netherlands | Dutch |
| `/pl/kolorowanka-pierwsze-slowa-angielski` | Poland | Polish |
| `/pl/kolorowanka-pierwsze-slowa-hiszpanski` | Poland | Polish |
| `/espana/libro-de-colorear-primeras-palabras-en-ingles` | Spain | Spanish |
| `/canada/coloring-book-first-words-in-spanish` | Canada | English |

## Stack

Next.js with the App Router, TypeScript, deployed on Vercel. Pages are static.
Content lives in `src/data`, shared layout in `src/components`, images and
printable PDFs in `public`.

```
npm install
npm run dev     # local development
npm run build   # production build
```

## License

Site code may be read for reference. Text, illustrations and printable sheets
are the property of Magic of Discoveries LLC and are not licensed for reuse.
