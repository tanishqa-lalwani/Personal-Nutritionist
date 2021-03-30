import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import './Nutritionistprofile.css';
import avatar from './user.png';
import Footer from '../../Components/Footer/footer'

export default function Clientprofile() {

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
                <TextField id="username" label="Username" defaultValue="Your_username" variant="outlined" />
                <TextField id="Email" label="Email" defaultValue="Your_username@gmail.com" variant="outlined" type="email" />
                <TextField id="Password" label="Password" defaultValue="12345" variant="outlined" type="password" />
                <TextField id="Occupation" label="Occupation" defaultValue="Fitness trainer" variant="outlined" />
                <TextField id="Qualification" label="Qualification" defaultValue="M.S. in nutrition and exercise" variant="outlined" />
                <TextField id="Bio" label="Bio" defaultValue="Providing Fitness Training, Consulting for Diet, Weight Loss Training, Zumba Classes. " variant="outlined" />
            </div>

            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <Button id='trial__but' variant="filled" style={{ background: '#699DFF', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize', color: 'white'}}> 
                    Save Changes
                </Button>
            </div>
        </div>
        <Footer />
    </div>

  )
};