import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    try {
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');

      if (userLoggedIn === 'true') {
        // User is already logged in, navigate to 'TabNavigator'
        navigation.navigate('TabNavigator');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const handleContinue = async () => {
    try {
      setLoading(true);

      // Validate email and password
      if (!email || !password) {
        setLoading(false);
        Alert.alert('Invalid Input', 'Please enter both email and password.');
        return;
      }

      // Sign in with Firebase authentication
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Check if the user's email is verified
      if (user.emailVerified) {
        // Store user email in AsyncStorage
        await AsyncStorage.setItem('userEmail', email);

        // Set user as logged in
        await AsyncStorage.setItem('userLoggedIn', 'true');

        setLoading(false);
       
        navigation.navigate('TabNavigator'); // Navigate to the 'TabNavigator'
      } else {
        setLoading(false);
        Alert.alert('Email Not Verified', 'Please verify your email before logging in.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during login:', error);

      // Check the error code to provide specific error messages
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        Alert.alert('Invalid Credentials', 'Please enter the correct email and password.');
      } else {
        Alert.alert('Error', 'Failed to log in. Please try again.');
      }
    }
  };

  const handleForgotPassword = async () => {
    try {
      // Validate email
      if (!email) {
        Alert.alert('Invalid Input', 'Please enter your email to reset the password.');
        return;
      }

      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password Reset Email Sent', 'Please check your email to reset your password.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }
  };

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
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
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
          <TouchableOpacity onPress={handleContinue} style={styles.button} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#fea90a', marginTop: 10, textDecorationLine: 'underline', letterSpacing: 1, fontSize: 18 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => { navigation.navigate('Signin') }}>
            <Text style={{ fontFamily: 'Montserrat-SemiBold', justifyContent: 'center', marginTop: 0, }}> Don't have an account? <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#fea90a', textDecorationLine: 'underline' }}>Sign In</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  heading: {
    textDecorationLine:'underline',
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 65,
    fontFamily: 'Montserrat-SemiBold',
  },
  sheading: {
    fontSize: 19,
    textAlign: 'center',
bottom:30,


    fontFamily: 'Montserrat-Regular',
  },
  textField: {
    bottom:50,
    marginVertical: 65,
    paddingHorizontal: 30,
    width: '100%',
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: 2,
    letterSpacing:1,
    marginBottom:20,
    textDecorationLine:'underline',
    fontSize:17,
  },
  input: {
    letterSpacing:2,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    marginBottom: 16,
    borderRadius: 17,
    fontFamily: 'Montserrat-Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    letterSpacing:2,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    borderRadius: 17,
    fontFamily: 'Montserrat-Regular',
  },
  eyeIcon: {
    marginLeft: -17,
    marginTop: -10,
    fontSize: 22,
  },
  button: {
    backgroundColor: '#fea90a',
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: '100%',
    borderRadius: 30,
    marginLeft: '0%',
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
  },
  buttonText: {
    color: 'white',
    letterSpacing:1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});

export default Login;
