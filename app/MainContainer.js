import * as React from 'react';
import { NavigationContainer, useFocusEffect} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, StatusBar} from 'react-native'
import { Audio } from 'expo-av';
import { auth } from '../firebase';

// Screens
import HomeScreen from './screens/HomeScreen';
import CardScreen from './screens/CardScreen';
import AccountScreen from './screens/AccountScreen.js';

function MainContainer() {
      //Screen names
    const cardName = "Card";
    const accountName = "Account";

    const Tab = createBottomTabNavigator();
    
    // handle playing music
    const [sound, setSound] = React.useState();

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('./assets/sound/relax1.mp3'));
        setSound(sound);

        sound.setOnPlaybackStatusUpdate(status => {
          if (status.didJustFinish) {
              playSound();
          }
      });

        await sound.playAsync();

     }

     async function stopSound() {
      try {
        if (sound) {
            await sound.stopAsync();
        }
    } catch (error) {
        console.log(error);
    }
  }
 
    React.useEffect(() => {
         playSound();
         return () => {
            if (sound) {
              sound.unloadAsync();
            }
         };
     }, [])


  return (
    <>
    <StatusBar hidden /> 

      <Tab.Navigator
        initialRouteName={cardName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused,color, size }) => {
            let iconName;
            let rn = route.name;
                
            if (rn === cardName) {
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

        <Tab.Screen name={cardName} component={CardScreen} options = {{headerShown: false}} />
        <Tab.Screen name={accountName} component={AccountScreen} options = {{headerShown: false}} />

      </Tab.Navigator>
      </>
  );
}

export default MainContainer;
