import React from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, CardHeader, Typography, Modal } from "@material-ui/core";
import CustomAvatar from './CustomAvatar';

const EmployeeCard = styled(Card)({
  marginBottom: "10px",
  cursor: 'pointer',
  "&:hover": {
    backgroundColor: "#ececec",
  },
});
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none !important",
  },
}));

const Employee = (props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const body = (
    <EmployeeCard onClick={() => setOpen(true)} className={classes.root}>
      <CardMedia className={classes.media} image="https://i.imgur.com/0KD8K3s.jpg" title="Contemplative Reptile" />
      <CardContent>
        <Typography variant="h5">{props.employee.employee_name}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.employee.employee_name} is a {props.employee.employee_age} years old emplyee at our business.
        </Typography>
      </CardContent>
    </EmployeeCard>
  );

  return (
    <div>
      <EmployeeCard onClick={() => setOpen(true)}>
        <CardHeader
          avatar={<CustomAvatar name={props.employee.employee_name}/>}
          title={props.employee.employee_name}
          subheader={`${props.employee.employee_age} years of age, makes ${props.employee.employee_salary} $ a year.`}
        />
      </EmployeeCard>
      { open ? (
        <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      ) : (null) }
    </div>
  );
};

export default Employee;
