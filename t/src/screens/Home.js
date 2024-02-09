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

const Home = ({navigation, route}) => {
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
          console.log(data.results[0].formatted_address,'--from current location');
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
      <View style={{flex: 0.65}}>
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
          <Marker
            coordinate={{
              latitude: userLocation?.latitude,
              longitude: userLocation?.longitude,
            }}
          />

          {longitude && latitude && (
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              pinColor="#0022ff"
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
            flexDirection: 'row',
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
            <TextInput
              style={{flex: 1}}
              value={origin}
              numberOfLines={1}
              placeholder="Current Location"
            />
          </View>
        </View>
      </View>

      {/* ///Second Box/// */}
     
      <View
        style={{
          flex: 0.3,
          padding: 28,
        }}>
        <View
          style={{
            backgroundColor: '#e8e8e8',
            flex: 1,
            flexDirection: 'row',
              alignItems: 'center',
            borderRadius: 25,
          }}>
          <View>
          <Text style={{ fontFamily:'Montserrat-SemiBold', paddingLeft:20, marginTop: 6, color:'black', fontSize:23}}>
            Where to?
          </Text>
          <TouchableOpacity
              onPress={() => navigation.navigate('Destination')}
              style={{
                backgroundColor: '#e58a00',
                height: '70%',
                width: '115%',
                margin: 10,
                marginTop: 7,
                borderRadius: 15,
                paddingHorizontal: 8,
                alignItems: 'center',
                gap: 10,
              }}
            >
            <View style={{ backgroundColor:"white",flexDirection: 'row', alignItems: 'center', marginTop:15,  borderRadius:45, width:50, height:50}}>
            <TouchableOpacity>
            <CustomIcon name="location" style={{ paddingHorizontal:10 }} marginLeft={3} size={28}  color="#e58a00" />

            </TouchableOpacity>
            </View>
            
            {/* <TextInput
              style={{flex: 1, backgroundColor:'white', color: 'black'}}
              value={formatted_address}
              placeholder="Where are you going ?"
              placeholderTextColor={'grey'}
              editable={false}
            /> */}
            <Text style={{ color:'white', fontFamily:'Montserrat-SemiBold', fontSize:20 }}>Destination</Text>
            <Text style={{ color:'white',  fontFamily:'Montserrat-Regular', fontSize:15 }}>Enter Destination</Text>
            
          </TouchableOpacity>
          </View>
          <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center', height: '70%', flex: 1, marginLeft: 60, marginTop:20, position: 'relative', padding: 18 }}>

          <Text style={{ fontFamily:'Montserrat-SemiBold', fontSize:13, width:150,textAlign: 'center' }}>Click for more options.</Text>
          <TouchableOpacity>
          <Image source={require('../assets/app_images/next.png')} style={{ width:60, marginTop:9, height:60}}  />

          </TouchableOpacity>
        {/* <ScrollView
          horizontal={true} // Enable horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
        >
         
          <View>
          
          <TouchableOpacity
                  onPress={() => navigation.navigate('Destination')}
                  style={{
                    backgroundColor: '#ffffff',
                    height: '62%',
                    width: '100%',
                    margin: 10,
                    borderRadius: 15,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    gap: 10,
                  }}
                > */}
            {/* <View style={{ backgroundColor:"white",  alignItems: 'center', marginTop:55,  borderRadius:45, width:'100%', height:50}}> */}
            {/* <TouchableOpacity onPress={()=>{navigation.navigate('Destination')}}><CustomIcon name="location" style={{ paddingHorizontal:10 }} marginLeft={3} size={28}  color="#e58a00" /></TouchableOpacity> */}
            {/* <Text style={{ color:'#000000', fontFamily:'Montserrat-SemiBold', fontSize:20 }}>Set</Text>
            <Text style={{ color:'#000000',  fontFamily:'Montserrat-Regular', fontSize:15 }}>Your Required Location</Text>
            
            </View> */}
            
            {/* <TextInput
              style={{flex: 1, backgroundColor:'white', color: 'black'}}
              value={formatted_address}
              placeholder="Where are you going ?"
              placeholderTextColor={'grey'}
              editable={false}
            /> */}
            
          {/* </TouchableOpacity>
          </View> */}
          {/* <View style={{marginLeft:12}}> */}
          
          {/* <TouchableOpacity
            
            style={{
              backgroundColor: '#ffffff',
              height: '70%',
              width: '100%',
              margin: 10,
              borderRadius: 15,
              paddingHorizontal: 10,
              // flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}> */}
            {/* <View style={{ backgroundColor:"white",  alignItems: 'center', marginTop:55,  borderRadius:45, width:'100%', height:50}}> */}
            {/* <TouchableOpacity onPress={()=>{navigation.navigate('Destination')}}><CustomIcon name="location" style={{ paddingHorizontal:10 }} marginLeft={3} size={28}  color="#e58a00" /></TouchableOpacity> */}
            {/* <Text style={{ color:'#000000', fontFamily:'Montserrat-SemiBold', fontSize:20 }}>Set</Text>
            <Text style={{ color:'#000000',  fontFamily:'Montserrat-Regular', fontSize:15 }}>Your Required Location</Text>
            
            </View> */}
            
            {/* <TextInput
              style={{flex: 1, backgroundColor:'white', color: 'black'}}
              value={formatted_address}
              placeholder="Where are you going ?"
              placeholderTextColor={'grey'}
              editable={false}
            /> */}
            
          {/* </TouchableOpacity>
          </View>
          </ScrollView> */}
        </View>
      </View>
      
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
