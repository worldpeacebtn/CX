import React from "react";
import timeline from "../data/timeline";

export default function TimelinePage() {
  return (
    <div className="page">
      <h2>Timeline (summary)</h2>
      <ol className="timeline">
        {timeline.map((t, i) => <li key={i}><strong>{t.date}</strong> — {t.text}</li>)}
      </ol>
    </div>
  );
}
