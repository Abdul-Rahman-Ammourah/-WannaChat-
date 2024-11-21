import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Animated, Keyboard, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import { LoginValidation } from '../../Services/InputValidation';
import End2End from '../../Services/End2End';
import { login } from '../../API/api';
import { NavContext } from '../../Context/Context';
import AsyncStorageUtil from '../../Services/AsyncStorage';
import TipsDisplayer from '../../Services/TipsDisplayer';
import { styles } from '../Styles/WelcomePage';

export default WelcomePage = ({ navigation }) => {
  const { setSenderEmail, setPrivateKey, setUsername, setIsLoggedIn, setUserProfilePic, setToken } = useContext(NavContext);
  const [showpass, setShowpass] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Login form
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // Handle invalid input
  const [stats, setStats] = useState({
    invalid: false,
    errorMessage: '',
  });

  const handleLoginTrans = () => {
    setShowLoginForm(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = async () => {
    const valid = LoginValidation(user.email, user.password);
    if (valid) {
      setStats({ ...stats, invalid: false });
      try {
        const response = await login(user.email, user.password);
        if (response.privateKey) {
          const decryptedPrivateKey = await End2End.decryptPrivateKey(response.privateKey, user.password);
          setPrivateKey(decryptedPrivateKey);
          setSenderEmail(user.email);
          setUsername(response.username);
          setUserProfilePic(response.profilePic);
          setIsLoggedIn(true);
          setToken(response.token);
          try {
            await AsyncStorageUtil.storeUserData(user.email, response.username, decryptedPrivateKey, user.password, response.profilePic);
            await AsyncStorageUtil.storeToken(response.token);
          } catch (error) {
            console.error('Error storing user data or token:', error);
          }
          navigation.navigate('HomePage');
        } else {
          throw new Error('Private key is missing in the response');
        }
      } catch (error) {
        let errorMessage = 'An unexpected error occurred';
        if (error.response) {
          console.error('Login Error:', error.response.data);
          errorMessage = error.response.data.message || 'Login failed';
        } else if (error.request) {
          console.error('No response from server:', error.request);
          errorMessage = 'No response from server';
        } else {
          console.error('Error setting up request:', error.message);
          errorMessage = 'Failed to send request';
        }

        Alert.alert('Login Error', errorMessage);
        setStats({ ...stats, invalid: true, errorMessage });
      }
    } else {
      setStats({ ...stats, invalid: true, errorMessage: 'Invalid email or password format' });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: -10 })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text h1 style={styles.title}>WannaChat</Text>
            <Text style={styles.description}>Chat With Your Friends, Securely</Text>
            {!showLoginForm && (
              <>
                <Button
                  title="Login"
                  buttonStyle={styles.loginButton}
                  containerStyle={styles.buttonContainer}
                  onPress={handleLoginTrans}
                />
                <Button
                  title="Register"
                  type="outline"
                  buttonStyle={styles.registerButton}
                  containerStyle={styles.buttonContainer}
                  titleStyle={styles.registerButtonText}
                  onPress={() => navigation.navigate('RegisterPage')}
                />
              </>
            )}
            {showLoginForm && (
              <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
                {stats.invalid && <Text style={styles.invalid}>{stats.errorMessage || 'Email or password is incorrect'}</Text>}
                <Input
                  placeholder="Enter email"
                  leftIcon={{ type: 'material', name: 'email' }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  containerStyle={styles.inputContainer}
                  onChangeText={(text) => setUser({ ...user, email: text })}
                />
                <Input
                  placeholder="Enter password"
                  leftIcon={{ type: 'material', name: 'lock' }}
                  rightIcon={{ type: 'material-community', name: showpass ? 'eye' : 'eye-off', onPress: () => setShowpass(!showpass) }}
                  secureTextEntry={showpass}
                  containerStyle={styles.inputContainer}
                  onChangeText={(text) => setUser({ ...user, password: text })}
                />
                <Button
                  title="Sign In"
                  buttonStyle={styles.signInButton}
                  containerStyle={styles.buttonContainer}
                  onPress={handleLogin}
                />
                <Button
                  title="Create an account"
                  type="clear"
                  titleStyle={styles.createAccountText}
                  containerStyle={styles.createAccountContainer}
                  onPress={() => navigation.navigate('RegisterPage')}
                />
              </Animated.View>
            )}
            <Text style={styles.terms}>
              By using WannaChat, you agree to our Terms of Service and Privacy Policy.
            </Text>
            <Text style={styles.terms}>Created by: Abdul-Rahman Ammourah</Text>
            <TipsDisplayer />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};