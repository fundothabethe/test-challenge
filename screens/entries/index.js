import {View, Text, ScrollView} from 'react-native';
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
      <Text
        style={[
          styles.text,
          {textAlign: 'center', paddingBottom: 20, fontSize: 18},
        ]}>
        Feature data
      </Text>
      <ScrollView>
        <View>
          {!!location_data.length &&
            location_data.map((location, idx) => (
              <View style={[styles.list_wrapper, {}]} key={idx}>
                <Text style={styles.text}>
                  Feature 1: {location.location_feature_1}
                </Text>
                <Text style={styles.text}>
                  Feature 2: {location.location_feature_2}
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Entries;
