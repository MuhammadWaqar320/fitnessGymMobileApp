import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateContext from '../context/contextGlobal';
import {useIsFocused} from '@react-navigation/native';
const Attendance = () => {
  const [isPresent, setIsPresent] = useState('Present');
  const {
    loggedInTrainer,
    setLoggedInTrainer,
    loggedInCustomer,
    setLoggedInCustomer,
  } = useContext(CreateContext);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const isFocused = useIsFocused();
  const handleSubmit = () => {
    const newData = {
      customerId: loggedInCustomer.id,
      date: formattedDate,
      attendanceRecord: isPresent,
    };
    firestore()
      .collection('attendance')
      .add(newData)
      .then(() => {
        console.log('User added!');
        Alert.alert('Submit Successfully');
      })
      .catch(e => {
        Alert.alert('Something is went wrong try again');
      });
  };
  return (
    <View style={{padding: 0}}>
      <Text
        style={{
          color: 'black',
          alignSelf: 'center',
          fontSize: 24,
          fontWeight: 'bold',
        }}>
        Attendance
      </Text>
      <Text style={{color: 'black', fontSize: 15}}>Attendance</Text>
      <RadioButton.Group
        onValueChange={newValue => setIsPresent(newValue)}
        value={isPresent}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 20,
            }}>
            <Text style={{color: 'grey'}}>Present</Text>
            <RadioButton value="Present" />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'grey'}}>Absent</Text>
            <RadioButton value="Absent" />
          </View>
        </View>
      </RadioButton.Group>
      <Text style={{color: 'black', fontSize: 15, marginTop: 5}}>
        Date & Time
      </Text>
      <TextInput
        value={formattedDate}
        style={{marginBottom: 5, color: 'black'}}
        mode={'outlined'}
      />
      <Button
        mode="contained"
        style={{marginTop: 40, backgroundColor: '#ff5421'}}
        onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
};

export default Attendance;

const styles = StyleSheet.create({});
