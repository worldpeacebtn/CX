import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import HeroCanvas from "./components/HeroCanvas";
import QuantumBg from "./components/QuantumBg";

import SlidesPage from "./pages/SlidesPage";
import TimelinePage from "./pages/TimelinePage";
import AssetsPage from "./pages/AssetsPage";
import ContactPage from "./pages/ContactPage";

import { Home, SlidesPage, TimelinePage, AssetsPage, ContactPage } from './pages';

export default function App() {
  return (
    <div className="app" style={{ position: "relative", minHeight: "100vh" }}>
      
      {/* BACKGROUND LAYER — BOTH MERGED */}
      <div className="bgLayer">
        <QuantumBg />
        <HeroCanvas />
      </div>

      {/* HUD ALWAYS TOP */}
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

          {/* Ghostwire corners */}
          <div className="corner-ghost tl">
            <svg viewBox="0 0 100 100">
              <path d="M6 20 L30 20 L40 10" />
              <path d="M6 20 L6 44 L16 54" />
            </svg>
          </div>

          <div className="corner-ghost tr">
            <svg viewBox="0 0 100 100">
              <path d="M6 20 L30 20 L40 10" />
              <path d="M6 20 L6 44 L16 54" />
            </svg>
          </div>

          <div className="corner-ghost br">
            <svg viewBox="0 0 100 100">
              <path d="M6 20 L30 20 L40 10" />
              <path d="M6 20 L6 44 L16 54" />
            </svg>
          </div>

          <div className="corner-ghost bl">
            <svg viewBox="0 0 100 100">
              <path d="M6 20 L30 20 L40 10" />
              <path d="M6 20 L6 44 L16 54" />
            </svg>
          </div>
        </div>

        {/* HUD labels */}
        <div className="hudInfo">
          <div className="title">X42 QUANTUM OPERATION</div>
          <div className="subtitle">Holo Interface Active</div>
        </div>

        <nav className="hudMenu">
          <Link to="/">Home</Link>
          <Link to="/slides">Brief</Link>
          <Link to="/timeline">Timeline</Link>
          <Link to="/assets">Assets</Link>
          <Link to="/collaboration">X42 × 42 × BSI</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="hudBar" />
      </div>

      {/* PAGE CONTENT */}
      <main className="mainContent">
        <Routes>
          <Route
            path="/"
            element={
              <section className="heroSection">
                <div className="heroContent">
                  <h1>Witness X — Operation X42</h1>
                  <p className="lead">Preliminary public disclosure — Safety, legal preservation & documentation.</p>
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
