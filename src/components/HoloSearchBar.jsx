import { useState } from "react";
import "./HoloSearchBar.css";

export default function HoloSearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form className="holo-searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search CX..."
        value={query}
        onChange={handleChange}
      />
      <button type="submit">🔍</button>
    </form>
  );
}
