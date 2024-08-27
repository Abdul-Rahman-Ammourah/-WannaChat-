import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavContext } from '../../Navigation_Remove_Later/Context';
import { fetchMessages, handleSend } from './ChatFunctions';
import { useSignalR } from "../../API/api";

export default function Chat({ navigation }) {
    const { senderEmail, receiverEmail, publicKey, privateKey, ChatUsername } = useContext(NavContext);
    const [Messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const flatListRef = useRef(null);

    const { sendMessageToUser, messages } = useSignalR(); // Use the custom hook

    // Fetch messages when the component mounts
    useEffect(() => {
        fetchMessages(senderEmail, privateKey, setMessages);
    }, [senderEmail, privateKey]);

    // Update messages from SignalR
    useEffect(() => {
        if (messages.length > 0) {
            setMessages(prevMessages => [...prevMessages, ...messages]);
        }
    }, [messages]);

    // Handle send message
    const handleSendMessage = () => {
        if (newMessage.trim() === '') {
            return; // Do nothing if the message is empty
        }
        handleSend(newMessage, senderEmail, receiverEmail, publicKey, setMessages, flatListRef, setNewMessage);
        sendMessageToUser(receiverEmail, senderEmail, newMessage); // This should be called after handleSend
    };

    const renderItem = ({ item }) => (
        <View style={[styles.message, item.type === 'sent' ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{ChatUsername}</Text>
                <TouchableOpacity onPress={() => console.log('Camera pressed')}>
                    <Icon name="camera" size={28} color="#000" />
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={Messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messagesContainer}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

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
