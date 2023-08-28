import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import React, {useRef, useEffect, useState, useContext} from 'react';
import {Card} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import bg from '../assets/menu3.jpg';
import {useNavigation} from '@react-navigation/native';
import BottomModalSheet from './BottomModalSheet';
import Attendance from './attendance';
import DietPlanUI from './dietPlanUI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import CreateContext from '../context/contextGlobal';
const FGCard = ({product, index, arrayData, setData, comRef}) => {
  return (
    <Pressable
      onPress={() => {
        setData(product);
        comRef.current.open();
      }}>
      <Card
        style={{
          marginRight: index !== arrayData.length - 1 ? 10 : 0,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: 'silver',
        }}>
        <Image
          source={{uri: product.image}}
          style={{
            height: 150,
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
const MenuScreen = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const isFocused = useIsFocused();
  const [selectedData, setSelectedData] = useState(null);
  const [products, setProducts] = useState([]);
  const {
    loggedInTrainer,
    setLoggedInTrainer,
    loggedInCustomer,
    setLoggedInCustomer,
  } = useContext(CreateContext);
  const [gear, setGear] = useState([
    {
      id: 1,
      name: 'Treadmill',
      image:
        'https://firstresponse.ae/wp-content/uploads/2021/04/Best-Diet-Plan-To-Lose-Weight-For-Diabetic-Patients.jpg',
      description: 'it is very good',
      noOfDays: 23,
    },
    {
      id: 2,
      name: ' Chest Fly',
      image:
        'https://www.health-total.com/wp-content/uploads/2022/10/effective-weight-loss-diet-plan-every-indian-women-should-follow-banner-540-X-332.jpg',
      description: 'it is very good',
      noOfDays: 23,
    },
    {
      id: 3,
      name: 'Running Ma..',
      image:
        'https://content.api.news/v3/images/bin/1cc4c977c0e7adaa9a58432d487197f9',
      description: 'it is very good',
      noOfDays: 23,
    },
    {
      id: 4,
      name: 'Chest fly',
      image:
        'https://wp02-media.cdn.ihealthspot.com/wp-content/uploads/sites/438/2019/12/iStock-625675312-1024x683.jpg',
      description: 'it is very good',
      noOfDays: 23,
    },
    {
      id: 5,
      name: 'Weight',
      image:
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/269287277/original/8a4c814ec167bf6ea86308201d32bf169daf72f7/give-you-customized-diet-plans-for-your-health-conditions.jpg',
      description: 'it is very good',
      noOfDays: 23,
    },
    {
      id: 6,
      name: 'Smith machine',
      image: 'https://fitelo.co/wp-content/uploads/2022/10/Cover82-1.png',
      description: 'it is very good',
      noOfDays: 23,
    },
  ]);
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Attendance',
      uri: 'https://www.iconshock.com/image/RealVista/Education/attendance_list',
      onPressFun: () => refRBSheet.current.open(),
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'BMI',
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPBPFsiDW7iPjD2UxhTqBSRfvNDPBK8nC2mVP51kDjDKy-idrnKBjTB4MfrJ-4GznsrEY&usqp=CAU',
      onPressFun: () => navigation.navigate('bmi'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'BMR',
      uri: 'https://t4.ftcdn.net/jpg/05/11/89/17/360_F_511891719_VPLmMGGFamEyzEP28LabWSH03O81v2qY.jpg',
      onPressFun: () => navigation.navigate('bmr'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-14557sdf1e29d72',
      title: 'subscribe',
      uri: 'https://t4.ftcdn.net/jpg/03/20/60/91/360_F_320609180_ikbl2wUkroacuw3ongXVfKjieIxytrJS.jpg',
      onPressFun: () =>
        navigation.navigate('sub', {
          userId: loggedInCustomer?.id,
          userData: loggedInCustomer,
        }),
    },
  ];
  const Item = ({title, index, img, fun}) => (
    <Card
      style={[
        styles.item,
        {
          marginLeft: (index + 1) % 2 === 0 ? 10 : 0,
          marginRight: (index + 1) % 2 !== 0 ? 10 : 0,
          marginTop: 20,
        },
      ]}>
      <Pressable onPress={fun}>
        <Image
          source={{uri: img}}
          style={{height: 80, width: 80}}
          resizeMode="stretch"
        />
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </Card>
  );
  const assignPicToProduct = proArray => {
    const picArray = [
      {
        image:
          'https://firstresponse.ae/wp-content/uploads/2021/04/Best-Diet-Plan-To-Lose-Weight-For-Diabetic-Patients.jpg',
      },
      {
        image:
          'https://www.health-total.com/wp-content/uploads/2022/10/effective-weight-loss-diet-plan-every-indian-women-should-follow-banner-540-X-332.jpg',
      },
      {
        image:
          'https://content.api.news/v3/images/bin/1cc4c977c0e7adaa9a58432d487197f9',
      },
      {
        image:
          'https://wp02-media.cdn.ihealthspot.com/wp-content/uploads/sites/438/2019/12/iStock-625675312-1024x683.jpg',
      },
      {
        image:
          'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/269287277/original/8a4c814ec167bf6ea86308201d32bf169daf72f7/give-you-customized-diet-plans-for-your-health-conditions.jpg',
      },
      {image: 'https://fitelo.co/wp-content/uploads/2022/10/Cover82-1.png'},
    ];
    return proArray.map((p, index) => {
      if (proArray.length <= picArray.length) {
        return {...p, ...picArray[index]};
      } else if ((index + 1) % 2 === 0) {
        return {
          ...p,
          image:
            'https://www.health-total.com/wp-content/uploads/2022/10/effective-weight-loss-diet-plan-every-indian-women-should-follow-banner-540-X-332.jpg',
        };
      } else {
        return {
          ...p,
          image:
            'https://wp02-media.cdn.ihealthspot.com/wp-content/uploads/sites/438/2019/12/iStock-625675312-1024x683.jpg',
        };
      }
    });
  };
  const getProductFromDb = async () => {
    const productCollection = await firestore().collection('diet').get();
    const dataTem = [];
    productCollection.docs.forEach(item => {
      dataTem.push({id: item.id, ...item.data()});
    });
    const updatedData = assignPicToProduct(dataTem);
    setProducts(updatedData);
  };
  useEffect(() => {
    getProductFromDb();
  }, [isFocused]);
  return (
    <>
      <ImageBackground source={bg} style={{flex: 1}}>
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
            fontSize: 26,
            marginTop: 20,
          }}>
          Menu Item
        </Text>
        <SafeAreaView style={styles.container}>
          <FlatList
            numColumns={2}
            columnWrapperStyle={{
              flex: 1,
              justifyContent: 'space-between',
            }}
            data={DATA}
            renderItem={({item, index}) => (
              <Item
                title={item.title}
                key={item.id}
                index={index}
                img={item.uri}
                fun={item.onPressFun}
                userId={loggedInCustomer?.id}
              />
            )}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
        <View style={{padding: 10}}>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop: 20,
            }}>
            Diet Plans
          </Text>
          <FlatList
            data={products}
            horizontal={true}
            style={{margin: 10, marginBottom: 0}}
            renderItem={({item, index}) => (
              <FGCard
                product={item}
                index={index}
                arrayData={gear}
                comRef={refRBSheet2}
                setData={setSelectedData}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </ImageBackground>
      <BottomModalSheet
        refRBSheet={refRBSheet2}
        sheetStyles={{height: 400}}
        closeOnDragDown={false}>
        <DietPlanUI data={selectedData} />
      </BottomModalSheet>
      <BottomModalSheet
        refRBSheet={refRBSheet}
        sheetStyles={{height: 'auto'}}
        closeOnDragDown={false}>
        <Attendance />
      </BottomModalSheet>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    paddingTop: 0,
    paddingHorizontal: 20,
  },
  item: {
    height: 170,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 18,
  },
});
export default MenuScreen;
