import { useState, useEffect } from 'react';
import axios from 'axios';
import * as SignalR from '@microsoft/signalr';

const api = axios.create({
  baseURL: 'https://charming-hornet-finally.ngrok-free.app', 
  timeout: 4000,  // Optional: Set a timeout for requests
});

// Register API
export const register = async (email, username, password,publicKey,privateKey) => {
  try {
    const response = await api.post('/Register', { email, username, password,publicKey,privateKey });
    return response.data;
  } catch (error) {
    console.error('Register Error:', error.message);
    throw error;
  }
};

// Login API
export const login = async (email, password) => {
  try {
    const response = await api.post('/Login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.message);
    throw error;
  }
};

// Get Messages API
export const getMessage = async (receiverEmail, senderEmail) => {
  try {
    const response = await api.get('/ReceiveMessages', {
      params: { receiverEmail: receiverEmail, senderEmail: senderEmail }  // Ensure this matches the expected query param name
    });
    return response.data;
  } catch (error) {
    console.error('Get Message Error:', error.message);
    throw error;
  }
};

// Send Message API
export const sendMessage = async (fromEmail, toEmail, message) => {
  try {
    const response = await api.post('/SendMessage', { fromEmail, toEmail, message });
    return response.data;
  } catch (error) {
    console.error('Send Message Error:', error.message);
    throw error;
  }
};

// Get User info 
export const getUser = async (Email) => {
  try{
    const response = await api.get('/getUser', {
      params: { email: Email }  // Ensure this matches the expected query param name
    });
    return response.data;
  }catch(error){
    console.error('Get User Error:',error)
    throw error;
  }
}
export function useSignalR() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newConnection = new SignalR.HubConnectionBuilder()
      .withUrl('https://charming-hornet-finally.ngrok-free.app/chatHub') // Replace with your backend URL
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

  const sendMessageToUser = (email, user, message) => {
    if (connection) {
      connection.invoke('SendMessageToUser', email, user, message)
        .catch(err => console.error('SendMessage Error: ', err));
    }
  };

  return { sendMessageToUser, messages };
}
