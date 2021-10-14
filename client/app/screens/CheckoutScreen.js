import React , {useState , useEffect} from 'react';
import { StyleSheet , View , Text, Button } from 'react-native'

import Screen from '../components/Screen'
import {useNavigation} from '@react-navigation/native'
import FormContainer from '../components/form/FormContainer'
import FormInput from '../components/form/FormInput'
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'
import {Picker} from '@react-native-picker/picker';
import colors from '../config/colors';

const countries = require('../assets/countries.json')

const CheckoutScreen = ({cartItems}) => {

  const [orderItems , setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState()
  const [city, setCity] = useState()
  const [zip, setZip] = useState()
  const [country, setCountry] = useState(countries[0].name)
  const [phone, setPhone] = useState()

  const navigation = useNavigation()

  const checkout = () => {
    let order ={
     city,
     country ,
     dateOrdered: Date.now(),
     orderItems,
     phone,
     shippingAddress1 : address,
     shippingAddress2 : address2,
     zip 
    }
    navigation.navigate('Payment' , {order: order})
  }

  useEffect(() => {
    setOrderItems(cartItems)
  }, [])

     return (
        <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
          extremeHeight={200}
          enabledOnAndroid={true}
        >
        <FormContainer title="Shipping Info">
          <FormInput 
            placeholder="Phone"
            name="Phone"
            value={phone}
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
          />
          <FormInput 
            placeholder="Shipping Address 1"
            name="Shipping Address 1"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <FormInput 
            placeholder="Shipping Address 2"
            name="Shipping Address 2"
            value={address2}
            onChangeText={(text) => setAddress2(text)}
          />
          <FormInput 
            placeholder="City"
            name="City"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <FormInput 
            placeholder="Zip Code"
            name="Zip"
            value={zip}
            keyboardType="numeric"
            onChangeText={(text) => setZip(text)}
          />
          
          </FormContainer>
          <Picker
           style={styles.picker}
          selectedValue={country}
          onValueChange={(itemValue, itemIndex ) => {setCountry(itemValue)}}>
            {countries.map((item) => <Picker.Item key={item.code} label={item.name} value={item.name} /> )}

        </Picker>
        <View>
          <Button title="Confirm" onPress={() => checkout()} />
        </View>
        </KeyboardAwareScrollView>
      );
}




const styles = StyleSheet.create({
   container: {},
   screen: {
       flex: 1, 
   },
   picker: {
     margin: 10,
     width: '80%',
     padding: 10,
     alignSelf: 'center',
     borderWidth: 2,
     borderColor: colors.secondary
   }
})

const mapStateToProps = (state) => {
  const {cartItems} = state;
  return {
    cartItems: cartItems
  }
}

export default connect(mapStateToProps, null)(CheckoutScreen);