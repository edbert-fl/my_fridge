import { Platform } from "react-native";

export const SERVER_URL =
  Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_IOS_SERVER_URL
    : "http://10.0.2.2:3000";