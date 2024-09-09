import React, { useState,useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Avatar, Button, ListItem, Overlay, Input } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavContext } from '../Context/Context';
export default function ProfilePage() {
  const {senderEmail,Username,setPrivateKey,setUsername,setSenderEmail,userProfilePic} = useContext(NavContext)
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: Username,
    email: senderEmail,
    profilePic: userProfilePic,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    // Implement API call to update user data
  };

  const handleLogout = () => {
    setPrivateKey('')
    setUsername('')
    setSenderEmail('')
    navigation.navigate('WelcomePage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Icon name="edit" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileHeader}>
          <Avatar
            size="xlarge"
            rounded
            source={userData.profilePic}
            containerStyle={styles.avatar}
          />
          <Text h2>{userData.name}</Text>
          <Text style={styles.username}>{userData.username}</Text>
        </View>

        <Text style={styles.bio}>{userData.bio}</Text>

        <View style={styles.infoContainer}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Email</ListItem.Title>
              <ListItem.Subtitle>{userData.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider onPress={() => navigation.navigate('Settings')}>
            <ListItem.Content>
              <ListItem.Title>Account Settings</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </View>

        <Button
          title="Logout"
          onPress={handleLogout}
          buttonStyle={styles.logoutButton}
          containerStyle={styles.logoutButtonContainer}
        />
      </ScrollView>

      <Overlay isVisible={isEditing} onBackdropPress={() => setIsEditing(false)}>
        <View style={styles.overlayContainer}>
          <Text h4 style={styles.overlayTitle}>Edit Profile</Text>
          <Input
            label="Name"
            value={editedData.name}
            onChangeText={(text) => setEditedData({ ...editedData, name: text })}
          />
          <Input
            label="Username"
            value={editedData.username}
            onChangeText={(text) => setEditedData({ ...editedData, username: text })}
          />
          <Input
            label="Bio"
            value={editedData.bio}
            onChangeText={(text) => setEditedData({ ...editedData, bio: text })}
            multiline
          />
          <Button title="Save" onPress={handleSave} buttonStyle={styles.saveButton} />
        </View>
      </Overlay>
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
  username: {
    fontSize: 16,
    color: '#666',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
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
});
