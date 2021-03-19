import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './DashDrawer.css'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Book from '../../Pages/Dashboard/Book.svg'
import Goals from '../../Pages/Dashboard/Goals.svg'
import Bookmark from '../../Pages/Dashboard/Bookmark.svg'
import Friends from '../../Pages/Dashboard/Friends.svg'
import Progress from '../../Pages/Dashboard/Progress.svg'
import Nutri from '../../Pages/Dashboard/Nutri.svg'
import Diet from '../../Pages/Dashboard/Diet.svg'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function DashDrawerMobile({loc,img}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
    };

    let dict = {
        "Book" : Book,
        "Blogs" : Bookmark,
        "Goals" : Goals,
        "Progress" : Progress,
        "Diet" : Diet,
        "Friends" : Friends,
        "Nutritionist": Nutri,
    }

    return (
        <div className="dash__mobile_dr">
            <div>
                <h3 style={{ color: '#699dff', marginBottom: '20px', textAlign: 'center' }}>DASHBOARD</h3>
                <div className="showmenu">

                    <img src={dict[img]} height="16px" width="16px" />
                    <p style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif', color: 'white' }}>{loc}</p>

                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ background: '#699dff', color: '#1F1B48', clipPath: "circle(20%)" }}>
                        <ArrowDropDownIcon />
                    </Button>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{background:'#1B3E81'}}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link to="/userclass/dashboard/" style={{ textDecoration: "none" }}>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'inherit', gap: '10px' , width:'100%' }}>
                                    <img src={Goals} height="16px" width="16px" />
                                    <p style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif', color: 'white' }}>Daily Goals</p>
                                </div>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to="/userclass/dashboard/recipebook" style={{ textDecoration: "none" }}>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'inherit', gap: '10px' , width:'100%' }}>
                                    <img src={Book} height="16px" width="16px" />
                                    <p style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif', color: 'white' }}>Recipe Book</p>
                                </div>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to="/userclass/dashboard/recipebook" style={{ textDecoration: "none" }}>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'inherit', gap: '10px' , width:'100%' }}>
                                    <img src={Bookmark} height="16px" width="16px" />
                                    <p style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif', color: 'white' }}>Saved Blogs</p>
                                </div>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to="/userclass/dashboard/recipebook" style={{ textDecoration: "none" }}>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'inherit', gap: '10px' , width:'100%' }}>
                                    <img src={Nutri} height="16px" width="16px" />
                                    <p style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif', color: 'white' }}>Subscribed Nutritionists</p>
                                </div>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to="/userclass/dashboard/recipebook" style={{ textDecoration: "none" }}>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'inherit', gap: '10px' , width:'100%' }}>
                                    <img src={Friends} height="16px" width="16px" />
                                    <p style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif', color: 'white' }}>Your Friends</p>
                                </div>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to="/userclass/dashboard/recipebook" style={{ textDecoration: "none" }}>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'inherit', gap: '10px' , width:'100%' }}>
                                    <img src={Diet} height="16px" width="16px" />
                                    <p style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif', color: 'white' }}>Diet Plan</p>
                                </div>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to="/userclass/dashboard/recipebook" style={{ textDecoration: "none" }}>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'inherit', gap: '10px' , width:'100%' }}>
                                    <img src={Progress} height="16px" width="16px" />
                                    <p style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif', color: 'white' }}>Progress</p>
                                </div>
                            </Link>
                        </MenuItem>

                    </Menu>

                </div>
            </div>
        </div >
    )
}

export default DashDrawerMobile
