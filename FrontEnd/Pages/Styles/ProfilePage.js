import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f8ff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 60,
      backgroundColor: '#1E88E5',
      paddingHorizontal: 15,
    },
    headerTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    profileHeader: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    avatar: {
      marginBottom: 10,
    },
    infoContainer: {
      backgroundColor: '#fff',
      marginBottom: 20,
    },
    logoutButtonContainer: {
      paddingHorizontal: 20,
    },
    logoutButton: {
      backgroundColor: '#FF3B30',
    },
    overlayContainer: {
      width: 300,
      padding: 20,
    },
    overlayTitle: {
      marginBottom: 20,
      textAlign: 'center',
    },
    saveButton: {
      backgroundColor: '#1E88E5',
      marginTop: 20,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    picContainer: {
      width: '30%',
      aspectRatio: 1,
      marginBottom: 20,
      borderRadius: 10,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedPicContainer: {
      borderColor: '#1E88E5',
    },
    profilePic: {
      width: '100%',
      height: '100%',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
      textAlign: 'center',
    },
  });
  