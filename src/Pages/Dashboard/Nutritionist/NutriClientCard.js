import React from 'react';
import './NutriClientCard.css'
import { db } from '../../../firebase'
import { Avatar } from '@material-ui/core';
import Popover from '@material-ui/core/Popover'


function NutriClientCard({ uid }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [clientdata, setclientdata] = React.useState([]);

    React.useEffect(() => {
        console.log(uid);
        db.collection('Users').doc('Client').collection('clientel').doc(uid).onSnapshot(snap => { setclientdata(snap.data()) })

        
    }, [clientdata?.length, uid])

    return (
        <div className="nutri__card__prev" onClick = {handleClick}>
            <Avatar src={clientdata?.image} className="circle" />
            <div className="user_name">{clientdata?.name}</div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className="nutri__card" style={{height:'fit-content', width:'fit-content'}}>
                    <div className="author__info__nutri">
                        <Avatar className="avatar__second" style={{ height: '70px', width: '70px' }} src={clientdata?.image} alt="C" />
                    </div>
                    <div className="author__name__nutri">
                        <h4 className="nutri__card__nutritionist" >{clientdata?.name}</h4>
                        <h5>{clientdata?.gender===0?"Male":"Female"}</h5>
                    </div>
                    <div className="nutri__followers">
                        <h4>{clientdata?.age} yr</h4>
                        <h5>Height : {clientdata?.height}, Weight : {clientdata?.weight}</h5>
                    </div>
                    <div className="nutri__card__follow">
                        <div className="nutritionist__follow">
                            <h5>Client</h5>
                        </div>
                        <div className="nutritionist__follow__gmail">
                            <h5>{clientdata?.email}</h5>
                        </div>

                    </div>

                </div>
            </Popover>
        </div>
    );
}

export default NutriClientCard;