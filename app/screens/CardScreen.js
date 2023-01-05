
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

const quotes = ["TODAY I am loved. Today I start from the notion that I am profoundly loved. Whatever happens in my day, I know I'm loved.", 
"TODAY I look at the positive side. I purposefully look for the positive side of people, situations, events. And I also look at my positive sides.",
"TODAY I am in touch with the magic of water.I will act as if the water were alive, I thank it for being the source of life and for constituting 65% of my body. I will be bonding with it all day.",
"TODAY I forgive myself. I free myself from the weight of resentment. Today, and just for the day, I forgive myself.",
"TODAY I have the right to be curious. I allow myself to explore, to push open doors, to ask questions. I let myself be moved by curiosity. Today there are no silly questions.",
"TODAY I have the right to get rid of something. Today, I get rid of what clutters me up, what I no longer need or want. I'm experimenting with throwing away at least one thing.",
"TODAY I remember that I am creative. I leave room for my creative side and today, I'm not going to judge it, or evaluate it, or have a goal of productivity.",
"TODAY I have time. Today I start from the idea that I have time and I live the day with this awareness. I taste and savor time.",
"TODAY I am in touch with my inner youth/child. I allow myself to reinvest this place in me where I am full of vitality. I summon the teenager or the joyful child in me.",
"TODAY I offer smiles. I think about smiling, I smile at those I choose, I smile a little more than usual. I watch the smile spread.",
"TODAY I don't care if I'm right or wrong. I let go of this struggle of wanting to be right. I no longer seek to convince others. I step out of the ring.",
"TODAY I look back at all the times I was brave. I remember all the situations where I showed courage, where I dared, took risks and accepted my choices.",
"TODAY I put myself first. For the day, I stop putting others before me, I am my priority. Today, I am the most important person for me.",
"TODAY I stand up. I pay attention to my physical posture. I straighten up, shoulders back and head straight. And I take this opportunity to breathe deeply.",
"TODAY I pretend the Earth is at peace. Today, I act as if the world was fine, as if the world was at peace. For the whole day, I am in this tranquility.", 
"TODAY I have the right to feel happy. I have the right to feel the sensation of happiness, and happiness is being at the right time: neither in the past, nor in the future, just in the present.",
"TODAY I am legit to exercise my authority. I have authority within me. I am the queen, the king, of my inner kingdom, and I have the right to exercise this authority.",
"TODAY I connect with Nature. Nature is everywhere, even in the city. The sky, the air, the earth. I repeat to myself “I connect with nature” and observe what is happening. I too am part of nature.",
"TODAY I take pleasure in breathing. I breathe consciously. I identify the smells, I taste those that I like and I feel life that enters me with each inspiration/ inhale.",
"TODAY I savor what I eat. I enjoy eating, I have the right to eat what I like, I savor the food.",
"TODAY I finish doing something. I choose something I have to do, and I finish it.",
"TODAY I am sensitive to musical sounds. I put awareness into my listening. I take the time to listen to the sounds around me and discover their musicality.",
"TODAY I walk saying “thank you” with every step. At each step I say thank you...  And during the day I take at least 3 minutes to do it.",
"TODAY I look at someone deep in the eyes. I take the time to look at someone in eyes, and I stay longer than usual to experience this quality of contact.",
"TODAY I am a tourist who discovers. I allow myself to look at things surrounding me with a brand-new eye.",
"TODAY I have audacity. I experience the pleasure of being audacious - this mixture of courage, freedom, adventure, grace, and exceptionality.",
"TODAY I welcome all my fragilities with kindness. I accept my flaws, my vulnerabilities, my failings...  All of this makes me a complete and sensitive being whom I respect with empathy and compassion.",
"TODAY I feel the joy of being kind. I see my generosity and benevolence in the past as well as in the present. And above all, I enjoy it.",
"TODAY being me is good. Today I am happy with the person I am, I accept who I am.",
"TODAY I remember that I am unique. Like everyone else, I am unique, precious, special. Today, no comparison.",
"TODAY I have the right to make mistakes. I could be wrong, and that's okay. I'm not going to blame myself, because today, I have the right to make mistakes."
]
// Create a reference to the quoteText element
const quoteText = useRef(null);

// Generate a random number between 0 and the length of the quotes array
const randomNumber = Math.floor(Math.random() * quotes.length);

// Select a random quote from the quotes array
const randomQuote = quotes[randomNumber];


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
        <Animated.View style={[backAnimatedStyle, styles.card_front]}>
        {/* Wrap the Text component in a View component and apply the front animation styles */}
        <Text style={styles.quoteText}>{randomQuote}</Text>
        </Animated.View>
        </TouchableOpacity>
        {/* <BorderEffect size={100}/> */}
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
    },

    quoteText: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
      },
    
})
    

    

export default CardDraw;
