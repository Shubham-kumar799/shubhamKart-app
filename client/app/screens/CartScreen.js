import React from 'react';
import { StyleSheet , View  , Text , ScrollView } from 'react-native'

import {connect} from 'react-redux';
import CartItemCard from '../components/CartItemCard';
import * as actions from '../Redux/Actions/cartActions'
import Screen from '../components/Screen'
import colors from '../config/colors';
import CartBottomContainer from '../components/CartBottomContainer';
import ListItemDelete from '../components/ListItemDelete'


// Set the key prop in cartItems map function

const CartScreen = ({cartItems , removeItemFromCart }) => {

    if(cartItems)
    {
        var totalPrice = 0
        cartItems.map((product) => {
            return totalPrice += product.price
        })
    }
    

     return (
         <Screen style={{flex: 1}}>
             <View style={styles.container}>
                 <Text style={styles.cartHeader}>Your Cart</Text>
                {cartItems.size > 0 ? (
                    <>
                    <ScrollView
                    style={styles.scrollView}
                 >
             {cartItems.map((product)  => (
                <CartItemCard item={product} key={product.name}
                renderRightActions={() => 
                    <ListItemDelete
                    onPress={() => removeItemFromCart(product)}
                    />}
                />
             ))}
             </ScrollView>
             <View style={styles.bottom}>
             <CartBottomContainer totalPrice={totalPrice.toFixed(2)}/>
             </View>
                    </>
                ) : (
                    <View style={styles.emptyCart}>
                    <Text style={styles.emptyCartText}>Your Cart Is empty</Text>
                    </View>
                )}
                 
          </View>
          </Screen>
      );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
   cartHeader: {
       alignSelf:'center',
       fontSize: 24,
       color: colors.dark,
       margin: 10,
    //    flex: 1,
    },
    bottom: {
        // position: 'absolute',
       bottom: 0,
    },
    emptyCart: {
        flex: 1,
        alignSelf: "center",
        justifyContent: 'center'
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
        removeItemFromCart: (product) => 
        dispatch(actions.removeFromCart(product))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(CartScreen);