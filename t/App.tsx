import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from './src/navigators/TabNavigator';
import IntroScreen from './src/screens/IntroScreen';
import GetStarted from './src/components/StartingPages/GetStarted';
import Second from './src/components/StartingPages/Second';
import Third from './src/components/StartingPages/Third';
import Fourth from './src/components/StartingPages/Fourth';
import Signin from './src/components/Account/Signin';
import Otp from './src/components/Otp/Otp';
import Profile from './src/components/Profile/Profile';
import AppNavigator from './src/routes/AppNavigator';
import Destination from './src/screens/Destination';
import Home from './src/screens/Home';
import AfterDestination from './src/screens/AfterDestination';
import ChatScreen from './src/screens/ChatScreen';
import ProfilePage from './src/components/ProfiletabNavigator/ProfilePage';
import Login from './src/components/Account/Login';


const Stack = createNativeStackNavigator();

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      // Example: Check if a user token or any identifier exists in AsyncStorage
      const userToken = await AsyncStorage.getItem('userLoggedIn');

      if (userToken) {
        // User is logged in
        setIsUserLoggedIn(true);
      } else {
        // User is not logged in
        setIsUserLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isUserLoggedIn ? (
          // User is logged in, show the TabNavigator
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ animation: 'slide_from_bottom' }} />
        ) : (
          // User is not logged in, show the login-related screens
          <>
            <Stack.Screen name="IntroScreen" component={IntroScreen} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="GetStarted" component={GetStarted} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="Second" component={Second} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="Third" component={Third} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="Fourth" component={Fourth} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="Signin" component={Signin} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="Otp" component={Otp} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="Profile" component={Profile} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="Destination" component={Destination} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="Home" component={Home} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="AfterDestination" component={AfterDestination} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="Login" component={Login} options={{ animation: 'slide_from_bottom' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
