import React from "react";
import { View, Text, Button, StyleSheet, Image,TouchableOpacity } from "react-native";
// Designs
import Upperdesign from '../Assets/Designs/UpperDesign.png'
import Lowerdesign from '../Assets/Designs/LowerDesign.png'
//Title
import logo from '../Assets/Photos/Logo.png'
//Icons
import Getstarted from '../Assets/Icons/GetStarted.png'

export default function Welcome({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.Header}>
                    <Image source={Upperdesign} style={styles.ImageHeader} />
                </View>

                <View style={styles.Content}>
                    <Image source={logo} style={styles.ContentTitle} />
                    <Text style={styles.ContentTextMain}>Welcome to my sweet messaging app</Text>
                    <Text style={styles.ContentTextSub}>Created by the one and only</Text>
                    <Text style={styles.ContentTextSub}>Abdul-Rahman Ammourah</Text>
                    <Text style={styles.ContentTextSub2}>Get Started</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                        <Image source={Getstarted} style={styles.ContentLogo} />
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
        
        bottom: 105,
        resizeMode: 'contain',
    },
    ContentTextMain:{
        bottom: 50,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 45
    },
    ContentTextSub:{
        textAlign: 'center',
        fontSize: 18,
        
    },
    ContentTextSub2:{
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold',

    },
    ContentLogo: {
        top : 50,
        resizeMode: 'contain',
    },
    Footer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
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
});
