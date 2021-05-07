import { Button } from '@material-ui/core';
import  {db}  from '../../../firebase'
import React, { useState } from 'react'
import './Card.css'
import { useParams } from 'react-router';



const Card = ({ name,client_id,my_name }) => {
  const params = useParams();
  const my_id = params.uid;
const [acceptRequest, setAcceptRequests] = useState(false);


// console.log(my_id, client_id);
const handlereq =  () => {

  if (client_id) {
    db.collection('Users').doc('Client').collection('clientel').doc(client_id.substring(1)).collection('friends')
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

  
  

  return (
    <div className="friend__card" style = {{display : 'flex',flexDirection : 'column', alignItems : 'center'}}>
      <div className="circle" ></div>
      <div className="user_name">{name}</div>
      <Button onClick = {handlereq} >Accept Request</Button>
    </div>
  );
}

export default Card
