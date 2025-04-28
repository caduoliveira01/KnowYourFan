import { Box } from "@mui/material";
import RegisterForm from "../../components/RegisterForm";

export default function Register() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#000", pt: 4 }}>
      <RegisterForm />
    </Box>
  );
}
