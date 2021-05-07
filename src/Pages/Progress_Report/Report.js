import React from 'react'
import DashDrawer from '../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../Components/Dash Drawer/DashDrawerMobile'
import './Report.css'
import { CanvasJSChart } from 'canvasjs-react-charts'
import { useAuth } from '../../AuthContext'
import { useParams } from 'react-router'
import { CaloriesWithoutGoal, BmiCalculator } from '../../calories'
import { db } from '../../firebase'
import { getContrastRatio } from '@material-ui/core'

// Resolves charts dependancy
const options = {
    animationEnabled: true,
    backgroundColor: "#BCF6C4",

    title: {
        text: ""
    },
    axisX: {
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
    data: [
        {

            type: "splineArea",
            color: "#95EDBB",
            showInLegend: true,

            lineColor: "#2E80EE",
            // markerColor : "#8352F4",
            markerColor: 'green',
            markerBorderColor: "#FFF",
            markerBorderThickness: "2",
            markerSize: 15,
            xValueFormatString: "DD MMM YYYY",
            yValueFormatString: "#,##0.## percent",
            showInLegend: true,

            dataPoints: [
                //   { x: new Date(2008, 0), y: 70.735 },
                //   { x: new Date(2009, 0), y: 74.102 },
                //   { x: new Date(2010, 0), y: 72.569 },
                //   { x: new Date(2011, 0), y: 72.743 },
                //   { x: new Date(2012, 0), y: 72.381 },
                //   { x: new Date(2013, 0), y: 71.406 },
                //   { x: new Date(2014, 0), y: 73.163 },

            ]
        },
        {

            type: "splineArea",
            color: "#95EDBB",
            showInLegend: true,

            lineColor: "#2E80EE",
            markerColor: "#8352F4",
            markerBorderColor: "#FFF",
            markerBorderThickness: "2",
            markerSize: 15,
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,##0.##  calorie",
            showInLegend: true,

            dataPoints: [
                //   { x: new Date(2008, 0), y: 70.735 },
                //   { x: new Date(2009, 0), y: 74.102 },
                //   { x: new Date(2010, 0), y: 72.569 },
                //   { x: new Date(2011, 0), y: 72.743 },
                //   { x: new Date(2012, 0), y: 72.381 },
                //   { x: new Date(2013, 0), y: 71.406 },
                //   { x: new Date(2014, 0), y: 73.163 },

            ]
        },
        {

            type: "splineArea",
            color: "#95EDBB",
            showInLegend: true,

            lineColor: "#2E80EE",
            // markerColor : "#8352F4",
            markerColor: 'red',

            markerBorderColor: "#FFF",
            markerBorderThickness: "2",
            markerSize: 15,
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,##0.## carb",
            showInLegend: true,

            dataPoints: [
                //   { x: new Date(2008, 0), y: 70.735 },
                //   { x: new Date(2009, 0), y: 74.102 },
                //   { x: new Date(2010, 0), y: 72.569 },
                //   { x: new Date(2011, 0), y: 72.743 },
                //   { x: new Date(2012, 0), y: 72.381 },
                //   { x: new Date(2013, 0), y: 71.406 },
                //   { x: new Date(2014, 0), y: 73.163 },

            ]
        },
        {

            type: "splineArea",
            color: "#95EDBB",
            showInLegend: true,

            lineColor: "#2E80EE",
            markerColor: 'yellow',

            markerBorderColor: "#FFF",
            markerBorderThickness: "2",
            markerSize: 15,
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,##0.## protein",
            showInLegend: true,

            dataPoints: [
                //   { x: new Date(2008, 0), y: 70.735 },
                //   { x: new Date(2009, 0), y: 74.102 },
                //   { x: new Date(2010, 0), y: 72.569 },
                //   { x: new Date(2011, 0), y: 72.743 },
                //   { x: new Date(2012, 0), y: 72.381 },
                //   { x: new Date(2013, 0), y: 71.406 },
                //   { x: new Date(2014, 0), y: 73.163 },

            ]
        },
        {

            type: "splineArea",
            color: "#95EDBB",
            showInLegend: true,

            lineColor: "#2E80EE",
            markerColor: 'green',

            markerBorderColor: "#FFF",
            markerBorderThickness: "2",
            markerSize: 15,
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,##0.## Fat",
            showInLegend: true,

            dataPoints: [
                //   { x: new Date(2008, 0), y: 70.735 },
                //   { x: new Date(2009, 0), y: 74.102 },
                //   { x: new Date(2010, 0), y: 72.569 },
                //   { x: new Date(2011, 0), y: 72.743 },
                //   { x: new Date(2012, 0), y: 72.381 },
                //   { x: new Date(2013, 0), y: 71.406 },
                //   { x: new Date(2014, 0), y: 73.163 },

            ]
        }





    ]
};


function Report({ uid, userdata }) {
    const user = useAuth();
    // const [progress, setProgress] = React.useState([])
    const [nD, setnD] = React.useState(-1)
    // const [stat, setState] = React.useState([])
    const [cnt, setcnt] = React.useState(0)
    // const [sequence, setsequence] = React.useState(0)
    // const [caloriePercent, setCaloriePercent] = React.useState(0)
    // const [carbPercent, setCarbPercent] = React.useState(0)
    // const [FatPercent, setFatPercent] = React.useState(0)
    // const [proteinPercent, setProteinPercent] = React.useState(0)
    // const [progressPercent, setProgressPercent] = React.useState(0)
    // const [userData, setUserData] = React.useState([])

    const [date, setDate] = React.useState("")
    // let weekdays = [];

    // console.log(uid)

    // const getDate = () => {
    //     setUserData(udata)
    // }

    // const setCoordinates = (k) => {
    //     options.data[0].dataPoints[k] = {
    //         x : new Date(userData?.recipe_update)  , y : progressPercent
    //     }

    //     options.data[1].dataPoints[k] = {
    //         x : new Date(userData?.recipe_update)  , y : caloriePercent
    //     }
    //     options.data[2].dataPoints[k] = {
    //         x : new Date(userData?.recipe_update)  , y : carbPercent
    //     }
    //     options.data[3].dataPoints[k] = {
    //         x : new Date(userData?.recipe_update)  , y : proteinPercent
    //     }
    //     options.data[4].dataPoints[k] = {
    //         x : new Date(userData?.recipe_update)  , y : FatPercent
    //     }

    //     // options.data[0].dataPoints[k+1] = {
    //     //     x : new Date(userData?.recipe_update + 5)  , y : progressPercent + 10
    //     // }
    //     // options.data[1].dataPoints[k+1] = {
    //     //     x : new Date(userData?.recipe_update +5 )  , y : caloriePercent + 10
    //     // }
    //     // options.data[2].dataPoints[k+1] = {
    //     //     x : new Date(userData?.recipe_update + 5)  , y : carbPercent + 10
    //     // }
    //     // options.data[3].dataPoints[k+1] = {
    //     //     x : new Date(userData?.recipe_update + 5 )  , y : proteinPercent + 10
    //     // }
    //     // options.data[4].dataPoints[k+1] = {
    //     //     x : new Date(userData?.recipe_update + 5)  , y : FatPercent + 10
    //     // }
    //     console.log(options.data[0].dataPoints)
    // }

    // const getData = () => {

    //     getDate();

    //     db.collection('Users').doc('Client').collection('clientel').doc(uid).collection('Khaana')
    //         .onSnapshot(
    //         snap => {
    //             setProgress(snap.docs.map(document => document.data()))
    //         }
    //     )

    //     if(progress !== []) {
    //         if(weekdays.length < 7 ) {
    //             weekdays.push(progress)
    //         }
    //         else {
    //             weekdays.shift()
    //             weekdays.push(progress)
    //         }

    //         checkProgress()

    //         setCoordinates(weekdays.length-1)

    //     }



    // }
    // React.useEffect(()=>{

    //     getData()

    // },[progress.length])

    // const checkProgress = () => {   

    //    if(progress !== []) {
    //     console.log(progress[0])
    //     let tasks_completed = 0, carbs_total=0,protein_total=0,calorie_total=0,fat_total=0;
    //     let  carbs_completed=0,protein_completed=0,calorie_completed=0,fat_completed=0;


    //     for(var i=0;i<3;i++) {
    //         if( progress[i]?.completed == 1) {
    //             carbs_completed += progress[i]?.carbs;
    //             protein_completed += progress[i]?.pro;
    //             calorie_completed += progress[i]?.cal;
    //             fat_completed += progress[i]?.fat;
    //         }
    //         tasks_completed += progress[i]?.completed;

    //         carbs_total += progress[i]?.carbs;
    //         protein_total += progress[i]?.pro;
    //         calorie_total += progress[i]?.cal;
    //         fat_total += progress[i]?.fat;
    //     }
    //     console.log(calorie_completed,calorie_total)
    //     setProgressPercent(tasks_completed/3 * 100);
    //     setProteinPercent(Math.round(protein_completed/protein_total * 100))
    //     setCaloriePercent(Math.round(calorie_completed/calorie_total * 100))
    //     setFatPercent(Math.round(fat_completed/fat_total * 100))
    //     setCarbPercent(Math.round(carbs_completed/carbs_total * 100))

    //     }

    // }

    const getStat = (noD) => {

        fetch_udata().then(userdata => {

            db.collection('Users').doc('Client').collection('clientel').doc(user.currentUser.uid).collection('Khaana')
                .onSnapshot(
                    snap => {
                        let progress = snap.docs.map(doc => (doc.data().completed))

                        let pd = new Date(userdata.progress_update)
                        let rd = new Date(userdata.recipe_update)

                        if (rd.getDate() !== pd.getDate()) { noD += 1 }
                        let docn = (noD).toString()

                        db.collection('Users').doc('Client').collection('clientel').doc(user.currentUser.uid).update({
                            progress_update: userdata.recipe_update
                        })

                        db.collection('Users').doc('Client').collection('clientel').doc(user.currentUser.uid).collection('progress')
                            .doc(docn).set({
                                goal: progress.reduce(function (a, b) { return Number(a) + Number(b); }, 0) * 100 / 3,
                                date: userdata.recipe_update
                            })


                        db.collection('Users').doc('Client').collection('clientel').doc(user.currentUser.uid).collection('progress')
                            .onSnapshot(
                                snap => {
                                    let data = snap.docs.map(doc => ({
                                        day: doc.id, goal: doc.data()
                                    }))
                                    for (let i = Math.max(data.length - 7, 0); i < snap.size; i++) {
                                        options.data[0].dataPoints[i] = { x: new Date(data[i].goal.date), y: data[i].goal.goal }
                                    }
                                })
                    }
                )
        })
    }

    async function fetch_size() {
        let prog = db.collection('Users').doc('Client').collection('clientel').doc(user.currentUser.uid).collection('progress');
        let activeRef = await prog.get();
        return activeRef.size
    }

    async function fetch_udata() {
        let prog = db.collection('Users').doc('Client').collection('clientel').doc(user.currentUser.uid)
        let activeRef = await prog.get();
        return activeRef.data()
    }

    React.useEffect(() => {

        fetch_size().then(res => { getStat(res) })

    }, [])


    return (
        <div className="report__head report__head__mobile" style={{ display: `${window.screen.width < 500 ? "block" : "flex"}` }}>

            <div className="report__screen" style={{ width: `${window.screen.width < 500 ? "100vw" : "80vw"}` }}>
                <div className="report__screen__intro">
                    <p>Hi, {userdata.name}!</p>

                    <h3 className="report__intro">You’re doing great </h3>
                    {/* {console.log(caloriePercent)} */}
                    {date}
                    <div className="user__personal__info">
                        <div className="report__box">
                            <div className="report__box__title">
                                <b>{CaloriesWithoutGoal(Math.ceil(Number(userdata.age)),
                                    Math.ceil(Number(userdata.height)) / 100,
                                    (1 - Math.ceil(Number(userdata.gender))),
                                    Math.ceil(Number(userdata.activity_level === 0 ? 1.3 : userdata.activity_level)))}</b>
                                <b>Calories</b>
                                <p>Avg per Day</p>
                            </div>

                        </div>

                        <div className="report__box">
                            <div className="report__box__title">
                                <b>{userdata.weight} Kg</b>
                                <b>Weight</b>
                                <p>Avg of last week</p>
                            </div>

                        </div>
                        <div className="report__box">
                            <div className="report__box__title">
                                <b>{BmiCalculator(userdata.weight, userdata.height / 100)[0]}</b>
                                <b>BMI</b>
                                <p>{BmiCalculator(userdata.weight, userdata.height / 100)[1]}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="weekly__graph__report report__screen__intro">
                    <div className="graph">
                        <h3 className="report__intro calorie__title">Weekly Calories Graph </h3>
                        <CanvasJSChart options={options} />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Report
