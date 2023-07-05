import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments/1');
      const data = await response.json();

      if (data) {
        const replyMessage = {
          id: Date.now().toString(),
          message: data.body,
          isUser: false, // Added isUser flag to differentiate user and reply messages
        };

        setMessages((prevMessages) => [...prevMessages, replyMessage]);
      }
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  const handleSend = () => {
    if (inputText.trim() === '') return; // Check if input is empty or whitespace

    const newMessage = {
      id: Date.now().toString(),
      message: inputText,
      isUser: true, // Set isUser flag to true for user messages
    };

    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setInputText('');
    setTimeout(() => {
      sendAutoReply(newMessage);
    }, 2000);
  };

  const sendAutoReply = async (message) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments/2');
      const data = await response.json();
  
      if (data) {
        const trimmedReply = data.body.trim().split(' ').slice(0, 5).join(' '); // Trims and generates a reply with 3-5 words
        const replyMessage = {
          id: Date.now().toString(),
          message: trimmedReply,
          isUser: false,
        };
  
        setMessages((prevMessages) => [replyMessage, ...prevMessages]);
      }
    } catch (error) {
      console.error('Error sending auto-reply:', error);
    }
  };
  

  const renderMessageItem = ({ item }) => {
    const containerStyle = item.isUser ? styles.userMessageContainer : styles.replyMessageContainer;
    const textStyle = item.isUser ? styles.userMessageText : styles.replyMessageText;

    return (
      <View style={[styles.messageContainer, containerStyle]}>
        <Text style={textStyle}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.messagesContainer}
          inverted
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContainer: {
    paddingTop: 16,
    paddingBottom: 80, // Adjust as needed for padding and input container height
  },
  messageContainer: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  userMessageContainer: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  replyMessageContainer: {
    backgroundColor: '#8c00ff',
  },
  userMessageText: {
    fontSize: 16,
    color: '#FFF',
  },
  replyMessageText: {
    fontSize: 16,
    color: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#8c00ff',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
    color: '#000',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatApp;
