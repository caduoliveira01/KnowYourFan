import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Bem-vindo ao seu perfil!</div>;
};

export default Profile;
