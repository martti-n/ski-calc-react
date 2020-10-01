import React from "react";
import { Card, Typography, CardContent, CardMedia, Divider } from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ScheduleIcon from "@material-ui/icons/Schedule";

const TextRow = styled(Typography) ({
  margin: '6px 0'
})

const useStyles = makeStyles(() => ({
  card: {
    padding: "30px 50px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  media: {
    backgroundSize: '75px',
    height: '100px'
  },
  icon: {
    marginLeft: '7px',
    marginBottom: '5px'
  }
}));

const TodaysWeatherModal = (props) => {
  const classes = useStyles();
  const weatherData = props.weather.data.instant.details;

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={process.env.PUBLIC_URL + `/yrnoIcons/${props.weather.data.next_1_hours.summary.symbol_code}.png`}/>
      <CardContent>
        <TextRow variant="h5">
          {props.weather.localTime}:00
          <ScheduleIcon className={classes.icon}/>
        </TextRow>
        <Divider />
        <TextRow variant="h4">{weatherData.air_temperature}&#x2103;</TextRow>
        <TextRow>
        {props.weather.data.next_1_hours.details.precipitation_amount} mm
        </TextRow>
        <TextRow variant="body2">
          {weatherData.wind_speed} m/s
        <ArrowRightAltIcon style={{ transform: `rotate(${weatherData.wind_from_direction + 90}deg)` }} />
        </TextRow>
        <TextRow variant="body2">Humidity: {weatherData.relative_humidity}%</TextRow>
      </CardContent>
    </Card>
  );
};

export default TodaysWeatherModal;
