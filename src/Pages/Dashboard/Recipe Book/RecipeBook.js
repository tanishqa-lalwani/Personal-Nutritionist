import React from 'react'
import './RecipeBook.css'
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile'
import RecipeItem from '../../../Pages/Recipes/Recipeitem'
import img from './image 1.png'
import axios from 'axios'
import {db }from '../../../firebase'
import { useParams } from 'react-router'
function RecipeBook() {
    const params = useParams();
    const [data, setData] = React.useState([])
    const [food, setFood] = React.useState([])

    React.useEffect(() => {
        SavedRecipes();
    }, [])

    
    const  SavedRecipes = () => {
       db.collection('Users').doc('Client').collection('clientel').doc(params.uid).collection('saved-recipes').onSnapshot((snap)=>{
            setData(
               snap.docs.map(document=> document.data())
            );
        })
    }

    console.log(data)


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
                        data?.map(recipe => (
                            <RecipeItem 
                            foodname={recipe.name}  
                            foodimg = {recipe.foodimg}
                            foodcal={recipe.foodcal}
                            foodfat={recipe.foodfat}
                            foodcarbs={recipe.foodcarbs}
                            foodprotein={recipe.foodprotein}
                            foodservings={recipe.foodservings}
                            foodrecipe={recipe.foodrecipe}
                            />
                        ))
                    } 

                </div>
            </div>

        </div>
    )
}

export default RecipeBook
