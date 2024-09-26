import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavContext } from '../../Context/Context';
import End2End from "../../Services/End2End";
import useSignalR from "./ChatHook";

export default function Chat({ navigation }) {
    const { senderEmail, receiverEmail, privateKey, ChatUsername, conID } = useContext(NavContext);
    const [RevMessages, setRevMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const flatListRef = useRef(null);
    const { messages, sendMessage, isConnected, connectionId } = useSignalR(senderEmail);

    // Handle send message
    const handleSendMessage = () => {
        if (newMessage.trim() === '') {
            return;
        }
        sendMessage(conID, newMessage);
        setNewMessage(""); // Clear input after sending the message
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const decryptedMessages = await Promise.all(
                    messages.map(async (message) => {
                        const decryptedText = await End2End.decryptMessage(message.message, privateKey);
                        return {
                            ...message,
                            id: message.fromConnectionId + Date.now().toString(), // Create a unique id
                            message: decryptedText,
                        };
                    })
                );

                // Filter out duplicate messages based on unique IDs
                setRevMessages((prevMessages) => {
                    const newMessages = decryptedMessages.filter(
                        (newMsg) => !prevMessages.some((prevMsg) => prevMsg.id === newMsg.id)
                    );
                    return [...prevMessages, ...newMessages];
                });
            } catch (error) {
                console.error("Error fetching or decrypting messages:", error);
            }
        };

        if (messages.length > 0) {
            fetchMessages();
        }
    }, [messages]);    
    // Render each message (sent or received)
    const renderItem = ({ item }) => (
        <View style={[styles.message, item.fromConnectionId === connectionId ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={styles.messageText}>{item.message}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{ChatUsername}</Text>
            </View>

            <FlatList
                ref={flatListRef}
                data={RevMessages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} // Ensure a unique key for FlatList
                contentContainerStyle={styles.messagesContainer}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            <Text>My connectionID: {connectionId}</Text>
            <Text>Receiver connectionID: {conID}</Text>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputContainer}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Icon name="send" size={24} color="white" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    messagesContainer: {
        paddingBottom: 10,
    },
    message: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
