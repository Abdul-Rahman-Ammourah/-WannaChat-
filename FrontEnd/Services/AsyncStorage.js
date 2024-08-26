import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AsyncStorageService {
    
    // Set Token
    static async SetToken(token) {
        try {
          await AsyncStorage.setItem('@user_token', token);
          console.log("Token Stored");
        } catch (error) {
          console.error('Error storing key:', error);
        }
    }
    // Get Token
    static async GetToken() {
        try {
          const value = await AsyncStorage.getItem('@user_token');
          if (value !== null) {
            console.log("Token Retrieved");
            return value;
          }
        } catch (error) {
          console.error('Error retrieving key:', error);
        }
    }
    // Remove Token
    static async RemoveToken() {
        try {
          await AsyncStorage.removeItem('@user_token');
          console.log("Token Removed");
        } catch (error) {
          console.error('Error removing key:', error);
        }
    }
}