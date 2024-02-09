import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '../theme/theme'
import { BlurView } from '@react-native-community/blur'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import WalletScreen from '../screens/WalletScreen'
import CustomIcon from '../components/CustomIcon'
import BookingScreen from '../screens/BookingScreen'
import AppNavigator from '../routes/AppNavigator'
import Home from '../screens/Home'
import NotificationScreen from '../screens/NotificationScreen'
import ChatScreen from '../screens/ChatScreen'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
   <>
    <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarBackground: () => (
            <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles} />
          ),
        }}
        initialRouteName="Home" // Set the initial route name here
      >
    <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ({focused,color,size})=>(
        <CustomIcon name='home'
        size={25}
        color={
            focused ? '#eb8e01' : '#1a1307'
        }/>
    )}} ></Tab.Screen>
    <Tab.Screen
  name="chat"
  component={ChatScreen}
  options={{
    // tabBarLabel: 'Profile', // You can add a label if needed
    tabBarIcon: ({ focused, color, size }) => (
      <Image
        source={focused ? require('../assets/app_images/chat.png') : require('../assets/app_images/c.png')}
        style={{ width: size, height: size, tintColor: focused ? '#eb8e01' : 'black' }}
      />
    ),
  }}
></Tab.Screen>
    <Tab.Screen name="Wallet" component={WalletScreen} options={{tabBarIcon: ({focused,color,size})=>(
        <CustomIcon name='wallet'
        size={25}
        color={
            focused ? '#eb8e01' : '#1a1307'
        }/>
    )}} 
    ></Tab.Screen>
    <Tab.Screen name="Booking" component={BookingScreen} options={{tabBarIcon: ({focused,color,size})=>(
        <CustomIcon name='like'
        size={25}
        color={
            focused ? '#eb8e01' : '#1a1307'
        }/>
    )}} 
     ></Tab.Screen>
    {/* <Tab.Screen name="Profile" component={NotificationScreen}
    options={{tabBarIcon: ({focused,color,size})=>(
        <CustomIcon name='bell'
        size={25}
        color={
            focused ? '#eb8e01' : '#1a1307'
        }/>
    )}} 
    ></Tab.Screen> */}
     <Tab.Screen
          name="name"
          component={ProfileScreen}
          options={{
            // tabBarLabel: 'Profile', // You can add a label if needed
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={focused ? require('../assets/app_images/user.png') : require('../assets/app_images/user.png')}
                style={{ width: size, height: size, tintColor: focused ? '#eb8e01' : 'black' }}
              />
            ),
          }}
        ></Tab.Screen>
     
   </Tab.Navigator>
   
   </>
  )
}

export default TabNavigator

const styles = StyleSheet.create({

    BlurViewStyles:{
position:'absolute',
top:0,
bottom:0,
left:0,
right:0,


    },
    tabBarStyle:{
height:80,
position:'absolute',
backgroundColor: '#ffffff00',//'#ffeeb19d'
borderTopWidth:0,
elevation:0,
borderTopColor:'transparent'
    }
})