import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import superman_image from '../../assets/omega_superman.jpg';
import ddp_image from '../../assets/dd_and_p.jpg';
import gl_image from '../../assets/emeraldtwilight.jpg';
import ec_image from '../../assets/ec.png'
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
            <div className='content-row'>
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

            <div className='about-section'>
                <h1>What is "Comic Stacks"?</h1>
                <a>
                    ComicStacks is a new way to catalogue comics and review comics that you have read.
                    You can also engage in the community and discuss topics all things comics! 
                    Check out the About section to learn more.
                </a>
                <Stack spacing={4} direction="column">
                    <Link to="/about">
                        <Button variant="contained">Read More</Button>
                    </Link>
                </Stack>
            </div>
        </div>
    );
};

export default Home;
