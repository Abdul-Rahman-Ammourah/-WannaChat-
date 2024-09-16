import axios from 'axios';

const api = axios.create({
  baseURL: 'https://charming-hornet-finally.ngrok-free.app', 
  timeout: 4000,  // Optional: Set a timeout for requests
});

// Register API
export const register = async (email, username, password,publicKey,privateKey, ProfilePic) => {
  try {
    const response = await api.post('/Register', { email, username, password,publicKey,privateKey,ProfilePic });
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

// Validate User 
export const validateUser = async (email,password) => {
  try {
    const response = await api.post('/Login/Validate', { email, password });
    return response.data
  }catch(error){
    console.error('Validate User Error:',error)
    throw error;
  }
}
export const validateDub = async (Email) => {
  try {
    const responce = await api.get('/getUser/CheckDub', { params: { email: Email }});
    return responce
  }catch(error){
    console.error('ValidateDub User Error:',error)
    throw error;
  }
}
// Update User
export const updateUser = async (OldEmail,NewEmail, Username, ProfilePic) => {
  try {
    const response = await api.post('/UpdateUser', { OldEmail,NewEmail, Username, ProfilePic });
    return response
  }catch(error){
    console.error('Update User Error:',error)
    throw error;
  }
}
// Delete User
export const deleteUser = async (email) => {
  try {
    const response = await api.post('/DeleteUser', { email });
    return response
  }catch(error){
    console.error('Delete User Error:',error)
    throw error;
  }
}
