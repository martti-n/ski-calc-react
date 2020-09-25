import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, AppBar, Toolbar, Button } from '@material-ui/core'; 
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TopNav = (props) => {
  const { history } = props;
  const classes = useStyles();

  const handleMenuClick = (newRoute) => {
    history.push(newRoute);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            SkiCalc
          </Typography>

          <div>
            <Button onClick={() => handleMenuClick('/')} variant="primary">Home</Button>
            <Button onClick={() => handleMenuClick('/about')} variant="primary">About us</Button>
            <Button onClick={() => handleMenuClick('/statistics')} variant="primary">Statistics</Button>
            <Button onClick={() => handleMenuClick('/skicalc')} variant="primary">App</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(TopNav);
