import {StyleSheet, Text, FlatList, View, Pressable} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Avatar, Card, IconButton} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/dist/Ionicons';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateContext from '../context/contextGlobal';
import {SafeAreaView} from 'react-native-safe-area-context';
const AllStudentConversation = () => {
  const [allData, setAllData] = useState([]);
  const {
    loggedInTrainer,
    setLoggedInTrainer,
    loggedInCustomer,
    setLoggedInCustomer,
  } = useContext(CreateContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const assignBgColor = trainers => {
    return trainers.map((t, index) => {
      if ((index + 1) % 2 === 0) {
        return {
          ...t,
          bg: 'green',
        };
      } else {
        return {
          ...t,
          bg: 'brown',
        };
      }
    });
  };

  const getTrainer = async () => {
    if (loggedInTrainer?.id !== '') {
      const usersCollection = await firestore()
        .collection('customer')
        .where('trainerId', '==', loggedInTrainer?.id)
        .get();
      const dataTem = [];
      usersCollection.docs.forEach(item => {
        dataTem.push({id: item.id, ...item.data()});
      });
      const updatedData = assignBgColor(dataTem);
      setAllData(updatedData);
    }
  };

  useEffect(() => {
    getTrainer();
  }, [isFocused]);
  const logOut = async () => {
    try {
      setLoggedInTrainer({
        id: '',
        email: '',
        password: '',
        name: '',
        address: '',
        phone: '',
        age: '',
        type: '',
        registerDate: '',
      });
      navigation.navigate('login');
    } catch (e) {
      // remove error
    }
  };
  const CardUi = ({item}) => (
    <Pressable
      onPress={() =>
        navigation.navigate('chat', {
          item,
          loggedInUserData: loggedInTrainer,
        })
      }>
      <Card.Title
        title={item.name}
        style={{
          borderWidth: 1,
          borderColor: 'silver',
          marginBottom: 5,
          paddingRight: 10,
          borderRadius: 7,
        }}
        subtitle={item.email}
        subtitleStyle={{color: 'grey'}}
        left={props => (
          <Avatar.Text
            {...props}
            label={item.name.slice(0, 1)}
            style={{backgroundColor: item.bg}}
          />
        )}
        right={props => (
          <AntDesign
            name="chatbox-ellipses-outline"
            size={25}
            color={'black'}
          />
        )}
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 20}}>
      <View
        style={{
          backgroundColor: 'black',
          height: 80,
          paddingLeft: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          borderWidth: 1,
          borderColor: 'silver',
        }}>
        <Text style={{color: '#e84b1c', fontSize: 18, fontStyle: 'italic'}}>
          Well Come Trainer
        </Text>
        <Pressable style={{padding: 15}} onPress={logOut}>
          <Text style={{color: 'white', alignItems: 'flex-end', fontSize: 18}}>
            Logout
          </Text>
        </Pressable>
      </View>

      <Text
        style={{
          color: 'black',
          alignSelf: 'center',
          fontSize: 24,
          marginBottom: 2,
        }}>
        Conversations
      </Text>
      <Text
        style={{
          color: 'black',
          alignSelf: 'center',
          fontSize: 14,
          marginBottom: 20,
        }}>
        Chat with students
      </Text>
      <View style={{padding: 20}}>
        <FlatList
          data={allData}
          renderItem={CardUi}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllStudentConversation;

const styles = StyleSheet.create({});
