import React from 'react'
import './RecipeBook.css'
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile'
import RecipeItem from '../../../Pages/Recipes/Recipeitem'
import img from './image 1.png'
import axios from 'axios'
import {db }from '../../../firebase'
function RecipeBook({uid}) {
    const [data, setData] = React.useState([])
    const [food, setFood] = React.useState([])

    React.useEffect(() => {
        SavedRecipes();
    }, [])

    const Recipe = (id) => {
        axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=f8c828fd138c4a9eafba6575753ae18c`)
        .then(res=> setFood(item => [...item,res.data]))
    }
    const  SavedRecipes = async() => {
       db.collection('Users').doc('Client').collection('clientel').doc(uid).onSnapshot((snap)=>{
            setData(
               snap.data()?.saved_recipes
            );
        })

        await Promise.all(data?.map(async (id)=>{
            if(data) Recipe(id) 
         }))
    }


    return (
        <div className="recipe__dash recipe__dash__mobile">
            <div className="recipe__front recipe__front_mobile">
                <p>Hi Username!</p>
                {
                    window.screen.width > 500 ? (
                        <h2 style={{ marginTop: '40px', color: '#321E59' }}>Your Favourite Recipes!</h2>
                    ) : (
                        <h2 style={{ marginTop: '5vw', color: '#321E59' }}>Your Favourite Recipes!</h2>
                    )
                }
                <div className="track__boxes recipe__boxes recipe__boxes__mobile">

                    {
                        food?.map(recipe => (
                            <RecipeItem foodimg={recipe.image} foodname={recipe.title} foodcal={480} />
                        ))
                    } 

                </div>
            </div>

        </div>
    )
}

export default RecipeBook
