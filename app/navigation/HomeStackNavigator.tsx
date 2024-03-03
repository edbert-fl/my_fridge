import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAppContext } from "../context/AppContext";

import { useRoute } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ReceiptHistory from "../screens/ReceiptHistoryScreen";
import FridgeScreen from "../screens/FridgeScreen";

const Stack = createNativeStackNavigator()

// const ReceiptHistoryFC = () => <ReceiptHistory route={useRoute()} />
// const FridgeScreenFC = () => <FridgeScreen route={useRoute()} />


const AuthStackNavigator = () => {
    const {currUser} = useAppContext()

    return (
        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen 
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="FridgeScreen"
                component={FridgeScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="ReceiptHistory"
                component={ReceiptHistory}
                options={{headerShown: false}}
            />
            {/* <Stack.Screen 
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            /> */}
        </Stack.Navigator>
    )
}

export default AuthStackNavigator

