import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TextInput, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native';
import { LoginValidation } from '../Services/InputValidation';
import { Button } from 'react-native-paper';
// Context
import { NavContext } from '../Navigation_Remove_Later/Context';
// API
import { login } from './api';
// End to End encryption
import End2End from '../Services/End2End';
//Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Welcome({ navigation }) {
  const { setSenderEmail, setPrivateKey, setUsername } = useContext(NavContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showpass, setShowpass] = useState(true);
  // Animation references
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateMY = useRef(new Animated.Value(0)).current;
  
  // Login form
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [stats, setStats] = useState({
    invalid: false,
    errorMessage: '',
  });

  useEffect(() => {
    // Animate the vertical position of the text components
    Animated.timing(translateY, {
      toValue: showLogin ? -40 : 0, // Adjust based on how much you want to move up
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Animate the vertical position of the buttons
    Animated.timing(translateMY, {
      toValue: showLogin ? 30 : 0, // Move buttons down when login form is shown
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Animate the opacity of the TextInput fields
    Animated.timing(opacity, {
      toValue: showLogin ? 1 : 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [showLogin]);

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
          setUsername(response.Username);
          navigation.navigate('Home');
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Animated.View style={[styles.textContainer, { transform: [{ translateY }] }]}>
        <Text style={styles.title}>WannaChat</Text>
        <Text style={styles.subtitle}>Protect your privacy</Text>
        <Text style={styles.description}>Free and secure messaging app</Text>
      </Animated.View>

      {showLogin && (
        <Animated.View style={[styles.loginContainer, { opacity }]}>
          {stats.invalid && <Text style={styles.invalid}>{stats.errorMessage || 'Email or password is incorrect'}</Text>}
          <TextInput 
            placeholder='Email'
            placeholderTextColor='rgba(0, 0, 0, 0.5)'
            style={styles.input}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
          <TextInput
            placeholder='Password'
            placeholderTextColor='rgba(0, 0, 0, 0.5)'
            style={styles.input}
            onChangeText={(text) => setUser({ ...user, password: text })}
            secureTextEntry={showpass}
          />
          <TouchableOpacity onPress={() => setShowpass(!showpass)}>
            <Icon name={showpass ? 'eye' : 'eye-off'} color={'black'} size={20} style={styles.icon} />
          </TouchableOpacity>
        </Animated.View>
      )}

      <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: translateMY }] }]}>
        <Button 
          mode="contained" 
          onPress={() => showLogin ? handleLogin() : navigation.navigate('Register')} 
          style={styles.button}
        >
          {showLogin ? 'Login' : 'Create an account'}
        </Button>
        <Button 
          mode="contained" 
          onPress={() => setShowLogin(!showLogin)} 
          style={styles.button}
        >
          {showLogin ? 'Back to Welcome' : 'Already have an account'}
        </Button>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Home')} 
          style={styles.button}
        >
          Home
        </Button>
      </Animated.View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Created By Abdul-Rahman Ammourah</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    color: 'black',
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(20, 0, 255, 1)',
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    color: 'rgba(12, 0, 84, 1)',
    marginTop: 15,
  },
  buttonContainer: {
    width: '70%',
    alignItems: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#776BFF',
    width: '100%',
  },
  loginContainer: {
    width: '70%',
  },
  input: {
    backgroundColor: '#D3ECFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  invalid: {
    alignSelf: 'center',
    textAlign: 'left',
    color: 'rgba(255, 0, 0, 0.7)',
    fontSize: 14,
    fontWeight: 'bold',
    top: -10,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
  },
  footerText: {
    fontSize: 13,
    color: 'black',
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: 23,
  },
});
