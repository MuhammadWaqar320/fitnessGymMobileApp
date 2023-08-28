import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const Chat = ({route}) => {
  const trainerInfo = route?.params?.item;
  const loggedInUserData = route?.params?.loggedInUserData;
  const isFocused = useIsFocused();
  const [messages, setMessages] = useState([]);
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#fce9c0',
          },
        }}
      />
    );
  };
  useEffect(() => {
    const chatRef1 = firestore()
      .collection('chat')
      .doc(`${loggedInUserData.id}-${trainerInfo.id}`)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    const unsubscribe1 = chatRef1.onSnapshot(querySnapshot => {
      const allMessages = querySnapshot.docs.map(doc => {
        return {...doc.data(), _id: doc.id};
      });
      setMessages(allMessages);
    });

    return () => {
      unsubscribe1();
    };
  }, [loggedInUserData.id, trainerInfo.id]);

  const onSend = useCallback(
    async (newMessages = []) => {
      const message = newMessages[0];
      const myMsg = {
        ...message,
        user: {
          _id: loggedInUserData.id,
          name: loggedInUserData.name, // Assuming you have the user's name
        },
        createdAt: new Date().getTime(),
      };

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, myMsg),
      );

      await firestore()
        .collection('chat')
        .doc(`${loggedInUserData.id}-${trainerInfo.id}`)
        .collection('messages')
        .add(myMsg);

      await firestore()
        .collection('chat')
        .doc(`${trainerInfo.id}-${loggedInUserData.id}`)
        .collection('messages')
        .add(myMsg);
    },
    [loggedInUserData.id, loggedInUserData.name, trainerInfo.id],
  );

  return (
    <GiftedChat
      alwaysShowSend={true}
      textInputStyle={{color: 'black', marginBottom: 5}}
      messages={messages}
      onSend={messages => onSend(messages)}
      renderBubble={renderBubble}
      user={{
        _id: loggedInUserData.id,
      }}
    />
  );
};
export default Chat;
