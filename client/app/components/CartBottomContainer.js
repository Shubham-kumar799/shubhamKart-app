import React from 'react';
import { StyleSheet , View  , Text , Button} from 'react-native'

import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import * as actions from '../Redux/Actions/cartActions'
import { connect } from 'react-redux';

const CartBottomContainer = ({cartItems , totalPrice , clearCart}) => {

    const navigation = useNavigation()

    const onPressHandler = () => {
        if(cartItems.length == 0 )
        {
            console.log(cartItems.length)
            return;
        }
        navigation.navigate("Checkout")
    }

     return (
          <View style={styles.container}>
              <Text style={styles.price}>${totalPrice}</Text>
              <Button  title="Clear" onPress={() => clearCart()}/>
              <Button  title="Checkout" onPress={onPressHandler} />
          </View>
      );
}

const styles = StyleSheet.create({
   container: {
       flexDirection: 'row',
    //    flex: 1,
    justifyContent:"space-between",
    padding: 10,
    alignItems:'center',
    backgroundColor: colors.white
   },
price: {
    fontSize: 18
}
})

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => 
        dispatch(actions.clearCart())
    }
}

const mapStateToProps = (state) => {
    const {cartItems} = state;
    return {
      cartItems: cartItems
    }
  }

export default connect( mapStateToProps, mapDispatchToProps)(CartBottomContainer); 