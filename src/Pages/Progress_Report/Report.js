import React from 'react'
import DashDrawer from '../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../Components/Dash Drawer/DashDrawerMobile'
import './Report.css'
import {CanvasJSChart} from 'canvasjs-react-charts'
import {useAuth} from '../../AuthContext'

// Resolves charts dependancy
const options = {
  animationEnabled: true,
  backgroundColor: "#BCF6C4",

  title: {
    text: ""
  },
  axisX:{
    gridThickness: 0,
    tickLength: 0,
    lineThickness: 0,
  },
  axisY: {
    gridThickness: 0,
    tickLength: 0,
    lineThickness: 0,
    title: "",
  },
  data: [{

    type: "splineArea",
    color : "#95EDBB",
    lineColor : "#2E80EE",
    markerColor : "#8352F4",
    markerBorderColor	: "#FFF",
    markerBorderThickness	: "2",
    markerSize : 15,
    xValueFormatString: "YYYY",
    yValueFormatString: "#,##0.## bn kW⋅h",
    showInLegend: true,

    dataPoints: [
      { x: new Date(2008, 0), y: 70.735 },
      { x: new Date(2009, 0), y: 74.102 },
      { x: new Date(2010, 0), y: 72.569 },
      { x: new Date(2011, 0), y: 72.743 },
      { x: new Date(2012, 0), y: 72.381 },
      { x: new Date(2013, 0), y: 71.406 },
      { x: new Date(2014, 0), y: 73.163 },
      { x: new Date(2015, 0), y: 74.270 },
      { x: new Date(2016, 0), y: 72.525 },
      { x: new Date(2017, 0), y: 73.121 }
    ]
  }]
};

function Report() {
    return (
        <div className = "report__head report__head__mobile" style={{display:`${window.screen.width < 500 ? "block" : "flex"}`}}>
            {
                window.screen.width > 500 ? (
                    <DashDrawer />
                ) : (
                    <DashDrawerMobile loc="Progress" img="Progress"/>
                )
            }
            <div className = "report__screen" style={{width:`${window.screen.width < 500 ? "100vw" : "80vw"}`}}>
                <div className = "report__screen__intro">
                    <p>Hi, Username!</p>
                    <h3 className = "report__intro">You’re doing great </h3>
                
                    <div className = "user__personal__info">
                        <div className = "report__box">
                            <div className = "report__box__title">
                                <b >1800 </b>
                                <b>Calories</b>
                                <p>Avg per Day</p>
                            </div>

                        </div>
                        
                        <div className = "report__box">
                            <div className = "report__box__title">
                                <b >57 Kg</b>
                                <b>Weight</b>
                                <p>Avg of last week</p>
                            </div>

                        </div>
                        <div className = "report__box">
                            <div className = "report__box__title">
                                <b >11.7 </b>
                                <b>BMI</b>
                                <p>Perfect for your age</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className = "weekly__graph__report report__screen__intro">
                    <div className = "graph">
                    <h3 className = "report__intro calorie__title">Weekly Calories Graph </h3>

                    <CanvasJSChart options = {options}/>
                    </div>

                </div>
            </div>
            
        </div>
    )
}

export default Report
