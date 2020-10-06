import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  text: {
    textAlign: "center",
  },
}));

const DeleteAlert = (props) => {
  const classes = useStyles();

  return (
    // some issue with adding padding to dialog, check that out

    <Dialog open={props.open} onClose={props.closeDialog}>
      <DialogTitle className={classes.text}>{`Delete ${props.cityName}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.text}>
          This city will be permanently removed. You can add new cities from the dashboard.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog}>Cancel</Button>
        <Button autoFocus onClick={props.delete}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAlert;
