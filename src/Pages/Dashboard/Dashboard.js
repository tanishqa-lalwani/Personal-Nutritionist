import React from 'react'
import './Dashboard.css'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CircularComponent from '../../Components/Circular_Progress/CircularComponent'
import DashDrawer from '../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../Components/Dash Drawer/DashDrawerMobile'
import Cup from './Cup.svg'
import Kinda_Cup from './Kinda Cup.svg'
import Not_a_Cup from './Not a Cup.svg'
import Comp_Cup from './Comp Cup.svg'
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {useAuth} from '../../AuthContext'

function Dashboard(props) {
    const user = useAuth();
    return (
        <div className="dash__head dash__head__mobile">
            {
                window.screen.width > 500 ? (
                    <DashDrawer uid={props.match.params.uid}/>
                ) : (
                    <DashDrawerMobile loc="Daily Goals" img="Goals" uid={props.match.params.uid}/>
                )
            }

            <div className="goals__dashboard goals__dashboard__mobile" >
                <div className="track track__mobile">
                    <p>Hi Username!</p>
                    <h3 style={{ color: 'rgba(50, 30, 89, 1)' }}>Your goal for today</h3>
                    <div className="track__boxes track__boxes__mobile">
                        <div className="box box__mobile">
                            <div className="title">
                                <b>Calories</b>
                                <p>2000 kcal</p>
                            </div>
                            <div className="render_circle">
                                {
                                    window.screen.width > 500 ? (
                                        <CircularComponent size={150} thick={7} value={60} color="rgba(105, 157, 255, 1)" text="700 kcal" />
                                    ) : (
                                        <CircularComponent size={window.screen.width *  0.15 + window.screen.height *  0.1} thick={7} value={60} color="rgba(105, 157, 255, 1)" text="700 kcal" />
                                    )
                                }
                            </div>
                        </div>
                        <div className="box box__mobile">
                            <div className="title">
                                <b>Protein</b>
                                <p>100 g</p>
                            </div>
                            <div className="render_circle">
                                {
                                    window.screen.width > 500 ? (

                                        <CircularComponent size={150} thick={7} value={35} text="70g" color="rgba(167, 212, 137, 1)" />
                                    ) : (

                                        <CircularComponent size={window.screen.width *  0.15 + window.screen.height *  0.1} thick={7} value={35} text="70g" color="rgba(167, 212, 137, 1)" />
                                    )
                                }
                            </div>
                        </div>
                        <div className="box box__mobile">
                            <div className="title">
                                <b>Fats</b>
                                <p>200 g</p>
                            </div>
                            <div className="render_circle">
                                {
                                    window.screen.width > 500 ? (

                                        <CircularComponent size={150} thick={7} text="15g" color="rgba(249, 169, 188, 1)" value={80} />
                                    ) : (

                                        <CircularComponent size={window.screen.width *  0.15 + window.screen.height *  0.1} thick={7} text="15g" color="rgba(249, 169, 188, 1)" value={80} />
                                    )
                                }
                            </div>
                        </div>
                        <div className="box box__mobile">
                            <div className="title">
                                <b>Carbs</b>
                                <p>80 g</p>
                            </div>
                            <div className="render_circle">
                                {
                                    window.screen.width > 500 ? (

                                        <CircularComponent size={150} text="175g" color="rgba(131, 216, 223, 1)" thick={7} value={10} />
                                    ) : (

                                        <CircularComponent size={window.screen.width *  0.15 + window.screen.height *  0.1} text="175g" color="rgba(131, 216, 223, 1)" thick={7} value={10} />
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: "10px", cursor: 'pointer', marginLeft: 'auto' }}>
                                <p>Add</p>
                                <AddCircleIcon />
                            </div>
                        </div>
                        {
                            Array(1).fill().map((_, i) => (
                                <div style={{ margin: "10px 0", display: 'flex', padding: '10px', gap: "10px", alignItems: 'center', border: '3px solid rgba(182, 209, 252, 1)', borderRadius: '10px' }}>
                                    {
                                        window.screen.width > 500 ? (
                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '100px', width: '100px', borderRadius: '10px' }}></div>
                                        ) : (
                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '10vw', width: '10vw', borderRadius: '10px' }}></div>
                                        )
                                    }
                                    <p>Broccoli salad</p>
                                    <div style={{ display: 'flex', gap: "10px", alignItems: 'center', marginLeft: "auto" }}>
                                        {
                                            window.screen.width > 500 ?
                                                (
                                                    <>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>480</div>
                                                            <p style={{ fontSize: 'x-small' }}>CALORIES</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>10</div>
                                                            <p style={{ fontSize: 'x-small' }}>PROTEIN</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>20</div>
                                                            <p style={{ fontSize: 'x-small' }}>FATS</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>30</div>
                                                            <p style={{ fontSize: 'x-small' }}>CARBS</p>
                                                        </div>
                                                    </>
                                                ) :
                                                (<></>)
                                        }
                                        {
                                            window.screen.width > 500 ? (
                                                <div style={{ marginLeft: '40px', height: '100px', width: '50px', background: "rgba(249, 206, 216, 1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <DeleteIcon fontSize="large" />
                                                </div>
                                            ) : (
                                                <div style={{ height: '10vw', width: '10vw', background: "rgba(249, 206, 216, 1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <DeleteIcon fontSize="small" />
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: "10px", cursor: 'pointer', marginLeft: 'auto' }}>
                                <p>Add</p>
                                <AddCircleIcon />
                            </div>
                        </div>
                        {
                            Array(1).fill().map((_, i) => (
                                <div style={{ margin: "10px 0", display: 'flex', padding: '10px', gap: "10px", alignItems: 'center', border: '3px solid rgba(182, 209, 252, 1)', borderRadius: '10px' }}>
                                    {
                                        window.screen.width > 500 ? (
                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '100px', width: '100px', borderRadius: '10px' }}></div>
                                        ) : (
                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '10vw', width: '10vw', borderRadius: '10px' }}></div>
                                        )
                                    }
                                    <p>Broccoli salad</p>
                                    <div style={{ display: 'flex', gap: "10px", alignItems: 'center', marginLeft: "auto" }}>
                                        {
                                            window.screen.width > 500 ?
                                                (
                                                    <>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>480</div>
                                                            <p style={{ fontSize: 'x-small' }}>CALORIES</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>10</div>
                                                            <p style={{ fontSize: 'x-small' }}>PROTEIN</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>20</div>
                                                            <p style={{ fontSize: 'x-small' }}>FATS</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>30</div>
                                                            <p style={{ fontSize: 'x-small' }}>CARBS</p>
                                                        </div>
                                                    </>
                                                ) :
                                                (<></>)
                                        }
                                        {
                                            window.screen.width > 500 ? (
                                                <div style={{ marginLeft: '40px', height: '100px', width: '50px', background: "rgba(249, 206, 216, 1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <DeleteIcon fontSize="large" />
                                                </div>
                                            ) : (
                                                <div style={{ height: '10vw', width: '10vw', background: "rgba(249, 206, 216, 1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <DeleteIcon fontSize="small" />
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: "10px", cursor: 'pointer', marginLeft: 'auto' }}>
                                <p>Add</p>
                                <AddCircleIcon />
                            </div>
                        </div>
                        {
                            Array(1).fill().map((_, i) => (
                                <div style={{ margin: "10px 0", display: 'flex', padding: '10px', gap: "10px", alignItems: 'center', border: '3px solid rgba(182, 209, 252, 1)', borderRadius: '10px' }}>
                                    {
                                        window.screen.width > 500 ? (
                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '100px', width: '100px', borderRadius: '10px' }}></div>
                                        ) : (
                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '10vw', width: '10vw', borderRadius: '10px' }}></div>
                                        )
                                    }
                                    <p>Broccoli salad</p>
                                    <div style={{ display: 'flex', gap: "10px", alignItems: 'center', marginLeft: "auto" }}>
                                        {
                                            window.screen.width > 500 ?
                                                (
                                                    <>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>480</div>
                                                            <p style={{ fontSize: 'x-small' }}>CALORIES</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>10</div>
                                                            <p style={{ fontSize: 'x-small' }}>PROTEIN</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>20</div>
                                                            <p style={{ fontSize: 'x-small' }}>FATS</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>30</div>
                                                            <p style={{ fontSize: 'x-small' }}>CARBS</p>
                                                        </div>
                                                    </>
                                                ) :
                                                (<></>)
                                        }
                                        {
                                            window.screen.width > 500 ? (
                                                <div style={{ marginLeft: '40px', height: '100px', width: '50px', background: "rgba(249, 206, 216, 1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <DeleteIcon fontSize="large" />
                                                </div>
                                            ) : (
                                                <div style={{ height: '10vw', width: '10vw', background: "rgba(249, 206, 216, 1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <DeleteIcon fontSize="small" />
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
                            <img src={Not_a_Cup} height="54px" width="54px" />
                            <h3>Snacks</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: "10px", cursor: 'pointer', marginLeft: 'auto' }}>
                                <p>Add</p>
                                <AddCircleIcon />
                            </div>
                        </div>
                        {
                            Array(1).fill().map((_, i) => (
                                <div style={{ margin: "10px 0", display: 'flex', padding: '10px', gap: "10px", alignItems: 'center', border: '3px solid rgba(182, 209, 252, 1)', borderRadius: '10px' }}>
                                    {
                                        window.screen.width > 500 ? (
                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '100px', width: '100px', borderRadius: '10px' }}></div>
                                        ) : (
                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '10vw', width: '10vw', borderRadius: '10px' }}></div>
                                        )
                                    }
                                    <p>Broccoli salad</p>
                                    <div style={{ display: 'flex', gap: "10px", alignItems: 'center', marginLeft: "auto" }}>
                                        {
                                            window.screen.width > 500 ?
                                                (
                                                    <>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>480</div>
                                                            <p style={{ fontSize: 'x-small' }}>CALORIES</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>10</div>
                                                            <p style={{ fontSize: 'x-small' }}>PROTEIN</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>20</div>
                                                            <p style={{ fontSize: 'x-small' }}>FATS</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ background: 'rgba(105, 157, 255, 1)', height: '70px', width: '70px', clipPath: 'circle(40%)', display: 'flex', color: "white", alignItems: 'center', justifyContent: 'center' }}>30</div>
                                                            <p style={{ fontSize: 'x-small' }}>CARBS</p>
                                                        </div>
                                                    </>
                                                ) :
                                                (<></>)
                                        }
                                        {
                                            window.screen.width > 500 ? (
                                                <div style={{ marginLeft: '40px', height: '100px', width: '50px', background: "rgba(249, 206, 216, 1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <DeleteIcon fontSize="large" />
                                                </div>
                                            ) : (
                                                <div style={{ height: '10vw', width: '10vw', background: "rgba(249, 206, 216, 1)", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <DeleteIcon fontSize="small" />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard
