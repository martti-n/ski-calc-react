import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid } from "@material-ui/core";
import { useAxiosGet } from "../../httpRequests/HttpRequests";
import Employee from "./Employee";
import PersonOfTheDay from "./PersonOfTheDay";
import WorkWeHaveDone from "./WorkWeHaveDone";

function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const useStyles = makeStyles(() => ({
  pageLayout: {
    width: "100%",
    paddingLeft: "250px",
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
  const url = "http://dummy.restapiexample.com/api/v1/employees";

  let personOfToday = null;

  const employees = useAxiosGet(url);
  if (employees.data) {
    personOfToday = employees.data[getRandomIndex(employees.data.length)];
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
        <Employee employee={employee} />
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
              <WorkWeHaveDone />
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
