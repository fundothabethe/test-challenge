import {View, Text} from 'react-native';
import React from 'react';
import {RNCamera} from 'react-native-camera';
import styles from './styles';

const Camera = () => {
  return (
    <View>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          console.log(barcodes);
        }}
      />
    </View>
  );
};

export default Camera;
