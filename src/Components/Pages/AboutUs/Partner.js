import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 345,
        textAlign: 'center'
    },
    media: {
        height: 100,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

function Partner(props) {
    const classes = useStyles();

    return (
        <Grid item xs={3}>
            <Card className={classes.root}>
                <CardMedia className={classes.media} style={{ backgroundColor: props.color }}>
                <Typography variant="h5">{props.partner.name}</Typography>
                </CardMedia>
                <CardContent>
                    <Typography variant="h5">{props.partner.name}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { props.partner.city }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { props.partner.country }
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Partner;