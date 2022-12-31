import React, {useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

const ForgotPasswordScreen = () => {

    const [username, setUsername] = useState('');
    const onSendCode = () =>{
        console.warn('Send code!')
    }
    const onBackToSignIn = () => {
        console.warn('Back to sign in !')
    }
    return (
        <View style={styles.container}>
            
            <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
               <Text numberOfLines={1} style={styles.title}>Reset Your Password</Text>
               <CustomInput placeholder='enter your username' value={username} setValue={setUsername}/>
               <CustomButton text={'Send code'} onPress={onSendCode} />
               <CustomButton text={'Back to Sign In'} onPress={onBackToSignIn} type={"tertiary"}/>
              
            
            </ImageBackground>

           
       
        
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    background: {
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        width: '100%',
        // borderBottomStartRadius: '50%',
        // borderBottomEndRadius: '50%',
        // overflow: 'hidden',
        
    },
    title:{
        color: "white",
        fontSize: 33,
        fontWeight: "bold",
        alignItems:'center',
      
     
    },
   
   
})
export default ForgotPasswordScreen