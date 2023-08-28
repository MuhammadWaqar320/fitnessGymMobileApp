import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import CreateContext from '../context/contextGlobal';
import firestore from '@react-native-firebase/firestore';
const Order = ({route}) => {
  const product = route.params.product;
  const isFocused = useIsFocused();
  const {
    loggedInTrainer,
    setLoggedInTrainer,
    loggedInCustomer,
    setLoggedInCustomer,
  } = useContext(CreateContext);
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
        orderDate: new Date(),
        productId: product.id,
        totalBill: product.price,
        paymentId: Date.now(),
      };
      firestore()
        .collection('order')
        .add(paymentInfo)
        .then(() => {
          console.log('order added!');
          Alert.alert('You paid Successfully and your order has been placed');
        })
        .catch(e => {
          console.log('error:', e);
          Alert.alert('Something is went wrong try again');
        });
    } else {
      Alert.alert('Invalid card number please try again');
    }
  };
  return (
    <ScrollView>
      <Image
        source={product.image}
        style={{
          height: 230,
          width: '100%',
        }}
      />
      <View>
        <View style={{padding: 30}}>
          <Text
            style={{
              color: 'black',
              fontSize: 26,
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}>
            {product.name}
          </Text>
          <Text style={{color: 'black', fontSize: 18}}>{product.price}</Text>
          <Text style={{color: 'black', fontSize: 16, color: 'grey'}}>
            {product.description}
          </Text>
          <View style={{marginTop: 50}}>
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
            <View style={{flex: 1, flexDirection: 'row'}}>
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
                style={{width: '49%', marginLeft: 2.6}}
                onChangeText={value => setCardInfo({...cardInfo, cvc: value})}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={placeOrderFun}
            style={{
              backgroundColor: '#e84b1c',
              borderRadius: 20,
              paddingVertical: 8,
              marginVertical: 40,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Pay ({product.price}) & Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Order;
