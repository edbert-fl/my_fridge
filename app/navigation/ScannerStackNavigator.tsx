import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAppContext } from "../context/AppContext";

import { useRoute } from "@react-navigation/native";
import HealthGoalsScreen from "../screens/HealthGoalsScreen";
import ItemScreen from "../screens/ItemScreen";
import ItemsInReceipt from "../screens/ItemsInReceipt";
import ScannerScreen from "../screens/ScannerScreen";

const Stack = createNativeStackNavigator();

const ItemsInReceiptFC = () => <ItemsInReceipt route={useRoute()} />;
const ItemScreenFC = () => <ItemScreen route={useRoute()} />;

const AuthStackNavigator = () => {
  const { currUser } = useAppContext();

  return (
    <Stack.Navigator initialRouteName="Scanner">
      <Stack.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemsInReceipt"
        component={ItemsInReceiptFC}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemScreen"
        component={ItemScreenFC}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HealthGoals"
        component={HealthGoalsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
