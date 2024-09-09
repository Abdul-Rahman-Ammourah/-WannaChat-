import React, { useState, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import AsyncStorageUtil from '../Services/AsyncStorage';
// Validation
import { RegisterValidation } from '../Services/InputValidation';
// API
import { register } from '../API/api';
// Context
import { NavContext } from '../Context/Context';
// End-to-End encryption
import End2End from '../Services/End2End';

export default function RegisterPage({ navigation }) {
  const { setSenderEmail, setPrivateKey, setUsername } = useContext(NavContext);

  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    repassword: '',
  });
  
  const [showpass, setShowpass] = useState(true);
  
  const [stats, setStats] = useState({
    showPass: true,
    ms: false,
    usernameonfailonfocus: false,
    passonfocus: false,
    repassonfocus: false,
    invalidemail: false,
    invalidusername: false,
    invalidpassword: false,
    invalidRepeatPass: false,
  });

  const handleRepeat = (text) => {
    setUser({ ...user, repassword: text });
    setStats({ ...stats, invalidRepeatPass: text !== user.password });
  };

  const handleRegister = async () => {
    const { emailV, userV, passwordV } = RegisterValidation(user.email, user.username, user.password);
    if (emailV && userV && passwordV && user.password === user.repassword) {
      try {
        const keyPair = await End2End.generateKey();
        const encryptedPrivateKey = End2End.encryptPrivateKey(keyPair.private, user.password);
        const response = await register(user.email, user.username, user.password, keyPair.public, encryptedPrivateKey);
        setPrivateKey(keyPair.private);
        setSenderEmail(user.email);
        setUsername(user.username);
        try
        {
          await AsyncStorageUtil.storeUserData(user.email, user.username, keyPair.private);
        }catch(error)
        {
          console.error('Error storing user data:', error);
        }
        navigation.navigate('HomePage');
      } catch (error) {
        console.error('Register error', error); 
        if (error.response) {
          Alert.alert('Register Error', error.response.data);
        } else if (error.request) {
          Alert.alert('Register Error', 'No response from the server');
        } else {
          Alert.alert('Register Error', 'Failed to send request');
        }
      }
    } else {
      setStats({
        ...stats,
        invalidemail: !emailV,
        invalidusername: !userV,
        invalidpassword: !passwordV,
        invalidRepeatPass: user.password !== user.repassword,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <Text h2 style={styles.title}>Create Account</Text>
            <Input
              placeholder="Email"
              leftIcon={{ type: 'material', name: 'email', color: stats.invalidemail ? 'red' : 'black' }}
              onChangeText={(text) => setUser({ ...user, email: text })}
              value={user.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              placeholder="Username"
              leftIcon={{ type: 'material', name: 'person', color: stats.invalidusername ? 'red' : 'black' }}
              onChangeText={(text) => setUser({ ...user, username: text })}
              value={user.username}
              autoCapitalize="none"
            />
            
            <Input
              placeholder="Password"
              leftIcon={{ type: 'material', name: 'lock', color: stats.invalidpassword ? 'red' : 'black' }}
              rightIcon={{ type: 'material-community', name: showpass ? 'eye' : 'eye-off', onPress: () => setShowpass(!showpass) }}
              onChangeText={(text) => setUser({ ...user, password: text })}
              value={user.password}
              secureTextEntry={showpass}
            />
            
            <Input
              placeholder="Repeat Password"
              leftIcon={{ type: 'material', name: 'lock' , color: stats.invalidRepeatPass ? 'red' : 'black' }}
              onChangeText={(text) => handleRepeat(text)}
              value={user.repassword}
              secureTextEntry={showpass}
            />
            
            <Button
              title="Register"
              buttonStyle={styles.registerButton}
              onPress={handleRegister}
              containerStyle={styles.buttonContainer}
            />
            
            <Button
              title="Login"
              type="clear"
              titleStyle={styles.backButtonText}
              containerStyle={styles.buttonContainer}
              onPress={() => navigation.navigate('WelcomePage')} // Add navigation back to Welcome screen
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#1E88E5',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '25%',
    borderRadius: 25,
    marginVertical: 10,
  },
  registerButton: {
    backgroundColor: '#1E88E5',
    borderRadius: 25,
    paddingVertical: 15,
  },
  backButtonText: {
    color: '#1E88E5',
  },
});
