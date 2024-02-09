import React, { useState } from 'react';
import { StyleSheet, TextInput, Text,Image, View, Picker ,ScrollView,TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const Profile = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };
  const handlePhoneNumberChange = (text) => {
    // You can add validation logic or formatting here if needed
    setPhoneNumber(text);
  };

  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.heading}>Complete your Profile</Text>
        <Text style={styles.sheading}>
         Don't worry! Only you can see your personal Details.
        </Text>
        <TouchableOpacity style={{marginTop:50, flexDirection:'row', justifyContent:'center', backgroundColor:'#abaaa96a', borderRadius:100,marginLeft:30, height:140, width:140, borderColor:'black'}}>
      <Image
        source={require('../../assets/app_images/p.jpg')}
        style={styles.backgroundImage}
      />
      </TouchableOpacity>
        <View style={styles.textField}>
          {/* Name */}
          <View>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={username}
              onChangeText={handleUsernameChange}
            />
          </View>
          <View>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"  // Use phone-pad keyboard for numeric input
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
      />
          </View>
          <View></View>
          
          <TouchableOpacity onPress={() => navigation.navigate('Location')} style={styles.button}>
            <Text style={styles.buttonText}>Complete Profile</Text>
          </TouchableOpacity>
        </View>
       
   
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage:{
width:'100%',
height:'100%',
 
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
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: 2,
  },
  textField: {
    marginVertical: 45,
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

export default Profile;
