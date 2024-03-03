import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { AppContext } from "./app/context/AppContext";
import AuthStackNavigator from "./app/navigation/AuthStackNavigator";
import { User } from "./app/utils/Types";
import schedulePushNotification from "./app/components/Notification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription | undefined>(
    undefined
  );
  const responseListener = useRef<Notifications.Subscription | undefined>(
    undefined
  );

  const [currUser, setCurrUser] = useState<User | null>(null);
  const [tempCurrUser, setTempCurrUser] = useState<User | null>(null);

  // Everytime app is loaded attempt to retrieve the userSession.
  useEffect(() => {
    if (currUser === null) {
      retrieveUserSession();
    }
  }, []);


  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token ?? "")
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  schedulePushNotification();
  
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
      console.log("Retrieving user session information...");

      const userJSON = await AsyncStorage.getItem("sessionUserInformation");

      if (userJSON !== null) {
        const sessionUserInformation = JSON.parse(userJSON);
        console.log("Session User Info:", sessionUserInformation);
        setCurrUser(sessionUserInformation);
      }
    } catch (error) {
      console.log("Error retrieving user information: ", error);
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "your-project-id",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{
          currUser: currUser,
          setCurrUser: setCurrUser,
          tempCurrUser: tempCurrUser,
          setTempCurrUser: setTempCurrUser,
        }}
      >
        <AuthStackNavigator />
      </AppContext.Provider>
    </NavigationContainer>
  );
}
