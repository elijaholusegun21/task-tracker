import { useReducer, useEffect } from "react";
import type { ReactNode } from "react";

import { ThemeContext } from "./theme-context";
import { themeReducer } from "../reducer/themeReducer";

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [theme, dispatch] = useReducer(
    themeReducer,
    "light",
    () => {
      const savedTheme =
        localStorage.getItem("theme");

      return savedTheme === "dark"
        ? "dark"
        : "light";
    }
  );

  const toggleTheme = () => {
    dispatch({
      type: "TOGGLE_THEME",
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};