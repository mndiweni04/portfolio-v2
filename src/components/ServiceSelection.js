'use client';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes, faRocket, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from '../app/styles/services.module.css';

export default function ServiceSelection({ services, addons }) {
    const router = useRouter();
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedAddons, setSelectedAddons] = useState({});
    const [isFastTrack, setIsFastTrack] = useState(false);

    // Modal Overlay System State Management
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (selectedPackage) {
                document.body.classList.add('overlay-active');
                document.body.style.overflow = 'hidden';
            } else {
                document.body.classList.remove('overlay-active');
                document.body.style.overflow = 'auto';
            }
        }
        return () => {
            if (typeof window !== 'undefined') {
                document.body.classList.remove('overlay-active');
                document.body.style.overflow = 'auto';
            }
        };
    }, [selectedPackage]);

    const handleSelectArchitecture = (pkg) => {
        setSelectedPackage(pkg);
        setSelectedAddons({});
        setIsFastTrack(false);
    };

    const toggleBooleanAddon = (addonId) => {
        setSelectedAddons(prev => {
            const current = { ...prev };
            if (current[addonId]) {
                delete current[addonId];
            } else {
                current[addonId] = 1;
            }
            return current;
        });
    };

    const handleScalarAddon = (addonId, action, maxLimit) => {
        setSelectedAddons(prev => {
            const current = { ...prev };
            const currentQty = current[addonId] || 0;
            
            if (action === 'increase' && currentQty < maxLimit) {
                current[addonId] = currentQty + 1;
            } else if (action === 'decrease' && currentQty > 0) {
                if (currentQty === 1) delete current[addonId];
                else current[addonId] = currentQty - 1;
            }
            return current;
        });
    };

    const handleConfirmAndProceed = () => {
        if (!selectedPackage) return;
        
        // Dynamically pull the exact timeline based on Fast-Track toggle
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

    return (
        <>
            <div className={`${styles['pricing-grid']} animate-fade`}>
                {services.map((service) => (
                    <div key={service.id} className={styles['pricing-card']}>
                        <h2 className={styles['tier-name']}>{service.name}</h2>
                        <p className={styles['tier-desc']}>{service.description}</p>
                        <div className={styles['tier-price']}>{service.price}</div>
                        <p style={{color: 'var(--profile-theme)', fontWeight: 'bold', marginBottom: '1rem'}}>
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

            {selectedPackage && (
                <div className={styles['modal-overlay']}>
                    <div className={styles['modal-content']} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                        <button className={styles['modal-close']} onClick={() => setSelectedPackage(null)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        
                        <h2 className={styles['modal-title']}>System Configuration</h2>
                        <p className={styles['modal-subtitle']}>Configure add-ons and delivery parameters for your {selectedPackage.name}.</p>

                        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid var(--profile-theme)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.3rem' }}><FontAwesomeIcon icon={faRocket} style={{ color: 'var(--profile-theme)', marginRight: '0.5rem' }} /> Priority Fast-Track</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    Reduces timeline to <strong>{selectedPackage.timelineFastTrack}</strong> by adjusting Commitment Fee to 25%.
                                </p>
                            </div>
                            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                                <input type="checkbox" checked={isFastTrack} onChange={(e) => setIsFastTrack(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                                <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: isFastTrack ? 'var(--profile-theme)' : 'rgba(255,255,255,0.2)', transition: '.4s', borderRadius: '34px' }}>
                                    <span style={{ position: 'absolute', content: '""', height: '18px', width: '18px', left: '4px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%', transform: isFastTrack ? 'translateX(24px)' : 'translateX(0)' }}></span>
                                </span>
                            </label>
                        </div>

                        {Object.entries(categorizedAddons).map(([category, items]) => (
                            <div key={category} style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>{category}</h4>
                                <div className={styles['modal-addons-list']} style={{ maxHeight: 'none', marginBottom: 0 }}>
                                    {items.map((addon) => {
                                        const isSelected = !!selectedAddons[addon.id];
                                        const qty = selectedAddons[addon.id] || 0;
                                        
                                        return (
                                            <div key={addon.id} className={`${styles['modal-addon-item']} ${isSelected ? styles['active'] : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: addon.type === 'boolean' ? 'pointer' : 'default' }} onClick={() => addon.type === 'boolean' && toggleBooleanAddon(addon.id)}>
                                                <div className={styles['modal-addon-info']}>
                                                    <div className={styles['modal-addon-header']}>
                                                        <span className={styles['modal-addon-name']}>{addon.name}</span>
                                                        <span className={styles['modal-addon-price']}>{addon.price}</span>
                                                    </div>
                                                    <p className={styles['modal-addon-desc']}>{addon.description}</p>
                                                </div>

                                                {addon.type === 'boolean' ? (
                                                    <input type="checkbox" checked={isSelected} readOnly className={styles['modal-checkbox']} />
                                                ) : (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(0,0,0,0.3)', padding: '0.4rem', borderRadius: '8px' }}>
                                                        <button onClick={(e) => { e.stopPropagation(); handleScalarAddon(addon.id, 'decrease'); }} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.2rem 0.5rem' }}><FontAwesomeIcon icon={faMinus} /></button>
                                                        <span style={{ color: '#fff', fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{qty}</span>
                                                        <button onClick={(e) => { e.stopPropagation(); handleScalarAddon(addon.id, 'increase', addon.maxLimit[selectedPackage.id]); }} style={{ background: 'transparent', border: 'none', color: 'var(--profile-theme)', cursor: 'pointer', padding: '0.2rem 0.5rem' }}><FontAwesomeIcon icon={faPlus} /></button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <div className={styles['modal-actions']} style={{ marginTop: '2rem' }}>
                            <button className={styles['modal-btn-secondary']} onClick={() => setSelectedPackage(null)}>Cancel</button>
                            <button className={styles['modal-btn-primary']} onClick={handleConfirmAndProceed}>Confirm & Initialize Protocol</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}