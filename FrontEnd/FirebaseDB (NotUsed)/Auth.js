import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { ref, set, push } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase"; // Import the auth and db instances from your Firebase config

export default function RealtimeDatabaseExample() {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        try {
            // Register user with email and password from state
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Save user data to Firebase Realtime Database
            if (user.uid) {
                writeUserData(user.uid, email);
                console.log("Registered successfully with UID:", user.uid);
            }
            
            // Set userId state to the registered user's UID
            setUserId(user.uid);
            console.log("Registered successfully ");
        } catch (error) {
            console.error("Registration error", error.message);
        }
    };

    async function writeUserData(userId, email)  {
        const userRef = ref (db, 'Users/' + userId);
        // Write user data to Firebase Realtime Database
        await set(userRef, {
            id: userId,
            email: email
        })
    }

    function addMessage(userId, message) {
        if (userId && message) {
            // Push a new message under the user's messages in Firebase Realtime Database
            const newMessageRef = push(ref(db, 'Messages/' + userId));
            set(newMessageRef, {
                message: message,
            }).then(() => {
                console.log("Message sent successfully!");
                setMessage(""); // Clear the input after sending
            }).catch((error) => {
                console.error("Failed to send message: ", error);
            });
        } else {
            console.error("User ID or message is missing!");
        }
    }

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />
            <Button
                title="Register"
                onPress={handleRegister}
            />
            <TextInput
                placeholder="Message"
                value={message}
                onChangeText={(text) => setMessage(text)}
            />
            <Button
                title="Send Message"
                onPress={() => addMessage(userId, message)}
            />
        </View>
    );
}
