import { Platform, StatusBar, StyleSheet } from "react-native";

export const theme = {
  colors: {
    primary: "#228B22",
    secondary: "#6DA7D2",
    accent: "#43537A",
    background: "#FFFFFF",
    outline: "#BBBBBB",
    surface: "#F0F0F0",
    text: "#333333",
    placeholderText: "#6C7483",
    link: "#9AEBA3",
    error: "#FF5252",
    success: "#03C988",
    warning: "#FFC107",
    divider: "#E0E0E0",
    imagePlaceholder: "#EEEEEE",
    faded: "rgba(100, 100, 100, 0.6)",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

export const commonStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight as number) : 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 50,
    backgroundColor: theme.colors.background,
  },
});
