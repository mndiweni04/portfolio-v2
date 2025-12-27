'use client';
import Image from 'next/image';
import CvImage from '../../public/images/CvImg2.jpg';
import '../app/styles/cover-page.css';

function CoverPg(){
    return(
        <div className="profile">

            <div className='photo'>
                <Image src={CvImage} alt='Mandla Ndiweni CV Image' className='grid-image'/>
            </div>

            <div className='bio'>
                <h1 className='name'>Mandla Ndiweni</h1>
                <p className='prof'>Full Stack Developer</p>
                <p className="paragraph">
                    Aspiring Full Stack Developer and recent graduate of Belgium Campus ITversity (Diploma in Software & Web Development). 
                    I offer a strong foundation in both frontend and backend technologies, including React.js, Node.js, C#, and raw SQL for complex data management. 
                    My technical agility is demonstrated by my work co-developing anti-sleep IoT glasses, a team project integrating hardware sensors with software logic. 
                    Additionally, my experience in direct sales has honed my ability to communicate technical concepts to non-technical stakeholders. 
                    I am now seeking a Full Stack internship to apply my skills in a professional environment.
                </p>
                <button onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/Mandla Ndiweni.pdf';
                        link.download = 'Mandla Ndiweni.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                    className="btnDownload" >
                Download CV
                </button>
            </div>
        </div>
    );
}

export default CoverPg;
