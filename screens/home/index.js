import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import styles from './styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Home = ({navigation: {navigate}}) => {
  const [coords, set_coords] = useState(new Object());
  const [location_feature_1, set_location_feature_1] = useState('');
  const [location_feature_2, set_location_feature_2] = useState('');
  const [current_location, set_current_location] = useState(new Object());

  // useEffect(() => {}, []);

  const save_data = () => {
    database()
      .ref(auth().currentUser.uid + '/location_data')
      .update({
        location: current_location,
        location_feature_1,
        location_feature_2,
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map_style}
        provider={PROVIDER_GOOGLE}
        loadingEnabled
        showsUserLocation={true}
        followsUserLocation={true}
        onUserLocationChange={place => {
          console.log(place);
        }}
        initialRegion={{
          latitude: -26.118294,
          longitude: 27.889815,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <View style={styles.inputs_section}>
        <Text style={styles.small_text}>Capture location data</Text>
        <TextInput
          placeholder="Location feature 1 (e.g Mall of Africa...)"
          style={styles.input}
          onChangeText={text => set_location_feature_1(text)}
          value={location_feature_1}
          secureTextEntry
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Location feature 2"
          style={styles.input}
          onChangeText={text => set_location_feature_2(text)}
          value={location_feature_2}
          secureTextEntry
          placeholderTextColor="#999"
        />
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
            onPress={() => save_data()}>
            <Text style={styles.camera_btn_text}>Open Camera</Text>
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
            onPress={() => navigate('Camera')}>
            <Text style={styles.camera_btn_text}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
