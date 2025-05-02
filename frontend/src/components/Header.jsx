import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function HideOnScroll(props) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

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

  const isAuthenticated = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed" // Alterado de 'static' para 'fixed'
          sx={{
            bgcolor: "#000",
            transition: "all 0.3s ease",
            boxShadow: "none",
            "&.MuiAppBar-scrolled": {
              bgcolor: "rgba(0, 0, 0, 0.9)",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              py: 1,
            },
          }}
          className="MuiAppBar-scrolled"
        >
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

              {!isAuthenticated && (
                <Button component={Link} to="/register" sx={buttonStyle}>
                  REGISTER
                </Button>
              )}

              {isAuthenticated ? (
                <>
                  <Button component={Link} to="/profile" sx={buttonStyle}>
                    PROFILE
                  </Button>
                  <Button onClick={handleLogout} sx={buttonStyle}>
                    LOGOUT
                  </Button>
                </>
              ) : (
                <Button component={Link} to="/login" sx={buttonStyle}>
                  LOGIN
                </Button>
              )}
            </Box>

            <Box sx={{ width: { xs: 0, md: 40 } }} />
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Toolbar />
    </>
  );
}
