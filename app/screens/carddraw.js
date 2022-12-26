import React from 'react';
import { ImageBackground, StyleSheet, View, Pressable, Button, Dimensions, Alert, Image, Text, Linking, Animated, SafeAreaView, TouchableOpacity } from 'react-native';
const {height, width} = Dimensions.get("window");

function cardGen() {
  var i = Math.floor(Math.random()*(cardgen.length));
  message = '<h2 style = "color:Tomato;">' + cardgen[i].name + '</h2>';
  message += cardgen[i].description + '</p>';
  message += '<p style = "font-style: italic; font-size: 15px;text-align: right"> ' + cardgen[i].author + '</p>';
  return message;
}


let animatedValue = new Animated.Value(0)
let curentValue = 0
animatedValue.addListener(({value}) => {
    curentValue = value
})
const setInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
})

const rotateYAnimatedStyle = {
    transform: [{ rotateY: setInterpolate}]
}

const flipAnimation = () => {
    if (curentValue >= 90) {
        Animated.spring(animatedValue, {
            toValue: 0,
            tension: 10,
            friction: 20,
            perspective: 1000,
            useNativeDriver:false
        }).start(() => {
            
        }
        )
    } else {
        Animated.spring(animatedValue, {
            toValue: 180,
            tension: 10,
            friction: 20,
            perspective: 1000,
            useNativeDriver: false,
        }).start()

    }
}

function Carddraw() {
    return (
        <ImageBackground
        source={require('../assets/themedraw.jpg')} 
        resizeMode="cover" 
        style={styles.background}>
        <SafeAreaView style={styles.container}>
        <Animated.Image
        source = {require('../assets/card_back.jpg')}
        style = {[rotateYAnimatedStyle, styles.card_back]}/>
        <TouchableOpacity
        style = {styles.buttonStyle}
        onPress = {flipAnimation}>
        <Animated.Image
        source = {require('../assets/card_front.jpg')}
        style = {[rotateYAnimatedStyle, styles.card_front]}/>
        </TouchableOpacity>

        </SafeAreaView>
    
        </ImageBackground>

    );
}


const styles = StyleSheet.create({
    container: {
        flex:1
    },

    card_back: {
        width: 330,
        height: 540,
        bottom: 0,
        top: 140,
        alignItems: "center",
        backgroundColor:"transparent",
    },
    card_front: {
        backfaceVisibility: "hidden",
        width: 330,
        height: 540,
        bottom: 0,
        top: 0,
        alignItems: "center",
        backgroundColor:"transparent"
    },
    

    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",

    },
    buttonStyle: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
        color: 'white',
        backgroundColor: 'transparent',
        height: 540,
        width: 330,
        bottom: 400
    },
    buttonTextStyle: {
        color: 'transparent',
        fontSize: 20
    }
    
})

export default Carddraw;
