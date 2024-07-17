import React, { useContext } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavContext } from '../Navigation/NavContext';
// Icons
import callempty from "../Assets/Icons/callEmpty.png";
import homeempty from "../Assets/Icons/homeEmpty.png";
import profileempty from "../Assets/Icons/profileEmpty.png";
import callfull from "../Assets/Icons/callFull.png";
import homefull from "../Assets/Icons/homeFull.png";
import profilefull from "../Assets/Icons/profileFull.png";
import { useNavigation } from '@react-navigation/native';

export default function Footernav() {
  const { navState, handleCall, handleHome, handleProfile } = useContext(NavContext);
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={() => { handleCall(); navigation.navigate("Call"); }}>
        <Image source={navState.call ? callfull : callempty} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => { handleHome(); navigation.navigate("Home"); }}>
        <Image source={navState.home ? homefull : homeempty} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => { handleProfile(); navigation.navigate("Profile"); }}>
        <Image source={navState.profile ? profilefull : profileempty} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#fff",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#A1A1A1",
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  }
});
