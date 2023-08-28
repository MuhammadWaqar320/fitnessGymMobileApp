import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {Button} from 'react-native-paper';
const Workout = ({route}) => {
  const [duration, setDuration] = useState(10);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [key, setKey] = useState(0);
  const [initial, setInitial] = useState(true);
  const item = route.params.item;
  return (
    <View>
      <View style={{borderWidth: 1, borderBlockColor: '#edebeb'}}>
        <Image
          source={item.exercise}
          style={{width: 'auto', height: 300}}
          resizeMode="stretch"
        />
      </View>
      <View style={{alignItems: 'center', flexDirection: 'column', margin: 20}}>
        <CountdownCircleTimer
          style={{marginTop: 30}}
          isPlaying={isStart}
          key={key}
          duration={duration}
          onComplete={() => {
            setIsStart(false);
            setInitial(true);
            setKey(key + 1);
          }}
          colors={['#e84b1c', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}>
          {({remainingTime}) => (
            <>
              {remainingTime > 0 && remainingTime < 10 ? (
                <Text style={{color: 'black'}}>Remaining</Text>
              ) : (
                ''
              )}
              <Text style={{color: 'black', fontSize: 28,fontWeight:'bold'}}>
                {remainingTime}
              </Text>
              {remainingTime > 0 && remainingTime < 10 ? (
                <Text style={{color: 'black'}}>Seconds</Text>
              ) : (
                ''
              )}
            </>
          )}
        </CountdownCircleTimer>
        <Text
          style={{
            color: 'black',
            marginTop: 10,
            textTransform: 'capitalize',
            fontSize: 20,
          }}>
          {item.name}
        </Text>
        <Text style={{color: 'black', textTransform: 'capitalize'}}>
          3 step
        </Text>
      </View>
      {isStart ? (
        <Button
          icon="pause"
          mode="contained"
          onPress={() => setIsStart(!isStart)}
          style={{
            marginTop: 30,
            width: 300,
            alignSelf: 'center',
            backgroundColor: '#e84b1c',
          }}>
          Pause
        </Button>
      ) : !isStart && initial ? (
        <Button
          icon="play"
          mode="contained"
          onPress={() => {
            setIsStart(!isStart);
            setInitial(false);
          }}
          style={{
            marginTop: 30,
            width: 300,
            alignSelf: 'center',
            backgroundColor: '#e84b1c',
          }}>
          Start
        </Button>
      ) : (
        <Button
          icon="play"
          mode="contained"
          onPress={() => setIsStart(!isStart)}
          style={{
            marginTop: 30,
            width: 300,
            alignSelf: 'center',
            backgroundColor: '#e84b1c',
          }}>
          Resume
        </Button>
      )}
      <Button
        mode="contained"
        onPress={() => {
          setKey(key + 1);
          setIsStart(false);
          setInitial(true);
        }}
        style={{
          marginTop: 10,
          width: 300,
          alignSelf: 'center',
          backgroundColor: 'black',
        }}>
        Reset
      </Button>
    </View>
  );
};

export default Workout;

const styles = StyleSheet.create({});
