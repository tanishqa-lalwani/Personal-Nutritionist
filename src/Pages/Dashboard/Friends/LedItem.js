import React from 'react'
import { db } from '../../../firebase'

function LedItem({uid,name}) {

    const [ud, setud] = React.useState({
        name : "", comp : 0
    })

    const getData = async() => {
        let call = await db.collection('Users').doc('Client').collection('clientel').doc(uid).collection('Khaana').get();
        return Math.round(call.docs?.map(doc=>doc.data().completed).reduce(function (a, b) { return Number(a) + Number(b); }, 0) * 100 / 3)
    }
    React.useEffect(()=>{
        // db.collection('Users').doc('Client').collection('clientel').doc(props.uid).onSnapshot(
        //     snap=>setud({...ud,name : snap.data()?.name})
        // )
        getData().then(res=>setud({...ud,comp : res}))
    },[])

    return (
        <div style={{display:'flex', width:'100%', justifyContent:'space-between', padding:'10px',alignItems:'center'}}>
            <h3>{name}</h3>
            <p>{ud?.comp} %</p>    
        </div>
    )   
}

export default LedItem
