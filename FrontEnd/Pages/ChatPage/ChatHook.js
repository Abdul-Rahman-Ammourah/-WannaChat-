import { useEffect, useState, useContext } from 'react';
import * as SignalR from '@microsoft/signalr';
import { NavContext } from '../../Context/Context';
import End2End from '../../Services/End2End';

const useSignalR = (senderEmail) => {
  const { setConID, receiverEmail, publicKey,token } = useContext(NavContext);

  const serverUrl = 'https://charming-hornet-finally.ngrok-free.app/Chathub';
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionId, setConnectionId] = useState(null);
  useEffect(() => {
    const connect = async () => {
      const newConnection = new SignalR.HubConnectionBuilder()
        .withUrl(serverUrl,{
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

      newConnection.on('ReceiveMessage', (fromConnectionId, message) => {
        setMessages([{ fromConnectionId, message }]);
      });

      newConnection.onreconnected(() => {
        setIsConnected(true);
      });

      newConnection.onreconnecting(() => {
        setIsConnected(false);
      });

      try {
        await newConnection.start();
        setConnection(newConnection);
        setIsConnected(true);

        // Retrieve the sender connection ID
        const id = await newConnection.invoke('GetConnectionId');
        setConnectionId(id);

        try {
          // Map the email with the connection ID
          await newConnection.invoke('RegisterConnectionId', senderEmail);

          // Function to get the connection ID of the receiver
          const getReceiverConnectionId = async () => {
            const targetConnectionId = await newConnection.invoke('GetConnectionIdByEmail', receiverEmail);
            setConID(targetConnectionId);
          };

          // Call it once immediately
          await getReceiverConnectionId();

          // Set up a recurring call every 1000ms (1 second)
          const intervalId = setInterval(async () => {
            await getReceiverConnectionId();
          }, 2000);

          // Clean up interval on unmount
          return () => {
            clearInterval(intervalId);
          };

        } catch (error) {
          console.log("RegisterConnectionId error:", error);
        }
      } catch (error) {
        console.error('Connection failed: ', error);
      }
    };

    connect();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [serverUrl, senderEmail, receiverEmail, setConID]);

  const sendMessage = async (connectionIdToSend, message) => {
    if (connection && isConnected) {
      try {
        const encryptedMessage = await End2End.encryptMessage(message, publicKey);
        await connection.invoke('SendToUser', connectionIdToSend, encryptedMessage);
      } catch (error) {
        console.error('Message send failed: ', error);
      }
    } else {
      console.error("Cannot send message: Connection is not established.");
    }
  };
  return { messages, sendMessage, isConnected, connectionId };
};

export default useSignalR;
