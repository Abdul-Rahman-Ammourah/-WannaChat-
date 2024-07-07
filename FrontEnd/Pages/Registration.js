import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, TextInput,Alert } from 'react-native';

//Images
import logo from '../Assets/Photos/Logo.png';
//Validation
import Validation from '../Validation/InputValidationLogin';
export default function Register ({ navigation }) {
  const [stats, setStats] = useState({
    
  })
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const handleLogin = () => {
    const valid = Validation(user.email, user.password);

    if (valid) {
      Alert.alert('Login successful! \n' + user.email + '\n' + user.password);
      navigation.navigate('Home');
    } else {
      Alert.alert('Login Unsuccessful!\n '+ user.email + '\n' + user.password);
    }
  }
  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} ></Image>
      </View>

      <Text style={styles.subtitle}>Login or create a new account</Text>

      <View style={styles.inputContainer}> 
        <TextInput placeholder='Email' 
                   placeholderTextColor={"rgba(0, 0, 0, 0.5)"} 
                   keyboardType='email-address'
                   value={user.email}
                   onChangeText={(text) => {setUser({ ...user, email: text })}}></TextInput>
      </View>

      <View style={styles.inputContainer}> 
        <TextInput placeholder='Password' 
                   placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                   secureTextEntry
                   value={user.password}
                   onChangeText={(text) => {setUser({ ...user, password: text })}}></TextInput>
      </View>
      
      <View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAnAccount')}>
          <Text style={styles.buttonText}>Create an account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Backdoor</Text>
        </TouchableOpacity>
      </View>

      
      
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