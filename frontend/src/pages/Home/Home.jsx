import { Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        textAlign: "center",
        px: { xs: 2, md: 0 },
        maxWidth: { md: "800px" },
        mx: "auto",
        py: 8,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: "700",
          fontSize: { xs: "2rem", md: "3rem" },
          fontFamily: "Rajdhani",
          mb: 3,
          background: "linear-gradient(90deg, #ED1C24, #FF5E62)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        BEM-VINDO AO ESPORTS FAN!
      </Typography>

      <Typography
        variant="h5"
        sx={{
          color: "#ED1C24",
          fontFamily: "Rajdhani",
          letterSpacing: "1px",
        }}
      >
        Seu hub de conexão com a FURIA
      </Typography>
    </Box>
  );
}
