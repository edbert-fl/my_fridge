import { Text,View } from "react-native";
import React from "react";
import { theme } from "../utils/Styles";
import { useAppContext } from "../context/AppContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp, ParamListBase } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import { Ionicons,Feather, Octicons, MaterialIcons } from '@expo/vector-icons';

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
        name: "receipt-outline",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 32,
      },
      Scanner: {
        name: "camera",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 60,
      },
      Notification: {
        name: "bell",
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
      // <Text
      //   style={{
      //     color: textColor,
      //     fontSize: 12,
      //     fontWeight: "500",
      //     marginTop:60,
      //     margin:"auto",
      //     position:"relative"
      //   }}
      // >
      //   {route.name}
      // </Text>
      <View style={{ alignItems: 'center', display:"flex", position:"absolute" }}>
      <View style={{  alignItems: 'center',width:route.name === 'Scanner' ? "180%" : "100%" }}>
        {/* <Icon name={iconMappings[route.name].name} size={iconMappings[route.name].size} color={iconMappings[route.name].color} /> */}
        <Text
          style={{
            color: textColor,
            fontSize: 10, // Adjust font size as needed
            fontWeight: "500",
            marginTop: 60, // Adjust margin to create space between icon and text
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
        tabBarStyle: {
          backgroundColor: "white",
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
          zIndex:10,
          activeTintColor: 'white',
          inactiveTintColor: '#d9d9d9',

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
        options={{ headerShown: true,
            tabBarIcon: ({focused}) => <AntDesign name="home" size={24} color={focused ? "lightgreen" : "black"} />
        }}
      />
      <Tab.Screen
        name="ReceiptHistory"
        component={ReceiptHistoryScreen}
        options={{ headerShown: false,
          tabBarIcon: ({focused}) => <Ionicons name="receipt-outline" size={24} color={focused ? "lightgreen" : "black"} />
        }}
      />
       <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{ headerShown: false,
        tabBarButton: ({focused}) => <MaterialIcons onPress={()=>console.log("pressed")} name="camera" size={70} color={focused ? "lightgreen" : "black"} style={{margin: "auto"}} /> }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false ,
          tabBarIcon: ({focused}) => <Feather name="bell" size={24} color={focused ? "lightgreen" : "black"}  />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false,
          tabBarIcon: ({focused}) => <Octicons name="person" size={24} color={focused ? "lightgreen" : "black"} />
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
