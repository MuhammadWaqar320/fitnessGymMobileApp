import {View, Share, Text, Image, Alert, ScrollView} from 'react-native';

import {Card, Divider, Button} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomModalSheet from './BottomModalSheet';
import React, {useEffect, useState, useContext, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import CreateContext from '../context/contextGlobal';
import AllTrainerUI from './allTrainerUI';
import Appointment from './Appointment';
const Profile = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();

  const {
    loggedInTrainer,
    setLoggedInTrainer,
    loggedInCustomer,
    setLoggedInCustomer,
  } = useContext(CreateContext);
  const [notice, setNotice] = useState({
    name: '',
    id: '',
    link: '',
    dateTime: '',
  });
  const isFocused = useIsFocused();
  const logOut = async () => {
    try {
      setLoggedInCustomer({
        id: '',
        email: '',
        password: '',
        name: '',
        address: '',
        phone: '',
        age: '',
        type: '',
        registerDate: '',
        trainerId: '',
        isPayment: false,
        plan: '',
      });
      navigation.navigate('login');
    } catch (e) {
      // remove error
    }
  };
  const deleteAccount = async () => {
    firestore()
      .collection('customer')
      .doc(loggedInCustomer.id)
      .delete()
      .then(async () => {
        try {
          setLoggedInCustomer({
            id: '',
            email: '',
            password: '',
            name: '',
            address: '',
            phone: '',
            age: '',
            type: '',
            registerDate: '',
            trainerId: '',
            isPayment: false,
            plan: '',
          });
          navigation.navigate('login');
        } catch (e) {
          // remove error
        }
      })
      .catch(e => {
        console.log('deleting account error:', e);
        Alert.alert('Something is went wrong');
      });
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'https://play.google.com/store/fitnessgym/details?id=com.whatsapp',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const getNotice = async () => {
    let a = [];
    try {
      const data = await firestore()
        .collection('scheduledClass')
        .where('id', '==', loggedInCustomer.id)
        .limit(1)
        .orderBy('dateTime', 'desc')
        .get();
      data.docs.forEach(e => {
        a.push({id: e.id, ...e.data()});
      });
      a.length > 0 &&
        setNotice({
          name: a[0]?.name,
          link: a[0]?.link,
          id: a[0]?.id,
          dateTime: a[0]?.dateTime,
        });
    } catch (error) {
      console.log('error:', error);
    }
  };
  useEffect(() => {
    getNotice();
  }, [isFocused]);
  return (
    <ScrollView>
      <View
        style={{
          height: 220,
          backgroundColor: 'black',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{height: 160, width: 160, borderRadius: 80}}
          source={require('../assets/p.png')}
        />
      </View>
      <Card style={{margin: 50}}>
        <Card.Content>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 20,
              color: 'black',
            }}>
            Well Come To Profile
          </Text>
          <View style={{marginBottom: 30}}>
            <Text style={{marginBottom: 5, color: 'black'}}>
              Name: {loggedInCustomer.name}
            </Text>
            <Text style={{marginBottom: 5, color: 'black'}}>
              Email: {loggedInCustomer.email}
            </Text>
            <Text style={{marginBottom: 5, color: 'black'}}>
              Phone No: {loggedInCustomer.phone}
            </Text>
            <Text style={{marginBottom: 5, color: 'black'}}>
              Address: {loggedInCustomer.address}
            </Text>
            <Text style={{marginBottom: 5, color: 'black', fontWeight: 'bold'}}>
              Announcement:
            </Text>
            <Text
              style={{marginBottom: 5, color: 'black', textAlign: 'center'}}>
              "Dear student your class has been scheduled at {notice.dateTime}.
              Please join class on this google meet link: {notice.link}"
            </Text>
          </View>

          <Button
            icon="logout"
            mode="contained"
            style={{
              marginBottom: 10,
              backgroundColor: '#ff9800',
            }}
            onPress={logOut}>
            Logout
          </Button>
          <Button
            icon="share"
            mode="contained"
            style={{
              marginBottom: 10,
              backgroundColor: '#ff9800',
              color: 'black',
            }}
            onPress={onShare}>
            Share
          </Button>
          <Button
            icon="select"
            mode="contained"
            style={{
              marginBottom: 10,
              backgroundColor: '#ff9800',
              color: 'black',
            }}
            onPress={() => refRBSheet.current.open()}>
            Select Your Trainer
          </Button>
          <Button
            icon="logout"
            mode="contained"
            style={{
              marginBottom: 10,
              backgroundColor: '#ff9800',
              color: 'black',
            }}
            onPress={() => refRBSheet2.current.open()}>
            Appointment
          </Button>
          <Button
            icon="delete"
            mode="contained"
            style={{backgroundColor: 'red'}}
            onPress={deleteAccount}>
            Delete Account
          </Button>
        </Card.Content>
      </Card>
      <BottomModalSheet
        refRBSheet={refRBSheet2}
        sheetStyles={{height: 380}}
        closeOnDragDown={false}>
        <Appointment data={loggedInCustomer} />
      </BottomModalSheet>
      <BottomModalSheet
        refRBSheet={refRBSheet}
        sheetStyles={{height: 500}}
        closeOnDragDown={false}>
        <AllTrainerUI />
      </BottomModalSheet>
    </ScrollView>
  );
};

export default Profile;
