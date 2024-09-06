import React, { useState,useContext, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import useSignalR from './ChatHook';
import { NavContext } from '../../../Context/Context';
import End2End from '../../../Services/End2End';
const ChatScreen = () => {
  const serverUrl = 'https://charming-hornet-finally.ngrok-free.app/Chathub';
  const { senderEmail, privateKey } = useContext(NavContext);
  const { messages, sendMessage, isConnected, connectionId } = useSignalR(serverUrl, senderEmail);
  const [RevMessages, setRevMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [targetConnectionId, setTargetConnectionId] = useState('');

  const handleSendMessage = () => {
    sendMessage(targetConnectionId, message);
    setMessage('');
  };
  useEffect(() => {
    const DecryptedMessages = () => {
      messages.map((message) => {
        const decryptedMessage = End2End.decrypt(message.message, privateKey);
        setRevMessages((prevMessages) => [...prevMessages, { fromConnectionId: message.fromConnectionId, message: decryptedMessage }]);
      })
    }
    if (messages) {
      DecryptedMessages();
    }
  }, [messages]);
  return (
    <View style={{ padding: 20 }}>
      <Text>{isConnected ? 'Online' : 'Offline'}</Text>
      <Text>Sender email: {senderEmail}</Text>
      <Text>Connection ID: {connectionId}</Text>
      
      <TextInput
        placeholder="Target Connection ID"
        value={targetConnectionId}
        onChangeText={setTargetConnectionId}
        style={{ marginBottom: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        placeholder="Type your message"
        value={message}
        onChangeText={setMessage}
        style={{ marginBottom: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button title="Send" onPress={handleSendMessage} />

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ color: 'black' }}>{item.fromConnectionId}: {item.message}</Text>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default ChatScreen;
