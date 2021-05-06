import React, { useState, useRef } from 'react'
import './login.css'
import { Link, useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import img from './login.png'
import TextField from '@material-ui/core/TextField';
import { useAuth } from '../../AuthContext'
import {auth, db} from '../../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';

function Login({ close }) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value).then((res) => {
        if(res.user.displayName === "Nutritionist")
        {
         db.collection('Users').doc('Nutritionist').collection('staff').doc(res.user.uid)
         .onSnapshot(
           snap=>{
             console.log(snap,res.user.uid)
             if(snap.data()?.verify===0)
             {auth.signOut(); history.push('/verification') }
             else 
             history.push(`/${res.user.uid}/${res.user.displayName==="User" ? "dashboard":"Nutritionistdashboard"}`);
            }) 
        }
        else
          history.push(`/${res.user.uid}/${res.user.displayName==="User" ? "dashboard":"Nutritionistdashboard"}`);
        close();
      })
        .catch((error) => {
          console.log(error.code);
          if (error.code == 'auth/wrong-password')
            setError('Wrong Password.');
          else if (error.code == 'auth/user-not-found')
            setError('This user don\'t exist. Please Sign Up.');
          else
            setError(error.message);
        });

    } catch {
      setError("Failed to log in, please try again after sometime.")
    }

    setLoading(false)
  }

  return (
    <div className="Login">
      <div className="left__login" style={{ backgroundImage: `url("${img}")`, backgroundSize: 'cover' }}></div>
      <div className="parent__container__login">
        <div>

          <div className="login__title">
            <h3> Log in </h3>
            <CloseIcon onClick={close} style={{ background: 'rgba(0,150,255)', padding: '10px', borderRadius: '50%', color: 'white' }} />
          </div>
          <div className="login__container">
            <TextField id="outlined-basic" inputRef={emailRef} name="email" label="Email" variant="outlined" />
            <TextField id="outlined-basic" inputRef={passwordRef} name="password" label="Password" variant="outlined" type="password" />
          </div>
          <div className="validation-error">
            <span className="text">{error}</span>
          </div>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection:'column', gap:'20px'}}>
          <Button id='trial__but' onClick={handleSubmit} variant="filled" style={{ background: '#699DFF', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize', color: 'white' }}>
          {loading?<CircularProgress size={25} style={{margin:'auto', color:'white'}}/>:<>Log in</>}
          </Button>
        </div>

      </div>
    </div>
  )
}

export default Login