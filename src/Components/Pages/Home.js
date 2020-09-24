import React from "react";
import { Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();

  const locationNameWithoutSlash = () => {
    return location.pathname.substring(1);
  };

  return (
    <div>
      <Typography variant="h3">This is the {locationNameWithoutSlash()} page!</Typography>
      <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, exercitationem!</Typography>
    </div>
  );
}

export default Home;
