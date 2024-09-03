import { ref, get, onValue } from "firebase/database";
import { db } from "./Firebase"; // Import the db instance from your Firebase config


function readUserData(userId) {
    const userRef = ref(db, 'Messages/' + userId);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.log("Failed to read data: ", error);
    });
}

// Listening for real-time updates
function listenForMessages(userId) {
    const messagesRef = ref(db, 'messages/' + userId);
    onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Messages: ", data);
    }, {
        onlyOnce: false // If true, the listener stops listening after the first update
    });
}

export { readUserData, listenForMessages };