
import React from 'react';
import { StyleSheet } from 'react-native';

import AppNavigator from './app/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// redux
import {Provider} from 'react-redux'
import store from './app/Redux/store'

// Context Api
import Auth from './app/context/store/auth';

export default function App() {
  return (
    <Auth>
    <Provider store={store}>
    <NavigationContainer>
    <AppNavigator/>
    <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
    </Provider>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
   
  },
});
