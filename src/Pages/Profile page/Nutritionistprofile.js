import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import {db} from '../../firebase'

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import './Nutritionistprofile.css';
import avatar from './user.png';
import Footer from '../../Components/Footer/footer'
import {useAuth} from '../../AuthContext'

export default function Clientprofile() {
    const user = useAuth()

    const name = useRef(null);
    const details = {
        qualification : "",
        experience : "",
        name:"Your Name goes here!",
        occupation : "",
        description : "",
        email:"",
        image:""
    };

    const [data,setdata] = React.useState(details);
     user.current = data?.name
    React.useEffect(()=>{
        db.collection('Users').doc('Nutritionist')
        .collection('test_nutritionist')
        .doc('Uxsc0cMfOe9yej0Ac4xn')
        .onSnapshot((doc)=>{
            console.log(doc.data())
           setdata(doc.data());
        })
    },[])

    const handleChange = (e) => {
        const {name,value} = e.target
        setdata ({...data, [name] : value});
      };
  
      const handlesave = ()=>{
          db.collection('Users').doc('Nutritionist')
          .collection('test_nutritionist')
          .doc('Uxsc0cMfOe9yej0Ac4xn').update({
       
          name: data.name,
          email: data.email,
          qualification : data.qualification,
          experience : data.experience,
          occupation : data.occupation,
          description : data.description,
          })
      }

  return (

    <div className="Profile">
        <div className="parent__container">

            <div className="profile__title">
                <h3> Your Profile </h3>
            </div>

            <div className="user_photo">
                <div className="Avatar">
                   <img src={avatar} ></img>
                </div>
            </div>

            <div className="Info">
                <TextField id="username" onChange = {handleChange} label="Username" defaultValue="Your_username" value = {data?.name} variant="outlined" />
                <TextField id="Email"  onChange = {handleChange} label="Email" defaultValue="Your_username@gmail.com" value = {data?.email} variant="outlined" type="email" />
                <TextField id="Password" label="Password" defaultValue="12345" variant="outlined" type="password" />
                <TextField id="Occupation" label="Occupation" defaultValue="Fitness trainer" value = {data?.occupation} variant="outlined" />
                <TextField id="Experience" label="Experience" defaultValue="Since 2014" value = {data?.experience} variant="outlined" />

                <TextField id="Qualification" label="Qualification" defaultValue="M.S. in nutrition and exercise"  value = {data?.qualification} variant="outlined" />
                <TextField id="Bio" label="Bio" defaultValue="Providing Fitness Training, Consulting for Diet, Weight Loss Training, Zumba Classes. " value = {data?.description} variant="outlined" />
            </div>

            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <Button id='trial__but' onClick={handlesave} variant="filled" style={{ background: '#699DFF', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize', color: 'white'}}> 
                    Save Changes
                </Button>
            </div>
        </div>
        <Footer />
    </div>

  )
};