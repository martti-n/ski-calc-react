import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardContent, CardMedia, Modal } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const useStyles = makeStyles(() => ({
  card: {
    textAlign: "center",
  },
  media: {
    height: "140px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none !important",
  },
}));

function getCurrentDate() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function WeatherPerCity(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const currentWeather = props.weather.timeseries[0].data.instant.details;

  let todaysWeather = [];
  function sortWeather() {
    props.weather.timeseries.forEach((timestamp) => {
      if (timestamp.time.includes(getCurrentDate())) {
        todaysWeather.push(timestamp);
      }
    });
  }

  const body = (
    <div>
      <Typography variant="body2">some text</Typography>
    </div>
  );

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
          {body}
        </Modal>
      ) : null}
    </div>
  );
}

export default WeatherPerCity;
