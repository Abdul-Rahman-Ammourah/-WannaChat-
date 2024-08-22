import { getMessage, sendMessage } from "../api"; 
import End2End from "../../Services/End2End";
import * as SignalR from '@microsoft/signalr';

export const fetchMessages = async (senderEmail, privateKey, setMessages) => {
    try {
        const receiverEmail = senderEmail;
        const fetchedMessages = await getMessage(receiverEmail, senderEmail);

        const decryptedMessages = await Promise.all(
            fetchedMessages.map(async (msg) => {
                const decryptedText = await End2End.decryptMessage(msg.message, privateKey);
                return {
                    id: msg._id,
                    text: decryptedText,
                    type: msg.fromEmail === senderEmail ? 'sent' : 'received',
                };
            })
        );

        setMessages(decryptedMessages);
    } catch (error) {
        console.error("Error fetching or decrypting messages:", error);
    }
};

export const handleSend = async (newMessage, senderEmail, receiverEmail, publicKey, setMessages, flatListRef, setNewMessage) => {
    if (newMessage.trim()) {
        const encryptedMessage = await End2End.encryptMessage(newMessage, publicKey);

        const messageToSend = {
            fromEmail: senderEmail,
            toEmail: receiverEmail,
            message: encryptedMessage,
        };

        try {
            await sendMessage(messageToSend.fromEmail, messageToSend.toEmail, messageToSend.message);

            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now().toString(), text: newMessage, type: 'sent' }
            ]);

            setNewMessage("");

            flatListRef.current?.scrollToEnd({ animated: true });

        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
};