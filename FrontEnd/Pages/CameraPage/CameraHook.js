import { useContext, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { NavContext } from '../../Context/Context';

export default function useSignalRVideo(peerConnection) {
  const { token, senderEmail, receiverEmail } = useContext(NavContext);
  const connectionRef = useRef(null);
  const serverURL = 'https://wannachat.fly.dev/Videohub';

  useEffect(() => {
    // Create the SignalR connection
    const connection = new HubConnectionBuilder()
      .withUrl(serverURL, {
        accessTokenFactory: () => token, // JWT token for authentication
      })
      .build();

    // Store the connection reference
    connectionRef.current = connection;

    // Event handler for receiving signaling messages
    connection.on('ReceiveSignalingMessage', async (fromConnectionId, message) => {
      const signal = JSON.parse(message);
      
      if (signal.sdp) {
        // Handle SDP offer/answer
        if (signal.type === 'offer') {
          await peerConnection.setRemoteDescription(signal);
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          connection.invoke('SendSignalingMessage', fromConnectionId, JSON.stringify(answer));
        } else if (signal.type === 'answer') {
          await peerConnection.setRemoteDescription(signal);
        }
      } else if (signal.candidate) {
        // Handle ICE candidate
        await peerConnection.addIceCandidate(signal.candidate);
      }
    });

    // Start the SignalR connection and register the user
    const startConnection = async () => {
      try {
        await connection.start();
        console.log('SignalR connection established.');
        await connection.invoke('RegisterConnection', senderEmail);
        console.log('User registered successfully.');
      } catch (error) {
        console.error('Error starting SignalR connection:', error);
      }
    };

    startConnection();

    // Clean up function to stop the connection when the component unmounts
    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop().then(() => console.log('SignalR connection stopped.'));
      }
    };
  }, [token, senderEmail, peerConnection]);

  // Function to send the SDP offer
  const sendOffer = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
  
    // First get the receiver's connection ID
    const receiverConnectionId = await connectionRef.current.invoke('GetConnectionIdByEmail', receiverEmail);
  
    if (receiverConnectionId) {
      // Send the offer to the receiver's connection ID
      connectionRef.current.invoke('SendSignalingMessage', receiverConnectionId, JSON.stringify(offer));
      console.log("Offer sent successfully.");
    } else {
      console.log("Receiver is not online.");
      // Handle the scenario where the receiver is not online
    }
  };
  

  return { sendOffer, connectionRef };
}
