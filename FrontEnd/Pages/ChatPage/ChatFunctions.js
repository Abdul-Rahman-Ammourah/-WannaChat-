import { getMessage, sendMessage } from "../../API/api"; 
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
export function useSignalR() {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      const newConnection = new SignalR.HubConnectionBuilder()
        .withUrl('https://charming-hornet-finally.ngrok-free.app/chatHub') // Replace with your backend URL
        .build();
  
      newConnection.on('ReceiveMessage', (user, message) => {
        console.log('ReceiveMessage: ', user, message);
        setMessages(prevMessages => [...prevMessages, { user, message }]);
      });
  
      newConnection.start()
        .then(() => {
          console.log('SignalR Connected');
          setConnection(newConnection);
        })
        .catch(err => console.error('SignalR Connection Error: ', err));
  
      return () => {
        console.log('SignalR Disconnected');
        newConnection.stop();
      };
    }, []);
  
    const sendMessageToUser = (email, user, message) => {
      if (connection) {
        connection.invoke('SendMessageToUser', email, user, message)
          .catch(err => console.error('SendMessage Error: ', err));
      }
    };
  
    return { sendMessageToUser, messages };
  }
  