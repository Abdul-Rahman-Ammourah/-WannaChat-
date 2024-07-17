import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,Image } from "react-native";
//icons
import Search from "../Assets/Icons/Search.png";
export default function Call() {
    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Headertitle}>Calls</Text>

                <View style={styles.headerRight}>
                    
                    {/* Add a search bar */}

                    <TouchableOpacity onPress={null}>
                        <Image source={Search} style={styles.iconSearch} />
                    </TouchableOpacity>

                    
                </View>
            </View>

            <View style={styles.Body}>
                <Text>Calls</Text>
            </View>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    Header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: "#A1A1A1",
        paddingLeft: 10,
    },
    Headertitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#000000",
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    iconSearch: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    Body:{
        flex: 5,
        backgroundColor: "#fff",
    },
    Footer:{
        flex: 0.5,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#A1A1A1",
    }
})