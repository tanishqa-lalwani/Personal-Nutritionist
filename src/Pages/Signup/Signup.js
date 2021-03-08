import React from 'react'
import './Signup.css'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import img from './image 1.png'
import TextField from '@material-ui/core/TextField';

function Signup({ close }) {
    return (
        <div className="signUp">
            <div className="left__signup" style={{backgroundImage:`url("${img}")`, backgroundSize:'cover'}}></div>
            <div className="parent__container">
                <div className="signUp__title">
                    <h3> Sign up </h3>
                    <CloseIcon onClick={close} style={{ background: 'rgba(0,150,255)', padding: '10px', borderRadius: '50%', color: 'white' }} />
                </div>
                <div className="signUp__container">
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <TextField id="outlined-basic" label="Password" variant="outlined" type = "password"/>
                </div>
                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <Button id='trial__but' variant="filled" style={{ background: '#699DFF', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize', color: 'white'}}> 
                        Sign Up 
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default Signup
