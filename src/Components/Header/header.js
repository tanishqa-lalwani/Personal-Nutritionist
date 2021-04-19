import React, { useEffect, useState , useRef} from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import logo from './pineapple-icon.png'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import Drawer from '../Mobile Drawer/Drawer'
import SignUpModal from '../../Components/Modals/SignUpModal'
import LoginModal from '../../Components/Modals/LoginModal'
import { useLocation } from 'react-router-dom'
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useAuth} from '../../AuthContext'
import { auth } from '../../firebase'

function Header() {

    const location = useLocation();
    const user = useAuth();
    
    console.log(user);
    const handlescroll = () => {

        if (window.scrollY > 50 || location.pathname.includes('dashboard') > 0) {
            document.getElementsByClassName('header__page')[0].style.background = 'rgba(255,255,255,1)';
            document.getElementsByClassName('header__page')[0].style.boxShadow = '0 0 5px 0 rgba(0,0,0,0.5)';
        }
        else {
            document.getElementsByClassName('header__page')[0].style.boxShadow = '0 0 0 0 rgba(0,0,0,0.5)';
            document.getElementsByClassName('header__page')[0].style.background = 'transparent';
            document.getElementsByClassName('header__page')[0].style.borderBottom = '0px solid #321e59';
        }

    }

    window.addEventListener('scroll', handlescroll);


    useEffect(() => {

        if (location.pathname.includes('dashboard') > 0) {
            document.getElementsByClassName('header__page')[0].style.background = 'rgba(255,255,255,1)';
            document.getElementsByClassName('header__page')[0].style.boxShadow = '0 0 5px 0 rgba(0,0,0,0.5)';
        }
        else {
            document.getElementsByClassName('header__page')[0].style.boxShadow = '0 0 0 0 rgba(0,0,0,0.5)';
            document.getElementsByClassName('header__page')[0].style.background = 'transparent';
            document.getElementsByClassName('header__page')[0].style.borderBottom = '0px solid #321e59';
        }

    }, [location,user])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(true);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(open)
        setOpen(!open)
    };

    const handleClose_Menu = (event) => {
        setAnchorEl(null);

    };

    

    const handleClose = (e) => {
        auth.signOut()
        console.log(user);
        setAnchorEl(null);
    };

    return (
        <div className='header__page header__mobile__page'>
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
            <Link className='links__page' to='/food' style={{ textDecoration: 'none' , color:'#321E59'}}>
                <div className='two'>
                    Food
            </div>
            </Link>
            <Link className='links__page' to='/recipes' style={{ textDecoration: 'none' , color:'#321E59'}}>
                <div className='two'>
                    Recipes
                </div>
            </Link>
            <Link className='links__page' to='/blogs' style={{ textDecoration: 'none' , color:'#321E59'}}>
                <div className='two'>
                    Blogs
            </div>
            </Link>
            <div className='two__page'>
                About Us
            </div>
            {
                user.currentUser?
                (
                    <div className="four__page" style={{ alignItems: "center" }}>
                        <NotificationsIcon />
                        <div className="header__user__page" onClick={handleClick}>
                            {/* <Avatar style={{ width: "30px", height: '30px' }} /> */}
                            <div style={{ background: 'rgba(167, 212, 137, 1)', height: '30px', width: '30px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}></div>
                            <p>{user.currentUser.email}</p>
                            <ArrowDropDownIcon />
                        </div>
                        <Menu 
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                             onClose={handleClose_Menu}
                          
                            style={{zIndex:'2000',marginTop:'35px'}}
                        >
                            <Link to={`/${user.currentUser.uid}`} style={{textDecoration:'none',color:'black'}}>
                            <MenuItem 
                             onClick={handleClose_Menu}
                            >View Profile</MenuItem>
                            </Link>
                            <Link to={`/${user.currentUser.uid}/dashboard`} style={{textDecoration:'none',color:'black'}}>
                            <MenuItem 
                             onClick={handleClose_Menu}
                            >View Dashboard</MenuItem>
                            </Link>
                            <Link to={`/${user.currentUser.uid}/Notifications`} style={{textDecoration:'none',color:'black'}}>
                            <MenuItem 
                            // onClick={handleClose}
                            >Notifications</MenuItem>
                            </Link>
                            <Link to="/" style={{textDecoration:'none', color:'black'}}>
                            <MenuItem onClick={handleClose}>Sign Out</MenuItem>
                            </Link>
                        </Menu>
                    </div>
                    ) :
                    (
                        <div className='four__page'>
                            <Button variant="outlined" style={{ borderRadius: '10px', textTransform: 'capitalize', padding: 0, fontFamily: 'Poppins, sans-serif', border: '0px solid #321E59', color: '#321E59' }}>
                                <SignUpModal />
                            </Button>
                            <Button variant="outlined" style={{ borderRadius: '10px', textTransform: 'capitalize', padding: 0, fontFamily: 'Poppins, sans-serif', border: '0px solid #321E59', color: '#321E59' }}>
                                <LoginModal />
                            </Button>
                        </div>
                    )
                   
         }
        </div>
    )
}


export default Header
