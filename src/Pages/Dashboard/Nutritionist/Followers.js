import React from 'react';
import './Followers.css';
import { db } from '../../../firebase'
import NutriClientCard from './NutriClientCard'

function Followers(props) {
    
    const [followers, setfollowers] = React.useState([]);

    React.useEffect(() => {
        db.collection('Users').doc('Nutritionist').collection('staff')
        .doc(props.uid).collection('Followers').onSnapshot(
            snap=>(setfollowers(snap.docs.map(doc=>({
                id: doc.id,
                fol : doc.data()
            }))))
        )
    }, [followers?.length])

    return (
        <div style={{marginTop:'10vh', marginLeft:'40px'}}>
            <div style={{display:'flex',flexDirection:'column', gap:'10px'}}>
                <p>Hi {props.name}</p>
                <h3>Meet your follower{followers.length<2?"":"s"}</h3>
            </div>

            <div style={{marginTop:'50px'}}>
                <div style={{display:'flex',alignItems:'center', gap:'10px', fontSize:'30px'}}>
                    <b style={{fontSize:'40px'}}>{followers.length}</b>Follower{followers.length<2?"":"s"}</div>
            </div>

            <div style={{marginTop:'50px', display:'flex', alignItems:'center', flexWrap:1, gap:'20px'}}>
                {
                    followers.map(({id,fol})=>(
                        <NutriClientCard uid={id}/>
                    ))
                }
            </div>
        </div>
    );
}

export default Followers;