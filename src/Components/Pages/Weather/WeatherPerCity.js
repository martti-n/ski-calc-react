import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, CardMedia } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    card: {
        textAlign: 'center'
    },
    media: {
        height: '140px'
    }
}))

function WeatherPerCity(props) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia image={props.weather.city_image} className={classes.media} />
            <CardContent>
                <Typography variant="h5">{props.weather.city}</Typography>
                <Typography variant="h4">{props.weather.air_temperature}&#x2103;</Typography>
                <Typography variant="body2">Wind: {props.weather.wind_speed} m/s</Typography>
                <Typography variant="body2">Humidity: {props.weather.relative_humidity}%</Typography>
            </CardContent>
        </Card>

    )
}

export default WeatherPerCity;