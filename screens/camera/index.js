import {View, Text} from 'react-native';
import React from 'react';
import {
  CameraDeviceFormat,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
  PhotoFile,
  sortFormats,
  useCameraDevices,
  useFrameProcessor,
  Camera,
  VideoFile,
  frameRateIncluded,
} from 'react-native-vision-camera';
import styles from './styles';
import {height, width} from '../../shared/global-styles';

const Camera_apge = () => {
  const devices = useCameraDevices();
  const device = devices.back;

  if (device == null) {
    return <></>;
  }
  return (
    <View>
      <Camera
        style={{flex: 1}}
        device={device}
        isActive={true}
        frameProcessorFps={'auto'}
      />
    </View>
  );
};

export default Camera_apge;
