import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaymentScreen from './src/screens/PaymentScreen'
import DetailsScreen from './src/screens/DetailsScreen'
import TabNavigator from './src/navigators/TabNavigator';
import Accept from './src/components/Account/Accept';
import IntroScreen from './src/screens/IntroScreen';
import GetStarted from './src/components/StartingPages/GetStarted';
import Second from './src/components/StartingPages/Second';
import Third from './src/components/StartingPages/Third';
import Fourth from './src/components/StartingPages/Fourth';
import Signin from './src/components/Account/Signin';
import Login from './src/components/Account/Login';
import Otp from './src/components/Otp/Otp';
import Profile from './src/components/Profile/Profile';
import Location from './src/components/Location/Location';
import MyMap from './src/components/Maps/MyMap';
import AppNavigator from './src/routes/AppNavigator';
import Destination from './src/screens/Destination';
import Home from './src/screens/Home';
import Map from './src/components/Maps/Maps';
import ProfileScreen from './src/screens/ProfileScreen';
import AfterDestination from './src/screens/AfterDestination';
import ChatScreen from './src/screens/ChatScreen';
 


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      {/* <Stack.Screen name='IntroScreen' component={IntroScreen} options={{animation:  'fade_from_bottom'}}></Stack.Screen> */}
          {/* <Stack.Screen name='GetStarted' component={GetStarted} options={{animation:  'fade_from_bottom'}}></Stack.Screen>
          <Stack.Screen name='Map' component={Map} options={{animation:  'fade_from_bottom'}}></Stack.Screen>
   <Stack.Screen name='Second' component={Second} options={{animation: 'fade_from_bottom'}}></Stack.Screen>
    <Stack.Screen name='Third' component={Third} options={{animation: 'fade_from_bottom'}}></Stack.Screen>
    <Stack.Screen name='Fourth' component={Fourth} options={{animation: 'fade_from_bottom'}}></Stack.Screen>
    <Stack.Screen name='Signin' component={Signin} options={{animation: 'fade_from_bottom'}}></Stack.Screen>
    <Stack.Screen name='Login' component={Login} options={{animation: 'fade_from_bottom'}}></Stack.Screen>  
    <Stack.Screen name='Otp' component={Otp} options={{animation: 'fade_from_bottom'}}></Stack.Screen> */}
    {/* <Stack.Screen name='Profile' component={Profile} options={{animation: 'fade_from_bottom'}}></Stack.Screen>   */}
    {/* <Stack.Screen name='AppNavigator' component={AppNavigator} options={{animation: 'fade_from_bottom'}}></Stack.Screen>   */}
          
          <Stack.Screen name='ProfileScreen' component={ProfileScreen} options={{animation: 'slide_from_bottom'}}></Stack.Screen>  
    <Stack.Screen name='Destination' component={Destination} options={{animation: 'fade_from_bottom'}}></Stack.Screen>  
    <Stack.Screen name='Home' component={Home} options={{animation: 'fade_from_bottom'}}></Stack.Screen>  
          <Stack.Screen name='AfterDestination' component={AfterDestination} options={{animation: 'slide_from_bottom'}}></Stack.Screen>  
          <Stack.Screen name='ChatScreen' component={ChatScreen} options={{animation: 'slide_from_bottom'}}></Stack.Screen>  
          <Stack.Screen name='TabNavigator' component={TabNavigator} options={{animation: 'slide_from_bottom'}}></Stack.Screen>  
         <Stack.Screen name='Details' component={DetailsScreen} options={{animation: 'slide_from_bottom'}}>
        </Stack.Screen>
        <Stack.Screen name='Payment' component={PaymentScreen} options={{animation: 'slide_from_bottom'}}>
        </Stack.Screen>  
      </Stack.Navigator>
    </NavigationContainer>
    
    </>
  )
}

export default App

 