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
import yellow from '../../../Images/avatar_yellow.png'
import LeaderBoard from './Leaderboard copy';
import {  IconButton, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Friends = ({myname}) => {

  const params = useParams();
  const [name_logged_in, setname] = React.useState("");

  const [ser, setser] = React.useState([]);

  const [str, setstr] = React.useState([]);
  const [friends, setFriends] = React.useState([])

  const [friendrequests, setFriendRequests] = React.useState([])
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

  const friendsList = () => {

    db.collection('Users').doc('Client').collection('clientel').doc(params.uid).collection('friends').onSnapshot(friends=>{
      setFriends(
        friends.docs.map((doc) => ({
          id: doc.id,
          friend: doc.data(),

        }
        ))
      )
    })

  }
  React.useEffect(() => {
    
    friendsList();
     accept_requests(params.uid);


  }, [ser.length,friendrequests?.length,friendsList?.length])

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

 


  return (
    <div className="Friends Friends_mob" style={{marginBottom:'20px'}}>
      <div className="Friends_body Friends_body_mob">
        <div style={{ width: '50%' }}>
          <p className="friends__username friends__username_mob">
            {" "}
            {`Hii ${myname}!!`}{" "}
          </p>

          <p className="friends__leaderboard__heading friends__leaderboard__heading_mob" >
            LeaderBoard


          </p> 

           <div className="leaderboard__card leaderboard__card_mob">
          {friends?<LeaderBoard friends = {friends}  my_name = {myname} my_uid = {params.uid} /> :<></> }

           </div>
          <p className="yourfriends yourfriends_mob">Your Friend Requests</p>
          <div className="friends_card friedns_card_mob">

          {
            
              friendrequests?.map(requests=>{
                return(
                  < Card name={requests.friends.name} client_id = {requests.id} my_name = {myname} />

                )
              })
            }
          </div>

          <p className="yourfriends yourfriends_mob">Your Friends</p>
          <div className="friends_card friedns_card_mob">

          {
            
              friends?.map(requests=>{
                return(
                  <div style={{ width: '100%', background: 'rgba(182,209,252,0.2)', color: '#321E59', display: 'flex', padding: '20px 20px', borderRadius: '10px', flexDirection: 'column', alignItems: 'center', marginRight : '10px', gap: '30px', border: '1px solid #B6D1FC' }}>
                            <Avatar src={yellow} alt="N" style={{ height: '70px', width: '70px' }} />
                            <div style={{ textAlign: 'center' }}>
                                <h3>{requests.friend.name}</h3>
                            </div>
                  </div>

                )
              })
            }
          </div>
        </div>

        
      </div>
      <div style={{ width: '30%', marginTop: '50px', display: 'flex', flexDirection: 'column', padding: '20px', paddingTop: '40px', alignItems: 'center' }}>
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
                <p onClick={
                  ()=>{
                    setState({ open: true, ...{ vertical: 'down', horizontal: 'right' } });

                    console.log(params.uid.toString());

                    db.collection('Users').doc('Client').collection('clientel').doc(id).collection('requests')
                    .doc(params.uid.toString()).set(
                      {
                        name: myname,
                      }
                    )
                    db.collection('Users').doc('Client').collection('clientel').doc(id).collection('Notifs')
                    .doc(params.uid.toString()).set(
                      {
                        kisne_bheja: myname,
                        text : " sent you a friend request"
                      }
                    )
                  }
                  } style={{ marginLeft: 'auto', display: 'flex', gap: '5px', alignItems: 'center',cursor : 'pointer' }}>
                  <p>Add</p>
                  <AddCircleIcon /></p>
              </div>
              ) : <></>
            ))
          }
      </div>
      </div>
                  <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    key={vertical + horizontal}
                  >
                    <Alert onClose={handleClose} severity="success">
                     Friend request sent
                    </Alert>
                </Snackbar>
    </div>
  );
}

export default Friends