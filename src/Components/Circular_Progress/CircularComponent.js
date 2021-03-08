import React from 'react'
import './CircularComponent.css'
import CircularProgress from '@material-ui/core/CircularProgress';

function CircularComponent({ color }) {
    return (
        <div className="bada_circ">
            <div className="circ1">
                <CircularProgress className="circle1" variant="determinate" thickness={10} size={100} value={75} style={{ color: `${color}` }} />
            </div>
            <div className="circ2">
                <CircularProgress variant="determinate" thickness={10} size={100} value={100} />
            </div>
        </div>
    )
}

export default CircularComponent
