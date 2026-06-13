import type { Theme } from "../types/theme";

type ThemeAction = {
  type: "TOGGLE_THEME";
};

export const themeReducer = (
  state: Theme,
  action: ThemeAction
): Theme => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return state === "light" ? "dark" : "light";

    default:
      return state;
  }
};