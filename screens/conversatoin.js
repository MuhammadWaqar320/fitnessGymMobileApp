import {StyleSheet, Text, FlatList, View, Pressable} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Avatar, Card, IconButton} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/dist/Ionicons';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import CreateContext from '../context/contextGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Conversatoin = () => {
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
    if (loggedInCustomer?.trainerId !== '') {
      const usersCollection = await firestore()
        .collection('trainer')
        .doc(loggedInCustomer.trainerId)
        .get();
      const dataTem = [];
      if (usersCollection?.exists) {
        const trainerData = usersCollection._data;
        dataTem.push({...trainerData, id: loggedInCustomer?.trainerId});
        const updatedData = assignBgColor(dataTem);
        setAllData(updatedData);
      }
    }
  };
  useEffect(() => {
    getTrainer();
  }, [isFocused]);
  const CardUi = ({item}) => (
    <Pressable
      onPress={() =>
        navigation.navigate('chat', {
          item,
          loggedInUserData: loggedInCustomer,
        })
      }
      key={item.id}>
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
    <View style={{flex: 1, padding: 20}}>
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
        Chat with trainer
      </Text>
      <FlatList
        data={allData}
        renderItem={CardUi}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Conversatoin;

const styles = StyleSheet.create({});
