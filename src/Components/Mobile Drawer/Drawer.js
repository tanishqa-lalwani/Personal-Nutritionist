import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import './Drawer.css'
import { Divider, unstable_createMuiStrictModeTheme } from '@material-ui/core';
import { useAuth } from '../../AuthContext'
import Avatar from "@material-ui/core/Avatar"
import SignUpModal from '../../Components/Modals/SignUpModal'
import LoginModal from '../../Components/Modals/LoginModal'
import { auth } from '../../firebase'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer({ loc,uname , usrimg}) {
    const user = useAuth();
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List >
                <ListItem>
                    <div className='username__sidebar__mobile'>
                        <Link to='/loginmobile' style={{ textDecoration: 'none', color: 'black' }}>
                            <div className="header__user__mobile">
                                <Avatar src= {usrimg} style={{ width: "30px", height: '30px' }} />
                                {/* <div style={{ background: 'rgba(167, 212, 137, 1)', height: '30px', width: '30px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}></div> */}
                                <p>{user.currentUser ? uname : "Sign in"}</p>
                            </div>
                        </Link>
                    </div>
                </ListItem>
                <Link to={`/${user.currentUser?.uid}/profile`} style={{ textDecoration: 'none', color: 'black', display: `${user.currentUser ? "block" : "none"}` }}>
                    <ListItem button key="Food" >
                        <div className="listitemsidebar">View Profile</div>
                    </ListItem>
                </Link>
                <Link to={`/${user.currentUser?.uid}/dashboard`} style={{ textDecoration: 'none', color: 'black', display: `${user.currentUser ? "block" : "none"}` }}>
                    <ListItem button key="Food" >
                        <div className="listitemsidebar">View Dashboard</div>
                    </ListItem>
                </Link>
                <Link to={`/${user.currentUser?.uid}/Notifications`} style={{ textDecoration: 'none', color: 'black', display: `${user.currentUser ? "block" : "none"}` }}>
                    <ListItem button key="Food" >
                        <div className="listitemsidebar">Notifications</div>
                    </ListItem>
                </Link>
                {
                    user.currentUser ? (

                        <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                            <ListItem onClick={() => (auth.signOut())} button key="Food" >
                                <div className="listitemsidebar">Sign Out</div>
                            </ListItem>
                        </Link>
                    ) : (<>
                        {/* <Link to='/loginmobile' style={{ textDecoration: 'none', color: 'black' }}> */}
                        <a href='/loginmobile' style={{ textDecoration: 'none', color: 'black' }}>
                            <ListItem button >
                                <div className="listitemsidebar">
                                    Login
                                </div>
                            </ListItem>
                        </a>
                        {/* </Link> */}

                        {/* <Link to='/signupmobile' style={{ textDecoration: 'none', color: 'black' }}> */}
                        <a href='/signupmobile' style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItem button>
                            <div className="listitemsidebar">Sign Up</div>
                        </ListItem>
                        </a>
                        {/* </Link> */}
                    </>)
                }

                <ListItem></ListItem>

                <Divider />

                <ListItem></ListItem>
                <Link to='/food' style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button key="Food" >
                        <div className="listitemsidebar">Food</div>
                    </ListItem>
                </Link>
                <Link to='/recipes' style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button key="Recipes">
                        <div className="listitemsidebar">Recipes</div>
                    </ListItem>
                </Link>
                <Link to='/blogs' style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button key="Blogs">
                        <div className="listitemsidebar">Blogs</div>
                    </ListItem>
                </Link>
                <Link to='/aboutus' style={{ textDecoration: 'none', color: 'black' }}>
                <ListItem button key="About Us">
                    <div className="listitemsidebar">About Us</div>
                </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <MenuIcon onClick={toggleDrawer(anchor, true)} />
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
