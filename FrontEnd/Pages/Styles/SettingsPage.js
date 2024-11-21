import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f8ff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      backgroundColor: '#1E88E5',
      paddingHorizontal: 15,
      justifyContent: 'space-between',
    },
    backButton: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    section: {
      backgroundColor: '#fff',
      marginBottom: 20,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    sectionTitle: {
      paddingBottom: 10,
      fontWeight: 'bold',
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    optionTitle: {
      fontSize: 16,
    },
    optionSubtitle: {
      fontSize: 14,
      color: '#888',
    },
    dangerZone: {
      marginBottom: 40,
    },
    deleteButton: {
      backgroundColor: '#FF3B30',
      marginHorizontal: 10,
    },
    deleteButtonText: {
      color: '#fff',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background
    },
    card: {
      width: '80%',
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 15,
    },
    modalText: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      borderRadius: 15,
    },
    confirmButton: {
      backgroundColor: '#FF3B30',
      paddingHorizontal: 20,
    },
    confirmButtonText: {
      color: '#fff',
    },
    cancelButton: {
      backgroundColor: '#aaa',
      paddingHorizontal: 20,
    },
    cancelButtonText: {
      color: '#fff',
    },
  });
  