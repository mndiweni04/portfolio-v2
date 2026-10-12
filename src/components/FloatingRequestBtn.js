/* src/components/FloatingRequestBtn.js */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function FloatingRequestBtn() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const handleTabChange = (e) => {
      setActiveTab(e.detail);
    };
    window.addEventListener('reachme-tab-change', handleTabChange);
    return () => window.removeEventListener('reachme-tab-change', handleTabChange);
  }, []);

  if (pathname === '/services') {
    return null;
  }

  if (pathname === '/contact') {
    const hasPackageQuery =
      typeof window !== 'undefined' &&
      Boolean(new URLSearchParams(window.location.search).get('package'));

    if (hasPackageQuery || activeTab === 'project') {
      return null;
    }
  }

  return (
    <Link
      href="/services"
      className="glass-button"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 100,
        height: '50px',
        padding: '0 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '30px',
        cursor: 'pointer',
        transition:
          'transform 0.2s ease, box-shadow 0.3s ease, bottom 0.2s ease, right 0.2s ease',
        backgroundColor: 'var(--profile-theme)',
        color: '#fff',
        boxShadow: '0 4px 15px rgba(56, 189, 248, 0.4)',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '0.9rem',
        whiteSpace: 'nowrap',
        maxWidth: 'calc(100vw - 40px)',
      }}
      title="Request Architecture"
      aria-label="Request Architecture"
    >
      Request Architecture
    </Link>
  );
}