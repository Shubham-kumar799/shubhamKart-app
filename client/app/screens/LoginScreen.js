import React , {useState , useContext , useEffect} from 'react';
import { StyleSheet , View , Text , Button, TouchableWithoutFeedback} from 'react-native'

import { useFocusEffect } from '@react-navigation/core';
import FormContainer from '../components/form/FormContainer';
import FormInput from '../components/form/FormInput';
import Error from '../components/Error';
import colors from '../config/colors';
import {useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context
import AuthGlobal from '../context/store/AuthGlobal'
import { loginUser } from '../context/actions/authActions'

const LoginScreen = (props) => {

    const context = useContext(AuthGlobal)

    const [email , setEmail] = useState();
    const [password, setPassword] = useState();
    const [error , setError] = useState(false)
    const navigation = useNavigation();

    useFocusEffect(() => {
        // console.log(context.stateUser)
        // console.log("This is login")
        if(context.stateUser.isAuthenticated == true){
             navigation.navigate('UserProfile')
        }
    })


    const handleSubmit = () => {
        if(!email || !password)
        {
            setError(true);
            return;
        }
        const user ={
            email : email.trim(),
            password : password.trim(),
        }
        
        setError(false);
        loginUser(user , context.dispatch)

    }

     return (
          <FormContainer title="Login">
            <FormInput 
                placeholder="e-mail"
                name="email"
                id="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <FormInput 
                placeholder="password"
                name="password"
                id="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            {error && (
                <Error message="Enter you credentials you asshole" />
            )}
            <View style={styles.loginBottomContainer}>
                <Button title="Login" onPress={() => handleSubmit()}/>
                <Text style={styles.loginText}>Don't have an account yet?
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerButton}>Sign Up</Text>
                </TouchableWithoutFeedback>
                </Text>
                
            </View>
          </FormContainer>
      );
}

const styles = StyleSheet.create({
   container: {},  
   loginBottomContainer: {
       margin: 10,
       flex: 1,
       justifyContent: "center",
   },
   loginText: {
       fontSize: 16,
       color: colors.dark,
       margin: 30,
   },
   registerButton: {
       textDecorationLine: 'underline',
       marginLeft: 5,
       color: colors.link,
   }
})

export default LoginScreen;