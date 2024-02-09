import React, { useRef, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Icon } from 'react-native-elements';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

const SearchPlace = () => {
  const mapView = useRef(null);
  const searchText = useRef(null);

  const [region, setRegion] = useState({
    latitudeDelta,
    longitudeDelta,
    latitude: 12.840575,
    longitude: 77.651787,
  });

  const [listViewDisplayed, setListViewDisplayed] = useState(true);
  const [address, setAddress] = useState('');
  const [currentLat, setCurrentLat] = useState('');
  const [currentLng, setCurrentLng] = useState('');
  const [forceRefresh, setForceRefresh] = useState(0);

  useEffect(() => {
    getCurrentAddress();
  }, []);

  const goToInitialLocation = (region) => {
    let initialRegion = { ...region };
    initialRegion['latitudeDelta'] = 0.005;
    initialRegion['longitudeDelta'] = 0.005;
    mapView.current.animateToRegion(initialRegion, 2000);
  };

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
    setForceRefresh(Math.floor(Math.random() * 100));
    getCurrentAddress();
  };

  const getCurrentAddress = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${region.latitude},${region.longitude}&key=AIzaSyC0vxMvW9CnRrTDp4rUFpA78V3nAOpEEhY`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setAddress(
          JSON.stringify(responseJson.results[0].formatted_address).replace(/"/g, '')
        );
      });
  };

  const onPlacePress = (data, details) => {
    setListViewDisplayed(false);
    setAddress(data.description);
    setCurrentLat(details.geometry.location.lat);
    setCurrentLng(details.geometry.location.lng);
    setRegion({
      latitudeDelta,
      longitudeDelta,
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    searchText.current.setAddressText('');
    goToInitialLocation(region);
  };

  return (
    <View style={styles.map}>
      <MapView
        ref={mapView}
        onMapReady={() => goToInitialLocation(region)}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
      >
        {currentLat !== '' && currentLng !== '' && (
          <Marker coordinate={{ latitude: currentLat, longitude: currentLng }} />
        )}
      </MapView>
      <View style={styles.panel}>
        <View style={[styles.panelHeader, listViewDisplayed ? styles.panelFill : styles.panel]}>
          <GooglePlacesAutocomplete
            currentLocation={false}
            enableHighAccuracyLocation={true}
            ref={searchText}
            placeholder="Search for a location"
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'}
            listViewDisplayed={listViewDisplayed}
            fetchDetails={true}
            renderDescription={(row) => row.description}
            enablePoweredByContainer={false}
            listUnderlayColor="lightgrey"
            onPress={(data, details) => onPlacePress(data, details)}
            textInputProps={{
              onChangeText: (text) => setListViewDisplayed(true),
            }}
            getDefaultValue={() => ''}
            query={{
              key: 'AIzaSyC0vxMvW9CnRrTDp4rUFpA78V3nAOpEEhY',
              language: 'en',
              components: 'country:ind',
            }}
            styles={{
              description: {
                fontFamily: 'Calibri',
                color: 'black',
                fontSize: 12,
              },
              predefinedPlacesDescription: {
                color: 'black',
              },
              listView: {
                position: 'absolute',
                marginTop: 44,
                backgroundColor: 'white',
                borderBottomEndRadius: 15,
                elevation: 2,
              },
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            GooglePlacesSearchQuery={{
              rankby: 'distance',
              types: 'building',
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            debounce={200}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  panelFill: {
    position: 'absolute',
    top: 0,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
  },
  panel: {
    position: 'absolute',
    top: 0,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
    flex: 1,
  },
  panelHeader: {},
});

export default SearchPlace;
