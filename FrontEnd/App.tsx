import React, { useContext } from "react";
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import { NavContext } from "./Context/Context";
// Navigation
import { NavProvider } from "./Context/Context";

// New_UI_Pages
import ChatPage from "./Pages/ChatPage/ChatPage";
import HomePage from "./Pages/HomePage";
import WelcomePage from "./Pages/WelcomePage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/ProfilePage";
import Settings from "./Pages/SettingsPage";
import ChooseProPic from "./Pages/ChooseProPic";

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { isLoggedIn } = useContext(NavContext);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      {isLoggedIn ? (
        <>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="ChatPage" component={ChatPage} /> 
      </>
      ):(
      <>
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="ChooseProPic" component={ChooseProPic} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
      </>
      )}
      

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavProvider>
      <NavigationContainer>
        <View style={styles.container}>
          {/* <ValidateUser /> */}
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
