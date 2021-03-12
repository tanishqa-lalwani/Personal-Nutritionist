import React,{useEffect, useState} from 'react'
import './Recipes.css'
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Recipeitem from './Recipeitem';
import Button from '@material-ui/core/Button';

function Recipes() {

    const [recipes, setRecipes] = useState([]);
    const [search,setSearch] = useState("");
    const [query,setQuery] = useState("");

    useEffect(() => {
        getRecipes();
    }, [query]);


    const getRecipes = async () => {

        const { RecipeSearchClient } = require('edamam-api');
 
        const client = new RecipeSearchClient({
        appId:'b9bc11a0',
        appKey: 'f486e302156a516812a67e312759ac3f'
        });
    
        const results = await client.search({query});
        setRecipes(results.hits);
        console.log(results.hits);
    }

    const searchItem = item => {
        setSearch(item.target.value);
    }

    const getItem = item => {
        item.preventDefault();
        setQuery(search);
    }

    return (
        <div style={{width:'100vw'}}>
            <div className="recipe__head">
                <h1>Find Recipes</h1>
            </div>

            <p style={{
            padding:'0 50px',
            paddingBottom:'5px',
            paddingTop:'15px',
        }}>Search any food item to view it’s recipe </p>

            <div id='search'>
                <form className="search" onSubmit={getItem}>
                <div className="searchbox">
                    <input type='text' placeholder="Search for recipes" value={search} onChange={searchItem}/>
                    <Button id="pc" variant="filled" style={{fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'black',}} onClick={getItem}>
                    <SearchIcon /> 
                    </Button>
                </div>
                </form>

                <Button id="pc" variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/> Apply Filter
                </Button>
                <Button id="mobile" variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/>
                </Button>
            </div>
            <div id='searchmob'>
                <form className="search" onSubmit={getItem}>
                    <div className="searchbox">
                        <input type='text' placeholder="Search for recipes" value={search} onChange={searchItem}/>
                        <Button id="mobile" variant="filled" style={{fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'black',}} onClick={getItem}>
                        <SearchIcon /> 
                        </Button>
                    </div>
                    </form>
                <Button id="pc" variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/> Apply Filter
                </Button>
                <Button id="mobile" variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/>
                </Button>
            </div>
            <div className="recipes">

                {recipes!== [] && recipes.map(recipe => (
                    <Recipeitem 
                    key={recipe.recipe.label}
                    title={recipe.recipe.label} 
                    calories={recipe.recipe.calories} 
                    image = {recipe.recipe.image}/>
                    
                ))}
                
            </div>
        </div>
    )
}

export default Recipes;
