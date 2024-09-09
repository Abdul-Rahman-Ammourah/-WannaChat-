import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ListItem, Switch, Button, Header } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SettingsPage({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState(true);
  const [locationSharing, setLocationSharing] = useState(false);

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

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion process
    console.log('Implement account deletion process');
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
          <ListItem bottomDivider onPress={handleChangePassword}>
            <ListItem.Content>
              <ListItem.Title>Change Password</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Email</ListItem.Title>
              <ListItem.Subtitle>user@example.com</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>

        <View style={styles.section}>
          <Text h4 style={styles.sectionTitle}>Notifications</Text>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Push Notifications</ListItem.Title>
            </ListItem.Content>
            <Switch value={notifications} onValueChange={handleNotificationsToggle} />
          </ListItem>
        </View>

        <View style={styles.section}>
          <Text h4 style={styles.sectionTitle}>Privacy</Text>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Privacy options</ListItem.Title>
            </ListItem.Content>
            <Switch value={locationSharing} onValueChange={() => console.log("Privacy botton pressed")} />
          </ListItem>
        </View>

        <View style={styles.section}>
          <Text h4 style={styles.sectionTitle}>App Preferences</Text>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Dark Mode</ListItem.Title>
            </ListItem.Content>
            <Switch value={darkMode} onValueChange={handleDarkModeToggle} />
            <ListItem.Content>
              <ListItem.Title>Language ({language ? 'en' : 'ar'})</ListItem.Title>
            </ListItem.Content>
            <Switch value={language} onValueChange={handleLanguageToggle} />
          </ListItem>
        </View>

        <View style={styles.dangerZone}>
          <Text h4 style={styles.sectionTitle}>Danger Zone</Text>
          <Button
            title="Delete Account"
            onPress={handleDeleteAccount}
            buttonStyle={styles.deleteButton}
            titleStyle={styles.deleteButtonText}
          />
        </View>
      </ScrollView>
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
  },
  sectionTitle: {
    padding: 10,
    backgroundColor: '#f0f8ff',
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
});
