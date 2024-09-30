import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { mediaDevices, RTCPeerConnection, RTCView } from 'react-native-webrtc';
import Draggable from 'react-native-draggable';
import useSignalRVideo from './CameraHook';
const CameraPage = ({ navigation }) => {
  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const peerConnection = useRef(new RTCPeerConnection());

  const { sendOffer, connectionRef } = useSignalRVideo(peerConnection.current);

  useEffect(() => {
    const initCall = async () => {
      // Get user media
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      localStream.current = stream;

      // Add local tracks to peer connection
      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });

      // Handle incoming remote stream
      peerConnection.current.ontrack = (event) => {
        remoteStream.current = event.streams[0];
      };

      // Handle ICE candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          // Send ICE candidate to the peer via SignalR
          connectionRef.current.invoke('SendSignalingMessage', receiverEmail, JSON.stringify({ candidate: event.candidate }));
        }
      };
    };

    initCall();

    return () => {
      // Clean up streams and peer connection on unmount
      localStream.current?.getTracks().forEach((track) => track.stop());
      peerConnection.current?.close();
    };
  }, [sendOffer]);
  return (
    <View style={styles.container}>
      {/* Full-Screen Remote Video */}
      <RTCView
        style={styles.remoteVideo}
        streamURL={remoteStream.current?.toURL()} // Replace with your logic to get stream URL
      />

      {/* Draggable Local Video (Top-Right Corner) */}
      <Draggable x={250} y={50}>
        <View style={styles.localVideoContainer}>
          <RTCView
            style={styles.localVideo}
            streamURL={localStream.current?.toURL()} // Replace with your logic to get stream URL
          />
        </View>
      </Draggable>

      <Button title="Send Offer" onPress={() => sendOffer()} />
      <Button title="End Call" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  remoteVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  localVideoContainer: {
    width: 120,
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white',
  },
  localVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
});

export default CameraPage;
