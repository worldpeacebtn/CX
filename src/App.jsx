<header className="topbar">
  <div className="headerCenter">
    <Logo className="logoSmall" />
    <div className="brandText">
      <span className="brandTitle">Operation X42</span>
      <span className="brandSub">— Witness X — Quantum Hack Division</span>
    </div>
  </div>

  {/* HUD edges */}
  <div className="hudOverlay">
    <div className="top"></div>
    <div className="bottom"></div>
    <div className="left"></div>
    <div className="right"></div>
  </div>

  {/* HUD menu: moved to bottom in CSS */}
  <nav className="hudMenu">
    <Link to="/">Home</Link>
    <Link to="/slides">Brief</Link>
    <Link to="/timeline">Timeline</Link>
    <Link to="/assets">Assets</Link>
    <Link to="/contact">Contact</Link>
  </nav>
</header>
