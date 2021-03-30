import React from 'react'
import './Friends.css'
import DashDrawer from '../../../Components/Dash Drawer/DashDrawer'
import DashDrawerMobile from '../../../Components/Dash Drawer/DashDrawerMobile'
import Card from './Card'

const Friends = () => {
    return (
      <div className="Friends Friends_mob">
        {window.screen.width > 500 ? (
          <DashDrawer />
        ) : (
          <DashDrawerMobile loc="Daily Goals" img="Goals" />
        )}
        <div className="Friends_body Friends_body_mob">
          <p className="friends__username friends__username_mob">
            {" "}
            {"Hii Username!!"}{" "}
          </p>
          <p className="friends__leaderboard__heading friends__leaderboard__heading_mob">
            LeaderBoard
          </p>
          <div className="leaderboard__card leaderboard__card_mob"></div>
          <p className="yourfriends yourfriends_mob">Your Friends</p>
          <div className="friends_card friedns_card_mob">
            <Card />
            <Card />
          </div>
        </div>
      </div>
    );
}
        
export default Friends