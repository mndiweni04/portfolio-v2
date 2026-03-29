'use client';
import { useState } from 'react';
import styles from '../app/styles/reachme.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function ReachMe() {
    const [activeTab, setActiveTab] = useState('general'); 
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        serviceType: '',
        timeline: ''
    });
    
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            return "Name fields cannot be empty.";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return "Invalid email format.";
        }
        if (!formData.message.trim()) {
            return "Message payload cannot be empty.";
        }
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
        setStatus({ type: 'info', message: 'Executing transmission...' });

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    inquiryType: activeTab 
                }),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Transmission Verified. ✅' });
                setFormData({ firstName: '', lastName: '', email: '', message: '', serviceType: '', timeline: '' });
            } else {
                const result = await response.json();
                setStatus({ type: 'error', message: result.error || 'Server rejected the payload.' });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Network handshake failed.' });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        }
    };

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

            <form className={styles['contact-form']} onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
                    <button 
                        type="button"
                        onClick={() => setActiveTab('general')}
                        className={styles['btn-submit']}
                        style={{
                            flex: 1, margin: 0,
                            background: activeTab === 'general' ? 'var(--profile-theme)' : 'transparent',
                            color: activeTab === 'general' ? '#fff' : '#ccc'
                        }}
                    >
                        General Inquiry
                    </button>
                    <button 
                        type="button"
                        onClick={() => setActiveTab('project')}
                        className={styles['btn-submit']}
                        style={{
                            flex: 1, margin: 0,
                            background: activeTab === 'project' ? 'var(--profile-theme)' : 'transparent',
                            color: activeTab === 'project' ? '#fff' : '#ccc'
                        }}
                    >
                        Project Request
                    </button>
                </div>

                <div className={styles['row-group']}>
                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>First Name</label>
                        <input 
                            type="text" placeholder="Mandla" name="firstName" 
                            className={styles['form-input']}
                            value={formData.firstName || ''} onChange={handleChange} required 
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Last Name</label>
                        <input 
                            type="text" placeholder="Ndiweni" name="lastName" 
                            className={styles['form-input']}
                            value={formData.lastName || ''} onChange={handleChange} required 
                        />
                    </div>
                </div>
                
                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>Email Address</label>
                    <input 
                        type="email" placeholder="mndiweni04@gmail.com" name="email" 
                        className={styles['form-input']}
                        value={formData.email || ''} onChange={handleChange} required 
                    />
                </div>

                {activeTab === 'project' && (
                    <div className={styles['row-group']}>
                        <div className={styles['form-group']}>
                            <label className={styles['form-label']}>Service Required</label>
                            <select 
                                name="serviceType" value={formData.serviceType || ''} onChange={handleChange} required
                                className={styles['glass-select']}
                            >
                                <option value="" disabled style={{color: '#000'}}>Select Service...</option>
                                <option value="Frontend Web App" style={{color: '#000'}}>Frontend Web App</option>
                                <option value="Backend API" style={{color: '#000'}}>Backend API</option>
                                <option value="Fullstack Development" style={{color: '#000'}}>Fullstack Development</option>
                            </select>
                        </div>

                        <div className={styles['form-group']}>
                            <label className={styles['form-label']}>Target Timeline</label>
                            <select 
                                name="timeline" value={formData.timeline || ''} onChange={handleChange} required
                                className={styles['glass-select']}
                            >
                                <option value="" disabled style={{color: '#000'}}>Select Timeline...</option>
                                <option value="Less than 1 month" style={{color: '#000'}}>Less than 1 month</option>
                                <option value="1-3 months" style={{color: '#000'}}>1-3 months</option>
                                <option value="Flexible" style={{color: '#000'}}>Flexible</option>
                            </select>
                        </div>
                    </div>
                )}
                
                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>
                        {activeTab === 'project' ? "Project Brief" : "Message"}
                    </label>
                    <textarea 
                        placeholder={activeTab === 'project' ? "Briefly describe your project scope..." : "Your Message..."}
                        name="message" rows="5" className={styles['form-textarea']}
                        value={formData.message || ''} onChange={handleChange} required
                    ></textarea>
                </div>
                
                <button type="submit" className={styles['btn-submit']} disabled={isSubmitting}>
                    {isSubmitting ? 'Transmitting...' : 'Send Message'}
                </button>
                
                {status.message && (
                    <p style={{ color: status.type === 'error' ? '#ef4444' : '#38bdf8', fontWeight: 'bold', marginTop: '0.5rem', textAlign: 'center' }}>
                        {status.message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default ReachMe;