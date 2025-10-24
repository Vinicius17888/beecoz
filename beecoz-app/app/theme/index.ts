export const theme = {
  // paleta aproximada do figma
  colors: {
    bg: "#2F3338",           // fundo
    surface: "#3A3F45",      // cards/inputs
    border: "#4A4F56",
    text: "#F5F7FA",
    muted: "#A9B0B6",
    primary: "#F1B82D",      // amarelo
    primaryDark: "#D9A51F",
    danger: "#E53935",
  },
  // atalhos para compat com telas antigas
  bg: "#2F3338",
  text: "#F5F7FA",

  radius: { sm: 8, md: 12, lg: 16, xl: 20 },
  spacing: (n: number) => 4 * n,
  typography: {
    h1: { fontSize: 22, fontWeight: "700" as const },
    body: { fontSize: 16, fontWeight: "400" as const },
  },
};
