import { Box, Typography } from "@mui/material";

const feedData = [
  {
    id: 1,
    title: "FURIA vence a Team Liquid por 2-0 no CS2",
    date: "30/04/2025",
    content:
      "Em uma partida dominante, a FURIA garantiu a vitória na ESL Pro League.",
  },
  {
    id: 2,
    title: "Agenda: FURIA x NAVI - Hoje às 18h",
    date: "01/05/2025",
    content: "Não perca o duelo decisivo nas semifinais da Blast Premier.",
  },
  {
    id: 3,
    title: "KSCERATO é eleito MVP da última semana",
    date: "28/04/2025",
    content: "Com uma média de 1.45 de rating, o jogador brilhou nos playoffs.",
  },
  {
    id: 4,
    title: "Novo uniforme 2025 da FURIA é revelado",
    date: "27/04/2025",
    content: "Design moderno com detalhes vermelhos marca a nova era do time.",
  },
  {
    id: 5,
    title: "FURIA Academy estreia com vitória no CBLOL Academy",
    date: "26/04/2025",
    content: "A base vem forte! Estreia com stomp contra INTZ Academy.",
  },
  {
    id: 6,
    title: "Highlights da semana disponíveis no YouTube",
    date: "25/04/2025",
    content: "Assista às melhores jogadas da FURIA em vídeo exclusivo.",
  },
  {
    id: 7,
    title: "FURIA anuncia nova line-up de Valorant feminino",
    date: "24/04/2025",
    content:
      "Reforço no time feminino promete fortes emoções no Game Changers.",
  },
  {
    id: 8,
    title: "Ranking atualizado: FURIA sobe 2 posições no HLTV",
    date: "23/04/2025",
    content: "Com bons resultados recentes, o time atinge o top 5 global.",
  },
  {
    id: 9,
    title: "FURIA participa de ação beneficente em SP",
    date: "22/04/2025",
    content:
      "Evento arrecada fundos para instituições e promove inclusão digital.",
  },
  {
    id: 10,
    title: "Player yuurih bate 10k de ADR no mês",
    date: "21/04/2025",
    content: "Média histórica reforça a fase excelente do rifler.",
  },
];

export default function FeedFuria() {
  return (
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Rajdhani",
          fontWeight: 700,
          color: "#ED1C24",
          mb: 3,
        }}
      >
        📰 Novidades da FURIA
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {feedData.map((item) => (
          <Box
            key={item.id}
            sx={{
              backgroundColor: "#1a1a1a",
              padding: 3,
              borderRadius: 2,
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
          >
            <Typography variant="h6" sx={{ color: "#ED1C24", fontWeight: 600 }}>
              {item.title}
            </Typography>
            <Typography variant="caption" sx={{ color: "#aaa" }}>
              {item.date}
            </Typography>
            <Typography sx={{ mt: 1 }}>{item.content}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
