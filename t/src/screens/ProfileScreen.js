import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import CustomIcon from '../components/CustomIcon';

const commonStyles = {
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: '33%',
    fontSize: 21,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userDataContainer: {
    marginTop: 20,
  },
  userData: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  emailInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
    color:"black",
    paddingVertical: 8,
    paddingLeft: 4,
  },
  usernameInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: 'black',
    color:"black",
    marginBottom: 20,
    paddingVertical: 8,
    paddingLeft: 4,
  },
  passwordInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    color:"black",
    borderColor: 'black',
    marginBottom: 20,
    paddingVertical: 8,
    paddingLeft: 4,
  },
  postsContainer: {
    marginTop: 20,
  },
  postsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postItem: {
    fontSize: 16,
    marginBottom: 4,
  },
  logoutButtonContainer: {
    marginTop: 20,
  },
};


const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [displayedUserData, setDisplayedUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailInputValue, setEmailInputValue] = useState('');

 
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');

      if (!email) {
        console.log('Email not found in AsyncStorage');
        setLoading(false);
        return;
      }

      const userDataSnapshot = await firestore().collection('Signin').where('signupEmail', '==', email).get();

      if (!userDataSnapshot.empty) {
        const userDataFromDB = userDataSnapshot.docs[0].data();
        setDisplayedUserData(userDataFromDB);

        const userPostsArray = userDataFromDB.posts || [];
        setUserPosts(userPostsArray);
      } else {
        console.log('No documents found matching the email:', email);
      }

      setEmailInputValue(email);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  fetchUserData();
}, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return (
      <View style={commonStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <CustomIcon name="left" size={25} marginTop={6} marginLeft={8} color="black" onPress={() => navigation.navigate('TabNavigator')} />
        <Text style={commonStyles.title}>Profile</Text>
      </View>

      {/* Display Profile Image */}
      <View style={{ alignItems: 'center' }}>
        {displayedUserData?.profileImage ? (
          <Image source={{ uri: displayedUserData.profileImage }} style={commonStyles.profileImage} />
        ) : (
          <Image source={require('../assets/app_images/p.jpg')} style={commonStyles.profileImage} />
        )}
      </View>

      <View style={commonStyles.userDataContainer}>
      <Text style={commonStyles.userData}>Username:</Text>
        <TextInput
          style={commonStyles.usernameInput}
          value={displayedUserData?.username}
          editable={false}
        />

<Text style={commonStyles.userData}>Phone:</Text>
        <TextInput
          style={commonStyles.usernameInput}
          value={displayedUserData?.phoneNumber}
          editable={false}
        />
        <Text style={commonStyles.userData}>Email:</Text>
        <TextInput
          style={commonStyles.emailInput}
          value={emailInputValue}
          editable={false}
        />
        <Text style={commonStyles.userData}>Password:</Text>
        <TextInput
          style={commonStyles.passwordInput}
          value={displayedUserData?.signupPassword}
          editable={false}
          secureTextEntry={true}
        />
       
       
      </View>

       

      <View style={commonStyles.logoutButtonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default ProfileScreen;
