import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const MyMapComponent = () => {
  const [origin, setOrigin] = useState(''); // state for origin location
  const [destination, setDestination] = useState(''); // state for destination location

  const handleSearch = () => {
    // Perform the search or navigation based on the origin and destination values
    console.log('Search initiated with origin:', origin, 'and destination:', destination);
    // Implement your logic for searching or navigating to the destination
  };

  return (
    <View>
      {/* Origin Location Input */}
      <TextInput
        placeholder="Enter origin location"
        value={origin}
        onChangeText={(text) => setOrigin(text)}
      />

      {/* Destination Location Input */}
      <TextInput
        placeholder="Enter destination location"
        value={destination}
        onChangeText={(text) => setDestination(text)}
      />

      {/* Button to initiate search or navigation */}
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

export default MyMapComponent;
