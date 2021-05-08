import React, { useState } from 'react'
import './Dashboard.css'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { CaloriesWithoutGoal } from '../../calories'
import Dietplans from './Dietplans/Dietplans'
import AddIcon from '@material-ui/icons/Add';
import CircularComponent from '../../Components/Circular_Progress/CircularComponent'
import DashDrawer from '../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../Components/Dash Drawer/DashDrawerMobile'
import CheckIcon from '@material-ui/icons/Check';
import Cup from './Cup.svg'
import Friends from './Friends/Friends copy'
import Nutritionist from './SubscribeNutritionist/SubscribeNutritionist'
import CircularProgress from '@material-ui/core/CircularProgress';
import RecipeBook from './Recipe Book/RecipeBook'
import { db, firebase } from '../../firebase'
import SavedBlogs from './SavedBlogs/SavedBlogs'
import ProgressReport from '../Progress_Report/Report'
import Kinda_Cup from './Kinda Cup.svg'
import Not_a_Cup from './Not a Cup.svg'
import Comp_Cup from './Comp Cup.svg'
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useAuth } from '../../AuthContext'

function Dashboard(props) {
    const user = useAuth();
    const history = useHistory();
    const [userdata, setuserdata] = useState([]);
    const [date, setdate] = useState(null);
    const [page, setpage] = useState(1);
    const det = {
        cal: 0,
        fat: 0,
        carbs: 0,
        pro: 0
    }
    const ind = {
        p1: 0, cb1: 0,
        p2: 0, cb2: 0,
        p3: 0, cb3: 0,
        c1: 0, cl1: 0,
        c2: 0, cl2: 0,
        c3: 0, cl3: 0,
    }
    const [details, setdetails] = useState(det);
    const [indices, setindices] = useState(ind)
    const [cnt, setcnt] = useState(0);
    const [ct, setchk] = useState(0);
    const [meals, setmeals] = useState([]);

    const [brek, setbrek] = useState(0);
    const [lunch, setlunch] = useState(0);
    const [dinner, setdinner] = useState(0);
    const [stats, setstats] = useState({
        cal: 0, pro: 0, carbs: 0, fat: 0
    })
    const [comps, setcomps] = useState([]);
    const [dumfb, setdum_fb] = useState([]);
    const [backup, setback] = useState(0);

    const getRecipes = async () => {
        console.log(ct, "API_USED");
        let mealsearch = "https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=" + details?.cal + "&apiKey=f8c828fd138c4a9eafba6575753ae18c ";
        const result = await axios.get(mealsearch);
        setmeals(result.data.meals);
        setchk(ct + 1);
        setback(backup + 1);
    }

    const getRecipeInfo = () => {
        let recipesearch = "https://api.spoonacular.com/recipes/informationBulk?ids=" + meals[0]?.id + "," + meals[1]?.id + "," + meals[2]?.id + "&includeNutrition=true" + "&apiKey=f8c828fd138c4a9eafba6575753ae18c ";
        axios.get(recipesearch).then(
            (res) => {
                // setdum(res.data);
                // console.log(res.data);
                let pa, pb, pc, ca, cb, cc, pba, pbb, pbc, dba, dbb, dbc;
                for (let i = 0; i < res.data[0].nutrition.nutrients.length; i++) {
                    if (res.data[0].nutrition.nutrients[i].name === "Protein") {
                        pa = i;
                        // setindices({...indices,["p1"]:i});
                    }
                    if (res.data[0].nutrition.nutrients[i].name === "Calories") {
                        ca = i;
                        // setindices({...indices,["cl1"]:i});
                    }
                    if (res.data[0].nutrition.nutrients[i].name === "Fat") {
                        pba = i;
                        // setindices({...indices,["c1"]:i});
                    }
                    if (res.data[0].nutrition.nutrients[i].name === "Carbohydrates") {
                        dba = i;
                        // setindices({...indices,["cb1"]:i});
                    }
                }

                for (let i = 0; i < res.data[1].nutrition.nutrients.length; i++) {
                    if (res.data[1].nutrition.nutrients[i].name === "Protein") {
                        pb = i;
                        // setindices({...indices,["p2"]:i});
                    }
                    if (res.data[1].nutrition.nutrients[i].name === "Calories") {
                        cb = i;
                        // setindices({...indices,["cl2"]:i});
                    }
                    if (res.data[1].nutrition.nutrients[i].name === "Fat") {
                        pbb = i;
                        // setindices({...indices,["c2"]:i});
                    }
                    if (res.data[1].nutrition.nutrients[i].name === "Carbohydrates") {
                        dbb = i;
                        // setindices({...indices,["cb2"]:i});
                    }
                }

                for (let i = 0; i < res.data[2].nutrition.nutrients.length; i++) {
                    if (res.data[2].nutrition.nutrients[i].name === "Protein") {
                        pc = i;
                        // setindices({...indices,["p3"]:i});
                    }
                    if (res.data[2].nutrition.nutrients[i].name === "Calories") {
                        cc = i;
                        // setindices({...indices,["cl3"]:i});
                    }
                    if (res.data[2].nutrition.nutrients[i].name === "Fat") {
                        pbc = i;
                        // setindices({...indices,["c3"]:i});
                    }
                    if (res.data[2].nutrition.nutrients[i].name === "Carbohydrates") {
                        dbc = i;
                        // setindices({...indices,["cb3"]:i});
                    }
                }

                setindices({
                    ...ind,
                    p1: pa, cl1: ca,
                    p2: pb, cl2: cb,
                    p3: pc, cl3: cc,
                    c1: pba, cb1: dba,
                    c2: pbb, cb2: dbb,
                    c3: pbc, cb3: dbc,
                })


                db.collection('Users').doc('Client').collection('clientel')
                    .doc(user.currentUser.uid).collection('Khaana').doc('Breakfast').set({
                        completed: 0,
                        img: res.data[0].image,
                        title: res.data[0].title,
                        pro: res.data[0].nutrition.nutrients[pa].amount,
                        fat: res.data[0].nutrition.nutrients[pba].amount,
                        carbs: res.data[0].nutrition.nutrients[dba].amount,
                        cal: res.data[0]?.nutrition.nutrients[ca].amount
                    })

                db.collection('Users').doc('Client').collection('clientel')
                    .doc(props.match.params.uid).collection('Khaana').doc('Lunch').set({
                        completed: 0,
                        img: res.data[1].image,
                        title: res.data[1].title,
                        pro: res.data[1].nutrition.nutrients[pb].amount,
                        fat: res.data[1].nutrition.nutrients[pbb].amount,
                        carbs: res.data[1].nutrition.nutrients[dbb].amount,
                        cal: res.data[1].nutrition.nutrients[cb].amount
                    })

                db.collection('Users').doc('Client').collection('clientel')
                    .doc(props.match.params.uid).collection('Khaana').doc('Dinner').set({
                        completed: 0,
                        img: res.data[2].image,
                        title: res.data[2].title,
                        pro: res.data[2].nutrition.nutrients[pc].amount,
                        fat: res.data[2].nutrition.nutrients[pbc].amount,
                        carbs: res.data[2].nutrition.nutrients[dbc].amount,
                        cal: res.data[2].nutrition.nutrients[cc].amount
                    })

                let today = new Date();

                db.collection('Users').doc('Client').collection('clientel')
                    .doc(user.currentUser.uid).update({
                        recipe_update: today.toString(),
                    })

                db.collection('Users').doc('Client').collection('clientel').doc(user.currentUser.uid)
                    .collection('Khaana').onSnapshot(
                        snap => {
                            setdum_fb(snap.docs.map(document => document.data()))
                        }
                    )

                setchk(ct + 1);
            });
        setback(backup + 1);
        console.log("API_USED");
    }

    const page_dict = {
        0: "Daily Goals",
        1: "Progress",
        3: "Book",
        4: "Blogs",
        5: "Nutritionist",
        6: "Friends"
    }

    const image_dict = {
        "Daily Goals": "Goals",
        "Progress": "Progress",
        "Book": "Book",
        "Blogs": "Bookmark",
        "Diet": "Diet",
        "Friends": "Friends",
        "Nutritionist": "Nutri",
    }

    React.useEffect(() => {

        if (user.currentUser === null) history.push('/'); // route protected
        setpage(0); // For development purposes remove this line

        db.collection('Users').doc('Client')
            .collection('clientel')
            .doc(props.match.params.uid)
            .onSnapshot((snap) => {
                setuserdata(snap.data());
            })

        // if (userdata.activity_level === 0) setuserdata({ ...userdata, activity_level: 1.3 })

        setdetails({
            ...details, cal: Math.ceil(CaloriesWithoutGoal(
                Math.ceil(Number(userdata.age)),
                Math.ceil(Number(userdata.height)) / 100,
                (1 - Math.ceil(Number(userdata.gender))),
                Math.ceil(Number(userdata.activity_level === 0 ? 1.3 : userdata.activity_level))))
        });

        setcnt(cnt + 1);

        if (ct === 0)
            db.collection('Users').doc('Client').collection('clientel')
                .doc(user.currentUser.uid)
                .onSnapshot(resp => { setdate(resp.data().recipe_update); setchk(ct + 1); })

        let today = new Date();
        let post_update = new Date(date);

        if (post_update.getDate() !== today.getDate() || post_update === 'Invalid Date') {
            if (ct === 1 && meals.length === 0 && details?.cal !== undefined) getRecipes()
            if (backup < 2 && backup > 0 && meals.length > 0) getRecipeInfo()
        }
        else {
            if (ct === 1) {
                db.collection('Users').doc('Client').collection('clientel').doc(user.currentUser.uid)
                    .collection('Khaana').onSnapshot(
                        snap => {
                            setdum_fb(snap.docs.map(document => document.data()))
                            setcomps(snap.docs.map(document => document.data().completed))
                            setchk(ct + 1);
                        }
                    )
            }
        }
        if (cnt === 5) {
            setstats({
                ...stats,
                pro: stats?.pro + comps[0] * dumfb[0]?.pro + comps[1] * dumfb[1]?.pro + comps[2] * dumfb[2]?.pro,
                cal: stats?.cal + comps[0] * dumfb[0]?.cal + comps[1] * dumfb[1]?.cal + comps[2] * dumfb[1]?.cal,
                fat: stats?.fat + comps[0] * dumfb[0]?.fat + comps[1] * dumfb[1]?.fat + comps[2] * dumfb[2]?.fat,
                carbs: stats?.carbs + comps[0] * dumfb[0]?.carbs + comps[1] * dumfb[1]?.carbs + comps[2] * dumfb[2]?.carbs
            });

            setbrek(comps[0]); setlunch(comps[2]); setdinner(comps[1]);
        }


    }, [userdata?.length, ct, backup, details.cal])


    return (
        <>
            <div className="dash__head dash__head__mobile">
                {
                    window.screen.width > 500 ? (
                        <DashDrawer pageset={setpage} uid={props.match.params.uid} page={page} />
                    ) : (
                        <DashDrawerMobile pageset={setpage} loc={page_dict[page]} page={page} img={image_dict[page_dict[page]]} uid={props.match.params.uid} />
                    )
                }
                {
                    page === 0 ?
                        <div className="goals__dashboard goals__dashboard__mobile" style={{ marginBottom: '20px' }}>
                            <div className="track track__mobile">
                                <p>Hi {userdata?.name}</p>
                                <h3 style={{ color: 'rgba(50, 30, 89, 1)' }}>Your goal for today</h3>
                                <div className="track__boxes track__boxes__mobile">
                                    <div className="box box__mobile">
                                        <div className="title">
                                            <b>Calories</b>
                                            <p>
                                                {details?.cal} calories
                                            </p>
                                        </div>
                                        <div className="render_circle">
                                            {
                                                brek === 1 && lunch === 1 && dinner === 1 ? (<CheckIcon fontSize="large" style={{ fontSize: '6rem', color: 'rgb(0,155,255)' }} />) : (
                                                    window.screen.width > 500 ? (
                                                        <CircularComponent size={150} thick={7} value={stats?.cal * 100 / details?.cal} color="rgba(105, 157, 255, 1)" text={Math.ceil(stats?.cal) + " kcal"} />
                                                    ) : (
                                                        <CircularComponent size={window.screen.width * 0.15 + window.screen.height * 0.1} thick={7} value={stats?.cal * 100 / details?.cal} color="rgba(105, 157, 255, 1)" text={Math.ceil(stats?.cal) + " kcal"} />
                                                    ))
                                            }
                                        </div>
                                    </div>
                                    <div className="box box__mobile">
                                        <div className="title">
                                            <b>Protein</b>
                                            <p>{Math.ceil(dumfb[0]?.pro + dumfb[1]?.pro + dumfb[2]?.pro)} g</p>
                                            {/* <p>{Math.ceil(dum[1]?.nutrition.nutrients[indices.p2].amount + dum[0]?.nutrition.nutrients[indices.p1].amount + dum[2]?.nutrition.nutrients[indices.p3].amount)} g</p> */}
                                        </div>
                                        <div className="render_circle">
                                            {
                                                brek === 1 && lunch === 1 && dinner === 1 ? (<CheckIcon fontSize="large" style={{ fontSize: '6rem', color: 'rgb(0,155,255)' }} />) : (
                                                    window.screen.width > 500 ? (

                                                        <CircularComponent size={150} thick={7}
                                                            value={stats?.pro * 100 /
                                                                // (Math.ceil(dum[1]?.nutrition.nutrients[indices.p2].amount + dum[0]?.nutrition.nutrients[indices.p1].amount + dum[2]?.nutrition.nutrients[indices.p3].amount))
                                                                (dumfb[0]?.pro + dumfb[1]?.pro + dumfb[2]?.pro)
                                                            }
                                                            text={Math.ceil(stats?.pro) + " g"} color="rgba(167, 212, 137, 1)" />
                                                    ) : (

                                                        <CircularComponent size={window.screen.width * 0.15 + window.screen.height * 0.1} thick={7} value={stats?.pro * 100 /
                                                            // (Math.ceil(dum[1]?.nutrition.nutrients[indices.p2].amount + dum[0]?.nutrition.nutrients[indices.p1].amount + dum[2]?.nutrition.nutrients[indices.p3].amount))
                                                            (dumfb[0]?.pro + dumfb[1]?.pro + dumfb[2]?.pro)
                                                        } text={Math.ceil(stats?.pro) + " g"} color="rgba(167, 212, 137, 1)" />
                                                    ))
                                            }
                                        </div>
                                    </div>
                                    <div className="box box__mobile">
                                        <div className="title">
                                            <b>Fats</b>
                                            <p>{Math.ceil(dumfb[0]?.fat + dumfb[1]?.fat + dumfb[2]?.fat)} g</p>
                                            {/* <p>{Math.ceil(dum[0]?.nutrition.nutrients[indices.c1].amount + dum[2]?.nutrition.nutrients[indices.c3].amount + dum[1]?.nutrition.nutrients[indices.c2].amount)} g</p> */}
                                        </div>
                                        <div className="render_circle">
                                            {
                                                brek === 1 && lunch === 1 && dinner === 1 ? (<CheckIcon fontSize="large" style={{ fontSize: '6rem', color: 'rgb(0,155,255)' }} />) : (
                                                    window.screen.width > 500 ? (

                                                        <CircularComponent size={150} thick={7} text={Math.ceil(stats?.fat) + " g"} color="rgba(249, 169, 188, 1)" value={stats?.fat * 100 /
                                                            // (Math.ceil(dum[0]?.nutrition.nutrients[indices.c1].amount + dum[2]?.nutrition.nutrients[indices.c3].amount + dum[1]?.nutrition.nutrients[indices.c2].amount))
                                                            (dumfb[0]?.fat + dumfb[1]?.fat + dumfb[2]?.fat)
                                                        } />
                                                    ) : (

                                                        <CircularComponent size={window.screen.width * 0.15 + window.screen.height * 0.1} thick={7} text={Math.ceil(stats?.fat) + " g"} color="rgba(249, 169, 188, 1)" value={stats?.fat * 100 /
                                                            // (Math.ceil(dum[0]?.nutrition.nutrients[indices.c1].amount + dum[2]?.nutrition.nutrients[indices.c3].amount + dum[1]?.nutrition.nutrients[indices.c2].amount))
                                                            (dumfb[0]?.fat + dumfb[1]?.fat + dumfb[2]?.fat)
                                                        } />
                                                    )
                                                )}
                                        </div>
                                    </div>
                                    <div className="box box__mobile">
                                        <div className="title">
                                            <b>Carbs</b>
                                            <p>{Math.ceil(dumfb[0]?.carbs + dumfb[1]?.carbs + dumfb[2]?.carbs)} g</p>
                                            {/* <p>{Math.ceil(dum[2]?.nutrition.nutrients[indices.cb3].amount + dum[1]?.nutrition.nutrients[indices.cb2].amount + dum[0]?.nutrition.nutrients[indices.cb1].amount)} g</p> */}
                                        </div>
                                        <div className="render_circle">
                                            {
                                                brek === 1 && lunch === 1 && dinner === 1 ? (<CheckIcon fontSize="large" style={{ fontSize: '6rem', color: 'rgb(0,155,255)' }} />) : (
                                                    window.screen.width > 500 ?

                                                        <CircularComponent size={150} text={Math.ceil(stats?.carbs) + " g"} color="rgba(131, 216, 223, 1)" thick={7} value={stats?.carbs * 100 /
                                                            // Math.ceil(dum[2]?.nutrition.nutrients[indices.cb3].amount + dum[1]?.nutrition.nutrients[indices.cb2].amount + dum[0]?.nutrition.nutrients[indices.cb1].amount)
                                                            (dumfb[0]?.carbs + dumfb[1]?.carbs + dumfb[2]?.carbs)
                                                        } />
                                                        :

                                                        <CircularComponent size={window.screen.width * 0.15 + window.screen.height * 0.1} text={Math.ceil(stats?.carbs) + " g"} color="rgba(131, 216, 223, 1)" thick={7} value={stats?.carbs * 100 /
                                                            // Math.ceil(dum[2]?.nutrition.nutrients[indices.cb3].amount + dum[1]?.nutrition.nutrients[indices.cb2].amount + dum[0]?.nutrition.nutrients[indices.cb1].amount)
                                                            (dumfb[0]?.carbs + dumfb[1]?.carbs + dumfb[2]?.carbs)
                                                        } />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="something_to_eat something_to_eat__mobile">
                                <div className="time_to_eat time_to_eat__mobile">
                                    <div style={{ display: 'flex', gap: "10px", alignItems: 'center' }}>
                                        <img src={Cup} height="54px" width="54px" />
                                        <h3>Breakfast</h3>
                                        {/* <div style={{ display: `${brek === 0 ? "flex" : "none"}`, alignItems: 'center', gap: "10px", cursor: 'pointer', marginLeft: 'auto' }}>
                                            <p>Add</p>
                                            <AddCircleIcon />
                                        </div> */}
                                    </div>
                                    {
                                        Array(1).fill().map((_, i) => (
                                            <div style={{ margin: "10px 0", display: 'flex', padding: '10px', gap: "10px", position: 'relative', alignItems: 'center', border: '3px solid rgba(182, 209, 252, 1)', borderRadius: '10px' }}>
                                                <div style={{ display: `${brek === 1 ? "flex" : "none"}`, position: 'absolute', top: 0, height: "100%", width: '100%', textAlign: 'center', fontSize: '2.5rem', borderRadius: "inherit", margin: "0 -10px", alignItems: 'center', justifyContent: 'center', color: 'rgba(105, 157, 255, 1)', background: '#ddeaff', zIndex: 10 }}><p>All Done</p><CheckIcon fontSize="large" style={{ background: 'rgb(0,155,255)', color: 'white', marginLeft: '20px', borderRadius: "50%" }} /></div>
                                                {
                                                    window.screen.width > 500 ? (
                                                        <img src={dumfb[0]?.img} style={{ height: '100px', width: '100px', borderRadius: '10px' }}></img>
                                                    ) : (
                                                        <img src={dumfb[0]?.img} style={{ height: '10vw', width: '10vw', borderRadius: '10px' }}></img>
                                                    )
                                                }
                                                <p>{dumfb[0]?.title}</p>
                                                <div style={{ display: 'flex', gap: "10px", alignItems: 'center', marginLeft: "auto" }}>
                                                    {
                                                        window.screen.width > 500 ?

                                                            (
                                                                <>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>
                                                                            {/* {Math.ceil(dum[0]?.nutrition.nutrients[indices.cl1].amount)} */}
                                                                            {Math.ceil(dumfb[0]?.cal)}
                                                                        </div>
                                                                        <p style={{ fontSize: 'x-small' }}>CALORIES</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>

                                                                            {/* {Math.ceil(dum[0]?.nutrition.nutrients[indices.p1].amount)} */}
                                                                            {Math.ceil(dumfb[0]?.pro)}
                                                                        </div>
                                                                        <p style={{ fontSize: 'x-small' }}>PROTEIN</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>
                                                                            {/* {Math.ceil(dum[0]?.nutrition.nutrients[indices.c1].amount)} */}
                                                                            {Math.ceil(dumfb[0]?.fat)}
                                                                        </div>
                                                                        <p style={{ fontSize: 'x-small' }}>FATS</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>
                                                                            {/* {Math.ceil(dum[0]?.nutrition.nutrients[indices.cb1].amount)} */}
                                                                            {Math.ceil(dumfb[0]?.carbs)}
                                                                        </div>
                                                                        <p style={{ fontSize: 'x-small' }}>CARBS</p>
                                                                    </div>
                                                                </>
                                                            ) :
                                                            (<></>)
                                                    }
                                                    {
                                                        window.screen.width > 500 ? (
                                                            <div onClick={() => {
                                                                // setstats({
                                                                //     ...stats,
                                                                //     pro: stats?.pro + dum[0].nutrition.nutrients[indices.p1].amount,
                                                                //     cal: stats?.cal + Math.ceil(dum[0]?.nutrition.nutrients[indices.cl1].amount),
                                                                //     fat: stats?.fat + dum[0].nutrition.nutrients[indices.c1].amount,
                                                                //     carbs: stats?.carbs + dum[0].nutrition.nutrients[indices.cb1].amount
                                                                // });

                                                                setstats({
                                                                    ...stats,
                                                                    pro: stats?.pro + dumfb[0]?.pro,
                                                                    cal: stats?.cal + dumfb[0]?.cal,
                                                                    fat: stats?.fat + dumfb[0]?.fat,
                                                                    carbs: stats?.carbs + dumfb[0]?.carbs
                                                                });

                                                                setbrek(1);

                                                                db.collection('Users').doc('Client').collection('clientel')
                                                                    .doc(user.currentUser.uid).collection('Khaana').doc('Breakfast').update({
                                                                        completed: 1,
                                                                    })
                                                            }} style={{ marginLeft: '40px', height: '100px', width: '50px', background: "rgba(0, 155, 250, 0.1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <CheckIcon fontSize="large" style={{ color: 'rgb(0,155,255)' }} />
                                                            </div>
                                                        ) : (
                                                            <div onClick={() => {
                                                                // setstats({
                                                                //     ...stats,
                                                                //     pro: stats?.pro + dum[0].nutrition.nutrients[indices.p1].amount,
                                                                //     cal: stats?.cal + Math.ceil(dum[0]?.nutrition.nutrients[indices.cl1].amount),
                                                                //     fat: stats?.fat + dum[0].nutrition.nutrients[indices.c1].amount,
                                                                //     carbs: stats?.carbs + dum[0].nutrition.nutrients[indices.cb1].amount
                                                                // });
                                                                setstats({
                                                                    ...stats,
                                                                    pro: stats?.pro + dumfb[0]?.pro,
                                                                    cal: stats?.cal + dumfb[0]?.cal,
                                                                    fat: stats?.fat + dumfb[0]?.fat,
                                                                    carbs: stats?.carbs + dumfb[0]?.carbs
                                                                });
                                                                setbrek(1);

                                                                db.collection('Users').doc('Client').collection('clientel')
                                                                    .doc(props.match.params.uid).collection('Khaana').doc('Breakfast').update({
                                                                        completed: 1,
                                                                    })
                                                            }} style={{ height: '10vw', width: '10vw', background: "rgba(0, 155, 250, 0.1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <CheckIcon fontSize="small" style={{ color: 'rgb(0,155,255)' }} />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="time_to_eat time_to_eat__mobile">
                                    <div style={{ display: 'flex', gap: "10px", alignItems: 'center' }}>
                                        <img src={Comp_Cup} height="54px" width="54px" />
                                        <h3>Lunch</h3>
                                        {/* <div style={{ display: `${lunch === 0 ? "flex" : "none"}`, alignItems: 'center', gap: "10px", cursor: 'pointer', marginLeft: 'auto' }}>
                                            <p>Add</p>
                                            <AddCircleIcon />
                                        </div> */}
                                    </div>
                                    {
                                        Array(1).fill().map((_, i) => (
                                            <div style={{ margin: "10px 0", display: 'flex', position: "relative", padding: '10px', gap: "10px", alignItems: 'center', border: '3px solid rgba(182, 209, 252, 1)', borderRadius: '10px' }}>
                                                <div style={{ display: `${lunch === 1 ? "flex" : "none"}`, position: 'absolute', top: 0, height: "100%", width: '100%', textAlign: 'center', fontSize: '2.5rem', borderRadius: "inherit", margin: "0 -10px", alignItems: 'center', justifyContent: 'center', color: 'rgba(105, 157, 255, 1)', background: '#ddeaff', zIndex: 10 }}><p>All Done</p><CheckIcon fontSize="large" style={{ background: 'rgb(0,155,255)', color: 'white', marginLeft: '20px', borderRadius: "50%" }} /></div>
                                                {
                                                    window.screen.width > 500 ? (
                                                        <img src={dumfb[2]?.img} style={{ height: '100px', width: '100px', borderRadius: '10px' }}></img>
                                                    ) : (
                                                        <img src={dumfb[2]?.img} style={{ height: '10vw', width: '10vw', borderRadius: '10px' }}></img>
                                                    )
                                                }
                                                <p>{dumfb[2]?.title}</p>
                                                <div style={{ display: 'flex', gap: "10px", alignItems: 'center', marginLeft: "auto" }}>
                                                    {
                                                        window.screen.width > 500 ?
                                                            (
                                                                <>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>
                                                                            {/* {Math.ceil(dum[1]?.nutrition.nutrients[indices.cl2].amount)} */}
                                                                            {Math.ceil(dumfb[2]?.cal)}
                                                                        </div>
                                                                        <p style={{ fontSize: 'x-small' }}>CALORIES</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>
                                                                            {/* {Math.ceil(dum[1]?.nutrition.nutrients[indices.p2].amount)} */}
                                                                            {Math.ceil(dumfb[2]?.pro)}
                                                                        </div>
                                                                        <p style={{ fontSize: 'x-small' }}>PROTEIN</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>
                                                                            {/* {Math.ceil(dum[1]?.nutrition.nutrients[indices.c2].amount)} */}
                                                                            {Math.ceil(dumfb[2]?.fat)}
                                                                        </div>
                                                                        <p style={{ fontSize: 'x-small' }}>FATS</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>
                                                                            {/* {Math.ceil(dum[1]?.nutrition.nutrients[indices.cb2].amount)} */}
                                                                            {Math.ceil(dumfb[2]?.carbs)}
                                                                        </div>
                                                                        <p style={{ fontSize: 'x-small' }}>CARBS</p>
                                                                    </div>
                                                                </>
                                                            ) :
                                                            (<></>)
                                                    }
                                                    {
                                                        window.screen.width > 500 ? (
                                                            <div onClick={() => {
                                                                // setstats({
                                                                //     ...stats,
                                                                //     pro: stats?.pro + dum[1].nutrition.nutrients[indices.p1].amount,
                                                                //     cal: stats?.cal + Math.ceil(dum[1]?.nutrition.nutrients[indices.cl1].amount),
                                                                //     fat: stats?.fat + dum[1].nutrition.nutrients[indices.c1].amount,
                                                                //     carbs: stats?.carbs + dum[1].nutrition.nutrients[indices.cb1].amount
                                                                // });

                                                                setstats({
                                                                    ...stats,
                                                                    pro: stats?.pro + dumfb[2]?.pro,
                                                                    cal: stats?.cal + dumfb[2]?.cal,
                                                                    fat: stats?.fat + dumfb[2]?.fat,
                                                                    carbs: stats?.carbs + dumfb[2]?.carbs
                                                                });
                                                                setlunch(1);

                                                                db.collection('Users').doc('Client').collection('clientel')
                                                                    .doc(props.match.params.uid).collection('Khaana').doc('Lunch').update({
                                                                        completed: 1,
                                                                    })
                                                            }} style={{ marginLeft: '40px', height: '100px', width: '50px', background: "rgba(0, 155, 250, 0.1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <CheckIcon fontSize="large" style={{ color: 'rgb(0,155,255)' }} />
                                                            </div>
                                                        ) : (
                                                            <div onClick={() => {
                                                                // setstats({
                                                                //     ...stats,
                                                                //     pro: stats?.pro + dum[1].nutrition.nutrients[indices.p1].amount,
                                                                //     cal: stats?.cal + Math.ceil(dum[1]?.nutrition.nutrients[indices.cl1].amount),
                                                                //     fat: stats?.fat + dum[1].nutrition.nutrients[indices.c1].amount,
                                                                //     carbs: stats?.carbs + dum[1].nutrition.nutrients[indices.cb1].amount
                                                                // });

                                                                setstats({
                                                                    ...stats,
                                                                    pro: stats?.pro + dumfb[2]?.pro,
                                                                    cal: stats?.cal + dumfb[2]?.cal,
                                                                    fat: stats?.fat + dumfb[2]?.fat,
                                                                    carbs: stats?.carbs + dumfb[2]?.carbs
                                                                });
                                                                setlunch(1);

                                                                db.collection('Users').doc('Client').collection('clientel')
                                                                    .doc(props.match.params.uid).collection('Khaana').doc('Lunch').update({
                                                                        completed: 1,
                                                                    })
                                                            }} style={{ height: '10vw', width: '10vw', background: "rgba(0, 155, 250, 0.1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <CheckIcon fontSize="small" style={{ color: 'rgb(0,155,255)' }} />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="time_to_eat time_to_eat__mobile">
                                    <div style={{ display: 'flex', gap: "10px", alignItems: 'center' }}>
                                        <img src={Kinda_Cup} height="54px" width="54px" />
                                        <h3>Dinner</h3>
                                        {/* <div style={{ display: `${dinner === 0 ? "flex" : "none"}`, alignItems: 'center', gap: "10px", cursor: 'pointer', marginLeft: 'auto' }}>
                                            <p>Add</p>
                                            <AddCircleIcon />
                                        </div> */}
                                    </div>
                                    {
                                        Array(1).fill().map((_, i) => (
                                            <div style={{ margin: "10px 0", display: 'flex', padding: '10px', position: 'relative', gap: "10px", alignItems: 'center', border: '3px solid rgba(182, 209, 252, 1)', borderRadius: '10px' }}>
                                                <div style={{ display: `${dinner === 1 ? "flex" : "none"}`, position: 'absolute', top: 0, height: "100%", width: '100%', textAlign: 'center', fontSize: '2.5rem', borderRadius: "inherit", margin: "0 -10px", alignItems: 'center', justifyContent: 'center', color: 'rgba(105, 157, 255, 1)', background: '#ddeaff', zIndex: 10 }}><p>All Done</p><CheckIcon fontSize="large" style={{ background: 'rgb(0,155,255)', color: 'white', marginLeft: '20px', borderRadius: "50%" }} /></div>
                                                {
                                                    window.screen.width > 500 ? (
                                                        <img src={dumfb[1]?.img} style={{ height: '100px', width: '100px', borderRadius: '10px' }}></img>
                                                    ) : (
                                                        <img src={dumfb[1]?.img} style={{ height: '10vw', width: '10vw', borderRadius: '10px' }}></img>
                                                    )
                                                }
                                                <p>{dumfb[1]?.title}</p>
                                                <div style={{ display: 'flex', gap: "10px", alignItems: 'center', marginLeft: "auto" }}>
                                                    {
                                                        window.screen.width > 500 ?
                                                            (
                                                                <>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>
                                                                            {/* {Math.ceil(dum[2]?.nutrition.nutrients[indices.cl3].amount)} */}
                                                                            {Math.ceil(dumfb[1]?.cal)}
                                                                        </div>
                                                                        <p style={{ fontSize: 'x-small' }}>CALORIES</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>
                                                                            {/* {Math.ceil(dum[2]?.nutrition.nutrients[indices.p3].amount)} */}
                                                                            {Math.ceil(dumfb[1]?.pro)}
                                                                        </div>
                                                                        <p style={{ fontSize: 'x-small' }}>PROTEIN</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>
                                                                            {/* {Math.ceil(dum[2]?.nutrition.nutrients[indices.c3].amount)} */}
                                                                            {Math.ceil(dumfb[1]?.fat)}
                                                                        </div>
                                                                        <p style={{ fontSize: 'x-small' }}>FATS</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>
                                                                            {/* {Math.ceil(dum[2]?.nutrition.nutrients[indices.cb3].amount)} */}
                                                                            {Math.ceil(dumfb[1]?.carbs)}
                                                                        </div>
                                                                        <p style={{ fontSize: 'x-small' }}>CARBS</p>
                                                                    </div>
                                                                </>
                                                            ) :
                                                            (<></>)
                                                    }
                                                    {
                                                        window.screen.width > 500 ? (
                                                            <div onClick={() => {
                                                                // setstats({
                                                                //     ...stats,
                                                                //     pro: stats?.pro + dum[2].nutrition.nutrients[indices.p1].amount,
                                                                //     cal: stats?.cal + Math.ceil(dum[2]?.nutrition.nutrients[indices.cl1].amount),
                                                                //     fat: stats?.fat + dum[2].nutrition.nutrients[indices.c1].amount,
                                                                //     carbs: stats?.carbs + dum[2].nutrition.nutrients[indices.cb1].amount
                                                                // });
                                                                setstats({
                                                                    ...stats,
                                                                    pro: stats?.pro + dumfb[1]?.pro,
                                                                    cal: stats?.cal + dumfb[1]?.cal,
                                                                    fat: stats?.fat + dumfb[1]?.fat,
                                                                    carbs: stats?.carbs + dumfb[1]?.carbs
                                                                });
                                                                setdinner(1);

                                                                db.collection('Users').doc('Client').collection('clientel')
                                                                    .doc(props.match.params.uid).collection('Khaana').doc('Dinner').update({
                                                                        completed: 1,
                                                                    })

                                                            }} style={{ marginLeft: '40px', height: '100px', width: '50px', background: "rgba(0, 155, 250, 0.1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <CheckIcon fontSize="large" style={{ color: 'rgb(0,155,255)' }} />
                                                            </div>
                                                        ) : (
                                                            <div onClick={() => {
                                                                // setstats({
                                                                //     ...stats,
                                                                //     pro: stats?.pro + dum[2].nutrition.nutrients[indices.p1].amount,
                                                                //     cal: stats?.cal + Math.ceil(dum[2]?.nutrition.nutrients[indices.cl1].amount),
                                                                //     fat: stats?.fat + dum[2].nutrition.nutrients[indices.c1].amount,
                                                                //     carbs: stats?.carbs + dum[2].nutrition.nutrients[indices.cb1].amount
                                                                // });
                                                                setstats({
                                                                    ...stats,
                                                                    pro: stats?.pro + dumfb[1]?.pro,
                                                                    cal: stats?.cal + dumfb[1]?.cal,
                                                                    fat: stats?.fat + dumfb[1]?.fat,
                                                                    carbs: stats?.carbs + dumfb[1]?.carbs
                                                                });
                                                                setdinner(1);

                                                                db.collection('Users').doc('Client').collection('clientel')
                                                                    .doc(props.match.params.uid).collection('Khaana').doc('Dinner').update({
                                                                        completed: 1,
                                                                    })

                                                            }} style={{ height: '10vw', width: '10vw', background: "rgba(0, 155, 250, 0.1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <CheckIcon fontSize="small" style={{ color: 'rgb(0,155,255)' }} />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* <div className="time_to_eat time_to_eat__mobile">
                                    <div style={{ display: 'flex', gap: "10px", alignItems: 'center' }}>
                                        <img src={Not_a_Cup} height="54px" width="54px" />
                                        <h3>Snacks</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: "10px", cursor: 'pointer', marginLeft: 'auto' }}>
                                            <p>Add</p>
                                            <AddCircleIcon />
                                        </div>
                                    </div>
                                    {
                                        Array(1).fill().map((_, i) => (
                                            <div style={{ margin: "10px 0", display: 'flex', padding: '10px', gap: "10px", position: "relative", alignItems: 'center', border: '3px solid rgba(182, 209, 252, 1)', borderRadius: '10px' }}>
                                                <div style={{ display: 'none', position: 'absolute', top: 0, height: "100%", width: '100%', textAlign: 'center', fontSize: '2.5rem', borderRadius: "inherit", margin: "0 -10px", alignItems: 'center', justifyContent: 'center', color: 'rgba(105, 157, 255, 1)', background: '#ddeaff', zIndex: 10 }}><p>All Done</p><CheckIcon fontSize="large" style={{ background: 'rgb(0,155,255)', color: 'white', marginLeft: '20px', borderRadius: "50%" }} /></div>
                                                {
                                                    window.screen.width > 500 ? (
                                                        <img src={Not_a_Cup} className="time_to_eat" style={{ height: '100px', width: '100px', borderRadius: '10px' }}></img>
                                                    ) : (
                                                        <img src={Not_a_Cup} className="time_to_eat" style={{ height: '10vw', width: '10vw', borderRadius: '10px' }}></img>
                                                    )
                                                }
                                                <p>Add a snack!</p>
                                                <div style={{ display: 'flex', gap: "10px", alignItems: 'center', marginLeft: "auto" }}>
                                                    {
                                                        window.screen.width > 500 ?
                                                            (
                                                                <>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>--</div>
                                                                        <p style={{ fontSize: 'x-small' }}>CALORIES</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>--</div>
                                                                        <p style={{ fontSize: 'x-small' }}>PROTEIN</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>--</div>
                                                                        <p style={{ fontSize: 'x-small' }}>FATS</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>--</div>
                                                                        <p style={{ fontSize: 'x-small' }}>CARBS</p>
                                                                    </div>
                                                                </>
                                                            ) :
                                                            (<></>)
                                                    }
                                                    {
                                                        window.screen.width > 500 ? (
                                                            <div onClick={ } style={{ marginLeft: '40px', height: '100px', width: '50px', color: 'darkgreen', background: "rgba(0, 255, 100, 0.4)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <AddIcon fontSize="large" />
                                                            </div>
                                                        ) : (
                                                            <div onClick={ } style={{ height: '10vw', width: '10vw', background: "rgba(0, 255, 100, 0.4)", color: 'darkgreen', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <AddIcon fontSize="small" />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    } 
                                </div>
                                    */}
                            </div>
                        </div>
                        : <></>
                }
                {
                    page === 1 ? <ProgressReport uid={props.match.params.uid} userdata={userdata} /> : <></>
                }
                {
                    page === 3 ? <RecipeBook uid={props.match.params.uid} userdata={userdata} /> : <></>
                }
                {
                    page === 2 ? <Dietplans uid={props.match.params.uid} userdata={userdata} />:<></>
                }
                {
                    page === 4 ? <SavedBlogs uid={props.match.params.uid} udata={userdata}/> : <></>
                }
                {
                    page === 5 ? <Nutritionist uid={props.match.params.uid} udata={userdata} /> : <></>
                }
                {
                    page === 6 ? <Friends myname={userdata.name} uid={props.match.params.uid} /> : <></>
                }
            </div >
        </>
    )
}

export default Dashboard
