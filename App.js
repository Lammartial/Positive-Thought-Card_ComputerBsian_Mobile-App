import React, { useEffect, useState } from "react";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import MainContainer from "./app/MainContainer";
import CardScreen from "./app/screens/CardScreen";
import SettingScreen from "./app/screens/SettingScreen";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import messaging from "@react-native-firebase/messaging";
const Stack = createNativeStackNavigator();

export default function App() {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
        });
    } else {
      console.log("Failed to get token", authStatus);
    }

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
        setLoading(false); // setLoading to false means that the app is ready to be rendered
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    // <WelcomeScreen />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={MainContainer}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Setting"
          component={SettingScreen}
        />

        {/* <Stack.Screen options = {{headerShown: false}} name = 'Card' component={CardScreen}/>
            <Stack.Screen options = {{headerShown: false}} name = 'Home' component={HomeScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// get window dimensions
// console.log(Dimensions.get("screen"))
