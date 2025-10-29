import React from 'react'
import './Navbar.css'
import logo_light from '../../assets/logo-black.png'
import logo_dark from '../../assets/logo-white.png'
import search_icon_light from '../../assets/search-w.png'
import search_icon_dark from '../../assets/search-b.png'
import toggle_light from '../../assets/night.png'
import toggle_dark from '../../assets/day.png'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

const Navbar = ({theme, setTheme}) => {

  const toggle_mode = ()=>{
    theme == 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <nav className={`navbar {theme}`}>
      <a href='/'>
        <img src={theme == 'light' ? logo : logo} alt="" className='logo'/>
      </a>
      <Link to="/">Home</Link>
      <Link to="/comics">Comics</Link>
      <Link to="/news-feed">News Feed</Link>
      <Link to="/community">Community</Link>
      <Link to="/about">About</Link>
      {/*
      <ul>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
        <a href="/comics">Comics</a>  
        </li>
        <li>
          <a href='/news-feed'>News Feed</a>
        </li>
        <li>
          <a href="/community">Community</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
      */}
      <div className='search-box'>
        <input type='text' placeholder='Find Comics'/>
        <img src={theme == 'light' ? search_icon_light : search_icon_dark} alt=""/>
      </div>
      
      <img onClick={()=>{toggle_mode()}} src={theme == 'light' ? toggle_light : toggle_dark} alt="" className='toggle-icon'/>
    </nav>
  )
}

export default Navbar
