import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  const buttonStyle = {
    color: "#fff",
    fontWeight: "700",
    fontSize: "1rem",
    fontFamily: "Rajdhani",
    "&:hover": {
      color: "#ED1C24",
      transform: "scale(1.05)",
    },
  };
  return (
    <AppBar position="static" sx={{ bgcolor: "#000" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          px: { xs: 2, md: 10 },
        }}
      >
        <Box
          component="img"
          src="/images/furia-logo.png"
          sx={{
            height: 40,
            display: { xs: "none", md: "block" },
          }}
        />

        <Box sx={{ display: "flex", gap: 4 }}>
          <Button component={Link} to="/" sx={buttonStyle}>
            HOME
          </Button>
          <Button component={Link} to="/register" sx={buttonStyle}>
            REGISTER
          </Button>
          <Button component={Link} to="/profile" sx={buttonStyle}>
            PROFILE
          </Button>
        </Box>

        <Box sx={{ width: { xs: 0, md: 40 } }} />
      </Toolbar>
    </AppBar>
  );
}
