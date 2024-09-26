import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Text, Card } from '@rneui/themed';

export default function UserProfileCard({ visible, onClose, user }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <Card containerStyle={styles.cardContainer}>
          <TouchableOpacity activeOpacity={1}>
            <View style={styles.cardContent}>
              <Avatar
                rounded
                size="large"
                source={user.ProfilePic}
                containerStyle={styles.avatar}
              />
              <Text h4 style={styles.username}>{user.username}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </TouchableOpacity>
        </Card>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardContainer: {
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  cardContent: {
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 15,
  },
  username: {
    marginBottom: 5,
  },
  email: {
    color: 'gray',
  },
});