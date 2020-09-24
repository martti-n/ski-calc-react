import React from 'react';
import { Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

function Statistics() {
  
const location = useLocation();

const locationNameWithoutSlash = () => {
  return location.pathname.substring(1); 
}

  return ( 
    <div>
      <Typography variant="h3">These are the {locationNameWithoutSlash()}!</Typography>
      <Typography variant="body1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, a!</Typography>
    </div>
   );
}
 
export default Statistics;