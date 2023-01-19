import * as React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default styles;
