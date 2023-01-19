//import liraries
import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {height, width} from '../../shared/global-styles';
// create a component
const Spinner = ({visible}) => {
  return visible ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#ffe200" />
    </View>
  ) : (
    <></>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#17349c',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

//make this component available to the app
export default Spinner;
