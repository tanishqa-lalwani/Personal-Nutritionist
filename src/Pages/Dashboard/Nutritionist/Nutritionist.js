import React, { useState, useEffect } from 'react'
import './Nutritionist.css'
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile'
import Followers from './Followers'
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import CreateBlog from './CreateBlog'
import Cardfr from '../Friends/Card'
import userEvent from '@testing-library/user-event'
import Button from '@material-ui/core/Button';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Blogitem from '../../Blogs/Blogitem copy'
import DeleteIcon from '@material-ui/icons/Delete';
import { db ,firebase, storage} from '../../../firebase'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(0deg)',
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },
}));

const Nutritionist = (props) => {

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
  
  const [imgprev, setimgprev] = useState(null);

  let uid = props.match.params.uid;
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    setdet({ ...data, long_desc: currentContentAsHTML })
  }

  const [page, setpage] = useState(0);
  const [userdata, setuserdata] = useState([])
  const [blogs, setblog] = useState([])
  const [expanded, setExpanded] = React.useState(false);

  const page_dict = {
    0: "Daily Goals",
    1: "Progress",
  }

  const image_dict = {
    "Daily Goals": "Goals",
    "Progress": "Progress",
  }

  useEffect(() => {
    db.collection('Users').doc('Nutritionist').collection('staff')
      .doc(props.match.params.uid).onSnapshot(
        snap => { setuserdata(snap.data()) })

    db.collection('Users').doc('Nutritionist').collection('blogs')
    .where("uid", "==", props.match.params.uid)
      .onSnapshot(
        snap => (setblog(snap.docs.map(
          doc => ({ ids: doc.id, bdata: doc.data() }))))
      )

  }, [userdata?.length, blogs?.length])


  const handleExpandClick = () => {
    setExpanded(!expanded);
    setimgprev(null);
    setdet({
      short_desc: "",
      long_desc: "",
      title: "",
      name: "",
      occupation: "",
      date: (new Date()).toString(),
      email: "",
      image: null
    });
  };

  const classes = useStyles();

  const handleSubmit = () => {

    let doc_name = uid.toString() + (Date.now()).toString();

    console.log(firebase.firestore.FieldValue.serverTimestamp());

    db.collection('Users').doc('Nutritionist').collection('blogs').doc(doc_name).set({

        long_desc: data.long_desc,
        short_desc: data.short_desc,
        title: data.title,
        date: data.date,
        email: userdata.email,
        name: userdata.name,
        occupation: userdata.occupation,
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

    db.collection('Users').doc('Nutritionist').collection('staff').doc(uid).collection('blogid').doc(doc_name).set({ status: 'published' })
    handleExpandClick();
  }

const handleCh = (e) => {
  const {name, value} = e.target;
  setdet({...data, [name]: value})
}

  return (
    <div className="Nutritionist Nutritionist_mob">
      {
        window.screen.width > 500 ? (
          <DashDrawer pageset={setpage} uid={props.match.params.uid} page={page} />
        ) : (
          <DashDrawerMobile pageset={setpage} loc={page_dict[page]} page={page} img={image_dict[page_dict[page]]} uid={props.match.params.uid} />
        )
      }
      {
        page === 0 ?
          <div style={{ marginTop: '100px', fontFamily: "Poppins", marginLeft: '50px', width: 'calc(80vw - 100px)' }}>
            <h2 style={{ color: '#321E59', marginBottom: '30px' }}>Hi {userdata?.name}</h2>
            <Card style={{marginBottom:'20px'}}>
              <CardActions disableSpacing>
                <h2 style={{ color: '#321E59' }}>
                  {expanded ? <>Write a new blog</> : <>
                    Blogs ({blogs.length})
                  </>}
                </h2>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  {
                    expanded ?
                      <DeleteIcon /> :
                      <AddIcon />
                  }
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{display:'flex',gap:'20px', width:'100%'}}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width:'100%' }}>
                        <h3 style={{ color: '#321E59' }}>Title</h3>
                        <TextField id="title" name="title" onChange={handleCh} value={data.title} style={{ width: '100%' }} label="Title" variant="outlined" />

                        <h3 style={{ color: '#321E59' }}>Short Description</h3>
                        <TextField id="short_desc" name="short_desc" onChange={handleCh} value={data.short_desc} style={{ width: '100%' }} label="Short Description" variant="outlined" />
                      </div>
                      <input id="blog_img" type="file" onChange={(e)=>{
                        setdet({...data,image:e.target.files[0]})
                        setimgprev(URL.createObjectURL(e.target.files[0]))

                      }} accept="image/*" style={{display:'none'}}/>
                      <label for="blog_img" style={{border:"1px dotted gray", width:'30%', minHeight:'100%', color:'gray'}}>
                        <div 
                        style={{display:'flex',background:`url('${imgprev ? imgprev:""}')`,backgroundSize:'100% 100%',flexDirection:'column', alignItems:'center',justifyContent:'center', minHeight:'100%',color:'gray'}}
                        >
                          {imgprev?<></>:<>
                          <AddIcon fontSize="large"/>
                          <p>Upload a picture</p>
                          <p>(Optional)</p>
                          </>}
                        </div>
                      </label>
                    </div>

                    <header className="App-header">
                      <h3 style={{ color: '#321E59' }}>Blog Content</h3>
                    </header>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={handleEditorChange}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                    />
                    <div className="uploadbtn">
                            <Button id="upload_btn" style={{textTransform:'capitalize'}}
                            onClick={handleSubmit}
                            >Upload blog</Button>
                      </div>
                  </div>
                </CardContent>
              </Collapse>
            </Card>
            {/* <CreateBlog uid={props.match.params.uid} userdata={userdata} /> */}
            <h2 style={{ color: '#321E59', marginBottom: '30px' }}>Your Previous Blogs</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)', gridColumnGap:'10px', gridRowGap:'10px', marginBottom:'20px'}}>
              {
                blogs?.map(({ ids, bdata }) => (
                  <Blogitem title={bdata.title} id={ids}
                    description={bdata.short_desc} nutriName={bdata.name}
                    nutriOccupation={bdata.occupation} tags={bdata.tags}
                    img={bdata.image} date={bdata.date} />
                ))
              }
            </div>
          </div> : <></>
      }
      {
        page === 1 ? <Followers name={userdata?.name} uid={props.match.params.uid} /> : <></>
      }

    </div>
  );
}

export default Nutritionist