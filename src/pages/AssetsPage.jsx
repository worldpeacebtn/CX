import React, { useEffect, useRef } from "react";
import assets from "../data/assets";

export default function AssetsPage() {
  const flickerRef = useRef(null);

  useEffect(() => {
    const flicker = flickerRef.current;
    if (!flicker) return;
    let running = true;

    const flickerEffect = () => {
      if (!running) return;
      flicker.style.opacity = 0.05 + Math.random() * 0.15;
      setTimeout(flickerEffect, 100 + Math.random() * 200);
    };
    flickerEffect();

    return () => { running = false; };
  }, []);

  return (
    <div className="page">
      <div className="flicker" ref={flickerRef}></div>

      <div className="input-container">
        <div className="input-content">
          <div className="content">
            <h1>Endangered Assets</h1>

            <table className="assetsTable">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Description</th>
                  <th>Value</th>
                  <th>Location</th>
                  <th>Risk</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((a, i) => (
                  <tr key={i}>
                    <td>{a.name}</td>
                    <td>{a.desc}</td>
                    <td>{a.value}</td>
                    <td>{a.loc}</td>
                    <td>{a.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="hint">
              Do not publish serial numbers publicly. Provide them only to trusted counsel.
            </p>
          </div>
        </div>
      </div>

      <nav className="bottom-menu">
        <button className="menu-btn">Home</button>
        <button className="menu-btn">About</button>
        <button className="menu-btn">Contact</button>
      </nav>
    </div>
  );
}
