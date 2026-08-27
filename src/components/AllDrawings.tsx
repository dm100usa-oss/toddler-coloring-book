"use client";

import { useState } from "react";
import {
  groupOrder,
  groupTitles,
  drawingsOfGroup,
  drawingFile,
} from "@/data/drawings";
import type { UiLang } from "@/data/dictionaries";

/* Все 111 рисунков книги, свернутые в раскрывающийся блок.

   Раньше все 111 картинок стояли в коде страницы сразу. Пометка
   "грузить лениво" на них была, но толку от нее мало: браузер все
   равно заводит очередь из полутора сотен обращений к серверу
   в первые же секунды. На быстром интернете это незаметно,
   а на медленном страница открывается долго или не открывается вовсе.

   Теперь картинки появляются в коде только после того, как человек
   раскрыл блок. До этого момента страница весит на два мегабайта
   меньше.

   Названия рисунков остаются в коде всегда, и свернутыми тоже.
   Это важно: именно по названиям страницу находит поиск, а картинки
   для него второстепенны. То есть для поисковика ничего не меняется,
   меняется только для браузера. */

export default function AllDrawings({
  lang,
  label,
}: {
  lang: UiLang;
  label: string;
}) {
  /* Один раз открыли, дальше картинки остаются: закрывать и открывать
     заново человек может сколько угодно, второй раз они не грузятся. */
  const [opened, setOpened] = useState(false);

  return (
    <details
      className="all-drawings"
      onToggle={(e) => {
        if ((e.currentTarget as HTMLDetailsElement).open) setOpened(true);
      }}
    >
      <summary>{label}</summary>
      <div className="all-drawings__body">
        {groupOrder.map((g) => (
          <section key={g}>
            <h5>{groupTitles[g][lang]}</h5>
            <ul className="thumbs thumbs--small">
              {drawingsOfGroup(g).map((d) => (
                <li key={d.n}>
                  {opened ? (
                    <img
                      src={drawingFile(d.n)}
                      alt={d.name[lang]}
                      width={420}
                      height={420}
                      loading="lazy"
                    />
                  ) : null}
                  <span>{d.name[lang]}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </details>
  );
}
