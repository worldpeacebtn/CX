// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import HeroCanvas from "./components/HeroCanvas";
import QuantumBg from "./components/QuantumBg";
import HudMenu from "./components/HudMenu";

import SlidesPage from "./pages/SlidesPage";
import TimelinePage from "./pages/TimelinePage";
import AssetsPage from "./pages/AssetsPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <div className="appWrapper" style={{ position: "relative", minHeight: "100vh" }}>

      {/* BACKGROUND LAYERS */}
      <QuantumBg
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0
        }}
      />
      <HeroCanvas
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none"
        }}
      />

      {/* HUD / MENU */}
      <div className="hudViewport" style={{ zIndex: 20 }}>
        <HudMenu />
      </div>

      {/* PAGE CONTENT */}
      <main style={{ position: "relative", zIndex: 10 }}>
        <Routes>
          <Route
            path="/"
            element={
              <section className="heroSection" style={{ minHeight: "100vh" }}>
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
  );
}
