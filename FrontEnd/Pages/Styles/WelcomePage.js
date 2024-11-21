import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f8ff', // Light blue background
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      color: '#1E88E5',
      marginBottom: 20,
      fontSize: 48,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 18,
      color: '#424242',
      textAlign: 'center',
      marginBottom: 40,
    },
    buttonContainer: {
      width: '80%',
      marginBottom: 15,
    },
    loginButton: {
      backgroundColor: '#1E88E5',
      borderRadius: 25,
      paddingVertical: 15,
    },
    registerButton: {
      borderColor: '#1E88E5',
      borderWidth: 2,
      borderRadius: 25,
      paddingVertical: 15,
    },
    registerButtonText: {
      color: '#1E88E5',
    },
    formContainer: {
      width: '100%',
      alignItems: 'center',
    },
    inputContainer: {
      marginBottom: 15,
    },
    signInButton: {
      backgroundColor: '#1E88E5',
      borderRadius: 25,
      paddingVertical: 15,
    },
    createAccountContainer: {
      marginTop: 10,
    },
    createAccountText: {
      color: '#1E88E5',
      fontSize: 16,
    },
    terms: {
      marginTop: 30,
      fontSize: 12,
      color: '#757575',
      textAlign: 'center',
    },
    invalid: {
      alignSelf: 'center',
      textAlign: 'left',
      color: 'rgba(255, 0, 0, 0.7)',
      fontSize: 14,
      fontWeight: 'bold',
      top: -10,
    },
  });  