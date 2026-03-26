"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  if (!theme) {
    return null;
  }

  return (
    <button 
      onClick={toggleTheme} 
      className="glass-button"
      style={{ 
        position: "fixed", 
        bottom: "20px", 
        right: "20px", 
        zIndex: 100,
        width: "50px",
        height: "50px",
        padding: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        cursor: "pointer",
        transition: "transform 0.2s ease"
      }}
      aria-label="Toggle Dark/Light Mode"
    >
      {theme === "dark" ? (
         <FontAwesomeIcon icon={faSun} style={{ color: "#FDB813", fontSize: "1.4rem" }} />
      ) : (
         <FontAwesomeIcon icon={faMoon} style={{ color: "#64748b", fontSize: "1.4rem" }} />
      )}
    </button>
  );
}