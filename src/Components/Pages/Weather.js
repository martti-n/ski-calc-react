import React from 'react';
import { Typography, Button, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';

function Weather() {
  const [tartuWeather, setTartuWeather] = React.useState({ data: null, loading: false });
  const [selectedCity, setCity] = React.useState({ name: '', lat: '', lon: '' })
  //https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.10&lon=9.58

  const cities = [
    {
      id: 1,
      name: 'Tartu',
      lat: '58.37',
      lon: '26.72'
    },
    {
      id: 2,
      name: 'Tallinn',
      lat: '59.43',
      lon: '24.75'
    },
    {
      id: 3,
      name: 'New York',
      lat: '40.73',
      lon: '-73.93'
    }
  ]

  function getTheWeather() {
    setTartuWeather({ data: null, loading: true })
 
    axios.get("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=58.37&lon=26.72")
    .then((response) => {
      const { data: { properties: { timeseries } } } = response;
      const tartuWeatherNow = timeseries[0].data.instant.details;
      setTartuWeather({ data: tartuWeatherNow, loading: false })
    })
    .catch((e) => {
      console.log(e)
    })
  }

  return ( 
    <div>
      <Typography variant="h3">This is the weather!</Typography>
      <Select value={selectedCity.name} onChange={(e) => setCity(e.target.value)}>
      { cities.map((city) => (
        <MenuItem key={city.id} value={city}>
          { city.name }
        </MenuItem>
      ))}
      </Select>
      <Button onClick={() => getTheWeather()}>
        get weather
      </Button>
    </div>
   );
}
 
export default Weather;