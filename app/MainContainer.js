import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native'

// Screens
import HomeScreen from './screens/HomeScreen';
import CardScreen from './screens/CardScreen';
import AccountScreen from './screens/AccountScreen.js';

//Screen names
const homeName = "Home";
const cardName = "Card";
const accountName = "Account";

const Tab = createBottomTabNavigator();

function MainContainer() {
        
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused,color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
              color = focused? '#2FB5E2' : 'grey';

            } else if (rn === cardName) {
              iconName = focused ? 'card' : 'card-outline';
              color = focused ? '#8f00ff' : 'grey';

            } else if (rn === accountName) {
              iconName = focused ? 'person' : 'person-outline';
              color = focused ? '#8f00ff' : 'grey';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabel: ({ focused, color }) => {
            color = focused ? '#2FB5E2' : 'grey';
            return <Text 
              style={{ 
                color: color, 
                fontSize: 8,
                fontWeight: "bold",
                marginTop: -10, // decrease the gap between the icon and label
                paddingBottom: 10 }}>{route.name}
              </Text>;
          },
          tabBarStyle: { height: 60},
          

          // tabBarActiveTintColor: '#2FB5E2',
          // tabBarInactiveTintColor: 'grey',
          // tabBarLabelStyle: { paddingBottom:12, fontSize: 9 },

        })}>

        <Tab.Screen name={homeName} component={HomeScreen} options = {{headerShown: false}} />
        <Tab.Screen name={cardName} component={CardScreen} options = {{headerShown: false}} />
        <Tab.Screen name={accountName} component={AccountScreen} options = {{headerShown: false}} />

      </Tab.Navigator>
  );
}

export default MainContainer;