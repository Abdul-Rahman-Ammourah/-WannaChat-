import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
// Images
import cat from '../assets/Photos/Cat1.jpeg';
// Icons
import Goback from '../assets/Photos/Goback.png';
import phone from '../assets/Photos/Phone.png';
import Settings from '../assets/Photos/Settings.png';

export default function Messages({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const { name } = route.params;

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: {
            uri: 'https://placeimg.com/140/140/any',},
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Contacts')}>
          <Image source={Goback} style={styles.iconImage} />
        </TouchableOpacity>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.onlineStatus}>Online</Text>
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.icon} onPress={() => {}}>
            <Image source={phone} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => {}}>
            <Image source={Settings} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '10%',
    width: '100%',
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  iconImage: {
    height: 20,
    width: 20,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  headerTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    color:"black",
  },
  onlineStatus: {
    color: 'green',
  },
  rightIcons: {
    flexDirection: 'row',
  },
});
