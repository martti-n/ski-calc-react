import React from "react";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AcUnit from "@material-ui/icons/AcUnit";
import Home from "./Components/Pages/Home";
import Statistics from "./Components/Pages/Statistics";
import SkiCalc from "./Components/SkiCalc/SkiCalc";
import EqualizerIcon from "@material-ui/icons/Equalizer";

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: "inherit" },
  pageLayout: {
    paddingTop: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: "flex" }}>
          <Drawer
            style={{ width: "240px" }}
            variant="persistent"
            anchor="left"
            open={true}
            classes={{ paper: classes.drawerPaper }}
          >
            <List>
              <Link to="/" exact>
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItem>
              </Link>
              <Link to="/statistics">
                <ListItem button>
                  <ListItemIcon>
                    <EqualizerIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Statistics"} />
                </ListItem>
              </Link>
              <Link to="/skicalc">
                <ListItem button>
                  <ListItemIcon>
                    <AcUnit />
                  </ListItemIcon>
                  <ListItemText primary={"SkiCalc"} />
                </ListItem>
              </Link>
            </List>
          </Drawer>
          <Switch>
            <Route exact path="/">
              <div className={classes.pageLayout}>
                <Home />
              </div>
            </Route>
            <Route path="/statistics">
              <div className={classes.pageLayout}>
                <Statistics />
              </div>
            </Route>
            <Route path="/skicalc">
              <div className={classes.pageLayout}>
                <SkiCalc />
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
