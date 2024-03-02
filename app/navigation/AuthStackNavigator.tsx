import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "../context/AppContext";
import AppTabNavigator from "./AppTabNavigator";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HealthConditionsScreen from "../screens/HealthConditionsScreen";
import HealthGoalsScreen from "../screens/HealthGoalsScreen";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  const { currUser } = useAppContext();

  return (
    <Stack.Navigator initialRouteName="Login">
      {currUser !== null ? (
        <Stack.Screen
          name="AppTabNavigator"
          component={AppTabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HealthConditions"
            component={HealthConditionsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HealthGoals"
            component={HealthGoalsScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
