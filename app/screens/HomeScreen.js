import { useNavigation } from '@react-navigation/native';
import React, {useEffect} from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, Alert, Easing } from 'react-native';
import {Animated as Animation} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import { auth } from '../../firebase';
import {Audio} from 'expo-av'

function HomeScreen(){

    // rotating settings icon around animation
    const rotateValueHolder = new Animation.Value(0)

    const rotation = rotateValueHolder.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg', '360deg']
    })

    const startImageRotateAnimation = () => {
        Animation.loop(
              Animation.timing(rotateValueHolder, {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
              }),
            ).start();
    }

    // start rotating animation automatically
    useEffect(() => {

        startImageRotateAnimation();

    }, [rotation]);

    const settingRotatingStyle = {
      transform: [
        {
          rotate: rotation,
        },
      ],
    };

    // handle playing button click sound
    const [sound, setSound] = React.useState();

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/sound/button-click.mp3'));
        setSound(sound);
    
        await sound.playAsync();
    }

    React.useEffect(() => {
        return sound
        ? () => {sound.unloadAsync();} : undefined;
    }, [sound]);

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                playSound()
                navigation.replace("Welcome")

            })
            .catch(error => alert(error.message))
    }

    return (
        <View style = {styles.container}>

            <Animated.View style = {[StyleSheet.absoluteFill]}>

                <ImageBackground
                    source={require('../assets/images/blue_sky.jpg')} 
                    style={styles.topBackground}>
 
                </ImageBackground>

                <Image
                    source={require('../assets/images/triangle_icon.png')}    
                    style = {styles.triangleIcon}

                />

                <Text
                    numberOfLines={1} style={styles.pageTitle}>
                    Home
                </Text>

                <TouchableOpacity activeOpacity={0.6} style = {[StyleSheet.absoluteFill, {position: "absolute", left: 360, width: 50, height: 50}]} onPress = {() => {navigation.navigate('Setting')}}>
                    <Animation.Image   
                        source={require('../assets/images/settings_icon.png')}    
                        style = {[styles.settingIcon, settingRotatingStyle]}
                    />
                </TouchableOpacity>


            </Animated.View>

            {!auth.currentUser.isAnonymous && (
                <View>
                    <Text style={alignSelf= "center"}>
                        Username: {auth.currentUser?.displayName}
                    </Text>
                    <Text style={alignSelf= "center"}>
                        Email: {auth.currentUser?.email}
                    </Text>

                </View>
            )}
            {auth.currentUser.isAnonymous && (
                <View>
                    <Text style = {styles.guestText}>
                        You are signed in as a guest.
                    </Text>

                </View>
            )}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style = {styles.signOutButton}
                    onPress = {handleSignOut}>
                    <Text style = {styles.signOutButtonText}> Sign out </Text>
                </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    topBackground: {
        justifyContent: "center",
        alignItems: "center",
        height: 125,
        width: '100%'
        // borderBottomStartRadius: '50%',
        // borderBottomEndRadius: '50%',
        // overflow: 'hidden',
        
    },

    triangleIcon: {
        height: 30,
        width: 30,
        bottom: 110,
        left: 20, 
    },

    pageTitle: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        bottom: 140,
        left: 60,
    },

    settingIcon: {

        height: 50,
        width: 50,
    },

    signOutButton: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: -20,  //*5
        paddingVertical: 12,
        paddingHorizontal: 154,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "#2AB9E6",        
    },

    signOutButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },

    guestText: {
        alignSelf: "center"
    }

})

export default HomeScreen

