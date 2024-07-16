import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image,Alert } from 'react-native';
// CustomComponent
import Spacer from '../CustomComponent/spacer';
// Validation
import { LoginValidation } from '../Validation/validation';
//Icons
import openeye from '../Assets/Icons/openedEye.png';
import closeeye from '../Assets/Icons/closedEye.png';
//api
import { login } from './api';
const LoginScreen = ({ navigation }) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [stats, setStats] = useState({
        showPass: true,
        mailonfocus: false,
        passonfocus: false,
        invalid: false
    });

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
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            {stats.invalid && <Text style={styles.invalid}>Email or password is incorrect</Text>}
            <Spacer size={45} />
            
            <View style={styles.inputContainer}>
                <Text style={styles.label}>email</Text>
                <TextInput
                    style={[styles.input, stats.mailonfocus && styles.inputFocused]}
                    placeholder="example@example.com"
                    placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                    onFocus={() => setStats({ ...stats, mailonfocus: true })}
                    onBlur={() => setStats({ ...stats, mailonfocus: false })}
                    onChangeText={(text) => setUser({ ...user, email: text })}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>password</Text>
                <TextInput
                    style={[styles.input, stats.passonfocus && styles.inputFocused]}
                    placeholder="Make it right"
                    placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                    secureTextEntry={stats.showPass}
                    onFocus={() => setStats({ ...stats, passonfocus: true })}
                    onBlur={() => setStats({ ...stats, passonfocus: false })}
                    onChangeText={(text) => setUser({ ...user, password: text })}
                />
                <TouchableOpacity onPress={() => setStats({ ...stats, showPass: !stats.showPass })}>
                    <Image source={stats.showPass ? openeye : closeeye} style={styles.icon}/>
                </TouchableOpacity>
            </View>

            <Spacer size={30} />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>Don't have an account?</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Register</Text>
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
    invalid: {
        textAlign: 'left',
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',
    },
    inputFocused: {
        borderColor: '#7B61FF',
        backgroundColor: 'white',
    },
    icon: {
        position: 'absolute',
        right: 14,
        bottom: 15,
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
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
});

export default LoginScreen;
