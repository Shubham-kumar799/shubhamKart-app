import React from 'react';
import { StyleSheet , View , Text ,Button , ScrollView } from 'react-native'

import {connect} from 'react-redux';
import colors from '../config/colors';
import CartItemCard from '../components/CartItemCard';
import { useNavigation } from '@react-navigation/native';
import * as actions from '../Redux/Actions/cartActions'

const ConfirmScreen = ({route , cartItems , clearCart}) => {

  const { order} = route.params
  const navigation = useNavigation()

  const placeOrder = () => {
    clearCart(),
    navigation.navigate("Cart");
  }

     return (
          <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
              >
              <Text style={styles.header}>Shipping To</Text>
              <View style={styles.info}>
                
                
                <Text style={styles.text}>Address: {order.shippingAddress1}</Text>
                <Text style={styles.text}>Address2: {order.shippingAddress2}</Text>
                <Text style={styles.text}>City: {order.city}</Text>
                <Text style={styles.text}>Zip Code: {order.zip}</Text>
                <Text style={styles.text}>Country: {order.country}</Text>
           
                
                
                
              </View>
              <Text style={styles.order}>Your Order</Text>
              
              {cartItems && 
                cartItems.map((cartItem) =>  <CartItemCard item={cartItem} key={cartItem.name}/>)
              }
              </ScrollView>
              <View style={styles.placeOrder}>
              <Button title={'Place Order'} onPress={placeOrder}/>
              </View>
          </View>
      );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   header: {
     fontSize: 24,
     alignSelf: 'center',
     margin: 15
   },
   info: {
     backgroundColor: colors.secondary,
     alignSelf: "center",
     width: '85%',
     padding: 10,
     borderRadius: 10,
   },
   placeOrder:{
    bottom: 0,
    // position : "absolute",
    width: "100%",
    marginTop: 15,
   },
   order: {
    fontSize: 23,
    alignSelf:"center",
    margin: 10,
    textDecorationLine: 'underline',
   },
   text: {
     fontSize: 16,
     margin: 5,
     color: colors.white
   },
   scrollView: {
     margin: 10,
     marginBottom: 30,
    //  flex: 1,
   }
})

const mapStateToProps = (state) => {
  const {cartItems} = state;
  return {
    cartItems: cartItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      clearCart: () => 
      dispatch(actions.clearCart())
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(ConfirmScreen);