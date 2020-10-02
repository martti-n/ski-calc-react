import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardContent, CardMedia, Modal, Grid } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import TodaysWeatherModal from "./TodaysWeatherModal";

const useStyles = makeStyles(() => ({
  card: {
    cursor: 'pointer',
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
  const [open, setOpen] = useState(false);
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
      <Card className={classes.card} onClick={() => setOpen(true)}>
        <CardMedia image={props.weather.city_image} className={classes.media} />
        <CardContent>
          <Typography variant="h5">{props.weather.city}</Typography>
          <Typography variant="h4">{currentWeather.air_temperature}&#x2103;</Typography>
          <Typography variant="body2">
            Wind: {currentWeather.wind_speed} m/s
            <ArrowRightAltIcon style={{ transform: `rotate(${currentWeather.wind_from_direction + 90}deg)` }} />
          </Typography>
          <Typography variant="body2">Humidity: {currentWeather.relative_humidity}%</Typography>
        </CardContent>
      </Card>
      {open ? (
        <Modal
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Grid container className={classes.container} spacing={2}>
            {content}
          </Grid>
        </Modal>
      ) : null}
    </div>
  );
}

export default WeatherPerCity;
