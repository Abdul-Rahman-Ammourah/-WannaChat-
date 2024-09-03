import { ref, set, push } from "firebase/database";
import { db } from "./Firebase"; // Import the db instance from your Firebase config
function writeUserData(userId, name, email) {
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
    }).then(() => {
        console.log("Data saved successfully!");
    }).catch((error) => {
        console.log("Failed to save data: ", error);
    });
}

function addMessage(userId, message) {
    const messageListRef = ref(db, 'messages/' + userId);
    const newMessageRef = push(messageListRef);
    set(newMessageRef, {
        message: message,
        timestamp: Date.now()
    }).then(() => {
        console.log("Message added successfully!");
    }).catch((error) => {
        console.log("Failed to add message: ", error);
    });
}

function updateUserEmail(userId, newEmail) {
    const userRef = ref(db, 'users/' + userId);
    update(userRef, {
        email: newEmail
    }).then(() => {
        console.log("Email updated successfully!");
    }).catch((error) => {
        console.log("Failed to update email: ", error);
    });
}

function deleteUser(userId) {
    const userRef = ref(db, 'users/' + userId);
    remove(userRef).then(() => {
        console.log("User deleted successfully!");
    }).catch((error) => {
        console.log("Failed to delete user: ", error);
    });
}


export { writeUserData, addMessage, updateUserEmail, deleteUser };