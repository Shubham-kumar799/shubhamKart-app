import React , {useState} from 'react';
import { StyleSheet , View , Text, Button, TouchableWithoutFeedback } from 'react-native'

import FormContainer from '../components/form/FormContainer';
import FormInput from '../components/form/FormInput';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Error from '../components/Error';
import colors from '../config/colors';
import {useNavigation } from '@react-navigation/native'
import axios from 'axios';
import baseURL from '../api/baseURL'
import Toast from 'react-native-toast-message'


const RegisterScreen = (props) => {

    const [email , setEmail] = useState();
    const [name , setName] = useState();
    const [phone , setPhone] = useState();
    const [password, setPassword] =useState();
    const [error, setError] = useState(false);
    const navigation = useNavigation();

    const handleSubmit = () => {
        if(!name || ! password || !phone || !email)
        {
            setError(true);
            return;
        }
        let user = {
            email : email.trim() , 
            phone  : phone.trim(), 
            password : password.trim(),  
            name : name.trim(),
            isAdmin: false
        }
        
        setError(false);
        console.log(user);
        axios.post(`${baseURL}users/register` , user).then((res) => {
            console.log(res)
            if (res.status === 200)
            {
                // Do something
               Toast.show({
                   topOffset: 60,
                   type: "success",
                   text1: 'Registration succeeded',
                   text2: 'Please login into your account'
               }) 
                setTimeout(() => {
                    navigation.navigate('Login')
                } , 500)
            }
        }).catch((error) => {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: 'Registration failed',
                text2: 'Please try again'
            }) 
            console.log(error)
            console.log("Error Registering user")
        })
    }

     return (
          <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
          >
              <FormContainer title="Register">
                <FormInput 
                    placeholder="e-mail"
                    name="email"
                    id="email"
                    onChangeText={(text) => setEmail(text)}
                />
                <FormInput 
                    placeholder="name"
                    name="name"
                    id="name"
                    onChangeText={(text) => setName(text)}
                />
                <FormInput 
                    placeholder="phone-number"
                    name="phone"
                    id="phone"
                    keyboardType='numeric'
                    onChangeText={(text) => setPhone(text)}
                />
                <FormInput 
                    placeholder="password"
                    name="password"
                    id="password"
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
              </FormContainer>
              {error && (
                  <Error message="Enter your credentials"/>
              )}
              <View style={styles.registerBottomContainer}>
                  <Button  title="Register Now" onPress={() => handleSubmit()}/>
                  <Text style={styles.text}>Already have an account?
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                      <Text style={styles.registerButton}>
                      SignIn here!!
                      </Text> 
                      </TouchableWithoutFeedback>
                      </Text>
              </View>

          </KeyboardAwareScrollView>
      );
}

const styles = StyleSheet.create({
   container: {},
   registerBottomContainer: {
       margin: 20,
   },
   text: {
       alignSelf:'center',
       fontSize: 16,
       marginTop: 40
   },
   registerButton: {
       color: colors.link,
       textDecorationLine: 'underline'
   }
})

export default RegisterScreen;