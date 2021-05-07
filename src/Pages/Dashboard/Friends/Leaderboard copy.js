import React from 'react';
import { useParams } from 'react-router';
import { db } from '../../../firebase';

function LeaderBoard({ friends, my_name, my_uid }) {
    let friendsResults = [];
    let friendsResults_2 = [];

    // let setProgress = [];
    const [progress, setProgress] = React.useState([])
    const [result, setResult] = React.useState([])
    const [prog, setProg] = React.useState([])
const params = useParams()


    // const checkProgress = (frnddata) => {
    //     let friendsResults = []


    //     frnddata?.map(({ id, dt }) => {
    //         db.collection('Users').doc('Client').collection('clientel').doc(id).collection('Khaana')
    //             .onSnapshot(
    //                 snap => {
    //                     let progData = snap.docs.map(document => document.data().completed)
    //                     // console.log(progData)
    //                     // setResult(...result,[
    //                     //     {
    //                     //         friendData: dt.name,
    //                     //         score: progData.reduce(function (a, b) { return Number(a) + Number(b); }, 0) * 100 / 3,
    //                     //     }
    //                     // ])
    //                     friendsResults.push(
    //                         {
    //                             friendData: dt.name,score: progData.reduce(function (a, b) { return Number(a) + Number(b); }, 0) * 100 / 3,
    //                         }
    //                     )}
    //     )
    // })
    //     console.log("Hey", friendsResults)
    // setResult(friendsResults)

    // db.collection('Users').doc('Client').collection('clientel').doc(my_uid).collection('Khaana')
    //     .onSnapshot(
    //         snap => {
    //             let progData = snap.docs.map(document => document.data().completed)


    //             setResult([...result,{
    //                 friendData: my_name,
    //                 score: progData.reduce(function (a, b) { return Number(a) + Number(b); }, 0) * 100 / 3,
    //             }])

    //         })

    // setResult(friendsResults)




// }

const getData = async () => {
    let snapshot = await db.collection('Users').doc('Client').collection('clientel').doc(my_uid).collection('friends').get();
    return snapshot.docs.map(res => ({ id: res.id, dt: res.data() }))
}
// const friendsProgress = () => {
//     friends?.map(({friend,id})=>{
//         friendsResults.push({
//             friendData : friend,
//             score : checkProgress(id)
//         })
//     })
//     friendsResults.push({
//         friendData : {
//             name : my_name
//         },
//         score : checkProgress(my_uid)
//     })
//     friendsResults.sort((a,b)=> b.score - a.score)
//     console.log(friendsResults)
//     setResult(friendsResults)

// }
React.useEffect(() => {
    // checkProgress()
    // getData().then((res) => { checkProgress(res) })


    
    db.collection('Users').doc('Client').collection('clientel').doc(params.uid).collection('friends').onSnapshot(friends=>{
        setResult(
          friends.docs.map((doc) => ({
            id: doc.id,
            friend: doc.data(),
  
          }
          ))
        )
      })

      console.log(result)

      db.collection('Users').doc('Client').collection('clientel').doc(my_uid).collection('Khaana').onSnapshot(
        snap=>{
            setProg(snap.docs.map(doc=>doc.data().completed))

            setProgress(   [...progress], {score : Math.round(snap.docs.map(doc=>doc.data().completed).reduce(function (a, b) { return Number(a) + Number(b); }, 0) * 100 / 3),name : my_name})
        }
    )

    
    result?.map(d=>{
        console.log(d)
        db.collection('Users').doc('Client').collection('clientel').doc(d.id).collection('Khaana').onSnapshot(
            snap=>{
                setProg(snap.docs.map(doc=>doc.data().completed))
                setProgress(  [...progress], {score : Math.round(snap.docs.map(doc=>doc.data().completed).reduce(function (a, b) { return Number(a) + Number(b); }, 0) * 100 / 3),name : d.friend.name})
                console.log(progress)

            }
        )
    })

    // if(friendsResults !== []) {
    //     friendsResults?.slice().sort(function(a,b) {return Number(b.score) > Number(a.score)})

    // }


}, [])
return (
    <div className="leader__board">
        {
       progress?.map(({score,name})=>{
          return(
           <p>{score}{name}</p>
          )
      })
      }

        <div className="results__data" style={{ width: '300px', height: '100%' }}>

            {


                //result?.sort((a, b) => a.score > b.score ? -1 : 1)
                    // result?.map(({ friendData, score }) => {
                    //     console.log(friendData);
                    //     <div style={{
                    //         display: 'flex', padding: '10px', gap: '5px', alignItems: 'center'

                    //     }}>

                    //         <p style={{ display: 'flex', padding: '5px', gap: '5px', width: '80%' }}>
                    //             <p style={{ flexGrow: '1' }}>
                    //                 {friendData}
                    //             </p>
                    //             <p >{score}</p>
                    //         </p>
                    //     </div>

                    // })
            }











        </div>
    </div>

);
}

export default LeaderBoard;