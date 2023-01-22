import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import styles from './styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Module from '../../Module';

const Home = ({navigation: {navigate}}) => {
  const [coords, set_coords] = useState(new Object());
  const [location_feature_1, set_location_feature_1] = useState('');
  const [location_feature_2, set_location_feature_2] = useState('');
  const [current_location, set_current_location] = useState({});
  const [location_data, set_location_data] = useState([]);

  const [change_state, set_change_state] = useState(false);
  const get_data = database().ref(auth().currentUser.uid + '/location_data');

  useEffect(() => {
    location_permission().then(() =>
      Module.turn_on_location(_ => console.log(_)),
    );
    const interval = setInterval(() => get_location_data(), 1000);

    get_data.on(
      'value',
      data => data.exists() && set_location_data(data.val()),
    );

    return () => {
      Module.stop_tracking();
      clearInterval(interval);
      get_data.off('value');
    };
  }, []);

  // useEffect(() => console.log(current_location), [current_location]);

  const get_location_data = () =>
    Module.get_location(_ => {
      const location = {
        latitude: parseFloat(_.split(' ')[0]),
        longitude: parseFloat(_.split(' ')[1]),
      };
      console.log(location);
      const is_float = n => Number(n) === n && n % 1 !== 0;

      if (
        Number(location.latitude) === location.latitude &&
        location.latitude % 1 !== 0 &&
        Number(location.longitude) === location.longitude &&
        location.longitude % 1 !== 0
      ) {
        set_current_location(location);
      } else {
        console.log('whier');
      }
    });

  //

  const location_permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (!granted) Alert.alert('Access Denied', 'Canot use camera.');
    } catch (err) {
      console.warn(err);
    }
  };

  const save_data = async () =>
    await database()
      .ref(auth().currentUser.uid)
      .update({
        location_data: [
          ...location_data,
          {
            location_feature_1,
            location_feature_2,
          },
        ],
      })
      .then(() => {
        console.log('feature data data saved');
        console.log({
          location_feature_1,
          location_feature_2,
        });
        set_location_feature_1('');
        set_location_feature_2('');
      })
      .catch(_ => console.log(_));

  return (
    <View style={styles.container}>
      {!!Object.keys(current_location).length && (
        <>
          <MapView
            style={styles.map_style}
            provider={PROVIDER_GOOGLE}
            loadingEnabled
            region={{
              ...current_location,
              latitudeDelta: 0.0,
              longitudeDelta: 0.005,
            }}
            followsUserLocation={true}
            initialRegion={{
              ...current_location,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker title="Your location" coordinate={current_location} />
          </MapView>
        </>
      )}
      <View style={styles.inputs_section}>
        <Text style={styles.small_text}>Capture location data</Text>
        <TextInput
          placeholder="Location feature 1 (e.g Mall of Africa...)"
          style={styles.input}
          onChangeText={text => set_location_feature_1(text)}
          value={location_feature_1}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Location feature 2"
          style={styles.input}
          onChangeText={text => set_location_feature_2(text)}
          value={location_feature_2}
          placeholderTextColor="#999"
        />
        <Text style={styles.camera_btn_text}>
          {current_location.latitude + ' ' + current_location.longitude}
        </Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.camera_btn,
              {
                marginLeft: 50,
                backgroundColor: '#d17c47',
                borderBottomLeftRadius: 20,
                borderTopLeftRadius: 20,
              },
            ]}
            // onPress={() => get_location_data()}>
            onPress={() => save_data()}>
            <Text style={styles.camera_btn_text}>Submit data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.camera_btn,
              {
                marginRight: 50,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              },
            ]}
            onPress={() => {
              Module.stop_tracking();
              get_data.off('value');
              navigate('Camera');
            }}>
            <Text style={styles.camera_btn_text}>Camera</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            // styles.camera_btn,

            {paddingTop: 20},
          ]}
          onPress={() => navigate('Entries')}>
          <Text style={styles.camera_btn_text}>View recent entries</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
