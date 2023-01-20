import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from './styles';

const Entries = () => {
  const [location_data, set_location_data] = useState(new Array());
  useEffect(() => {
    const get_data = database()
      .ref(auth().currentUser.uid + '/location_data')
      .once('value', data => data.exists() && set_location_data(data.val()));

    return () => get_data;
  }, []);

  return (
    <View>
      <Text style={styles.login_text}>Entries</Text>
      <View>
        {!!location_data.length &&
          location_data.map((location, idx) => (
            <View style={styles.list_wrapper} key={idx}>
              <Text style={styles.text}>
                {location.latitude + ', ' + location.longitude}
              </Text>
              <Text style={styles.text}>{location.location_feature_1}</Text>
              <Text style={styles.text}>{location.location_feature_2}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default Entries;
