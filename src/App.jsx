import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import HeroCanvas from "./components/HeroCanvas";
import SlidesPage from "./pages/SlidesPage";
import TimelinePage from "./pages/TimelinePage";
import AssetsPage from "./pages/AssetsPage";
import ContactPage from "./pages/ContactPage";

import QuantumBg from './components/QuantumBg';

export default function App() {
  return (
    <>
      {/* BACKGROUND LAYERS */}
      <QuantumBg style={{ position: "fixed", inset: 0, zIndex: -2, pointerEvents: "none" }} />
      <HeroCanvas style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }} />

      {/* APP CONTENT */}
      <div className="appWrapper" style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        
        {/* HUD */}
        <div className="hudViewport">
          <div className="hudOverlay">
            <div className="edge top" />
            <div className="edge bottom" />
            <div className="edge left" />
            <div className="edge right" />
            <div className="innerRim" />
            <div className="scan" />
            <div className="scanlines" />

            {/* Neon corners */}
            <div className="corner corner-neon tl" />
            <div className="corner corner-neon tr" />
            <div className="corner corner-neon bl" />
            <div className="corner corner-neon br" />

            {/* Ghostwire corners */}
            {["tl","tr","br","bl"].map(pos => (
              <div className={`corner-ghost use-stroke ${pos}`} key={pos}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6 20 L30 20 L40 10" />
                  <path d="M6 20 L6 44 L16 54" />
                </svg>
              </div>
            ))}
          </div>

          <div className="hudInfo">
            <div className="title">X42 QUANTUM OPERATION</div>
            <div className="subtitle">Holo Interface Active</div>
          </div>

          <nav className="hudMenu">
            <Link to="/">Home</Link>
            <Link to="/slides">Brief</Link>
            <Link to="/timeline">Timeline</Link>
            <Link to="/assets">Assets</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="hudBar" aria-hidden></div>
        </div>

        {/* PAGE CONTENT */}
        <main style={{ position: "relative", zIndex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <section className="heroSection">
                  <div className="heroContent">
                    <h1>Witness X — Operation X42</h1>
                    <p className="lead">
                      Preliminary public disclosure — Safety, legal preservation & documentation.
                    </p>
                    <div className="ctaRow">
                      <Link className="btn" to="/slides">Read Brief</Link>
                      <Link className="btn ghost" to="/contact">Secure Contact</Link>
                    </div>
                  </div>
                </section>
              }
            />
            <Route path="/slides" element={<SlidesPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <footer className="foot">
          <small>Operation X42 • Vorläufige Teilausgabe • Sicherheit ist Pflicht</small>
        </footer>
      </div>
    </>
  );
}
