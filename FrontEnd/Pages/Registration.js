import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
// Designs
import Upperdesign from '../Assets/Designs/UpperDesign.png'
import Lowerdesign from '../Assets/Designs/LowerDesign.png'
// Title
import logo from '../Assets/Photos/Logo2.png'

export default function Registration({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.Header}>
                    <Image source={Upperdesign} style={styles.ImageHeader} />
                </View>

                <View style={styles.Content}>
                    <Image source={logo} style={styles.ContentTitle} />
                    <Text style={styles.ContentTextMain}>Login or create an account</Text>
                    
                    <TextInput
                        style={styles.ContentTextInput}
                        placeholder="Email" 
                        placeholderTextColor="rgba(0, 0, 0, 0.25)"
                    />
                                
                    <TextInput
                        style={styles.ContentTextInput}
                        placeholder="Password" 
                        placeholderTextColor="rgba(0, 0, 0, 0.25)"
                        secureTextEntry // Ensures that the password is hidden
                    />

                    <TouchableOpacity style={styles.ContentButton}>
                        <Text style={styles.ContentTextSub}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ContentButton} onPress={() => navigation.navigate('CreateAnAccount')}>
                        <Text style={styles.ContentTextSub}>Create an account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                        <Text style={styles.GoBackText}>Go back</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.Footer}>
                    <Image source={Lowerdesign} style={styles.ImageFooter} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A4B588',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        width: '90%',
        height: '95%',
        borderRadius: 25,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-between',  // Ensures that the Header and Footer are fixed
    },
    Header: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden', // Ensures child elements respect border radius
    },
    ImageHeader: {
        width: '100%',
        height: undefined,
        aspectRatio: 6.56,
        resizeMode: 'contain',
    },
    Content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ContentTitle: {
        
        resizeMode: 'contain',
    },
    ContentTextMain:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20
    },
    ContentTextInput:{
        paddingLeft: 14,
        textAlign: 'left',
        fontSize: 18,
        width: 250,
        borderRadius: 22,
        fontWeight: 'bold',
        backgroundColor: '#A4B588',
        marginTop: 20,
    },
    ContentTextSub:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    ContentButton:{
        marginTop: 20,
        width: 250,
        borderRadius: 22,
        backgroundColor: '#A4B588',
        padding: 10,
        alignItems: 'center',
    },
    Footer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        overflow: 'hidden', // Ensures child elements respect border radius
    },
    ImageFooter: {
        width: '101%',
        height: undefined,
        aspectRatio: 6.989,
        resizeMode: 'contain',
    },
    GoBackText: {
        color: "black",
        fontWeight: "bold",
        backgroundColor: "#A4B588",
        marginTop: 20,
        padding: 10,
        borderRadius: 22,
    }
});
