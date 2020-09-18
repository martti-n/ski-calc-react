import React, { useState } from "react";
import { styled } from "@material-ui/core/styles";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import Results from "./Results";

const CalculateButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  outline: 'none !important' 
});

function Header() {
  const [height, setHeight] = useState("");
  const [amountOfResults, setAmountOfResults] = useState(15);
  const [results, setResults] = useState([]);

  const calculateSkis = () => {
    let skiData = [];

    if (height <= 200 && height >= 140) {
      let h = 145;
      let bmi = 21;
      for (let i = 0; i < amountOfResults; i++) {
        const dataBundle = {
          skiLength: 0,
          weight: 0,
        };
        dataBundle.skiLength = ((h * height) / 100).toFixed(0);
        dataBundle.weight = ((bmi * height ** 2) / 10000).toFixed(1);

        skiData.push(dataBundle);

        h -= 0.5;
        bmi -= 0.125;
      }
      return skiData;
    }
  };

  return (
    <div>
      <h1 className="font-bold text-xl text-center mb-4">SkiCalc</h1>
      <div className="flex justify-center mb-4">
        <TextField
          id="standard-basic"
          label="Your height"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
        />
      </div>
      <h3 className="text-center">Amount of results</h3>
      <div className="flex justify-center mb-4">
        <Select id="demo-simple-select" value={amountOfResults} onChange={(e) => setAmountOfResults(e.target.value)}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </div>
      <div className="flex justify-center mb-4">
        <CalculateButton onClick={() => setResults(calculateSkis())}>
          Calculate
        </CalculateButton>
      </div>
      <div className="flex justify-center mb-4">
        <Results resultItems={results} />
      </div>
    </div>
  );
}

export default Header;
