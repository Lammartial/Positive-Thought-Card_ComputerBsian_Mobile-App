import React, { useEffect, useRef } from 'react';
import { ImageBackground, StyleSheet, Dimensions, Animated, SafeAreaView, TouchableOpacity } from 'react-native';
import { Easing } from 'react-native-reanimated';

const {height, width} = Dimensions.get("window");

let animatedValue = new Animated.Value(0)
let curentValue = 0
animatedValue.addListener(({value}) => {
    curentValue = value
})
const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
})
const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
})

const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate}]
}

const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate}]
}

const frontOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [1,0]
})
const backOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [0,1]
})

const flipAnimation = () => {
    if (curentValue >= 90) {
        Animated.spring(animatedValue, {
            toValue: 0,
            tension: 10,
            friction: 20,
            duration: 1000,
            useNativeDriver:false
        }).start()
    } else {
        Animated.spring(animatedValue, {
            toValue: 180,
            tension: 10,
            friction: 20,
            duration: 1000,
            useNativeDriver: false,
        }).start()
    }
}



function CardDraw() {
    const cardMotion = useRef(new Animated.Value(0)).current;
    useEffect (() => {
    Animated.timing(cardMotion, {
        toValue: height + 100,
        duration: 1500,
        useNativeDriver: false,
        easing: Easing.exp
    }).start();
}, []);
    return (
        <ImageBackground
        source={require('../assets/images/themedraw.jpg')} 
        resizeMode="cover" 
        style={styles.background}>
        <SafeAreaView style={styles.container}>
        <Animated.Image
        source = {require('../assets/images/card_back.jpg')}
        style = {[frontAnimatedStyle, styles.card_back, {opacity: frontOpacity, marginTop: cardMotion}]}/>
        <TouchableOpacity
        style = {styles.buttonStyle}
        onPress = {flipAnimation}>
        <Animated.Image
        source = {require('../assets/images/card_front.jpg')}
        style = {[backAnimatedStyle, styles.card_front, {opacity: backOpacity, marginTop: cardMotion}]}/>
        </TouchableOpacity>

        </SafeAreaView>
    
        </ImageBackground>

    );
}


const styles = StyleSheet.create({
    container: {
        flex:1,
    },

    card_back: {
        width: 330,
        height: 540,
        bottom: height,
        backgroundColor:"transparent",
        
    },
    card_front: {
        width: 330,
        height: 540,
        bottom: height+140,
        backgroundColor:"transparent",

    },
    

    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height:height - 50,
        width:width

    },
    buttonStyle: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
        color: 'white',
        backgroundColor: 'transparent',
        height: 540,
        width: 330,
        bottom: height
    },
    buttonTextStyle: {
        color: 'transparent',
        fontSize: 20
    }
    
})

export default CardDraw;
