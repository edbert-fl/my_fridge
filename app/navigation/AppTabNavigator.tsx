import { Text } from "react-native";
import React from "react";
import { theme } from "../utils/Styles";
import { useAppContext } from "../context/AppContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp, ParamListBase } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import ReceiptHistoryScreen from "../screens/ReceiptHistoryScreen";
import ScannerScreen from "../screens/ScannerScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";

interface IconMap {
  [key: string]: IconInformation;
}

interface IconInformation {
  name: string;
  color: string;
  size: number;
}

const AppTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { currUser } = useAppContext();

  const tabBarIcon = (
    focused: boolean,
    route: RouteProp<ParamListBase, string>
  ) => {
    const iconMappings: IconMap = {
      Home: {
        name: "home",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 32,
      },
      ReceiptHistory: {
        name: "TODO",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 32,
      },
      Scanner: {
        name: "TODO",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 32,
      },
      Notification: {
        name: "TODO",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 32,
      },
      Profile: {
        name: "TODO",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 32,
      },
    };

    const { name, color: iconColor, size } = iconMappings[route.name] || {};

    return <Icon name={name} color={iconColor} size={size} />;
  };

  const tabBarLabel = (
    focused: boolean,
    route: RouteProp<ParamListBase, string>
  ) => {
    const textColor = focused
      ? theme.colors.primary
      : theme.colors.placeholderText;

    return (
      <Text
        style={{
          color: textColor,
          fontSize: 12,
          fontWeight: "500",
        }}
      >
        {route.name}
      </Text>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => tabBarIcon(focused, route),
        tabBarStyle: {
          backgroundColor: theme.colors.tabBackground,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 100,
          paddingTop: 5,
          borderTopWidth: 0,
        },
        tabBarLabel: ({ focused }) => tabBarLabel(focused, route),
      })}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ReceiptHistory"
        component={ReceiptHistoryScreen}
        options={{ headerShown: false }}
      />
       <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
