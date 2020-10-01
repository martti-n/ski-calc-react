import React from "react";
import { Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ScheduleIcon from "@material-ui/icons/Schedule";

const useStyles = makeStyles(() => ({
  card: {
    padding: "30px 50px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
}));

const TodaysWeatherModal = (props) => {
  const classes = useStyles();
  const weatherData = props.weather.data.instant.details;

  return (
    <Card className={classes.card}>
      <Typography variant="h5">
        <ScheduleIcon />
        {props.weather.localTime}
      </Typography>
      <Typography variant="h4">{weatherData.air_temperature}&#x2103;</Typography>
      <Typography variant="body2">
        {weatherData.wind_speed} m/s
        <ArrowRightAltIcon style={{ transform: `rotate(${weatherData.wind_from_direction + 90}deg)` }} />
      </Typography>
      <Typography variant="body2">Humidity: {weatherData.relative_humidity}%</Typography>
    </Card>
  );
};

export default TodaysWeatherModal;
