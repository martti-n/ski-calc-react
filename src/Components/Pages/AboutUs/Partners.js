import React from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Partner from "./Partner";
import { getRandomInt } from "../../functions/randomIntreger";
import { useAxiosGet } from "../../httpRequests/getProjects";
import config from "../../../config";
import { useQuery } from "@apollo/client";
import queries from '../../graphql/queries';

const useStyles = makeStyles(() => ({
  center: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  margin: {
    marginTop: "15px",
    marginBottom: "15px",
  }
}));

const Partners = () => {
  let content = null;
  const { loading, data } = useQuery(queries.getPartners);
  const classes = useStyles();

  const colors = useAxiosGet(`${config.MockApiUrl}/colors`);
  function getRandomColor() {
    return colors.data ? colors.data[getRandomInt(colors.data.length)].color : null;
  }

  if (loading) {
    content = (
      <div className={classes.center}>
        <CircularProgress />
      </div>
    );
  }

  if (data) {
    content = data.partners.map((partner, key) => <Partner key={key} partner={partner} color={getRandomColor()} />);
  }

  return (
    <div>
      <Typography variant="h4" className={`${classes.center} ${classes.margin}`}>
        Our partners
      </Typography>
      <Grid container spacing={3} style={{ maxWidth: "97%", margin: "0" }}>
        {content}
      </Grid>
    </div>
  );
};

export default Partners;
