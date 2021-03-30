import React from 'react'
import { Link, useLocation } from "react-router-dom"
import './DashDrawer.css'
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Book from '../../Pages/Dashboard/Book.svg'
import Goals from '../../Pages/Dashboard/Goals.svg'
import Bookmark from '../../Pages/Dashboard/Bookmark.svg'
import Friends from '../../Pages/Dashboard/Friends.svg'
import Progress from '../../Pages/Dashboard/Progress.svg'
import Nutri from '../../Pages/Dashboard/Nutri.svg'
import Diet from '../../Pages/Dashboard/Diet.svg'


const drawerWidth = "20vw";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        background: '#1f1b48',
        color: 'white'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function DashDrawer(props) {

    const Loc = useLocation();
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (

        <div style={{ padding: '0 10px' }}>
            <div className={classes.toolbar} />
            <List>
                <ListItem>
                    {/* <ListItemIcon /> */}
                    <ListItemText>
                    <h3 style={{ color: '#699dff' }}>DASHBOARD</h3>
                    </ListItemText>
                </ListItem>
            </List>
            <div className={classes.toolbar} />
            <List className="dash_items_drawer">
                <Link className="dash_items_drawer" to="/userclass/dashboard" style={{ textDecoration: "none", color: 'white' }}>
                    <ListItem className='dash-item' style={{background:`${Loc.pathname !== "/userclass/dashboard" ? '#1f1b48':'#1B3E81'}`}}>
                        {/* <ListItemIcon><img src={Goals} height="16px" width="16px" /></ListItemIcon> */}
                        <ListItemText disableTypography style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif' }}>Today</ListItemText>
                    </ListItem>
                </Link>
                <ListItem className='dash-item' style={{background:`${Loc.pathname.includes('progress') > 0 ? '#1B3E81':'#1f1b48'}`}}>
                    {/* <ListItemIcon><img src={Progress} height="16px" width="16px" /></ListItemIcon> */}
                    <ListItemText disableTypography style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif' }}>Progress</ListItemText>
                </ListItem>
                <ListItem className='dash-item' style={{background:`${Loc.pathname.includes('dietplan') > 0 ? '#1B3E81':'#1f1b48'}`}}>
                    {/* <ListItemIcon><img src={Diet} height="16px" width="16px" /></ListItemIcon> */}
                    <ListItemText disableTypography style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif' }}>Your Diet Plan</ListItemText>
                </ListItem>
                <Link className="dash_items_drawer" to="/userclass/dashboard/recipebook" style={{ textDecoration: "none", color: 'white' }}>
                    <ListItem className='dash-item' style={{background:`${Loc.pathname.includes('recipebook') > 0 ? '#1B3E81':'#1f1b48'}`}}>
                        {/* <ListItemIcon><img src={Book} height="16px" width="16px" /></ListItemIcon> */}
                        <ListItemText disableTypography style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif' }}>Recipe Book</ListItemText>
                    </ListItem>
                </Link>
                <Link className="dash_items_drawer" to="/userclass/dashboard/savedblogs" style={{ textDecoration: "none", color: 'white' }}>
                <ListItem className='dash-item' style={{background:`${Loc.pathname.includes('savedblogs') > 0 ? '#1B3E81':"#1f1b48"}`}}>
                    {/* <ListItemIcon><img src={Bookmark} height="16px" width="16px" /></ListItemIcon> */}
                    <ListItemText disableTypography style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif' }}>Saved Blogs</ListItemText>
                </ListItem>
                </Link>
                <ListItem className='dash-item' style={{background:`${Loc.pathname.includes('personalnutritionists') > 0 ? '#1B3E81':"#1f1b48"}`}}>
                    {/* <ListItemIcon><img src={Nutri} height="16px" width="16px" /></ListItemIcon> */}
                    <ListItemText disableTypography style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif' }}>Subscribed Nutritionists</ListItemText>
                </ListItem>
                <ListItem className='dash-item' style={{background:`${Loc.pathname.includes('friends') > 0 ? '#1B3E81':'#1f1b48'}`}}>
                    {/* <ListItemIcon><img src={Friends} height="16px" width="16px" /></ListItemIcon> */}
                    <ListItemText disableTypography style={{ fontSize: '15px', fontFamily: 'Poppins, sans-serif' }}>Your Friends</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    )
}

export default DashDrawer
