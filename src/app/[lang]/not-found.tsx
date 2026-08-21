import Link from "next/link";
import { homePath } from "@/lib/routes";

/* Страница для адресов, которых на сайте нет. Отвечает честно
   и при этом не бросает человека: из нее есть выход на главную. */
export default function NotFound() {
  return (
    <section className="band">
      <div className="wrap nf">
        <h1 className="hero" style={{ maxWidth: "none", marginInline: "auto" }}>
          Page not found
        </h1>
        <p className="lead" style={{ marginInline: "auto" }}>
          This page does not exist. Esta página no existe.
        </p>
        <p className="nf__links">
          <Link className="btn btn--pink" href={homePath("en")}>English</Link>
          <Link className="btn btn--mint" href={homePath("es")}>Español</Link>
        </p>
      </div>
    </section>
  );
}
