import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Pages
import Welcome from "./Pages/Welcome";
import CreateAnAccount from "./Pages/CreateAnAccount";
import Registration from "./Pages/Registration";

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
          initialRouteName="Welcome" 
          screenOptions={{ headerShown: false,animation:"fade_from_bottom" }}>
            
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="CreateAnAccount" component={CreateAnAccount} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
