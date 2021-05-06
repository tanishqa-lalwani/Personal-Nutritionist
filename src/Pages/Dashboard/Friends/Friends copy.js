import React from 'react'
import './Friends.css'
import TextField from '@material-ui/core/TextField';
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile'
import Card from './Card copy'
import { db } from '../../../firebase'
import { Avatar } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useParams } from 'react-router';
import { Search } from '@material-ui/icons';

const Friends = ({myname}) => {

  const params = useParams();
  const [name_logged_in, setname] = React.useState("");

  const [ser, setser] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);

  const [str, setstr] = React.useState([]);
  const [tan_data, settan] = React.useState("");
  const [friendrequests, setFriendRequests] = React.useState([])

  const accept_requests = (client_id) =>{
    db.collection('Users').doc('Client').collection('clientel').doc(client_id).collection('requests').onSnapshot(friend_requests=>{
      setFriendRequests(
        friend_requests.docs.map((doc) => ({
          id: doc.id,
          friends: doc.data(),

        }
        ))
      )
    })
  }
  React.useEffect(() => {
    
    // const searchFriends =   ser?.filter( userId => {
    //   userId.id == params.uid ? setname(userId.sers.name_logged_in) : <></>
    //     return userId.id !== params.uid 
    //   }
    //   )
       
        // ser?.map(({id,sers}) => (
        //   id === params.uid ? setname(sers.name_logged_in) :<></>
        // ))
          
           
    // setser(searchFriends)
     accept_requests(params.uid);

  }, [ser.length,friendrequests.length])

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
            snapshot.docs.map((doc) => (

               {
              id: doc.id,
              sers: doc.data(),
              }

            
            ))
          )
        });
       
       

  }

  const add_friend = (e) => {
    db.collection('Users').doc('Client').collection('clientel').doc(e).collection('requests')
      .doc(params.uid.toString()).set(
        {
          name: myname,
        }
      )
  }


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
            {"Hii Username!!"}{" "}
          </p>
          <p className="friends__leaderboard__heading friends__leaderboard__heading_mob">
            LeaderBoard
          </p>
          <div className="leaderboard__card leaderboard__card_mob"></div>
          <p className="yourfriends yourfriends_mob">Your Friends</p>
          <div className="friends_card friedns_card_mob">

          {
            
              friendrequests?.map(requests=>{
                return(
                  < Card name={requests.friends.name} client_id = {requests.id} my_name = {myname} />

                )
              })
            }
          </div>
        </div>
      </div>
      <div style={{ width: '30%', background: "url('https://images.unsplash.com/photo-1617348523950-66b425e5c66b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1095&q=80')", marginTop: '50px', display: 'flex', flexDirection: 'column', padding: '20px', paddingTop: '40px', alignItems: 'center' }}>
        {/* <h1>Search bar</h1> */}
        <TextField id="outlined-basic" label="Search Friends" value={str} onChange={(e)=>search(e.target.value)} variant="outlined" style={{ width: '100%' }} />
        <div className="results">
          {
            ser.map(({ id, sers }) => (
              id !== params.uid? 
              (
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
                <p onClick={add_friend(id)} style={{ marginLeft: 'auto', display: 'flex', gap: '5px', alignItems: 'center',cursor : 'pointer' }}>
                  <p>Add</p>
                  <AddCircleIcon /></p>
              </div>
              ) : <></>
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