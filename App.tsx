import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStackNavigator from "./app/navigation/AuthStackNavigator";
import { AppContext } from "./app/context/AppContext";
import { User } from "./app/utils/Types";
import HomeScreen from "./app/screens/HomeScreen";
import { MainHeader } from "./app/components/MainHeader";
import AppTabNavigator from "./app/navigation/AppTabNavigator";
import ProfileScreen from "./app/screens/ProfileScreen";
import DefaultRecipes from "./app/screens/DefaultRecipes";
export default function App() {

  const [currUser, setCurrUser] = useState<User | null>(null);
  const [tempCurrUser, setTempCurrUser] = useState<User | null>(null);

  // Everytime app is loaded attempt to retrieve the userSession.
  useEffect(() => {
    if (currUser === null) {
      retrieveUserSession();
    }
  }, []);

  useEffect(() => {
    storeUserSession();
  }, [currUser]);
  
  async function storeUserSession() {
    try {
      await AsyncStorage.setItem(
        "sessionUserInformation",
        JSON.stringify(currUser)
      );
    } catch (error) {
      console.log("Error storing user information: ", error);
    }
  }

  async function retrieveUserSession() {
    try {
      console.log(
        "Retrieving user session information..."
      )

      const userJSON = await AsyncStorage.getItem(
        "sessionUserInformation"
      );

      if (userJSON !== null) {
        const sessionUserInformation = JSON.parse(userJSON);
        console.log("Session User Info:", sessionUserInformation);
        setCurrUser(sessionUserInformation);
      }
    } catch (error) {
      console.log("Error retrieving user information: ", error);
    }
  }

  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{
          currUser: currUser,
          setCurrUser: setCurrUser,
          tempCurrUser: tempCurrUser,
          setTempCurrUser: setTempCurrUser
        }}
      >
        <AuthStackNavigator />
      </AppContext.Provider>
    </NavigationContainer>
  );
}