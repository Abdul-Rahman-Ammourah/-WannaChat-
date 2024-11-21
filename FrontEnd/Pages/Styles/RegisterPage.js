import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f8ff',
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    content: {
      padding: 20,
      alignItems: 'center',
    },
    title: {
      color: '#1E88E5',
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      width: '25%',
      borderRadius: 25,
      marginVertical: 10,
    },
    registerButton: {
      backgroundColor: '#1E88E5',
      borderRadius: 25,
      paddingVertical: 15,
    },
    backButtonText: {
      color: '#1E88E5',
    },
    tipsContainer: {
      position: 'absolute',
      bottom: -50,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  