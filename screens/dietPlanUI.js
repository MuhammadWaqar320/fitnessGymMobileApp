import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';

const DietPlanUI = ({data}) => {
  return (
    <ScrollView>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'silver',
          borderRadius: 10,
          marginTop: 5,
        }}>
        <Image
          source={{uri: data.image}}
          style={{
            height: 160,
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        />
        <Text
          style={{
            color: 'black',
            alignSelf: 'center',
            fontSize: 22,
            fontWeight: 'bold',
          }}>
          Diet Plan
        </Text>
        <Text
          style={{
            color: 'black',
            marginTop: 20,
            fontSize: 16,
            marginHorizontal:15,
          }}>
          Name: {data.name}
        </Text>
        <Text
          style={{
            color: 'black',
            marginTop: 5,
            fontSize: 16,
            marginHorizontal: 15,
          }}>
          No of days: {data.noOfDays}
        </Text>
        <Text
          style={{
            color: 'black',
            marginTop: 5,
            fontSize: 16,
                      marginHorizontal: 15,
            marginBottom:15
          }}>
          Detail: {data.description}
        </Text>
      </View>
    </ScrollView>
  );
};

export default DietPlanUI;

const styles = StyleSheet.create({});
