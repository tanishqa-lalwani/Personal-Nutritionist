import React from 'react'
import './RecipeBook.css'
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile'
import RecipeItem from '../../../Pages/Recipes/Recipeitem'
import img from './image 1.png'

function RecipeBook() {
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
                    <RecipeItem foodimg={img} foodname="Chicken & spring green bun cha" foodcal={480} />
                    <RecipeItem foodimg={img} foodname="Chicken & spring green bun cha" foodcal={480} />
                    <RecipeItem foodimg={img} foodname="Chicken & spring green bun cha" foodcal={480} />
                    <RecipeItem foodimg={img} foodname="Chicken & spring green bun cha" foodcal={480} />
                    <RecipeItem foodimg={img} foodname="Chicken & spring green bun cha" foodcal={480} />
                </div>
            </div>

        </div>
    )
}

export default RecipeBook
