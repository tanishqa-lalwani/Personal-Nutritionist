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
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';


const useStyles = makeStyles((theme) => ({
    cards: {
        border:'2px solid #9CBEFF',
        width:'100%',
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

function Recipeitem({foodname,foodimg,foodcal,foodfat,foodcarbs,foodprotein,foodservings,foodrecipe, recid}) {
     const classes = useStyles();
     const [openInst, setOpenInst] = React.useState(false);
     const handleOpenInst = () => {setOpenInst(true);};
     const handleCloseInst = () => {setOpenInst(false);};

     const [openBook, setOpenBook] = React.useState(false);
     const handleOpenBook = () => {setOpenBook(true);};
     const handleCloseBook = () => {setOpenBook(false);};

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
                  <CardContent style={{display:'flex', justifyContent: 'space-between'}}>
                  <Typography gutterBottom variant="body2" component="h2">
                    {foodname}
                  </Typography>
                  <BookmarkBorderIcon style={{marginLeft:'auto'}} onClick={handleOpenBook}/>
                  <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openBook}
                        onClose={handleCloseBook}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                        style={{
                          backdropFilter: 'saturate(180%) blur(10px)',
                      }}
                      >
                        <Fade in={openBook}>
                          <div className="bookmark_modal">
                            <h3 style={{padding:'30px'}}>Please sign up to bookmark recipes</h3>
                            <Button variant="outlined" style={{borderRadius: '10px', textTransform: 'capitalize', fontFamily: 'Poppins, sans-serif',fontWeight:'bold', border: '1px solid #321E59', color: '#321E59',width:'fit-content',alignSelf:'center'}}>
                              Sign Up
                            </Button>
                          </div>
                        </Fade>
                    </Modal>
                  </div>
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

                <Button variant="contained" color="primary" id="View_btn" onClick={handleOpenInst} >
                  View details
                </Button>
                
              <div className="Recipe_Modal">
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openInst}
                  onClose={handleCloseInst}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                  style={{
                    backdropFilter: 'saturate(180%) blur(10px)',
                }}
                >
                  <Fade in={openInst}>
                  <div className="Recipe_info" > 
                    <div className="close_btn">
                        <CloseIcon onClick={handleCloseInst} style={{ background: 'rgba(0,150,255)', padding: '8px', borderRadius: '50%', color: 'white' }} />
                    </div> 

                      <div className="Nutrients_Info">
                        <h2>Nutrients: </h2> 
                        <p> (Per {foodservings?foodservings:""} Servings)</p>
                        <div className="Nutrients_box">

                            <div className="Nutrients_stats">
                              <p>Calories</p>  
                              <div className="Nutrients_values">
                                {Math.round(foodcal)?Math.round(foodcal):""} kcal
                              </div>
                            </div>

                            <div className="Nutrients_stats">
                              <p>Protein</p>  
                              <div className="Nutrients_values">
                                {foodprotein?foodprotein:""} gm
                              </div>
                            </div>

                            <div className="Nutrients_stats">
                              <p>Carbs</p>  
                              <div className="Nutrients_values">
                                {foodcarbs?foodcarbs:""} gm
                              </div>
                            </div>

                            <div className="Nutrients_stats">
                              <p>Fat</p>  
                              <div className="Nutrients_values">
                                {foodfat?foodfat:""} gm
                              </div>
                            </div>

                        </div>
                      </div>
                      <div>
                        <h2>Recipe ID : {recid}</h2>
                      </div>
                      <div className="Recipe_Instructions">  
                        <h2 style={{paddingBottom:'12px'}}>Instructions: </h2>
                        <div className="Instruction">
                        <ol>
                        {foodrecipe?.map((steps) =>  
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
