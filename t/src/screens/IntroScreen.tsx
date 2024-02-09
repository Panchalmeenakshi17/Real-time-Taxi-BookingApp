import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from '../components/LandingPage/Landing';
import GetStarted from '../components/StartingPages/GetStarted';
import Second from '../components/StartingPages/Second';
import Third from '../components/StartingPages/Third';
import Fourth from '../components/StartingPages/Fourth';
import Signin from '../components/Account/Signin';
import Login from '../components/Account/Login';
import Otp from '../components/Otp/Otp';
import Profile from '../components/Profile/Profile';
import TabNavigator from '../navigators/TabNavigator';



const Stack = createNativeStackNavigator();

const IntroScreen = () => {
  return (
    <>
    <Stack.Navigator 
    initialRouteName="Landing"
    screenOptions={{headerShown:false}}>
    {/* <Stack.Screen name='Landing' component={Landing} options={{animation: 'slide_from_bottom'}}></Stack.Screen> */}
    <Stack.Screen name='GetStarted' component={GetStarted} options={{animation:  'fade_from_bottom'}}></Stack.Screen>
    <Stack.Screen name='Second' component={Second} options={{animation: 'fade_from_bottom'}}></Stack.Screen>
    <Stack.Screen name='Third' component={Third} options={{animation: 'fade_from_bottom'}}></Stack.Screen>
    <Stack.Screen name='Fourth' component={Fourth} options={{animation: 'fade_from_bottom'}}></Stack.Screen>
    <Stack.Screen name='Signin' component={Signin} options={{animation: 'fade_from_bottom'}}></Stack.Screen>
    <Stack.Screen name='Login' component={Login} options={{animation: 'fade_from_bottom'}}></Stack.Screen>
    <Stack.Screen name='Otp' component={Otp} options={{animation: 'fade_from_bottom'}}></Stack.Screen>
    <Stack.Screen name='Profile' component={Profile} options={{animation: 'fade_from_bottom'}}></Stack.Screen>
    {/* <Stack.Screen name='TabNavigator' component={TabNavigator} options={{animation: 'fade_from_bottom'}}></Stack.Screen> */}


    </Stack.Navigator>
    
    
    </>
  )
}

export default IntroScreen

const styles = StyleSheet.create({})