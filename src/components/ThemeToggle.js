"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Check if running on client
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark"; // Default fallback for server
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="glass-button"
      suppressHydrationWarning 
      style={{ 
        position: "fixed", 
        bottom: "20px", 
        right: "20px", 
        zIndex: 100,
        padding: "10px 15px",
        fontSize: "1.2rem"
      }}
      aria-label="Toggle Dark/Light Mode"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}