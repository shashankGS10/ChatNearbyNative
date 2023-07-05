import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleEnterChat = () => {
    navigation.navigate('Map'); // Replace 'Map' with the appropriate screen name
  };

  return (
    <LinearGradient colors={['#6fa8dc', '#0a68ef']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://img-new.cgtrader.com/items/134236/b2f0135aa5/large/3d-world-map-and-usa-map-3d-model-max-obj-fbx.jpg' }}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Welcome to Chat Nearby!</Text>
        <Text style={styles.subText}>Connect with people nearby and start chatting.</Text>
        <TouchableOpacity style={styles.button} onPress={handleEnterChat}>
          <Text style={styles.buttonText}>Enter Chat</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  contentContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFF',
  },
  subText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00ff99',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
