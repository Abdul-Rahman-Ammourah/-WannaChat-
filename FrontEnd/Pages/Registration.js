import React, { useState,useContext } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image,Alert } from 'react-native';
// Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import openeye from '../Assets/Icons/openedEye.png';
import closeeye from '../Assets/Icons/closedEye.png';
// Validation
import { RegisterValidation } from '../Services/InputValidation';
//api
import { register } from '../API/api';
//Context
import { NavContext } from '../Context/Context';
//End to End encryption
import End2End from '../Services/End2End';
const RegisterScreen = ({ navigation }) => {
  const { setSenderEmail, setPrivateKey, setUsername } = useContext(NavContext);
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    repassword: '',
  });

  const [stats, setStats] = useState({
    showPass: true,
    mailonfocus: false,
    usernameonfocus: false,
    passonfocus: false,
    repassonfocus: false,
    invalidemail: false,
    invalidusername: false,
    invalidpassword: false,
    invalidRepeatPass: false,
  });

  const handleRegister = async () => {
    const { emailV, userV, passwordV } = RegisterValidation(user.email, user.username, user.password);
    if (emailV && userV && passwordV && user.password === user.repassword) {
      try {
        const keyPair = await End2End.generateKey();
        const encryptedPrivateKey = End2End.encryptPrivateKey(keyPair.private,user.password);
        const response = await register(user.email,user.username, user.password,keyPair.public,encryptedPrivateKey);
        setPrivateKey(keyPair.private);
        setSenderEmail(user.email);
        setUsername(user.username);
        navigation.navigate('Home');
      } catch (error) {
        console.error('Register error', error); // This will log the actual error
        if (error.response) {
          // Error response from the server
          Alert.alert('Register Error', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request error:', error.request);
          Alert.alert('Register Error', 'No response from the server');
        } else {
          // Something happened in setting up the request that triggered an error
          console.error('Error setting up request:', error.message);
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

  const handleRepeat = (text) => {
    setUser({ ...user, repassword: text });
    setStats({ ...stats, invalidRepeatPass: text !== user.password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create your account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your email</Text>
        <TextInput
          style={[
            styles.input,
            stats.mailonfocus && styles.inputFocused,
            stats.invalidemail && styles.inputInvalid,
          ]}
          placeholder="example@example.com"
          placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
          onFocus={() => setStats({ ...stats, mailonfocus: true })}
          onBlur={() => setStats({ ...stats, mailonfocus: false })}
          onChangeText={(text) => setUser({ ...user, email: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your username</Text>
        <TextInput
          style={[
            styles.input,
            stats.usernameonfocus && styles.inputFocused,
            stats.invalidusername && styles.inputInvalid,
          ]}
          placeholder="Your username"
          placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
          onFocus={() => setStats({ ...stats, usernameonfocus: true })}
          onBlur={() => setStats({ ...stats, usernameonfocus: false })}
          onChangeText={(text) => setUser({ ...user, username: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your password</Text>
        <TextInput
          style={[
            styles.input,
            stats.passonfocus && styles.inputFocused,
            stats.invalidpassword && styles.inputInvalid,
          ]}
          placeholder="Make it strong"
          secureTextEntry={stats.showPass}
          placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
          onFocus={() => setStats({ ...stats, passonfocus: true })}
          onBlur={() => setStats({ ...stats, passonfocus: false })}
          onChangeText={(text) => setUser({ ...user, password: text })}
        />
        <TouchableOpacity onPress={() => setStats({ ...stats, showPass: !stats.showPass })}>
          <Icon name={stats.showPass ? 'eye' : 'eye-off'} color={'black'} size={20} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Repeat password</Text>
        <TextInput
          style={[
            styles.input,
            stats.repassonfocus && styles.inputFocused,
            stats.invalidRepeatPass && styles.inputInvalid,
          ]}
          placeholder="Again please"
          secureTextEntry={true}
          placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
          onFocus={() => setStats({ ...stats, repassonfocus: true })}
          onBlur={() => setStats({ ...stats, repassonfocus: false })}
          onChangeText={(text) => handleRepeat(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Already have an account?</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  header: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#D3ECFF',
  },
  inputFocused: {
    borderColor: '#7B61FF',
    backgroundColor: 'white',
  },
  inputInvalid: {
    borderColor: 'red',
    backgroundColor: '#fdd',
  },
  icon: {
    position: 'absolute',
    right: 14,
    bottom: 12,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#7B61FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});

export default RegisterScreen;
