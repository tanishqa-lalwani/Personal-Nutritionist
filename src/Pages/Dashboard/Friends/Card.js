import { Button } from '@material-ui/core';
import  {db}  from '../../../firebase'
import React from 'react'
import './Card.css'


const Card = ({ name,uid }) => {
  return (
    <div className="friend__card">
      <div className="circle"></div>
      <div className="user_name">{name}</div>
      <Button onClick={()=>{
        db.collection('Users').doc('Client').collection('clientel').doc(uid).collection('friends')
        .doc(name).set(
          {
            name: "friend",
          }
        )
  
      // requests are deleted after acceptance
      db.collection('Users').doc('Client').collection('clientel').doc(uid).collection('requests')
        .doc(name).delete();

        db.collection('Users').doc('Client').collection('clientel').doc(name).collection('friends')
        .doc(uid).set(
          {
            name: "friend",
          }
        )
      }}>Accept Request</Button>
    </div>
  );
}

export default Card
