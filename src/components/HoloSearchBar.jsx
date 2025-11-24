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
    <form className="holo-searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit">
        Go
      </button>
    </form>
  );
}
