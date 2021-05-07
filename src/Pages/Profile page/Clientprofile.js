import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { db, storage } from '../../firebase'
import './Clientprofile.css';
import upload from '../../Images/upload.svg';
import Footer from '../../Components/Footer/footer'
import { Avatar, IconButton } from '@material-ui/core';
import { CollectionsOutlined } from '@material-ui/icons';



export default function Clientprofile(props) {

    const name = useRef(null);
    const det = {
        height: 0,
        weight: 0,
        activity_level: 0,
        gender: 0,
        name: "",
        goal: 1,
        age: 0,
        email: "",
        image: ""
    };

    const [data, setdata] = React.useState(det);

    React.useEffect(() => {

        db.collection('Users').doc('Client')
            .collection('clientel')
            .doc(props.match.params.uid)
            .onSnapshot((snap) => {
                setdata(snap.data());
            })

    }, [data?.length])

    const handleChange = (e) => {
        const { name, value } = e.target
        setdata({ ...data, [name]: value });
    };

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
                        db.collection('Users').doc('Client').collection('clientel')
                        .doc(props.match.params.uid).update({
                            image: url
                        });
                    });
                }
                )
            }
            setdp(0);

    }
    const handlesave = () => {
        db.collection('Users').doc('Client')
            .collection('clientel')
            .doc(props.match.params.uid).update({
                height: Number(data.height),
                weight: Number(data.weight),
                activity_level: Number(data.activity_level),
                gender: Number(data.gender),
                name: data.name,
                goal: Number(data.goal),
                age: Number(data.age),
                email: data.email
            })
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
                        <input id="dp" type="file" onChange={handleupload} accept="image/*" style={{ display: 'none' }} />
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
                    <div className="numericals">
                        <TextField id="weight" name="weight" onChange={handleChange} label="Weight" value={data?.weight}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                            }}
                            variant="outlined" />
                        <TextField id="height" name="height" onChange={handleChange} label="Height" value={data?.height}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                            }}
                            variant="outlined" />
                        <TextField id="age" name="age" onChange={handleChange} label="Age" value={data?.age}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">years</InputAdornment>,
                            }}
                            variant="outlined" />
                    </div>
                    <TextField id="gender" name="gender" onChange={handleChange} label="Gender" value={data?.gender} variant="outlined" placeholder="Moderate" select>
                        <MenuItem value="0">Male</MenuItem>
                        <MenuItem value="1">Female</MenuItem>
                    </TextField>
                    <TextField id="Goal_select" name="goal" onChange={handleChange} label="Goal" value={data?.goal} variant="outlined" placeholder="Maintain weight" select>
                        <MenuItem value="0">Maintain weight</MenuItem>
                        <MenuItem value="1">Lose weight</MenuItem>
                        <MenuItem value="2">Gain weight</MenuItem>
                    </TextField>
                    <TextField id="Activity_select" name="activity_level" onChange={handleChange} label="Activity" value={data?.activity_level} variant="outlined" placeholder="Moderate" select>
                        <MenuItem value="0">Moderate</MenuItem>
                        <MenuItem value="1">Light active</MenuItem>
                        <MenuItem value="2">Highly active</MenuItem>
                    </TextField>
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
