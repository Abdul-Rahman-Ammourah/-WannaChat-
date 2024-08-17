import React, { useState, useEffect, useRef,useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendMessage, getMessage } from "./api"; // Import your API functions
import { NavContext } from '../Navigation_Remove_Later/Context';
export default function Chat({ navigation }) {
    const {senderEmail,receiverEmail} = useContext(NavContext);
    const [messages, setMessages] = useState([]);  // Initialize messages as an empty array
    const [newMessage, setNewMessage] = useState("");
    const flatListRef = useRef(null);  // Reference for FlatList

    // Fetch messages when the component mounts
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const receiverEmail = senderEmail;  // Replace with actual receiver email
                const fetchedMessages = await getMessage(receiverEmail);
                
                // Map the fetched messages to the correct format
                const formattedMessages = fetchedMessages.map((msg) => ({
                    id: msg._id,  // Assuming MongoDB returns _id
                    text: msg.message,
                    type: msg.fromEmail === senderEmail ? 'sent' : 'received' // Compare sender email to identify message type
                }));
                
                setMessages(formattedMessages);  // Set messages without reversing
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    const handleSend = async () => {
        if (newMessage.trim()) {
            const messageToSend = {
                fromEmail: senderEmail,  // Replace with actual sender email
                toEmail: receiverEmail,  // Replace with actual receiver email
                message: newMessage,
            };

            try {
                // Send message to the backend
                await sendMessage(messageToSend.fromEmail, messageToSend.toEmail, messageToSend.message);
                
                // Update local message state for UI
                setMessages([
                    ...messages,
                    { id: Date.now().toString(), text: newMessage, type: 'sent' }
                ]);

                setNewMessage("");  // Clear the input field

                // Scroll to the bottom of the list after sending the message
                flatListRef.current?.scrollToEnd({ animated: true });
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
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Username</Text>
                <TouchableOpacity onPress={() => console.log('Camera pressed')}>
                    <Icon name="camera" size={28} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Message List */}
            <FlatList
                ref={flatListRef}  // Reference to FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messagesContainer}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}  // Scroll to end on content change
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}  // Scroll to end on initial layout
            />
            {/* Input field and send button */}
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
