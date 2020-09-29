import { createMuiTheme } from "@material-ui/core/styles";

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
    MuiButton: {
      root: {
        color: 'white',
        outline: 'none !important'
      }
    },
    MuiButtonBase: {
      root: {
        outline: 'none !important'
      }
    },
    MuiCard: {
      root: {
        outline: 'none !important'
      }
    },
    MuiCardActions: {
      root: {
        display: 'center',
        justifyContent: 'center'
      }
    }
  },
  props: {
    MuiTextField: {
      variant: "standard",
    },
  },
});

export default theme;
