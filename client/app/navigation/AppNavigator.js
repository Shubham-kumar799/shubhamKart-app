import React from 'react';
import { StyleSheet , View } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeNavigator from './HomeNavigator';
import { MaterialIcons } from '@expo/vector-icons';
import CartIcon from '../components/CartIcon';
import CartNavigator from './CartNavigator';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator'

const Tab = createBottomTabNavigator()

const AppNavigator = (props) => {
     return (
         <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
            }}
         >
             <Tab.Screen name="Home" component={HomeNavigator}
             options={{
                 tabBarIcon: ({color, size}) => (
                 <AntDesign name="home" size={size} color={color} />
                 )
                }}
             />
             <Tab.Screen name="Cart" component={CartNavigator}
             options={{
                 tabBarIcon: ({color, size}) => (
                    <CartIcon color={color} size={size}/>
                 )
                }}
             />
              <Tab.Screen name="Admin" component={AdminNavigator}
             options={{
                 tabBarIcon: ({color, size}) => (
                    <MaterialIcons name="admin-panel-settings" size={size} color={color} />
                 )
                }}
             />
             <Tab.Screen name="Profile" component={UserNavigator}
             options={{
                 tabBarIcon: ({color, size}) => (
                    <AntDesign name="user" size={size} color={color} />
                 )
                }}
             />
         </Tab.Navigator>
      );
}

const styles = StyleSheet.create({
   container: {}
})

export default AppNavigator;