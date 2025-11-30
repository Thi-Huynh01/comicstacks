import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Fade, Zoom, Slide } from 'react-slideshow-image';
//import superman_image from '../../assets/superman_dc_ko_variant.webp';
import superman_image from '../../assets/omega_superman.jpg';
import ddp_image from '../../assets/dd_and_p.jpg';
import batman_image from '../../assets/batman_test.jpg';
import gl_image from '../../assets/emeraldtwilight.jpg';
import wanted_image from '../../assets/wanted_test.jpg';
import ec_image from '../../assets/ec.png'
import './Home.css';

// REMINDER: Resize images for slider to 1400 x 1050 for best look
const Home = () => {
    const slideImages = [
        {
            url:superman_image, 
            caption: "DC:KO - SUPERMAN UNLOCKING THE OMEGA SANCTION"
        },
        {
            url: ddp_image,
            caption: "DAREDEVIL & PUNISHER: THE DEVIL'S TRIGGER" 
        },
        {
            url: ec_image,
            caption: "EXQUISITE CORPSES"
        }
    ];

    return (
        <div className='home-container'>
            <div className="slider-container">
                <div className="slider-wrapper">
                    <Fade
                        duration={5000}
                        arrows={true}
                        pauseOnHover={true}
                    >
                        {slideImages.map((image, index) => (
                            <div key={index} className="slider-slide">
                                <img src={image.url} alt={`Slide ${index + 1}`} />
                                <div className="slider-caption">
                                    {image.caption}
                                </div>
                            </div>
                        ))}
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default Home;
