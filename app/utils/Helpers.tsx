import { Platform } from "react-native";

export const SERVER_URL =
  Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_IOS_SERVER_URL
    : "http://10.0.2.2:3000";

export const DATABASE_URL = "postgres://xuqelbsh:X1LJj-YbnpvdMFNVYcfHEq_mEHtNLwmg@rosie.db.elephantsql.com/xuqelbsh";