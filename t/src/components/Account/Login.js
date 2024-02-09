import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text,Image, View, ScrollView,TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';


const Login = ({navigation}) => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleContinue = async () => {
    try {
      const signInRef = firestore().collection('Users');
  
      // Check if the email exists
      const userSnapshot = await signInRef.where('email', '==', email).get();
  
      if (userSnapshot.empty) {
        // Email does not exist, show error message
        Alert.alert('User not found', 'Please sign up first.');
      } else {
        // Email exists, check the password
        const user = userSnapshot.docs[0].data();
  
        if (user.password === password) {
          // Password is correct, navigate to the 'Home' screen
          Alert.alert('Logging you In!');
          navigation.navigate('TabNavigator', { username: user.username });
        } else {
          // Password is incorrect, show error message
          Alert.alert('Incorrect Password', 'Please enter the correct password.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Failed to log in. Please try again.');
    }
  };
  useEffect(() => {
    
    const firebaseConfig = {
        apiKey: "AIzaSyDyq8vOFb3uYwUx70Dn6L-8hSMOV2W0CLU",
        authDomain: 'cabdb-f94fb.firebaseapp.com	',
        projectId: "cabdb-f94fb",
        storageBucket: "cabdb-f94fb.appspot.com",
        messagingSenderId: '790277514504',
        appId: "1:790277514504:android:404b4513042e15ff9ab8bd",
      };
    initializeApp(firebaseConfig);
  }, []);



  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.heading}>Log In to Your Account</Text>
        <Text style={styles.sheading}>
          Thank you for again Re-starting your Journey with us!
        </Text>
        <View style={styles.textField}>
           
          {/* Email */}
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          {/* Password */}
          <View>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
            <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                <View style={styles.eyeIcon}>
                  <Text style={styles.eyeIcon}>{isPasswordVisible ? '👁️' : '👁️‍🗨'}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <TouchableOpacity onPress={handleContinue} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      
      <View>
      <TouchableOpacity onPress={()=>{navigation.navigate('Signin')}}>
      <Text style={{ fontFamily:'Montserrat-SemiBold',  justifyContent:'center', marginTop:0, }}> Don't have an account? <Text style={{fontFamily:'Montserrat-SemiBold', color:'#fea90a', textDecorationLine:'underline' }}>Sign In</Text></Text> 
      </TouchableOpacity> 
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundImage:{
width:'100%',
height:'100%',
borderRadius: 30,
  },
    button: {
        backgroundColor: '#fea90a',
        paddingVertical: 15,
        paddingHorizontal: 30,
        width: '100%',
        borderRadius: 30,
        marginLeft: '0%',
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
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop:60,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: 2,
  },
  textField: {
    marginVertical: 65,
    paddingHorizontal: 30,
    width: '100%', // Set the width to 100%
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%', // Set the width to 100%
    padding: 10,
    marginBottom: 16,
    borderRadius: 7,
    fontFamily: 'Montserrat-Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    borderRadius: 7,
    fontFamily: 'Montserrat-Regular',
  },
  eyeIcon: {
    marginLeft: -17,
    marginTop: -10,
    fontSize: 22, // Adjust the size as needed
  },
  heading: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 65,
    fontFamily: 'Montserrat-SemiBold',
  },
  sheading: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: -26,
    fontFamily: 'Montserrat-Regular',
  },
});

export default Login;
