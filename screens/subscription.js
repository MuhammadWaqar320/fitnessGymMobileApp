import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState, useContext} from 'react';
import pic from '../assets/sub.jpg';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomModalSheet from './BottomModalSheet';
import CreateContext from '../context/contextGlobal';
import SubscriptionUI from './subscriptionUI';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {Card} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const FGCard = ({product, index, arrayData, setData, comRef, user}) => {
  return (
    <Card
      style={{
        marginRight: index !== arrayData.length - 1 ? 10 : 0,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'silver',
        padding: 10,
        width: 200,
        backgroundColor: product?.heading === user.plan ? '#c2c1c0' : '#faf5ed',
      }}>
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          paddingVertical: 5,

          borderBottomWidth: 1,
          borderBottomColor: 'silver',
          fontSize: 16,
        }}>
        {product.heading}
      </Text>
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          paddingVertical: 5,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        {product.price}
      </Text>
      <View style={{marginBottom: 10}}>
        {product.arrayData.map(i => (
          <Text style={{color: 'black', textAlign: 'center'}}>{i}</Text>
        ))}
      </View>
      {product?.heading === user.plan ? (
        <TouchableOpacity
          onPress={() => {
            Alert.alert('You already subscribed this plan');
          }}
          style={{
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 20,
            paddingVertical: 5,
            marginVertical: 10,
            width: 150,
            alignSelf: 'center',
          }}>
          <Text style={{textAlign: 'center', color: 'black'}}>
            <AntDesign name="checksquareo" color="black" size={13} />
            Subscribed
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setData(product);
            comRef.current.open();
          }}
          style={{
            borderColor: '#e84b1c',
            borderWidth: 2,
            borderRadius: 20,
            paddingVertical: 5,
            marginVertical: 10,
            width: 150,
            alignSelf: 'center',
          }}>
          <Text style={{textAlign: 'center', color: '#e84b1c'}}>Subscribe</Text>
        </TouchableOpacity>
      )}
    </Card>
  );
};
const FGCard1 = ({product, index, futureTimeInS, user}) => {
  const navigation = useNavigation();
  const currentDateInS = Math.floor(Date.now() / 1000);
  handlePress = () => {
    if (futureTimeInS > currentDateInS || user?.isPayment) {
      navigation.navigate('workout', {item: product});
    } else {
      Alert.alert(
        'Your 7-days free trial has been expired.Please subscribe our subscription plan to continue',
      );
    }
  };
  return (
    <Pressable onPress={handlePress}>
      <Card
        style={{
          marginRight: index !== product.length - 1 ? 10 : 0,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: 'silver',
        }}>
        <Image
          source={{uri: product.image}}
          style={{
            height: 140,
            width: 160,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        />
        <Text style={{color: 'black', textAlign: 'center', paddingVertical: 5}}>
          {product.name}
        </Text>
      </Card>
    </Pressable>
  );
};
const Subscription = ({route}) => {
  const userId = route.params.userId;
  const registerDate = route.params?.userData?.registerDate;
  const {
    loggedInTrainer,
    setLoggedInTrainer,
    loggedInCustomer,
    setLoggedInCustomer,
  } = useContext(CreateContext);
  const sevenDaysInSeconds = 7 * 24 * 60 * 60;
  const timeInS = registerDate?.seconds;
  const futureTimeInS = timeInS + sevenDaysInSeconds;
  const [isClosed, setIsClosed] = useState(false);
  const navigation = useNavigation();
  const [selectedData, setSelectedData] = useState(null);
  const [subscription, setSubscription] = useState([]);
  const isFocused = useIsFocused();
  const refRBSheet2 = useRef();
  const [gear, setGear] = useState([
    {
      id: 16,
      heading: 'Plan Basic',
      price: '50$/month',
      value: '50Rs',
      arrayData: [
        'Personal trainer',
        'Classes per week',
        'Access to the gym',
        'Protein powder',
        'Personalized sessions',
      ],
    },
    {
      id: 26,
      heading: 'Plan Premium',
      price: '70$/month',
      value: '70Rs',
      arrayData: [
        'Personal trainer',
        'Classes per week',
        'Access to the gym',
        'Protein powder',
        'Personalized sessions',
      ],
    },
    {
      id: 36,
      heading: 'Plan Definitive',
      price: '100$/month',
      value: '$100Rs',
      arrayData: [
        'Personal trainer',
        'Classes per week',
        'Access to the gym',
        'Protein powder',
        'Personalized sessions',
      ],
    },
  ]);
  const [gear1, setGear1] = useState([
    {
      id: 12,
      name: 'Treadmill',
      image:
        'https://firstresponse.ae/wp-content/uploads/2021/04/Best-Diet-Plan-To-Lose-Weight-For-Diabetic-Patients.jpg',
      description: 'it is very good',
      noOfDays: 23,
    },
    {
      id: 22,
      name: ' Chest Fly',
      image:
        'https://www.health-total.com/wp-content/uploads/2022/10/effective-weight-loss-diet-plan-every-indian-women-should-follow-banner-540-X-332.jpg',
      description: 'it is very good',
      noOfDays: 23,
    },
    {
      id: 32,
      name: 'Running Ma..',
      image:
        'https://content.api.news/v3/images/bin/1cc4c977c0e7adaa9a58432d487197f9',
      description: 'it is very good',
      noOfDays: 23,
    },
    {
      id: 42,
      name: 'Chest fly',
      image:
        'https://wp02-media.cdn.ihealthspot.com/wp-content/uploads/sites/438/2019/12/iStock-625675312-1024x683.jpg',
      description: 'it is very good',
      noOfDays: 23,
    },
    {
      id: 52,
      name: 'Weight',
      image:
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/269287277/original/8a4c814ec167bf6ea86308201d32bf169daf72f7/give-you-customized-diet-plans-for-your-health-conditions.jpg',
      description: 'it is very good',
      noOfDays: 23,
    },
    {
      id: 62,
      name: 'Smith machine',
      image: 'https://fitelo.co/wp-content/uploads/2022/10/Cover82-1.png',
      description: 'it is very good',
      noOfDays: 23,
    },
  ]);
  const data = [
    {
      id: 13,
      name: 'Chair squat',
      image:
        'https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5008.jpg?q=10&h=200',
      exercise: require('../assets/e21.gif'),
    },
    {
      id: 23,
      name: 'Stationary lunge',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReEP8sGlpZjs7xpLe_eP027fHinZ3yqGfTq-1YxZE_MsTgR79U6N3PMzmlyvchegHRX2I&usqp=CAU',
      exercise: require('../assets/e22.gif'),
    },
    {
      id: 33,
      name: 'Bird Dog ',
      image:
        'https://img.mensxp.com/media/content/2018/Oct/what-is-the-best-time-to-drink-your-protein-shake-800x420-1538983714.jpg',
      exercise: require('../assets/e23.gif'),
    },
    {
      id: 43,
      name: 'Forearm plank',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnd8hp7uGC47FeOOpaQjsjTpVtqsCEhnwM4ng_voclrlPMrH3QQZ4KISq20vJIBOpBWrM&usqp=CAU',
      exercise: require('../assets/e24.gif'),
    },
    {
      id: 53,
      name: 'Bicycle crunch',
      image:
        'https://2.bp.blogspot.com/-8lrjyxp1E7A/WQxvQ0CU6BI/AAAAAAAAC7Q/fbJvTcbyAZcZAQmsCY3ai0NtbbHT8wo1gCLcB/w1200-h630-p-k-no-nu/Gym-Status-for-Whatsapp-in-English-Gym-Whatsapp-Status.jpg',
      exercise: require('../assets/e25.gif'),
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={pic}
        style={{height: 200, width: '100%'}}
        resizeMode="stretch"
      />
      <View style={{padding: 10}}>
        <Text
          style={{
            color: 'black',
            fontSize: 24,
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Subscription Plans
        </Text>
        <FlatList
          data={gear}
          horizontal={true}
          style={{margin: 10, marginBottom: 0}}
          renderItem={({item, index}) => (
            <FGCard
              product={item}
              index={index}
              arrayData={gear}
              comRef={refRBSheet2}
              setData={setSelectedData}
              user={loggedInCustomer}
            />
          )}
          keyExtractor={item => item.id}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 0,
          }}>
          Suggested Exercises
        </Text>
        <FlatList
          data={data}
          horizontal={true}
          style={{margin: 5, marginTop: 0}}
          renderItem={({item, index}) => (
            <FGCard1
              product={item}
              index={index}
              futureTimeInS={futureTimeInS}
              user={route?.params?.userData}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <BottomModalSheet
        refRBSheet={refRBSheet2}
        sheetStyles={{height: 400}}
        closeOnDragDown={false}>
        <SubscriptionUI
          data={selectedData}
          isClosed={isClosed}
          setIsClosed={setIsClosed}
        />
      </BottomModalSheet>
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({});
