import React from "react";
import TextField from "@material-ui/core/TextField";
import { styled, makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Card, CardActions, CardContent, Grid, CircularProgress } from "@material-ui/core";
import axios from "axios";
import NasaSearchItem from "./NasaSearchItem";
// https://images-api.nasa.gov/search?q={query}&media_type=image

const SearchButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  outline: 'none !important' 
});

const MyCard = styled(Card)({
  maxWidth: "610px",
  margin: "0 auto",
  padding: "20px",
});

const useStyles = makeStyles(() => ({
  center: {
    padding: "20px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function NasaSearch() {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState({ data: null, loading: false });
  const classes = useStyles();
  let content = null;

  function getResults() {
    if (search.length >= 3) {
      setResults({ data: null, loading: true });
      axios
        .get(`https://images-api.nasa.gov/search?q=${search}&media_type=image`)
        .then((response) => {
          const {
            data: {
              collection: { items },
            },
          } = response;
          setResults({ data: items, loading: false });
        })
        .catch((e) => {
          setResults({ data: null, loading: false });
        });
    }
    if (search.length < 3) {
      setResults({ data: null, loading: false });
    }
  }

  // TODO: condition for searches < 3 letters

  if (results.loading) {
    content = (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (results.data) {
    content = results.data.map((result, key) => (
      <Grid item xs={3} key={key}>
        <NasaSearchItem result={result} />
      </Grid>
    ));
  }

  return (
    <div>
      <MyCard>
        <CardContent>
          <Typography variant="h4">Search NASA database for images</Typography>
          <div className={classes.center}>
            <TextField label="Search" variant="outlined" onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
        <CardActions className={classes.center}>
          <SearchButton onClick={() => getResults()}>search</SearchButton>
        </CardActions>
      </MyCard>
      <Grid container spacing={2} style={{ marginTop: "15px" }} className={classes.center}>
        {content}
      </Grid>
    </div>
  );
}

export default NasaSearch;
