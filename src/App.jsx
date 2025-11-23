import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HeroCanvas from "./components/HeroCanvas";
import Logo from "./components/Logo";
import SlidesPage from "./pages/SlidesPage";
import TimelinePage from "./pages/TimelinePage";
import AssetsPage from "./pages/AssetsPage";
import ContactPage from "./pages/ContactPage";
import QuantumBg from './components/QuantumBg';
import "./styles.css";  // Import your styles

export default function App() {
  return (
    <div className="appWrapper">
      {/* GLOBAL BACKGROUND LAYERS (behind everything) */}
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
          pointerEvents: "none"  // Ensures it's not blocking clicks
        }}
      />
      
      {/* HUD Overlay */}
      <div className="hudViewport">
        {/* HUD content like overlays, menus, etc. */}
        <div className="hudOverlay">
          <div className="edge top" />
          <div className="edge bottom" />
          <div className="edge left" />
          <div className="edge right" />
          {/* Additional HUD elements */}
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

        <div className="hudBar" />
      </div>

      {/* Main Page Content */}
      <main>
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

      {/* Footer */}
      <footer className="foot">
        <small>Operation X42 • Vorläufige Teilausgabe • Sicherheit ist Pflich
