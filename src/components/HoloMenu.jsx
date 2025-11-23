// src/components/HoloMenu.jsx
import { Link, useLocation } from "react-router-dom";
import "./HoloMenu.css";

export default function HoloMenu() {
  const location = useLocation();

  const links = [
    { to: "/", label: "HOME", icon: "⌂" },
    { to: "/slides", label: "BRIEF", icon: "✦" },
    { to: "/timeline", label: "TIMELINE", icon: "⧖" },
    { to: "/assets", label: "ASSETS", icon: "◆" },
    { to: "/contact", label: "CONTACT", icon: "✉" },
  ];

  return (
    <nav className="holoMenu">
      <div className="holoDock">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={
              location.pathname === l.to ? "holoBtn active" : "holoBtn"
            }
          >
            <span className="icon">{l.icon}</span>
            <span className="label">{l.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
