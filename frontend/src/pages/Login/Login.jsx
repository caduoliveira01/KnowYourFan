import React, { useState } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/system";
import authService from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, senha);
      navigate("/profile");
    } catch (err) {
      setError("Credenciais inválidas ou erro de comunicação.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#000",
      }}
    >
      <Container
        sx={{
          textAlign: "center",
          backgroundColor: "#1d1d1d",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: "400px",
        }}
      >
        <img
          src="/images/furia-logo.png"
          alt="FURIA Esports"
          style={{
            width: "150px",
            marginBottom: "20px",
          }}
        />
        <Typography
          variant="h4"
          sx={{
            color: "#ED1C24",
            fontFamily: "Rajdhani",
            fontWeight: 700,
            marginBottom: 3,
          }}
        >
          Login FURIA Esports
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            sx={{ mb: 3 }}
          />
          {error && (
            <Typography
              variant="body2"
              sx={{
                color: "red",
                marginBottom: 2,
              }}
            >
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #ED1C24, #FF5E62)",
              color: "#fff",
              fontWeight: 700,
              letterSpacing: 1,
              padding: "10px 0",
              "&:hover": {
                background: "linear-gradient(90deg, #FF5E62, #ED1C24)",
              },
            }}
          >
            Entrar
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
