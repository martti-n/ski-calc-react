import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardContent, CardMedia, Modal, Grid, CardActions, Button } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import WeatherComponent from "./WeatherComponent";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useMutation } from "@apollo/client";
import queries from "../../graphql/queries";
import DeleteAlert from "./DeleteAlert";

const useStyles = makeStyles(() => ({
  card: {
    textAlign: "center",
  },
  media: {
    height: "140px",
  },
  modal: {
    display: "flex",
    padding: "40px 40px",
    overflowY: 'scroll'
  },
  container: {
    display: "flex",
    justifyContent: "center",
    outline: "none !important",
  },
  deleteIcon: {
    cursor: "pointer",
    float: "left",
    marginBottom: "10px",
    color: "#e2e2e2",
    height: "30px",
    width: "30px",
    "&:hover": {
      color: "#ccc",
    },
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
  const [modalType, setModalType] = useState('');
  const [removeCity, { error }] = useMutation(queries.removeCity, {
    variables: { id: props.weather.id },
    refetchQueries: [{ query: queries.getCities }],
  });
  const classes = useStyles();
  let todaysWeather = [];
  let tomorrowsWeather = [];
  let content = null;

  // converting the date on weather data to users local timezone
  // checking if incoming data starts from current time, we don't care of past weather
  // checking if the timestamp is for today
  // checking if timestamp converted to users local timezone fits today(users local)
  // setting a new property to timestamp with hours of that date
  // pushing the date that meets the requirements to array which will be served to children

  function sortWeather() {

    props.weather.timeseries.forEach((timestamp) => {
      const convertedDate = new Date(timestamp.time);
      if (convertedDate.getHours() >= new Date().getHours()) {
        if (timestamp.time.includes(getCurrentDate(new Date()))) {
          if (convertedDate.getDate() === new Date().getDate()) {
            timestamp.localTime = convertedDate.getHours();
            if (todaysWeather.length < 14) {
              todaysWeather.push(timestamp);
            }
          }
        }
      }
      if (convertedDate.getDate() === new Date().getDate() + 1) {
        timestamp.localTime = convertedDate.getHours();
        tomorrowsWeather.push(timestamp);
      }
    });
  }

  sortWeather();

  const currentWeather = todaysWeather[0].data.instant.details;

  function alignmentProperties() {
    return modalType === 'today' ? 'center' : '';
  }
  function deleteCity() {
    removeCity();
    setDialogOpen(false);
  }

  // setting the current weather from the sorted data
  if (modalType === 'today') {
    content = todaysWeather.map((weather, key) => (
      <Grid item key={key}>
        <WeatherComponent weather={weather} />
      </Grid>
    ));
  }
  if (modalType === 'tomorrow') {
    content = tomorrowsWeather.map((weather, key) => (
      <Grid item key={key}>
        <WeatherComponent weather={weather} />
      </Grid>
    ));
  }

  return (
    <div>
      <Card className={classes.card} onMouseEnter={() => showIcon(true)} onMouseLeave={() => showIcon(false)}>
        <CardMedia image={props.weather.city_image} className={classes.media} />
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
        <CardActions>
          <Button onClick={() => {
            setModalType('today');
            setOpen(true);
          }}>
            Today
        </Button>
          <Button onClick={() => {
            setModalType('tomorrow');
            setOpen(true);
          }}>
            Tomorrow
        </Button>
        </CardActions>
      </Card>
      {open ? (
        <Modal
          className={classes.modal}
          style={{
            alignItems: alignmentProperties(),
            justifyContent: alignmentProperties()
          }}
          open={open}
          onClose={() => setOpen(false)}>
          <Grid container className={classes.container} spacing={2}>
            {content}
          </Grid>
        </Modal>
      ) : null}
      {openDialog ? (
        <DeleteAlert
          open={openDialog}
          cityName={props.weather.city}
          delete={() => deleteCity()}
          closeDialog={() => setDialogOpen(false)}
        />
      ) : null}
    </div>
  );
}

export default WeatherPerCity;
