import React, {useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

const ForgotPasswordScreen = () => {

    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const onSubmit = () =>{
        console.warn('New password updated!')
    }
    const onBackToSignIn = () => {
        console.warn('Back to sign in !')
    }
    return (
        <View style={styles.container}>
            
            <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
               <Text numberOfLines={1} style={styles.title}>Reset Your Password</Text>
               <CustomInput placeholder='Enter code' value={code} setValue={setCode}/>
               <CustomInput placeholder='Enter your new password' value={newPassword} setValue={setNewPassword}/>
               <CustomButton text={'SUBMIT'} onPress={onSubmit} />
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