import {View, Text} from 'react-native';
import React, {useState} from 'react';
import SplashScreen from './screens/splashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Link, useNavigationContainerRef} from '@react-navigation/native';
import Register from './screens/register';
import BottomTab from './src/component/bottomTab';
import Order from './screens/order';
import Login from './screens/login';
import Workout from './screens/workout';
import BmiCalculator from './screens/bmiCalculator';
import BmrCalculator from './screens/bmrCalculator';
import Chat from './screens/chat';
import Subscription from './screens/subscription';
import {LogBox} from 'react-native';
import AllStudentConversation from './screens/allStudentConversation';
import CreateContext from './context/contextGlobal';
const Stack = createStackNavigator();
const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  // LogBox.ignoreAllLogs(); //Ignore all log notifications
  const [loggedInCustomer, setLoggedInCustomer] = useState({
    id: '',
    email: '',
    password: '',
    name: '',
    address: '',
    phone: '',
    age: '',
    type: '',
    registerDate: '',
    trainerId: '',
    isPayment: false,
  });
  const [loggedInTrainer, setLoggedInTrainer] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
    phone: '',
    age: '',
    type: '',
    registerDate: '',
  });
  return (
    <CreateContext.Provider
      value={{
        loggedInTrainer,
        setLoggedInTrainer,
        loggedInCustomer,
        setLoggedInCustomer,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="root"
            component={BottomTab}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="order"
            component={Order}
            options={{headerShown: true, headerTitle: ''}}
          />
          <Stack.Screen
            name="studentConversation"
            component={AllStudentConversation}
            options={{headerShown: false, headerTitle: ''}}
          />
          <Stack.Screen
            name="sub"
            component={Subscription}
            options={{headerShown: true, headerTitle: ''}}
          />
          <Stack.Screen
            name="workout"
            component={Workout}
            options={{headerShown: true, headerTitle: 'Workout Exercise'}}
          />
          <Stack.Screen
            name="bmi"
            component={BmiCalculator}
            options={{headerShown: true, headerTitle: 'BMI'}}
          />
          <Stack.Screen
            name="bmr"
            component={BmrCalculator}
            options={{headerShown: true, headerTitle: 'BMR'}}
          />
          <Stack.Screen
            name="chat"
            component={Chat}
            options={{headerShown: true, headerTitle: 'Chat'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CreateContext.Provider>
  );
};

export default App;
