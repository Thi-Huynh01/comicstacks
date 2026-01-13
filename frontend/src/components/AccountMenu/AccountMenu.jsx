import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import './AccountMenu.css'
import starman from '../../assets/starman.jpeg'
const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isLoggedIn = !!localStorage.getItem("access"); // checks for access token
    const open = Boolean(anchorEl);
    const nav = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

     const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout =() =>{
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        //sessionStorage.removeItem("access");
        //sessionStorage.removeItem("refresh");
        nav("/")
        window.location.reload();
    }

    return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center'}}>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: -1 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ fontSize: 45}}>
              {/*
                <AccountCircleIcon 
                    sx={{ fontSize: 45 }}
                />
                */} 
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        {!isLoggedIn ?  [
          <>
        <MenuItem onClick={() => nav("/login")}>
          <Avatar /> Log In
        </MenuItem>
        <MenuItem onClick={() => nav("/register")}>
          <Avatar /> Create an Account
        </MenuItem>
          </>
         ] : [
      <>
        <MenuItem onClick={() => nav("/profile")}>
          <Avatar /> My Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
                Log Out
        </MenuItem>
        </>
        ]}
      </Menu>
    </React.Fragment>
    );
}

export default AccountMenu;