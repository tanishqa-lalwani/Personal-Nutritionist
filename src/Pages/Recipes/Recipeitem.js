import React,{useEffect, useState} from 'react'
import './Recipeitem.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    cards: {
        border:'2px solid #9CBEFF',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      
    },
  }));

function Recipeitem({foodname,foodimg,foodcal,foodfat,foodcarbs,foodprotein,foodrecipe}) {
     const classes = useStyles();
     const [open, setOpen] = React.useState(false);
     const handleOpen = () => {setOpen(true);};
     const handleClose = () => {setOpen(false);};
    return (
          <Card className={classes.cards} >
              <CardActionArea>
                  <CardMedia
                      component="img"
                      alt={foodname}
                      height="230"
                      image={foodimg}
                      title={foodname}
                  />
                  <CardContent>
                  <Typography gutterBottom variant="body2" component="h2">
                    {foodname}
                  </Typography>
                  </CardContent>
              </CardActionArea>
              <CardActions>
                  <div className="stats">
                      <div className="statitem">
                              <div className="statvalue">
                                {Math.round(foodcal)}
                              </div>
                              <p>CALORIES</p>
                          </div> 

                <div className="statitem">
                <Button variant="contained" color="primary" id="View_btn" onClick={handleOpen} >
                  View Recipe
                </Button>
                </div>
                
              <div className="Recipe_Modal">
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                  style={{
                    backdropFilter: 'saturate(180%) blur(10px)',
                }}
                >
                  <Fade in={open}>
                  <div className="Recipe_info" > 
                    <div className="close_btn">
                        <CloseIcon onClick={handleClose} style={{ background: 'rgba(0,150,255)', padding: '8px', borderRadius: '50%', color: 'white' }} />
                    </div> 

                      <div className="Nutrients_Info">
                        <h2>Nutrients: </h2>
                        <div className="Nutrients_box">

                            <div className="Nutrients_stats">
                              <p>Calories</p>  
                              <div className="Nutrients_values">
                                {Math.round(foodcal)} kcal
                              </div>
                            </div>

                            <div className="Nutrients_stats">
                              <p>Protein</p>  
                              <div className="Nutrients_values">
                                {foodprotein} gm
                              </div>
                            </div>

                            <div className="Nutrients_stats">
                              <p>Carbs</p>  
                              <div className="Nutrients_values">
                                {foodcarbs} gm
                              </div>
                            </div>

                            <div className="Nutrients_stats">
                              <p>Fat</p>  
                              <div className="Nutrients_values">
                                {foodfat} gm
                              </div>
                            </div>

                        </div>
                      </div>

                      <div className="Recipe_Instructions">  
                        <h2>Instructions: </h2>
                        <div className="Instruction">
                        <ol>
                        {foodrecipe.map((steps) =>  
                            <li key={steps.number}>{steps.step}</li>)}
                        </ol>
                        </div>
                      </div>
                    </div>
                  </Fade>
                </Modal>
               </div>
              </div>
            </CardActions>
          </Card>
       )
}

export default Recipeitem;
