import React, { useRef, useEffect, useState } from 'react'
import './Navbar.css'
import LoginModal from "../LoginModal/LoginModal"
import search_icon_light from '../../assets/search-w.png'
import search_icon_dark from '../../assets/search-b.png'
import toggle_light from '../../assets/night.png'
import toggle_dark from '../../assets/day.png'
import profile_light from '../../assets/profile_light.png'
import profile_dark from '../../assets/profile_dark.png'
import logo_light from '../../assets/logo_light.png'
import logo_dark from '../../assets/logo_dark.png'
import { Link } from 'react-router-dom';
import ProfileDropDown from '../ProfileDropdown/ProfileDropdown'

const Navbar = ({theme, setTheme}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click",close);
    return () => document.removeEventListener("click", close);
  }, []);

  const toggle_mode = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light')
  }

  return (

    <nav className={`navbar {theme}`}>
      <Link to="/">
        <img src={theme == 'light' ? logo_light : logo_light}
          alt=""
          className='logo'
        />
      </Link>
        <Link to="/">Home</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/community">Community</Link>
        <Link to="/news-feed">News Feed</Link>
        <Link to="/about">About</Link>
      <div className='search-box'>
        <input type='text' placeholder='Find Comics'/>
        <img src={theme == 'light' ? search_icon_light : search_icon_dark} alt=""/>
      </div>

      <img onClick={()=>{toggle_mode()}} src={theme == 'light' ? toggle_light : toggle_dark} alt="" className='toggle-icon'/>
      
      <div ref={menuRef}>
        <img src={theme == 'light' ? profile_light : profile_dark }
          width = "50" 
          alt="" 
          className='profile-icon'
          onClick={() => setOpen(!open)}
          />
          {open && <ProfileDropDown/>}
      </div>
    </nav>

  );
};

export default Navbar
