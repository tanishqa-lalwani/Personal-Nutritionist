import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { db , storage} from '../../firebase'
import { Avatar, IconButton } from '@material-ui/core';
import upload from '../../Images/upload.svg';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import './Nutritionistprofile.css';
import avatar from './user.png';
import Footer from '../../Components/Footer/footer'
import { useAuth } from '../../AuthContext'

export default function NutritionistProfile(props) {
    // const name = useRef(null);
    const det = {
        occupation: "",
        bio: "",
        name: "",
        qualification: "",
        experience: 0,
        email: "",
        image: ""
    };

    const [data, setdata] = React.useState(det);

    React.useEffect(() => {
        db.collection('Users').doc('Nutritionist')
            .collection('staff')
            .doc(props.match.params.uid)
            .onSnapshot((snap) => {
                setdata(snap.data());
            })

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setdata({ ...data, [name]: value });
    };

    const handlesave = () => {
        db.collection('Users').doc('Nutritionist')
            .collection('staff')
            .doc(props.match.params.uid).set({
                occupation: data.occupation,
                bio: data.bio,
                name: data.name,
                qualification: data.qualification,
                experience: Number(data.experience),
                email: data.email
            })
    }
    // console.log(name)
    const [progress, setdp] = React.useState(0);

    const handleupload = (e) => {

        if(e.target.files[0]){

            let nameit = (e.target.files[0].name + Date.now().toString()).toString();
            const upTak = storage.ref(`images/${nameit}`).put(e.target.files[0]);
            
            upTak.on(
                'state_changed', (snapShot) => {
                    setdp((snapShot.bytesTransferred/snapShot.totalBytes)*100);
                }, null,
                () => {
                    storage
                    .ref('images')
                    .child(nameit)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection('Users').doc('Nutritionist').collection('staff')
                        .doc(props.match.params.uid).update({
                            image: url
                        });
                    });
                }
                )
            }
            setdp(0);

    }

    return (

        <div className="Profile">
            <div className="parent__container">

                <div className="profile__title">
                    <h3> Your Profile </h3>
                </div>

                <div className="user_photo">
                    <div className="Avatar" style={{ position: 'relative' }}>
                        <Avatar src={data?.image} style={{ height: '100px', width: '100px' }} />
                        <label for="dp" style={{ padding: 0 }}>
                            <IconButton htmlFor="dpup" style={{ position: 'absolute', padding: 8, top: 50, left: 60, background: 'white', border: "1px solid black" }}>
                                <img src={upload} style={{ width: 15 }} />
                            </IconButton>
                            <div style={{ position: 'absolute', padding: 15, top: 50, cursor:'pointer',left: 60, opacity: 0, background: 'white', border: "1px solid black" }}></div>
                        <input id="dp" type="file" onChange={handleupload} accept="images/*" style={{ display: 'none' }} />
                        </label>
                    </div>
                    <div style={{marginTop:'40px', border:"1px solid black",position:'relative',borderRadius:'20px',height:'10px',textAlign:'center',display:`${progress===0 || progress===100?"none":"block"}`}}>
                        <div style={{width:`${progress}%`, background:'#699DFF', height:'10px',position:'absolute',top:0, borderRadius:'inherit'}}></div>
                    </div>
                </div>

                <div className="Info">
                    <TextField id="username" name="name" onChange={handleChange} label="Username" value={data?.name} variant="outlined" />
                    <TextField id="Email" name="email" onChange={handleChange} label="Email" value={data?.email} variant="outlined" type="email" />
                    <TextField id="Password" label="Password" value="12345" variant="outlined" type="password" />
                    <TextField id="Occupation" name="occupation" onChange={handleChange} label="Occupation" value={data?.occupation} variant="outlined" />
                    <TextField id="Qualification" name="qualification" onChange={handleChange} label="Qualification" value={data?.qualification} variant="outlined" />
                    <div className="numericals">
                        <TextField id="Experience" name="experience" onChange={handleChange} label="Experience" value={data?.experience}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">Years</InputAdornment>,
                            }}
                            variant="outlined" />
                    </div>
                    <TextField id="Bio" name="bio" onChange={handleChange} label="Bio" value={data?.bio} variant="outlined" />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button id='trial__but' onClick={handlesave} variant="filled" style={{ background: '#699DFF', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize', color: 'white' }}>
                        Save Changes
                </Button>
                </div>
            </div>
            <Footer />
        </div>

    )
};