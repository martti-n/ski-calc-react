import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, Tooltip, Modal } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  media: {
    height: 140,
  },
  card: {
    cursor: "pointer",
    transition: "all 0.3s",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none !important",
  },
  noOutline: {
    outline: "none !important"
  }
}));

const NasaSearchItem = (props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const body = <img src={props.result.links[0].href} alt="broken" className={classes.noOutline}/>;

  return (
    <div>
      <Card className={classes.card} onClick={() => setOpen(true)}>
        <Tooltip placement="top-start" title={props.result.data[0].description}>
          <CardMedia className={classes.media} image={props.result.links[0].href} />
        </Tooltip>
      </Card>
      {open ? (
        <Modal
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}
        >
          {body}
        </Modal>
      ) : null}
    </div>
  );
};

export default NasaSearchItem;
