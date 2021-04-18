import React from 'react'
import './RecipeBook.css'
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile'
import RecipeItem from '../../../Pages/Recipes/Recipeitem'
import img from './image 1.png'
import axios from 'axios'
import {db }from '../../../firebase'
function RecipeBook() {
    const [data, setData] = React.useState([])
    const [food, setFood] = React.useState([])

    const Recipe = (id) => {
        const result =  axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=6c25a29958b14f7ebb81eb453f294bbd`)
        .then(res=> setFood(item => [...item,res.data]))
    }
    const  SavedRecipes = async() => {
       const result =  db.collection('Users').doc('Client').collection('clientel').doc('EnOHU1IrS6PGXKICUPldRcAeZy33').onSnapshot((snap)=>{
            setData(
               snap.data().saved_recipes
            );
        })

        const asyncRes = await Promise.all(data.map(async (id)=>{
             Recipe(id) 
 
 
         }))
        
           
                 
        
        console.log("Data",data)

    }

    React.useEffect(() => {
        SavedRecipes();
       
    }, [data.length])
    return (
        <div className="recipe__dash recipe__dash__mobile">
            {
                window.screen.width > 500 ? (
                    <DashDrawer />
                ) : (
                    <DashDrawerMobile loc="Recipe Book" img="Book"/>
                )
            }
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
                        food?.map((recipe => {
                            

                            return(
                                <RecipeItem foodimg={recipe.image} foodname={recipe.title} foodcal={480} />

                            )
                        }))
                    } 
                    {/* {data ? <RecipeItem foodimg={img} foodname="Chicken & spring green bun cha" foodcal={480} />  : console.log("Finding")} */}
                   
                    {/* <RecipeItem foodimg={img} foodname="Chicken & spring green bun cha" foodcal={480} />
                    <RecipeItem foodimg={img} foodname="Chicken & spring green bun cha" foodcal={480} />
                    <RecipeItem foodimg={img} foodname="Chicken & spring green bun cha" foodcal={480} />
                    <RecipeItem foodimg={img} foodname="Chicken & spring green bun cha" foodcal={480} />
                    <RecipeItem foodimg={img} foodname="Chicken & spring green bun cha" foodcal={480} /> */}
                </div>
            </div>

        </div>
    )
}

export default RecipeBook
