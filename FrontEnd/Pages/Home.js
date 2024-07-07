import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
//Icons
import HeaderContainer from "../Assets/Icons/HeaderOptionsContainer.png";
import Search from "../Assets/Icons/Search.png";
import Settings from "../Assets/Icons/Settings.png";
//Navigation bar
import Footernav from './Navigationfooter'

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.Headertitle}>WannaChat</Text>
                <View style={styles.headerRight}>
                    <Image source={HeaderContainer} style={styles.ImageHeader} />
                    <TouchableOpacity onPress={null}> 
                        <Image source={Search} style={styles.iconSearch} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={null}>
                        <Image source={Settings} style={styles.iconSettings} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.contact}>
                    <Text>Contacts</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Footernav navigation={navigation} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
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
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    ImageHeader: {
        resizeMode: "contain",
    },
    iconSearch: {
        position: 'absolute',
        right: 40, // Adjust this value based on your layout
        width: 20,
        height: 20,
        bottom: -10
    },
    iconSettings: {
        position: 'absolute',
        right: 15, // Adjust this value based on your layout
        bottom: -10,
    },
    body: {
        flex: 5,
        backgroundColor: "#fff",
    },
    contact: {
        backgroundColor: "#A1A1A1",
        alignItems: 'center',
        justifyContent: 'center', // Center the text vertically
        height: 75,
        margin: 10,
        borderRadius: 10,
        padding: 10,
    },
    footer: {
        flex: 0.5,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#A1A1A1",
    },
});
