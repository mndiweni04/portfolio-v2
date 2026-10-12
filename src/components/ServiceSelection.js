/* src/components/ServiceSelection.js */
'use client';

import { useState, useMemo, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimes,
  faRocket,
  faMinus,
  faPlus,
  faCode,
  faChartLine,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../app/styles/services.module.css';

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function ServiceSelection({ pillars, services, addons }) {
  const router = useRouter();
  const mounted = useIsMounted();
  const [activePillarId, setActivePillarId] = useState('telemetry');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState({});
  const [isFastTrack, setIsFastTrack] = useState(false);

  // Lock background scroll when modal is active
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

  const activePillar = useMemo(() => {
    return pillars.find((p) => p.id === activePillarId) || pillars[0];
  }, [pillars, activePillarId]);

  const displayedServices = useMemo(() => {
    return services.filter((s) => s.pillarId === activePillarId);
  }, [services, activePillarId]);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setSelectedAddons({});
    setIsFastTrack(false);
  };

  const toggleBooleanAddon = (id) => {
    setSelectedAddons((prev) => {
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
    setSelectedAddons((prev) => {
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

    const calculatedTimeline =
      isFastTrack && selectedPackage.timelineFastTrack !== 'N/A'
        ? selectedPackage.timelineFastTrack
        : selectedPackage.timelineStandard;

    let url = `/contact?package=${selectedPackage.id}&timeline=${encodeURIComponent(
      calculatedTimeline
    )}&fasttrack=${isFastTrack}`;

    const addonStrings = Object.entries(selectedAddons).map(([id, qty]) =>
      qty > 1 ? `${id}:${qty}` : id
    );
    if (addonStrings.length > 0) {
      url += `&addons=${addonStrings.join(',')}`;
    }

    router.push(url);
  };

  const filteredAddons = useMemo(() => {
    if (!selectedPackage) return [];
    return addons.filter((a) => a.restrictedTo.includes(selectedPackage.id));
  }, [addons, selectedPackage]);

  const categorizedAddons = useMemo(() => {
    const categories = {};
    filteredAddons.forEach((a) => {
      if (!categories[a.category]) categories[a.category] = [];
      categories[a.category].push(a);
    });
    return categories;
  }, [filteredAddons]);

  const getPillarIcon = (id) => {
    switch (id) {
      case 'engineering':
        return faCode;
      case 'telemetry':
        return faChartLine;
      case 'growth':
        return faBullhorn;
      default:
        return faCode;
    }
  };

  const renderModal = () => {
    if (!selectedPackage) return null;
    const allowsFastTrack =
      selectedPackage.billingModel === 'fixed' &&
      selectedPackage.timelineFastTrack !== 'N/A';

    return (
      <div className={styles['modal-overlay']}>
        <div className={styles['modal-content']}>
          <button
            className={styles['modal-close']}
            onClick={() => setSelectedPackage(null)}
            aria-label="Close configuration"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <h2 className={styles['modal-title']}>Service Intake Specification</h2>
          <p className={styles['modal-subtitle']}>
            Review parameters for <strong>{selectedPackage.name}</strong>. ({selectedPackage.billingCadence})
          </p>

          {allowsFastTrack && (
            <div
              style={{
                marginBottom: '2rem',
                padding: '1.25rem',
                background: 'rgba(56, 189, 248, 0.05)',
                border: '1px solid var(--profile-theme)',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ flex: '1 1 280px' }}>
                <label
                  htmlFor="priority-fasttrack-toggle"
                  style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-color)',
                    marginBottom: '0.3rem',
                    cursor: 'pointer',
                    display: 'block',
                    fontWeight: 700,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRocket}
                    style={{
                      color: 'var(--profile-theme)',
                      marginRight: '0.5rem',
                    }}
                  />
                  Priority Fast-Track
                </label>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                >
                  Accelerates delivery to{' '}
                  <strong>{selectedPackage.timelineFastTrack}</strong> by adjusting
                  the initial scheduling deposit to 25%.
                </p>
              </div>
              <input
                id="priority-fasttrack-toggle"
                type="checkbox"
                role="switch"
                aria-label="Priority Fast-Track"
                aria-checked={isFastTrack}
                checked={isFastTrack}
                onChange={(e) => setIsFastTrack(e.target.checked)}
                className={styles['fast-track-toggle']}
              />
            </div>
          )}

          {Object.keys(categorizedAddons).length > 0 ? (
            Object.entries(categorizedAddons).map(([category, items]) => (
              <div key={category} style={{ marginBottom: '1.5rem' }}>
                <h4
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '1rem',
                    borderBottom: '1px solid var(--glass-border)',
                    paddingBottom: '0.5rem',
                  }}
                >
                  {category}
                </h4>
                <div className={styles['modal-addons-list']}>
                  {items.map((addon) => {
                    const isSelected = !!selectedAddons[addon.id];
                    const qty = selectedAddons[addon.id] || 0;

                    return (
                      <div
                        key={addon.id}
                        className={`${styles['modal-addon-item']} ${
                          isSelected ? styles['active'] : ''
                        }`}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '1rem',
                          flexWrap: 'wrap',
                          cursor:
                            addon.type === 'boolean' ? 'pointer' : 'default',
                        }}
                        onClick={() =>
                          addon.type === 'boolean' &&
                          toggleBooleanAddon(addon.id)
                        }
                      >
                        <div
                          className={styles['modal-addon-info']}
                          style={{ flex: '1 1 200px' }}
                        >
                          <div className={styles['modal-addon-header']}>
                            <span className={styles['modal-addon-name']}>
                              {addon.name}
                            </span>
                            <span className={styles['modal-addon-price']}>
                              {addon.price}
                            </span>
                          </div>
                          <p className={styles['modal-addon-desc']}>
                            {addon.description}
                          </p>
                        </div>
                        {addon.type === 'boolean' ? (
                          <input
                            type="checkbox"
                            id={`addon-${addon.id}`}
                            aria-label={`Select ${addon.name}`}
                            checked={isSelected}
                            onChange={() => toggleBooleanAddon(addon.id)}
                            className={styles['modal-checkbox']}
                            style={{ flexShrink: 0 }}
                          />
                        ) : (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.8rem',
                              background: 'rgba(0,0,0,0.05)',
                              padding: '0.4rem',
                              borderRadius: '8px',
                              flexShrink: 0,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleScalarAddon(addon.id, 'decrease');
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-color)',
                                cursor: 'pointer',
                                padding: '0.2rem 0.5rem',
                              }}
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span
                              style={{
                                color: 'var(--text-color)',
                                fontWeight: 'bold',
                                width: '20px',
                                textAlign: 'center',
                              }}
                            >
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleScalarAddon(
                                  addon.id,
                                  'increase',
                                  addon.maxLimit[selectedPackage.id]
                                );
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--profile-theme)',
                                cursor: 'pointer',
                                padding: '0.2rem 0.5rem',
                              }}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)',
                marginBottom: '2rem',
              }}
            >
              <h4
                style={{
                  color: 'var(--text-color)',
                  margin: '0 0 0.5rem 0',
                  fontSize: '1rem',
                }}
              >
                Contracted Deliverables Included
              </h4>
              <ul
                style={{
                  paddingLeft: '1.25rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                }}
              >
                {selectedPackage.deliverables.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles['modal-actions']}>
            <button
              type="button"
              className={styles['modal-btn-secondary']}
              onClick={() => setSelectedPackage(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles['modal-btn-primary']}
              onClick={handleConfirmAndProceed}
            >
              Proceed to Intake Brief
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Pillar Selection Tabs */}
      <div className={styles['pillar-nav-wrapper']}>
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            type="button"
            className={`${styles['pillar-tab-btn']} ${
              activePillarId === pillar.id ? styles['active'] : ''
            }`}
            onClick={() => setActivePillarId(pillar.id)}
          >
            <FontAwesomeIcon icon={getPillarIcon(pillar.id)} />
            {pillar.name}
          </button>
        ))}
      </div>

      {/* Pillar Strategic Description */}
      <div className={`${styles['pillar-summary-banner']} animate-fade`}>
        <span className={styles['pillar-badge']}>{activePillar.badge}</span>
        <h2 className={styles['pillar-title']}>{activePillar.name}</h2>
        <p className={styles['pillar-desc']}>{activePillar.description}</p>
      </div>

      {/* Services Grid */}
      <div className={`${styles['pricing-grid']} animate-fade`}>
        {displayedServices.map((service) => (
          <div
            key={service.id}
            className={`${styles['pricing-card']} ${
              service.isPrimary ? styles['featured'] : ''
            }`}
          >
            <span className={styles['billing-cadence-tag']}>
              {service.billingCadence}
            </span>
            <h3 className={styles['tier-name']}>{service.name}</h3>
            <p className={styles['tier-desc']}>{service.description}</p>
            <div className={styles['tier-price']}>{service.price}</div>
            <p
              style={{
                color: 'var(--profile-theme)',
                fontWeight: 'bold',
                marginBottom: '1.25rem',
                fontSize: '0.9rem',
              }}
            >
              Delivery Cycle: {service.timelineStandard}
            </p>
            <ul className={styles['tier-features']}>
              {service.features.map((feature, idx) => (
                <li key={idx}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={styles['feature-icon']}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSelectPackage(service)}
              className={`${styles['service-btn']} ${
                service.isPrimary ? styles['primary'] : ''
              }`}
            >
              {service.billingModel === 'retainer'
                ? 'Engage Retainer'
                : 'Request Architecture'}
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