import React from "react";
import TopNav from "./Components/Navigation/TopNav";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopNav />
    </ThemeProvider>
  );
}

export default App;
