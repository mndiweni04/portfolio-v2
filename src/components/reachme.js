/* src/components/reachme.js */
'use client';
import { useRef, useState } from 'react';
import styles from '../app/styles/reachme.module.css'; // Changed import
import emailjs from 'emailjs-com';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhone, faEnvelope, faMapLocationDot} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function ReachMe(){
    const form = useRef();
    const [status, setStatus] = useState(""); 

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus("Sending...");

        // REPLACE THESE STRINGS WITH YOUR ACTUAL EMAILJS KEYS
        const SERVICE_ID = "YOUR_SERVICE_ID"; 
        const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
        const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
          .then((result) => {
              setStatus("Message Sent! ✅");
              e.target.reset();
              setTimeout(() => setStatus(""), 5000);
          }, (error) => {
              console.log(error.text);
              setStatus("Failed to send. Check console. ❌");
          });
    };

    return(
        <div className={styles.ReachMe}>
            <div className={styles['contact-intro']}>
                <div className={styles.follow}>
                    <h1 className={styles.title}>Follow</h1>
                    <div className={`${styles['info-section']} ${styles.link}`}>
                        <FontAwesomeIcon icon={faGithub}/>
                        <a href="https://github.com/mndiweni04" target="_blank" rel="noreferrer"><span> mndiweni04@github</span></a>
                    </div>
                    <div className={`${styles['info-section']} ${styles.link}`}>
                        <FontAwesomeIcon icon={faLinkedin}/>
                        <a href="#" target="_blank" rel="noreferrer"><span> Mandla Ndiweni LinkedIn</span></a>
                    </div>
                </div>

                <div className={styles['contact-details']}>
                    <h1 className={styles.title}>Contact</h1>
                    <div className={styles['info-section']}>
                        <FontAwesomeIcon icon={faPhone}/>
                        <span> (+27) 81-796-6625</span>
                    </div>
                    <div className={styles['info-section']}>
                        <FontAwesomeIcon icon={faEnvelope}/>
                        <span> mndiweni04@gmail.com</span>
                    </div>
                    <div className={styles['info-section']}>
                        <FontAwesomeIcon icon={faMapLocationDot}/>
                        <span> Johannesburg Gauteng South Africa</span>
                    </div>
                </div>
            </div>

           <form className={styles['contact-form']} ref={form} onSubmit={sendEmail}>
                <div className={styles['name-surname']}>
                    <input type="text" placeholder="First Name" name="from_firstname" required />
                    <input type="text" placeholder="Last Name" name="from_lastname" required />
                </div>
                <div className={styles['form-group']}>
                    <input type="email" placeholder="Email" name="from_email" required />
                </div>
                <div className={styles['form-group']}>
                    <textarea placeholder="Your Message" name="message" rows="5" required></textarea>
                </div>
                
                <button type="submit" className={styles.btnSubmit}>Send</button>
                <button type="reset" className={styles.btnClear}>Clear</button>
                
                {status && <p style={{marginTop: '1rem', color: 'var(--profile-theme)', fontWeight: 'bold'}}>{status}</p>}
            </form>
        </div>
    )
}

export default ReachMe;