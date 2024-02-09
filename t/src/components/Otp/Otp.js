import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';

const Otp = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', ]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <>
        <View style={styles.button1}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Signin')}} style={styles.buttonText1}>
                  <Text style={styles.buttonText1}>￩</Text>
                </TouchableOpacity>
              </View>


              <View style={styles.container}>
    
      <Text style={styles.heading}>Verify Code</Text>
      <Text style={styles.sheading}>
        Please enter the code we just sent to email{' '}
        <Text style={{ color: '#fea90a' }}>example@example.com</Text>
      </Text>

      {/* Display separate TextInput boxes for each digit */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      <View style={{ marginTop:20}}>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold', justifyContent: 'center', marginTop: 0 }}>
Did'nt recieve OTP?{' '}
          </Text>
          <Text style={styles.resendCode}>
    Resend code
  </Text>
        </TouchableOpacity>
      </View>
      {/* Your other components go here */}

      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

    </View>
    </>
    
  );
};

const styles = StyleSheet.create({
    buttonText1: {
        color: '#000000',
        fontSize: 34,
        marginTop: -2,
        // fontWeight: 'bold',
        textAlign: 'center',
      },
      button1: {
        borderWidth: 2,
        borderColor: '#000000', // Set your desired border color
        justifyContent: 'center',
        // backgroundColor: '#fea90a',
        // paddingVertical: 15,
        // paddingHorizontal: 30,
        width: '10%',
        height: '5%',
        borderRadius: 100,
        marginLeft: '5%',
        marginTop: 50,
        fontFamily: 'Montserrat-Regular',
      },
    resendCode: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#fea90a',
        textDecorationLine: 'underline',
        marginLeft:20,
      },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    marginTop: 70,
    textAlign: 'center',
    marginVertical: 65,
    fontFamily: 'Montserrat-SemiBold',
  },
  sheading: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: -26,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-Regular',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#fea90a',
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: '90%',
    borderRadius: 30,
    marginTop: 40,
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

export default Otp;
