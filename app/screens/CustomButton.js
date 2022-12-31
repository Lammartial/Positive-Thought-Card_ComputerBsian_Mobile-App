import { View, Text, StyleSheet, Pressable} from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text, type="primary"}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container,styles["conainter_"+type]]}>
      <Text style={[styles.text, styles["text_"+type]]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
       
        width: '50%',
        height: '5%',
        alignItems:'center',
        borderRadius:'5',
       
    },
    container_primary:{
       
        borderWidth:'2',
        borderColor:'white',
        
    },
    container_tertiary:{},
    
    text:{
        fontSize:'20',
        fontWeight:'bold',
        color:'white'
    },
    text_tertiary:{
        color:'grey',
        fontSize: '15',
        alignItems: 'baseline'
    }
})

export default CustomButton