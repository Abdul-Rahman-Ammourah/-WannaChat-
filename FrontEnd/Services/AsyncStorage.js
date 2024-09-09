import AsyncStorage from '@react-native-async-storage/async-storage';
class AsyncStorageUtil {
  // Store user data (email, privateKey)
  static async storeUserData(email, userName, PrivateKey) {
    try {
      const userData = { email,userName, PrivateKey};
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
}
export default AsyncStorageUtil;
