import React, { useEffect, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import logo from './pineapple-icon.png'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import Drawer from '../Mobile Drawer/Drawer'
import SignUpModal from '../../Components/Modals/SignUpModal'
import { useLocation } from 'react-router-dom'
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


function Header() {

    const location = useLocation();

    const handlescroll = () => {

        if (window.scrollY > 50 || location.pathname.includes('userclass') > 0) {
            document.getElementsByClassName('header')[0].style.background = 'rgba(255,255,255,1)';
            document.getElementsByClassName('header')[0].style.boxShadow = '0 0 5px 0 rgba(0,0,0,0.5)';
        }
        else {
            document.getElementsByClassName('header')[0].style.boxShadow = '0 0 0 0 rgba(0,0,0,0.5)';
            document.getElementsByClassName('header')[0].style.background = 'transparent';
            document.getElementsByClassName('header')[0].style.borderBottom = '0px solid #321e59';
        }

    }

    window.addEventListener('scroll', handlescroll);


    useEffect(() => {

        if (location.pathname.includes('userclass') > 0) {
            document.getElementsByClassName('header')[0].style.background = 'rgba(255,255,255,1)';
            document.getElementsByClassName('header')[0].style.boxShadow = '0 0 5px 0 rgba(0,0,0,0.5)';
        }
        else {
            document.getElementsByClassName('header')[0].style.boxShadow = '0 0 0 0 rgba(0,0,0,0.5)';
            document.getElementsByClassName('header')[0].style.background = 'transparent';
            document.getElementsByClassName('header')[0].style.borderBottom = '0px solid #321e59';
        }

    }, [location])

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
    };

    return (
        <div className='header header__mobile'>
            {
                window.screen.width > 500 ? (
                    <>
                        <Link to='/'>
                            <Avatar src={logo} />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to='/'>
                            <Avatar src={logo} />
                        </Link>
                        <Drawer loc={location.pathname} />
                    </>
                )
            }
            <Link className='links' to='/food' style={{ textDecoration: 'none' }}>
                <div className='two'>
                    Food
            </div>
            </Link>
            <Link className='links' to='/recipes' style={{ textDecoration: 'none' }}>
                <div className='two'>
                    Recipes
                </div>
            </Link>
            <Link className='links' to='/blogs' style={{ textDecoration: 'none' }}>
                <div className='two'>
                    Blogs
            </div>
            </Link>
            <div className='two'>
                About Us
            </div>
            {
                location.pathname.includes("/userclass/dashboard") > 0 ?
                    (
                        <div className="four" style={{ alignItems: "center" }}>
                            <NotificationsIcon />
                            <div className="header__user" onClick={handleClick}>
                                {/* <Avatar style={{ width: "30px", height: '30px' }} /> */}
                                <div style={{ background: 'rgba(167, 212, 137, 1)', height: '30px', width: '30px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}></div>
                                <p>Username</p>
                                <ArrowDropDownIcon />
                            </div>
                            <Menu 
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                style={{zIndex:'2000',marginTop:'35px'}}
                            >
                                <MenuItem onClick={handleClose}>View Profile</MenuItem>
                                <MenuItem onClick={handleClose}>View Dashboard</MenuItem>
                                <MenuItem onClick={handleClose}>Notifications</MenuItem>
                                <MenuItem onClick={handleClose}>Sign Out</MenuItem>
                            </Menu>
                        </div>
                    ) :
                    (
                        <div className='four'>
                            <Button variant="outlined" style={{ borderRadius: '10px', textTransform: 'capitalize', padding: 0, fontFamily: 'Poppins, sans-serif', border: '0px solid #321E59', color: '#321E59' }}>
                                <SignUpModal />
                            </Button>
                            <Link to="/userclass/dashboard" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" style={{ borderRadius: '10px', textTransform: 'capitalize', fontFamily: 'Poppins, sans-serif', border: '1px solid #321E59', color: '#321E59' }}>
                                    Login
                                </Button>
                            </Link>
                        </div>
                    )
            }
        </div>
    )
}


export default Header
