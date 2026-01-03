'use client'; 
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import '../app/styles/navbar.css'; 

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                const currentScrollY = window.scrollY;

                // Always show navbar if at the very top (or scrolling up)
                if (currentScrollY < 10) { 
                     setShowNavbar(true);
                } else if (currentScrollY > lastScrollY) {
                    setShowNavbar(false); // Hide on scroll down
                } else {
                    setShowNavbar(true); // Show on scroll up
                }
                setLastScrollY(currentScrollY);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", controlNavbar);
            return () => {
                window.removeEventListener("scroll", controlNavbar);
            };
        }
    }, [lastScrollY]);

    const isActive = (path) => pathname === path ? "active-link" : "";

    return (
        <nav className={`navbar ${showNavbar ? 'visible' : 'hidden'}`}>
            <Link href="/" className={isActive('/')}>Home</Link>
            <Link href="/about" className={isActive('/about')}>About Me</Link>
            <Link href="/projects" className={isActive('/projects')}>Projects</Link>
            <Link href="/tools" className={isActive('/tools')}>Tech Stack</Link>
            <Link href="/contact" className={isActive('/contact')}>Contact</Link>
        </nav>
    );
};

export default Navbar;