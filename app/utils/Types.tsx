import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface User {
  userID: number,
  username: string,
  email: string,              // email format
  salt: string,
  password?: string,
  createdAt: Date
  healthConditions?: String[] | null,   // comma seperated values: diabetes, lactose intolerance
  healthGoals?: String[] | null,        // comma seperated values: lose weight, build muscle, eat healthier
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
  healthComment: string,
  art: string,
}

export interface Receipt {
  userID: number,
  receiptID: number,
  store: string,
  dateOfPurchase: Date,
  healthRating: number
}

export interface Promo {
  promoId: number,
  store:string,
  promotion: string,
  duration: string,
  dateOfEnding: Date
}

export interface BoundingBox {
  x: number,
  y: number,
  width: number,
  height:number
}

// Navigation Props

export type TabParamList = {
  Home: undefined;
  ReceiptHistory: undefined;
  ScannerStackNavigator: undefined;
  Notification: undefined;
  Profile: undefined;
};

export type ScannerParamList = {
  Scanner: undefined,
  ItemsInReceipt: { receiptID?: number | undefined },
  ItemScreen: { itemID: number, justAdded: boolean }
};

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

export type Recipe = {
  name: string,
  ingredients: string[],
  instructions: string,
  caloriesPerServing: number,
  servings: number,
  img: string
}

export type RootStackRouteProp<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;