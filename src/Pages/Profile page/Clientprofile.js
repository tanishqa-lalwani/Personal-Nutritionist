import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import './Clientprofile.css';
import avatar from './user.png';


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
                <div className="numericals">
                    <TextField id="weight" label="Weight" defaultValue="58"
                           InputProps={{
                                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                            }}
                            variant="outlined" />
                    <TextField id="height" label="Height" defaultValue="182"
                           InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                            }}
                            variant="outlined" />
                    <TextField id="age" label="Age" defaultValue="21"
                           InputProps={{
                                endAdornment: <InputAdornment position="end">years</InputAdornment>,
                            }}
                            variant="outlined" />
                </div>
                <TextField id="Goal_select" label="Goal" value="" variant="outlined" placeholder="Maintain weight" select>
                            <MenuItem value="10">Maintain weight</MenuItem>
                            <MenuItem value="20">Lose weight</MenuItem>
                            <MenuItem value="20">Gain weight</MenuItem>
                </TextField>
                <TextField id="Activity_select" label="Activity" value="" variant="outlined" placeholder="Moderate" select>
                            <MenuItem value="10">Moderate</MenuItem>
                            <MenuItem value="20">Light active</MenuItem>
                            <MenuItem value="20">Highly active</MenuItem>
                </TextField>
            </div>

            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <Button id='trial__but' variant="filled" style={{ background: '#699DFF', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize', color: 'white'}}> 
                    Save Changes
                </Button>
            </div>
        </div>
    </div>

  )
};