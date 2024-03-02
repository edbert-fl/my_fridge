import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { theme } from "../utils/Styles";
import { useAppContext } from "../context/AppContext";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  RouteProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AntDesign } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons, Feather, Octicons, MaterialIcons } from "@expo/vector-icons";

import ReceiptHistoryScreen from "../screens/ReceiptHistoryScreen";
import ScannerScreen from "../screens/ScannerScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { TabParamList } from "../utils/Types";
import ItemScreen from "../screens/ItemScreen";
import ItemsInReceipt from "../screens/ItemsInReceipt";
import ScannerStackNavigator from "./ScannerStackNavigator";
import FridgeScreen from "../screens/FridgeScreen";

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

  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  const navigateToScanner = () => {
    navigation.navigate("ScannerStackNavigator");
  };

  const getTabBarVisibility = (route: any) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.name;

    if (routeName === "ScannerStackNavigator") {
      return false;
    }

    return true;
  };

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
        name: "receipt-outline",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 32,
      },
      Scanner: {
        name: "camera",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 60,
      },
      ItemScreen: {
        name: "fastfood",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 32,
      },
      Profile: {
        name: "profile",
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
      <View
        style={{ alignItems: "center", display: "flex", position: "absolute" }}
      >
        <View
          style={{
            marginTop: 20,
          }}
        >
          {/* <Icon name={iconMappings[route.name].name} size={iconMappings[route.name].size} color={iconMappings[route.name].color} /> */}
          <Text
            style={{
              color: textColor,
              fontSize: 10,
              fontWeight: "500",
              marginTop: 60,
            }}
          >
            {route.name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => tabBarIcon(focused, route),
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          opacity: getTabBarVisibility(route) ? 1 : 0,
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
          zIndex: 10,
          activeTintColor: "white",
          inactiveTintColor: "#d9d9d9",
        },
        tabBarLabel: ({ focused }) => tabBarLabel(focused, route),
        //   headerStyle:{
        //     backgroundColor:"white",

        // },
      })}
      initialRouteName="Home"
    >
      <Tab.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? theme.colors.primary : theme.colors.accent}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ReceiptHistory"
        component={ReceiptHistoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="receipt-outline"
              size={24}
              color={focused ? theme.colors.primary : theme.colors.accent}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ScannerStackNavigator"
        component={ScannerStackNavigator}
        options={{
          headerShown: false,
          tabBarButton: (focused) => (
            <TouchableOpacity onPress={navigateToScanner}>
              <MaterialIcons
                name="camera"
                size={70}
                color={focused ? theme.colors.primary : theme.colors.accent}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="ItemScreen"
        component={FridgeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
                name="fastfood"
                size={24}
                color={focused ? theme.colors.primary : theme.colors.accent}
              />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="person"
              size={24}
              color={focused ? theme.colors.primary : theme.colors.accent}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
