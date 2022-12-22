import React from 'react';
import { ImageBackground, StyleSheet, View, Pressable, Button, Dimensions, Alert, Image, Text, Linking } from 'react-native';

const {height, width} = Dimensions.get("window");
function WelcomeScreen(props) {

    return (
        
        <View style={styles.container}>
            <ImageBackground 
                source={require('../assets/background.jpg')} 
                resizeMode="cover" 
                style={styles.background}>

                <Image 
                    source = {require('../assets/taro.png')}
                    style = {styles.logo} />

                <Image 
                    source = {require('../assets/positive.png')}
                    style = {styles.appName_positive} />

                <Image 
                    source = {require('../assets/thoughtcard.png')}
                    style = {styles.appName_thoughtcard} />     

                <Text numberOfLines={1} style={styles.saveProgressText}> {"Sign up to save your progress!"}</Text>



                <Pressable 
                    style={styles.signUpButton} 
                    onPress={() => Alert.alert('SignUp Button pressed')}>
                    <Text numberOfLines={1} style={styles.signUpButtonText}>{"Sign up"}</Text>
                </Pressable>    

                <Pressable 
                    style={styles.GuestButton} 
                    onPress={() => Alert.alert('Continue as Guest Button pressed')
                    }>
                    <Text numberOfLines={1} style={styles.ContinueAsGuestText}>{"Continue as Guest"}</Text>
                </Pressable> 

                <Text numberOfLines={1} style={styles.logInText}> {"Already have an account?"}</Text>
                <Text 
                    style={styles.logInLink}
                    onPress={() => Linking.openURL('#')}> Log in
                </Text>
                
            </ImageBackground>
        </View>

    // <ImageBackground 
    // style = {styles.background}
    // source = {require('../assets/background.jpg')}
    // > 
    //     <View> style = {styles.loginButton} </View>

    // </ImageBackground> 
    );
}


const styles = StyleSheet.create({
    container: {
        flex:1
    },

    logo: {
        width: 200,
        height: 200,
        bottom: 150,
        alignItems: "center",
        
    },

    appName_positive: {
        width: 330,
        height: 70,
        bottom: 47,
        resizeMode: "contain",
    },

    appName_thoughtcard: {
        width: 400,
        height: 70,
        bottom: 73,

    },

    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",

    },

    saveProgressText: {

        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        bottom: 79,

    },
    signUpButton: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 57,
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
        bottom: 49,
        paddingVertical: 12,
        paddingHorizontal: 113,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "#555555", 
        // "#3D3C66"
    },

    ContinueAsGuestText: {

        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    logInText: {

        fontSize: 11,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
        left: -28,
        bottom: 30
    },

    logInLink: {
        fontSize: 11,
        lineHeight: 21,
        color: '#2FB5E2',
        textDecorationLine: "underline",
        left: 85,
        bottom: 57
        
    }
})

export default WelcomeScreen;

