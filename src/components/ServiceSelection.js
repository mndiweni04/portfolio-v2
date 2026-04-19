'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from '../app/styles/services.module.css';

export default function ServiceSelection({ services, addons }) {
    const router = useRouter();
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedAddons, setSelectedAddons] = useState([]);

    const handleSelectArchitecture = (pkg) => {
        setSelectedPackage(pkg);
        setSelectedAddons([]); 
    };

    const toggleAddon = (addonId) => {
        setSelectedAddons(prev => 
            prev.includes(addonId) 
                ? prev.filter(id => id !== addonId)
                : [...prev, addonId]
        );
    };

    const handleConfirmAndProceed = () => {
        if (!selectedPackage) return;
        
        // Automate Timeline mapping
        let defaultTimeline = 'Flexible';
        if (['basic', 'starter'].includes(selectedPackage.id)) {
            defaultTimeline = 'Less than 1 month';
        } else if (['growth', 'enterprise'].includes(selectedPackage.id)) {
            defaultTimeline = '1-3 months';
        }
        
        let url = `/contact?package=${selectedPackage.id}&timeline=${encodeURIComponent(defaultTimeline)}`;
        if (selectedAddons.length > 0) {
            url += `&addons=${selectedAddons.join(',')}`;
        }
        
        router.push(url);
    };

    return (
        <>
            <div className={`${styles['pricing-grid']} animate-fade`}>
                {services.map((service) => (
                    <div key={service.id} className={styles['pricing-card']}>
                        <h2 className={styles['tier-name']}>{service.name}</h2>
                        <p className={styles['tier-desc']}>{service.description}</p>
                        <div className={styles['tier-price']}>{service.price}</div>
                        
                        <ul className={styles['tier-features']}>
                            {service.features.map((feature, idx) => (
                                <li key={idx}>
                                    <FontAwesomeIcon icon={faCheckCircle} className={styles['feature-icon']} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={() => handleSelectArchitecture(service)}
                            className={`${styles['service-btn']} ${service.isPrimary ? styles['primary'] : ''}`}
                        >
                            Select Architecture
                        </button>
                    </div>
                ))}
            </div>

            {selectedPackage && (
                <div className={styles['modal-overlay']}>
                    <div className={styles['modal-content']}>
                        <button className={styles['modal-close']} onClick={() => setSelectedPackage(null)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        
                        <h2 className={styles['modal-title']}>Customize Your {selectedPackage.name}</h2>
                        <p className={styles['modal-subtitle']}>Before proceeding to contact, select any optional add-ons to include in your project brief.</p>

                        <div className={styles['modal-addons-list']}>
                            {addons.map((addon) => (
                                <label key={addon.id} className={`${styles['modal-addon-item']} ${selectedAddons.includes(addon.id) ? styles['active'] : ''}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedAddons.includes(addon.id)}
                                        onChange={() => toggleAddon(addon.id)}
                                        className={styles['modal-checkbox']}
                                    />
                                    <div className={styles['modal-addon-info']}>
                                        <div className={styles['modal-addon-header']}>
                                            <span className={styles['modal-addon-name']}>{addon.name}</span>
                                            <span className={styles['modal-addon-price']}>{addon.price}</span>
                                        </div>
                                        <p className={styles['modal-addon-desc']}>{addon.description}</p>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <div className={styles['modal-actions']}>
                            <button className={styles['modal-btn-secondary']} onClick={() => setSelectedPackage(null)}>
                                Cancel
                            </button>
                            <button className={styles['modal-btn-primary']} onClick={handleConfirmAndProceed}>
                                {selectedAddons.length > 0 ? `Continue with ${selectedAddons.length} Add-on(s)` : 'Skip Add-ons & Continue'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}