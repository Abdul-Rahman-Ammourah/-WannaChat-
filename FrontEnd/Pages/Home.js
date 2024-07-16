import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Modal } from "react-native";
//Icons
import HeaderContainer from "../Assets/Icons/HeaderOptionsContainer.png";
import Search from "../Assets/Icons/Search.png";
import Settings from "../Assets/Icons/Settings.png";
//Images
import filePic from "../Assets/Photos/MePhoto.jpg";
//Navigation bar
import Footernav from "./Navigationfooter";
export default function Home({ navigation }) {
    const [user, setUser] = useState([{
        ProfilePic: filePic,
        username: "user",
        status: "Online",
    }]);

    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={null}>
            <View style={styles.contact}>
                <TouchableOpacity onLongPress={null}>
                    <Image source={item.ProfilePic} style={styles.contactImage} />
                </TouchableOpacity>
                <View style={styles.contactText}>
                    <Text style={styles.contactName}>{item.username}</Text>
                    <Text style={styles.contactStatus}>{item.status}</Text>
                </View>
            </View>
            </TouchableOpacity>
        );
    };

    const newuser = () => {
        const newuser = {
            ProfilePic: filePic,
            username: "WannaChat" + Math.floor(Math.random() * 1000),
            status: "Online",
        };
        setUser([...user, newuser]);
    };

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
                <FlatList
                    data={user}
                    renderItem={RenderItem}
                    keyExtractor={(item) => item.username}
                    contentContainerStyle={styles.contentList}
                    style={styles.list}>
                </FlatList>

                <TouchableOpacity style={styles.button} onPress={newuser}>
                    <Text style={styles.buttonText}>Add user</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Footernav navigation={navigation} />
            </View>
        </View>
    );
}

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
        width: 90,
        height: 90,
        resizeMode: "contain",
    },
    iconSearch: {
        position: 'absolute',
        right: 50, // Adjust this value based on your layout
        width: 22,
        height: 22,
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
        flexDirection: 'row',
        backgroundColor: "#A1A1A1",
        alignItems: 'center',
        height: 75,
        width: 350,
        borderRadius: 25,
        padding: 10,
        marginBottom: 5,
        marginTop: 5,
        },
    contactImage: {
        width: 55,
        height: 55,
        borderRadius: 30,
        resizeMode: "contain",
        marginRight: 15,
    },
    contactText: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        color: "#000000",
        fontWeight: "bold",
    },
    contactStatus: {
        fontSize: 12,
        color: "green",
        fontWeight: "bold",
    },
    
    button: {
        position: 'absolute',
        width: 100,
        backgroundColor: '#6495ED', // Blue color for the button
        padding: 10,
        borderRadius: 15,
        bottom: 30,
        right: 5
    },
    footer: {
        flex: 0.5,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#A1A1A1",
    },
    list: {
        flexDirection: 'column',
    },
    contentList: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: 'center',
    }
});
