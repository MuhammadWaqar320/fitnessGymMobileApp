import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Avatar, Card, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const ExerciseCard = ({item, futureTimeInS, user}) => {
  const navigation = useNavigation();
  const currentDateInS = Math.floor(Date.now() / 1000);
  handlePress = () => {
    if (futureTimeInS > currentDateInS || user?.isPayment) {
      navigation.navigate('workout', {item: item});
    } else {
      Alert.alert(
        'Your 7-days free trial has been expired.Please subscribe our subscription plan to continue',
      );
    }
  };
  return (
    <Pressable onPress={handlePress}>
      <ImageBackground
        source={{uri: item.image}}
        resizeMode="stretch"
        style={{
          marginHorizontal: 20,
          marginBottom: 10,
          height: 150,
          alignItems: 'center',
          flexDirection: 'row',
        }}
        imageStyle={{borderRadius: 8}}>
        <Card.Title
          titleStyle={{
            fontSize: 24,
            textAlignVertical: 'center',
            color: 'white',
            textTransform: 'capitalize',
            // fontStyle: 'italic',
            fontWeight: 'bold',
          }}
          title={item.name}
        />
      </ImageBackground>
    </Pressable>
  );
};
const Exercise = ({userData}) => {
  const data = [
    {
      id: 1,
      name: 'Chair squat',
      image:
        'https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5008.jpg?q=10&h=200',
      exercise: require('../../assets/e21.gif'),
    },
    {
      id: 2,
      name: 'Stationary lunge',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReEP8sGlpZjs7xpLe_eP027fHinZ3yqGfTq-1YxZE_MsTgR79U6N3PMzmlyvchegHRX2I&usqp=CAU',
      exercise: require('../../assets/e22.gif'),
    },
    {
      id: 3,
      name: 'Bird Dog ',
      image:
        'https://img.mensxp.com/media/content/2018/Oct/what-is-the-best-time-to-drink-your-protein-shake-800x420-1538983714.jpg',
      exercise: require('../../assets/e23.gif'),
    },
    {
      id: 4,
      name: 'Forearm plank',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnd8hp7uGC47FeOOpaQjsjTpVtqsCEhnwM4ng_voclrlPMrH3QQZ4KISq20vJIBOpBWrM&usqp=CAU',
      exercise: require('../../assets/e24.gif'),
    },
    {
      id: 5,
      name: 'Bicycle crunch',
      image:
        'https://2.bp.blogspot.com/-8lrjyxp1E7A/WQxvQ0CU6BI/AAAAAAAAC7Q/fbJvTcbyAZcZAQmsCY3ai0NtbbHT8wo1gCLcB/w1200-h630-p-k-no-nu/Gym-Status-for-Whatsapp-in-English-Gym-Whatsapp-Status.jpg',
      exercise: require('../../assets/e25.gif'),
    },
    {
      id: 6,
      name: 'Squat jump',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlu40jX9vc9vF9uPzKH0gF7XlTf256C3yCuPIx97l4ue6w06I9WggZFtHbvlFzhX1lCGE&usqp=CAU',
      exercise: require('../../assets/e26.gif'),
    },
    {
      id: 7,
      name: 'Pullups',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrwzGoH_odOyJRo62c4ymZzPz47HQkHQYwgeoPkOweNBGruQokJefHRSiL8vvROdg86mQ&usqp=CAU',
      exercise: require('../../assets/e27.gif'),
    },
    {
      id: 8,
      name: 'Lunge',
      image:
        'https://strengthbuzz.com/wp-content/uploads/2019/12/Ultimate-6-Day-Gym-Workout-Schedule.jpg',
      exercise: require('../../assets/e28.gif'),
    },
    {
      id: 9,
      name: 'Side plank',
      image:
        'https://img.freepik.com/premium-photo/athlete-is-standing-his-knee-near-bar-gym-is-preparing-make-deadlift_392761-3582.jpg',
      exercise: require('../../assets/e29.gif'),
    },
    {
      id: 10,
      name: 'Pushup',
      image:
        'https://img.freepik.com/premium-photo/muscular-man-bodybuilder-training-gym-posing-fit-muscle-guy-workout-with-weights-barbell_157927-18283.jpg',
      exercise: require('../../assets/e30.gif'),
    },
    {
      id: 11,
      name: 'Plank',
      image:
        'https://img.freepik.com/free-photo/muscular-young-man-lifting-weights-black-background_7502-4998.jpg',
      exercise: require('../../assets/e33.gif'),
    },
    {
      id: 12,
      name: 'Burpee',
      image:
        'https://strengthbuzz.com/wp-content/uploads/2019/12/Ultimate-6-Day-Gym-Workout-Schedule.jpg',
      exercise: require('../../assets/e31.gif'),
    },
    {
      id: 13,
      name: 'Overhead squat',
      image:
        'https://img.freepik.com/premium-photo/young-sports-guy-trains-biceps-gym-against-dark-background_182345-640.jpg',
      exercise: require('../../assets/e32.gif'),
    },
    {
      id: 14,
      name: 'Long Plank',
      image:
        'https://assets.myworkouts.io/filestack/s6c3PxPySiyXoYBhhoui_volume.jpg',
      exercise: require('../../assets/e28.gif'),
    },
  ];
  const sevenDaysInSeconds = 7 * 24 * 60 * 60;
  const timeInS = userData?.registerDate?.seconds;
  const futureTimeInS = timeInS + sevenDaysInSeconds;

  return (
    <View style={{marginBottom: 20}}>
      <Text
        style={{
          color: 'black',
          alignSelf: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 20,
          textTransform: 'capitalize',
        }}>
        Workout Exercises
      </Text>
      {data.map((item, index) => {
        return (
          <View key={item.id}>
            {index === 0 ? (
              <Text
                style={{
                  color: 'black',
                  fontSize: 22,
                  marginHorizontal: 20,
                  marginBottom: 10,
                  textTransform: 'uppercase',

                  // fontSize:22
                }}>
                Beginner
              </Text>
            ) : index === 4 ? (
              <Text
                style={{
                  color: 'black',
                  fontSize: 22,
                  marginHorizontal: 20,
                  marginBottom: 10,
                  textTransform: 'uppercase',

                  // fontSize:22
                }}>
                Intermediate
              </Text>
            ) : index === 9 ? (
              <Text
                style={{
                  color: 'black',
                  fontSize: 22,
                  marginHorizontal: 20,
                  marginBottom: 10,
                  textTransform: 'uppercase',

                  // fontSize:22
                }}>
                Advanced
              </Text>
            ) : (
              ''
            )}
            <ExerciseCard
              item={item}
              key={item.id}
              futureTimeInS={futureTimeInS}
              user={userData}
            />
          </View>
        );
      })}
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({});
