import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Input, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavContext } from '../../Context/Context';
import End2End from "../../Services/End2End";
import useSignalR from "./ChatHook";
import { styles } from '../Styles/ChatPage';
export default function ChatPage({ navigation }) {
  const { senderEmail, receiverEmail, privateKey, ChatUsername, conID } = useContext(NavContext);
  const [RevMessages, setRevMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);
  const { messages, sendMessage: sendSignalRMessage, isConnected, connectionId } = useSignalR(senderEmail);
  // Handle send message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const sentMessage = {
        id: Date.now().toString(), // Create a unique ID for the message
        message: newMessage,
        fromConnectionId: connectionId,
        type: 'sent', // Mark this as a sent message
      };

      // Add the sent message to RevMessages state
      setRevMessages((prevMessages) => [...prevMessages, sentMessage]);

      // Send the message via SignalR
      sendSignalRMessage(conID, newMessage);

      // Clear the input field after sending
      setNewMessage('');
    }
  };
  // Fetch and decrypt messages
  useEffect(() => {
    const fetchAndDecryptMessages = async () => {
      try {
        const decryptedMessages = await Promise.all(
          messages.map(async (message) => {
            const decryptedText = await End2End.decryptMessage(message.message, privateKey);
            return {
              ...message,
              id: Date.now().toString(), // Create a unique id
              message: decryptedText,
              type: 'received', // Mark this as a received message
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
      fetchAndDecryptMessages();
    }
  }, [messages]);

  // Render each message (sent or received)
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.type === 'sent' ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={32} color="#1E88E5" />
      </TouchableOpacity>
        <Text style={conID != "" ? styles.headerTitle : styles.headerTitleOffline}>{ChatUsername}</Text>
      </View>
      {/* Message List */}
      <FlatList
        ref={flatListRef}
        data={RevMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        contentContainerStyle={styles.chatListContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={styles.inputContainer}
      >
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          containerStyle={styles.input}
          inputContainerStyle={styles.inputInner}
          rightIcon={
            <View style={styles.sendButtonContainer}>
            <Button
              title="Send"
              onPress={handleSendMessage}
              buttonStyle={styles.sendButton}
            />
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}