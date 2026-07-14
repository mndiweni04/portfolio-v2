'use client';

import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes, faRocket, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from '../app/styles/services.module.css';

export default function ServiceSelection({ services, addons }) {
    const router = useRouter();
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedAddons, setSelectedAddons] = useState({});
    const [isFastTrack, setIsFastTrack] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Encapsulate and lock underlying document flow coordinates to stop Safari touch-drag leakage
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (selectedPackage) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            document.body.classList.add('overlay-active');
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.classList.remove('overlay-active');
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
            }
        }
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.classList.remove('overlay-active');
        };
    }, [selectedPackage]);

    const handleSelectArchitecture = (pkg) => {
        setSelectedPackage(pkg);
        setSelectedAddons({});
        setIsFastTrack(false);
    };

    const toggleBooleanAddon = (id) => {
        setSelectedAddons(prev => {
            const next = { ...prev };
            if (next[id]) {
                delete next[id];
            } else {
                next[id] = 1;
            }
            return next;
        });
    };

    const handleScalarAddon = (id, direction, maxLimit = 99) => {
        setSelectedAddons(prev => {
            const next = { ...prev };
            const currentQty = next[id] || 0;
            if (direction === 'increase') {
                if (currentQty < maxLimit) {
                    next[id] = currentQty + 1;
                }
            } else if (direction === 'decrease') {
                if (currentQty > 1) {
                    next[id] = currentQty - 1;
                } else {
                    delete next[id];
                }
            }
            return next;
        });
    };

    const handleConfirmAndProceed = () => {
        if (!selectedPackage) return;
        
        const calculatedTimeline = isFastTrack ? selectedPackage.timelineFastTrack : selectedPackage.timelineStandard;
        let url = `/contact?package=${selectedPackage.id}&timeline=${encodeURIComponent(calculatedTimeline)}&fasttrack=${isFastTrack}`;
        
        const addonStrings = Object.entries(selectedAddons).map(([id, qty]) => qty > 1 ? `${id}:${qty}` : id);
        if (addonStrings.length > 0) {
            url += `&addons=${addonStrings.join(',')}`;
        }
        
        router.push(url);
    };

    const filteredAddons = useMemo(() => {
        if (!selectedPackage) return [];
        return addons.filter(a => a.restrictedTo.includes(selectedPackage.id));
    }, [addons, selectedPackage]);

    const categorizedAddons = useMemo(() => {
        const categories = {};
        filteredAddons.forEach(a => {
            if (!categories[a.category]) categories[a.category] = [];
            categories[a.category].push(a);
        });
        return categories;
    }, [filteredAddons]);

    const renderModal = () => {
        if (!selectedPackage) return null;
        return (
            <div className={styles['modal-overlay']}>
                <div className={styles['modal-content']}>
                    <button className={styles['modal-close']} onClick={() => setSelectedPackage(null)} aria-label="Close configuration">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    
                    <h2 className={styles['modal-title']}>System Configuration</h2>
                    <p className={styles['modal-subtitle']}>Configure add-ons and delivery parameters for your {selectedPackage.name}.</p>
                    
                    <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid var(--profile-theme)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ flex: '1 1 280px' }}>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-color)', marginBottom: '0.3rem' }}>
                                <FontAwesomeIcon icon={faRocket} style={{ color: 'var(--profile-theme)', marginRight: '0.5rem' }} /> Priority Fast-Track
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>
                                Reduces timeline to <strong>{selectedPackage.timelineFastTrack}</strong> by adjusting Commitment Fee to 25%.
                            </p>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px', flexShrink: 0 }}>
                            <input type="checkbox" checked={isFastTrack} onChange={(e) => setIsFastTrack(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                            <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: isFastTrack ? 'var(--profile-theme)' : 'rgba(255,255,255,0.2)', transition: '.4s', borderRadius: '34px' }}>
                                <span style={{ position: 'absolute', content: '""', height: '18px', width: '18px', left: '4px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%', transform: isFastTrack ? 'translateX(24px)' : 'translateX(0)' }}></span>
                            </span>
                        </label>
                    </div>

                    {Object.entries(categorizedAddons).map(([category, items]) => (
                        <div key={category} style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                {category}
                            </h4>
                            <div className={styles['modal-addons-list']}>
                                {items.map((addon) => {
                                    const isSelected = !!selectedAddons[addon.id];
                                    const qty = selectedAddons[addon.id] || 0;
                                    
                                    return (
                                        <div key={addon.id} className={`${styles['modal-addon-item']} ${isSelected ? styles['active'] : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', cursor: addon.type === 'boolean' ? 'pointer' : 'default' }} onClick={() => addon.type === 'boolean' && toggleBooleanAddon(addon.id)}>
                                            <div className={styles['modal-addon-info']} style={{ flex: '1 1 200px' }}>
                                                <div className={styles['modal-addon-header']}>
                                                    <span className={styles['modal-addon-name']}>{addon.name}</span>
                                                    <span className={styles['modal-addon-price']}>{addon.price}</span>
                                                </div>
                                                <p className={styles['modal-addon-desc']}>{addon.description}</p>
                                            </div>
                                            {addon.type === 'boolean' ? (
                                                <input type="checkbox" checked={isSelected} readOnly className={styles['modal-checkbox']} style={{ flexShrink: 0 }} />
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(0,0,0,0.05)', padding: '0.4rem', borderRadius: '8px', flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                                                    <button type="button" onClick={(e) => { e.stopPropagation(); handleScalarAddon(addon.id, 'decrease'); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', cursor: 'pointer', padding: '0.2rem 0.5rem' }}>
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                    <span style={{ color: 'var(--text-color)', fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{qty}</span>
                                                    <button type="button" onClick={(e) => { e.stopPropagation(); handleScalarAddon(addon.id, 'increase', addon.maxLimit[selectedPackage.id]); }} style={{ background: 'transparent', border: 'none', color: 'var(--profile-theme)', cursor: 'pointer', padding: '0.2rem 0.5rem' }}>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div className={styles['modal-actions']}>
                        <button type="button" className={styles['modal-btn-secondary']} onClick={() => setSelectedPackage(null)}>Cancel</button>
                        <button type="button" className={styles['modal-btn-primary']} onClick={handleConfirmAndProceed}>Confirm & Initialize Protocol</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className={`${styles['pricing-grid']} animate-fade`}>
                {services.map((service) => (
                    <div key={service.id} className={styles['pricing-card']}>
                        <h2 className={styles['tier-name']}>{service.name}</h2>
                        <p className={styles['tier-desc']}>{service.description}</p>
                        <div className={styles['tier-price']}>{service.price}</div>
                        <p style={{ color: 'var(--profile-theme)', fontWeight: 'bold', marginBottom: '1rem' }}>
                            Timeline: {service.timelineStandard}
                        </p>
                        <ul className={styles['tier-features']}>
                            {service.features.map((feature, idx) => (
                                <li key={idx}>
                                    <FontAwesomeIcon icon={faCheckCircle} className={styles['feature-icon']} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => handleSelectArchitecture(service)} className={`${styles['service-btn']} ${service.isPrimary ? styles['primary'] : ''}`}>
                            Request Architecture
                        </button>
                    </div>
                ))}
            </div>
            {mounted && typeof document !== 'undefined' && selectedPackage
                ? createPortal(renderModal(), document.body)
                : null}
        </>
    );
}