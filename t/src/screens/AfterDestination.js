import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import {apiKey} from '../utils/apiKey';
import CustomIcon from '../components/CustomIcon';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import TabNavigator from '../navigators/TabNavigator';

const AfterDestination = ({navigation, route}) => {
  const destination = route?.params?.details;
  const geometry = destination?.geometry;
  const location = geometry?.location;
  const latitude = location?.lat;
  const longitude = location?.lng;

  const formatted_address = destination?.formatted_address;

  console.log(latitude, longitude, formatted_address, '--from home');

  const mapRef = useRef();
  const [userLocation, setuserLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [origin, setorigin] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000,
      })
        .then(async location => {
          setuserLocation({
            latitude: location.latitude,
            longitude: location.longitude,
          });

          if (mapRef) {
            mapRef.current.animateToRegion({
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }

          const {data} =
            await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${apiKey}
            `);
          console.log(
            data.results[0].formatted_address,
            '--from current location',
          );
          setorigin(data.results[0].formatted_address);
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const coordinates = [
        {latitude: userLocation.latitude, longitude: userLocation.longitude},
        {
          latitude: latitude,
          longitude: longitude,
        },
      ];

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    }
  }, [latitude, longitude, userLocation]);

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      {/* ///First Box/// */}
      <TouchableOpacity onPress={()=>{navigation.navigate('TabNavigator')}}>
        <CustomIcon name="left" size={25} color="black"/>

      </TouchableOpacity>
      <View style={{flex: 1}}>
        <MapView
          ref={mapRef}
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={false}
          showsMyLocationButton={false}
          initialRegion={{
            latitude: userLocation ? userLocation?.latitude : 37.78825,
            longitude: userLocation ? userLocation?.longitude : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {longitude && latitude && (
         <Marker
    coordinate={{
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
    }}
    pinColor="#FF0000" // Red color for the user's current location
  /> )}

  {/* Marker for Manually Set Location */}
  {longitude && latitude && (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      pinColor="#0022ff" // Blue color for the manually set location
    />
  )}
        </MapView>
        {/* ////Menu box//// */}

        <View
          style={{
            position: 'absolute',
            right: 20,
            top: 35,
            left: 20,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              borderRadius: 20,
              paddingHorizontal: 10,

              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <CustomIcon name="search" size={18} color="#eb8e01" />
            <GooglePlacesAutocomplete
              styles={{fontFamily: 'Montserrat-SemiBold'}}
              placeholder="Source"
              onPress={(data, details = null) => {
                navigation.navigate('AfterDestination', {details});
              }}
              query={{
                key: apiKey,
                language: 'en',
              }}
              fetchDetails
            />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              borderRadius: 20,
              paddingHorizontal: 10,

              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
             <CustomIcon name="search" size={18} color="#eb8e01" />
            <GooglePlacesAutocomplete
              styles={{fontFamily: 'Montserrat-SemiBold'}}
              placeholder="Destination"
              onPress={(data, details = null) => {
                navigation.navigate('AfterDestination', {details});
              }}
              query={{
                key: apiKey,
                language: 'en',
              }}
              fetchDetails
            />
          </View>
        </View>
      </View>

      {/* ///Second Box/// */}
    {/* <TabNavigator/> */}
    </View>
  );
};

export default AfterDestination;

const styles = StyleSheet.create({});
