import React from 'react';

import { createMaterialTopTabNavigator } from  '@react-navigation/material-top-tabs'
// Screens
import CheckoutScreen from '../screens/CheckoutScreen'
import PaymentScreen from '../screens/PaymentScreen'
import ConfirmScreen from '../screens/ConfirmScreen'
import Screen from '../components/Screen';

const Tab = createMaterialTopTabNavigator();

const CheckoutNavigator = (props) => {
     return (
          <Tab.Navigator
            initialRouteName="Shipping"
            swipeEnabled={false}
            lazy={true}
          >
              <Tab.Screen 
                name="Shipping" 
                component={CheckoutScreen}
                listeners={{
                  tabPress: e => {
                    // Prevent default action
                    e.preventDefault();
                  },
                }}
                />
              <Tab.Screen 
                name="Payment" 
                component={PaymentScreen}
                listeners={{
                  tabPress: e => {
                    // Prevent default action
                    e.preventDefault();
                  },
                }}
                />
              <Tab.Screen 
                name="Confirm" 
                component={ConfirmScreen}
                listeners={{
                  tabPress: e => {
                    // Prevent default action
                    e.preventDefault();
                  },
                }}
                />
          </Tab.Navigator>
      );
}



export default CheckoutNavigator;