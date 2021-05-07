import React from 'react';
import NutriCard from './NutriCard'
import { db , firebase} from '../../../firebase'
import { Avatar, Button, Snackbar } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { YouTube } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';

function SubscribeNutritionist(props) {
    const [subscribed_nutri, setSubscribed_nutri] = React.useState([])
    const [str, setser] = React.useState("")

    const [res, setres] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    
    const handleClick = () => {
    setOpen(true);
    };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
    React.useEffect(() => {
        db.collection('Users').doc('Client').collection('clientel')
            .doc(props.uid).collection('Subscribed-Nutritionists').onSnapshot(
                snap => (setSubscribed_nutri(snap.docs.map(doc => ({
                    id: doc.id,
                    nutritionists: doc.data()
                }))))
            )

    }, [res?.length,subscribed_nutri])

    const search = (e) => {
        setser(e.target.value)

        db.collection('Users').doc('Nutritionist').collection('staff')
            .orderBy('name')
            .startAt(e.target.value)
            .endAt(e.target.value + '\uf8ff')
            .get()
            .then((snapshot) => {
                setres(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        sers: doc.data(),
                    }
                    ))
                )
            });

    }

    // function sendreq(e) {

    //         db.collection('Users').doc('Nutritionist').collection('staff').doc(e).collection('Notifs').add({
    //             name : props.udata.name,
    //             msg : "subscribed to you!",
    //             timestamp : firebase.firestore.FieldValue.serverTimestamp(),
    //         })
    //         db.collection('Users').doc('Nutritionist').collection('staff').doc(e).collection('Followers').doc(props.uid).set({
    //             status : "subscribed"
    //         })
    //         // document.getElementById(e).style?.display = "none"
    //         // console.log(e)
    // }

    return (
        <div style={{ marginTop: '60px', marginLeft: '40px', display: 'flex', width: 'calc(80vw - 80px)', height: '90vh' }}>
            <div style={{ minWidth: '75%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                    <p>Hi {props.udata.name}</p>
                    <h3>Your Subscribed Nutritionist</h3>
                </div>

                <div style={{ marginTop: '50px', display: 'flex', alignItems: 'center', flexWrap: 1, gap: '20px' }}>
                    {
                        subscribed_nutri?.map(({ id,nutritionists }) => (
                            <NutriCard uid={id} />
                        ))
                    }

                </div>
            </div>
            <div style={{
                borderLeft: '3px solid #B6D1FC', height: '100%', minWidth: '25%', display: 'flex', boxShadow: "0 10px 3px 0 #B6D1FC",
                flexDirection: 'column', alignItems: 'center', padding: '10px 2%', gap: '20px', position: 'sticky', overflow: 'scroll', top: 0
            }}>
                <TextField id="search_nutri" name="nutri_search"
                    onChange={search}
                    value={str}
                    style={{ width: '100%', margin: '0' }} label="Search Nutritionists" variant="outlined" />

                {
                    res.map(({ id, sers }) => (
                        <div style={{ width: '100%', background: 'rgba(182,209,252,0.2)', color: '#321E59', display: 'flex', padding: '20px 0', borderRadius: '10px', flexDirection: 'column', alignItems: 'center', gap: '10px', border: '1px solid #B6D1FC' }}>
                            <Avatar src={sers.image} alt="N" style={{ height: '70px', width: '70px' }} />
                            <div style={{ textAlign: 'center' }}>
                                <h3>{sers.name}</h3>
                                <p>{sers.occupation}</p>
                            </div>
                            <div onClick={()=>{
                                 db.collection('Users').doc('Nutritionist').collection('staff').doc(id).collection('Notifs').add({
                                    name : props.udata.name,
                                    msg : "subscribed to you!",
                                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                                })
                                db.collection('Users').doc('Nutritionist').collection('staff').doc(id).collection('Followers').doc(props.uid).set({
                                    status : "subscribed"
                                })
                                db.collection('Users').doc('Client').collection('clientel').doc(props.uid).collection('Subscribed-Nutrionists').doc(id).set({
                                    status : "subscribed"
                                })
                            }}>
                            <Chip
                                id={id}
                                label="Follow"
                                clickable
                                color="primary"
                                onClick={handleClick}
                                />
                           <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">
                                    Great, Nutritionist Subscribed!
                                </Alert>
                            </Snackbar>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>

    )
}

export default SubscribeNutritionist;