import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wanna-chat.fly.dev', // Your local IP address
  timeout: 10000,  // Optional: Set a timeout for requests
});

export const register = async (email,username, password) => {
  try {
    const response = await api.post('/register', {email, username, password });
    return response.data;
  } catch (error) {
    console.error('Register Error:', error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.message);
    throw error;
  }
};

export const sendMessage = async (from, to, content) => {
  try {
    const response = await api.post('/send', { from, to, content });
    return response.data;
  } catch (error) {
    console.error('Send Message Error:', error.message);
    throw error;
  }
};

export const getMessages = async (from, to) => {
  try {
    const response = await api.get('/messages', { params: { from, to } });
    return response.data;
  } catch (error) {
    console.error('Get Messages Error:', error.message);
    throw error;
  }
};
