import React from "react";
import { ThemeProvider, makeStyles, styled } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AcUnit from "@material-ui/icons/AcUnit";
import Employees from "./Components/Pages/AboutUs/Employees";
import Weather from "./Components/Pages/Weather";
import SkiCalc from "./Components/SkiCalc/SkiCalc";
import TopNav from "./Components/Navigation/TopNav";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import theme from "./theme";
import Home from "./Components/Pages/Home";
import PublicIcon from "@material-ui/icons/Public";
import NasaSearch from "./Components/Pages/NasaSearch/NasaSearch";
import CloudIcon from '@material-ui/icons/Cloud';
import PeopleIcon from '@material-ui/icons/People';

const MyList = styled(List)({
  width: "100%",
});

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: "inherit",
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    paddingTop: "15px",
    paddingBottom: "15px",
  },
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
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isMobile ? (
          <>
            <TopNav />
          </>
        ) : (
          <Drawer
            style={{ width: "240px" }}
            variant="persistent"
            anchor="left"
            open={true}
            classes={{ paper: classes.drawerPaper }}
          >
            <MyList>
              <Link to="/" exact>
                <div className={classes.listItem}>
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItem>
                </div>
              </Link>
              <Link to="/about">
                <div className={classes.listItem}>
                  <ListItem button>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"About us"} />
                  </ListItem>
                </div>
              </Link>
              <Link to="/weather">
                <div className={classes.listItem}>
                  <ListItem button>
                    <ListItemIcon>
                      <CloudIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Weather"} />
                  </ListItem>
                </div>
              </Link>
              <Link to="/skicalc">
                <div className={classes.listItem}>
                  <ListItem button>
                    <ListItemIcon>
                      <AcUnit />
                    </ListItemIcon>
                    <ListItemText primary={"SkiCalc"} />
                  </ListItem>
                </div>
              </Link>
              <Link to="/nasa-search">
                <div className={classes.listItem}>
                  <ListItem button>
                    <ListItemIcon>
                      <PublicIcon />
                    </ListItemIcon>
                    <ListItemText primary={"NASA images"} />
                  </ListItem>
                </div>
              </Link>
            </MyList>
          </Drawer>
        )}
        <div style={{ display: "flex", paddingLeft: isMobile ? '0px' : '250px' }}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/about">
              <Employees />
            </Route>
            <Route path="/weather">
              <Weather />
            </Route>
            <Route path="/skicalc">
              <div className={classes.pageLayout}>
                <SkiCalc />
              </div>
            </Route>
            <Route path="/nasa-search">
              <div className={classes.pageLayout}>
                <NasaSearch />
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
