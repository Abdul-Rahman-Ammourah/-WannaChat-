import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendMessage, getMessage } from "../API/api"; // Import your API functions
import { NavContext } from '../Navigation_Remove_Later/Context';
import End2End from "../Services/End2End";
import * as SignalR from '@microsoft/signalr';

export default function Chat({ navigation }) {
    const { senderEmail, receiverEmail, publicKey, privateKey, ChatUsername } = useContext(NavContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const flatListRef = useRef(null);
    const [connection, setConnection] = useState(null);

    // Fetch messages when the component mounts
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const receiverEmail = senderEmail;
                const fetchedMessages = await getMessage(receiverEmail, senderEmail);

                const decryptedMessages = await Promise.all(
                    fetchedMessages.map(async (msg) => {
                        const decryptedText = await End2End.decryptMessage(msg.message, privateKey);
                        return {
                            id: msg._id,
                            text: decryptedText,
                            type: msg.fromEmail === senderEmail ? 'sent' : 'received',
                        };
                    })
                );

                setMessages(decryptedMessages);
            } catch (error) {
                console.error("Error fetching or decrypting messages:", error);
            }
        };

        fetchMessages();
    }, [senderEmail, privateKey]);

    // Connect to SignalR hub on mount
    useEffect(() => {
        const connectToHub = async () => {
            const newConnection = new SignalR.HubConnectionBuilder()
                .withUrl("https://peacock-electric-merely.ngrok-free.app/chathub",{
                    transport: SignalR.HttpTransportType.WebSockets
                }) // Replace with your backend URL
                .withAutomaticReconnect()
                .build();

            try {
                await newConnection.start();
                console.log("Connected to SignalR Hub");

                newConnection.on("ReceiveMessage", async (fromEmail, toEmail, encryptedMessage, date) => {
                    const decryptedText = await End2End.decryptMessage(encryptedMessage, privateKey);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            id: Date.now().toString(),
                            text: decryptedText,
                            type: fromEmail === senderEmail ? 'sent' : 'received',
                        },
                    ]);
                });

                setConnection(newConnection);
            } catch (error) {
                console.error("Error connecting to SignalR hub:", error);
            }
        };

        connectToHub();

        return () => {
            connection?.stop();
        };
    }, [privateKey]);

    const handleSend = async () => {
        if (newMessage.trim()) {
            const encryptedMessage = await End2End.encryptMessage(newMessage, publicKey);

            const messageToSend = {
                fromEmail: senderEmail,
                toEmail: receiverEmail,
                message: encryptedMessage,
            };

            try {
                await sendMessage(messageToSend.fromEmail, messageToSend.toEmail, messageToSend.message);

                setMessages([
                    ...messages,
                    { id: Date.now().toString(), text: newMessage, type: 'sent' }
                ]);

                setNewMessage("");

                flatListRef.current?.scrollToEnd({ animated: true });

                if (connection) {
                    connection.send("SendMessage", senderEmail, receiverEmail, encryptedMessage, new Date());
                }
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
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
                data={messages}
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
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
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
