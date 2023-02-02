import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Dimensions, Animated, SafeAreaView, TouchableOpacity, Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements'; 
import { Easing,} from 'react-native-reanimated';

const {height, width} = Dimensions.get("window");

function CardDraw() {

    let animatedValue = new Animated.Value(0)
    let currentValue = 0
    animatedValue.addListener(({value}) => {
        currentValue = value
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
        
        setIsVisible(true)   // show the quote every time the card is flipped

        if (currentValue >= 90) {
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

    const cardMotion = useRef(new Animated.Value(0)).current;
    // useEffect (() => {
    //     runCardAnimation();
    // }, []);

    // the above code automatically plays card animation from scratch


    const runCardAnimation = () => {
        setIsVisible(false)  // hide the quote when run the animation again

        setIsCardDeckVisible(false) // hide the card deck

        setIsButtonDisabled(true) // disable draw card button

        setIsButtonVisible(false); // hide the draw card button

        setShowDrawAnimation(true)  // draw card animation visible

        startAnimation();

        // select a new card back image
        const randomIndex = Math.floor(Math.random() * imageFiles.length);
        setCurrentImage(imageFiles[randomIndex]);

        // reset cardMotion to original value after animation completes
        cardMotion.setValue(0);

        // Generate a random number between 0 and the length of the quotes array
        const randomNumber = Math.floor(Math.random() * quotes.length);

        // Select a random quote from the quotes array
        setRandomQuote(quotes[randomNumber]);

        setTimeout(() => {
            Animated.timing(cardMotion, {
                toValue: height + 150,
                duration: 1500,
                useNativeDriver: false,
                easing: Easing.exp
            }).start();
        }, 1500);

    }


    // handle animation for displaying the draw card button
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)


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
      "TODAY I savor what I eat. I enjoy eating. I have the right to eat what I like. I savor the food.",
      "TODAY I finish doing something. I choose something I have to do, and I finish it.",
      "TODAY I am sensitive to musical sounds. I put awareness into my listening. I take the time to listen to the sounds around me and discover their musicality.",
      "TODAY I walk saying “thank you” with every step. At each step I say thank you. And during the day I take at least 3 minutes to do it.",
      "TODAY I look at someone deep in the eyes. I take the time to look at someone in eyes, and I stay longer than usual to experience this quality of contact.",
      "TODAY I am a tourist who discovers. I allow myself to look at things surrounding me with a brand-new eye.",
      "TODAY I have audacity. I experience the pleasure of being audacious - this mixture of courage, freedom, adventure, grace, and exceptionality.",
      "TODAY I welcome all my fragilities with kindness. I accept my flaws, my vulnerabilities, my failings. All of this makes me a complete and sensitive being whom I respect with empathy and compassion.",
      "TODAY I feel the joy of being kind. I see my generosity and benevolence in the past as well as in the present. And above all, I enjoy it.",
      "TODAY Being me is good. Today I am happy with the person I am, I accept who I am.",
      "TODAY I remember that I am unique. Like everyone else, I am unique, precious, special. Today, no comparison.",
      "TODAY I have the right to make mistakes. I could be wrong, and that's okay. I'm not going to blame myself, because today, I have the right to make mistakes."
      ]

    // choosing random quote
    const [randomQuote, setRandomQuote] = useState('')

    // choosing random card back image 
    const imageFiles = [
        require('../assets/images/card_back.jpg'),
        // add more images here as necessary
    ];

    const [currentImage, setCurrentImage] = useState(imageFiles[0]);

    // title TODAY of quote
    const today = randomQuote.substring(0, randomQuote.indexOf(' '))

    // rest of quote content
    const content = randomQuote.substring(randomQuote.indexOf(' ') + 1)

    const sentences = content.split('.')

    let counter = 0;  // adjust the bottom position of each sentence in a quote

    // set where the quote is visible
    const [isVisible, setIsVisible] = useState(false);

    // initial card deck
    let card_deck = [];

    for (let i = 0; i < 9; i++) {
        card_deck.push(

            <Animated.Image 
            key={i}
            source = {currentImage}
            style = {styles.card_deck} 
            />
        )
    }

    // visibility of card animation
    const [showDrawAnimation, setShowDrawAnimation] = useState(false);

    // visibility of card deck
    const [isCardDeckVisible, setIsCardDeckVisible] = useState(true);

    // Card of the day text
    const [viewOpacity] = useState(new Animated.Value(0));
    const [animationRunning, setAnimationRunning] = useState(false);

    // display text animation
    const startAnimation = () => {
        Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => setAnimationRunning(false));
        setAnimationRunning(true);
    };

    return (
        <ImageBackground
            source={require('../assets/images/themedraw.jpg')} 
            resizeMode="cover" 
            style={styles.background}>
        <SafeAreaView style={styles.container}>
       
        {isCardDeckVisible &&
            <Animated.View style={styles.deck_container}>
                {card_deck}
            </Animated.View>
        }

        {/* draw card button */}

        <Animated.View style = {[styles.drawButtonStyle]}>
            
          {isButtonVisible && 
          
            <TouchableOpacity 
              
              disabled = {isButtonDisabled}
              activeOpacity={0.8}    
              style = {styles.drawCardButton}
              onPress = {runCardAnimation} >
                                                          
              <Text numberOfLines={1} style={styles.drawCardButtonText}>{"Draw a new card"}</Text>
  
          </TouchableOpacity> }

      </Animated.View>  

      <Animated.View style={[styles.newCardTextContainer, {opacity: viewOpacity}]}>
            <Text style = {styles.newCardText}>{"Here is your card"}</Text>
            <Text style = {styles.newCardText}>{"of the day"}</Text>
      </Animated.View>
        

        {/* display this card animation when clicking the draw button */}
            
        {showDrawAnimation && (
            
            <Animated.Image
            
            source = {currentImage}
            style = {[frontAnimatedStyle, styles.card_back, {opacity: frontOpacity, marginTop: cardMotion}]}/>

        )}

        {showDrawAnimation && (
        <TouchableOpacity
        style = {styles.buttonStyle}
        onPress = {flipAnimation}>
        
        <Animated.Image
        
            source = {require('../assets/images/card_front.jpg')}
            style = {[backAnimatedStyle, styles.card_front, {opacity: backOpacity, marginTop: cardMotion}]}/>

        <Animated.View style={[backAnimatedStyle, styles.text_container]}>
           {/* Wrap the Text component in a View component and apply the back animation styles */}
           {isVisible && (

                <Text style={[styles.quoteText, {fontSize: 22, fontWeight: "bold", color: "#fba0b5"}]}>{today}</Text>
                )}

                {/* display the quote more nicely */}

            {isVisible && (                
                <View>
                    {sentences.map((sentence) => (
                        <Text style={[styles.quoteText, {top: counter += 20}]} key={sentence}>{sentence}</Text>

                    ))}

                </View>
            )}

            </Animated.View>
        
    </TouchableOpacity>
        )}

        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },

    text_container: {
        width: 330,
        height: 540,
        bottom: height-height/4,
        backgroundColor:"transparent",
        backfaceVisibility:"hidden"
    },

    deck_container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        bottom: height + 50,
    },

    card_deck: {  
        width: 105,
        height: 175,
        margin: 10,
        backgroundColor:"transparent",  
    },

    card_back: {
        width: 330,
        height: 540,
        bottom: height + height/19,
        alignItems: 'center',
        backgroundColor:"transparent",
        
    },
    card_front: {
        width: 330,
        height: 540,
        bottom: height/3,
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
        bottom: height + 540
    },
    buttonTextStyle: {
        color: 'transparent',
        fontSize: 20,
        backfaceVisibility:"hidden",
    },

    quoteText: {
        backfaceVisibility:"hidden",
        top: 0,
        marginLeft: 30,
        marginRight: 30,
        bottom: 0,
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
      },

      drawButtonStyle: {
        position: "absolute",
        alignSelf: 'center',
        justifyContent: 'center',
        bottom: 15,
    },

      drawCardButton: {

        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "#2AB9E6",  
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
      },

      drawCardButtonText: {

        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }, 

      newCardTextContainer: {
            position: 'absolute',
            zIndex: 1,
            top: 30,
            alignSelf: "center",
        },

      newCardText: {
        alignSelf: "center",
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',

    },

})
    

export default CardDraw;