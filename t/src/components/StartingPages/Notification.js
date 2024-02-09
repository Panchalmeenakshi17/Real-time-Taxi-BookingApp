import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const GetStarted = ({navigation}) => {
  
  return (
    <>

  
    {/* Background Image */}
     
      
        
    
      {/* <View style={styles.overlayContainer2}>
      <View style={styles.overlayContent}>
      <Image
      source={require('../assets/images/placeholder.png')}
      style={styles.Image}
      />
      <Image
            source={require('../assets/images/text.png')}
            style={styles.Image2}
          />

          <Image
            source={require('../assets/images/agent.png')}
            style={styles.Image3}
          />

          <Image
          source={require('../assets/images/telephone.png')}
          style={styles.Image4}
          />
        </View>
      </View> */}
      <View>
      <Image
      source={require('../../assets/images/notification.png')}
      style={styles.Image}
      />
      <Text style={styles.text}>
            <Text style={styles.blackText}>Enable</Text>
            <Text style={styles.orangeText}> Notification access</Text>
          </Text>
          <Text style={styles.loremText}>
         Enable notification to receive real time updates on your ride status, drival arrival.
          {/* Whether you're heading to work, meeting friends, or exploring the city, we're here to make your journey comfortable and efficient. Our drivers are dedicated to providing safe and timely transportation, ensuring you arrive at your destination with ease. Enjoy the convenience of hassle-free booking, real-time tracking, and exceptional service. Your journey begins with us! */}
          </Text>

      </View>

    <View style={styles.container}>
        <View style={styles.overlayContent}>
        
          
          <TouchableOpacity onPress={() => navigation.navigate('Second')} style={styles.button}>
            <Text style={styles.buttonText}>Allow Notification</Text>
          </TouchableOpacity>
          <Text style={styles.loremText2}>
            Maybe later
          </Text>
        </View>
      {/* </View> */}</View>
      </>
  );
};

const styles = StyleSheet.create({
  child : {
    flex : 1,
    transform : [ { scaleX : 0.5 } ],

    backgroundColor : '#fea90a',
    alignItems : 'center',
    justifyContent : 'center'
},
  parent:{
    height : '60%',
      width : '100%',
      transform : [ { scaleX : 2 } ],
      borderBottomStartRadius : 300,
      borderBottomEndRadius : 100,
      overflow : 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: '#aba8a8a7',
    marginTop:'20%',
   borderTopLeftRadius:30,
   borderTopRightRadius:30,
  },
  blackText: {
    color: 'black',
    fontFamily: 'Montserrat-Bold',
     paddingHorizontal: 0, // Add horizontal padding
    paddingVertical: 10,
  },

  orangeText: {
    color: '#fea90a',
    fontFamily: 'Montserrat-Bold',
     paddingHorizontal: 0, // Add horizontal padding
    paddingVertical: 10,
  },
  orangeText2: {
    color: '#fea90a',
    fontFamily: 'Montserrat-BOld',
    //  paddingHorizontal: 0, // Add horizontal padding
    // paddingVertical: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    position: 'absolute',
    width: '100%',
    marginLeft: '5%',
    marginTop: '15%',
    height: '100%',
    transform : [ { scaleX : 1 } ],
    borderBottomStartRadius : 300,
    borderBottomEndRadius : 100,
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  overlayContainer2: {
    flex: 1,
    backgroundColor: 'rgba(189, 177, 177, 0)',
  },
  overlayContent: {},
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '5%',
    color: '#fea90a',
    fontFamily: 'Montserrat-Regular',
     paddingHorizontal: 10, // Add horizontal padding
    paddingVertical: 10,
  },
  Image: {
    width: '90%',
    height: '20%',
    marginTop: '50%',
  marginLeft:20,


    resizeMode: 'center',
  },
  Image2: {
    width: '10%',
    height: '20%',
    marginTop: '1%',
    // marginRight: '40%',
    marginLeft: '90%',
    resizeMode: 'contain',
  },
  Image3: {
    width: '10%',
    height: '10%',

    marginLeft: '75%',
    bottom: 240,
  },
  Image4: {
    width: '8%',
    height: '8%',

    marginRight: '90%',
    bottom: 90,
  },

  loremText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginTop: 5,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 10, // Add horizontal padding
    paddingVertical: 10,
  },

  loremText2: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    marginTop: 30,
    fontFamily: 'Montserrat-Regular',
  },
  button: {
    backgroundColor: '#fea90a',
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '80%',
    borderRadius: 30,
    marginLeft: '10%',
    marginTop: 50,
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

export default GetStarted;
