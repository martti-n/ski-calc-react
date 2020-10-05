import React from 'react';
import { CircularProgress, Grid, Typography, Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Partner from './Partner';
import { getRandomInt } from '../../functions/randomIntreger';
import { useAxiosGet } from "../../httpRequests/getProjects";
import config from '../../../config';
import { useMutation, useQuery, gql } from '@apollo/client';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(() => ({
  center: {
    height: '100%',
    width: '100%',
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  margin: {
    marginTop: '15px',
    marginBottom: '15px'
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBody: {
    padding: '20px',
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    backgroundColor: '#fff',
    height: '400px',
    width: '300px',
    outline: "none !important",
  }
}))

const ADD_PARTNER = gql`
  mutation createPartner($name: String!, $city: String, $country: String) {
    insert_partners(objects: {name: $name, city: $city, country: $country}) {
      affected_rows
      returning {
        id
        name
        city
        country
      }
    }
  }
`

const PARTNERS = gql`
  query getPartners {
    partners {
      id
      name
      city
      country
    }
  }
`;

const Partners = () => {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState('');
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');

  const [createPartner, { error }] = useMutation(ADD_PARTNER, {
    variables: { name, city, country }, refetchQueries: ['partners']
  })

  function addPartner() {
    createPartner();
    setOpen(false);
  }

  if (error) {
    console.log(error)
  }

  let content = null;
  const { loading, data } = useQuery(PARTNERS)
  const classes = useStyles();

  const colors = useAxiosGet(`${config.MockApiUrl}/colors`)
  function getRandomColor() {
    return colors.data ? colors.data[getRandomInt(colors.data.length)].color : null;
  }

  if (loading) {
    content = (
      <div className={classes.center}>
        <CircularProgress />
      </div>
    )
  }

  const body = (
    <div className={classes.modalBody}>
      <Typography variant="h4">
        Add partner
      </Typography>
      <TextField label="Enter name" onChange={(e) => setName(e.target.value)} />
      <TextField label="Enter city" onChange={(e) => setCity(e.target.value)} />
      <TextField label="Enter country" onChange={(e) => setCountry(e.target.value)} />
      <Button onClick={() => addPartner()}>
        Submit
      </Button>
    </div>
  )

  if (data) {
    content = data.partners.map((partner, key) => (
      <Partner key={key} partner={partner} color={getRandomColor()} />
    ))
  }

  return (
    <div>
      <Typography variant="h4" className={`${classes.center} ${classes.margin}`}>
        Our partners
        <AddCircleIcon onClick={() => setOpen(true)} />
      </Typography>
      <Grid container spacing={3} style={{ maxWidth: '97%', margin: '0' }}>
        {content}
      </Grid>
      {open ? (
        <Modal
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      ) : null}
    </div>
  );
}

export default Partners;