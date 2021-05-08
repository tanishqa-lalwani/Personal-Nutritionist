import React from 'react';
import './NutriClientCard.css'
import { db } from '../../../firebase'
import { Button } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import Popover from '@material-ui/core/Popover'
import Diet from '../../../Components/Modals/Diet'
import { useAuth } from '../../../AuthContext'


function NutriClientCard({ uid }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = useAuth()

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
        <div style={{ display: 'flex', background: 'rgba(182,209,252,0.2)', flexDirection: 'column', padding: '20px', minHeight: '15vh', gap: '20px', width: '8vw', borderRadius: '10px', alignItems: 'center', border: '3px solid #B6D1FC', justifyContent: 'center' }} onClick={handleClick}>
            <Avatar src={clientdata?.image} style={{ height: '40px', width: '40px' }} />
            <div style={{ fontSize: "15px" }}>{clientdata?.name}</div>
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
                <div style={{
                    minWidth: '20vw', minHeight: '30vh', padding: '10px', display: 'flex', border: '3px solid #B6D1FC', borderRadius: 'inherit',
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'
                }}>
                    <div className="author__info__nutri_nut">
                        <Avatar className="avatar__second" style={{ height: '70px', width: '70px' }} src={clientdata?.image} alt="C" />
                    </div>
                    <div className="author__name__nutri" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h4 className="nutri__card__nutritionist" >{clientdata?.name}</h4>
                        <h5>{clientdata?.gender === 0 ? "Male" : "Female"}</h5>
                    </div>
                    <div className="nutri__followers">
                        <h4>{clientdata?.age} yr</h4>
                        <h5>Height : {clientdata?.height}, Weight : {clientdata?.weight}</h5>
                    </div>
                    <div className="nutri__card__follow" style={{ gap: '10px' }}>
                        <div className="nutritionist__follow" style={{ margin: 10 }}>
                            <h5>Client</h5>
                        </div>
                        <div className="nutritionist__follow__gmail" style={{ margin: 10 }}>
                            <h5>{clientdata?.email}</h5>
                        </div>
                    </div>
                    <Diet text="Give/Edit Diet Plan" color="black" border="3px solid #B6D1FC" uid={uid?uid:""} nuid={user?.currentUser.uid}/>
                </div>
            </Popover>
        </div>
    );
}

export default NutriClientCard;