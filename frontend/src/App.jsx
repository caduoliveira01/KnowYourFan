import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { Box } from "@mui/material";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#000000",
      }}
    >
      <Header />
      <Box component="main" sx={{ width: "100%", maxWidth: 1200, p: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
