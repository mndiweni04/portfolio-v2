"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    // Update the DOM to match the current theme state
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="glass-button"
      style={{ 
        position: "fixed", 
        bottom: "20px", 
        right: "20px", 
        zIndex: 100,
        padding: "10px 15px",
        fontSize: "1.2rem"
      }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}