import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomIcon from '../components/CustomIcon';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    gender: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
  
        if (user) {
          console.log('User UID:', user.uid);
  
          const userDoc = await firestore().collection('Users').doc(user.uid).get();
  
          if (userDoc.exists) {
            const userDataFromFirestore = userDoc.data();
            console.log('User Data from Firestore:', userDataFromFirestore);
  
            setUserData(userDataFromFirestore);
          } else {
            console.log('User document does not exist.');
          }
        } else {
          console.log('User is not authenticated.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);

  const handleUsernameChange = (text) => {
    setUserData((prevData) => ({ ...prevData, username: text }));
  };

  const handlePhoneNumberChange = (text) => {
    setUserData((prevData) => ({ ...prevData, phoneNumber: text }));
  };

  const handleEmailChange = (text) => {
    setUserData((prevData) => ({ ...prevData, email: text }));
  };

  const handleGenderChange = (text) => {
    setUserData((prevData) => ({ ...prevData, gender: text }));
  };

  return (
    <>
    <View style={{ marginTop:30, flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>{navigation.navigate('TabNavigator')}}>
        <CustomIcon name="left"  size={25} marginTop={6} marginLeft={8} color="black"/>
      </TouchableOpacity>
      <Text style={{ fontFamily: 'Montserrat-SemiBold', marginLeft:80, fontSize: 28, flexDirection: 'row',  }}>
        Your Details
      </Text>

    </View>
      <View style={styles.main}>
      <View>
      <TouchableOpacity style={{ flexDirection:'row', justifyContent:'center', backgroundColor:'#abaaa96a', borderRadius:100,marginLeft:100, height:140, width:140, borderColor:'black'}}>
      <Image
        source={require('../assets/app_images/p.jpg')}
        style={styles.backgroundImage}
      />
      </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={userData.username}
            onChangeText={handleUsernameChange}
          />
        </View>

        <View>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={userData.phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
        </View>

        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={userData.email}
            onChangeText={handleEmailChange}
          />
        </View>

        <View>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your gender"
            value={userData.gender}
            onChangeText={handleGenderChange}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Second')} style={styles.button}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fea90a',
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '80%',
    borderRadius: 30,
    marginLeft: '10%',
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  backgroundImage:{
    width:'100%',
    height:'100%',
     
      },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 16,
    // backgroundColor:'yellow',
    width: '50%',
    height: '30%',
    position:'relative',
    borderRadius: 100,
    borderColor: '#2c4baf',
    marginLeft:'28%',
    borderWidth: 2,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40, // Set borderRadius to half of width or height to create a circle
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: 2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    marginBottom: 16,
    borderRadius: 7,
    fontFamily: 'Montserrat-Regular',
  },
  main: {
    marginTop: 40,
    paddingHorizontal: 30,
  },
});

export default ProfileScreen;
