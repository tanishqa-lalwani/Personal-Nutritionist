import React from 'react';
import { db } from '../../../firebase';

function LeaderBoard({friends,my_name,my_uid}) {
    let friendsResults = [];
    let setProgress = [];
    // const [progress, setProgress] = React.useState([])
    const [result, setResult] = React.useState([])
    const [prog, setProg] = React.useState(0)

  

    const checkProgress = () => {   

        
        friends?.map(({friend,id})=>{
            db.collection('Users').doc('Client').collection('clientel').doc(id).collection('Khaana')
            .onSnapshot(
                snap => { 
                    let progData = snap.docs.map(document=>document.data().goal)

                    friendsResults.push({
                        friendData : friend,
                        score :isNaN(Math.round(progData[progData.length-1]))? 0 : Math.round(progData[progData.length-1])
                    })
                }
            )
               
            
        })
        
        db.collection('Users').doc('Client').collection('clientel').doc(my_uid).collection('progress')
            .onSnapshot(
                snap => { 
                    let progData = snap.docs.map(document=>document.data().goal)

                    friendsResults.push({
                        friendData :{
                            name : my_name
                        } ,
                        score : isNaN(Math.round(progData[progData.length-1]))? 0 : Math.round(progData[progData.length-1])
                    })
                }
            )
            setResult(friendsResults)

      
            
          
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


      
       checkProgress() 

    }, [result?.length])
    
    return (
        <div className = "leader__board">
          <div className="results__data" style = {{width : '300px' , height : '100%'}}>
                
                {
                    result?.sort((a, b) => a.score > b.score ? -1 : 1)
                    .map(({friendData,score})=>
                    {

                        <div style={{
                            display: 'flex', padding: '10px', gap: '5px', alignItems: 'center' 
            
                          }}>

                        <p style={{ display: 'flex',padding : '5px', gap: '5px',width : '80%' }}>
                            <p style = {{ flexGrow :'1'}}>
                           {friendData.name}
                            </p>
                            <p >{score}</p>
                        </p>
                        </div>
                            
                    })
                }
                {console.log(result)}
                
                
                

            

            
                
              
            
          
                </div>
            </div>
            
    );
}

export default LeaderBoard;