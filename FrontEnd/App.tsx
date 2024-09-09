import React,{useContext,useEffect} from "react";
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import { NavContext } from "./Context/Context";
// Navigation
import { NavProvider } from "./Context/Context";
// Pages
import Welcome from "./Lagacy/Welcome";//Lagacy
import Home from "./Lagacy/Home";
import Register from "./Lagacy/Registration";//Lagacy
import Profile from "./Lagacy/Profile";
import Chat from "./Pages/ChatPage/Chat";
import Settings from "./Pages/Settings";
import ChatScreen from "./Pages/ChatPage/ChatTestSignalR/ChatTest";
//New_UI_Pages
import ChatPage from "./Pages/ChatPage/ChatPage";
import HomePage from "./Pages/HomePage";
import WelcomePage from "./Pages/WelcomePage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/ProfilePage";
const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { isLoggedIn } = useContext(NavContext);
  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "HomePage" : "WelcomePage" }
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Settings" component={Settings} />
      {/* TEMP */}
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="WelcomePage" component={WelcomePage} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
      <Stack.Screen name="ChatPage" component={ChatPage} />

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