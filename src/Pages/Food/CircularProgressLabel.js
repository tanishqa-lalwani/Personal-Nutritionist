
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CircularProgressLabel({progress,value,unit}) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" size = {65} thickness = {4.5}  value = {progress} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div"   color="textSecondary">{`${Math.round(
            value,
          )} ${unit}`}
         
          </Typography>
        </Box>
      </Box>
    );
  }
  
  export default CircularProgressLabel;