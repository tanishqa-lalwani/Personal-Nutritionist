import React from 'react'
import './CircularComponent.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Newcomp from './SubComp'


function CircularComponent({ color, size, thick, value ,text}) {
    return (
        <div className="bada_circ">
            <div className="circ1">
                <Newcomp value={value} thick={thick} size={size} color={color} text={text}/>
            </div>
            <div className="circ2">
                <CircularProgress variant="determinate" thickness={thick} size={size} value={100} /> 
            </div>
        </div>
    )
}

export default CircularComponent
