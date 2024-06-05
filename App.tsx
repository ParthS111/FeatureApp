import { StyleSheet } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';

import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/router';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Router />
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    padding: 16,
  },
});

export default App;
