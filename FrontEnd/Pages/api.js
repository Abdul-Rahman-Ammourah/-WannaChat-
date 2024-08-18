import axios from 'axios';

const api = axios.create({
  baseURL: 'https://peacock-electric-merely.ngrok-free.app', 
  timeout: 10000,  // Optional: Set a timeout for requests
});

// Register API
export const register = async (email, username, password,publicKey) => {
  try {
    const response = await api.post('/register', { email, username, password,publicKey });
    return response.data;
  } catch (error) {
    console.error('Register Error:', error.message);
    throw error;
  }
};

// Login API
export const login = async (email, password, publicKey) => {
  try {
    const response = await api.post('/Login', { email, password, publicKey });
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.message);
    throw error;
  }
};

// Get Messages API
export const getMessage = async (email) => {
  try {
    const response = await api.get('/ReceiveMessages', {
      params: { receiverEmail: email }  // Ensure this matches the expected query param name
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