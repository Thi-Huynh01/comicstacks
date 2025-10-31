import React from 'react'
import './Navbar.css'
import search_icon_light from '../../assets/search-w.png'
import search_icon_dark from '../../assets/search-b.png'
import toggle_light from '../../assets/night.png'
import toggle_dark from '../../assets/day.png'
import logo from '../../assets/logo.png'
import logo_light from '../../assets/logo_light.png'
import logo_dark from '../../assets/logo_dark.png'
import { Link } from 'react-router-dom';

const Navbar = ({theme, setTheme}) => {

  const toggle_mode = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <nav className={`navbar {theme}`}>
      <a href='/'>
        <img src={theme == 'light' ? logo_light : logo_dark} alt="" className='logo'/>
      </a>
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
    </nav>
  )
}

export default Navbar
