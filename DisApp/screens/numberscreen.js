import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import SmsAndroid from 'react-native-sms-android';
import CallModule from 'react-native-call';
import { useNavigation } from '@react-navigation/native';

const NumbersScreen = ({ route }) => {
  const [numbers, setNumbers] = useState('');
  const { username } = route.params;

  const handleSendDistress = () => {
    const numberArray = numbers.split(',');
    sendDistressMessage(numberArray);
  };

  const sendDistressMessage = (numberArray) => {
    const distressMessage = `This is a distress message from ${username}. Please help!`;

    // SMS Functionality
    numberArray.forEach((number) => {
      SmsAndroid.autoSend(
        number.trim(),
        distressMessage,
        (fail) => {
          console.log('Failed to send SMS: ', fail);
        },
        (success) => {
          console.log('SMS sent successfully: ', success);
        }
      );
    });

    // Call Functionality (calls the first number)
    CallModule.call(numberArray[0]);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Enter Emergency Contact Numbers</Text>
      <TextInput
        placeholder="Enter phone numbers, separated by commas"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        value={numbers}
        onChangeText={setNumbers}
      />
      <Button title="Send Distress" onPress={handleSendDistress} />
    </View>
  );
};

export default NumbersScreen;
