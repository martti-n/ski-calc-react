import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid } from "@material-ui/core";
import { useAxiosGet } from "../../httpRequests/getEmployees";
import Employee from "./Employee";
import PersonOfTheDay from "./PersonOfTheDay";
import Partners from "./Partners";
import { getRandomInt } from '../../functions/randomIntreger';
import config from '../../../config';

const useStyles = makeStyles(() => ({
  pageLayout: {
    width: "100%",
  },
  center: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Employees() {
  const classes = useStyles();
  let content = null;
  let personOfToday = null;
  
  const employees = useAxiosGet(`${config.DummyApiUrl}/employees`);
  if (employees.data) {
    personOfToday = employees.data[getRandomInt(employees.data.length)];
  }

  if (employees.loading) {
    content = (
      <div className={classes.center}>
        <CircularProgress />
      </div>
    );
  }

  if (employees.data) {
    content = employees.data.map((employee, key) => (
      <div key={key}>
        <Employee employee={employee}/>
      </div>
    ));
  }

  return (
    <div className={classes.pageLayout}>
      <Grid container>
        <Grid container>
          <Grid item xs={8}>
            <Grid item xs={12}>
              {employees.data ? (
                <PersonOfTheDay person={personOfToday} />
              ) : (
                  <div className={classes.center}>
                    <CircularProgress />
                  </div>
                )}
            </Grid>
            <Grid item xs={12}>
              <Partners />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <div className="max-h-screen overflow-y-scroll p-4">{content}</div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Employees;
