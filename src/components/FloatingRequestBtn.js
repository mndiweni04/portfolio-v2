'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingRequestBtn() {
  const pathname = usePathname();

  // Prevent redundant routing by unmounting the CTA on the target destination
  if (pathname === '/services') {
    return null;
  }

  return (
    <Link 
      href="/services"
      className="glass-button"
      style={{ 
        position: "fixed", 
        bottom: "20px", 
        right: "20px", 
        zIndex: 100,
        height: "50px",
        padding: "0 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "30px",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.3s ease",
        backgroundColor: "var(--profile-theme)",
        color: "#fff",
        boxShadow: "0 4px 15px rgba(56, 189, 248, 0.4)",
        textDecoration: "none",
        fontWeight: "700",
        fontSize: "0.95rem",
        whiteSpace: "nowrap"
      }}
      title="Request Architecture"
      aria-label="Request Architecture"
    >
      Request Architecture
    </Link>
  );
}