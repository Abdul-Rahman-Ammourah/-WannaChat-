import React from "react";
import { View,Text,TouchableOpacity } from "react-native";


export default function CreateAnAccount({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text >Create an account</Text>


            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                        <Text style={{color:"black",fontWeight:"bold",backgroundColor:"#A4B588",marginTop:20}}>Go back</Text>
            </TouchableOpacity>
        </View>
    );
}