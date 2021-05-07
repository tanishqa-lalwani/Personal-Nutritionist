import React, { useEffect, useState } from "react";
import "./Food.css";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

import axios from "axios";
import Nutrients from "./Nutrients";

function Food() {
    const [query, setQuery] = useState("");
    const [foodItem, setFoodItem] = useState("");
    const [data, setData] = useState("");
    const [nutrients, setNutrients] = useState("");
    const [mess , setMess] = useState("")
 

  useEffect(() => {
    getNutrition();
  }, [query]);

  const getItem = (item) => {
    item.preventDefault();
    setQuery(foodItem);
  };

  const getNutrition = async () => {
    // const { FoodDatabaseClient } = require("edamam-api");

    // const client = new FoodDatabaseClient({
    //   appId: "8365cf09",
    //   appKey: "39add885528600da2cdaecb4a9f1efb4",
    // });

    // const results = await client.search({ query });
    const nutritionix   = require("nutritionix-api");
    const YOUR_APP_ID   = '9aca9837'; // Your APP ID
    const YOUR_API_KEY  = 'ee2edbc36f9d23b5ca59ec30bc85b359	'; // Your KEY
 
    nutritionix.init(YOUR_APP_ID,YOUR_API_KEY);
    if(query !== '') {
      nutritionix.natural.search(query).then(result => {
        if(result.foods) {
          setData(result.foods[0].photo)
          setNutrients(result.foods[0])
        } 
          
        else {
          setMess("This food cannot be found!")
        }
     });
    }
    
   
  };

  return (
    <div className="food__screen " style={{ width: "100vw" }}>
        <div className="food__head">
          <h1>Find nutrients in your food</h1>
        </div>

        <div className="search__food__screen">
            <form className="search__food search__food__mobile" onSubmit={getItem}>
              <div className="searchbox__food ">
                  <input
                  type="text"
                  placeholder="Search for food "
                  value={foodItem}
                  onChange={(item) => setFoodItem(item.target.value)}
                  />
                  <Button
                  className="full__screen"
                  variant="filled"
                  style={{
                      fontFamily: "Poppins, sans-serif",
                      textTransform: "capitalize",
                      color: "black",
                  }}
                  onClick={getItem}
                  >
                  <SearchIcon />
                  </Button>
              </div>
            </form>
        </div>
                  {mess ? <h3>{mess}</h3> :
                  
                  

                 
        <div className="food__display food__display__mobile">
          <div className="desc_of_food desc__food__mobile">
              {/* <div className="sample_boxes"></div>
              <div className="sample_boxes"></div>
              <div className="sample_boxes"></div>
              <div className="sample_boxes"></div>
              <div className="sample_boxes"></div>
              <div className="sample_boxes"></div>
              <div className="sample_boxes"></div>
              <div className="sample_boxes"></div> */}
               {
            nutrients.food_name ? (
            <Nutrients NutritionData = {nutrients} />
            ):(
                <h2> </h2>
            )

        }
          </div>
          
          {/* <div className = "food__bg" > */}
          <div className="food_page_img food_page_img__mobile">
            <h1> {nutrients?.food_name}</h1>

            {
                data.thumb ? (

                    <div className = "nutrient__img_2" style =  {{  background :  `url(${data.thumb})` ,backgroundRepeat : 'no-repeat',width : '25vw'}} > </div>


                ):(
                    <div className = "nutrient__img"  > </div>

                )
            }

            {/* {
                data.image ? (
                    
                    ):(
                        
                )
                
            } */}

            {/* <img src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" alt=""/> */}
          </div>
        </div> 
        // </div>
           }
       
       

        {/* IDHAR KR DE */}
    </div>
     
  );
}

export default Food;
