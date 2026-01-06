import { MD3LightTheme } from "react-native-paper"
import { COLORS } from "../constants/colors"

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary,
    primaryContainer: COLORS.primaryLight,
    secondary: COLORS.accent,
    tertiary: COLORS.info,
    background: COLORS.background,
    surface: COLORS.surface,
    error: COLORS.danger,
    onBackground: COLORS.text,
    onSurface: COLORS.text,
  },
}
