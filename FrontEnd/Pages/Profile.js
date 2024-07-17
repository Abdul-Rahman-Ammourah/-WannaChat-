import React from "react";
import { View,Text,StyleSheet } from "react-native";
//footer
import Footernav from "../Navigation/Navigationfooter";
export default function Call() {
    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Text>Header</Text>
            </View>

            <View style={styles.Body}>
                <Text>Profile</Text>
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