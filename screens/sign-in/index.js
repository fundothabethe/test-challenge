import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import styles from './styles';
import auth from '@react-native-firebase/auth';

const Sign_in = ({navigation: {navigate}}) => {
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      user => user && navigate('Home'),
    );
    return subscriber; // unsubscribe on unmount
  }, []);

  const sign_in = () =>
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });

  return (
    <View style={styles.container}>
      <View style={styles.text_wrapper}>
        <Text style={styles.login_text}>Log in</Text>
      </View>
      <View style={styles.wrapper}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={text => set_email(text)}
          value={email}
          textContentType="emailAddress"
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={text => set_password(text)}
          value={password}
          secureTextEntry
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.small_btn}
          onPress={() => navigate('Sign_up')}>
          <Text style={styles.small_btn_text}>Create an account Instead?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sign_btn}
          onPress={() =>
            (!!email && !!password && sign_in()) ||
            Alert.alert('Error login in', 'Must provide user credentials')
          }>
          <Text style={styles.sign_text}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sign_in;
