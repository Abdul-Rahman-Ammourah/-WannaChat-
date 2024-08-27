import { useState, useEffect } from 'react';
import * as SignalR from '@microsoft/signalr';

// Custom hook for SignalR
export function useSignalR() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newConnection = new SignalR.HubConnectionBuilder()
      .withUrl('https://peacock-electric-merely.ngrok-free.app/chatHub') // Replace with your backend URL
      .build();

    newConnection.on('ReceiveMessage', (user, message) => {
      console.log('ReceiveMessage: ', user, message);
      setMessages(prevMessages => [...prevMessages, { user, message }]);
    });

    newConnection.start()
      .then(() => {
        console.log('SignalR Connected');
        setConnection(newConnection);
      })
      .catch(err => console.error('SignalR Connection Error: ', err));

    return () => {
      console.log('SignalR Disconnected');
      newConnection.stop();
    };
  }, []);

  const sendMessage = (user, message) => {
    if (connection) {
      connection.invoke('SendMessage', user, message)
        .catch(err => console.error('SendMessage Error: ', err));
    }
  };

  return { sendMessage, messages };
}
