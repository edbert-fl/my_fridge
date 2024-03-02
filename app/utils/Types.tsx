import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface User {
  userID: number,
  username: string,
  email: string,              // email format
  salt: string,
  createdAt: Date
  healthConditions?: string,   // comma seperated values: diabetes, lactose intolerance
  healthGoals?: string,        // comma seperated values: lose weight, build muscle, eat healthier
}

export interface Item {
  itemID: number,
  receiptID: number,
  name: string,
  quantity: number,
  expiryDate: Date,
  weight: number | null,      // for produce only
  price: number | null,       // price may not be detected
  healthRating: number,       // value from 1 - 10
  healthComment: string
}

export interface Receipt {
  userID: number,
  receiptID: number,
  store: string,
  dateOfPurchase: Date,
  totalSpent: number,
  healthRating: number
}

export interface Promo {
  promoId: number,
  store:string,
  promotion: string,
  duration: string,
  dateOfEnding: Date
}

// Navigation Props

export type RootBottomTabParamList = {
  Home: undefined;
  ClockIn: undefined;
  Schedule: undefined;
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  HealthGoals: undefined;
  HealthConditions: undefined;
  AppTabNavigator: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  | "Login"
  | "Register"
  | "HealthGoals"
  | "HealthConditions"
  | "AppTabNavigator"
>;

export type RootStackRouteProp<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;