import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
const BmiCalculator = () => {
  const [user, setUser] = useState({
    height: null,
    weight: null,
  });
  const [bmi, setBmi] = useState('');
  const handleResult = () => {
    if (user.weight && user.height) {
      setBmi(user.weight / (user.height * user.height));
    } else {
      Alert.alert('Please fill all fields');
    }
  };
  const imgPath =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVOcO4bZqxsHUMVcmsgYYH-zoPsQQETb4pjZ5esgN6wu9TCVz2cTk_VL_YgTDw4rWxZqE&usqp=CAU';
  return (
    <View
      style={{
        paddingTop: 40,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View>
        <Text
          style={{
            color: 'black',
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 26,
          }}>
          BMI Calculator
        </Text>
        <Image
          source={{
            uri: imgPath,
          }}
          style={{width: 120, height: 120, alignSelf: 'center'}}
        />
        <Text style={{color: 'black', fontSize: 15, marginTop: 50}}>
          Weight (kg)
        </Text>
        <TextInput
          label="Weight"
          value={user.weight}
          mode={'outlined'}
          style={{marginTop: -3}}
          keyboardType="numeric"
          onChangeText={text => setUser({...user, weight: text})}
        />
        <Text style={{color: 'black', fontSize: 15, marginTop: 10}}>
          Height (meters)
        </Text>

        <TextInput
          label="Height"
          value={user.height}
          style={{marginTop: -3}}
          mode={'outlined'}
          keyboardType="numeric"
          onChangeText={text => setUser({...user, height: text})}
        />
        <Button
          mode="contained"
          style={{marginTop: 40, backgroundColor: '#ff5421'}}
          onPress={() => handleResult()}>
          Calculate BMI
        </Button>
        <Text
          style={{
            color: 'black',
            alignSelf: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 40,
          }}>
          Your BMI: {typeof bmi === 'number' ? bmi.toFixed(5) : bmi}
        </Text>
      </View>
    </View>
  );
};

export default BmiCalculator;

const styles = StyleSheet.create({});
