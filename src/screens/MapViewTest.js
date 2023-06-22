import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import MapView, { Circle, Marker } from 'react-native-maps';

const MapViewTest = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const circleRadius = 1000; // 1 kilometer in meters

  const usersWithinRange = [
    { id: 1, latitude: 37.78825, longitude: -122.4324, name: 'John Doe' },
    { id: 2, latitude: 37.789, longitude: -122.433, name: 'Jane Smith' },
    { id: 3, latitude: 37.787, longitude: -122.431, name: 'Bob Johnson' },
  ];

  const handlePinPress = (userId, userName) => {
    navigation.navigate('Chat', { userId, userName });
  };
  
  const getInitials = (name) => {
    const nameParts = name.split(' ');
    const initials = nameParts
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
    return initials;
  };

  const generateColor = (id) => {
    const colors = [
      '#F44336', // Red
      '#E91E63', // Pink
      '#9C27B0', // Purple
      '#673AB7', // Deep Purple
      '#3F51B5', // Indigo
      '#2196F3', // Blue
      '#03A9F4', // Light Blue
      '#00BCD4', // Cyan
      '#009688', // Teal
      '#4CAF50', // Green
      '#8BC34A', // Light Green
      '#CDDC39', // Lime
      '#FFEB3B', // Yellow
      '#FFC107', // Amber
      '#FF9800', // Orange
      '#FF5722', // Deep Orange
    ];

    const index = id % colors.length;
    return colors[index];
  };

  const handleRegionChange = (newRegion) => {
    const { latitudeDelta, longitudeDelta } = newRegion;
    const screenDimension = Math.min(Dimensions.get('window').width, Dimensions.get('window').height);
    const maxDelta = circleRadius * 2 / screenDimension;
    const limitedRegion = {
      ...newRegion,
      latitudeDelta: Math.min(latitudeDelta, maxDelta),
      longitudeDelta: Math.min(longitudeDelta, maxDelta),
    };
    setRegion(limitedRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={handleRegionChange}
        maxZoomLevel={16}
        minZoomLevel={10}
      >
        <Circle
          center={region}
          radius={circleRadius}
          fillColor="rgba(255, 0, 0, 0.2)"
          strokeColor="transparent"
        />
        {usersWithinRange.map((user) => (
          <Marker
            key={user.id}
            coordinate={{ latitude: user.latitude, longitude: user.longitude }}
            onPress={() => handlePinPress(user.id)}
          >
            <TouchableOpacity onPress={() => handlePinPress(user.id)}>
              <Avatar
                rounded
                title={getInitials(user.name)}
                titleStyle={styles.avatarTitle}
                overlayContainerStyle={{ backgroundColor: generateColor(user.id) }}
                size="small"
                containerStyle={styles.avatarContainer}
              />
            </TouchableOpacity>
          </Marker>
        ))}
      </MapView>
      <View style={styles.zoomContainer}>
        <TouchableOpacity
          style={styles.zoomButton}
          onPress={() => handleRegionChange({ ...region, latitudeDelta: region.latitudeDelta * 2, longitudeDelta: region.longitudeDelta * 2 })}
        >
          <Text style={styles.zoomButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.zoomButton}
          onPress={() => handleRegionChange({ ...region, latitudeDelta: region.latitudeDelta / 2, longitudeDelta: region.longitudeDelta / 2 })}
        >
          <Text style={styles.zoomButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  avatarContainer: {
    backgroundColor: 'transparent',
  },
  avatarTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  zoomContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
  },
  zoomButton: {
    width: 80,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 255, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  zoomButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
export default MapViewTest;
