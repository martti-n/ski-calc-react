import React, { useEffect } from 'react';
import WeatherPerCity from './WeatherPerCity';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import { cityData } from '../../dummyData/dummyData'

function getTodaysDate() {
  let date = new Date()
  let day = date.getDate();
  let month = date.toLocaleString('en-us', { month: 'long' });
  let year = date.getFullYear();
  return `${day}. ${month} ${year}`;
}

function Weather() {
  const [weather, setWeather] = React.useState({ data: null, loading: false });
  const { cities } = cityData();
  let content = null;

  useEffect(() => {
    setWeather({ data: null, loading: true })
    let allWeather = [];

    cities.forEach((city) => {
      axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${city.lat}&lon=${city.lon}`)
        .then((response) => {
          const { data: { properties: { timeseries } } } = response;
          let weather = timeseries[0].data.instant.details;
          weather.city = city.name;
          weather.city_image = city.city_image;
          allWeather.push(weather);
          setWeather({ data: allWeather, loading: false })
        })
        .catch(() => {
          setWeather({ data: null, loading: false })
        })
    })
  }, [])

  if (weather.data) {
    content = weather.data.map((weatherPerCity, key) => (
      <Grid item xs={4} key={key}>
        <WeatherPerCity weather={weatherPerCity} />
      </Grid>
    ))
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          {getTodaysDate()}
        </Typography>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          {new Date().toLocaleTimeString('en-GB', {
            hour: "numeric",
            minute: "numeric"
          })}
        </Typography>
      </Grid>
      {content}
    </Grid>
  );
}

export default Weather;