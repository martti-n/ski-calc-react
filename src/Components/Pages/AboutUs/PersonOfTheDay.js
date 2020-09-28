import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Grid,
  IconButton,
  Badge,
  Tooltip
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  root: {
    marginTop: 15,
    maxWidth: "97%",
  },
  media: {
    height: 160,
    width: 160,
    margin: "0 auto",
  },
});

const WorkerOfTheWeek = (props) => {
  const [likesCount, setLikes] = React.useState(0);
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Card className={classes.root}>
          <CardHeader title="Person of the day" />
          <CardMedia className={classes.media} image="https://www.gopaintball.co.uk/assets/icons/Number-1.png" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.person.employee_name}
            </Typography>
          </CardContent>
          <CardActions>
            <Tooltip title="Like!" placement="left">
              <IconButton aria-label="Like!" onClick={() => setLikes(likesCount + 1)}>
                <Badge badgeContent={likesCount} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default WorkerOfTheWeek;
