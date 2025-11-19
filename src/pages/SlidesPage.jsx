import React from "react";
import slides from "../data/slides";

export default function SlidesPage() {
  return (
    <div className="page">
      {slides.map((s, i) => (
        <article className="card" key={i}>
          <h2>{s.title}</h2>
          <p className="muted">{s.subtitle}</p>
          <ul>
            {s.points.map((p, idx) => <li key={idx}>{p}</li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}
