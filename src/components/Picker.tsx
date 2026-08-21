"use client";

import { useState } from "react";
import Link from "next/link";
import { dictionaries } from "@/data/dictionaries";
import type { ContentLang } from "@/data/dictionaries";
import { pickStage, stageById } from "@/data/stages";
import type { Answers } from "@/data/stages";
import { sample, sheetPreview, sheetPdf } from "@/data/sheets";
import { editions, BOOK } from "@/data/book";
import { homePath, sectionPath } from "@/lib/routes";

/* Подборщик первой раскраски.

   Работает целиком в браузере: ответы никуда не уходят и нигде
   не сохраняются. Это не только про приличия, это еще и снимает
   у родителя вопрос, зачем сайту знать про его ребенка.

   Четыре вопроса выбраны так, чтобы на каждый родитель отвечал
   не задумываясь: возраст, хват, попадание, усидчивость. Ничего,
   что надо было бы пойти проверить. */

const KEYS = ["age", "grip", "inside", "attention"] as const;
type Key = (typeof KEYS)[number];

export default function Picker({ lang }: { lang: ContentLang }) {
  const t = dictionaries[lang].picker;
  const c = dictionaries[lang].common;
  const [answers, setAnswers] = useState<Partial<Answers>>({});

  const step = KEYS.findIndex((k) => !answers[k]);
  const done = step === -1;

  const answer = (k: Key, v: string) => setAnswers((prev) => ({ ...prev, [k]: v }));
  const back = () => {
    const i = step === -1 ? KEYS.length - 1 : step - 1;
    if (i < 0) return;
    setAnswers((prev) => {
      const next = { ...prev };
      for (let j = i; j < KEYS.length; j++) delete next[KEYS[j]];
      return next;
    });
  };

  if (!done) {
    const key = KEYS[step];
    const q = t.q[key];
    return (
      <div className="picker">
        <div className="picker__bar">
          <i style={{ width: `${(step / KEYS.length) * 100}%` }} />
        </div>
        <p className="picker__step">{t.stepOf(step + 1, KEYS.length)}</p>
        <h3 className="picker__q">{q.q}</h3>
        <div className="picker__options">
          {q.a.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className="picker__option"
              onClick={() => answer(key, opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {step > 0 && (
          <button type="button" className="picker__back" onClick={back}>
            {t.back}
          </button>
        )}
      </div>
    );
  }

  /* Ответ */
  const stage = stageById(pickStage(answers as Answers));
  const ed = editions[lang];
  const picks = sample(3);

  return (
    <div className="picker">
      <span className="result__age">{stage.ageLabel[lang]}</span>
      <h3 className="result__title">
        {t.resultTitle}: {stage.title[lang]}
      </h3>

      <div className="result__block">
        <h4>{t.canTitle}</h4>
        <ul>
          {stage.can[lang].map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <p className="result__notyet">{stage.notYet[lang]}</p>

      <div className="result__block">
        <h4>{t.lookForTitle}</h4>
        <ul>
          {stage.lookFor[lang].map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      {/* Образцы страниц. Показываем только тем, кому книга подходит:
          родителю, чей ребенок ее перерос, печатать образцы незачем. */}
      {stage.bookFit !== "outgrown" && (
      <div className="result__block">
        <h4>{t.tryTitle}</h4>
        <p style={{ fontSize: "var(--t-small)", color: "var(--ink-2)", margin: "0 0 0.7rem" }}>
          {t.tryLead}
        </p>
        <div className="result__sheets">
          {picks.map((s) => (
            <a key={s.id} href={sheetPdf(s.id, lang, "letter")} download>
              <img
                src={sheetPreview(s.id, lang)}
                alt={
                  lang === "en"
                    ? `Free printable coloring page: ${s.name.en}`
                    : `Dibujo para colorear gratis: ${s.name.es}`
                }
                loading="lazy"
              />
            </a>
          ))}
        </div>
        <p style={{ margin: 0 }}>
          <Link className="btn btn--sun" href={sectionPath(lang, "printables")}>
            {dictionaries[lang].home.printablesCta}
          </Link>
        </p>
      </div>
      )}

      {/* Книга показывается только тем, кому она правда подходит.
          Ребенку, переросшему первую раскраску, мы прямо говорим,
          что искать дальше, и книгу не навязываем. Родитель, которому
          один раз сказали правду, возвращается. */}
      {stage.bookFit !== "outgrown" ? (
        <div className="result__block">
          <h4>{t.bookLine}</h4>
          <div className="pick">
            <Link className="pick__cover" href={homePath(lang)}>
              <img
                src={ed.cover}
                alt={ed.title}
                width={ed.coverSize.w}
                height={ed.coverSize.h}
              />
            </Link>
            <div>
              <p className="subtitle">
                <Link href={homePath(lang)}>{ed.title}</Link>
              </p>
              <p style={{ fontSize: "var(--t-small)", margin: "0 0 0.9rem" }}>{ed.lead}</p>
              <p style={{ margin: 0 }}>
                <a
                  className="btn btn--pink"
                  href={BOOK.amazonUrl(ed.asin!)}
                  rel="nofollow sponsored noopener"
                  target="_blank"
                >
                  {c.amazon} · {ed.price}
                </a>
              </p>
              <p className="buy-note" style={{ marginBottom: 0 }}>
                {lang === "en"
                  ? "Sold and shipped by Amazon. We earn from the sale."
                  : "Vendido y enviado por Amazon. Nosotros ganamos con la venta."}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="result__block">
          <h4>{t.bookLine}</h4>
          <p className="result__notyet" style={{ marginBottom: "0.9rem" }}>
            {lang === "en"
              ? "Our own book is made for an earlier stage than this, so we are not going to suggest it. What suits your child now is a book with more to fill inside one drawing, or a step by step drawing book."
              : "Nuestro propio libro está hecho para una etapa anterior a esta, así que no se lo vamos a proponer. Lo que le conviene ahora es un libro con más que rellenar dentro de un mismo dibujo, o un libro de dibujo paso a paso."}
          </p>
          <p style={{ margin: 0 }}>
            <Link className="btn btn--ghost" href={sectionPath(lang, "guides")}>
              {dictionaries[lang].nav.guides}
            </Link>
          </p>
        </div>
      )}

      <button type="button" className="picker__back" onClick={() => setAnswers({})}>
        {t.again}
      </button>
      <p className="result__disclaimer">{t.disclaimer}</p>
    </div>
  );
}
