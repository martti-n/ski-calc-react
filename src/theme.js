import { createMuiTheme } from "@material-ui/core";

// create a theme instance

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#42A5F5",
      dark: "#1E88E5",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  overrides: {
    MuiInputLabel: {
      formControl: {
        right: "25%",
        left: "30%",
      },
    },
  },
  props: {
    MuiTextField: {
      variant: "standard",
    },
    MuiButton: {
      variant: "contained",
    },
  },
});

export default theme;
