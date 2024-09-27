import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Avatar, Button, ListItem, Overlay, Input } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavContext } from '../Context/Context';
import { validateUser, updateUser } from '../API/api';
import ProfilePopup from '../CustomComponent/ProfilePopUp';
import { EmailCheck,UsernameCheck } from '../Services/InputValidation';
// AsyncStorage
import AsyncStorageUtil from '../Services/AsyncStorage';
// Profile Pictures
const profilePics = [
  { id: 1, path: require("../Assets/ProfilePicSet/ProfileSet3.jpg") },
  { id: 2, path: require("../Assets/ProfilePicSet/ProfileSet1.jpg") },
  { id: 3, path: require("../Assets/ProfilePicSet/ProfileSet2.jpg") },
  { id: 4, path: require("../Assets/ProfilePicSet/ProfileSet.jpg") },
  { id: 5, path: require("../Assets/ProfilePicSet/ProfileSet4.jpg") },
  { id: 6, path: require("../Assets/ProfilePicSet/ProfileSet5.jpg") },
];

export default function ProfilePage({ navigation }) {
  const { senderEmail, Username, setPrivateKey, setUsername, setSenderEmail, userProfilePic, setUserProfilePic, setToken,setIsLoggedIn,privateKey } = useContext(NavContext);
  const [editedData, setEditedData] = useState({
    Email: '',
    username: '',
    profilePic: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPic, setSelectedPic] = useState(null);
  const [showPassVal, setShowPassVal] = useState(false);
  const [invalidInput, setInvalidInput] = useState({
    Email: false,
    username: false,
  });
  const handleSave = async (pass) => {
    if (pass === '') {
        return;
    }
    try {
        const response = await validateUser(senderEmail, pass);
        if (response) {
            try {
                const res = await updateUser(senderEmail, editedData.Email, editedData.username, selectedPic?.path);
                if (res) {
                    setUserProfilePic(selectedPic?.path);  
                    setUsername(editedData.username);
                    setSenderEmail(editedData.Email); 

                    setIsEditing(false);
                    setShowPassVal(false);
                    setEditedData({
                        Email: '',
                        username: '',
                    });
                    try {
                        await AsyncStorageUtil.storeUserData(editedData.Email, editedData.username, privateKey, pass, selectedPic?.path);
                    } catch (error) {
                        console.log("Error while Storing Data", error);
                    }
                }
            } catch (error) {
                console.log("Error while updating", error);
            }
        } else {
            Alert.alert("Wrong Password", "Please Enter Correct Password");
        }
    } catch (error) {
        console.log("error", error);
    }
};

  const handlesubmit = () => {
    if (EmailCheck(editedData.Email)) {
        if (UsernameCheck(editedData.username)) {
            setShowPassVal(true);
        } else {
            setInvalidInput({ ...invalidInput, username: true });
        }
    } else {
        setInvalidInput({ ...invalidInput, Email: true });
    }
};

  const handleLogout = async () => {
    setPrivateKey('');
    setUsername('');
    setSenderEmail('');
    setUserProfilePic('');
    setToken('');
    setIsLoggedIn(false);
    try {
      await AsyncStorageUtil.clearUserData();
      await AsyncStorageUtil.clearToken();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
    setTimeout(() => navigation.navigate('WelcomePage'), 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Icon name="edit" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileHeader}>
          <Avatar size="xlarge" rounded source={userProfilePic} containerStyle={styles.avatar} />
          <Text h2>{Username}</Text>
        </View>

        <View style={styles.infoContainer}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Email</ListItem.Title>
              <ListItem.Subtitle>{senderEmail}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider onPress={() => navigation.navigate('Settings')}>
            <ListItem.Content>
              <ListItem.Title>App Settings</ListItem.Title>
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
          <View style={styles.gridContainer}>
            {profilePics.map((pic) => (
              <TouchableOpacity
                key={pic.id}
                style={[
                  styles.picContainer,
                  selectedPic && selectedPic.id === pic.id && styles.selectedPicContainer,
                ]}
                onPress={() => setSelectedPic(pic)}
              >
                <Image source={pic.path} style={styles.profilePic} />
              </TouchableOpacity>
            ))}
          </View>
          {invalidInput.Email && <Text style={styles.errorText}>Invalid Email</Text>}
          <Input
            label="Email"
            value={editedData.Email}
            onChangeText={(text) => setEditedData({ ...editedData, Email: text })}
          />
          {invalidInput.username && <Text style={styles.errorText}>Invalid Username</Text>}
          <Input
            label="Username"
            value={editedData.username}
            onChangeText={(text) => setEditedData({ ...editedData, username: text })}
          />
          <Button title="Save" onPress={handlesubmit} buttonStyle={styles.saveButton} />
        </View>
      </Overlay>
      <ProfilePopup 
        visible={showPassVal} 
        onClose={() => setShowPassVal(false)}
        onSubmit={handleSave}
      />
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
