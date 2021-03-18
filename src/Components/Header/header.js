import React, { useEffect } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import logo from './pineapple-icon.png'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import Drawer from '../Mobile Drawer/Drawer'
import SignUpModal from '../../Components/Modals/SignUpModal'
import { useLocation } from 'react-router-dom'
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function Header() {

    const location = useLocation();

    const handlescroll = () => {

        if (window.scrollY > 50 || location.pathname.includes('dashboard') > 0) 
        {
            document.getElementsByClassName('header')[0].style.background = 'rgba(255,255,255,1)';
            document.getElementsByClassName('header')[0].style.borderBottom = '1px solid #321e59';
        }
        else {
            document.getElementsByClassName('header')[0].style.boxShadow = '0 0 0 0 rgba(0,0,0,0.5)';
            document.getElementsByClassName('header')[0].style.background = 'transparent';
            document.getElementsByClassName('header')[0].style.borderBottom = '0px solid #321e59';
        }

    }

    window.addEventListener('scroll', handlescroll);


    useEffect(() => {

        if (location.pathname.includes('dashboard') > 0) {
            document.getElementsByClassName('header')[0].style.background = 'rgba(255,255,255,1)';
            document.getElementsByClassName('header')[0].style.borderBottom = '1px solid #321e59';
        }
        else
        {
            document.getElementsByClassName('header')[0].style.boxShadow = '0 0 0 0 rgba(0,0,0,0.5)';
            document.getElementsByClassName('header')[0].style.background = 'transparent';
            document.getElementsByClassName('header')[0].style.borderBottom = '0px solid #321e59';
        }

    }, [location])

    return (
        <div className='header'>
            <div className="ham">
                <Drawer />
            </div>
            <Link to='/'>
                <Avatar src={logo} />
            </Link>
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
                location.pathname === "/userclass/dashboard" ?
                    (
                        <div className="four" style={{ alignItems: "center" }}>
                            <NotificationsIcon />
                            <div className="header__user">
                                <Avatar style={{ width: "30px", height: '30px' }} />
                                <p>Username</p>
                                <ArrowDropDownIcon />
                            </div>
                        </div>
                    ) :
                    (
                        <div className='four'>
                            <Button variant="outlined" style={{ borderRadius: '10px', textTransform: 'capitalize', padding: 0, fontFamily: 'Poppins, sans-serif', border: '0px solid #321E59', color: '#321E59' }}>
                                <SignUpModal />
                            </Button>
                            <Button variant="outlined" style={{ borderRadius: '10px', textTransform: 'capitalize', fontFamily: 'Poppins, sans-serif', border: '1px solid #321E59', color: '#321E59' }}>
                                Login
                    </Button>
                        </div>
                    )
            }
        </div>
    )
}


export default Header
