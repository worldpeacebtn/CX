import React from "react";
import HeroCanvas from "./HeroCanvas";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero-wrapper">
      {/* 3D Background */}
      <HeroCanvas />

      {/* Text / Foreground */}
      <div className="hero-content">
        <h1 className="hero-title">
          X42 <span className="quantum">Quantum</span> Division
        </h1>

        <p className="hero-sub">
          The Next Standard of Neo-Quantum Intelligence,  
          Ethical Cybersecurity & Human-Centered Futurism.
        </p>

        <div className="hero-buttons">
          <a href="#mission" className="hero-btn primary">
            Explore Project 42
          </a>
          <a href="#contact" className="hero-btn secondary">
            Join the Movement
          </a>
        </div>
      </div>
    </section>
  );
}
