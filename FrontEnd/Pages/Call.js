import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
// Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Images
import filePic from "../Assets/Photos/MePhoto.jpg";
import addEmpty from "../Assets/Icons/addEmpty.png";
export default function Call({ navigation }) {
    const [calls, setCalls] = useState([{
        ProfilePic: filePic,
        username: "user",
        callStatus: "Missed Call",
    }]);
    const [search, setSearch] = useState("");
    // LATER
    // later
    // LATER
    const RenderItem = ({ item }) => {
        return (
            // send the username to the call page
            <TouchableOpacity onPress={() => navigation.navigate("Call")}> 
                <View style={styles.contact}>
                    <TouchableOpacity onLongPress={null}>
                        <Image source={item.ProfilePic} style={styles.contactImage} />
                    </TouchableOpacity>
                    <View style={styles.contactText}>
                        <Text style={styles.contactName}>{item.username}</Text>
                        <Text style={styles.contactStatus}>{item.callStatus}</Text>
                    </View>
                    <Icon name="phone" size={28} color="green" />
                </View>

                <Icon name="clock-alert-outline" size={54} color="green" style={{justifyContent: 'center', alignSelf: 'center'}} />
            </TouchableOpacity>
        );
    };

    const newCall = () => {
        const newCall = {
            ProfilePic: filePic,
            username: "Caller" + Math.floor(Math.random() * 1000),
            callStatus: "Outgoing Call",
        };
        setCalls([...calls, newCall]);
    };

    const filteredCalls = calls.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.Headertitle}>Call Logs</Text>

                <View style={styles.headerRight}>
                    <Searchbar
                        placeholder="Search calls..."
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        onChangeText={setSearch}
                        style={styles.search}
                        inputStyle={styles.input}
                        onIconPress={() => console.log('Search icon pressed')}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Icon name="account-circle" size={35} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Call Logs List */}
            <View style={styles.body}>
                <FlatList
                    data={filteredCalls}
                    renderItem={RenderItem}
                    keyExtractor={(item) => item.username}
                    contentContainerStyle={styles.contentList}
                    style={styles.list}
                />

                {/* Add new call button */}
                <TouchableOpacity style={styles.button} onPress={newCall}>
                    <Image source={addEmpty} style={styles.buttonImage} />
                </TouchableOpacity>
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
    search: {
        height: 40,
        width: 235,
    },
    Headertitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000",
        marginRight: 5,
    },
    headerRight: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    body: {
        flex: 5,
        backgroundColor: "#fff",
    },
    contact: {
        flexDirection: 'row',
        backgroundColor: "#D3ECFF",
        alignItems: 'center',
        width: 395,
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
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
        color: "red",
        fontWeight: "bold",
    },
    button: {
        position: 'absolute',
        width: 50,
        height: 50,
        padding: 10,
        borderRadius: 15,
        bottom: 35,
        right: 20,
    },
    buttonImage: {
        width: 36,
        height: 36,
        resizeMode: "contain",
    },
    list: {
        flexDirection: 'column',
    },
    contentList: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        bottom: 8,
        fontSize: 16,
    },
});
