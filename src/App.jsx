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
      <QuantumBg /> {/* Background stays behind content */}
      <div className="app">
        <header className="topbar">
          <div className="brandRow">
            <Logo className="logoSmall" />
            <div className="brandText">
              <div className="brandTitle">Operation X42</div>
              <div className="brandSub">Witness the future</div>
            </div>
          </div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/slides">Slides</Link>
            <Link to="/timeline">Timeline</Link>
            <Link to="/assets">Assets</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>

        <HeroCanvas /> {/* Add Cinematic HeroCanvas behind */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/slides" element={<SlidesPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </>
  );
}
