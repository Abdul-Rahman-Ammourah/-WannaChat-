import React, { useState,useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
//API 
import { deleteUser } from '../API/api';

import { Card } from 'react-native-elements';
import { Modal } from 'react-native-paper';
//Context
import { NavContext } from '../Context/Context';
// AsyncStorage
import AsyncStorageUtil from '../Services/AsyncStorage';
export default function SettingsPage({ navigation }) {
  const { senderEmail, setPrivateKey, setUsername, setSenderEmail,setUserProfilePic, setToken,setIsLoggedIn } = useContext(NavContext);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState(true);
  const [locationSharing, setLocationSharing] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    // TODO: Implement notification settings update
  };
  const handleLanguageToggle = () => {
    setLanguage(!language);
    // TODO: Implement language settings update
  };
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // TODO: Implement dark mode toggle
  };

  const handleChangePassword = () => {
    // TODO: Navigate to change password screen
    console.log('Navigate to change password screen');
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUser(senderEmail); 
      console.log('Response:', response);
      if (response) {
        console.log('Account deleted');
        setPrivateKey('');
        setUsername('');
        setSenderEmail('');
        setUserProfilePic('');
        setToken('');
        setIsLoggedIn(false);
        setDeleteAccount(false);
        try{
          await AsyncStorageUtil.clearUserData();
          await AsyncStorageUtil.clearToken();
        }catch(error){
          console.error('Error clearing user data:', error);
        }
        navigation.navigate('WelcomePage'); 
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text h4 style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity onPress={handleChangePassword} style={styles.option}>
            <Text style={styles.optionTitle}>Change Password</Text>
            <Icon name="chevron-right" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text h4 style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.option}>
            <Text style={styles.optionTitle}>Push Notifications</Text>
            <Switch value={notifications} onValueChange={handleNotificationsToggle} />
          </View>
        </View>

        <View style={styles.section}>
          <Text h4 style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.option}>
            <Text style={styles.optionTitle}>Location Sharing</Text>
            <Switch value={locationSharing} onValueChange={() => console.log('Privacy button pressed')} />
          </View>
        </View>

        <View style={styles.section}>
          <Text h4 style={styles.sectionTitle}>App Preferences</Text>
          <View style={styles.option}>
            <Text style={styles.optionTitle}>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={handleDarkModeToggle} />
          </View>

          <View style={styles.option}>
            <Text style={styles.optionTitle}>Language ({language ? 'en' : 'ar'})</Text>
            <Switch value={language} onValueChange={handleLanguageToggle} />
          </View>
        </View>

        <View style={styles.dangerZone}>
          <Text h4 style={styles.sectionTitle}>Danger Zone</Text>
          <Button
            title="Delete Account"
            onPress={() => setDeleteAccount(true)}
            buttonStyle={styles.deleteButton}
            titleStyle={styles.deleteButtonText}
          />
        </View>
      </ScrollView>
      <Modal 
          visible={deleteAccount}
          onDismiss={() => setDeleteAccount(false)}
  
          contentContainerStyle={styles.modalContainer}
>
  <Card containerStyle={styles.card}>
    <Text style={styles.modalText}>Are you sure you want to delete your account? This action cannot be undone.</Text>
    
    <View style={styles.modalActions}>
      <Button
        title="Confirm"
        onPress={handleDeleteAccount}
        buttonStyle={styles.confirmButton}
        titleStyle={styles.confirmButtonText}
      />
      <Button
        title="Cancel"
        onPress={() => setDeleteAccount(false)}
        buttonStyle={styles.cancelButton}
        titleStyle={styles.cancelButtonText}
      />
    </View>
  </Card>
</Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
