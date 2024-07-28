import React from 'react';
import { View, StyleSheet, Image, Text, Animated } from 'react-native';
//Logo
import logo from '../Assets/Photos/Logo.png';

//CustomComponents
import Spacer from '../CustomComponent/spacer';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        <Spacer size={45} />
        
        <Text style={styles.title}>Welcome to my sweet secure {'\n'} messaging app</Text>

        <Spacer size={50} />

        <Text style={styles.subTitle}>Created by Abdul-Rahman Ammourah</Text>

        <Spacer size={50} />

        <Text style={styles.subTitle}>Get started</Text>

        <Spacer size={45} />

        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate('Login')}>Login</Text>
          <Text style={styles.buttonText} onPress={() => navigation.navigate('Register')}>Register</Text>
        </View>
        <Text style={styles.buttonText} onPress={() => navigation.navigate('Home')}>Home</Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7B61FF', // The background color you provided in the image
  },
  card: {
    width: '90%', // Adjust the width as needed
    height: '95%', // Adjust the height as needed
    backgroundColor: 'white',
    borderRadius: 20, // This will create the rounded corners
    shadowColor: '#000', // Add shadow if needed
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Add elevation for Android shadow
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 75,
  },
  logoContainer: {
    borderRadius: 20,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7B61FF',
    height: 125,
    width: 175,
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 175,
    resizeMode: 'contain', 
    
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Jungle, sans-serif',
  },
  subTitle:{
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Jungle, sans-serif',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#7B61FF',
    borderRadius: 10,
    width: '45%',
    fontFamily: 'Jungle, sans-serif',
  },
});

export default Welcome;
