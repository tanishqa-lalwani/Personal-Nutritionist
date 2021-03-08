import React from 'react'
import img from '../../Images/img.png'
import up from '../../Images/Upar_vala.png'
import girl1 from '../../Images/pehli_ladki.png'
import girl2 from '../../Images/dusri_ladki.png'
import girl3 from '../../Images/tesri_ladki.png'
import './Intro.css'
import Button from '@material-ui/core/Button';


function Intro() {
    return (
        <div className="intro" >
            <img id='up' src={up} style={{
                width: '100vw',
                top: '0'
            }} />
            <div className="intro__main" >
                <div className="intro__text">
                    <h3>Fitness starts with what you eat </h3>
                    <p>
                        Take control of your goals. Track calories, break down ingredients, and log activities.
                </p>
                    <Button id='trial__but' variant="filled" style={{ background: '#699DFF', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize', color: 'white', }}>
                        Start for free
                </Button>
                </div>
                <div className="intro__image">
                    <img src={img} alt="" style={{ margin: 'auto' }} />
                </div>
            </div>
            <div className='tools'>
                <h1>We give you the right tools to hit your goals</h1>
                <div className='tools__cont'>
                    <div className="bada__dabba">
                        <div className='dabba'>
                            <img src={girl1} />
                        </div>
                        <p>ANALAYSE  WHAT  YOU  EAT</p>
                    </div>
                    <div className="bada__dabba">
                        <div className='dabba'>
                            <img src={girl2} />
                        </div>
                        <p>FIND  HEALTHY  RECIPES</p>
                    </div>
                    <div className="bada__dabba">
                        <div className='dabba'>
                            <img src={girl3} />
                        </div>
                        <p>PLAN.  TRACK.  IMPROVE.</p>
                    </div>
                </div>
            </div>
            <div className="footer">
                <h1 style={{ color: '#321E59', margin: 'auto' }}>Ye Footer Hai!</h1>
            </div>
        </div>

    )
}

export default Intro
