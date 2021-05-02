import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MusicNoteIcon from '@material-ui/icons/MusicNote';

function Footer(){

    return(
        <div className="footer">
                <div className="sections">
                    <Link to='/food' style={{textDecoration: 'none',color:'white'}}>
                        <div className="pages">
                            Food
                        </div>
                    </Link>
                    <Link  to='/recipes' style={{textDecoration: 'none',color:'white'}}>
                        <div className="pages">
                            Recipes
                        </div>
                    </Link>
                    <Link  to='/blogs' style={{textDecoration: 'none',color:'white'}}>
                        <div className="pages">
                            Blogs
                        </div>
                    </Link>
                    <Link  to='/recipes' style={{textDecoration: 'none',color:'white'}}>
                        <div className="pages">
                            About Us
                        </div>
                    </Link>
                </div>
                <div style={{paddingTop:'20px',color:'white'}}>
                    <p>Made with <FavoriteIcon/> and <MusicNoteIcon/></p>
                </div>
        </div>
    )

}

export default Footer;