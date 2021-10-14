import React from 'react';

import {createStackNavigator} from '@react-navigation/stack'
import Products from '../screens/admin/Products';
import Category from '../screens/admin/Category';
import Orders from '../screens/admin/Orders';
import CheckoutNavigator from './CheckoutNavigator';





const Stack = createStackNavigator()

const CartNavigator = () => {
     return (
          <Stack.Navigator>
              <Stack.Screen
                name="Products" 
                component={Products}
                options={{
                  title : "Products"
                }}
                />
                <Stack.Screen
                name="Category" 
                component={Category}
                options={{
                    title: "Categories"
                }}
                />
                 <Stack.Screen
                name="Orders" 
                component={Orders}
                options={{
                    title: "Orders"
                }}
                />
          </Stack.Navigator>
      );
}



export default CartNavigator;