import React from 'react'
import './Nutritionist.css'
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile'
import Card from '../Friends/Card'

const Nutritionist = () => {
    return (
      <div className="Nutritionist Nutritionist_mob">
        {window.screen.width > 500 ? (
          <DashDrawer />
        ) : (
          <DashDrawerMobile loc="Daily Goals" img="Goals" />
        )}
        <div className="Nutritionist_body Nutritionist_body_mob">
          <p className="Nutritionist__username Nutritionist__username_mob">
            {" "}
            {"Hii Username!!"}{" "}
          </p>
          <p className="yourNutritionist yourNutritionist_mob">Your subscribed Nutritionist</p>
          <div className="Nutritionist_card Nutritionist_card_mob">
            <Card />
            <Card />
          </div>
        </div>
      </div>
    );
}
        
export default Nutritionist