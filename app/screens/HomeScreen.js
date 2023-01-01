import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';

function HomeScreen(){
    
    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Welcome")

            })
            .catch(error => alert(error.message))
    }

    return (
        <View style = {styles.container}>
            {!auth.currentUser.isAnonymous && (
                <View>
                    <Text style={alignSelf= "center"}>
                        Username: {auth.currentUser?.displayName}
                    </Text>
                    <Text style={alignSelf= "center"}>
                        Email: {auth.currentUser?.email}
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style = {styles.button}
                        onPress = {handleSignOut}>
                        <Text style = {styles.buttonText}> Sign out </Text>
                    </TouchableOpacity>

                </View>
            )}
            {auth.currentUser.isAnonymous && (
                <View>
                    <Text style = {styles.guestText}>
                        You are signed in as a guest.
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style = {styles.button}
                        onPress = {handleSignOut}>
                        <Text style = {styles.buttonText}> Sign out </Text>
                    </TouchableOpacity>

                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: -20,  //*5
        paddingVertical: 12,
        paddingHorizontal: 154,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "#2AB9E6",        
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },

    guestText: {
        alignSelf: "center"
    }

})

export default HomeScreen

