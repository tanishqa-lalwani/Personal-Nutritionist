import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CircularComponent from '../../Components/Circular_Progress/CircularComponent';
import './Nutrients.css'
function Nutrients({NutritionData}) {
    console.log(NutritionData)
    
    const [nutrition, setNutrition] = useState("");
    const [fatInfo, setFat] = useState(0);
    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [sugar, setSugar] = useState(0);
    const [cholestrol, setCholestrol] = useState(0);
    const [calcium, setCalcium] = useState(0);
    const [vitaminB12, setVitaminB12] = useState(0);
    const [dietLabels, setDietLabels] = useState([]);







    const [calories, setCalories] = useState(0);

    useEffect(() => {
        getNutriInfo();
       
    }, [NutritionData])

    const getNutriInfo = async() => {
       
        const result =  await axios.get(`https://api.edamam.com/api/nutrition-data?app_id=e3d75f90&app_key=05c707b25e3701c5cad99627d4e5b308&ingr=1%20${NutritionData}`)
               
        setNutrition(result.data.totalDaily)
        setFat(result.data.totalNutrients.FAT)
        setProtein(result.data.totalNutrients.PROCNT)
        setCarbs(result.data.totalNutrients.CHOCDF)
        setSugar(result.data.totalNutrients.SUGAR)
        setCalcium(result.data.totalNutrients.CA)
        setCholestrol(result.data.totalNutrients.CHOLE)
        setVitaminB12(result.data.totalNutrients.VITB12)
        setDietLabels(result.data.dietLabels)

        setCalories(result.data.calories);
        console.log(result);
        


    }
   
    return (
        <div className = "nutrients">

            <div className = "nutrients__screen">
                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                        <div className="title">
                            <b>Calories</b>
                            <p>{Math.round(calories)} kcal</p>
                        </div>
                        <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent size={150} thick={7} value={calories ? calories : 0}color="rgba(105, 157, 255, 1)" text = {calories ? calories : 0} />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} thick={7} value={calories ? calories : 0} color="rgba(105, 157, 255, 1)" text= {calories ? calories : 0} />
                                    )
                            }
                        </div>
                </div>

                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                        <div className="title">
                            <b>Fat</b>
                            <p>{Math.round(fatInfo?.quantity)} {fatInfo?.unit}</p>
                        </div>
                        <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round((fatInfo?.quantity * 9 )/calories) / 10} 
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((fatInfo?.quantity * 9 )/calories) / 10} />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round((fatInfo?.quantity * 9 )/calories) / 10}
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((fatInfo?.quantity * 9 )/calories) / 10}

                               />
                                )
                            }
                        </div>
                </div>

                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                        <div className="title">
                            <b>Protein</b>
                            <p>{Math.round(protein?.quantity)} {protein?.unit}</p>
                        </div>
                        <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round((protein?.quantity * 4 )/calories) / 10} 
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((protein?.quantity * 4 )/calories) / 10}
                              />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round((protein?.quantity * 9 )/calories) / 10}
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((protein?.quantity * 4 )/calories) / 10}
                                />
                                    )
                            }
                        </div>
                </div>
                
                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                        <div className="title">
                            <b>Carbs</b>
                            <p>{Math.round(carbs?.quantity)} {carbs?.unit}</p>
                        </div>
                        <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round((carbs?.quantity * 4 )/calories) * 100} 
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((carbs?.quantity * 4 )/calories) * 100} />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round((carbs?.quantity * 4 )/calories) * 100}
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((carbs?.quantity * 4 )/calories) * 100}
                                />
                                    )
                            }
                        </div>
                </div>
                
                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                        <div className="title">
                            <b>Calcium</b>
                            <p>{Math.round(calcium?.quantity)} {calcium?.unit}</p>
                        </div>
                        <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round(calcium?.quantity) } 
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((calcium?.quantity))}
                                />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round(calcium?.quantity)}
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((calcium?.quantity))}

                               />
                                    )
                            }
                        </div>
                </div>
                
                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                        <div className="title">
                            <b>Sugar</b>
                            <p>{Math.round(sugar?.quantity)} {sugar?.unit}</p>
                        </div>
                        <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round(sugar?.quantity )} 
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((sugar?.quantity))}
                                 />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round(sugar?.quantity)}
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((sugar?.quantity))}
                             />
                                    )
                            }
                        </div>
                </div>

                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                        <div className="title">
                            <b>Cholestrol</b>
                            <p>{Math.round(cholestrol?.quantity)} {cholestrol?.unit}</p>
                        </div>
                        <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round((cholestrol?.quantity * 4 )/calories) * 100} 
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((cholestrol?.quantity * 4 )/calories) * 100} />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round((cholestrol?.quantity * 4 )/calories) * 100}
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((cholestrol?.quantity * 4 )/calories) * 100} 

                                />
                                    )
                            }
                        </div>
                </div>

                <div className="box__food box__mobile__food" style={{background:'white', boxShadow:'4px 4px 10px rgba(221, 250, 252, 0.81)' ,border:'3px solid #b3f4f9'}}>
                        <div className="title">
                            <b>Vitamin - B12</b>
                            <p>{Math.round(vitaminB12?.quantity)} {vitaminB12?.unit}</p>
                        </div>
                        <div className="render_circle">
                            {
                                window.screen.width > 500 ? (
                                <CircularComponent 
                                size={150} 
                                thick={7} 
                                value={Math.round(vitaminB12?.quantity) } 
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((vitaminB12?.quantity ))} 

                              />
                                ) : (
                                <CircularComponent size={window.screen.width *  0.1 + window.screen.height *  0.1} 
                                thick={7} 
                                value={Math.round(vitaminB12?.quantity)}
                                color="rgba(105, 157, 255, 1)" 
                                text= {Math.round((vitaminB12?.quantity ))} 
        
                               />
                                    )
                            }
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