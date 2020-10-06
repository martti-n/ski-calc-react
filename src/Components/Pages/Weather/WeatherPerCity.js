import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import TodaysWeatherModal from "./TodaysWeatherModal";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useMutation } from "@apollo/client";
import queries from "../../graphql/queries";

const useStyles = makeStyles(() => ({
  card: {
    cursor: "pointer",
    textAlign: "center",
  },
  media: {
    height: "140px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 40px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    outline: "none !important",
  },
  deleteIcon: {
    float: "left",
    marginBottom: "10px",
    color: "#e2e2e2",
    height: "30px",
    width: "30px",
    '&:hover': {
      color:'#ccc'
    }
  },
}));

function getCurrentDate(date) {
  let month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function WeatherPerCity(props) {
  const [showingIcon, showIcon] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialog, setDialogOpen] = useState(false);
  const [removeCity, { error }] = useMutation(queries.removeCity, {
    variables: { id: props.weather.id },
  });

  function deleteCity() {
    removeCity();
    setDialogOpen(false);
  }

  const classes = useStyles();
  let todaysWeather = [];

  function sortWeather() {
    props.weather.timeseries.forEach((timestamp) => {
      // converting the date on weather data to users local timezone
      const convertedDate = new Date(timestamp.time);

      // checking if incoming data starts from current time, we care of past weather
      if (convertedDate.getHours() >= new Date().getHours()) {
        // checking if the timestamp is for today
        if (timestamp.time.includes(getCurrentDate(new Date()))) {
          // checking if timestamp converted to users local timezone fits today(users local)
          if (convertedDate.getDate() === new Date().getDate()) {
            // setting a new property to timestamp with hours of that date
            timestamp.localTime = convertedDate.getHours();

            // pushing the date that meets the requirements to array which will be served to children
            // small hack to reduse array size...lets think of a better solution
            if (todaysWeather.length < 14) {
              todaysWeather.push(timestamp);
            }
          }
        }
      }
    });
  }
  sortWeather();

  // setting the current weather from the sorted data
  const currentWeather = todaysWeather[0].data.instant.details;

  const content = todaysWeather.map((weather, key) => (
    <Grid item key={key}>
      <TodaysWeatherModal weather={weather} />
    </Grid>
  ));

  return (
    <div>
      <Card className={classes.card} onMouseEnter={() => showIcon(true)} onMouseLeave={() => showIcon(false)}>
        <CardMedia image={props.weather.city_image} className={classes.media} onClick={() => setOpen(true)} />
        <CardContent>
          <Typography variant="h5">{props.weather.city}</Typography>
          <Typography variant="h4">{currentWeather.air_temperature}&#x2103;</Typography>
          <Typography variant="body2">
            Wind: {currentWeather.wind_speed} m/s
            <ArrowRightAltIcon style={{ transform: `rotate(${currentWeather.wind_from_direction + 90}deg)` }} />
          </Typography>
          <Typography variant="body2">Humidity: {currentWeather.relative_humidity}%</Typography>
          <div style={{ height: "25px" }}>
            {showingIcon ? (
              <DeleteForeverIcon className={classes.deleteIcon} onClick={() => setDialogOpen(true)} />
            ) : null}
          </div>
        </CardContent>
      </Card>
      {open ? (
        <Modal className={classes.modal} open={open} onClose={() => setOpen(false)}>
          <Grid container className={classes.container} spacing={2}>
            {content}
          </Grid>
        </Modal>
      ) : null}
      {openDialog ? (
        <Dialog open={openDialog} onClose={() => setDialogOpen(false)}>
          <DialogTitle>{`Delete ${props.weather.city}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This city will be permanently removed. You can add new cities from the dashboard.
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button autoFocus onClick={() => deleteCity()}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
}

export default WeatherPerCity;
