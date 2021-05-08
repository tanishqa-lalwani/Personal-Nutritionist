import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CircularComponent from '../../Components/Circular_Progress/CircularComponent';
import './Nutrients.css'
import cycle from './cycle.gif'
import yoga from './yoga.gif'
import pro from './protein.png'
import salad from './salad.png'
import bones from './bones.png'
import chol from './blood-test (1).png'
import rice from './rice.png'
import vit from './vitamin.png'
import gym from './gym.gif'

import cleaning from './cleaning.gif'
import walking from './walking.gif'
import run from './run.gif'
import dish from './dish.png'
import fat from './fat.png'






function Nutrients({NutritionData}) {
    
    const [nutrition, setNutrition] = useState("");
    const [fatInfo, setFat] = useState(0);
    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fibre, setfibre] = useState(0);
    const [cholestrol, setCholestrol] = useState(0);
    const [calcium, setCalcium] = useState(0);
    const [vitaminB12, setVitaminB12] = useState(0);

    const [fatInfoDaily, setFatDaily] = useState(0);
    const [proteinDaily, setProteinDaily] = useState(0);
    const [carbsDaily, setCarbsDaily] = useState(0);
    const [fibreDaily, setfibreDaily] = useState(0);
    const [cholestrolDaily, setCholestrolDaily] = useState(0);
    const [calciumDaily, setCalciumDaily] = useState(0);
    const [vitaminB12Daily, setVitaminB12Daily] = useState(0);







    const [calories, setCalories] = useState(0);

    useEffect(() => {
        getNutriInfo();
       
    }, [])

    const getNutriInfo = () => {
       
        // const result =  await axios.get(`https://api.edamam.com/api/nutrition-data?app_id=29ca67c9&app_key=146ca4fe38a3f8d7a2ce13d9070d6227&ingr=1%20${NutritionData}`)
        setFat(NutritionData.nf_total_fat)
        setProtein(NutritionData.nf_protein)
        setCarbs( NutritionData.nf_total_carbohydrate)
        setfibre(NutritionData.nf_dietary_fiber)
        setCalcium(NutritionData.full_nutrients[12].value)
        setCholestrol(NutritionData.nf_cholesterol)
        setVitaminB12(NutritionData.nf_sugars)

        // setFatDaily(result.data.totalDaily.FAT.quantity)
        // setProteinDaily(result.data.totalDaily.PROCNT.quantity)
        // setCarbsDaily(result.data.totalDaily.CHOCDF.quantity)
        // setfibreDaily(result.data.totalDaily.FIBTG.quantity)
        // setCalciumDaily(result.data.totalDaily.CA.quantity)
        // setCholestrolDaily(result.data.totalDaily.CHOLE.quantity)
        // setVitaminB12Daily(result.data.totalDaily.VITB12.quantity)

        setCalories(NutritionData.nf_calories);
        


    }
   
    return (
        <div className = "nutrients">
            

            <div className = "nutrients__screen">

                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                
                <img className = "food__icon"src = {dish} style = {{width : '40px' , height : '40px'}} />

                        <div className="title">
                            <b>Calories </b>
                            <p>{Math.round(calories)} kcal</p>
                        </div>
                        {/* <div className="render_circle__percent">
                            hello
                            {/* {
                                window.screen.width > 500 ? (
                                <CircularComponent size={150} thick={7} value={calories ? calories : 0}color="rgba(105, 157, 255, 1)" text = {calories ? calories : 0 + '%'} />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} thick={7} value={calories ? calories : 0} color="rgba(105, 157, 255, 1)" text= {calories ? calories : 0 + '%'} />
                                    )
                            } 
                        </div> */}
                </div>

                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                <img className = "food__icon" src = {fat} style = {{width : '40px' , height : '40px'}} />

                        <div className="title">
                            <b>Fat</b>
                            <p>{Math.round(fatInfo) }g </p>
                        </div>
                        {/* <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round(fatInfoDaily)} 
                                color="rgba(105, 157, 255, 1)" 
                                text={Math.round(fatInfoDaily) + '%'} />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round(fatInfoDaily)} 
                                color="rgba(105, 157, 255, 1)" 
                                text={Math.round(fatInfoDaily) + '%'} 


                               />
                                )
                            }
                        </div> */}
                </div>

                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                <img className = "food__icon" src = {pro} style = {{width : '30px' , height : '30px'}} />

                        <div className="title">
                            <b>Protein</b>
                            <p>{Math.round(protein)} g</p>
                        </div>
                        {/* <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round(proteinDaily)} 
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round(proteinDaily)+ '%'}
                              />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round(proteinDaily)}
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round(proteinDaily) + '%'}
                                />
                                    )
                            }
                        </div> */}
                </div>
                
                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                <img  className = "food__icon" src = {salad} style = {{width : '35px' , height : '35px'}} />

                        <div className="title">
                            <b>Carbs</b>
                            <p>{Math.round(carbs)} g</p>
                        </div>
                        {/* <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round(carbsDaily)} 
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round(carbsDaily) + '%' }   />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round(carbsDaily)}
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round(carbsDaily) + '%'}
                                />
                                    )
                            }
                        </div> */}
                </div>
                
                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                <img className = "food__icon" src = {bones} style = {{width : '40px' , height : '40px'}} />

                        <div className="title">
                            <b>Calcium</b>
                            <p>{Math.round(calcium)} mg</p>
                        </div>
                        {/* <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round(calciumDaily)} 
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round(calciumDaily) + '%'}
                                />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round(calciumDaily)}
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round(calciumDaily) + '%'}

                               />
                                    )
                            }
                        </div> */}
                </div>
                
                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                <img className = "food__icon" src = {rice} style = {{width : '35px' , height : '35px'}} />

                        <div className="title">
                            <b>Fibre</b>
                            <p>{Math.round(fibre)} g</p>
                        </div>
                        {/* <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round(fibreDaily)} 
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round(fibreDaily) + '%'}
                                 />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round(fibreDaily)} 
                                color="rgba(105, 157, 255, 1)" 
                                text={Math.round(fibreDaily) + '%'} 
                             />
                                    )
                            }
                        </div> */}
                </div>

                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                        <div className="title">
                        <img className = "food__icon" src = {chol} style = {{width : '30px' , height : '30px',marginTop : '2px',marginBottom:'15px',marginLeft : '15px'}} />

                            <b>Cholestrol</b>
                            <p>{Math.round(cholestrol)} mg</p>
                        </div>
                        {/* <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round(cholestrolDaily)} 
                                color="rgba(105, 157, 255, 1)" 
                                text={Math.round(cholestrolDaily) + '%'} />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round(cholestrolDaily)} 
                                color="rgba(105, 157, 255, 1)" 
                                text={Math.round(cholestrolDaily) + '%'} 

                                />
                                    )
                            }
                        </div> */}
                </div>

                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                <img className = "food__icon" src = {vit} style = {{width : '35px' , height : '35px'}} />

                        <div className="title">
                            <b>Sugars</b>
                            <p>{Math.round(vitaminB12)} g</p>
                        </div>
                        {/* <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round(vitaminB12Daily)} 
                                color="rgba(105, 157, 255, 1)" 
                                text={Math.round(vitaminB12Daily) + '%'} 

                              />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round(vitaminB12Daily)} 
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round(vitaminB12Daily) + '%'} 
        
                               />
                                    )
                            }
                        </div> */}
                </div>
                </div>

                <div className = "activity" >

                <h3 style = {{marginBottom : '10px'}}>{`Activities needed to burn ${calories} kcal:`} </h3>

                <div className = "activity__card">
                    <div className = "activities">
                        <h4>Bicyling </h4>
                        <img src = {cycle} style = {{width:'100px' ,height : '100px'}}></img>
                        <h5>{Math.round(calories * 200 / (8*3.5*67))} minutes</h5>
                    </div>
                    <div className = "activities">
                        <h4>Yoga </h4>
                        <img src = {yoga} style = {{width:'100px' ,height : '100px'}}></img>
                        <h5>{Math.round(calories * 200 / (2.5*3.5*67))} minutes</h5>
                    </div>
                    <div className = "activities">
                        <h4>Running </h4>
                        <img src = {run} style = {{width:'100px' ,height : '100px'}}></img>

                        <h5>{Math.round(calories * 200 / (13.5*3.5*67))} minutes</h5>
                    </div>
                    <div className = "activities">
                        <h4>Walking </h4>
                        <img src = {walking} style = {{width:'100px' ,height : '100px'}}></img>

                        <h5>{Math.round(calories * 200 / (3.5*3.5*67))} minutes</h5>
                    </div>
                    <div className = "activities">
                        <h4>Cleaning </h4>
                        <img className = "clean" src = {cleaning} style = {{width:'100px' ,height : '100px', background : 'red',   transform: "scaleX(-1)" }}></img>

                        <h5>{Math.round(calories * 200 / (2.5*3.5*67))} minutes</h5>
                    </div>
                    <div className = "activities">
                        <h4>Gym  </h4>
                        <img src = {gym} style = {{width:'90px' ,height : '100px',background : 'white'}}></img>

                        <h5>{Math.round(calories * 200 / (5*3.5*67))} minutes</h5>
                    </div>
                </div>
               
                </div>

           


            {/* <div className = "labels" >
               {
                   Object.entries(dietLabels).map(([index,label]) => (
                       <div className = "bg__container">
                        <div className = "container__tags">
                            <h4>{label}</h4>
                        </div>
                       </div>
                   ))
               } 
            </div> */}
            </div>
            
        
    );
}

export default Nutrients;