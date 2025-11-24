import React, { useState } from "react";
import "./HoloSearchBar.css";

export default function HoloSearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: "0.25rem",
          border: "1px solid #888",
          outline: "none",
          z-index: 22,
          position: "absolute"
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          background: "#0ff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Go
      </button>
    </form>
  );
}
