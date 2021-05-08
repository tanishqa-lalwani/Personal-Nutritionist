import React from 'react'
import './Blogitem copy.css'
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
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useAuth } from '../../AuthContext'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    border: '2px solid #F9CED8',
  },
  icon: {

    '&:after': {
      fill: 'yellow',
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Blogitem({ title, id,description, nutriName, nutriOccupation, tags, img, date }) {
  // const user = useAuth()
  // const classes = useStyles();
  const [saved, setSaved] = React.useState(false)
  return (
    <Link className='links__page' to={`/${id}/fullBlog`} style={{ textDecoration: 'none', color: '#321E59' }}>

      <div className="blogs__card" style={{position:'relative'}}>
        <div className="blog__info">
          <div className="content__blg">
            <h3>{title}</h3>
            <h4 className="date">{date?.substring(0,14)}</h4>
            <div style={{ display: 'flex', gap:'20px', alignItems: 'center', flexWrap: 1 }}>
              {
                tags?.map(tag => (
                  <div className="blog__tags" style={{ width: 'fit-content', padding: '0 10px', borderRadius: '20px' }}>
                    {tag}
                  </div>
                ))
              }
            </div>
            <p>{description}</p>
          </div>

          <img className="blog__image" src={img} />
        </div>
        <div className="blogs__author" style={{position:'absolute',bottom:0, width:'96%'}}>
          <div className="author__info">
            <Avatar className="avatar" src={yellow} alt="N" />
          </div>
          <div className="author__name">
            <h4 style={{ fontWeight: '500' }}>{nutriName}</h4>
            <h5>{nutriOccupation}</h5>
          </div>

          <div className="save_icon" style={{ cursor: 'pointer' }} onClick={() => setSaved(!saved)}>
            {saved ? (
              <BookmarkIcon className="icon__style" fontSize="large" />
            )
              :
              (<BookmarkBorderIcon className="icon__style" fontSize="large" />)
            }

          </div>
        </div>
      </div>
    </Link>

  )
}

export default Blogitem
