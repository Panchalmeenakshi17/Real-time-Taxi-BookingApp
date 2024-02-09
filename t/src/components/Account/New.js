import React, { useState } from 'react';
import { StyleSheet, TextInput, Text,Image, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = ({navigation}) => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.heading}>New Password</Text>
        <Text style={styles.sheading}>
         your new password must be different from your previous passwords !
        </Text>


        <View style={styles.inn}>
        <View style={styles.textField}>
           
          {/* Email */}
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={handlePasswordChange}
            />
             <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                <View style={styles.eyeIcon2}>
                  <Text style={styles.eyeIcon2}>{isPasswordVisible ? '👁️' : '👁️‍🗨'}</Text>
                </View>
              </TouchableWithoutFeedback>
          </View>
          <View>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={handlePasswordChange}
            />
             <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                <View style={styles.eyeIcon2}>
                  <Text style={styles.eyeIcon2}>{isPasswordVisible ? '👁️' : '👁️‍🗨'}</Text>
                </View>
              </TouchableWithoutFeedback>
          </View>
     
          {/* <View >
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={handlePasswordChange}
              />
              <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                <View style={styles.eyeIcon}>
                  <Text style={styles.eyeIcon}>{isPasswordVisible ? '👁️' : '👁️‍🗨'}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View> */}
          
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.buttonText}>Create new password</Text>
          </TouchableOpacity>
        </View>
      
      <View>
      <TouchableOpacity onPress={()=>{navigation.navigate('Signin')}}>
      
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
      
        width: '100%',
        borderRadius: 30,
     bottom:50,
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
    marginBottom:10,
  },
  textField: {
    marginVertical: 65,
    paddingHorizontal: 20,
    width: '100%', // Set the width to 100%
  },
  inn:{
width:'90%',
bottom:70,

  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%', // Set the width to 100%
    padding: 10,
    marginBottom: 36,
    borderRadius: 7,
    fontFamily: 'Montserrat-Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'108%',
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
 
    fontSize: 22, // Adjust the size as needed
  },
  eyeIcon2: {
   marginLeft:'67%',
    fontSize: 24,
    bottom:37,
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
bottom:50,
    fontFamily: 'Montserrat-Regular',
  },
});

export default Login;
