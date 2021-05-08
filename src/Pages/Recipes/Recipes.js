import React,{useEffect, useState} from 'react'
import './Recipes.css'
import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Recipeitem from './Recipeitem';
import Button from '@material-ui/core/Button';
import Footer from '../../Components/Footer/footer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
function Recipes() {

    const [k, setK] = useState(9);
    const [recipes, setRecipes] = useState([]);
    const [Filter,setFilter] = useState(false);
    let filterRecipes = []
    const [search,setSearch] = useState("");
    const [query,setQuery] = useState("");
    const API_KEY = '5e8352acc1aa416b8433ab405a1df204'
    
    const [minCal, setminCal] = useState(-1);
    const [maxCal, setmaxCal] = useState(10000);  

    const [minPro, setminPro] = useState(-1);
    const [maxPro, setmaxPro] = useState(100); 

    const [minFat, setminFat] = useState(-1);
    const [maxFat, setmaxFat] = useState(100); 

    const [minCarb, setminCarb] = useState(-1);
    const [maxCarb, setmaxCarb] = useState(100); 
    
    
    useEffect(() => {
        getRecipesMore();
       // Filter?FilterRecipeWithCalorie(min,max):<></>
    }, [query,k]);

    
    const getRecipes = async () => {

       
            try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`)
            const json = await response.json();  
            setRecipes(json.results)
            console.log(json.results)
            }
            catch (error) {
                console.log(error);
              }  
    }

    const getRecipesMore = async () => {

       
        try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=0e06064897434c9ea1e85457f3fb7b26&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&number=30`)
        const json = await response.json();  
        setRecipes(json.results)
        console.log(json.results)

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
                <div className="Filter_btn" >
                <Button onClick = {()=>setFilter(true)} id="pc" variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
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
            <div className="Filterbox" >
                    <h3>Set calories limit</h3>
                    <div className="filterInput">
                        <span id="input-min">
                            <TextField id="min-calories" name="Min" placeholder="Min" value={minCal} onChange= {(event)=>setminCal(event.target.value)} variant="outlined" helperText="Set min value"/>
                        </span>
                        
                        <span id="input-max">
                            <TextField id="max-calories" name="Max" placeholder="Max" value={maxCal} onChange= {(event)=>setmaxCal(event.target.value)} variant="outlined" helperText="Set max value"/>
                        </span>
                    </div>

                    <h3>Set Protein limit</h3>
                    <div className="filterInput">
                        <span id="input-min-protein">
                            <TextField id="min-protein" name="MinProtein" placeholder="Min-Protein" value={minPro} onChange= {(event)=>setminPro(event.target.value)} variant="outlined" helperText="Set min value"/>
                        </span>
                        
                        <span id="input-max">
                            <TextField id="max-protein" name="MaxProtein" placeholder="Max-Protein" value={maxPro} onChange= {(event)=>setmaxPro(event.target.value)} variant="outlined" helperText="Set max value"/>
                        </span>
                    </div>

                    <h3>Set Fat limit</h3>
                    <div className="filterInput">
                        <span id="input-min-protein">
                            <TextField id="min-protein" name="MinProtein" placeholder="Min-Fat" value={minFat} onChange= {(event)=>setminFat(event.target.value)} variant="outlined" helperText="Set min value"/>
                        </span>
                        
                        <span id="input-max">
                            <TextField id="max-protein" name="MaxProtein" placeholder="Max-Fat" value={maxFat} onChange= {(event)=>setminFat(event.target.value)} variant="outlined" helperText="Set max value"/>
                        </span>
                    </div>

                    <h3>Set Carbs limit</h3>
                    <div className="filterInput">
                        <span id="input-min-protein">
                            <TextField id="min-protein" name="MinProtein" placeholder="Min-Carbs" value={minCarb} onChange= {(event)=>setminCarb(event.target.value)} variant="outlined" helperText="Set min value"/>
                        </span>
                        
                        <span id="input-max">
                            <TextField id="max-protein" name="MaxProtein" placeholder="Max-Carbs" value={maxCarb} onChange= {(event)=>setmaxCarb(event.target.value)} variant="outlined" helperText="Set max value"/>
                        </span>
                    </div>
            </div>
           <div className="recipes">
               {
                  /*
                  Filter? filterRecipes?.map(recipe => (  
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
                )):
                  */
                 recipes !== [] && recipes?.slice(0,k).map(recipe => (  
                    recipe.nutrition.nutrients[0].amount >= minCal && recipe.nutrition.nutrients[0].amount <= maxCal &&
                    recipe.nutrition.nutrients[8].amount >= minPro && recipe.nutrition.nutrients[8].amount <= maxPro ?
                    

                    <Recipeitem 
                    key={recipe.id}
                    recid={recipe.id}
                    foodname={recipe.title}  
                    foodimg = {recipe.image}
                    foodcal={recipe.nutrition.nutrients[0].amount}
                    foodfat={recipe.nutrition.nutrients[1].amount}
                    foodcarbs={recipe.nutrition.nutrients[3].amount}
                    foodprotein={recipe.nutrition.nutrients[8].amount}
                    foodservings={recipe.servings}
                    foodrecipe={recipe.analyzedInstructions[0].steps}/>
                
                : <></>
                ))}
            <div className = "showMore" style = {{display : "flex",cursor : "pointer"}} onClick = {()=>setK(k+10)}>
              {
                  k<19 && <> <h4>Show More... </h4> 
                  <ExpandMoreIcon/></>

              } 

            </div>

            </div>

            <Footer/>
        </div>
        </>
    )
  }    
export default Recipes;
