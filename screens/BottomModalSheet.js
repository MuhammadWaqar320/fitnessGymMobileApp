import RBSheet from 'react-native-raw-bottom-sheet';
import {View, StyleSheet} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BottomModalSheet = function ({
  children,
  refRBSheet,
  sheetStyles,
  ...otherProps
}) {
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      customStyles={{
        container: {
          ...styles.sheetContainerStyles,
          ...sheetStyles,
        },
      }}
      {...otherProps}>
      <>
        <View style={styles.closeIconContainer}>
          <AntDesign
            name="close"
            size={25}
            style={styles.closeIcon}
            onPress={() => {
              refRBSheet.current.close();
            }}
          />
        </View>
        {children}
      </>
    </RBSheet>
  );
};
const styles = StyleSheet.create({
  closeIconContainer: {
    width: '100%',
    height: 30,
    paddingRight: 10,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeIcon: {
      alignSelf: 'flex-end',
      color:'black'
  },
  sheetContainerStyles: {
    backgroundColor: '#f0ddd1',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
});

BottomModalSheet.defaultProps = {
  sheetStyles: {},
  children: <></>,
};

export default BottomModalSheet;
