import React,{useParams} from 'react';
import Popover from '@material-ui/core/Popover'
import { Avatar } from '@material-ui/core';
import yellow from '../../../Images/avatar_yellow.png'
import './NutriCard.css'
import { db } from '../../../firebase'

function NutriCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [nutridata, setNutriData] = React.useState([]);
  const [clientData, setClientData] = React.useState([]);

  
  React.useEffect(()=>{
    
    db.collection('Users').doc('Nutritionist').collection('staff').doc(props.uid.toString().substring(1))
    .onSnapshot(snap=>{
      console.log(snap.data(),props.uid);
      setNutriData(snap.data())})

  },[nutridata?.length])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const sendNutriFollowRequest = () => {
    
  }
  return (
    <div className = "nutritionist__card">
    <div 
    onClick = {handleClick}
    >
        <div className="author__info">
            <Avatar className="avatar" src={nutridata?.image} alt="N" />
        </div>
        <div className="author__name">
            <h4>{nutridata?.name}</h4>
            <h5>{nutridata?.occupation} </h5>
        </div>
        <div className = "nutritionist__follow"  >
            <h5>Follow</h5>
        </div>
    </div>
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
        <div className = "nutri__card__nutri">
        <div className="author__info__nutri">
            <Avatar className="avatar__second" style={{ height: '70px', width: '70px' }} src={nutridata?.image} alt="N"/>
        </div>
        <div className="author__name__nutri">
            <h4 className = "nutri__card__nutritionist" >{nutridata?.name}</h4>
            <h5>{nutridata?.occupation} </h5>
        </div>
        <div className = "nutri__followers">
        {nutridata?.bio}
        </div>
        <div className= "nutri__card__follow">
        <div className = "nutritionist__follow" onClick = {sendNutriFollowRequest}>
            <h5>Following</h5>
        </div>
        <div className = "nutritionist__follow__gmail_2">
            <h5>{nutridata?.email}</h5>
        </div>

        </div>
        
        </div>
      </Popover>
    </div>
  );
            
       
}

export default NutriCard;