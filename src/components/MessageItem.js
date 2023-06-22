import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MessageItem = ({ message }) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default MessageItem;
