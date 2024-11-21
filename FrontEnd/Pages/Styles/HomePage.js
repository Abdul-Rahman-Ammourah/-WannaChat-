import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f8ff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'white',
    },
    searchBarContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      padding: 0,
    },
    searchBarInputContainer: {
      backgroundColor: '#f0f8ff',
    },
    avatarContainer: {
      marginLeft: 10,
    },
    chatList: {
      flex: 1,
    },
    chatRoomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    chatRoomContainerHilighted: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: 'lightblue',
    },
    ModalContainer: {
      backgroundColor: 'white',
      width: "100%",
      height: "70%",
      position: "absolute",
      bottom: 0,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    ModalHeader: {
      flex: 0.1,
      padding: 10,
    },
    ModalBody: {
      flex: 1,
    },
  });