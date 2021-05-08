import React from 'react'
import './SavedBlogs.css'
import Blogitem from '../../../Pages/Blogs/Blogitem copy'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile.js'
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer.js'
import { db } from '../../../firebase'
import { UpdateSharp } from '@material-ui/icons'


function SavedBlogs(props) {
    const [blogid, setblogid] = React.useState([])
    const [blogdata, setblogdata] = React.useState([])

    React.useEffect(() => {
        db.collection('Users').doc('Client').collection('clientel')
            .doc(props.uid).collection('savedblogs')
            .onSnapshot(
                snap => setblogid(snap.docs.map(
                    doc => (doc.id))))

        blogid?.map((bl) => {
            db.collection('Users').doc('Nutritionist').collection('blogs').doc(bl.toString().substring(1)).onSnapshot(snap => {
                setblogdata([...blogdata, {id:bl.toString().substring(1),data:snap.data()}])
            })
        })

        console.log(blogid, blogdata)
    }, [blogid?.length])

    return (
        <div className="BlogDashboard  BlogDashboard_mobile">

            <div className="Blog_info Blog_info_mobile">
                <p style={{ fontFamily: 'Poppins', fontWeight: '600', color: '#321E59' }}>Hii {props.udata.name}!</p>
                {
                    window.screen.width > 500 ?
                        (<h2 style={{ marginTop: '50px', marginBottom: '25px', color: '#321E59' }}>Your favourite blogs</h2>) :

                        (<h2 style={{ marginTop: '10vw', marginBottom: '7vw', color: '#321E59' }}>Your favourite blogs</h2>)
                }
                <div className="Blog_items Blog_items_mobile" style={{width:'100%'}}>
                    {blogdata?.map(blog => (
                        blog ? <Blogitem
                            id={blog.id}
                            nutriName={blog.data.name}
                            nutriOccupation={blog.data.occupation}
                            tags={blog.data.tags}
                            title={blog.data.title}
                            date={blog.data.date}
                            description={blog.data.short_desc}
                            img={blog.data.image}
                        /> : <></>
                    ))}
                    {/* <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/>
                    <Blogitem/> */}
                </div>
            </div>
        </div>
    );
}

export default SavedBlogs

