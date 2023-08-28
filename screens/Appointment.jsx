import {StyleSheet, Text, Alert, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-paper';
import React, {useEffect, useState, useContext, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
const Appointment = ({data}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const save = () => {
    const a = date;
    console.log('df', data.id);
    firestore()
      .collection('customer')
      .doc(data?.id)
      .update({
        appointmentDate: date.toLocaleString(),
      })
      .then(() => {
        console.log('User updated!');
        Alert.alert('You got appointment successfully');
      })
      .catch(e => {
        console.log('eeeeeeeeeeeeeeeeeeee', e);
        Alert('Something is went wrong');
      });
  };
  return (
    <View>
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        Appointment
      </Text>
      <Text
        style={{
          color: 'black',
          marginBottom: 5,
        }}>
        Trainer Id: {data?.trainerId}
      </Text>

      <Text
        style={{
          color: 'black',
        }}>
        Appointment Date: {date.toLocaleString()}
      </Text>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
        }}>
        Note:
      </Text>
      <Text
        style={{
          color: 'black',
          marginBottom: 5,
        }}>
        Please select date time slot for appointment. And remember it working
        days are monday to friday.
      </Text>
      <Button
        icon="logout"
        mode="outlined"
        style={{
          marginBottom: 10,
          color: 'black',
          width: 170,
          borderRadius: 5,
          marginBottom: 40,
        }}
        onPress={() => setOpen(true)}>
        Select Date
      </Button>
      <Button
        icon="logout"
        mode="contained"
        style={{
          marginBottom: 10,
          backgroundColor: '#ff9800',
          color: 'black',
        }}
        onPress={() => save()}>
        Save Changes
      </Button>
      <DatePicker
        modal
        title="Appointment Date & Time"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({});
