import React, { useState,useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavContext } from '../../Context/Context';
import End2End from '../../Services/End2End';
import { register } from '../../API/api';
import AsyncStorageUtil from '../../Services/AsyncStorage';
import { styles } from '../Styles/ChooseProPic';
// Profile Pictures
const profilePics = [
  { id: 1, path: require("../../Assets/ProfilePicSet/ProfileSet3.jpg") },
  { id: 2, path: require("../../Assets/ProfilePicSet/ProfileSet1.jpg") },
  { id: 3, path: require("../../Assets/ProfilePicSet/ProfileSet2.jpg") },
  { id: 4, path: require("../../Assets/ProfilePicSet/ProfileSet.jpg") },
  { id: 5, path: require("../../Assets/ProfilePicSet/ProfileSet4.jpg") },
  { id: 6, path: require("../../Assets/ProfilePicSet/ProfileSet5.jpg") },
];

export default function ChooseProPic({ route,navigation  }) {
  const { setUserProfilePic,setPrivateKey,setSenderEmail, setUsername, setIsLoggedIn, userProfilePic } = useContext(NavContext)
  const {user} = route.params;
  const [selectedPic, setSelectedPic] = useState(null);
  const handleSelectPicture = (pic) => {
    setSelectedPic(pic);
  };

  const handleConfirm = async () => {
    try{
    if (selectedPic) {
        setUserProfilePic(selectedPic.path);
        const keyPair = await End2End.generateKey();
        const encryptedPrivateKey = End2End.encryptPrivateKey(keyPair.private, user.password);
        const response = await register(user.email, user.username, user.password, keyPair.public, encryptedPrivateKey, selectedPic.path);
        setPrivateKey(keyPair.private);
        setSenderEmail(user.email);
        setUsername(user.username);
        setIsLoggedIn(true);
        try
        {
          await AsyncStorageUtil.storeUserData(user.email, user.username, keyPair.private, user.password,selectedPic.path);
          await AsyncStorageUtil.storeToken(response.token);
        }catch(error)
        {
          console.error('Error storing user data:', error);
        }
        navigation.navigate('HomePage');
    }
  }catch (error) {
    console.error('Register error', error); 
    if (error.response) {
      Alert.alert('Register Error', error.response.data);
    } else if (error.request) {
      Alert.alert('Register Error', 'No response from the server');
    } else {
      Alert.alert('Register Error', 'Failed to send request');
    }
  }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Choose Profile Picture</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text h4 style={styles.title}>Choose your profile picture</Text>
        <View style={styles.gridContainer}>
          {profilePics.map((pic) => (
            <TouchableOpacity
              key={pic.id}
              style={[
                styles.picContainer,
                selectedPic && selectedPic.id === pic.id && styles.selectedPicContainer,
              ]}
              onPress={() => handleSelectPicture(pic)}
            >
              <Image source={pic.path} style={styles.profilePic} />
            </TouchableOpacity>
          ))}
        </View>
        <Button
          title="Confirm"
          onPress={handleConfirm}
          disabled={!selectedPic}
          buttonStyle={styles.confirmButton}
          containerStyle={styles.confirmButtonContainer}
        />
      </View>
    </SafeAreaView>
  );
}