import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel({color, size, thick, value ,text}) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" value={value} thickness={thick} size={size} style={{color:`${color}`}}/>
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
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <b>{text}</b>
                    {/* <p>left</p> */}
                </div>
            </Box>
        </Box>
    );
}

export default function CircularStatic({color, size, thick, value ,text}) {
    return <CircularProgressWithLabel value={value} color={color} size={size} thick={thick} text={text}/>;
}
