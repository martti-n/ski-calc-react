import React from "react";
import Header from "./Components/Header";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="bg-blue-100 h-screen">
        <Header />
      </div>
    </ThemeProvider>
  );
}

export default App;
