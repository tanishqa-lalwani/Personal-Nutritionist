import { Button, Snackbar } from '@material-ui/core';
import  {db}  from '../../../firebase'
import React, { useState } from 'react'
import './Card.css'
import { useParams } from 'react-router';
import MuiAlert from '@material-ui/lab/Alert';



const Card = ({ name,client_id,my_name }) => {
  const params = useParams();
  const my_id = params.uid;
const [acceptRequest, setAcceptRequests] = useState(false);


// console.log(my_id, client_id);
const handlereq =  () => {

  
}

  
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const [state, setState] = React.useState({
  open: false,
  vertical: 'top',
  horizontal: 'center',
});

const { vertical, horizontal, open } = state;



const handleClose = () => {
  setState({ ...state, open: false });
};

  return (
    <div className="friend__card" style = {{display : 'flex',flexDirection : 'column', alignItems : 'center'}}>
      <div className="circle" ></div>
      <div className="user_name">{name}</div>
      <Button onClick = {() => {
          setState({ open: true, ...{ vertical: 'top', horizontal: 'center' } })


      if (client_id) {
      db.collection('Users').doc('Client').collection('clientel').doc(client_id).collection('friends')
      .doc(my_id).set({
        name: my_name,
      },{merge: true})
      .catch((error) => {
      console.error("Error adding document: ", error);
      });
  //Accepts a request and adds friend
      db.collection('Users').doc('Client').collection('clientel').doc(my_id).collection('friends')
      .doc(client_id.substring(1)).set(
      {
        name: name,
      }
    )

      db.collection('Users').doc('Client').collection('clientel').doc(my_id).collection('requests')
      .doc(client_id).delete()

}

      }

    }
         >Accept Request</Button>
           <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                     key={vertical + horizontal}
                  >
                    <Alert onClose={handleClose} severity="success">
                     FriendRequest  Accepted!!
                    </Alert>
                </Snackbar>
    </div>
  );
}

export default Card
