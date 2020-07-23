/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react'; // Imports: Redux Persist Persister
import { Provider } from 'react-redux'; // Imports: Screens
import { store, persistor } from './redux/store'; // React Native: App
import { NavigationContainer } from '@react-navigation/native';
import Routes from './route';

export default class App extends Component {
  render() {
    return (
      // Redux: Global Store
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
