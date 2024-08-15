import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList} from "react-native";
import { Searchbar } from "react-native-paper";
//Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import addEmpty from "../Assets/Icons/addEmpty.png";
//Images
import filePic from "../Assets/Photos/MePhoto.jpg";
export default function Home({navigation}) {
    const [user, setUser] = useState([{
        ProfilePic: filePic,
        username: "user",
        status: "Online",
    }]);
    const [search, setSearch] = useState("");

    const RenderItem = ({ item }) => {
        return (
            // send the username to the chat page
            <TouchableOpacity onPress={() => navigation.navigate("Chat")}> 
            
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

    const filteredUsers = user.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase())
      );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.Headertitle}>WannaChat</Text>

                <View style={styles.headerRight}>
                
                    <Searchbar 
                        placeholder="Search here..."
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        onChangeText={setSearch} 
                        style={styles.search}
                        inputStyle={styles.input}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Icon name="account-circle" size={35} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.body}>
                <FlatList
                    data={filteredUsers}
                    renderItem={RenderItem}
                    keyExtractor={(item) => item.username}
                    contentContainerStyle={styles.contentList}
                    style={styles.list}>
                </FlatList>
                


                <TouchableOpacity style={styles.button} onPress={newuser}>
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
    search:{
        height: 40,
        width: 225,
    },
    Headertitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000",
        marginRight: 5
    },
    headerRight: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        
        marginRight: 10,
    },
    iconSearch: {
        position: 'absolute',
        right: 10, // Adjust this value based on your layout
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
        backgroundColor: "#D3ECFF",
        alignItems: 'center',
        width: 395,
        padding: 10,
        borderRadius: 20,
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
        width: 50,
        height: 50,
        //backgroundColor: 'black',
        padding: 10,
        borderRadius: 15,
        bottom: 35,
        right: 20
    },
    buttonImage: {
        width: 36,
        height: 36,
        resizeMode: "contain",
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
    },
    input: {
        bottom:8,
        fontSize: 16,
    },
});
