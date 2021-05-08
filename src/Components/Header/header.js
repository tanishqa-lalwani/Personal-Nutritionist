import React, { useEffect, useState, useRef } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
import Badge from '@material-ui/core/Badge';
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
import { useAuth } from '../../AuthContext'
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { auth } from '../../firebase'

function Header() {
    const location = useLocation();
    const user = useAuth();

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

    const [usrimg, seturs] = React.useState("");
    const [name, setname] = React.useState("");
    const [naughty, setnaughty] = useState([])

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

        if (user.currentUser?.displayName === "User")
            db.collection('Users').doc('Client')
                .collection('clientel')
                .doc(user.currentUser?.uid)
                .onSnapshot((snap) => {
                    seturs(snap.data()?.image);
                    setname(snap.data()?.name);
                })
        else {
            db.collection('Users').doc('Nutritionist')
                .collection('staff')
                .doc(user.currentUser?.uid)
                .onSnapshot((snap) => {
                    seturs(snap.data()?.image);
                    setname(snap.data()?.name);
                })
        }
        if (user.currentUser?.displayName !== "User"){

            db.collection('Users').doc('Nutritionist')
            .collection('staff')
            .doc(user.currentUser?.uid).collection('Notifs').onSnapshot(
                snap=>(setnaughty(snap.docs.map(doc=>({
                    noid:doc.id,
                    notcont : doc.data()
                }))))
                )
            }
            else
            {
                db.collection('Users').doc('Client')
            .collection('clientel')
            .doc(user.currentUser?.uid).collection('Notifs').onSnapshot(
                snap=>(setnaughty(snap.docs.map(doc=>({
                    noid:doc.id,
                    notcont : doc.data()
                }))))
                )   
            }


            console.log(naughty)
    }, [location, user, usrimg, name,naughty?.length])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(true);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open)
    };

    const handleClose_Menu = (event) => {
        setAnchorEl(null);

    };



    const handleClose = (e) => {
        auth.signOut()
        setAnchorEl(null);
    };

    const [anchorElpop, setAnchorElpop] = React.useState(null);

    const handleClickpop = (event) => {
        setAnchorElpop(event.currentTarget);
    };

    const handleClosepop = () => {
        setAnchorElpop(null);
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
                        <Drawer loc={location.pathname} uname={name} usrimg={usrimg} />
                    </>
                )
            }
            <Link className='links__page' to='/food' style={{ textDecoration: 'none', color: '#321E59' }}>
                <div className='two'>
                    Food
            </div>
            </Link>
            <Link className='links__page' to='/recipes' style={{ textDecoration: 'none', color: '#321E59' }}>
                <div className='two'>
                    Recipes
                </div>
            </Link>
            <Link className='links__page' to='/blogs' style={{ textDecoration: 'none', color: '#321E59' }}>
                <div className='two'>
                    Blogs
            </div>
            </Link>
            <Link className='links__page' to='/aboutus' style={{ textDecoration: 'none', color: '#321E59' }}>
            <div className='two__page'>
                About Us
            </div>
            </Link>
            {
                user.currentUser ?
                    (
                        <div className="four__page" style={{ alignItems: "center" }}>
                            <Badge badgeContent={naughty.length} color="primary">
        {/* <MailIcon /> */}
                            <NotificationsIcon onClick={handleClickpop} /></Badge>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorElpop}
                                keepMounted
                                open={Boolean(anchorElpop)}
                                onClose={handleClosepop}
                                style={{ zIndex: '2000', marginTop: '30px' }}
                            >
                                <MenuItem>
                                <h3>Notifications</h3>
                                </MenuItem>
                                {/* <MenuItem
                                        onClick={handleClose_Menu}
                                    >View Profile</MenuItem> */}
                                {
                                    naughty.map(({noid,notcont})=>(
                                        <MenuItem>
                                        <div>
                                        <h4>{notcont.kisne_bheja}</h4>
                                        <p>{notcont.text}</p>
                                        </div>
                                        </MenuItem>
                                    ))
                                }
                                
                            </Menu>
                            <div className="header__user__page" onClick={handleClick}>
                                <Avatar src={usrimg} style={{ background: "rgba(167, 212, 137, 1)", height: '30px', width: '30px', }} />
                                <p>{name}</p>
                                <ArrowDropDownIcon />
                            </div>
                            <Menu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose_Menu}

                                style={{ zIndex: '2000', marginTop: '35px' }}
                            >
                                <Link to={`/${user.currentUser.uid}/${user.currentUser.displayName === "User" ? "profile" : "Nutritionistprofile"}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <MenuItem
                                        onClick={handleClose_Menu}
                                    >View Profile</MenuItem>
                                </Link>
                                <Link to={`/${user.currentUser.uid}/${user.currentUser.displayName === "User" ? "dashboard" : "Nutritionistdashboard"}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <MenuItem
                                        onClick={handleClose_Menu}
                                    >View Dashboard</MenuItem>
                                </Link>
                                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
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
                                <LoginModal text="Login" />
                            </Button>
                        </div>
                    )

            }
        </div>
    )
}


export default Header
