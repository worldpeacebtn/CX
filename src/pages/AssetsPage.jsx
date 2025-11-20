import React from "react";
import assets from "../data/assets";
import QuantumBg from './components/QuantumBg';

export default function AssetsPage() {
  return (
    <div className="page">
      <h2>Endangered Assets</h2>
      <table className="assetsTable">
        <thead><tr><th>Asset</th><th>Description</th><th>Value</th><th>Location</th><th>Risk</th></tr></thead>
        <tbody>
          {assets.map((a, i) => (
            <tr key={i}><td>{a.name}</td><td>{a.desc}</td><td>{a.value}</td><td>{a.loc}</td><td>{a.risk}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="hint">Do not publish serial numbers publicly. Provide them only to trusted counsel.</p>
    </div>
  );
}
