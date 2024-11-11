import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Avatar, SearchBar, FAB } from '@rneui/themed';
import { NavContext } from '../../Context/Context';
import { getUser, GetUsersData } from '../../API/api';
import UserProfileCard from '../../CustomComponent/ProfileCard';
import { IconButton, Modal } from 'react-native-paper';
import AsyncStorageUtil from '../../Services/AsyncStorage';

export default function HomePage({ navigation}) {
  const { setReceiverEmail, setPublicKey, setChatUsername, userProfilePic } = useContext(NavContext);
  const [search, setSearch] = useState('');
  const [searchAllUsers, setSearchAllUsers] = useState('');
  const [users, setUsers] = useState([]);
  const [addUserVisible, setAddUserVisible] = useState(false);
  const [profileCardVisible, setProfileCardVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredAllUsers, setFilteredAllUsers] = useState([]);
  const [showHeaderOptions, setShowHeaderOptions] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await GetUsersData();
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error while fetching user data", error);
      }
    };
    const GetContacts = async () => {
      try{
        const contacts = await AsyncStorageUtil.getContacts()
        setUsers(contacts)
      }catch(error){
        console.error("Error while getting items ")
      }
    }
    GetContacts()
    getAllUsers();
    const intervalId = setInterval(getAllUsers, 15000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
    
    setFilteredUsers(filtered);
  }, [search, users]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchAllUsers.toLowerCase())
      );
  
      setFilteredAllUsers(filtered);
    }, 300);
  
    return () => clearTimeout(delayDebounceFn);
  }, [searchAllUsers, allUsers]);
  


  const fetchUser = async (email) => {
    try {
      const response = await getUser(email);
      if (response) {
        console.log(filteredUsers)
        const alreadyExists = users.some(user => user.email.toLowerCase() === response.email.toLowerCase());
        if (!alreadyExists) {
          setUsers(prevUsers => [
            ...prevUsers,
            { username: response.username, email, ProfilePic: response.profilePic,PublicKey: response.publicKey },
          ]);
          setAddUserVisible(false)
          try {
            const user = [{ username: response.username, email, ProfilePic: response.profilePic,PublicKey: response.publicKey }];
            const contacts = await AsyncStorageUtil.getContacts();
            if (contacts !== null) {
              user.push(...contacts); // Use spread operator to merge arrays
              await AsyncStorageUtil.storeContacts(user);
            }
            else{
              await AsyncStorageUtil.storeContacts(user);
            }
          } catch (error) {
            console.error("Error while Asyncing contacts", error);
          }
        } else {
          Alert.alert('User Exists', 'This user already exists in your contact list.');
        }
      } else {
        Alert.alert("Not Found", "User Not Found");
      }
    } catch (error) {
      Alert.alert('Error', 'Could not fetch the user. Please try again.');
    }
  };

  const renderChatRoom = ({ item }) => (
    <TouchableOpacity
      style={styles.chatRoomContainer}
      onPress={() => {
        setReceiverEmail(item.email);
        setChatUsername(item.username);
        setPublicKey(item.PublicKey)
        navigation.navigate("ChatPage");
      }}
      onLongPress={() => {
        setShowHeaderOptions(true);
        setSelectedEmail(item.email);
      }}
    >
      <TouchableOpacity
        onLongPress={() => {
          setSelectedUser(item);
          setProfileCardVisible(true);
        }}>
      <Avatar
        rounded
        size={45}
        source={item.ProfilePic}
        containerStyle={{ backgroundColor: '#1E88E5' }}
      />
      </TouchableOpacity>
      <UserProfileCard
        visible={profileCardVisible && selectedUser === item}
        onClose={() => setProfileCardVisible(false)}
        user={item}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.username}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderSearch = ({ item }) => (
    <TouchableOpacity
      style={styles.chatRoomContainer}
      onPress={() => {
        fetchUser(item.email)
      }}
    >
        <Avatar
          rounded
          size={45}
          source={item.profilePic}
          containerStyle={{ backgroundColor: '#1E88E5' }}
        />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.username}</Text>
      </View>
    </TouchableOpacity>
  );
  const HandleDelete = async () => {
    const updatedUsers = filteredUsers.filter(user => user.email !== selectedEmail);
    setFilteredUsers(updatedUsers);
    try{
      await AsyncStorageUtil.clearContacts();
      await AsyncStorageUtil.storeContacts(updatedUsers);
      setShowHeaderOptions(false)
    }catch(error){
      console.error("Error whole Storing or clearing contacts", error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {!showHeaderOptions ? <>
        <SearchBar
          placeholder="Search..."
          onChangeText={setSearch}
          value={search}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          round
        />
        <Avatar
          rounded
          source={userProfilePic}
          size="medium"
          containerStyle={styles.avatarContainer}
          onPress={() => navigation.navigate("ProfilePage")}
        /> 
        </> : <>
        <IconButton
          icon="delete"
          iconColor={'#1E88E5'}
          size={20}
          onPress={HandleDelete}
        />
        </>}
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderChatRoom}
        keyExtractor={item => item.email}
        style={styles.chatList}
      />

      <FAB
        icon={{ name: 'add', color: 'white' }}
        color="#1E88E5"
        placement="right"
        onPress={() => setAddUserVisible(true)}
      />

      <Modal
        visible={addUserVisible}
        onDismiss={() => setAddUserVisible(false)}
        contentContainerStyle={styles.ModalContainer}
      >
        <View style={styles.ModalHeader}>
          <SearchBar
            placeholder="Search..."
            onChangeText={setSearchAllUsers}
            value={searchAllUsers}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
            round
          />
        </View>
        <View style={styles.ModalBody}>
          <FlatList
            data={filteredAllUsers}
            renderItem={renderSearch}
            keyExtractor={item => item.email}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
  },
  searchBarInputContainer: {
    backgroundColor: '#f0f8ff',
  },
  avatarContainer: {
    marginLeft: 10,
  },
  chatList: {
    flex: 1,
  },
  chatRoomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatRoomContainerHilighted: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightblue',
  },
  ModalContainer: {
    backgroundColor: 'white',
    width: "100%",
    height: "70%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  ModalHeader: {
    flex: 0.1,
    padding: 10,
  },
  ModalBody: {
    flex: 1,
  },
});