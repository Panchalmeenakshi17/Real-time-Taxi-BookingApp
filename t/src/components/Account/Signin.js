import React, { useState, useEffect } from 'react';
import {
  Alert,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Signin = ({ navigation }) => {
  const [userData, setUserData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
  });

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;

        if (user) {
          const userDoc = await firestore().collection('Users').doc(user.uid).get();

          if (userDoc.exists) {
            const userDataFromFirestore = userDoc.data();
            setUserData(userDataFromFirestore);
          }
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

  // const handleSignup = async () => {
  //   try {
  //     setLoading(true);

  //     const { email, password } = signupData;

  //     if (email && password) {
  //       const emailInUse = await isEmailInUse(email);

  //       if (!emailInUse) {
  //         const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  //         const user = userCredential.user;

  //         await firestore().collection('Signin').doc(user.uid).set({
  //           username: userData.username,
  //           phoneNumber: userData.phoneNumber,
          
  //           signupEmail: email,
  //           signupPassword: password,
  //         });

  //         await sendEmailVerification();

  //         Alert.alert(
  //           'Success',
  //           'Signup successful. Please check your email for verification.',
  //           [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
  //         );
  //       } else {
  //         Alert.alert(
  //           'Email in Use',
  //           'The provided email is already registered. Please use a new email or login using the existing one.'
  //         );
  //       }
  //     } else {
  //       console.error('Email and password are required for signup');
  //     }
  //   } catch (error) {
  //     console.error('Error during signup:', error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSignup = async () => {
    try {
      setLoading(true);
  
      const { email, password } = signupData;
  
      // Check if any required field is blank
      if (!email || !password || !userData.username || !userData.phoneNumber) {
        Alert.alert('Missing Information', 'Please fill in all the required fields.');
        return;
      }
  
      // Check if the provided email is already in use
      const emailInUse = await isEmailInUse(email);
  
      if (!emailInUse) {
        // Create a new user account
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
  
        // Save user data to Firestore
        await firestore().collection('Signin').doc(user.uid).set({
          username: userData.username,
          phoneNumber: userData.phoneNumber,
          // email: userData.email,
          // Include email and password in the Firestore document
          signupEmail: email,
          signupPassword: password,
        });
  
        // Send email verification
        await sendEmailVerification();
  
        // Display success message
        Alert.alert(
          'Success',
          'Signup successful. Please check your email for verification.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      } else {
        // Display an alert if the email is already in use
        Alert.alert(
          'Email in Use',
          'The provided email is already registered. Please use a new email or login using the existing one.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const isEmailInUse = async (email) => {
    try {
      const signInMethods = await auth().fetchSignInMethodsForEmail(email);
      return signInMethods && signInMethods.length > 0;
    } catch (error) {
      console.error('Error checking if email is in use:', error.message);
      return true;
    }
  };

  const sendEmailVerification = async () => {
    try {
      const user = auth().currentUser;

      if (user) {
        await user.sendEmailVerification();
      }
    } catch (error) {
      console.error('Error sending email verification:', error.message);
    }
  };

  return (
    <>
      <ScrollView>
        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 28, flexDirection: 'row', marginTop: 45, marginLeft: '30%' }}>
          Your Details
        </Text>
        <View style={styles.main}>
          <View>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#abaaa96a', borderRadius: 100, marginLeft: 100, height: 140, width: 140, borderColor: 'black' }}>
              <Image
                source={require('../../assets/app_images/p.jpg')}
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
            <Text style={styles.label}>Email (Signup)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={signupData.email}
              onChangeText={(text) => setSignupData((prevData) => ({ ...prevData, email: text }))}
            />
          </View>

          <View>
            <Text style={styles.label}>Password (Signup)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={signupData.password}
              onChangeText={(text) => setSignupData((prevData) => ({ ...prevData, password: text }))}
            />
          </View>

          <TouchableOpacity onPress={handleSignup} style={styles.button} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 16,
    width: '50%',
    height: '30%',
    position: 'relative',
    borderRadius: 100,
    borderColor: '#2c4baf',
    marginLeft: '28%',
    borderWidth: 2,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: 2,
    textDecorationLine: 'underline',
    fontSize: 17,
    marginBottom: 20,
    letterSpacing: 1,
  },
  input: {
    letterSpacing: 2,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    marginBottom: 16,
    borderRadius: 27,
    fontFamily: 'Montserrat-Regular',
  },
  main: {
    marginTop: 40,
    paddingHorizontal: 30,
  },
});

export default Signin;
