import React from 'react';
import { db } from '../../../firebase';

function LeaderBoard({friends,my_name,my_uid}) {
    let friendsResults = [];
    const [progress, setProgress] = React.useState([])
    const [result, setResult] = React.useState([])

  

    const checkProgress = (friend_id) => {   
        
        db.collection('Users').doc('Client').collection('clientel').doc(friend_id).collection('Khaana')
        .onSnapshot(
            snap => { 
                setProgress(snap.docs.map(document => document.data()))
            }
        )


        if(progress !== []) {
        let tasks_completed = 0
 
          progress?.map((e)=>{
            tasks_completed += e?.completed;

           }) 
            

        return(tasks_completed/3 * 100);
      
 
        }
    }


    const friendsProgress = () => {
        friends?.map(({friend,id})=>{
            friendsResults.push({
                friendData : friend,
                score : checkProgress(id)
            })
        })
        friendsResults.push({
            friendData : {
                name : my_name
            },
            score : checkProgress(my_uid)
        })
        friendsResults.sort((a,b)=> b.score - a.score)
        setResult(friendsResults)
    }
    React.useEffect(() => {
      
        friendsProgress()

    }, [result?.length,progress?.length])
    
    return (
        <div className = "leader__board">
          <div className="results__data" style = {{width : '300px' , height : '100%'}}>
                
                {
                    result?.map(data=>
                        {
                        return(
                            
                        <div style={{
                            display: 'flex', padding: '10px', gap: '5px', alignItems: 'center' 
            
                          }}>
                        <p style={{ display: 'flex',padding : '5px', gap: '5px',width : '80%' }}>
                            <p style = {{ flexGrow :'1'}}>
                            {data.friendData.name}
                            </p>
                            <p >{data.score}</p>
                        </p>
                        </div>
                            
                    )})
                }
                
                
                

            

            
                
              
            
          
                </div>
            </div>
            
    );
}

export default LeaderBoard;