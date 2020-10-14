import React, { useEffect } from "react";
import WeatherPerCity from "./WeatherPerCity";
import { Grid, Typography, Modal, TextField, Button, CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useQuery, useMutation } from "@apollo/client";
import queries from "../../graphql/queries";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  icon: {
    cursor: "pointer",
    color: "#e2e2e2",
    height: "40px",
    width: "40px",
    "&:hover": {
      color: "#ccc",
    },
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  margin: {
    marginTop: "15px",
    marginBottom: "15px",
  },
  marginSmall: {
    marginTop: "8px",
    marginBottom: "8px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBody: {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: "20px",
    outline: "none !important",
  },
}));

function getTodaysDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.toLocaleString("en-us", { month: "long" });
  let year = date.getFullYear();
  return `${day}. ${month} ${year}`;
}

function Weather() {
  const classes = useStyles();

  // setting the form data for new city
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const [weather, setWeather] = React.useState({ data: null, loading: false });

  // using graphql queries
  const [createCity] = useMutation(queries.addCity, {
    variables: { name, image, latitude, longitude },
    refetchQueries: [{ query: queries.getCities }],
  });

  const { data, loading } = useQuery(queries.getCities);

  let content = null;

  useEffect(() => {
    setWeather({ data: null, loading: true });
    let currentWeatherForCities = [];
    if (data) {
      data.cities.forEach((city) => {
        axios
          .get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${city.latitude}&lon=${city.longitude}`)
          .then((response) => {
            const {
              data: { properties },
            } = response;
            let weather = properties;
            weather.id = city.id;
            weather.city = city.name;
            weather.city_image = city.image;
            currentWeatherForCities.push(weather);
            setWeather({ data: currentWeatherForCities, loading: false });
          })
          .catch(() => {
            setWeather({ data: null, loading: false });
          });
      });
    }
  }, [data]);

  function addCity() {

    // added temporary validation so empty cities couldn't be added
    // TODO: use Formik or similar tool for validating each input
    if (name === "" || image === "" || latitude === 0 || longitude === 0) {
      setOpen(false);
      return false;
    } else {
      setOpen(false);
      createCity();
    }
  }

  if (loading) {
    content = (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (weather.data) {
    content = weather.data.map((weatherPerCity, key) => (
      <Grid item xs={4} key={key}>
        <WeatherPerCity weather={weatherPerCity} />
      </Grid>
    ));
  }

  const body = (
    <div className={classes.modalBody}>
      <Typography variant="h4" className={classes.margin}>
        Add city
      </Typography>
      <TextField className={classes.marginSmall} label="Enter name" onChange={(e) => setName(e.target.value)} />
      <TextField className={classes.marginSmall} label="Enter image url" onChange={(e) => setImage(e.target.value)} />
      <TextField className={classes.marginSmall} label="Enter latitude" onChange={(e) => setLatitude(e.target.value)} />
      <TextField
        className={classes.marginSmall}
        label="Enter longitude"
        onChange={(e) => setLongitude(e.target.value)}
      />
      <Button style={{ marginTop: "15px" }} onClick={() => addCity()}>
        Submit
      </Button>
    </div>
  );

  return (
    <Grid container spacing={3} className={classes.center}>
      <Grid item xs={12}>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          {getTodaysDate()}
        </Typography>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          {new Date().toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric",
          })}
        </Typography>
      </Grid>
      {content}
      <Grid item xs={12} className={classes.center}>
        {loading ? null : <AddCircleIcon className={classes.icon} onClick={() => setOpen(true)} />}
      </Grid>
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
    </Grid>
  );
}

export default Weather;
