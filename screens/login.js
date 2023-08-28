import React, {useState, useContext, useEffect} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, RadioButton} from 'react-native-paper';
import {Link, useNavigationContainerRef} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import CreateContext from '../context/contextGlobal';
import {useNavigation} from '@react-navigation/native';
const Login = () => {
  const navigation = useNavigation();
  const {
    loggedInTrainer,
    setLoggedInTrainer,
    loggedInCustomer,
    setLoggedInCustomer,
  } = useContext(CreateContext);
  const [userCredential, setUserCredential] = useState({
    email: '',
    password: '',
  });
  const [loginUser, setLoginUser] = React.useState('student');
  const handleSubmit = async () => {
    if (loginUser === 'student') {
      const usersCollection = await firestore().collection('customer').get();
      const dataTem = [];
      usersCollection.docs.forEach(item => {
        if (userCredential.email.trim() === item.data().email.trim()) {
          dataTem.push({id: item.id, ...item.data()});
        }
      });
      if (dataTem.length > 0) {
        setLoggedInCustomer({
          id: dataTem[0]?.id,
          email: dataTem[0]?.email,
          password: dataTem[0]?.password,
          name: dataTem[0]?.name,
          address: dataTem[0]?.address,
          phone: dataTem[0]?.phone,
          age: dataTem[0]?.age,
          type: dataTem[0]?.type,
          registerDate: dataTem[0]?.registerDate,
          trainerId: dataTem[0]?.trainerId,
          isPayment: dataTem[0]?.isPayment,
          plan: dataTem[0]?.plan,
        });
        try {
          navigation.navigate('root', {userData: dataTem[0]});
        } catch (error) {
          console.log('Error while logging in', error);
          Alert.alert('Something is went wrong');
        }
      } else {
        Alert.alert('Invalid credentials');
      }
    } else if (loginUser === 'trainer') {
      const usersCollection = await firestore().collection('trainer').get();
      const dataTem = [];
      usersCollection.docs.forEach(item => {
        if (userCredential.email.trim() === item.data().email.trim()) {
          dataTem.push({id: item.id, ...item.data()});
        }
      });
      if (dataTem.length > 0) {
        try {
          setLoggedInTrainer({
            id: dataTem[0]?.id,
            email: dataTem[0]?.email,
            password: dataTem[0]?.password,
            name: dataTem[0]?.name,
            address: dataTem[0]?.address,
            phone: dataTem[0]?.phone,
            age: dataTem[0]?.age,
            type: dataTem[0]?.type,
            registerDate: dataTem[0]?.registerDate,
          });
          navigation.navigate('studentConversation');
        } catch (error) {
          console.log('Error while logging in', error);
          Alert.alert('Something is went wrong');
        }
      } else {
        Alert.alert('Invalid credentials');
      }
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
        source={require('../assets/loginL.png')}
        style={{alignSelf: 'center', height: 150, width: 150}}
      />
      <Text
        style={{
          color: 'black',
          fontSize: 30,
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 60,
        }}>
        Login
      </Text>
      <TextInput
        label="Email"
        value={userCredential.email}
        mode={'outlined'}
        onChangeText={text =>
          setUserCredential({...userCredential, email: text})
        }
      />
      <TextInput
        label="Password"
        value={userCredential.password}
        mode={'outlined'}
        secureTextEntry
        onChangeText={text =>
          setUserCredential({...userCredential, password: text})
        }
      />
      <Text style={{color: 'black', marginTop: 2, fontSize: 16}}>
        Login as a:
      </Text>
      <RadioButton.Group
        onValueChange={newValue => setLoginUser(newValue)}
        value={loginUser}
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
        to="/register"
        style={{
          color: 'black',
          fontSize: 16,
          textAlign: 'right',
          marginTop: 20,
        }}>
        Create new account
      </Link>
      <Button
        mode="contained"
        style={{marginTop: 40, backgroundColor: '#ff5421'}}
        onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
};

export default Login;
