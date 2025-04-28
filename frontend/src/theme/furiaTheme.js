import { createTheme } from "@mui/material/styles";

const furiaTheme = createTheme({
  palette: {
    primary: {
      main: "#ED1C24",
    },
    secondary: {
      main: "#2E2E2E",
    },
    background: {
      default: "#000000",
    },
  },
  typography: {
    fontFamily: '"Rajdhani", "Arial", sans-serif',
  },
});

export default furiaTheme;
