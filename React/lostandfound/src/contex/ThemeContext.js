import { createContext, useContext } from "react";

export const themes = {
  light: {
    name: "light",
    colors: {
      page: "#f9fafb",
      surface: "#ffffff",
      surfaceMuted: "#f3f4f6",
      border: "#e5e7eb",
      text: "#111827",
      textMuted: "#6b7280",
      textStrong: "#1f2937",
      input: "#ffffff",
    },
  },
  dark: {
    name: "dark",
    colors: {
      page: "#111827",
      surface: "#1f2937",
      surfaceMuted: "#374151",
      border: "#4b5563",
      text: "#f9fafb",
      textMuted: "#9ca3af",
      textStrong: "#e5e7eb",
      input: "#374151",
    },
  },
};

export const ThemeContext = createContext({
  mode: "light",
  theme: themes.light,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
