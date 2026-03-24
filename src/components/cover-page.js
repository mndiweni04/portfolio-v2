'use client';
import Image from 'next/image';
import Link from 'next/link';
import CvImage from '../../public/images/CvImg2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faMobileAlt, faCode, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

import '../app/styles/cover-page.css';

function CoverPg(){
    return(
        <div className="profile">

            <h1 className='name'>Mandla Ndiweni</h1>

            <div className='bio'>
                <div className='CVimg'>
                    <Image src={CvImage} alt='Mandla Ndiweni Profile Image' className='grid-image' priority />
                </div>

                <div className='bcard'>
                    <h2 className='prof'>Junior Full Stack Developer</h2>
                    <p className='bcard-para'>
                        I am a developer currently pursuing an IT Diploma at Belgium Campus ITversity to formalize my engineering foundation. 
                        I bring over a year of practical experience as a freelance web developer, alongside recent hands-on experience in 
                        mobile development building proprietary IP. My background in sales has uniquely equipped me to translate technical 
                        complexity into clear, actionable insights for non-technical stakeholders.
                    </p>
                </div>
            </div>
            
            <div className="icon-pyramid">
                <div className="icon-row">
                    <FontAwesomeIcon icon={faReact} className="tech-icon" title="React.js / Web" />
                    <FontAwesomeIcon icon={faMobileAlt} className="tech-icon" title="React Native / Mobile" />
                </div>

                <div className="icon-row">
                    <FontAwesomeIcon icon={faDatabase} className="tech-icon" title="SQL / Database" />
                    <FontAwesomeIcon icon={faLaptopCode} className="tech-icon" title="Software Development" />
                    <FontAwesomeIcon icon={faCode} className="tech-icon" title="C# / Backend Logic" />
                </div>
            </div>

            <div className='intro-para'>
                <p className="paragraph">
                   While completing my formal studies, I am actively available for freelance contracts and engineering roles. 
                   With a proven ability to bridge the gap between technical jargon and simple language, I provide transparent, 
                   high-quality development services tailored to your needs.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/services" className="action-btn">
                        Explore My Services
                    </Link>
                    <Link href="/projects" className="action-btn" style={{ background: 'transparent', border: '2px solid var(--profile-theme)', color: 'var(--text-color)' }}>
                        View My Work
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CoverPg;