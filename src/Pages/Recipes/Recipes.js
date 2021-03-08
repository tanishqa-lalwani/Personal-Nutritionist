import React from 'react'
import './Recipes.css'
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Recipeitem from './Recipeitem';
import Button from '@material-ui/core/Button';


function Recipes() {

    return (
        <div style={{width:'100vw'}}>
            <div className="recipe__head">
                <h1>Find Recipes</h1>
            </div>
            <div id='search'>
                <div className="searchbox">
                    <SearchIcon />
                    <input type='text' placeholder="Search for recipes"/>
                </div>
                <Button id="pc" variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/> Apply Filter
                </Button>
                <Button id="mobile" variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/>
                </Button>
            </div>
            <div id='searchmob'>
                <div className="searchbox">
                    <SearchIcon />
                    <input type='text' placeholder="Search for recipes"/>
                </div>
                <Button id="pc" variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/> Apply Filter
                </Button>
                <Button id="mobile" variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/>
                </Button>
            </div>
            <div className="recipes">
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
                <Recipeitem />
            </div>
        </div>
    )
}

export default Recipes
