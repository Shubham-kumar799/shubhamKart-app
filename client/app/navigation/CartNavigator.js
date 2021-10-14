import React from 'react';

import {createStackNavigator} from '@react-navigation/stack'
import CartScreen from '../screens/CartScreen';
import CheckoutNavigator from './CheckoutNavigator';
import Screen from '../components/Screen';





const Stack = createStackNavigator()

const CartNavigator = () => {
     return (
          <Stack.Navigator>
              <Stack.Screen
                name="Cart" 
                component={CartScreen}
                options={{
                  headerShown: false,
                }}
                />
                <Stack.Screen
                name="Checkout" 
                component={CheckoutNavigator}
                options={{
                  // headerShown: false,
                }}
                />
          </Stack.Navigator>
      );
}



export default CartNavigator;