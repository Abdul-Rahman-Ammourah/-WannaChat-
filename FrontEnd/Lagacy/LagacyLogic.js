import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

// Import API functions
import { register, login, sendMessage, getMessages } from '../Pages/api';



export default function App() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState({ toUser: '', message: '' });
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const handleUserCreation = async () => {
    try {
      const response = await register(user.username, user.password);
      console.log('Registration Response:', response);
    } catch (error) {
      console.error('Registration Error:', error);
      setError('Registration failed');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login(user.username, user.password);
      console.log('Login Response:', response);
    } catch (error) {
      console.error('Login Error:', error);
      setError('Login failed');
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await sendMessage(user.username, message.toUser, message.message);
      console.log('Send Message Response:', response);
    } catch (error) {
      console.error('Send Message Error:', error);
      setError('Failed to send message');
    }
  };

  const handleGetMessages = async () => {
    try {
      const response = await getMessages(user.username, message.toUser);
      setMessages(response);
    } catch (error) {
      console.error('Get Messages Error:', error);
      setError('Failed to retrieve messages');
    }
  };

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={user.username}
        onChangeText={(text) => setUser({ ...user, username: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={user.password}
        onChangeText={(text) => setUser({ ...user, password: text })}
        secureTextEntry
      />
      <Button title="Register" onPress={handleUserCreation} />
      <Button title="Login" onPress={handleLogin} />

      <TextInput
        style={styles.input}
        placeholder="To User"
        value={message.toUser}
        onChangeText={(text) => setMessage({ ...message, toUser: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={message.message}
        onChangeText={(text) => setMessage({ ...message, message: text })}
      />
      <Button title="Send Message" onPress={handleSendMessage} />
      <Button title="Get Messages" onPress={handleGetMessages} />

      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => ( 
          <View>
            <Text>{item.from} to {item.to}: {item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  error: {
    color: 'red',
  },
});
