import React, { Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Lazy-load heavy 3D components to split bundle
const HeroCanvas = lazy(() => import("./components/HeroCanvas"));
const QuantumBg = lazy(() => import("./components/QuantumBg"));

// Normal lightweight pages
import SlidesPage from "./pages/SlidesPage";
import TimelinePage from "./pages/TimelinePage";
import AssetsPage from "./pages/AssetsPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <div className="app" style={{ position: "relative", minHeight: "100vh" }}>

      {/* ===== BACKGROUND LAYERS ===== */}
      <div
        className="bgLayer"
        aria-hidden
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <QuantumBg />
          <HeroCanvas />
        </Suspense>
      </div>

      {/* ===== HUD OVERLAY ===== */}
      <div
        className="hudViewport"
        style={{ position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none" }}
      >
        <div className="hudInfo" style={{ textAlign: "center", marginTop: "20px" }}>
          <div className="title">X42 QUANTUM OPERATION</div>
          <div className="subtitle">Holo-Interface Active</div>
        </div>

        {/* NAVIGATION — pointerEvents enabled */}
        <nav
          className="hudMenu"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 10000,
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/slides">Brief</Link>
          <Link to="/timeline">Timeline</Link>
          <Link to="/assets">Assets</Link>
          <Link to="/collaboration">X42 × 42 × BSI</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="mainContent" style={{ position: "relative", zIndex: 5 }}>
        <Routes>
          <Route
            path="/"
            element={
              <section className="heroSection" style={{ minHeight: "100vh" }}>
                <div className="heroContent">
                  <h1>Witness X — Operation X42</h1>
                  <p className="lead">
                    Public-safe preliminary release • Documentation • Preservation • Evidence
                  </p>

                  <div className="ctaRow">
                    <Link className="btn" to="/slides">
                      Read Brief
                    </Link>
                    <Link className="btn ghost" to="/contact">
                      Secure Contact
                    </Link>
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

      <footer style={{ position: "relative", zIndex: 5 }}>
        <small>Operation X42 • Preliminary Release • Safety Protocol Active</small>
      </footer>
    </div>
  );
}
