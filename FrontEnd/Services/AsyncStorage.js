import AsyncStorage from '@react-native-async-storage/async-storage';
class AsyncStorageUtil {
  // Store user data (email, privateKey)
  static async storeUserData(email, userName, PrivateKey, password,profilePic) {
    try {
      const userData = { email,userName, PrivateKey, password,profilePic};
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
      throw error;
    }
  }
  // Retrieve user data (email, privateKey)
  static async getUserData() {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        return JSON.parse(userData);
      }
      return null; // Return null if no user data is found
    } catch (error) {
      console.error('Error retrieving user data:', error);
      throw error;
    }
  }
  // Remove user data (on logout)
  static async clearUserData() {
    try {
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw error;
    }
  }
  // Store Token 
  static async storeToken(token) {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error storing token:', error);
      throw error;
    }
  }
  // Retrieve Token
  static async getToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        return token;
      }
      return null; // Return null if no token is found
    } catch (error) {
      console.error('Error retrieving token:', error);
      throw error;
    }
  }
  // Remove Token
  static async clearToken() {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error clearing token:', error);
      throw error;
    }
  }
  static async storeContacts(contacts){
    try{
      await AsyncStorage.setItem('Contacts',JSON.stringify(contacts))
    }catch(error){
      console.error("Error while storing contacts",error)
    }
  }
  static async getContacts() {
    try {
      const contacts = await AsyncStorage.getItem('Contacts');
      if (contacts !== null) {
        return JSON.parse(contacts);
      }
      console.log('No contacts found in storage');
      return [];
    } catch (error) {
      console.error("Error while getting contacts:", error);
    }
  }
  
  static async clearContacts(){
    try{
      await AsyncStorage.removeItem('Contacts')
    }catch(error){
      console.error("Error while clearing contacts",error)
    }
  }
}

export default AsyncStorageUtil;
