'use client';
import { useState } from 'react';
import '../app/styles/reachme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function ReachMe() {
    // 1. Initialize State (Matches input names exactly)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: 'info', message: 'Sending...' });

        try {
            // 2. Send Data to API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message Sent! ✅' });
                setFormData({ firstName: '', lastName: '', email: '', message: '' }); // Clear form
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
                        <a href="https://github.com/mndiweni04" target="_blank" rel="noreferrer">mndiweni04@github</a>
                    </div>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faLinkedin}/>
                        <a href="#" target="_blank" rel="noreferrer">Mandla Ndiweni LinkedIn</a>
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
                <div className="row-group">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        name="firstName" 
                        // FIX: Add || '' to prevent "uncontrolled" error
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
                    placeholder="Email" 
                    name="email" 
                    value={formData.email || ''}
                    onChange={handleChange}
                    required 
                />
                
                <textarea 
                    placeholder="Your Message" 
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
                
                <button 
                    type="button" 
                    className="btn-clear" 
                    onClick={() => setFormData({ firstName: '', lastName: '', email: '', message: '' })}
                >
                    Clear
                </button>
                
                {status.message && (
                    <p style={{
                        color: status.type === 'error' ? '#ef4444' : '#38bdf8', 
                        fontWeight: 'bold', 
                        marginTop: '0.5rem'
                    }}>
                        {status.message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default ReachMe;