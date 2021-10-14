import React from 'react';

import {createStackNavigator} from '@react-navigation/stack'
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen'
import UserProfileScreen from '../screens/UserProfileScreen';







const Stack = createStackNavigator()

const UserNavigator = () => {
     return (
          <Stack.Navigator
          >
              <Stack.Screen
                name="Login" 
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
                />
                <Stack.Screen
                name="Register" 
                component={RegisterScreen}
                options={{
                  headerShown: false,
                }}
                />
                <Stack.Screen
                name="UserProfile" 
                component={UserProfileScreen}
                options={{
                  headerShown: false,
                }}
                />
          </Stack.Navigator>
      );
}



export default UserNavigator;