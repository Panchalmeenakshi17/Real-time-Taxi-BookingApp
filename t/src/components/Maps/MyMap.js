import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const MyMap = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleOriginSelect = (data, details) => {
    setOrigin({ data, details });
    setMapRegion({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleDestinationSelect = (data, details) => {
    setDestination({ data, details });
    setMapRegion({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleLocationSelect = (data, details) => {
    setSelectedLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  return (
    <View style={styles.container}>
      {/* MapView */}
      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={(region) => setMapRegion(region)}
      >
        {/* Origin Marker */}
        {origin && (
          <Marker
            coordinate={{
              latitude: origin.details.geometry.location.lat,
              longitude: origin.details.geometry.location.lng,
            }}
            title="Origin"
            description={origin.data.description}
          />
        )}

        {/* Destination Marker */}
        {destination && (
          <Marker
            coordinate={{
              latitude: destination.details.geometry.location.lat,
              longitude: destination.details.geometry.location.lng,
            }}
            title="Destination"
            description={destination.data.description}
          />
        )}

        {/* Selected Location Marker */}
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
            description="Selected Location Description"
            pinColor="blue"
          />
        )}
      </MapView>

      {/* Destination Location Input */}
      <View style={[styles.inputContainer, {  }]}>
        <GooglePlacesAutocomplete
          placeholder="Enter the Destination Location..."
          onPress={handleDestinationSelect}
          query={{
            key: 'AIzaSyBfJITlvTVy7oMIKUAPaNg5EcNvZGXbgQQ',
            language: 'en',
          }}
        />
      </View>

      {/* Origin Location Input */}
      <View style={[styles.inputContainer, {  }]}>
        <GooglePlacesAutocomplete
          placeholder="Enter the Source Location..."
          onPress={handleOriginSelect}
          query={{
            key: 'AIzaSyBfJITlvTVy7oMIKUAPaNg5EcNvZGXbgQQ',
            language: 'en',
          }}
        />
      </View>

      {/* Selected Location Input */}
      <View style={[styles.inputContainer, {  }]}>
        <GooglePlacesAutocomplete
          placeholder="Enter a Location..."
          onPress={handleLocationSelect}
          query={{
            key: 'AIzaSyBfJITlvTVy7oMIKUAPaNg5EcNvZGXbgQQ',
            language: 'en',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    top: 20,
    width: '90%',
    alignSelf: 'center',
  },
});

export default MyMap;
