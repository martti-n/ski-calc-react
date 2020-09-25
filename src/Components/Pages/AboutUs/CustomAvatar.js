import React from "react";
import { Avatar } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';


const CustomAvatar = (props) => {
  const colors = ["#f44336", "#4791db", "#4caf50", "#ff9800", "purple", "#e33371", "#115293"];
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  const MyAvatar = styled(Avatar)({
    backgroundColor: colors[getRandomInt(6)],
  });
  
  const getFirstLetter = () => {
    let str = props.name.toString();
    return str.charAt(0);
  };

  return <div>
    <MyAvatar>
      {getFirstLetter()}
    </MyAvatar>
  </div>;
};

export default CustomAvatar;
