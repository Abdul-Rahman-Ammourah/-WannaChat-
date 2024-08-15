import React, { useState, useEffect, useRef } from 'react';
import { View,Text, StyleSheet, Animated, Easing, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LoginValidation } from '../Validation/validation';
import { Button,TextInput as PaperTextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WannaChatScreen = ({ navigation }) => {
  const [showLogin, setShowLogin] = useState(false);
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
    invalid: false
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
        console.log(response);
        navigation.navigate('Home');
        
      } catch (error) {
        if (error.response) {
          // Check the error response data
          console.error('Login Error:', error.response.data);
          Alert.alert('Login Error', error.response.data);
        } else {
          // Handle network or other errors
          Alert.alert('Login Error', 'Network Error or Server Down');
        }
      }
    } else {
      setStats({ ...stats, invalid: true });
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
          {stats.invalid && <Text style={styles.invalid}>Email or password is incorrect</Text>}
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
            secureTextEntry={true}
          />
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
          {showLogin ? 'Back to home' : 'Already have an account'}
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
    bottom:20,
  },
  footerText: {
    fontSize: 13,
    color: 'black',
  },
});

export default WannaChatScreen;
