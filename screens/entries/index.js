import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

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
      <Text>Entries</Text>

      <View>
        {!!location_data.length &&
          location_data.map(location => (
            <View>
              <View>
                <Text>{location.latitude + ' ' + location.longitude}</Text>
              </View>
              <Text>
                {location.location_feature_1}
                {location.location_feature_2}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default Entries;
