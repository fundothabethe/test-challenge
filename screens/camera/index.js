import {
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
import Loading_context from '../../context/loading';

var RNFS = require('react-native-fs');

const Camera_apge = () => {
  const devices = useCameraDevices();
  const device = devices.back;

  const {set_loading} = useContext(Loading_context);
  const [path, set_path] = useState(null);
  let camera = useRef(null).current;

  useEffect(() => {
    camera_permission();
    if (device == null) set_loading(false);
    // else set_loading(true);
  }, []);

  useEffect(() => {
    if (device == null) set_loading(false);
  }, [device]);

  useEffect(() => console.log(path), [path]);

  const camera_permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const take_pic = async () => {
    try {
      const data = await camera.takePhoto({
        flash: 'on',
      });
      console.log('file://' + data.path);
      set_path(data.path);
    } catch (error) {
      console.log(error);
    }
  };

  if (device == null) return <></>;
  return (
    <>
      {!path ? (
        <>
          <Camera
            ref={e => (camera = e)}
            style={{flex: 1}}
            device={device}
            isActive={true}
            frameProcessorFps={'auto'}
            photo={true}
          />
          <TouchableOpacity style={styles.btn} onPress={() => take_pic()}>
            <FontAwesome name="circle-thin" size={100} color="#666" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* <Image source={require(path)} style={styles.img} /> */}

          <Image
            style={styles.img}
            source={{
              uri: 'file://' + path,
            }}
          />
          <TouchableOpacity
            onPress={() => set_path(null)}
            style={[
              styles.btn,
              {
                alignSelf: 'center',
                backgroundColor: '#2766a1',
                borderRadius: 20,
              },
            ]}>
            <Text
              style={[
                styles.small_text,
                {padding: 10, paddingHorizontal: 50, color: 'white'},
              ]}>
              Back
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default Camera_apge;
