import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useContext} from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {SliderBox} from 'react-native-image-slider-box';
import {useNavigation} from '@react-navigation/native';
import {Card, Divider, Button} from 'react-native-paper';
import CreateContext from '../context/contextGlobal';
import {useIsFocused} from '@react-navigation/native';
import Exercise from '../src/component/exercise';
import firestore from '@react-native-firebase/firestore';
const ProductCard = ({product, index, arrayData}) => {
  const navigation = useNavigation();
  return (
    <Card
      style={{
        marginRight: index !== arrayData.length - 1 ? 10 : 0,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'silver',
      }}>
      <Image
        source={product.image}
        style={{
          height: 130,
          width: 140,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      <Text style={{color: 'black', textAlign: 'center', paddingVertical: 5}}>
        {product.name}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('order', {product})}
        style={{
          // backgroundColor: '#e84b1c',
          borderRadius: 10,
          // paddingVertical: 2,
          width: 100,
          alignSelf: 'center',
          marginBottom: 5,
          borderWidth: 2,
          borderColor: '#e84b1c',
        }}>
        <Text style={{textAlign: 'center', color: '#e84b1c'}}>Order now</Text>
      </TouchableOpacity>
    </Card>
  );
};
const FGCard = ({product, index, arrayData}) => {
  return (
    <Card
      style={{
        marginRight: index !== arrayData.length - 1 ? 10 : 0,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'silver',
      }}>
      <Image
        source={product.image}
        style={{
          height: 120,
          width: 140,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      <Text style={{color: 'black', textAlign: 'center', paddingVertical: 5}}>
        {product.name}
      </Text>
    </Card>
  );
};

const HomeScreen = ({route}) => {
  const [products, setProducts] = useState([]);
  const [gear, setGear] = useState([
    {
      id: 1,
      name: 'Treadmill',
      image: require(`../assets/fg2.jpg`),
    },
    {
      id: 2,
      name: ' Chest Fly',
      image: require(`../assets/fg3.jpg`),
    },
    {
      id: 3,
      name: 'Running Ma..',
      image: require(`../assets/fg4.jpg`),
    },
    {
      id: 4,
      name: 'Chest fly',
      image: require(`../assets/fg5.jpg`),
    },
    {
      id: 5,
      name: 'Weight',
      image: require(`../assets/fg6.jpg`),
    },
    {
      id: 6,
      name: 'Smith machine',
      image: require(`../assets/fg7.jpg`),
    },
  ]);
  const {
    loggedInTrainer,
    setLoggedInTrainer,
    loggedInCustomer,
    setLoggedInCustomer,
  } = useContext(CreateContext);
  const isFocused = useIsFocused();
  const assignPicToProduct = proArray => {
    const picArray = [
      {image: require(`../assets/p2.jpg`)},
      {image: require(`../assets/p3.jpg`)},
      {image: require(`../assets/p1.jpg`)},
      {image: require(`../assets/p4.jpg`)},
      {image: require(`../assets/p5.jpg`)},
      {image: require(`../assets/p3.jpg`)},
    ];
    return proArray.map((p, index) => {
      if (proArray.length === picArray.length) {
        return {...p, ...picArray[index]};
      } else if ((index + 1) % 2 === 0) {
        return {...p, image: require(`../assets/p1.jpg`)};
      } else {
        return {...p, image: require(`../assets/p2.jpg`)};
      }
    });
  };
  const getProductFromDb = async () => {
    const productCollection = await firestore().collection('product').get();
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
  const images = [
    require('../assets/sli1.jpg'),
    require('../assets/sli2.jpg'),
    require('../assets/sli3.jpg'),
    require('../assets/sli4.jpg'),
  ];
  return (
    <ScrollView style={{flex: 1, color: 'black', backgroundColor: '#fff1e0'}}>
      <SliderBox
        images={images}
        autoplay={true}
        autoplayInterval={3000}
        circleLoop={true}
      />
      <View style={{padding: 10}}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Top Products
        </Text>
        <FlatList
          data={products}
          horizontal={true}
          style={{margin: 10}}
          renderItem={({item, index}) => (
            <ProductCard product={item} index={index} arrayData={products} />
          )}
          keyExtractor={item => item.id}
        />
        <View></View>
      </View>
      <View style={{padding: 10}}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: -30,
          }}>
          Fitness Gears
        </Text>
        <FlatList
          data={gear}
          horizontal={true}
          style={{margin: 10, marginBottom: 0}}
          renderItem={({item, index}) => (
            <FGCard product={item} index={index} arrayData={gear} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <Exercise userData={loggedInCustomer} />
    </ScrollView>
  );
};

export default HomeScreen;
