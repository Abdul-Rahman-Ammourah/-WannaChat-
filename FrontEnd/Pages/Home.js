import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert, TextInput } from "react-native";
import { Modal, Searchbar, Snackbar, Button,IconButton } from "react-native-paper";
import { getUser } from "../API/api";
import { NavContext } from "../Context/Context";
import { EmailCheck } from "../Services/InputValidation";
//Assets
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import filePic from "../Assets/Photos/MePhoto.jpg";

export default function Home({ navigation }) {
    const { setReceiverEmail,setPublicKey,setChatUsername } = useContext(NavContext);
    const [users, setUsers] = useState([]);
    const [addEmail, setAddEmail] = useState("");
    const [search, setSearch] = useState("");
    const [visible, setVisible] = useState({
        Snackbar: false,
        Modal: false,
    });

    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setReceiverEmail(item.email);
                    setChatUsername(item.username);
                    navigation.navigate("Chat");
                }}
            >
                <View style={styles.contact}>
                    <TouchableOpacity onLongPress={null}>
                        <Image source={item.ProfilePic} style={styles.contactImage} />
                    </TouchableOpacity>
                    <View style={styles.contactText}>
                        <Text style={styles.contactName}>{item.username}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const fetchUser = async (email) => {
        try {
            const response = await getUser(email);
            if (response) {
                const alreadyExists = users.some(user => user.username.toLowerCase() === username.toLowerCase());
                if (!alreadyExists) {
                    const username = response.username;
                    // Fetch the Profile Pic from the database
                    setPublicKey(response.publicKey);
                    setUsers(prevUsers => [...prevUsers, { username, ProfilePic: filePic, email }]);
                    setAddEmail(""); // Clear the input field
                } else {
                    setVisible({ ...visible, Snackbar: true });
                }
            }
        } catch (error) {
            if (error.response) {
                console.error('Fetch User Error:', error.response.data);
                Alert.alert('Fetch User Error', error.response.data);
            } else {
                Alert.alert('Fetch User Error', 'Network Error or Server Down');
            }
        }
    };

    const handleAddUser = () => {
        if (addEmail.trim() === "") {
            Alert.alert("Invalid Input", "Please enter an email address.");
            return;
        }
        if(EmailCheck(addEmail)){
            fetchUser(addEmail);
        }else{
            Alert.alert("Invalid Input", "Please enter a valid email address.");
            return;
        }
        setVisible({ ...visible, Modal: false }); // Close the modal after adding user
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(search.toLowerCase())
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
                        onIconPress={() => console.log('Search icon pressed')}
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
                    style={styles.list}
                />

                <IconButton icon={"plus"} size={35} iconColor="#776BFF" onPress={() => setVisible({ ...visible, Modal: true })} style={styles.addButton} />

            </View>
            
            <Modal 
                visible={visible.Modal}
                onDismiss={() => {setVisible({ ...visible, Modal: false }); setAddEmail("")}}
                style={styles.modal}
                contentContainerStyle={styles.modalContainer}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add a new contact</Text>
                    <TextInput
                        placeholder="Enter email"
                        value={addEmail}
                        onChangeText={setAddEmail}
                        style={styles.modalInput}
                        keyboardType="email-address"
                    />
                    <Button mode="contained" onPress={handleAddUser} style={styles.modalButton}>
                        Add Contact
                    </Button>
                </View>
            </Modal>

            <Snackbar
                visible={visible.Snackbar}
                onDismiss={() => setVisible({ ...visible, Snackbar: false })}
                action={{
                    label: 'Dismiss',
                    onPress: () => setVisible({ ...visible, Snackbar: false }),
                }}
            >
                User Already Exists
            </Snackbar>
            <Button onPress={() => navigation.navigate("ChatScreen")} style={{ borderColor: 'black', borderWidth: 1 }}> TEST CHAT </Button>
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
        width: 225,
    },
    Headertitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000",
        marginRight: 5
    },
    headerRight: {
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
    button: {
        position: 'absolute',
        width: 50,
        height: 50,
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
    list: {
        flexDirection: 'column',
    },
    contentList: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: 16,
        bottom: 8,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 100,
        padding: 20,
    },
    modalContent: {
        width:300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        color: '#000000',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    modalInput: {
        backgroundColor: '#D3ECFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        width:"90%"
    },
    modalButton: {
        width: '100%',
    },
    addButton: {
        position: 'absolute',
        bottom: 35,
        right: 35,
        borderWidth: 2,
        borderColor: '#776BFF',
    }
});
