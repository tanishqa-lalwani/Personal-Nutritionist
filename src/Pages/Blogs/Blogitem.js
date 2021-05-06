import React from 'react'
import './Blogitem.css'
import img from './image 10.png'
import yellow from '../../Images/avatar_yellow.png'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useAuth } from '../../AuthContext'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    border: '2px solid #F9CED8',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.tra    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Blogitem({}) {

  return (
    <div className="blogs__card">
      <div className="blog__info">
        <div className="content">
          <h3>The 10 Vegetarian Recipes We Eat Week After Week</h3>
          <h4 className="date">30 March</h4>
          <p>So long, Plant-Powered January! It’s easy to keep the vegetarian party going when everything is so dang delicious. </p>
          <div className="blog__tags">
            Recipe
            </div>
        </div>

        <img className="blog__image" src={img} />
      </div>
      <div className="blogs__author">
        <div className="author__info">
          <Avatar className="avatar" src={yellow} alt="N" />
        </div>
        <div className="author__name">
          <h4>Chloe ting</h4>
          <h5>Fitness trainer </h5>
        </div>

        <div className="save_icon">
          <BookmarkBorderIcon fontSize="large" />

        </div>
      </div>
    </div>

  )
}

export default Blogitem
