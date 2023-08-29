import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import logo from '../assets/home.png';
const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('login');
  }, 3000);

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <Image
          source={logo}
          style={{height: 190, width: 190}}
          resizeMode="center"
        />
      </View>
      <View>
        <Text style={{fontStyle: 'italic', fontSize: 24, color: '#ff5421',textAlign:'center'}}>
          FIT_INN
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
