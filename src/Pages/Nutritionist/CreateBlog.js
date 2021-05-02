import React,{useState} from 'react'
import './CreateBlog.css'
import Blogitem from '../../Pages/Blogs/Blogitem.js'
import DashDrawer from '../../Components/Dash Drawer/DashDrawer.js'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

function CreateBlog()
{
    const [open,setOpen] = useState(false);

    return(
        <div className="BlogDashboard">
            <DashDrawer/>

            <div className="Blog_info">
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <p style={{fontFamily:'Poppins',fontWeight:'600', color:'#321E59'}}>Hii Username!!!</p>
                    <div className="AddBlog">
                        {open ? <button id="delete_draft" onClick={()=>setOpen(!open)}>Delete draft<DeleteIcon/></button>:
                        <div style={{display:'flex'}}>
                        <h4 style={{color:'#321E59'}}>Create New</h4>
                        <AddCircleIcon onClick={()=>setOpen(!open) }/>
                        </div>}
                    </div>
                 </div>   

                {open && 
                    <div className="AddDetails">
                        <p style={{fontFamily:'Poppins',fontWeight:'600', color:'#321E59',paddingBottom:'30px'}}>Start writing your blog here.</p>
                        <form>
                            <div style={{paddingBottom:'15px',display:'flex',justifyContent:'space-between'}}>
                                <div>
                                    <label style={{color:'#321E59'}}>Title</label><br/>
                                    <input type="text" style={{width:'500px',padding:'12px 15px',margin:'8px 0'}}/>
                                </div>    
                                <div>
                                    <p>Upload Image (180x200 px)</p>
                                    <button id="upload_img">Upload</button>
                                </div>    
                            </div>
                            <div style={{paddingBottom:'15px'}}>
                                <label style={{color:'#321E59'}}>Short Introduction (1-2 lines)</label><br/>
                                <input type="text" style={{width:'100%',padding:'12px 15px',margin:'8px 0'}}/>
                            </div>
                            <div style={{paddingBottom:'15px'}}>
                                <label style={{color:'#321E59'}}>Description</label><br/>
                                <textarea style={{width:'100%',height:'200px',border:'1px solid #2F80ED',resize:'none',padding:'12px 15px',margin:'8px 0'}}/>
                            </div>
                            <div className="uploadbtn">
                                <button id="upload_btn" onClick={()=>setOpen(!open) }>Upload blog</button>
                            </div>
                        </form>
                    </div>
                }

                <div className="PreBlog">
                    <h3 style={{color:'#321E59'}}>Your previous blogs</h3>
                </div>
                    
                <div className="Blog_items">
                    <Blogitem/>
                </div>
            </div>
        </div>
    );
}

export default CreateBlog

