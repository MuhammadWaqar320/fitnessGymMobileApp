import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect, useId, useContext} from 'react';
import AntDesign from 'react-native-vector-icons/dist/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateContext from '../context/contextGlobal';
import firestore from '@react-native-firebase/firestore';
const SubscriptionUI = ({data, setIsClosed, isClosed}) => {
  const {
    loggedInTrainer,
    setLoggedInTrainer,
    loggedInCustomer,
    setLoggedInCustomer,
  } = useContext(CreateContext);
  const navigation = useNavigation();
  const pId = useId();
  const [cardInfo, setCardInfo] = useState({
    number: '',
    date: '',
    cvc: '',
  });
  const placeOrderFun = () => {
    if (
      cardInfo.number === '1234 1234 1234 1234' ||
      cardInfo.number === '1234123412341234'
    ) {
      const paymentInfo = {
        customerId: loggedInCustomer?.id,
        subscriptionDate: new Date(),
        totalAmount: data.value,
        paymentId: Date.now() + pId,
        subscriptionPlan: data.heading,
      };
      firestore()
        .collection('subscription')
        .add(paymentInfo)
        .then(async () => {
          console.log(' added!');
          Alert.alert('You paid Successfully');
          await firestore()
            .collection('customer')
            .doc(loggedInCustomer?.id)
            .update({isPayment: true, plan: data.heading});
          setLoggedInCustomer({
            ...loggedInCustomer,
            isPayment: true,
            plan: data.heading,
          });
        })
        .catch(e => {
          console.log('error:', e);
          Alert.alert('Something is went wrong try again');
        });
    } else {
      Alert.alert('Invalid card number please try again');
    }
    setIsClosed(!isClosed);
  };
  return (
    <View>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontWeight: 'bold',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          Add Your Payment Information{' '}
        </Text>
        <Text style={{color: 'black', fontSize: 16}}>
          Card Information{' '}
          <AntDesign name="cc-stripe" size={24} color="black" />
        </Text>
        <TextInput
          mode="outlined"
          value={cardInfo.number}
          placeholder="1234 1234 1234 1234"
          placeholderTextColor="silver"
          onChangeText={value => setCardInfo({...cardInfo, number: value})}
          right={<TextInput.Affix text="Stripe" />}
          style={{marginBottom: 0}}
        />
        <View style={{flexDirection: 'row', marginBottom: 40}}>
          <TextInput
            mode="outlined"
            value={cardInfo.date}
            placeholderTextColor="silver"
            placeholder="MM/YY"
            style={{width: '49%', marginRight: 2.6}}
            onChangeText={value => setCardInfo({...cardInfo, date: value})}
          />
          <TextInput
            mode="outlined"
            value={cardInfo.cvc}
            placeholder="CVC (4-digit no)"
            placeholderTextColor="silver"
            onChangeText={value => setCardInfo({...cardInfo, cvc: value})}
            style={{width: '49%', marginLeft: 2.6}}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={placeOrderFun}
        style={{
          backgroundColor: '#e84b1c',
          borderRadius: 20,
          paddingVertical: 8,
          marginVertical: 20,
        }}>
        <Text style={{textAlign: 'center', color: 'white'}}>
          Pay now {data.value}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionUI;

const styles = StyleSheet.create({});
