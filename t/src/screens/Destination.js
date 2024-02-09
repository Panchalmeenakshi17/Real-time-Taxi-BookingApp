import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiKey} from '../utils/apiKey';
import CustomIcon from '../components/CustomIcon';

const Destination = ({navigation}) => {
  return (
    <View style={{flex: 1, padding: 20, gap: 20}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={()=>{navigation.navigate('TabNavigator')}}>
        <CustomIcon name="left" size={25} color="black"/>

      </TouchableOpacity>
        <Text
          style={{color: 'black', fontSize: 20, fontFamily:'Montserrat-SemiBold', textAlign: 'center', flex: 1}}>
          Select Destination
        </Text>
      </View>
      <GooglePlacesAutocomplete
      styles={{fontFamily:'Montserrat-SemiBold'}}
        placeholder="Search"
        onPress={(data, details = null) => {
        navigation.navigate('AfterDestination',{details})
      
        }}
        query={{
          key: apiKey,
          language: 'en',
        }}
        fetchDetails
      />
    </View>
  );
};

export default Destination;

const styles = StyleSheet.create({});
