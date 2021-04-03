import React from 'react'
import './Friends.css'
import TextField from '@material-ui/core/TextField';
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile'
import Card from './Card'
import { db } from '../../../firebase'
import { Avatar } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Friends = () => {

  const [name, setname] = React.useState("");
  const [ser, setser] = React.useState([]);
  const [tan_data, settan] = React.useState("");

  React.useEffect(() => {
    db.collection('Users')
      .doc('Client')
      .collection('clientel')
      .doc('hyQ5flbxihZTI5Uc0r4UgZPAkCS2')
      .collection('requests')
      .onSnapshot(
        (resp) => {
          resp.docs.map((doc) => { setname(doc.id) }
          )
        }
      )

  }, [name])

  const search = (e) => {
    if (e !== "") {

      db.collection('Users').doc('Client').collection('clientel')
        .orderBy('name')
        .startAt(e.target.value)
        .endAt(e.target.value + '\uf8ff')
        .get()
        .then((snapshot) => {
          setser(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              sers: doc.data(),
            }))
          );
        });
    }
  }

  const add_friend = (e) => {
    // if (e) {
    db.collection('Users').doc('Client').collection('clientel').doc('hyQ5flbxihZTI5Uc0r4UgZPAkCS2').collection('requests')
      .doc(e).set(
        {
          name: "wants to add friend",
        }
      )
    // }
  }


  return (
    <div className="Friends Friends_mob">
      {window.screen.width > 500 ? (
        <DashDrawer />
      ) : (
        <DashDrawerMobile loc="Daily Goals" img="Goals" />
      )}
      <div className="Friends_body Friends_body_mob">
        <div style={{ width: '50%' }}>
          <p className="friends__username friends__username_mob">
            {" "}
            {"Hii Username!!"}{" "}
          </p>
          <p className="friends__leaderboard__heading friends__leaderboard__heading_mob">
            LeaderBoard
          </p>
          <div className="leaderboard__card leaderboard__card_mob"></div>
          <p className="yourfriends yourfriends_mob">Your Friends</p>
          <div className="friends_card friedns_card_mob">

            < Card name={name} />
          </div>
        </div>
      </div>
      <div style={{ width: '30%', background: "url('https://images.unsplash.com/photo-1617348523950-66b425e5c66b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1095&q=80')", marginTop: '50px', display: 'flex', flexDirection: 'column', padding: '20px', paddingTop: '40px', alignItems: 'center' }}>
        {/* <h1>Search bar</h1> */}
        <TextField id="outlined-basic" label="Search Friends" onChange={search} variant="outlined" style={{ width: '100%' }} />
        <div className="results">
          {/* <h1>Search</h1> */}
          {
            ser.map(({ id, sers }) => (
              <div style={{
                display: 'flex', padding: '10px', gap: '10px', alignItems: 'center',
              }}>
                <Avatar src={sers.image} />
                <p style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
                  <p>
                    {sers.name}
                  </p>
                  <p>Age : {sers.age}</p>
                </p>
                <p onClick={add_friend(id)} style={{ marginLeft: 'auto', display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <p>Add</p>
                  <AddCircleIcon /></p>
              </div>
            ))
          }
          {/* 
          <div style={{ display: 'flex', padding: '10px', gap: '10px', alignItems: 'center', background: 'transparent' }}>
            <Avatar />
            <p>Username</p>
            <p style={{ marginLeft: 'auto', display: 'flex', gap: '5px', alignItems: 'center' }}>
              <p>Add</p>
              <AddCircleIcon /></p>
          </div>
          <div style={{ display: 'flex', padding: '10px', gap: '10px', alignItems: 'center', background: 'transparent' }}>
            <Avatar />
            <p>Username</p>
            <p style={{ marginLeft: 'auto', display: 'flex', gap: '5px', alignItems: 'center' }}>
              <p>Add</p>
              <AddCircleIcon /></p>
          </div>
          <div style={{ display: 'flex', padding: '10px', gap: '10px', alignItems: 'center', background: 'transparent' }}>
            <Avatar />
            <p>Username</p>
            <p style={{ marginLeft: 'auto', display: 'flex', gap: '5px', alignItems: 'center' }}>
              <p>Add</p>
              <AddCircleIcon /></p>
          </div>
          <div style={{ display: 'flex', padding: '10px', gap: '10px', alignItems: 'center', background: 'transparent' }}>
            <Avatar />
            <p>Username</p>
            <p style={{ marginLeft: 'auto', display: 'flex', gap: '5px', alignItems: 'center' }}>
              <p>Add</p>
              <AddCircleIcon /></p>
          </div>
          <div style={{ display: 'flex', padding: '10px', gap: '10px', alignItems: 'center', background: 'transparent' }}>
            <Avatar />
            <p>Username</p>
            <p style={{ marginLeft: 'auto', display: 'flex', gap: '5px', alignItems: 'center' }}>
              <p>Add</p>
              <AddCircleIcon /></p>
          </div> */}
        </div>
      </div >
    </div >
  );
}

export default Friends
