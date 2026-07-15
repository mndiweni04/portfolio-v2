/* src/app/contact/page.js */
import { Suspense } from 'react';
import ReachMe from '../../components/reachme';

export const metadata = { title: 'Contact Mandla' };

export default function ContactPage() {
    return (
        <Suspense fallback={
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                width: '100%'
            }}>
                <div className="loader" style={{
                    border: '4px solid var(--glass-border)',
                    borderTop: '4px solid var(--profile-theme)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    animation: 'spin 1s linear infinite'
                }} />
            </div>
        }>
            <ReachMe />
        </Suspense>
    );
}