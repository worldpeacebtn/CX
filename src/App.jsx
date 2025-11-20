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
      <QuantumBg /> {/* Always at the back */}

      <div className="app">
        {/* HUD / Header */}
        <header className="topbar">
          <div className="brandRow">
            <Logo className="logoSmall" />
            <div className="brandText">
              <div className="brandTitle">Operation X42</div>
              <div className="brandSub">Witness X — Quantum Hack Division</div>
            </div>
          </div>

          <div className="hudOverlay">
            <div className="leftEdge"></div>
            <div className="rightEdge"></div>
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
        </header>

        {/* Page Content */}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="heroSection">
                    <div className="quantumBg"></div>
                    <div className="heroContent">
                      <h1>Witness X — Operation X42</h1>
                      <p className="lead">Preliminary public disclosure — Safety, legal preservation & documentation.</p>
                      <div className="ctaRow">
                        <Link className="btn" to="/slides">Read Brief</Link>
                        <Link className="btn ghost" to="/contact">Secure Contact</Link>
                      </div>
                    </div>
                    <div className="canvasArea">
                      <HeroCanvas />
                    </div>
                  </section>

                  <section className="intro">
                    <h3>Immediate ask</h3>
                    <p>We request legal intake, neutral data custody and safe short-term housing for affected witnesses. See brief for details.</p>
                  </section>
                </>
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
