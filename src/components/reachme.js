'use client';
import { useState, useEffect } from 'react';
import styles from '../app/styles/reachme.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function ReachMe() {
    const [activeTab, setActiveTab] = useState('general'); 
    const [isPrefilled, setIsPrefilled] = useState(false);
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        serviceType: '',
        timeline: '',
        addons: '',
        rawAddonIds: '',
        isFastTrack: false
    });
    
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const packageId = params.get('package');
            const addonsParam = params.get('addons');
            const projectId = params.get('project');
            const timelineParam = params.get('timeline');
            const fastTrackParam = params.get('fasttrack');

            let prefillMessage = '';

            if (projectId) {
                setActiveTab('project');
                prefillMessage += `I am interested in commissioning a system similar to your past project: [${decodeURIComponent(projectId)}].\n\n`;
            }

            if (packageId) {
                setActiveTab('project');
                setIsPrefilled(true);
                const displayNames = {
                    basic: "Basic Webpage",
                    starter: "Starter (MVP)",
                    growth: "Growth (Custom)",
                    enterprise: "Enterprise"
                };
                setFormData(prev => ({ ...prev, serviceType: packageId, displayServiceType: displayNames[packageId] || packageId }));
            }

            if (timelineParam) {
                setFormData(prev => ({ ...prev, timeline: decodeURIComponent(timelineParam) }));
            }

            if (fastTrackParam === 'true') {
                setFormData(prev => ({ ...prev, isFastTrack: true }));
            }

            if (addonsParam) {
                // Parse scalar values: "additionalPages:2,shareCode" -> "Additional Pages (x2), Share Code"
                const readableAddons = addonsParam.split(',').map(a => {
                    const parts = a.split(':');
                    const name = parts[0].replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase());
                    return parts.length > 1 ? `${name} (x${parts[1]})` : name;
                }).join(', ');
                
                setFormData(prev => ({ ...prev, addons: readableAddons, rawAddonIds: addonsParam }));
            }

            if (prefillMessage) {
                setFormData(prev => ({ ...prev, message: prefillMessage }));
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.firstName.trim() || !formData.lastName.trim()) return "Name fields cannot be empty.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) return "Invalid email format.";
        if (!formData.message.trim() && !isPrefilled) return "Message payload cannot be empty.";
        if (activeTab === 'project') {
            if (!formData.serviceType) return "Please select a required service architecture.";
            if (!formData.timeline) return "Please select a target timeline.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setStatus({ type: 'error', message: validationError });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: 'info', message: 'Generating legal artifacts and executing transmission...' });

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, inquiryType: activeTab }),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Transmission Verified. ✅ Check your email for Staging Documents.' });
                setFormData({ firstName: '', lastName: '', email: '', message: '', serviceType: '', timeline: '', addons: '', rawAddonIds: '', displayServiceType: '', isFastTrack: false });
                setIsPrefilled(false);
            } else {
                const result = await response.json();
                setStatus({ type: 'error', message: result.error || 'Server rejected the payload.' });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Network handshake failed.' });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 7000);
        }
    };

    return (
        <div className={styles['reachme-container']}>
            {/* Same layout for Contact Info sidebar... */}
            <div className={styles['contact-info']}>
                <div className={styles['info-group']}>
                    <h1 className={styles['section-title']}>Follow</h1>
                    <div className={styles['info-item']}><FontAwesomeIcon icon={faGithub}/><a href="https://github.com/mndiweni04" target="_blank" rel="noreferrer" className={styles['info-link']}>mndiweni04</a></div>
                    <div className={styles['info-item']}><FontAwesomeIcon icon={faLinkedin}/><a href="https://www.linkedin.com/in/mandla-ndiweni-74a35a2a1/" target="_blank" rel="noreferrer" className={styles['info-link']}>Mandla Ndiweni</a></div>
                </div>
                <div className={styles['info-group']}>
                    <h1 className={styles['section-title']}>Contact</h1>
                    <div className={styles['info-item']}><FontAwesomeIcon icon={faPhone}/><span>(+27) 81-796-6625</span></div>
                    <div className={styles['info-item']}><FontAwesomeIcon icon={faEnvelope}/><span>mndiweni04@gmail.com</span></div>
                    <div className={styles['info-item']}><FontAwesomeIcon icon={faMapLocationDot}/><span>Johannesburg, South Africa</span></div>
                </div>
            </div>

            <form className={styles['contact-form']} onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
                    <button type="button" onClick={() => setActiveTab('general')} className={styles['btn-submit']} style={{ flex: 1, margin: 0, background: activeTab === 'general' ? 'var(--profile-theme)' : 'transparent', color: activeTab === 'general' ? '#fff' : '#ccc', cursor: 'pointer' }}>General Inquiry</button>
                    <button type="button" onClick={() => setActiveTab('project')} className={styles['btn-submit']} style={{ flex: 1, margin: 0, background: activeTab === 'project' ? 'var(--profile-theme)' : 'transparent', color: activeTab === 'project' ? '#fff' : '#ccc', cursor: 'pointer' }}>Project Request</button>
                </div>

                <div className={styles['row-group']}>
                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>First Name</label>
                        <input type="text" placeholder="Mandla" name="firstName" className={styles['form-input']} value={formData.firstName || ''} onChange={handleChange} required />
                    </div>
                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Last Name</label>
                        <input type="text" placeholder="Ndiweni" name="lastName" className={styles['form-input']} value={formData.lastName || ''} onChange={handleChange} required />
                    </div>
                </div>
                
                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>Email Address</label>
                    <input type="email" placeholder="mndiweni04@gmail.com" name="email" className={styles['form-input']} value={formData.email || ''} onChange={handleChange} required />
                </div>

                {activeTab === 'project' && (
                    <div className={styles['row-group']}>
                        <div className={styles['form-group']}>
                            <label className={styles['form-label']}>Architecture Required</label>
                            {isPrefilled ? (
                                <div className={styles['readonly-badge']}>{formData.displayServiceType}</div>
                            ) : (
                                <select name="serviceType" value={formData.serviceType || ''} onChange={handleChange} required className={styles['glass-select']}>
                                    <option value="" disabled style={{color: '#000'}}>Select Architecture...</option>
                                    <option value="basic" style={{color: '#000'}}>Basic Webpage</option>
                                    <option value="starter" style={{color: '#000'}}>Starter (MVP)</option>
                                    <option value="growth" style={{color: '#000'}}>Growth (Custom)</option>
                                    <option value="enterprise" style={{color: '#000'}}>Enterprise</option>
                                </select>
                            )}
                        </div>
                        <div className={styles['form-group']}>
                            <label className={styles['form-label']}>Target Timeline</label>
                            {isPrefilled ? (
                                <div className={styles['readonly-badge']}>{formData.timeline}</div>
                            ) : (
                                <select name="timeline" value={formData.timeline || ''} onChange={handleChange} required className={styles['glass-select']}>
                                    <option value="" disabled style={{color: '#000'}}>Select Timeline...</option>
                                    <option value="Less than 1 month" style={{color: '#000'}}>Less than 1 month</option>
                                    <option value="1-3 months" style={{color: '#000'}}>1-3 months</option>
                                    <option value="Flexible" style={{color: '#000'}}>Flexible</option>
                                </select>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'project' && formData.addons && (
                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Selected Add-ons</label>
                        <div className={styles['readonly-badge']}>{formData.addons}</div>
                    </div>
                )}
                
                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>{activeTab === 'project' ? "Additional Information" : "Message"}</label>
                    <textarea placeholder={activeTab === 'project' ? "Provide any additional project details..." : "Your Message..."} name="message" rows="5" className={styles['form-textarea']} value={formData.message || ''} onChange={handleChange} required={!isPrefilled}></textarea>
                </div>
                
                <button type="submit" className={styles['btn-submit']} disabled={isSubmitting}>
                    {isSubmitting ? 'Transmitting...' : 'Send Message'}
                </button>
                
                {status.message && <p style={{ color: status.type === 'error' ? '#ef4444' : '#38bdf8', fontWeight: 'bold', marginTop: '0.5rem', textAlign: 'center' }}>{status.message}</p>}
            </form>
        </div>
    );
}

export default ReachMe;