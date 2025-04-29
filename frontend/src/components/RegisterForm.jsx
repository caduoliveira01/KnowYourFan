import { useState, forwardRef } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "../services/api";

const CPFInput = forwardRef(function CPFInput(props, ref) {
  return (
    <IMaskInput
      {...props}
      mask="000.000.000-00"
      inputRef={ref}
      definitions={{ 0: /[0-9]/ }}
      overwrite
    />
  );
});

const CEPInput = forwardRef(function CEPInput(props, ref) {
  return (
    <IMaskInput
      {...props}
      mask="00000-000"
      inputRef={ref}
      definitions={{ 0: /[0-9]/ }}
      overwrite
    />
  );
});

const schema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  interesses: z.array(z.string()).min(1, "Selecione ao menos 1 jogo"),
  enderecoRua: z.string().min(3, "Rua obrigatória"),
  enderecoCidade: z.string().min(2, "Cidade obrigatória"),
  enderecoEstado: z.string().min(2, "Estado obrigatório"),
  enderecoCep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido"),
  atividadesEventos: z.string().optional(),
});

const JOGOS_FURIA = ["CS:GO", "Valorant", "LoL", "Free Fire", "Rainbow Six"];

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const interesses = watch("interesses") || [];

  const toggleInteresse = (jogo) => {
    const novos = interesses.includes(jogo)
      ? interesses.filter((i) => i !== jogo)
      : [...interesses, jogo];
    setValue("interesses", novos);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        nome: data.nome,
        cpf: data.cpf.replace(/\D/g, ""),
        senha: data.senha,
        interesses: data.interesses,
        enderecoRua: data.enderecoRua,
        enderecoCidade: data.enderecoCidade,
        enderecoEstado: data.enderecoEstado,
        enderecoCep: data.enderecoCep,
        atividadesEventos: data.atividadesEventos || "",
      };

      const response = await api.post("/users", payload);

      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erro ao cadastrar usuário"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        bgcolor: "#111",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        color="#fff"
        fontFamily="Rajdhani"
        fontWeight={700}
        mb={4}
      >
        CADASTRO FURIA
      </Typography>

      {error && (
        <Typography color="#ED1C24" mb={2} fontFamily="Rajdhani">
          ⚠️ {error}
        </Typography>
      )}
      {success && (
        <Typography color="#4CAF50" mb={2} fontFamily="Rajdhani">
          ✔️ Cadastro realizado com sucesso!
        </Typography>
      )}

      <TextField
        label="Nome"
        fullWidth
        sx={style}
        disabled={loading}
        {...register("nome")}
        error={!!errors.nome}
        helperText={errors.nome?.message}
      />

      <TextField
        label="Senha"
        type="password"
        fullWidth
        sx={style}
        disabled={loading}
        {...register("senha")}
        error={!!errors.senha}
        helperText={errors.senha?.message}
      />

      <TextField
        label="CPF"
        fullWidth
        sx={style}
        disabled={loading}
        InputProps={{ inputComponent: CPFInput }}
        {...register("cpf")}
        error={!!errors.cpf}
        helperText={errors.cpf?.message}
      />

      <Typography variant="body1" color="#fff" mb={1} fontFamily="Rajdhani">
        Seus interesses:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {JOGOS_FURIA.map((jogo) => (
          <Chip
            key={jogo}
            label={jogo}
            clickable
            disabled={loading}
            onClick={() => toggleInteresse(jogo)}
            sx={{
              bgcolor: interesses.includes(jogo) ? "#fff" : "#ED1C24",
              color: "#000",
              fontFamily: "Rajdhani",
              fontWeight: 700,
              "&:hover": { bgcolor: "#FF5E62" },
            }}
          />
        ))}
      </Box>
      {errors.interesses && (
        <Typography color="#fff" fontSize="0.75rem" mt={-2} mb={2}>
          {errors.interesses.message}
        </Typography>
      )}

      <TextField
        label="Rua"
        fullWidth
        sx={style}
        disabled={loading}
        {...register("enderecoRua")}
        error={!!errors.enderecoRua}
        helperText={errors.enderecoRua?.message}
      />
      <TextField
        label="Cidade"
        fullWidth
        sx={style}
        disabled={loading}
        {...register("enderecoCidade")}
        error={!!errors.enderecoCidade}
        helperText={errors.enderecoCidade?.message}
      />
      <TextField
        label="Estado"
        fullWidth
        sx={style}
        disabled={loading}
        {...register("enderecoEstado")}
        error={!!errors.enderecoEstado}
        helperText={errors.enderecoEstado?.message}
      />
      <TextField
        label="CEP"
        fullWidth
        sx={style}
        disabled={loading}
        InputProps={{ inputComponent: CEPInput }}
        {...register("enderecoCep")}
        error={!!errors.enderecoCep}
        helperText={errors.enderecoCep?.message}
      />

      <TextField
        label="Atividades/Eventos"
        fullWidth
        sx={style}
        disabled={loading}
        {...register("atividadesEventos")}
        error={!!errors.atividadesEventos}
        helperText={errors.atividadesEventos?.message}
      />

      <Button type="submit" fullWidth disabled={loading} sx={buttonStyle}>
        {loading ? (
          <CircularProgress size={24} sx={{ color: "#ED1C24" }} />
        ) : (
          "CADASTRAR"
        )}
      </Button>
    </Box>
  );
}

const style = {
  mb: 3,
  "& label": { color: "#fff" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#ED1C24" },
  },
};

const buttonStyle = {
  bgcolor: "#ED1C24",
  color: "#000",
  py: 2,
  fontFamily: "Rajdhani",
  fontWeight: 700,
  "&:hover": { bgcolor: "#FF5E62" },
  "&:disabled": { bgcolor: "#2E2E2E" },
};
