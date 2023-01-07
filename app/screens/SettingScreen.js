import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Alert, Easing, LayoutAnimation} from 'react-native';
import {Animated as Animation} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import Slider from '@react-native-community/slider';

function SettingScreen() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View
                style = {[styles.childContainer, {height: 40, width: '100%', bottom: 280,}]}>
                <Text style = {styles.settingText}> Settings</Text>

                <TouchableOpacity activeOpacity={0.6} style = {[StyleSheet.absoluteFill, {position: "absolute"}]} onPress = {() => {navigation.navigate('Main')}}>
                <Image
                    source={require('../assets/images/slide_left.png')}    
                    style = {styles.goBackIcon}

                />
                </TouchableOpacity>

                <View style={styles.line} />

            </View>

            <Text style = {[styles.titleText, {bottom: 240,}]}> OPTIONS: </Text>

            <View
                style = {[styles.childContainer, {height: 115, width: '95%', bottom: 230, borderRadius: '10%'}]}>
                <Text style = {[styles.customizeText, { bottom: 20}]}> Music</Text>
                <Text style = {[styles.customizeText, { bottom: -12}]}> Sounds</Text>

            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#071b69",
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',

    },

    childContainer: {
        backgroundColor: "#142573",
        alignItems: 'center', 
        justifyContent: 'center',
    },

    settingText: {
        color: "white",
        fontSize: 13,
        fontWeight: "bold",
        top: -3,

    },

    titleText: {
        color: "grey",
        fontSize: 10,
        letterSpacing: 1.5,
        left: -160,

    },

    customizeText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
        left: -160,

    },

    line: {
        height: 3, 
        width: '25%', 
        backgroundColor: '#fff',
        bottom: -8
    },

    goBackIcon: {
        top: 12,
        left: 20,
        height: 18,
        width: 18,
    },
})

export default SettingScreen;