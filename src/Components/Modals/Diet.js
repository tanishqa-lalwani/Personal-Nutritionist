import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import {db} from '../../firebase'
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Diet({uid,nuid,text, color, border}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = React.useState({
      recp1:"",recp2:"",recp3:""
  })
  
  const handle_Open = () => {
    setOpen(true);
  };

  const handleCh = (e) => {
    const {name,value} = e.target;
    setdata({...data,[name]:value})
  }

  const handle_Close = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" style={{borderRadius:'10px',textTransform:'capitalize',fontFamily:'Poppins, sans-serif',border:`${border === undefined ? "1px solid #321E59" : border}`,color:`${color?color:"#321E59"}`}} onClick={handle_Open}>
        {text}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handle_Close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <div style={{background:'white', fontFamily:'Poppins',borderRadius:'25px', color:'rgba(50, 30, 89, 1)',display:'flex', gap:'20px',minWidth:'25vw',textAlign:'center',flexDirection:'column', padding:'20px'}}>
            <h2>Submit recipe ids</h2>
            <h3>Breakfast</h3>
            <TextField name="recp1" onChange={handleCh} value={data.recp1} style={{ width: '100%' }} label="Breakfast" variant="outlined" />
            <h3>Lunch</h3>
            <TextField name="recp2" onChange={handleCh} value={data.recp2} style={{ width: '100%' }} label="Lunch" variant="outlined" />
            <h3>Dinner</h3>
            <TextField name="recp3" onChange={handleCh} value={data.recp3} style={{ width: '100%' }} label="Dinner" variant="outlined" />
            <Button onClick={()=>{
                db.collection('Users').doc('Client').collection('clientel').doc(uid).collection("dietplans")
                .doc(nuid).set({
                    breakfast : data.recp1, // 716426
                    lunch : data.recp2, // 798400
                    dinner : data.recp3 // 794349
                });  handle_Close();
            }} color="primary" variant="contained">Submit/Edit</Button>
            </div>
        </Fade>
      </Modal>
    </div>
  );
}