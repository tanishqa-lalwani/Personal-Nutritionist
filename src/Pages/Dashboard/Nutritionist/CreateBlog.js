import React, { useState } from 'react'
import './CreateBlog.css'
import Blogitem from '../../../Pages/Blogs/Blogitem copy'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { db, firebase, storage } from '../../../firebase'
import { useAuth } from '../../../AuthContext'


function CreateBlog({ uid, ndata }) {
    const user = useAuth()
    const [open, setOpen] = useState(false);
    const [userd, setuserd] = useState([])
    const [filled, setfilled] = useState(0)

    const [data, setdet] = useState({
        short_desc: "",
        long_desc: "",
        title: "",
        name: "",
        occupation: "",
        date: (new Date()).toString(),
        email: "",
        image: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdet({ ...data, [name]: value })
    }
    const chooseFile = (e) => {
        setdet({ ...data, image: e.target.files[0] })
    }
    React.useEffect(() => {
        db.collection('Users').doc('Nutritionist')
            .collection('staff')
            .doc(uid).onSnapshot(snap => setuserd(snap.data()))
    }, [userd?.length])

    const handleSubmit = () => {

            let doc_name = uid.toString() + (Date.now()).toString();
            
            db.collection('Users').doc('Nutritionist').collection('blogs').doc(doc_name).set({
                
                long_desc: data.long_desc,
                short_desc: data.short_desc,
                title: data.title,
                date: data.date,
                email: ndata.email,
                name: ndata.name,
                occupation: ndata.occupation,
                image: "",
                uid: uid
                
            }).then(() => { console.log("Successful") })
            
            let nameit = (data.image?.name + Date.now().toString()).toString();
            const upTak = storage.ref(`images/${nameit}`).put(data.image);
            
            upTak.on(
                'state_changed', (snapShot) => {
                    console.log((snapShot.bytesTransferred / snapShot.totalBytes) * 100);
                }, null,
                () => {
                    storage
                    .ref('images')
                    .child(nameit)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection('Users').doc('Nutritionist').collection('blogs')
                        .doc(doc_name).update({
                            image: url
                        });
                    });
                }
                )
                
                db.collection('Users').doc('Nutritionist').collection('staff').doc(user.currentUser.uid).collection('blogid').doc(doc_name).set({ status: 'published' })
            

    }

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
      const  [convertedContent, setConvertedContent] = useState(null);
      const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
      }
      const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
        setdet({...data,long_desc : currentContentAsHTML})
      }

    return (
        <div className="BlogDashboard">
            <div className="Blog_info">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontFamily: 'Poppins', fontWeight: '600', color: '#321E59' }}>Hi, {ndata?.name}</p>
                    <div className="AddBlog">
                        {open ? <button id="delete_draft" onClick={() => setOpen(!open)}>Delete draft<DeleteIcon /></button> :
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setOpen(!open)}>
                                <h4 style={{ color: '#321E59' }}>Create New</h4>
                                <AddCircleIcon />
                            </div>}
                    </div>
                </div>

                {open &&
                    <div className="AddDetails">
                        <p style={{ fontFamily: 'Poppins', fontWeight: '600', color: '#321E59', paddingBottom: '30px' }}>Start writing your blog here.</p>
                        <div style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <label style={{ color: '#321E59' }}>Title</label><br />
                                <input type="text" value={data.title} name="title" style={{ width: '500px', padding: '12px 15px', margin: '8px 0' }} onChange={handleChange} />
                            </div>
                            <input
                                id="blogimg"
                                onChange={chooseFile}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <label for="Image">
                                <div style={{ width: '150px', display: 'flex', background: 'rgba(150,255,0,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                                    <p dangerouslySetInnerHTML={{ __html: "<b>Upload</b>" }}></p>
                                </div>
                            </label>
                        </div>
                        <div style={{ paddingBottom: '15px' }}>
                            <label style={{ color: '#321E59' }}>Short Introduction (1-2 lines)</label><br />
                            <input type="text" name="short_desc" style={{ width: '100%', padding: '12px 15px', margin: '8px 0' }} value={data.short_desc} onChange={handleChange} />
                        </div>

                        <header className="App-header">
                            Blog Content
                        </header>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={handleEditorChange}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            />

                        <div className="uploadbtn">
                            <button id="upload_btn" onClick={handleSubmit}>Upload blog</button>
                        </div>
                    </div>
                }
            </div>
        </div >
    );
}

export default CreateBlog

