import React from 'react'
import './RecipeBook.css'
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile'
import RecipeItem from '../../../Pages/Recipes/Recipeitem'
import img from './image 1.png'
import axios from 'axios'
import { db } from '../../../firebase'
function RecipeBook({ uid, userdata }) {
    const [data, setData] = React.useState([])
    const [food, setFood] = React.useState([])


    const Recipe = async (id) => {
        let recdat = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=f8c828fd138c4a9eafba6575753ae18c `)
        return recdat.data

    }

    const SavedRecipes = async () => {
        let tpdata = []
        db.collection('Users').doc('Client').collection('clientel').doc(uid).collection('saved recipes').onSnapshot((snap) => {
            setData(snap.docs.map(d => d.id));
        })

        await Promise.all(data?.map(async (id) => {

            Recipe(id).then(res => {
                setFood(it => [...it, res])
            })
        }))
    }

    React.useEffect(() => {
        SavedRecipes();
    }, [data?.length])

    return (
        <div className="recipe__dash recipe__dash__mobile" style={{ marginLeft: '20px' }}>
            <div className="recipe__front recipe__front_mobile">
                <p>Hi {userdata.name}</p>
                {
                    window.screen.width > 500 ? (
                        <h2 style={{ marginTop: '40px', color: '#321E59' }}>Your Favourite Recipes!</h2>
                    ) : (
                        <h2 style={{ marginTop: '5vw', color: '#321E59' }}>Your Favourite Recipes!</h2>
                    )
                }
                <div className="track__boxes recipe__boxes recipe__boxes__mobile">

                    {
                        console.log("ISka", food),

                        food?.map(data => (
                            <RecipeItem
                                foodname={data?.title}
                                foodimg={data?.image}
                                foodcal={data?.nutrition?.nutrients[0].amount}
                                foodfat={data?.nutrition?.nutrients[1].amount}
                                foodcarbs={data?.nutrition?.nutrients[3].amount}
                                foodprotein={data?.nutrition?.nutrients[8].amount}
                                foodservings={data?.servings}
                            // foodrecipe={recipe?.data.analyzedInstructions[0].steps}
                            />
                        ))
                    }

                </div>
            </div>

        </div>
    )
}

export default RecipeBook
