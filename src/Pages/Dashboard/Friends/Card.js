import { Button } from '@material-ui/core';
import  {db}  from '../../../firebase'
import React, { useState } from 'react'
import './Card.css'
import { useParams } from 'react-router';



const Card = ({ name,client_id,my_name }) => {
  const params = useParams();
  const my_id = params.uid;
const [acceptRequest, setAcceptRequests] = useState(false);


const handlereq =  () => {

  console.log(my_id);
  if (client_id) {
    console.log(my_name + "has acccepted friend requests to ",name)

    // Accepts a request and adds friend
    db.collection('Users').doc('Client').collection('clientel').doc(my_id).collection('friends')
      .doc(client_id).set(
        {
          name: name,
        }
      ).then(()=>{
        console.log("Added")
      })

      db.collection('Users').doc('Client').collection('clientel').doc(client_id).collection('friends')
      .doc(my_id).set(
        {
          name: my_name,
        }
      )

      db.collection('Users').doc('Client').collection('clientel').doc(my_id).collection('requests')
      .doc(client_id).delete()
    //   .then(() => {
    //     console.log("Document successfully deleted!");
    // }).catch((error) => {
    //     console.error("Error removing document: ", error);
    // });
  //  // requests are deleted after acceptance
  // //  
   }

  }

  return (
    <div className="friend__card">
      <div className="circle"></div>
      <div className="user_name">{name}</div>
      <Button onClick={handlereq}>Accept Request</Button>
    </div>
  );
}

export default Card
