import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
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

      const signInRef = firestore().collection('Users');
      const userSnapshot = await signInRef.where('email', '==', email).get();

      if (userSnapshot.empty) {
        setLoading(false);
        Alert.alert('User not found', 'Please sign up first.');
      } else {
        const user = userSnapshot.docs[0].data();

        if (user.password === password) {
          // Store user email in AsyncStorage
          await AsyncStorage.setItem('userEmail', email);

          // Set user as logged in
          await AsyncStorage.setItem('userLoggedIn', 'true');

          setLoading(false);
          Alert.alert('Logging you In!');
          navigation.navigate('TabNavigator'); // Navigate to the 'TabNavigator'
        } else {
          setLoading(false);
          Alert.alert('Incorrect Password', 'Please enter the correct password.');
        }
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during login:', error);
      Alert.alert('Error', 'Failed to log in. Please try again.');
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
  textField: {
    marginVertical: 65,
    paddingHorizontal: 30,
    width: '100%',
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
    fontSize: 22,
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
});

export default Login;
