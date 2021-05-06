import React from 'react';
import Popover from '@material-ui/core/Popover'
import { Avatar, Button, Typography } from '@material-ui/core';
import yellow from '../../Images/avatar_yellow.png'
import './NutritionistCard.css'
function NutitionistCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className = "nutritionist__card">
    <div className = "blogs__follow__nutritionist" onClick = {handleClick}>
        <div className="author__info">
            <Avatar className="avatar" src={yellow} alt="N" />
        </div>
        <div className="author__name">
            <h4>Chloe ting</h4>
            <h5>Fitness trainer </h5>
        </div>
        <div className = "nutritionist__follow">
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
        <div className = "nutri__card">
        <div className="author__info__nutri">
            <Avatar className="avatar__second" style={{ height: '70px', width: '70px' }} src={yellow} alt="N"/>
        </div>
        <div className="author__name__nutri">
            <h4 className = "nutri__card__nutritionist" >Chloe ting</h4>
            <h5>Fitness trainer </h5>
        </div>
        <div className = "nutri__followers">
          <h4>12 </h4>
          <h5>Followers</h5>
        </div>
        <div className= "nutri__card__follow">
        <div className = "nutritionist__follow">
            <h5>Follow</h5>
        </div>
        <div className = "nutritionist__follow__gmail">
            <h5>chloeting@gmail.com</h5>
        </div>

        </div>
        
        </div>
      </Popover>
    </div>
  );
            
       
}

export default NutitionistCard;