import React, { useState, useRef } from 'react'
import './Signup.css'
import { Link, useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import img from './login.png'
import nutri from './nutri.png'
import userpic from './user.png'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { useAuth } from '../../AuthContext'
import {db} from '../../firebase'

function Signup({ close }) {
  const emailRef = useRef()
  const [role, setrole] = useState(-1);
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const handleSubmit = e => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setLoading(true);
      setError("Password and Confirm Password are not matching.");
      setLoading(false);
      return;
    }
    try {
      setError("")
      setLoading(true)
      signup(emailRef.current.value, passwordRef.current.value).then((res) => {
        res.user.updateProfile({role : role === 1? "Nutritionist" : "User"}).then(()=>{
          db.collection('Users').doc(res.user.role===1?"Nutritionist":"Client")
          .collection('clientel')
          .doc(res.user.uid).set({
          height: 0,
          weight: 0,
          activity_level: 0,
          name: "New User",
          goal: 0,
          age: 0,
          email: res.user.email
          })
          history.push(`/${res.user.uid}/dashboard`);
        })
      })
        .catch((error) => {
          console.log(error.code);
          setError(error.message);
        });

    }
    catch {
      setError("Failed to create an account, try again after sometime.")
    }
    setLoading(false)
  
  }

  return (
    <div className="signUp">
      <div className="left__signup" style={{background:`url(${img})`, backgroundSize:'cover', borderTopLeftRadius:'inherit', borderBottomLeftRadius:'inherit'}}></div>
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
            {
              role>-1?
              <img src={role===1? `${nutri}` : `${userpic}`} style={{margin:'auto', maxHeight:'100px'}}/>
              :<></>
            }
            <h3 style={{ display: 'flex', justifyContent: 'space-evenly' , alignItems:'center'}}>I am a :
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
              <FormControlLabel value="1"  control={<Radio color="primary" onClick={(e)=>{setrole(Number(e.target.value))}}/>} label="Nutritionist" />
                <FormControlLabel value="0"  control={<Radio color="primary" onClick={(e)=>{setrole(Number(e.target.value))}}/>} label="User" />
              </RadioGroup>
            </h3>
            <div className="validation-error">
              <span className="text">{error}</span>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
            <Button onClick={handleSubmit} id='trial__but' variant="filled" style={{ background: '#699DFF', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize', color: 'white' }}>
            {loading?<CircularProgress style={{margin:'auto', color:'white'}}/>:<>Sign Up</>}
            </Button>
        </div>
      </div>
    </div>
  )
}

export default Signup