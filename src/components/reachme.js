'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../app/styles/reachme.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function FormComponent() {
    const searchParams = useSearchParams();
    
    const [formMode, setFormMode] = useState('general'); 
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        serviceType: 'frontend-mvp',
        timeline: ''
    });
    
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const service = searchParams.get('service');
        if (service) {
            setFormMode('service');
            setFormData(prev => ({ ...prev, serviceType: service }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: 'info', message: 'Sending...' });

        // STRUCTURAL FIX: Payload now directly matches the required parameters of src/app/api/send-email/route.js
        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            projectScope: formData.message,
            serviceType: formMode === 'service' ? formData.serviceType : 'General Inquiry',
            timeline: formMode === 'service' ? formData.timeline : 'N/A'
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message Sent Successfully! ✅' });
                setFormData({ firstName: '', lastName: '', email: '', message: '', serviceType: 'frontend-mvp', timeline: '' }); 
            } else {
                const result = await response.json();
                setStatus({ type: 'error', message: result.error || 'Failed to send.' });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Network Error.' });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        }
    };

    return (
        <form className={styles['contact-form']} onSubmit={handleSubmit}>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
                <button 
                    type="button"
                    onClick={() => setFormMode('general')}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '5px', border: 'none', background: formMode === 'general' ? 'var(--profile-theme)' : 'transparent', color: formMode === 'general' ? '#fff' : 'var(--text-color)', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    General Inquiry
                </button>
                <button 
                    type="button"
                    onClick={() => setFormMode('service')}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '5px', border: 'none', background: formMode === 'service' ? 'var(--profile-theme)' : 'transparent', color: formMode === 'service' ? '#fff' : 'var(--text-color)', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Project / Service Request
                </button>
            </div>

            <div className={styles['row-group']}>
                <input 
                    className={styles['form-input']}
                    type="text" placeholder="First Name" name="firstName" 
                    value={formData.firstName} onChange={handleChange} required 
                />
                <input 
                    className={styles['form-input']}
                    type="text" placeholder="Last Name" name="lastName" 
                    value={formData.lastName} onChange={handleChange} required 
                />
            </div>
            
            <input 
                className={styles['form-input']}
                type="email" placeholder="Email Address" name="email" 
                value={formData.email} onChange={handleChange} required 
            />

            {formMode === 'service' && (
                <div className={styles['row-group']} style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    <select name="serviceType" value={formData.serviceType} onChange={handleChange} required className={styles['glass-select']}>
                        <option value="frontend-mvp">Frontend Web App</option>
                        <option value="fullstack-system">Full-Stack System</option>
                        <option value="mobile-app">Mobile App (React Native)</option>
                        <option value="tech-consult">General Consultation</option>
                    </select>
                    <select name="timeline" value={formData.timeline} onChange={handleChange} required className={styles['glass-select']}>
                        <option value="" disabled>Select Timeline...</option>
                        <option value="immediate">1-2 Weeks</option>
                        <option value="standard">3-4 Weeks</option>
                        <option value="relaxed">1+ Months</option>
                    </select>
                </div>
            )}
            
            <textarea 
                className={styles['form-textarea']}
                placeholder={formMode === 'general' ? "Your Message..." : "Briefly describe your project scope and requirements..."}
                name="message" rows="5" 
                value={formData.message} onChange={handleChange} required
            ></textarea>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className={styles['btn-submit']} disabled={isSubmitting} style={{ flex: 1, opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </div>
            
            {status.message && (
                <p style={{ color: status.type === 'error' ? '#ef4444' : '#38bdf8', fontWeight: 'bold', marginTop: '0.5rem', textAlign: 'center' }}>
                    {status.message}
                </p>
            )}
        </form>
    );
}

function ReachMe() {
    return (
        <div className={styles['reachme-container']}>
            <div className={styles['contact-info']}>
                <div className={styles['info-group']}>
                    <h1 className={styles['section-title']}>Follow</h1>
                    <div className={styles['info-item']}>
                        <FontAwesomeIcon icon={faGithub}/>
                        <a href="https://github.com/mndiweni04" target="_blank" rel="noreferrer" className={styles['info-link']}>mndiweni04</a>
                    </div>
                    <div className={styles['info-item']}>
                        <FontAwesomeIcon icon={faLinkedin}/>
                        <a href="https://www.linkedin.com/in/mandla-ndiweni-74a35a2a1/" target="_blank" rel="noreferrer" className={styles['info-link']}>Mandla Ndiweni</a>
                    </div>
                </div>

                <div className={styles['info-group']}>
                    <h1 className={styles['section-title']}>Contact</h1>
                    <div className={styles['info-item']}>
                        <FontAwesomeIcon icon={faPhone}/>
                        <span>(+27) 81-796-6625</span>
                    </div>
                    <div className={styles['info-item']}>
                        <FontAwesomeIcon icon={faEnvelope}/>
                        <span>mndiweni04@gmail.com</span>
                    </div>
                    <div className={styles['info-item']}>
                        <FontAwesomeIcon icon={faMapLocationDot}/>
                        <span>Johannesburg, South Africa</span>
                    </div>
                </div>
            </div>

            <Suspense fallback={<div style={{ color: 'var(--text-color)' }}>Loading Form...</div>}>
                <FormComponent />
            </Suspense>
        </div>
    );
}

export default ReachMe;