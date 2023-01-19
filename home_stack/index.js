import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Sign_in from '../screens/sign-in';
import Loading_context from '../context/loading';
import Spinner from '../components/spinner';
import Sign_up from '../screens/sign-up';
import Home from '../screens/home';
import Camera from '../screens/camera';
const Stack = createNativeStackNavigator();

const Home_stack = () => {
  const {loading} = useContext(Loading_context);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Sign_in"
            component={Sign_in}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Sign_up"
            component={Sign_up}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Camera"
            component={Camera}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Spinner visible={loading} />
    </>
  );
};

export default Home_stack;
