import { Button } from '@material-ui/core';
import { db } from '../../../firebase'
import React from 'react'
import './Card.css'

const handlereq = (e) => {

  if (e) {

    // Accepts a request and adds friend
    db.collection('Users').doc('Client').collection('clientel').doc('hyQ5flbxihZTI5Uc0r4UgZPAkCS2').collection('friends')
      .doc(e.toString()).set(
        {
          name: "friend",
        }
      )

    // requests are deleted after acceptance
    db.collection('Users').doc('Client').collection('clientel').doc('hyQ5flbxihZTI5Uc0r4UgZPAkCS2').collection('requests')
      .doc(e).delete();
  }
}
const Card = ({ name }) => {
  return (
    <div className="friend__card">
      <div className="circle"></div>
      <div className="user_name">{name}</div>
      <Button onClick={handlereq(name)}>Accept Request</Button>
    </div>
  );
}

export default Card
