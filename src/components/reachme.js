'use client';
import { useRef, useState } from 'react';
import '../app/styles/reachme.css';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function ReachMe() {
    const form = useRef();
    const [status, setStatus] = useState(""); 

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus("Sending...");

        // Replace with your actual EmailJS keys
        emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, "YOUR_PUBLIC_KEY")
          .then((result) => {
              setStatus("Message Sent! ✅");
              e.target.reset();
              setTimeout(() => setStatus(""), 5000);
          }, (error) => {
              console.log(error.text);
              setStatus("Failed to send. ❌");
          });
    };

    return (
        <div className="reachme-container">
            
            {/* LEFT SIDE: Info */}
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

            {/* RIGHT SIDE: Form */}
            <form className="contact-form" ref={form} onSubmit={sendEmail}>
                <div className="row-group">
                    <input type="text" placeholder="First Name" name="from_firstname" required />
                    <input type="text" placeholder="Last Name" name="from_lastname" required />
                </div>
                
                <input type="email" placeholder="Email" name="from_email" required />
                <textarea placeholder="Your Message" name="message" rows="5" required></textarea>
                
                <button type="submit" className="btn-submit">Send Message</button>
                <button type="reset" className="btn-clear">Clear</button>
                
                {status && <p style={{color: '#38bdf8', fontWeight: 'bold'}}>{status}</p>}
            </form>
        </div>
    )
}

export default ReachMe;