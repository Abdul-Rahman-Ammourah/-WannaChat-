import React from "react";
import { View,Text } from "react-native";
import { Button } from "react-native-paper";

export default function Settings({navigation}) {
    return (
        <View>
            <Text>Settings Page</Text>
            <Button onPress={() => navigation.navigate('Profile')} style={{ borderColor: 'black', borderWidth: 1 }}> Go back</Button>
        </View>
    );
}