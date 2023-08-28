import React, {useState, useContext} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Button, RadioButton} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import CreateContext from '../context/contextGlobal';
import {Link, useNavigationContainerRef} from '@react-navigation/native';
const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
    phone: '',
    age: '',
    type: 'student',
    registerDate: new Date(),
  });
  const {
    loggedInTrainer,
    setLoggedInTrainer,
    loggedInCustomer,
    setLoggedInCustomer,
  } = useContext(CreateContext);
  const handleSubmit = () => {
    if (user.type === 'student') {
      firestore()
        .collection('customer')
        .add({...user, trainerId: '', isPayment: false, plan: ''})
        .then(() => {
          console.log('User added!');
          Alert.alert('Registered Successfully');
        })
        .catch(e => {
          Alert.alert('Something is went wrong try again');
        });
    } else if (user.type === 'trainer') {
      firestore()
        .collection('trainer')
        .add(user)
        .then(() => {
          console.log('User added!');
          Alert.alert('Registered Successfully');
        })
        .catch(e => {
          Alert.alert('Something is went wrong try again');
        });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        source={require('../assets/re.png')}
        style={{alignSelf: 'center', height: 150, width: 150}}
      />
      <Text
        style={{
          color: 'black',
          fontSize: 30,
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 40,
        }}>
        Register Now
      </Text>
      <TextInput
        label="Name"
        value={user.name}
        mode={'outlined'}
        onChangeText={text => setUser({...user, name: text})}
      />
      <TextInput
        label="Email"
        value={user.email}
        mode={'outlined'}
        onChangeText={text => setUser({...user, email: text})}
      />
      <TextInput
        label="Phone no."
        value={user.phone}
        mode={'outlined'}
        keyboardType="numeric"
        onChangeText={text => setUser({...user, phone: text})}
      />
      <TextInput
        label="Age"
        value={user.age}
        mode={'outlined'}
        onChangeText={text => setUser({...user, age: text})}
      />
      <TextInput
        label="Address"
        value={user.address}
        mode={'outlined'}
        onChangeText={text => setUser({...user, address: text})}
      />
      <TextInput
        label="Password"
        value={user.password}
        mode={'outlined'}
        secureTextEntry
        onChangeText={text => setUser({...user, password: text})}
      />
      <Text style={{color: 'black', marginTop: 2, fontSize: 16}}>
        Register as a:
      </Text>
      <RadioButton.Group
        onValueChange={newValue => setUser({...user, type: newValue})}
        value={user.type}
        style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton value="student" />
          <Text style={{color: 'black'}}>Student</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton value="trainer" />
          <Text style={{color: 'black'}}>Trainer</Text>
        </View>
      </RadioButton.Group>
      <Link
        to="/login"
        style={{
          color: 'black',
          fontSize: 16,
          textAlign: 'right',
        }}>
        Already have an account?
      </Link>
      <Button
        mode="contained"
        style={{marginTop: 30, backgroundColor: '#ff5421'}}
        onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
};

export default Register;
