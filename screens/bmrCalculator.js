import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, RadioButton} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
const BmrCalculator = () => {
  const [user, setUser] = useState({
    height: null,
    weight: null,
    age: null,
    gender: 'male',
  });
  const [bmr, setBmr] = useState('');
  const imgPath =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Z_AdfSWwfzIVPUCw3JoxJX4jkNHSOahuFg&usqp=CAU';
  const handelResult = () => {
    if (user.age && user.height && user.weight) {
      let result = 0;
      if (user.gender === 'male') {
        result =
          66.47 + 13.75 * user.weight + 5.003 * user.height - 6.755 * user.age;
      } else {
        result =
          655.1 + 9.563 * user.weight + 1.85 * user.height - 4.676 * user.age;
      }
      setBmr(result.toFixed(2));
      }
    else {
        Alert.alert("Fill all fields")
      }
  };
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
          BMR Calculator
        </Text>
        <Image
          source={{
            uri: imgPath,
          }}
          style={{width: 120, height: 120, alignSelf: 'center'}}
        />
        <TextInput
          label="Height(cm)"
          value={user.height}
          mode={'outlined'}
          style={{marginBottom: 5}}
          keyboardType="numeric"
          onChangeText={text => setUser({...user, height: text})}
        />
        <TextInput
          label="Weight(kg)"
          value={user.weight}
          style={{marginBottom: 5}}
          mode={'outlined'}
          keyboardType="numeric"
          onChangeText={text => setUser({...user, weight: text})}
        />
        <TextInput
          label="Age"
          value={user.age}
          style={{marginBottom: 5}}
          mode={'outlined'}
          keyboardType="numeric"
          onChangeText={text => setUser({...user, age: text})}
        />
        <Text style={{color: 'black', fontSize: 15}}>Gender</Text>
        <RadioButton.Group
          onValueChange={newValue => setUser({...user, gender: newValue})}
          value={user.gender}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
              }}>
              <Text style={{color: 'grey'}}>Male</Text>
              <RadioButton value="male" />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: 'grey'}}>Female</Text>
              <RadioButton value="female" />
            </View>
          </View>
        </RadioButton.Group>
        <Button
          mode="contained"
          style={{marginTop: 40, backgroundColor: '#ff5421'}}
          onPress={handelResult}>
          Calculate BMR
        </Button>
        <Text
          style={{
            color: 'black',
            alignSelf: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 40,
          }}>
          Your BMR: {bmr}
        </Text>
      </View>
    </View>
  );
};

export default BmrCalculator;

const styles = StyleSheet.create({});
