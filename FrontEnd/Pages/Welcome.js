import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Wannachat</Text>
        <Text style={styles.bodyText}>Protect your privacy</Text>
        <Text style={styles.bodyTextSecondary}>Free and secure messaging app</Text>
      </View>

      <View style={styles.Bottom}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.Button}>
                <Text style={styles.buttonText}>Create an account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.Button}>
                <Text style={styles.buttonText}>Already have an account?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.Button}>
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'serif',
    marginBottom: 15,
  },
  bodyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1400FF',
    fontFamily: 'serif',
  },
  bodyTextSecondary: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'serif',
  },
  Bottom: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 245,
    height: 50,
    backgroundColor: '#776BFF',
    marginBottom: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'serif',
  },
});
