import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import TipsDisplayer from '../../Services/TipsDisplayer';
import { styles } from '../Styles/RegisterPage';
// Validation
import { RegisterValidation } from '../../Services/InputValidation';
// API
import { validateDub } from '../../API/api';

export default function RegisterPage({ navigation }) {
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
        const response = await validateDub(user.email);
        if (!response.data) {
          navigation.navigate('ChooseProPic', { user: user });
        } else {
          Alert.alert('Email already in use');
        }
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: -30 })}
    >
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
                leftIcon={{ type: 'material', name: 'lock', color: stats.invalidRepeatPass ? 'red' : 'black' }}
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
                onPress={() => navigation.navigate('WelcomePage')}
              />
            </View>
          </ScrollView>

          {/* Centered TipsDisplayer */}
          <View style={styles.tipsContainer}>
            <TipsDisplayer />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}