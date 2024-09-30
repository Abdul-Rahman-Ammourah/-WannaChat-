import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { mediaDevices, RTCPeerConnection } from 'react-native-webrtc';
import Video from 'react-native-video';
import useSignalRVideo from './CameraHook';

const CameraPage = ({ navigation }) => {
  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const peerConnection = useRef(new RTCPeerConnection());
  const [localStreamURL, setLocalStreamURL] = useState(null);
  const [remoteStreamURL, setRemoteStreamURL] = useState(null);

  const { sendOffer, connectionRef } = useSignalRVideo(peerConnection.current);

  useEffect(() => {
    const initCall = async () => {
      try {
        const stream = await mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        
        localStream.current = stream;
        setLocalStreamURL(localStream.current.toURL()); // Set local stream URL

        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });

        peerConnection.current.ontrack = (event) => {
          remoteStream.current = event.streams[0];
          setRemoteStreamURL(remoteStream.current.toURL()); // Set remote stream URL
        };

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            connectionRef.current.invoke('SendSignalingMessage', receiverEmail, JSON.stringify({ candidate: event.candidate }));
          }
        };
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initCall();

    return () => {
      localStream.current?.getTracks().forEach((track) => track.stop());
      peerConnection.current?.close();
    };
  }, [sendOffer]);

  return (
    <View style={styles.container}>
      {/* Full-Screen Remote Video */}
      {remoteStreamURL && (
        <Video
          source={{ uri: remoteStreamURL }} // Using react-native-video for remote stream
          style={styles.remoteVideo}
          audioOnly={false}
          repeat={true}
          resizeMode="cover"
        />
      )}
      
      {/* Local Video */}
      {localStreamURL && (
        <Video
          source={{ uri: localStreamURL }} // Using react-native-video for local stream
          style={styles.localVideo}
          audioOnly={false}
          repeat={true}
          resizeMode="cover"
        />
      )}

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
  localVideo: {
    width: 120,
    height: 160,
    position: 'absolute',
    top: 50,
    right: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
});

export default CameraPage;
