import React, { useRef, useEffect, useState } from 'react'
import './Navbar.css'
import search_icon_light from '../../assets/search-w.png'
import search_icon_dark from '../../assets/search-b.png'
import logo_light from '../../assets/logo_light.png'
import { Link } from 'react-router-dom';
import Home from '@mui/icons-material/Home';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import ContrastIcon from '@mui/icons-material/Contrast';
import AccountMenu from "../AccountMenu/AccountMenu"

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
        <img
          src={logo_light}
          alt=""
          className='logo'
        />
      </Link>
        <Link to="/" className='nav-link'><Home fontSize='medium' className='nav-icon'/>Home</Link>
        <Link to="/comics" className='nav-link'><AutoStoriesRoundedIcon fontSize='medium'/>Comics</Link>
        <Link to="/community" className='nav-link'><PublicIcon fontSize='medium'/>Community</Link>
        <Link to="/activity-feed" className='nav-link'><PeopleIcon fontSize='medium'/>Activity Feed</Link>
        <Link to="/about" className='nav-link'><InfoIcon fontSize='medium'/>About</Link>
      <div className='search-box'>
        <input type='text' placeholder='Find Comics'/>
        <img src={theme == 'light' ? search_icon_light : search_icon_dark} alt=""/>
      </div>

      <ContrastIcon onClick={() => {toggle_mode()}} className='toggle-icon' sx ={{ fontSize: 45 }}/>
      {/*<img onClick={()=>{toggle_mode()}} src={theme == 'light' ? toggle_light : toggle_dark} alt="" className='toggle-icon'/>
      */}
      <div className='nav-right' ref={menuRef}>

      <AccountMenu/>
      </div>
    </nav>

  );
};

export default Navbar;
