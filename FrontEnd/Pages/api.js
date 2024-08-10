import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.161:5291', // Your local IP address
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

