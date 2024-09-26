import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList, Alert,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Avatar, SearchBar, FAB } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NavContext } from '../Context/Context';
import { getUser } from '../API/api';
import { EmailCheck } from '../Services/InputValidation';
import EmailPopup from '../CustomComponent/Emailpopup';
import UserProfileCard from '../CustomComponent/ProfileCard';

export default function HomePage() {
  const { setReceiverEmail, setPublicKey, setChatUsername, userProfilePic } = useContext(NavContext);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [addEmail, setAddEmail] = useState('');
  const [addUserVisible, setAddUserVisible] = useState(false);
  const [profileCardVisible, setProfileCardVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // For managing the selected user for profile card

  // Function to fetch user data from the API
  const fetchUser = async (email) => {
    try {
      const response = await getUser(email);
      if (response) {
        const alreadyExists = users.some(user => user.email.toLowerCase() === response.email.toLowerCase());
        if (!alreadyExists) {
          // Fetch the Profile Pic from the database
          setPublicKey(response.publicKey);
          setUsers(prevUsers => [
            ...prevUsers,
            { username: response.username, email, ProfilePic: response.profilePic },
          ]);
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

  const handleAddUser = (email) => {
    if (EmailCheck(email)) {
      fetchUser(email);
      setAddUserVisible(false); // Close the popup after adding the user
      setAddEmail(''); // Reset the email input
    } else {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
    }
  };

  const renderChatRoom = ({ item }) => (
    <TouchableOpacity
      style={styles.chatRoomContainer}
      onPress={() => {
        setReceiverEmail(item.email);
        setChatUsername(item.username);
        navigation.navigate("ChatPage");
      }}
    >
    <TouchableOpacity 
        onPress={() => {
        setReceiverEmail(item.email);
        setChatUsername(item.username);
        navigation.navigate("ChatPage");
      }}
        onLongPress={() => {
        setSelectedUser(item);
        setProfileCardVisible(true);
      }}
      >
      <Avatar
        rounded
        size={45}
        source={item.ProfilePic}
        containerStyle={{ backgroundColor: '#1E88E5' }}
      />
      </TouchableOpacity>
      {/* User Profile Card */}
      <UserProfileCard
        visible={profileCardVisible && selectedUser === item} // Show the profile card only for the selected user
        onClose={() => setProfileCardVisible(false)}
        user={item}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 } }>{item.username}</Text>
        <Text>Last sent message</Text>
      </View>
    </TouchableOpacity>
  );

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
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
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderChatRoom}
        keyExtractor={item => item.email}
        style={styles.chatList}
      />

      {/* Email Popup */}
      <EmailPopup
        visible={addUserVisible}
        onClose={() => setAddUserVisible(false)} // Close the modal when the user taps outside or presses the close button
        onSubmit={handleAddUser} // Call this function when the user submits the email
        email={addEmail} // Pass the email input value
      />

      <FAB
        icon={{ name: 'add', color: 'white' }}
        color="#1E88E5"
        placement="right"
        onPress={() => setAddUserVisible(true)} // Opens the popup for adding a new user
      />
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
});
