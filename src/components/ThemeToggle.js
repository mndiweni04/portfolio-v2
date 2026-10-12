/* src/components/ThemeToggle.js */
'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

const themeListeners = new Set();
function subscribeTheme(callback) {
  themeListeners.add(callback);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', callback);
  }
  return () => {
    themeListeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', callback);
    }
  };
}

function getThemeSnapshot() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') || 'dark';
  }
  return 'dark';
}

function setThemeGlobal(newTheme) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }
  themeListeners.forEach((listener) => listener());
}

export default function ThemeToggle() {
  const mounted = useIsMounted();
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeGlobal(nextTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="glass-button"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 100,
        width: '50px',
        height: '50px',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        flexShrink: 0,
      }}
      aria-label="Toggle Dark/Light Mode"
    >
      {theme === 'dark' ? (
        <FontAwesomeIcon icon={faSun} style={{ color: '#FDB813', fontSize: '1.25rem' }} />
      ) : (
        <FontAwesomeIcon icon={faMoon} style={{ color: '#64748b', fontSize: '1.25rem' }} />
      )}
    </button>
  );
}