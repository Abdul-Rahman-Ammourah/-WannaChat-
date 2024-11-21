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
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    headerTitleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    title: {
      textAlign: 'center',
      marginBottom: 20,
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
    confirmButtonContainer: {
      marginTop: 20,
    },
    confirmButton: {
      backgroundColor: '#1E88E5',
      borderRadius: 25,
      paddingVertical: 15,
    },
  });