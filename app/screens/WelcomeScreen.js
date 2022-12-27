import React, {useState} from 'react';
import { ImageBackground, StyleSheet, View, Pressable, Image, Dimensions, Alert, Text, Linking, TextInput} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay} from 'react-native-reanimated';
import CheckBox from 'expo-checkbox';
import {Audio} from 'expo-av';

const {height, width} = Dimensions.get("window");

function WelcomeScreen(props) {
    const [showValue, setShowValue] = useState(false);  //used for close button animation

    const [isRegistering, setIsRegistering] = useState(false); // set state for when to login and sign up

    const [isSelected, setSelection] = useState(false); // set state for check box

    const [isDisabled, setIsDisabled] = useState(false); // set state for disabling buttons and links when another view is placed on top

    const imagePosition = useSharedValue(1); 

    // elements sliding up animation
    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0,1], [-height/2 - 80, 0])
        return {
            transform: [{translateY: withTiming(interpolation, {duration: 400})}]
        }
    })

    const appNameAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0,1], [-height/2 + 40, 0])
        return {
            transform: [{translateY: withTiming(interpolation, {duration: 400})}]
        }
    })

    const bottomAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0,1], [-height/2, 0])
        return{
            opacity: withTiming(imagePosition.value, {duration: 400}),
            transform: [{translateY: withTiming(interpolation, {duration: 400})}]
        }
    })

    // animation for closing the X button
    const closeButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {duration: 500})

        }
    })

    const formAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: imagePosition.value === 0 ? withDelay(200, withTiming(1, {duration: 400})) : withTiming(0, {duration: 300})
        }
    })

    // what happen when log in link in main welcome screen pressed
    const LoginHandler = () => {
        imagePosition.value = 0;
        setShowValue(!showValue)  // make close button appear
        if (isRegistering) {
            setIsRegistering(false);
        }
        setDisabling();  // disabling welcome screen link when navigating to log in form
    }

    // what happen when sign up button pressed
    const signUpHandler = () => {

        imagePosition.value = 0;
        setShowValue(!showValue)  // make close button appear
        if (!isRegistering){
            setIsRegistering(true);
        }
        setDisabling();  // disabling welcome screen buttons when navigating to sign up form

    }

    const LoginLinkHandler = () => {
        imagePosition.value = 0;
        if (isRegistering) {
            setIsRegistering(false);
        }
    }

    const signUpLinkHandler = () => {
        imagePosition.value = 0;
        if (!isRegistering){
            setIsRegistering(true);
        }
    }

    // what happen when close X button pressed
    const closeButtonHandler = () => {
        imagePosition.value = 1
        setShowValue(!showValue)  // make close button disappear
        setEnabling();   // enable buttons and links when going back to welcome page

    }

    const setDisabling = () => {
        if (!isDisabled){
            setIsDisabled(true);
        }
    }

    const setEnabling = () => {
        if (isDisabled){
            setIsDisabled(false);
        }
    }

    return (
        <View style={styles.container}>
            <Animated.View style = {[StyleSheet.absoluteFill, imageAnimatedStyle]}>

                <ImageBackground 
                    source={require('../assets/images/background.jpg')} 
                    style={styles.background}>

                    <Image 
                        source = {require('../assets/images/taro.png')}
                        style = {styles.logo} />  

                </ImageBackground>
            </Animated.View>

            <Animated.View style = {[styles.appNameContainer, appNameAnimatedStyle]}>
                <Image 
                    source = {require('../assets/images/positive.png')}
                    style = {styles.appName_positive} />

                <Image 
                    source = {require('../assets/images/thoughtcard.png')}
                    style = {styles.appName_thoughtcard} />   

            </Animated.View>

        {/* container for the remaining components of main welcome screen */}
        <View style={styles.bottomContainer}>
            <Animated.View style = {bottomAnimatedStyle}>  
                <Text numberOfLines={1} style={styles.saveProgressText}> {"Sign up to save your progress!"}</Text>
                
                <Pressable 
                    disabled = {isDisabled}   // state of button
                    style = {styles.signUpButton} 
                    onPress= {signUpHandler}>
                                                            
                    <Text numberOfLines={1} style={styles.signUpButtonText}>{"Sign up"}</Text>
                </Pressable>   

                <Pressable 
                    disabled = {isDisabled}   // state of button
                    style={styles.GuestButton}
                    onPress = {() => Alert.alert("Guest button pressed!")}>


                    <Text numberOfLines={1} style={styles.ContinueAsGuestText}>{"Continue as Guest"}</Text>
                </Pressable> 
              
                <Text numberOfLines={1} style={styles.logInText}> {"Already have an account?"}</Text>
                
                <Text 
                    disabled={isDisabled}
                    style={styles.logInLink}
                    onPress={LoginHandler}> Log in
                </Text>

            </Animated.View>

            <Animated.View style = {[styles.closeButtonContainer, closeButtonAnimatedStyle]}> 
                {showValue? <Text 
                    style = {styles.closeButtonText}
                    onPress = {closeButtonHandler} > {"\u2715"} 
                </Text>: null}
            </Animated.View>

            {/* Creating login and sign up form */}

            {!isRegistering && (
                <Animated.View style = {[styles.loginFormInputContainer, formAnimatedStyle]}>

                    <View style = {styles.logInToContinueContainer}> 
                        <Text numberOfLines={1} style={styles.logInToContinueText}>
                            Log in to continue your 
                        </Text>

                        <Text numberOfLines={1} style={styles.logInToContinueText}>
                            progress
                        </Text>
                    </View>

                    <TextInput placeholder='Email:' placeholderTextColor = "black" style = {styles.textInput}/>
                    <TextInput placeholder='Password:' placeholderTextColor="black" style = {styles.textInput}/>

                    <Pressable 
                        style =  {styles.formButton} 
                        onPress={() => Linking.openURL('#')}>
                                                            
                        <Text numberOfLines={1} style={styles.formButtonText}>{isRegistering ? "Sign up": "Log in"}</Text>
                    </Pressable>   

                    <Text numberOfLines={1} style={styles.forgotPassText}> {"Forgot your password?"}</Text>
                    <Text 
                        style={styles.forgotPassLink}
                        onPress={() => Linking.openURL('#')}> Reset password
                    </Text>

                    <Text numberOfLines={1} style={styles.navigateFormText}> {"Don't have an account?"}</Text>
                
                    <Text 
                        style={styles.navigateFormLink}
                        onPress={signUpLinkHandler}> Sign up
                    </Text>

                </Animated.View>
            )}

            {isRegistering && (
                <Animated.View style = {[styles.loginFormInputContainer, formAnimatedStyle]}>

                    <View style = {styles.signUpToContinueContainer}> 
                        <Text numberOfLines={1} style={styles.signUpToContinueText}>
                            Sign up to save your progress!
                        </Text>

                        <Text style={styles.signUpDescription}>
                            Signing up will give you a great amount of benefits such as card draw history and rewards.
                        </Text>

                    </View>

                    <TextInput placeholder='Username:' placeholderTextColor = "black" style = {[styles.textInput, {bottom: 85}]}/>
                    <TextInput placeholder='Email:' placeholderTextColor = "black" style = {[styles.textInput, {bottom: 85}]}/>
                    <TextInput placeholder='Password:' placeholderTextColor="black" style = {[styles.textInput, {bottom: 85}]}/>

                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkBox}
                        />
                        <Text style={styles.checkBoxLabel}>By signing up, you agree to our <Text style = {styles.policyText} onPress={() => Linking.openURL('#')}>User Agreement</Text> and <Text style = {styles.policyText} onPress={() => Linking.openURL('#')}>Privacy Policy</Text></Text>
                    </View>

                    <Text numberOfLines={1} style={[styles.navigateFormText, {bottom: 54}]}> {"Already have an account?"}</Text>
                    <Text 
                        style={[styles.navigateFormLink, {bottom: 80}]}
                        onPress={LoginLinkHandler}> Log in
                    </Text>

                    <Pressable 
                        style =  {[styles.formButton, {bottom: 34, paddingHorizontal: 154}]} 
                        onPress={() => Linking.openURL('#')}>
                                                            
                        <Text numberOfLines={1} style={styles.formButtonText}>{isRegistering ? "Sign up": "Log in"}</Text>
                    </Pressable>   

                </Animated.View>
            )}


        </View>
    </View>    
    );
}

const styles = StyleSheet.create({
    // Main welcome screen styles
    // Styles for logo and app Name
    container: {
        flex:1,

    },

    background: {
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
        // borderBottomStartRadius: '50%',
        // borderBottomEndRadius: '50%',
        // overflow: 'hidden',
        
    },

    logo: {
        width: 200,
        height: 200,
        bottom: 190,
        alignItems: "center",
        
    },

    appNameContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },

    appName_positive: {
        width: 330,
        height: 70,
        bottom: -140,  // *4
        resizeMode: "contain",
    },

    appName_thoughtcard: {
        width: 400,
        height: 70,
        bottom: -115,  // *4

    },

    // styles for remaining components on the main screen
    bottomContainer: {
        flex: 1,
        justifyContent: "flex-end",
        height: height/3,
        alignItems: "center",
   
    },

    saveProgressText: {
        alignSelf: "center",
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        bottom: 48,  //*2

    },
    signUpButton: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 27,  //*5
        paddingVertical: 12,
        paddingHorizontal: 154,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "#2AB9E6",        
        },

    signUpButtonText: {

        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    GuestButton: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 18, // *5
        paddingVertical: 12,
        paddingHorizontal: 115,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "#555555",
        opacity: 0.8

    },

    ContinueAsGuestText: {

        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    logInText: {
        alignSelf: "center",
        fontSize: 11,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
        left: -28,
        bottom: 0
    },

    logInLink: {
        alignSelf: "center",
        fontSize: 11,
        lineHeight: 21,
        color: '#2FB5E2',
        textDecorationLine: "underline",
        left: 85,
        bottom: 27
        
    },

    closeButtonContainer: {
    
        height: 30,
        width: 30,
        left: 160,
        bottom: 675,
        justifyContent: "center",
        alignSelf: "center",
        
    },
    closeButtonText:{
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
    
    },

    // Log in form styles

    loginFormInputContainer: {
        marginBottom: 50,
        position: "absolute",
        ...StyleSheet.absoluteFill,
        zIndex: -1,
        justifyContent: "center",
    },

    logInToContinueContainer: {
        alignItems: "center"
    },

    logInToContinueText: {
        fontSize: 14,
        lineHeight: 17,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        bottom: 150,
    },

    forgotPassText: {
        alignSelf: "center",
        fontSize: 11,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'black',
        left: -60,
        bottom: 78
    },

    forgotPassLink: {
        alignSelf: "center",
        fontSize: 11,
        lineHeight: 21,
        color: '#2FB5E2',
        textDecorationLine: "underline",
        left: 80,
        bottom: 104
    },

    navigateFormText: {
        alignSelf: "center",
        fontSize: 11,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'black',
        left: -30,
        bottom: 40
    },

    navigateFormLink: {
        alignSelf:"center",
        fontSize: 11,
        lineHeight: 21,
        color: '#2FB5E2',
        textDecorationLine: "underline",
        left: 85,
        bottom: 66
    },

    // Sign up form style

    signUpToContinueContainer: {
        alignItems: "center",
        justifyContent: "center"
    },

    signUpToContinueText: {
        fontSize: 14,
        lineHeight: 17,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        bottom: 140,
    },

    signUpDescription: {
        textAlign: "center",
        fontSize: 12,
        lineHeight: 17,
        letterSpacing: 0.25,
        color: 'white',
        bottom: 125,
    },

    checkBoxContainer: {
        justifyContent: "center",
        flexDirection: "row",
        bottom: 70,
      },

    checkBox: {
        alignSelf: "center",
        bottom: 2,
    },

    checkBoxLabel: {
        margin: 8,
        fontSize: 12,
    },

    policyText: {
        color: "#2AB9E6",
        fontWeight: "bold",
    },

    // Mutual form styles
    formButton:{
        alignSelf: 'center',
        justifyContent: 'center',
        bottom: -114,
        paddingVertical: 12,
        paddingHorizontal: 160,
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

    formButtonText: {

        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }, 

    textInput: {
    
        height: 50,
        fontSize: 12,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        paddingLeft: 0, // adjust placeholder position
        // borderWidth: 1,
        // borderColor: 'rgba(0,0,0,0.2 )',
        // borderRadius: 25,
        marginHorizontal: 15,   // adjust bottom input line position
        marginVertical: 8,
        bottom: 58,
    },
})

export default WelcomeScreen;

