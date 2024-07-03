//Ammourah and v2Kt5l2EdZlMf6vZ (Admin)
//Bulding the app ./gradlew assembleRelease
import React from "react";
import { View, Text, Modal,StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Pages
import Signup from "./Pages/Login&Signup";
import UnderCon from "./Pages/Under-Construction";
import CreateAccount from "./Pages/CreateAccount";
import Contacts from "./Pages/Contacts";
import Messaging from "./Pages/Messaging";

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup" 
          screenOptions={{
          headerShown: false,
          animation:'slide_from_right' }}>


        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="UnderCon" component={UnderCon} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="Messaging" component={Messaging} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}