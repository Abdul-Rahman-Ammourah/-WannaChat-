import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f8ff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', 
      height: 50,
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#d2d2d2',
    },
    headerTitle: {
      color: '#1E88E5',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
    },
    headerTitleOffline: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
      opacity: 0.5,
    },
    chatList: {
      flex: 1,
    },
    chatListContent: {
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    messageBubble: {
      marginVertical: 5,
      padding: 10,
      borderRadius: 20,
      maxWidth: '80%',
    },
    sentMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#1E88E5',
    },
    receivedMessage: {
      alignSelf: 'flex-start',
      backgroundColor: 'lightgrey',
    },
    messageText: {
      fontSize: 16,
    },
    inputContainer: {
      borderRadius: 10,
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
      backgroundColor: '#fff',
    },
    input: {
      paddingHorizontal: 10,
    },
    inputInner: {
      borderBottomWidth: 0,
    },
    sendButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sendButton: {
      backgroundColor: '#1E88E5',
      borderRadius: 20,
      paddingHorizontal: 15,
      marginLeft: 10,
    },
  
});
  