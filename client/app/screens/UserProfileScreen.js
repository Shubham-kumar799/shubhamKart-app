import React , {useState, useCallback ,useEffect, useContext} from 'react';
import { StyleSheet , View , Text , ScrollView , Button } from 'react-native'

import Screen from '../components/Screen';
import { useNavigation } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../api/baseURL';

import authGlobal from '../context/store/AuthGlobal';
import { logoutUser } from '../context/actions/authActions';

const UserProfileScreen = (props) => {

    const context = useContext(authGlobal);
    const [userProfile , setUserProfile] = useState()
    const navigation = useNavigation()

    useEffect(() => {
        if(context.stateUser.isAuthenticated == false || context.stateUser.isAuthenticated === null){
            navigation.navigate('Login');
            return;
        }
        AsyncStorage.getItem('jwt')
        .then(async (res) => {
                console.log(context.stateUser)
                console.log("This is stateUser")
            // try {
            //     const response = await axios.get(`${baseURL}users/${context.stateUser.user.userId}`  , {
            //         headers: {Authorization: `Bearer ${res}`} ,
            //     })
            //     setUserProfile(response.data);
            //     console.log(userProfile)
            //     console.log("This is user Profile")
            // } catch (error) {
            //     console.log(error)
            //     console.log("error setting user Profile")
            // }
        })


    return () => {
        setUserProfile();
    }
    }, [context.stateUser.isAuthenticated])

     return (
         <Screen style={styles.screen}>
             <Text style={styles.header}>YOur Profile</Text>
          <View style={styles.container}>
              <Text style={{color: 'black'}}>{context.stateUser.userProfile ? context.stateUser.userProfile.email : ""}</Text>
              <Text style={{color: 'black'}}>{context.stateUser.userProfile ? context.stateUser.userProfile.password : ""}</Text>
              <Button title="sign Out"  onPress = {() => {
                  AsyncStorage.removeItem('jwt'),
                  logoutUser(context.dispatch),
                  navigation.navigate('Login')
              } }/>
          </View>
          </Screen>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        // justifyContent: 'center'
        margin: 40,
    },
    header:{
        fontSize: 30,
        alignSelf:"center",
        margin: 20,
    },
    screen: {
        flex: 1,
    }
})

export default UserProfileScreen;