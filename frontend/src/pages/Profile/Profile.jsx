import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import api from "../../services/api";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
    } else {
      const fetchUser = async () => {
        try {
          const response = await api.get("/users/me");
          setUser(response.data);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      };
      fetchUser();
    }
  }, [navigate]);

  const handleVerificarDocumento = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt,.pdf,.doc,.docx";

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post("/documentos/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.validado) {
          setUser((prev) => ({ ...prev, verificado: true }));
          alert("Documento verificado com sucesso!");
        } else {
          alert("Documento não contém seu nome. Verifique e tente novamente.");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao verificar documento");
      }
    };

    fileInput.click();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <div style={{ padding: "1.5rem" }}>Carregando...</div>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <img
        src="/images/furia-logo.png"
        alt="Logo da Fúria"
        style={{
          width: "80px",
          height: "80px",
          marginBottom: "15px",
        }}
      />
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#555",
        }}
      >
        Olá, {user.nome}
        {user.verificado && (
          <span
            style={{
              marginLeft: "5px",
              color: "green",
            }}
            title="Perfil verificado"
          >
            ✔️
          </span>
        )}
      </h2>

      <p
        style={{
          color: "#555",
          marginBottom: "8px",
        }}
      >
        Email: {user.email}
      </p>
      <p
        style={{
          color: "#555",
          marginBottom: "8px",
        }}
      >
        CPF: {user.cpf}
      </p>
      <p
        style={{
          color: "#555",
          marginBottom: "8px",
        }}
      >
        Endereço: {user.endereco}
      </p>

      <button
        onClick={handleVerificarDocumento}
        style={{
          marginTop: "20px",
          backgroundColor: "#007BFF",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
      >
        Verificar Documento
      </button>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "15px",
          backgroundColor: "#dc3545",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
      >
        Deslogar
      </button>
    </div>
  );
};

export default Profile;
