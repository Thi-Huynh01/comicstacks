import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './ProfileDropdown.css'

const ProfileDropDown = ({ closeMenu }) => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!sessionStorage.getItem("access");
  //const isLoggedIn = !!localStorage.getItem("access"); // checks for access token


    return (
        <div className='flex flex-col ProfileDropdown'>
            
            {!isLoggedIn ? (
            <ul>
                <Link to="/login" onClick={closeMenu}>Login</Link>
                <Link to="/register" onClick={closeMenu}>Create Account</Link>
            </ul>
            ) : (
            <ul>
                <Link>My Account</Link>
                <Link>Settings</Link>
                <Link onClick={() => {
                    //localStorage.removeItem("access");
                    //localStorage.removeItem("refresh");
                    sessionStorage.removeItem("access");
                    sessionStorage.removeItem("refresh");
                    window.location.reload();
                }}>Logout</Link>
            </ul>
            )}
        </div>
    )
}

export default ProfileDropDown