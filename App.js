import React from 'react';
import WelcomeScreen from './app/screens/WelcomeScreen';
import MainContainer from './app/MainContainer';
import CardScreen from './app/screens/CardScreen';
import SettingScreen from './app/screens/SettingScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <WelcomeScreen />
    <NavigationContainer>
        <Stack.Navigator>

            <Stack.Screen options = {{headerShown: false}} name = 'Welcome' component={WelcomeScreen}/>
            <Stack.Screen options = {{headerShown: false}} name = 'Main' component={MainContainer}/>
            <Stack.Screen options = {{headerShown: false}} name = 'Setting' component={SettingScreen}/>
            
            {/* <Stack.Screen options = {{headerShown: false}} name = 'Card' component={CardScreen}/>
            <Stack.Screen options = {{headerShown: false}} name = 'Home' component={HomeScreen}/> */}

        </Stack.Navigator>
    </NavigationContainer>

  ) 
}

// get window dimensions
// console.log(Dimensions.get("screen"))