import {StyleSheet, Text, View, FlatList, Pressable, Alert} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {List} from 'react-native-paper';
import {Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/dist/FontAwesome5';
import AntDesign1 from 'react-native-vector-icons/dist/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateContext from '../context/contextGlobal';
const AllTrainerUI = () => {
  const {
    loggedInTrainer,
    setLoggedInTrainer,
    loggedInCustomer,
    setLoggedInCustomer,
  } = useContext(CreateContext);
  const [allData, setAllData] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState({
    id: loggedInCustomer.trainerId,
  });

  const getTrainer = async () => {
    const usersCollection = await firestore().collection('trainer').get();
    const dataTem = [];
    usersCollection.docs.forEach(item => {
      dataTem.push({id: item.id, ...item.data()});
    });
    setAllData(dataTem);
  };
  useEffect(() => {
    getTrainer();
  }, []);
  const selectTrainer = item => {
    setSelectedTrainer({id: item.id});
  };
  const handleSubmit = () => {
    if (loggedInCustomer.trainerId && loggedInCustomer.trainerId !== '') {
      firestore()
        .collection('customer')
        .doc(loggedInCustomer.id)
        .update({
          trainerId: selectedTrainer.id,
        })
        .then(async () => {
          console.log('User updated!');
          Alert.alert('Trainer has been assigned you');
          setLoggedInCustomer({
            ...loggedInCustomer,
            trainerId: selectedTrainer.id,
          });
        })
        .catch(e => {
          console.log('error is:', e);
          Alert.alert('Something is went wrong');
        });
    } else {
      Alert.alert('Something is went wrong');
    }
  };
  const renderItemCom = ({item, index}) => {
    return (
      <Pressable onPress={() => selectTrainer(item)}>
        <List.Item
          title={item.name}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'silver',
            borderTopWidth: index === 0 ? 1 : 0,
            borderTopColor: 'silver',
          }}
          description={item.email}
          left={props => {
            if (item.id === selectedTrainer.id) {
              return (
                <AntDesign1
                  name="checkcircle"
                  {...props}
                  size={28}
                  color="black"
                />
              );
            }
            return (
              <AntDesign
                name="hospital-user"
                {...props}
                size={28}
                color="#c97d02"
              />
            );
          }}
        />
      </Pressable>
    );
  };
  return (
    <View>
      <Text
        style={{
          alignSelf: 'center',
          color: 'black',
          fontSize: 22,
          fontWeight: 'bold',
        }}>
        All Registered Trainers
      </Text>
      <View style={{height: 255, marginBottom: 40, marginTop: 20}}>
        <FlatList
          data={allData}
          renderItem={renderItemCom}
          keyExtractor={item => item.id}
        />
      </View>
      <Button
        icon="plus"
        style={{backgroundColor: '#e84b1c'}}
        mode="contained"
        onPress={handleSubmit}>
        Add Trainer
      </Button>
    </View>
  );
};

export default AllTrainerUI;

const styles = StyleSheet.create({});
