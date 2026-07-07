/* src/components/navbar.js */
'use client';
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from '../app/styles/navbar.module.css';

const Navbar = () => {
        const [showNavbar, setShowNavbar] = useState(true);
        const lastScrollY = useRef(0);
        const pathname = usePathname();

        const controlNavbar = useCallback(() => {
                if (typeof window !== 'undefined') {
                        const currentScrollY = window.scrollY;
                        const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
                        if (currentScrollY < 10) {
                                setShowNavbar(true);
                        } else if (scrollDelta > 10) {
                                if (currentScrollY > lastScrollY.current) {
                                        setShowNavbar(false);
                                } else {
                                        setShowNavbar(true);
                                }
                        }
                        lastScrollY.current = currentScrollY;
                }
        }, []);

        useEffect(() => {
                if (typeof window !== 'undefined') {
                        window.addEventListener("scroll", controlNavbar, { passive: true });
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
                        <Link href="/tools" className={isActive('/tools')}>Tech Stack</Link>
                        <Link href="/contact" className={isActive('/contact')}>Contact</Link>
                </nav>
        );
};

export default Navbar;