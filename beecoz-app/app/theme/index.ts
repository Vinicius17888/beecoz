export const theme = {
  colors: {
    primary: "#F1B82D",
    primaryDark: "#C9961F",
    bg: "#0B0B0B",
    text: "#FFFFFF",
    muted: "#9AA0A6",
    border: "#2A2A2A",
    danger: "#E53935",
    success: "#2E7D32"
  },
  // atalhos para compatibilidade com telas antigas:
  bg: "#0B0B0B",
  text: "#FFFFFF",

  spacing: (n: number) => 4 * n,
  radius: { sm: 8, md: 12, lg: 16, xl: 20 },
  typography: {
    h1: { fontSize: 28, fontWeight: "700" as const },
    h2: { fontSize: 22, fontWeight: "700" as const },
    body: { fontSize: 16, fontWeight: "400" as const }
  }
};
