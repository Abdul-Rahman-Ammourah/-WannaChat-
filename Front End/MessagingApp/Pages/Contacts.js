import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import AddICon from '../assets/Photos/Add.png';
import PhoneIcon from '../assets/Photos/Phone.png';
import SettingsIcon from '../assets/Photos/Settings.png';
import checkUsername from '../ValidationChecks/UsernameCheck';
const ContactItem = ({ contact, navigation }) => (

  <TouchableOpacity onPress={null}>
    <View style={styles.contactItem}>

      <TouchableOpacity onLongPress={() => navigation.navigate('UnderCon')}>
        <Image source={{ uri: contact.avatar }} style={styles.avatar} />
      </TouchableOpacity>

      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactMessage}>{contact.message}</Text>
      </View>

      {contact.unreadCount > 0 && <View style={styles.unreadCount}>
        <Text style={styles.unreadCountText}>{contact.unreadCount}</Text>
      </View>}

    </View>
  </TouchableOpacity>
);

export default function Contacts({ navigation }) {
  const [showAddButton, setShowAddButton] = useState(false);
  const [contacts, setContacts] = useState([
    {
      name: 'Selena Jobs',
      message: '',
      avatar: 'https://via.placeholder.com/150', // Placeholder image URL
      unreadCount: 0,
      id: 0,
    },
  ]);
  const [newContactName, setNewContactName] = useState('');

  const handleAddUser = () => {
    //Check If the user exist the data base
    if(!checkUsername(newContactName)){
      alert('Please enter a valid name')
    }
    else{
    const newUser = {
      name: newContactName,
      message: '',
      avatar: 'https://via.placeholder.com/150', // Placeholder image URL
      unreadCount: 0,
      id: contacts.length,
    };
    setContacts([...contacts, newUser]);
    setShowAddButton(false);
    setNewContactName('');
  }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <Text style={styles.headerTitle}>CONTACTS</Text>

        <View style={styles.profileContainer}>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Your name</Text>
            <Text style={styles.profileStatus}>Online</Text>
          </View>

          <TouchableOpacity onLongPress={() => navigation.navigate('UnderCon')}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileAvatar} />
          </TouchableOpacity>

        </View>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ContactItem contact={item} navigation={navigation} />}
      />

      <View style={styles.footer}>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('UnderCon')}>
          <Image source={PhoneIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => setShowAddButton(!showAddButton)}>
          <Image source={AddICon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('UnderCon')}>
          <Image source={SettingsIcon} />
        </TouchableOpacity>

      </View>

      <Modal
        visible={showAddButton}
        animationType="slide"
        transparent
        style={styles.Modal}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.Modalouter}>
          <View style={styles.ModalInner}>

            <Text style={styles.ModalHeaderText}>ADD A NEW CONTACT</Text>

            <View style={styles.ModalInputContainer}>
              <TextInput
                style={styles.ModalInput}
                placeholder="Username"
                placeholderTextColor="#fff"
                onChangeText={setNewContactName}
                value={newContactName}
              />
            </View>

            <View style={styles.Modalfooter}>

              <TouchableOpacity style={styles.Modalbutton} onPress={handleAddUser}>
                <Text style={styles.ModalbuttonText}>Add</Text>
              </TouchableOpacity>

            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Modalouter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalInner: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ModalHeaderText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  ModalInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  ModalInput: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#000',
    color: '#fff',
  },
  Modalfooter: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  Modalbutton: {
    width: '50%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalbuttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 16,
    marginRight: 10,
    color: '#000',
  },
  profileStatus: {
    fontSize: 12,
    color: 'green',
    marginRight: 10,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  contactMessage: {
    fontSize: 14,
    color: '#999',
    marginLeft: 10,
  },
  unreadCount: {
    backgroundColor: '#000',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  unreadCountText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  footerButton: {
    padding: 10,
  },
});
