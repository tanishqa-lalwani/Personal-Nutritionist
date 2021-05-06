import React from 'react'
import './footer.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

function Footer(){

    return(
        <div className="footer" style={{background:'#699DFF'}}>
            <div style={{margin:'auto', color:'white',display:'flex',flexDirection:'column', justifyContent:'space-evenly',alignItems:'center', height:'100%', width:'100%'}}>
                <div style={{display:'flex', gap:'5%', minWidth:`${window.screen.width > 500 ? "40%" : "80%"}`,justifyContent:'space-evenly'}}>
                    <h3>Food</h3>
                    <h3>Recipes</h3>
                    <h3>Blogs</h3>
                    <h3 style={{width:'fit-content'}}>About Us</h3>
                </div>
                <h3 style={{display:'flex', alignItems:'center', gap:'10px'}}>Made with <FavoriteIcon /> and <MusicNoteIcon /></h3>
            </div>
        </div>
    )

}

export default Footer;