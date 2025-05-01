import React, { useState } from "react";
import axios from "axios";

function UploadDocumento() {
  const [file, setFile] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMensagem("Por favor, selecione um arquivo.");

    setLoading(true);
    setMensagem("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/documentos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagem(response.data);
    } catch (error) {
      setMensagem(error.response?.data || "Erro ao enviar documento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "black",
        }}
      >
        Verificação de Documento
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          style={{
            display: "none",
          }}
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          style={{
            display: "inline-block",
            width: "90%",
            padding: "12px 20px",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "white",
            textAlign: "center",
            fontSize: "16px",
            cursor: "pointer",
            border: "none",
            marginBottom: "20px",
          }}
        >
          {file ? file.name : "Escolher Arquivo"}{" "}
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
            marginTop: "20px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Documento"}
        </button>
      </form>
      {mensagem && (
        <p
          style={{
            marginTop: "20px",
            color: mensagem.includes("erro") ? "red" : "green",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default UploadDocumento;
