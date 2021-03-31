import React,{useEffect, useState} from 'react'
import './Recipes.css'
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Recipeitem from './Recipeitem';
import Button from '@material-ui/core/Button';
import Footer from '../../Components/Footer/footer'

function Recipes() {

    const [recipes, setRecipes] = useState([]);
    const [search,setSearch] = useState("");
    const [query,setQuery] = useState("");
    const API_KEY = '0e06064897434c9ea1e85457f3fb7b26'
    
    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = async () => {

       
            try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`)
            const json = await response.json();  
            setRecipes(json.results)
            }
            catch (error) {
                console.log(error);
              }  
    }

    const searchItem = item => {
        setSearch(item.target.value);
    }

    const getItem = item => {
        item.preventDefault();
        setQuery(search);
    }
    return (
        <>
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
                    <Button onClick={getItem}>
                    <SearchIcon /> 
                    </Button>
                </div>
                </form>

                <div className="Filter_btn">
                <Button id="pc" variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/> Apply Filter
                </Button>
                <Button id="mobile" variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/>
                </Button>
                </div>
            </div>
            <div id='searchmob'>
                <form className="search" onSubmit={getItem}>
                    <div className="searchbox">
                        <input type='text' placeholder="Search for recipes" value={search} onChange={searchItem}/>
                        <Button onClick={getItem}>
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
                {recipes !== [] && recipes.map(recipe => (  
                    <Recipeitem 
                    key={recipe.id}
                    foodname={recipe.title}  
                    foodimg = {recipe.image}
                    foodcal={recipe.nutrition.nutrients[0].amount}
                    foodfat={recipe.nutrition.nutrients[1].amount}
                    foodcarbs={recipe.nutrition.nutrients[3].amount}
                    foodprotein={recipe.nutrition.nutrients[8].amount}
                    foodservings={recipe.servings}
                    foodrecipe={recipe.analyzedInstructions[0].steps}/>
                ))}
            </div>
            <Footer/>
        </div>
        </>
    )
  }    
export default Recipes;
