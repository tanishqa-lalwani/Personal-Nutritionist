import React from 'react'
import { db } from '../../../firebase'
import axios from 'axios'

function Dietplans({ uid, userdata }) {

    // const [state, setState] = React.useState([])
    const [food, setFood] = React.useState({
        brek: [], lunch: [], dinner: []
    })
    const [plans, setplans] = React.useState([])

    const Recipe = async (id1, id2, id3) => {

        let data1 = []
        let data2 = []
        let data3 = []

        await axios
            .get(`https://api.spoonacular.com/recipes/${id1}/information?includeNutrition=false&apiKey=04aa9a34e53f4fe99fca079b81109ba0`)
            .then(res => { data1 = res.data })

        await axios
            .get(`https://api.spoonacular.com/recipes/${id2}/information?includeNutrition=false&apiKey=04aa9a34e53f4fe99fca079b81109ba0`)
            .then(res => { data2 = res.data })

        await axios
            .get(`https://api.spoonacular.com/recipes/${id3}/information?includeNutrition=false&apiKey=04aa9a34e53f4fe99fca079b81109ba0`)
            .then(res => { data3 = res.data })

        setFood({ ...food, brek: data1, lunch: data2, dinner: data3 })
    }

    React.useEffect(() => {
        db.collection('Users').doc('Client').collection('clientel').doc(uid).collection('dietplans')
            .onSnapshot(
                snap => {
                    let data = snap.docs.map(doc => doc.data())
                    data.map((d) => {
                        Recipe(d.breakfast, d.lunch, d.dinner)
                        setplans([...plans, food]);
                    })
                }
            )

    }, [food.brek.length])

    return (
        <div style={{
            marginTop: '10vh ', marginBottom: '10vh',
            marginLeft: '30px',
            color: 'rgba(50, 30, 89, 1)', width: 'calc(80vw - 60px)'
        }}>
            <h2>Hi {userdata.name}!</h2>
            <h2 style={{ marginTop: '20px' }}>Diet plans by your subscribed nutritionists</h2>
            <div style={{ display: 'grid', marginTop: '30px', gridTemplateColumns: 'repeat(3,auto)', width: '100%', gridRowGap: '10px', gridColumnGap: '10px' }}>
                {
                    plans.slice(1)?.map((rec) => (
                        <div style={{ border: "3px solid #B6D1FC", borderRadius: '20px', width: 'auto', maxWidth: 'calc(30vw)', display: `flex`, padding: "10px", flexDirection: 'column', gap: '20px' }}>
                            <h3>Breakfast</h3>
                            <div style={{ border: "3px solid #B6D1FC", display: 'flex', borderRadius: '10px', height: 'auto', width: 'calc(100% - 20px)', padding: "5px", alignItems: 'center', gap: '20px' }}>
                                <img src={rec.brek.image} alt="" style={{ height: "50px", width: '50px' }} />
                                <h4>{rec.brek.title}</h4>
                            </div>
                            <h3>Lunch</h3>
                            <div style={{ border: "3px solid #B6D1FC", display: 'flex', width: 'calc(100% - 20px)', borderRadius: '10px', padding: "5px", height: 'auto', alignItems: 'center', gap: '20px' }}>
                                <img src={rec.lunch.image} alt="" style={{ height: "50px", width: '50px' }} />
                                <h4>{rec.lunch.title}</h4>
                            </div>
                            <h3>Dinner</h3>
                            <div style={{ border: "3px solid #B6D1FC", display: 'flex', width: 'calc(100% - 20px)', borderRadius: '10px', height: 'auto', padding: "5px", alignItems: 'center', gap: '20px' }}>
                                <img src={rec.dinner.image} alt="" style={{ height: "50px", width: '50px' }} />
                                <h4>{rec.dinner.title}</h4>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Dietplans
