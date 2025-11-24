import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import HeroCanvas from "./components/HeroCanvas";
import QuantumBg from "./components/QuantumBg";
import HoloMenu from "./components/HoloMenu";
import HoloPanel from "./components/HoloPanel";
import HoloSearchBar from "./components/HoloSearchBar";

import SlidesPage from "./pages/SlidesPage";
import TimelinePage from "./pages/TimelinePage";
import AssetsPage from "./pages/AssetsPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    console.log("Searching for:", query);
    setSearchResults([`Result 1 for ${query}`, `Result 2 for ${query}`]);
  };

  return (
    <div className="appWrapper" style={{ position: "relative", minHeight: "100vh" }}>
      {/* BACKGROUND */}
      <QuantumBg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />
      <HeroCanvas style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }} />

      {/* HUD FRAME */}
      <div className="hudViewport" style={{ zIndex: 20 }}>
        <div className="hudOverlay" />
        <div className="hudInfo">
          <div className="title">X42 QUANTUM OPERATION</div>
          <div className="subtitle">Holo Interface Active</div>
        </div>
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
          <Route path="/slides" element={<HoloPanel><SlidesPage /></HoloPanel>} />
          <Route path="/timeline" element={<HoloPanel><TimelinePage /></HoloPanel>} />
          <Route path="/assets" element={<HoloPanel><AssetsPage /></HoloPanel>} />
          <Route path="/contact" element={<HoloPanel><ContactPage /></HoloPanel>} />
        </Routes>
      </main>

      {/* HOLO MENU (NAV) with SEARCHBAR */}
      <HoloMenu>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link to="/">Home</Link>
            <Link to="/slides">Slides</Link>
            <Link to="/timeline">Timeline</Link>
            <Link to="/assets">Assets</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          {/* Insert searchbar into nav */}
                    <HoloSearchBar onSearch={handleSearch} />
      {/* SEARCH RESULTS */}
      <div className="search-results" style={{ position: "relative", zIndex: 30, padding: "1rem" }}>
        {searchResults.map((r, idx) => (
          <div key={idx} style={{ color: "#0ff", marginBottom: "0.25rem" }}>{r}</div>
        ))}
      </div>
        </div>
      </HoloMenu>

      {/* FOOTER */}
      <footer className="foot">
        <small>Operation X42 • Vorläufige Teilausgabe • Sicherheit ist Pflicht</small>
      </footer>
    </div>
  );
}
