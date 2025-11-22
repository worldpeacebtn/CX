import React from "react";
import HeroCanvas from "./HeroCanvas";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero-wrapper">
      {/* Background Canvas */}
      <HeroCanvas />

      {/* Glass-style panel for content */}
      <div className="hero-content-glass">
        <h1 className="hero-title">
          X42 <span className="quantum">Quantum</span> Division
        </h1>
        <p className="hero-sub">
          A new paradigm for cyber resilience, ethical AI & next‑gen innovation.
        </p>
        <div className="hero-buttons">
          <a href="#mission" className="hero-btn primary">Explore Project 42</a>
          <a href="#contact" className="hero-btn secondary">Join Us</a>
        </div>
      </div>
    </section>
  );
}
