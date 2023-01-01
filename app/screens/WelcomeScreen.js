import React, {useEffect, useState} from 'react';
import { ImageBackground, StyleSheet, View, Image, Dimensions, Alert, Text, Linking, TextInput, KeyboardAvoidingView, TouchableOpacity, Easing} from 'react-native';
import {Animated as Animation} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay} from 'react-native-reanimated';
import CheckBox from 'expo-checkbox';
import {Audio} from 'expo-av';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const {height, width} = Dimensions.get("window");

function WelcomeScreen(props) {

    const [showValue, setShowValue] = useState(false);  //used for close button animation

    const [isRegistering, setIsRegistering] = useState(false); // set state for when to login and sign up

    const [isSelected, setSelection] = useState(true); // set state for check box

    const [isDisabled, setIsDisabled] = useState(false); // set state for disabling buttons and links when another view is placed on top

    const imagePosition = useSharedValue(1); 

    const resetFormPosition = useSharedValue(1); 

    // rotating logo back and forth animation
    const rotateValueHolder = new Animation.Value(0)

    const rotation = rotateValueHolder.interpolate({
        inputRange: [0,1],
        outputRange: ['-15deg', '10deg']
    })

    const startImageRotateAnimation = () => {
        Animation.loop(
            Animation.sequence([
              Animation.timing(rotateValueHolder, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
              }),
              Animation.timing(rotateValueHolder, {
                toValue: 0,
                duration: 4000,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
              }),
            ]),
          ).start();
    }

    // start rotating animation automatically
    useEffect(() => {

        startImageRotateAnimation();

    }, [rotation]);

    const logoRotatingStyle = {
      transform: [
        {
          rotate: rotation,
        },
      ],
    };


    // handle user info

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [resetEmail, setResetEmail] = useState('');  // email for reset password

    // handle firebase database for login and signup

    const navigation = useNavigation();

    const [switchToHome, setSwitchToHome] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user && switchToHome){
                navigation.navigate("Main")
            }
        })
        return unsubscribe 
    }, [switchToHome])

    const firebaseGuest = () => {
        playSound();
        auth
            .signInAnonymously();
            setSwitchToHome(true)
            
    }

    const firebaseLogIn = () => {
        playSound();
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials?.user;
                console.log('Logged in with', user .email)
            })
                .catch(error => {alert(error.message)});
    }
    
    const firebaseSignUp = () => {
        playSound();
        auth    
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Signed up with', user?.email)
            alert("You have successfully signed up. Please log in to continue!")
            return userCredentials.user.updateProfile({
              displayName: username
            });
          })
          .then(() => {
                // Call the LoginHandler function after successful sign up
                LoginHandler();
          })
          .catch(error => {
            alert(error.message);
          });
    };

    // send reset password link to email
    const [visible, setVisible] = useState(true);

    const sendPasswordResetEmail = () => {
        playSound();
        auth
          .sendPasswordResetEmail(resetEmail)
          .then(() => {
            setVisible(false)
          })
        
          .catch(error => {
            // Error occurred, inspect error.code
            alert(error.message);

          });
      }

    // handle playing button click sound
    const [sound, setSound] = React.useState();

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/sound/finger-snap.mp3'));
        setSound(sound);

        await sound.playAsync();
    }
    
        React.useEffect(() => {
            return sound
            ? () => {sound.unloadAsync();} : undefined;
        }, [sound]);

    // animation for sliding up elements
    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0,1], [-height/2 - 70, 0])
        return {
            transform: [{translateY: withTiming(interpolation, {duration: 400})}]
        }
    })

    // animation for reset password form sliding up
    const resetAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(resetFormPosition.value, [0,1], [-565, 0])
        return {
            transform: [{translateY: withTiming(interpolation, {duration: 400})}]
        }
    })

    const logoAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0,1], [-height/2 - 80, 0])
        return {
            
            transform: [{translateY: withTiming(interpolation, {duration: 400})}],  
        }
    })

    const appNameAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0,1], [-height/2 + 40, 0])
        return {
            transform: [{translateY: withTiming(interpolation, {duration: 400})}]
        }
    })

    // handle animation for the remaining components of welcome screen apart from logo and app name
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
            // transform: [{rotate:rotation}],  // make the logo continue rotating back and forth after closing the X button
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {duration: 500})
        }
    })

    // animation for pressing the arrow left icon in the reset password form
    const arrowLeftAnimatedStyle = useAnimatedStyle(() => {
        return {
            // transform: [{rotate:rotation}],  // make the logo continue rotating back and forth after closing the X button
            opacity: withTiming(resetFormPosition.value === 1 ? 0 : 1, {duration: 500})
        }
    })

    // animation for showing login and signup form
    const formAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: imagePosition.value === 0 ? withDelay(200, withTiming(1, {duration: 400})) : withTiming(0, {duration: 300})
        }
    })

    // what happen when log in link in main welcome screen pressed
    const LoginHandler = () => {
        playSound();
        imagePosition.value = 0;
        setShowValue(!showValue)  // make close button appear
        if (isRegistering) {
            setIsRegistering(false);
        }
        setDisabling();  // disabling welcome screen link when navigating to log in form
    }

    // When reset password link pressed
    const resetPassHandler = () => {
        playSound();
        resetFormPosition.value = 0;
        setDisabling();  // disabling welcome screen buttons when navigating to sign up form

    }

    // what happen when sign up button pressed
    const signUpHandler = () => {
        playSound();
        imagePosition.value = 0;
        setShowValue(!showValue)  // make close button appear
        if (!isRegistering){
            setIsRegistering(true);
        }
        setDisabling();  // disabling welcome screen buttons when navigating to sign up form

    }

    const LoginLinkHandler = () => {
        playSound();
        imagePosition.value = 0;
        if (isRegistering) {
            setIsRegistering(false);
        }
    }

    const signUpLinkHandler = () => {
        playSound();
        imagePosition.value = 0;
        if (!isRegistering){
            setIsRegistering(true);
        }
    }

    // what happen when close X button pressed
    const closeButtonHandler = () => {
        playSound();
        imagePosition.value = 1
        resetFormPosition.value = 1
        setShowValue(!showValue)  // make close button disappear
        setVisible(true) // make reset password input and button appear
        setEnabling();   // enable buttons and links when going back to welcome page

    }

    // what happen when arrow left icon pressed
    const arrowLeftHandler = () => {
        playSound();
        resetFormPosition.value = 1
        setVisible(true)
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
 
                </ImageBackground>
            </Animated.View>

            <Animated.View style = {[StyleSheet.absoluteFill, logoAnimatedStyle]}>
                <Animation.Image 
                        source = {require('../assets/images/taro.png')}
                        style = {[styles.logo, logoRotatingStyle]} />  

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
                
                <TouchableOpacity 
                    disabled = {isDisabled}   // state of button
                    activeOpacity={0.9} 
                    style = {styles.signUpButton} 
                    onPress= {signUpHandler}>
                                                            
                    <Text numberOfLines={1} style={styles.signUpButtonText}>{"Sign up"}</Text>
                </TouchableOpacity>   

                <TouchableOpacity
                    disabled = {isDisabled}   // state of button
                    activeOpacity={0.8} 
                    style={styles.GuestButton}
                    onPress = {firebaseGuest}>

                    <Text numberOfLines={1} style={styles.ContinueAsGuestText}>{"Continue as Guest"}</Text>
                </TouchableOpacity> 
              
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

            {/* show log in form when isRegistering = false  */}
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

                    <KeyboardAvoidingView behavior='padding'>   
                        <TextInput 
                            editable={isDisabled} 
                            placeholder='Email:' 
                            placeholderTextColor = "black" 
                            value = {email} 
                            onChangeText = {setEmail} 
                            style = {styles.textInput}/>

                        <TextInput 
                            editable={isDisabled} 
                            placeholder='Password:' 
                            placeholderTextColor="black" 
                            value = {password} 
                            onChangeText = {setPassword} 
                            style = {styles.textInput} secureTextEntry/>

                    </KeyboardAvoidingView>
                    <TouchableOpacity
                        
                        activeOpacity={0.8}    
                        style =  {styles.formButton} 
                        onPress={firebaseLogIn}>
                                                            
                        <Text numberOfLines={1} style={styles.formButtonText}>{isRegistering ? "Sign up": "Log in"}</Text>
 
                    </TouchableOpacity>

                    <Text numberOfLines={1} style={styles.forgotPassText}> {"Forgot your password?"}</Text>
                    <Text 
                        style={styles.forgotPassLink}
                        onPress={resetPassHandler}> Reset password
                    </Text>

                    <Text numberOfLines={1} style={styles.navigateFormText}> {"Don't have an account?"}</Text>
                
                    <Text 
                        style={styles.navigateFormLink}
                        onPress={signUpLinkHandler}> Sign up
                    </Text>

                    {/* Reset Password Form */}

                    <Animated.View style = {[StyleSheet.absoluteFill, styles.resetPasswordForm, resetAnimatedStyle]}>

                        <Animated.View style = {arrowLeftAnimatedStyle}>
                            <Text style = {styles.arrowLeftIcon}
                                onPress = {arrowLeftHandler}>
                                &#x2190;
                            </Text>
                        </Animated.View>

                        {/* <Text numberOfLines={1} style={styles.formButtonText}>{isRegistering ? "Sign up": "Log in"}</Text> */}

                        <Text numberOfLines={1} style={styles.resetPasswordText}>
                            {visible ? "Reset your password": "Check your email"}
                        </Text>

                        <Text numberOfLines={1} style={styles.resetPasswordDescription1}>
                            {visible ? "Enter your email you used for creating your account and ": "We sent you an email. Follow the instruction to reset"}
                        </Text>

                        <Text numberOfLines={1} style={styles.resetPasswordDescription2}>
                            {visible ? "we'll send you a link to reset your password": "your password and sign back in"}
                        </Text>

                        {visible && (
                            <View>
                            <TextInput 
                                
                                editable={isDisabled} 
                                placeholder='Email:' 
                                placeholderTextColor = "black" 
                                value = {resetEmail} 
                                onChangeText = {setResetEmail} 
                                style = {styles.resetTextInput}/>

                            <TouchableOpacity 
                            
                                disabled = {!isDisabled}   // state of button
                                activeOpacity={0.9} 
                                style = {[styles.formButton, {zIndex: -1, bottom: -148}]} 
                                onPress= {sendPasswordResetEmail}>
                                                                        
                                <Text numberOfLines={1} style={styles.formButtonText}>{"Reset"}</Text>
                            </TouchableOpacity>  
                            
                        </View> 
                        )}
                        
                    </Animated.View>
                </Animated.View>

                
            )}

            {/* show sign up form when isRegistering = true  */}
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
                    
                    <KeyboardAvoidingView behavior='padding'>   

                        <TextInput 
                            editable={isDisabled} 
                            placeholder='Username:' 
                            placeholderTextColor = "black" 
                            value = {username} 
                            onChangeText={setUsername} 
                            style = {[styles.textInput, {bottom: 85}]}/>

                        <TextInput 
                            editable={isDisabled} 
                            placeholder='Email:' 
                            placeholderTextColor = "black"
                            value = {email} 
                            onChangeText = {setEmail}  
                            style = {[styles.textInput, {bottom: 85}]}/>

                        <TextInput 
                            editable={isDisabled} 
                            placeholder='Password:' 
                            placeholderTextColor="black" 
                            value = {password} 
                            onChangeText = {setPassword} 
                            style = {[styles.textInput, {bottom: 85}]} secureTextEntry/>

                    </KeyboardAvoidingView>
 
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                        disabled={true}
                        value={isSelected}
                        onValueChange={setSelection}
                        style={[styles.checkBox, {disabledText: "blue"}]}

                        />
                        <Text style={styles.checkBoxLabel}>By signing up, you agree to our <Text style = {styles.policyText} onPress={() => Linking.openURL('#')}>User Agreement</Text> and <Text style = {styles.policyText} onPress={() => Linking.openURL('#')}>Privacy Policy</Text></Text>
                    </View>

                    <Text numberOfLines={1} style={[styles.navigateFormText, {bottom: 54}]}> {"Already have an account?"}</Text>
                    <Text 
                        style={[styles.navigateFormLink, {bottom: 80}]}
                        onPress={LoginLinkHandler}> Log in
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.8} 
                        style =  {[styles.formButton, {bottom: 34, paddingHorizontal: 154}]} 
                        onPress={firebaseSignUp}>
                                                            
                        <Text numberOfLines={1} style={styles.formButtonText}>{isRegistering ? "Sign up": "Log in"}</Text>
                    </TouchableOpacity>   

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
        bottom: -80,
        alignSelf: "center",
   
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
        opacity: 0.9

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

    resetPasswordForm:{
    
        height: 700,
        top: 370,  // -190 when sliding up
        justifyContent: "flex-start",
        backgroundColor: "white",
        borderTopLeftRadius: '30%',
        borderTopRightRadius: '30%',

    },

    resetPasswordText: {
        top: 30,
        fontWeight: "bold",
        fontSize: 18,
        paddingLeft: 20,
        letterSpacing: 0.75,
    },

    resetPasswordDescription1: {
        top: 45,
        fontSize: 12,
        paddingLeft: 20,

    },

    resetPasswordDescription2: {
        top: 45,
        fontSize: 12,
        paddingLeft: 20,

    },

    resetTextInput: {
        height: 57,
        fontSize: 12,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        paddingLeft: 0, // adjust placeholder position
        // borderWidth: 1,
        // borderColor: 'rgba(0,0,0,0.2 )',
        // borderRadius: 25,
        marginHorizontal: 15,   // adjust bottom input line position
        marginVertical: 8,
        bottom: -102,
    },

    arrowLeftIcon: {
        top: 20,
        paddingLeft: 24,
        fontSize: 22,
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


