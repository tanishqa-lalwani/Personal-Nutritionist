import React from 'react'
import './header.css'
import {Link} from 'react-router-dom'
import logo from './pineapple-icon.png'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import Drawer from '../Mobile Drawer/Drawer'
import SignUpModal from '../../Components/Modals/SignUpModal'

function Header() {

    const handlescroll = () => {
        if(window.scrollY>50)
        {
            document.getElementsByClassName('header')[0].style.background = 'rgba(255,255,255,1)';
            document.getElementsByClassName('header')[0].style.boxShadow = '0 0 5px 0 rgba(0,0,0,0.5)';
        }
        else
        {
            document.getElementsByClassName('header')[0].style.boxShadow = '0 0 0 0 rgba(0,0,0,0.5)';
            document.getElementsByClassName('header')[0].style.background='transparent';
        }
    }

    window.addEventListener('scroll',handlescroll);

    console.log(logo);

    return (
        <div className='header'>
            <div className="ham">
                <Drawer />
            </div>
            <Link to='/'>
                <Avatar src = {logo}/>
            </Link>
            <Link className='links' to='/food'  style={{textDecoration:'none'}}>
            <div className='two'>
                Food
            </div>
            </Link>
            <Link className='links' to='/recipes' style={{textDecoration:'none'}}>
                <div className='two'>
                    Recipes
                </div>
            </Link>
            <Link className='links' to='/blogs' style={{textDecoration:'none'}}>
            <div className='two'>
                Blogs
            </div>
            </Link>
            <div className='two'> 
                About Us
            </div>
            <div className='four'>
            <Button variant="outlined" style={{borderRadius:'10px',textTransform:'capitalize',padding:0,fontFamily:'Poppins, sans-serif',border:'0px solid #321E59',color:'#321E59'}}>
                <SignUpModal/>
            </Button>
            <Button variant="outlined" style={{borderRadius:'10px',textTransform:'capitalize',fontFamily:'Poppins, sans-serif',border:'1px solid #321E59',color:'#321E59'}}>
                Login
            </Button>
            </div>
        </div>
    )
}


export default Header
