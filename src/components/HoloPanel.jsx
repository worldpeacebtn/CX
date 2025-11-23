// src/components/HoloPanel.jsx
import "./HoloPanel.css";

export default function HoloPanel({ children }) {
  return (
    <div className="holoPanelWrap">
      <div className="holoPanel">
        {children}
      </div>
    </div>
  );
}
