'use client';
import { useState } from 'react';
import '../app/styles/reachme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function ReachMe() {
    const [activeTab, setActiveTab] = useState('general'); // 'general' or 'project'
    
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

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        // Reset conditional fields when switching tabs to prevent data contamination
        setFormData(prev => ({ ...prev, serviceType: '', timeline: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: 'info', message: 'Sending...' });

        // Construct payload mapping matching the server expectations
        const payload = {
            ...formData,
            inquiryType: activeTab 
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message Sent! ✅' });
                setFormData({ firstName: '', lastName: '', email: '', message: '', serviceType: '', timeline: '' });
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
        <div className="reachme-container">
            {/* Left Side Info */}
            <div className="contact-info">
                <div className="info-group">
                    <h1 className="section-title">Follow</h1>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faGithub}/>
                        <a href="https://github.com/mndiweni04" target="_blank" rel="noreferrer">mndiweni04</a>
                    </div>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faLinkedin}/>
                        <a href="https://www.linkedin.com/in/mandla-ndiweni-74a35a2a1/" target="_blank" rel="noreferrer">Mandla Ndiweni</a>
                    </div>
                </div>

                <div className="info-group">
                    <h1 className="section-title">Contact</h1>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faPhone}/>
                        <span>(+27) 81-796-6625</span>
                    </div>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faEnvelope}/>
                        <span>mndiweni04@gmail.com</span>
                    </div>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faMapLocationDot}/>
                        <span>Johannesburg, South Africa</span>
                    </div>
                </div>
            </div>

            {/* Right Side Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
                
                {/* Tab Switcher */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
                    <button 
                        type="button"
                        onClick={() => handleTabSwitch('general')}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            background: activeTab === 'general' ? '#38bdf8' : 'transparent',
                            color: activeTab === 'general' ? '#fff' : '#ccc',
                            transition: 'all 0.3s'
                        }}
                    >
                        General Inquiry
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleTabSwitch('project')}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            background: activeTab === 'project' ? '#38bdf8' : 'transparent',
                            color: activeTab === 'project' ? '#fff' : '#ccc',
                            transition: 'all 0.3s'
                        }}
                    >
                        Project / Service Request
                    </button>
                </div>

                <div className="row-group">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        name="firstName" 
                        value={formData.firstName || ''} 
                        onChange={handleChange}
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        name="lastName" 
                        value={formData.lastName || ''}
                        onChange={handleChange}
                        required 
                    />
                </div>
                
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    value={formData.email || ''}
                    onChange={handleChange}
                    required 
                />

                {/* Conditional Fields for Project Request */}
                {activeTab === 'project' && (
                    <>
                        <select 
                            name="serviceType" 
                            value={formData.serviceType || ''} 
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '5px', color: '#fff', marginBottom: '1rem' }}
                        >
                            <option value="" disabled style={{ color: '#000' }}>Frontend Web App</option>
                            <option value="Frontend Web App" style={{ color: '#000' }}>Frontend Web App</option>
                            <option value="Backend API" style={{ color: '#000' }}>Backend API</option>
                            <option value="Fullstack Development" style={{ color: '#000' }}>Fullstack Development</option>
                            <option value="Other" style={{ color: '#000' }}>Other</option>
                        </select>

                        <select 
                            name="timeline" 
                            value={formData.timeline || ''} 
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '5px', color: '#fff', marginBottom: '1rem' }}
                        >
                            <option value="" disabled style={{ color: '#000' }}>Select Timeline...</option>
                            <option value="Less than 1 month" style={{ color: '#000' }}>Less than 1 month</option>
                            <option value="1 to 3 months" style={{ color: '#000' }}>1 to 3 months</option>
                            <option value="3 to 6 months" style={{ color: '#000' }}>3 to 6 months</option>
                            <option value="Flexible" style={{ color: '#000' }}>Flexible</option>
                        </select>
                    </>
                )}
                
                <textarea 
                    placeholder={activeTab === 'project' ? "Briefly describe your project scope and requirements..." : "Your Message..."}
                    name="message" 
                    rows="5" 
                    value={formData.message || ''}
                    onChange={handleChange}
                    required
                ></textarea>
                
                <button 
                    type="submit" 
                    className="btn-submit" 
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1 }}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {status.message && (
                    <p style={{
                        color: status.type === 'error' ? '#ef4444' : '#38bdf8', 
                        fontWeight: 'bold', 
                        marginTop: '0.5rem',
                        textAlign: 'center'
                    }}>
                        {status.message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default ReachMe;
