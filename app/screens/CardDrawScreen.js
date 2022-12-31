import React from 'react';
import { ImageBackground, StyleSheet, Dimensions, Animated, SafeAreaView, TouchableOpacity } from 'react-native';
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
            perspective: 1000,
            useNativeDriver:false
        }).start()
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
        source={require('../assets/images/themedraw.jpg')} 
        resizeMode="cover" 
        style={styles.background}>
        <SafeAreaView style={styles.container}>
        <Animated.Image
        source = {require('../assets/images/card_back.jpg')}
        style = {[frontAnimatedStyle, styles.card_back, {opacity: frontOpacity}]}/>
        <TouchableOpacity
        style = {styles.buttonStyle}
        onPress = {flipAnimation}>
        <Animated.Image
        source = {require('../assets/images/card_front.jpg')}
        style = {[backAnimatedStyle, styles.card_front, {opacity: backOpacity}]}/>
        </TouchableOpacity>

        </SafeAreaView>
    
        </ImageBackground>

    );
}


const styles = StyleSheet.create({
    container: {
        flex:1
    },
    hidden: {backfaceVisibility: "hidden"},
    card_back: {
        width: 330,
        height: 540,
        bottom: 0,
        top: 140,
        alignItems: "center",
        onPress: 'hidden',
        backgroundColor:"transparent",
        
    },
    card_front: {
        backfaceVisibility: "hidden",
        width: 330,
        height: 540,
        bottom: 0,
        top: 0,
        alignItems: "center",
        backgroundColor:"transparent",

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
