import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
// Navigation
import { NavProvider } from "./Navigation/NavContext";
// Pages
import Welcome from "./Pages/Welcome";
import Home from "./Pages/Home";
import Register from "./Pages/Registration";
import Login from "./Pages/Login";
import Call from "./Pages/Call";
import Profile from "./Pages/Profile";
import Footernav from "./Navigation/Navigationfooter";
import Chat from "./Pages/Chat";

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
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Call" component={Call} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [showFooter, setShowFooter] = React.useState(false);

  return (
    <NavProvider>
      <NavigationContainer
        onStateChange={(state) => {
          const currentRoute = state?.routes[state.index].name;
          setShowFooter(currentRoute !== "Welcome" && currentRoute !== "Login" && currentRoute !== "Register");
        }}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <MainNavigator />
          </View>
          {showFooter && <Footernav />}
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
