import React from 'react'
import './Friends.css'
import TextField from '@material-ui/core/TextField';
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile'
import Card from './Card'
import { db } from '../../../firebase'
import { Avatar } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Friends = (props) => {

  const [requests, setreq] = React.useState([]);
  const [ser, setser] = React.useState([]);
  const [str, setstr] = React.useState([]);

  React.useEffect(() => {

    db.collection('Users')
      .doc('Client')
      .collection('clientel')
      .doc(props.uid)
      .collection('requests')
      .onSnapshot(
        (snapsht) => {
          setreq(
            snapsht.docs.map((docs) => ({
              ids: docs.id,
              dc: docs.data(),
            })))
        }
      )

    console.log(requests);
  }, [requests.length])

  const search = (friend_id) => {
    // setstr(e.target.value);

    setstr(friend_id)

    db.collection('Users').doc('Client').collection('clientel')
      .orderBy('name')
      .startAt(friend_id)
      .endAt(friend_id + '\uf8ff')
      .get()
      .then((snapshot) => {

        setser(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            sers: doc.data(),

          }
          ))
        )
      });

  }

  // const add_friend = (e) => {
  // if (e) {

  // }
  // }


  return (
    <div className="Friends Friends_mob">
      {/* {window.screen.width > 500 ? (
        <DashDrawer />
      ) : (
        <DashDrawerMobile loc="Daily Goals" img="Goals" />
      )} */}
      <div className="Friends_body Friends_body_mob">
        <div style={{ width: '50%' }}>
          <p className="friends__username friends__username_mob">
            {" "}
            {`Hii ${props.myname}`}{" "}
          </p>
          <p className="friends__leaderboard__heading friends__leaderboard__heading_mob">
            LeaderBoard
          </p>
          <div className="leaderboard__card leaderboard__card_mob"></div>
          <p className="yourfriends yourfriends_mob">Your Friends</p>
          <div className="friends_card friedns_card_mob">
            {
              requests?.map(({ ids, dc }) => (
                <Card name={ids} uid={props.uid}/>
              ))
            }
          </div>
        </div>
      </div>
      <div style={{ width: '30%', background: "url('https://images.unsplash.com/photo-1617348523950-66b425e5c66b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1095&q=80')", marginTop: '50px', display: 'flex', flexDirection: 'column', padding: '20px', paddingTop: '40px', alignItems: 'center' }}>
        <TextField id="outlined-basic" label="Search Friends" value={str} onChange={(e) => search(e.target.value)} variant="outlined" style={{ width: '100%' }} />
        <div className="results">
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
                  {console.log("Age", sers.age)}
                  <p>Age : {sers.age}</p>
                </p>
                <p onClick={
                  () => {
                    db.collection('Users').doc('Client').collection('clientel').doc(id).collection('requests')
                      .doc(props.uid).set(
                        {
                          name: "wants to add friend",
                        }
                      )
                      db.collection('Users').doc('Client').collection('clientel').doc(id).collection('Notifs').add({
                        text : props.myname + "sent you a request!"
                      })
                  }

                } style={{ marginLeft: 'auto', display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <p>Add</p>
                  <AddCircleIcon /></p>
              </div>
            ))
          }
        </div>
      </div >
    </div >
  );
}

export default Friends