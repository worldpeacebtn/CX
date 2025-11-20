import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import HeroCanvas from "./components/HeroCanvas";
import Logo from "./components/Logo";
import SlidesPage from "./pages/SlidesPage";
import TimelinePage from "./pages/TimelinePage";
import AssetsPage from "./pages/AssetsPage";
import ContactPage from "./pages/ContactPage";

import QuantumBg from './components/QuantumBg';

export default function App() {
  return (
    <>
      {/* Quantum background */}
      <QuantumBg
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,      // changed from -1
          pointerEvents: "none"
        }}
      />

      <div className="appWrapper" style={{ position: "relative", minHeight: "100vh", zIndex: 1 }}>
        {/* HUD overlays */}
        <HUD />

        {/* Page content */}
        <main style={{ position: "relative", zIndex: 1 }}>
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
                  {/* HeroCanvas */}
                  <HeroCanvas style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }} />
                </section>
              }
            />
            <Route path="/slides" element={<SlidesPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <footer className="foot" style={{ zIndex: 5, position: "relative" }}>
          <small>Operation X42 • Vorläufige Teilausgabe • Sicherheit ist Pflicht</small>
        </footer>
      </div>
    </>
  );
}
