import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({value, setValue, placeholder}) => {
  return (
    <View style={styles.container}>
      <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input}/>
    </View> 
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width:'95%',
        height:'6%',
        borderColor:'#e8e8e8',
        borderRadius: '5',
        marginVertical:'2%'
    },
    input:{
        fontSize:'22',
        
    }
})
export default CustomInput