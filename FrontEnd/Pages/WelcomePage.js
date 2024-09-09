import React, { useState, useRef,useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Animated, Keyboard, TouchableWithoutFeedback,Alert } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import { LoginValidation } from '../Services/InputValidation';
import End2End from '../Services/End2End';
import { login } from '../API/api';
import { NavContext } from '../Context/Context';
import AsyncStorageUtil from '../Services/AsyncStorage';
const WelcomePage = ({ navigation }) => {
  const { setSenderEmail, setPrivateKey, setUsername,setIsLoggedIn,setUserProfilePic } = useContext(NavContext);
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
          try
          {
            await AsyncStorageUtil.storeUserData(user.email, response.username, decryptedPrivateKey, user.password);

          }catch(error)
          {
            console.error('Error storing user data:', error);
          }
          navigation.navigate('HomePage');
        } else {
          throw new Error('Private key is missing in the response');
        }
      } catch (error) {
        let errorMessage = 'An unexpected error occurred';
        if (error.response) {
          // Check the error response data
          console.error('Login Error:', error.response.data);
          errorMessage = error.response.data.message || 'Login failed';
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response from server:', error.request);
          errorMessage = 'No response from server';
        } else {
          // Something happened in setting up the request that triggered an error
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
                rightIcon={{ type: 'material-community', name: showpass ? 'eye' : 'eye-off' ,onPress: () => setShowpass(!showpass)} }
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
          
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light blue background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#1E88E5',
    marginBottom: 20,
    fontSize: 48,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: '#424242',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#1E88E5',
    borderRadius: 25,
    paddingVertical: 15,
  },
  registerButton: {
    borderColor: '#1E88E5',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 15,
  },
  registerButtonText: {
    color: '#1E88E5',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  signInButton: {
    backgroundColor: '#1E88E5',
    borderRadius: 25,
    paddingVertical: 15,
  },
  createAccountContainer: {
    marginTop: 10,
  },
  createAccountText: {
    color: '#1E88E5',
    fontSize: 16,
  },
  terms: {
    marginTop: 30,
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
  },
  invalid: {
    alignSelf: 'center',
    textAlign: 'left',
    color: 'rgba(255, 0, 0, 0.7)',
    fontSize: 14,
    fontWeight: 'bold',
    top: -10,
  },
});

export default WelcomePage;