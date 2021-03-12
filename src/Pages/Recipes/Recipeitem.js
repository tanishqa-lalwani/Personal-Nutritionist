import React from 'react'
import './Recipeitem.css'
import img from './image 1.png'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    cards: {
        border:'2px solid #9CBEFF',
    },
  });

function Recipeitem({title,calories,image}) {
    const classes = useStyles();
    const kcalories=Math.round(calories);
    return (
    <>
        <Card className={classes.cards}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={title}
                    height="230"
                    image={image}
                    title={title}
                />
                <CardContent>
                <Typography gutterBottom variant="body2" component="h2">
                {title}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <div className="stats">
                    <div className="statitem">
                            <div className="statvalue">
                               {kcalories}
                            </div>
                            <p>CALORIES</p>
                        </div>
                    </div>
            </CardActions>
        </Card>
    </>
    )

}

export default Recipeitem;
