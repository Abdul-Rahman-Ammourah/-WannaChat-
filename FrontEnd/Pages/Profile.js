import React,{useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Modal, FlatList, ScrollView } from 'react-native';
import MePhoto from '../Assets/Photos/MePhoto.jpg';
export default function App ()  {
    const [showContent1, setshowContent1] = useState(false);
    const [showContent2, setshowContent2] = useState(false);
    const [showContent3, setshowContent3] = useState(false);
    const [showContent4, setshowContent4] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={MePhoto}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.body}>
      <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={() => setshowContent1(!showContent1)} style={{ marginBottom: 5 }}>
                <Text style={styles.title}>Small title</Text>
            </TouchableOpacity>

               {showContent1 && (<><Text style={styles.Content}>Small title</Text>
                                   <Text style={styles.Content}>Small title</Text>
                                   <Text style={styles.Content}>Small title</Text>
                                   <Text style={styles.Content}>Small title</Text>
                                   </>)}

            <TouchableOpacity onPress={() => setshowContent2(!showContent2)} style={{ marginBottom: 5 }}>
                <Text style={styles.title}>Small title</Text>
            </TouchableOpacity>
                {showContent2 && (<><Text style={styles.Content}>Small title</Text>
                                    <Text style={styles.Content}>Small title</Text>
                                    <Text style={styles.Content}>Small title</Text>
                                    <Text style={styles.Content}>Small title</Text>
                                   </>)}
            <TouchableOpacity onPress={() => setshowContent3(!showContent3)} style={{ marginBottom: 5 }}>
                <Text style={styles.title}>Small title</Text>
            </TouchableOpacity>
            {showContent3 && (<><Text style={styles.Content}>Small title</Text>
                                    <Text style={styles.Content}>Small title</Text>
                                    <Text style={styles.Content}>Small title</Text>
                                    <Text style={styles.Content}>Small title</Text>
                                   </>)}
            <TouchableOpacity onPress={() => setshowContent4(!showContent4)} style>
                <Text style={styles.title}>Small title</Text>
            </TouchableOpacity>

            {showContent4 && (<><Text style={styles.Content}>Small title</Text>
                                    <Text style={styles.Content}>Small title</Text>
                                    <Text style={styles.Content}>Small title</Text>
                                    <Text style={styles.Content}>Small title</Text>
                                   </>)}
        </ScrollView>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#B19CD9', // Light purple color
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 110,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
    position: 'absolute',
    bottom: -50,
    alignSelf: 'center',    
},
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 55, // Add padding to avoid overlap with the profile image
  },
  title: {
    backgroundColor: '#E0E0E0', // Light gray color
    padding: 16,
    borderRadius:18,
  },
  Content: {
    backgroundColor: '#E0E0E0', // Light gray color
    width: Dimensions.get('window').width - 90,
    left:35,
    padding:8,
    marginBottom:5,
    borderRadius:12,
  },
});

