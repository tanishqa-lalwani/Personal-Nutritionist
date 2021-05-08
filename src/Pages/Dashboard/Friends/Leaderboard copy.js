import React from 'react';
import { useParams } from 'react-router';
import { db } from '../../../firebase';
import LedItem from './LedItem'

function LeaderBoard({ friends, my_name, my_uid }) {

    const [progress, setProgress] = React.useState([])

const getData = async () => {
    let snapshot = await db.collection('Users').doc('Client').collection('clientel').doc(my_uid).collection('friends').get();
    return snapshot.docs.map(res => ({id: res.id, name: res.data().name}))
}

React.useEffect(() => {
    
    getData(my_uid).then(res=>setProgress(res))
}, [])
return (
    <div>
        
        <div className="results__data" style={{ width: '300px', height: '100%' }}>
            {
                progress?.map(({id,name}) => (
                    <LedItem uid = {id} name={name}/>
                ))
            }
        </div>
    </div>

);
}

export default LeaderBoard;