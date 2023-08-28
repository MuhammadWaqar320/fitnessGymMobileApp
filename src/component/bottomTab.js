import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/homeScreen';
import MenuScreen from '../../screens/menuScreen';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Profile from '../../screens/profile';
import Chat from '../../screens/chat';
import Conversatoin from '../../screens/conversatoin';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ff5421',
        tabBarInactiveTintColor: 'black',
        activeTintColor: '#ff5421', // Set your desired active color here
        inactiveTintColor: 'black', // Color for the inactive tabs
        tabBarStyle: [
          {
            display: 'flex',
            padding: 5,
          },
          null,
        ],
        tabBarVisible: false,
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return <AntDesign name="home" size={25} color={color} />;
          } else if (route.name === 'Menu') {
            return <AntDesign name="menuunfold" size={25} color={color} />;
          }
          if (route.name === 'Chat') {
            return <AntDesign name="wechat" size={25} color={color} />;
          } else {
            return <AntDesign name="user" size={25} color={color} />;
          }
        },
      })}>
      <Tab.Screen
        name="Home"
        options={{headerShown: false}}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Menu"
        options={{headerShown: false}}
        component={MenuScreen}
      />
      <Tab.Screen
        name="Chat"
        options={{headerShown: false}}
        component={Conversatoin}
      />

      <Tab.Screen
        name="Profile"
        options={{headerShown: false}}
        component={Profile}
      />
    </Tab.Navigator>
  );
};
export default BottomTab;
