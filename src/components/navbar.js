'use client'; 
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import styles from '../app/styles/navbar.module.css'; 

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    const controlNavbar = useCallback(() => {
        if (typeof window !== 'undefined') {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10) { 
                 setShowNavbar(true);
            } else if (currentScrollY > lastScrollY) {
                setShowNavbar(false); 
            } else {
                setShowNavbar(true); 
            }
            setLastScrollY(currentScrollY);
        }
    }, [lastScrollY]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", controlNavbar);
            return () => {
                window.removeEventListener("scroll", controlNavbar);
            };
        }
    }, [controlNavbar]);

    const isActive = (path) => pathname === path ? styles['active-link'] : "";

    return (
        <nav className={`${styles.navbar} ${showNavbar ? styles.visible : styles.hidden}`}>
            <Link href="/" className={isActive('/')}>Home</Link>
            <Link href="/about" className={isActive('/about')}>About Me</Link>
            <Link href="/projects" className={isActive('/projects')}>Projects</Link>
            <Link href="/services" className={isActive('/services')}>Services</Link>
            <Link href="/tools" className={isActive('/tools')}>Tech Stack</Link>
            <Link href="/contact" className={isActive('/contact')}>Contact</Link>
        </nav>
    );
};

export default Navbar;