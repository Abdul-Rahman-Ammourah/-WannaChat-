import React from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";


export default function Footernav({navigation}) {
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.footerButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('CreateAnAccount')}>
                <Text style={styles.footerButtonText}>Create an account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={null}>
                <Text style={styles.footerButtonText}>Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        height: 60,
        borderTopWidth: 1,
        borderTopColor: "#A1A1A1",
    },
    footerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerButtonText: {
        fontSize: 16,
        color: "#000",
    },
})