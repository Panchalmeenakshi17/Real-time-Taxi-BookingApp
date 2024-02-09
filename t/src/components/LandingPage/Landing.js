import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Landing = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('GetStarted');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.base}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/app_images/taxi1.jpg')}
          />
        </View>
        <Text style={styles.text}>Taxi Booking App</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontFamily:'Montserrat-Regular',
    marginTop:15,
    // Add any additional text styles as needed
  },
  imageContainer: {
    width: 150, // Set the width of the circular view
    height: 150, // Set the height of the circular view
    borderRadius: 75, // Make it a circle by setting borderRadius to half of the width/height
    backgroundColor: 'white',
    justifyContent: 'center', // Center the image vertically
    alignItems: 'center', // Center the image horizontally
    padding: 10, // Add padding to the circular view
  },
  base: {
    backgroundColor: '#eb8d00',
    height: 850,
  },
  image: {
    width: '100%', // Make the width 100% of the circular view
    height: '100%', // Make the height 100% of the circular view
    aspectRatio: 1, // Set aspectRatio to 1 to maintain a square shape
    borderRadius: 100, // Adjust the borderRadius as needed
  },
});

export default Landing;
