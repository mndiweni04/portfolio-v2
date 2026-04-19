'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

export default function FloatingRequestBtn() {
  return (
    <Link 
      href="/services"
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
        transition: "transform 0.2s ease, box-shadow 0.3s ease",
        backgroundColor: "var(--profile-theme)",
        color: "#fff",
        boxShadow: "0 4px 15px rgba(56, 189, 248, 0.4)",
        textDecoration: "none"
      }}
      title="Request Architecture"
      aria-label="Request Architecture"
    >
      <FontAwesomeIcon icon={faRocket} style={{ fontSize: "1.2rem" }} />
    </Link>
  );
}