// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import HeroCanvas from "./components/HeroCanvas.jsx";
import Logo from "./components/Logo.jsx";
import QuantumBg from "./components/QuantumBg.jsx";

import { Home, SlidesPage, TimelinePage, AssetsPage, ContactPage, Collaboration, Evidence } from "./pages";

export default function App() {
  return (
    <>
      {/* BACKGROUND LAYER: forced behind everything */}
      <div
        id="__background-root"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -9999,
          pointerEvents: "none",
        }}
      >
        <QuantumBg />
        <HeroCanvas />
      </div>

      {/* app content */}
      <div className="appWrapper" style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        {/* HUD (keeps same markup as before) */}
        <div className="hudViewport">
          <div className="hudOverlay">
            <div className="edge top" />
            <div className="edge bottom" />
            <div className="edge left" />
            <div className="edge right" />
            <div className="innerRim" />
            <div className="scan" />
            <div className="scanlines" />
            <div className="corner corner-neon tl" />
            <div className="corner corner-neon tr" />
            <div className="corner corner-neon bl" />
            <div className="corner corner-neon br" />
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

          <div className="hudBar" aria-hidden />
        </div>

        {/* Main content */}
        <main style={{ position: "relative", zIndex: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/slides" element={<SlidesPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/evidence" element={<Evidence />} />
          </Routes>
        </main>

        <footer className="foot" style={{ zIndex: 3, position: "relative" }}>
          <small>Operation X42 • Vorläufige Teilausgabe • Sicherheit ist Pflicht</small>
        </footer>
      </div>
    </>
  );
}

