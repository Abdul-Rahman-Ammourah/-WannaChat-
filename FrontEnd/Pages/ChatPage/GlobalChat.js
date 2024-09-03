import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { NavContext } from "../../Context/Context";
import { useSignalR } from '../../API/api'; // Import the SignalR hook

export default function GlobalChat() {
  const { Username } = useContext(NavContext);
  const [message, setMessage] = useState('');

  const { SendMessageToUser, messages } = useSignalR(); // Use the custom hook

  const handleSend = () => {
    if (message.trim() !== '') {
      SendMessageToUser(Username, message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={styles.message}>{item.user}: {item.message}</Text>
        )}
        keyExtractor={( _ , index) => index.toString()}
        style={styles.messagesList}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
        style={styles.input}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  messagesList: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    marginBottom: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
