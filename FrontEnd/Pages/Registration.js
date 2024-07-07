import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, TextInput } from 'react-native';

//Images
import logo from '../Assets/Photos/Logo.png';

export default function Register ({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} ></Image>
      </View>

      <Text style={styles.subtitle}>Login or create a new account</Text>

      <View style={styles.inputContainer}> 
        <TextInput placeholder='Email' placeholderTextColor={"rgba(0, 0, 0, 0.5)"}></TextInput>
      </View>
      <View style={styles.inputContainer}> 
        <TextInput placeholder='Password' placeholderTextColor={"rgba(0, 0, 0, 0.5)"}></TextInput>
      </View>

      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAnAccount')}>
          <Text style={styles.buttonText}>Create an account</Text>
        </TouchableOpacity>
      </View>

      
      
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
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
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  createdBy: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    width:250,
    backgroundColor: '#6495ED', // Blue color for the button
    padding: 10,
    borderRadius: 5,
    marginTop:10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer:{
    backgroundColor:"#6495ED",
    width:250,
    borderRadius:5,
    marginTop:10,
    marginBottom:10,
    paddingLeft:10
  },
  input:{
    backgroundColor:"#6495ED"
  }
});