import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import SkiCalc from '../SkiCalc/SkiCalc';
import Home from '../Pages/Home';
import Statistics from '../Pages/Statistics';

const useStyles = makeStyles((theme) => ({
  panel: {
    backgroundColor: '#bee3f8',
    height: '100vh',
  },
  bar: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabPanel(props) {
  
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      className={classes.panel}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.bar}>
      <AppBar position="static">
        <Tabs centered value={value} onChange={handleChange} aria-label="nav tabs example">
          <LinkTab label="Home" {...a11yProps(0)} />
          <LinkTab label="Statistics" {...a11yProps(1)} />
          <LinkTab label="SkiCalc" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Home />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Statistics />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SkiCalc />
      </TabPanel>
    </div>
  );
}
