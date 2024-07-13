import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';

//Images
import logo from '../Assets/Photos/Logo.png';

export default function Welcome ({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} ></Image>
      </View>

      <Text style={styles.subtitle}>Welcome to my secure messaging app</Text>

      <Text style={styles.createdBy}>Created by the one the only{'\n\n'}Abdul-Rahman Ammourah</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the top
    paddingTop: 60, // Adjust this value as needed
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 200, // Set a specific width
    height: 200, // Set a specific height
    resizeMode: 'contain',
  },
  createdBy: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    backgroundColor: '#6495ED', // Blue color for the button
    padding: 10,
    borderRadius: 5,
    top: 45
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});