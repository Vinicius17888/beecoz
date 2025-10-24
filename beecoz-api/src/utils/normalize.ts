export const normEmail = (v?: string | null) => {
  const s = (v ?? "").trim().toLowerCase();
  return s.length ? s : null;
};

export const normPhone = (v?: string | null) => {
  const digits = (v ?? "").replace(/\D/g, "");
  return digits.length ? digits : null;
};
