import React from "react";
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
// Navigation
import { NavProvider } from "./Navigation_Remove_Later/Context";
// Pages
import Welcome from "./Pages/Welcome";
import Home from "./Pages/Home";
import Register from "./Pages/Registration";
import Call from "./Pages/Call";
import Profile from "./Pages/Profile";
import Chat from "./Pages/ChatPage/Chat";
import Settings from "./Pages/Settings";
//Temp
import GlobalChat from "./Pages/ChatPage/GlobalChat";
const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      {/* Later */}
      <Stack.Screen name="Call" component={Call} /> 
      {/* Later */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="GlobalChat" component={GlobalChat} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default function App() {

  return (
    <NavProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <View style={styles.content}>
            <MainNavigator />
          </View>
        </View>
      </NavigationContainer>
    </NavProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});