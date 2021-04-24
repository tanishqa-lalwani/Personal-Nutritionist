import React, { useState, useRef } from 'react'
import './Signup.css'
import { Link, useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import img from './image 1.png'
import TextField from '@material-ui/core/TextField';
import { useAuth } from '../../AuthContext'


function Signup({ close }) {

  
  }

  return (
    <div className="signUp">
      <div className="left__signup"></div>
      <div className="parent__container_signup">
        <div>
          <div className="signUp__title">
            <h3> Sign up </h3>
            <CloseIcon onClick={close} style={{ background: 'rgba(0,150,255)', padding: '10px', borderRadius: '50%', color: 'white' }} />
          </div>
          <div className="signUp__container">
            <TextField id="outlined-basic" inputRef={emailRef} name="email" label="Email" variant="outlined" />
            <TextField id="outlined-basic" inputRef={passwordRef} name="password" label="Password" variant="outlined" type="password" />
            <TextField id="outlined-basic" inputRef={passwordConfirmRef} name="passwordConf" label="Confirm Password" variant="outlined" type="password" />
            <div className="validation-error">
              <span className="text">{error}</span>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Link className="items__drawer" to="/userclass/dashboard" style={{ textDecoration: "none", color: 'white' }}>
            <Button onClick={handleSubmit} id='trial__but' variant="filled" style={{ background: '#699DFF', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize', color: 'white' }}>
              Sign Up
                    </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup