import {View, Text, StatusBar} from 'react-native';
import React, {useState} from 'react';
import Home_stack from './home_stack';
import Loading_context from './context/loading';

const App = () => {
  const [loading, set_loading] = useState(false);

  return (
    <Loading_context.Provider value={{loading, set_loading}}>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor="#f2f2f2"
      />
      <Home_stack />
    </Loading_context.Provider>
  );
};

export default App;
