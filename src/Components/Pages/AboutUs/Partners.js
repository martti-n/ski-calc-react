import React from 'react';
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Partner from './Partner';
import { getRandomInt } from '../../functions/randomIntreger';
import { useAxiosGet } from "../../httpRequests/getProjects";
import config from '../../../config';

const useStyles = makeStyles(() => ({
  center: {
    height: '100%',
    width: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  margin: {
    marginTop: '15px',
    marginBottom: '15px'
  }
}))

const Partners = () => {
  let content = null;
  const projects = useAxiosGet(`${config.MockApiUrl}/projects`)
  const classes = useStyles();

  const colors = useAxiosGet(`${config.MockApiUrl}/colors`)
  function getRandomColor() {
    return colors.data ? colors.data[getRandomInt(colors.data.length)].color : null;
  }

  if (projects.loading) {
    content = (
      <div className={classes.center}>
        <CircularProgress />
      </div>
    );
  }

  if (projects.data) {
    content = projects.data.map((project) => (
      <Partner project={project} color={getRandomColor()} />
    ))
  }

  return (
    <div>
      <Typography variant="h4" className={`${classes.center} ${classes.margin}`}>
        Our partners
      </Typography>
      <Grid container spacing={3} style={{ maxWidth: '97%', margin: '0' }}>
        {content}
      </Grid>
    </div>
  );
}

export default Partners;