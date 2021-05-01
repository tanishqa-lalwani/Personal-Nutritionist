import React from 'react'
import './SavedBlogs.css'
import Blogitem from '../../../Pages/Blogs/Blogitem.js'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile.js'
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer.js'

function SavedBlogs()
{
    return(
        <div className="BlogDashboard  BlogDashboard_mobile">
            {/* {
                window.screen.width > 500 ? (<DashDrawer/>) : (<DashDrawerMobile loc="SavedBlogs" img="Blogs"/>)
            } */}

            <div className="Blog_info Blog_info_mobile">
                <p style={{fontFamily:'Poppins',fontWeight:'600', color:'#321E59'}}>Hii Username!!!</p>
                {
                    window.screen.width > 500 ? 
                        (<h2 style={{marginTop:'50px', marginBottom:'25px' ,color:'#321E59'}}>Your favourite blogs</h2>) :

                        (<h2 style={{marginTop:'10vw',marginBottom:'7vw', color:'#321E59'}}>Your favourite blogs</h2>)
                }
                <div className="Blog_items Blog_items_mobile">
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                </div>
            </div>
        </div>
    );
}

export default SavedBlogs

