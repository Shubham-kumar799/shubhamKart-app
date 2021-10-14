import React from 'react';

import {createStackNavigator} from '@react-navigation/stack'
import ProductScreen from '../screens/ProductScreen';
import SingleProductScreen from '../screens/SingleProductScreen';


const Stack = createStackNavigator()

const HomeNavigator = () => {
     return (
          <Stack.Navigator>
              <Stack.Screen
                name="Home" 
                component={ProductScreen}
                options={{
                  headerShown: false,
                }}
                />
                <Stack.Screen
                name="Product Detail" 
                component={SingleProductScreen}
                options={{
                  headerShown: false,
                }}
                />
          </Stack.Navigator>
      );
}



export default HomeNavigator;