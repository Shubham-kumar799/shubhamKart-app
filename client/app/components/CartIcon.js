import React from 'react';
import { StyleSheet , View , Text } from 'react-native'


// UNinstall this package
import IconBadge from 'react-native-icon-badge';

import {connect} from 'react-redux'
import { Feather } from '@expo/vector-icons';
import colors from '../config/colors';

const CartIcon = ({color , size , cartItems}) => {
     return (
        <View style={styles.container}>
       
            <Feather style={styles.icon} name="shopping-cart" color={color} size={size} />
            {cartItems.length > 0 && (
                <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {cartItems.length}
                    </Text>
                </View>
            )}
            
        </View>
      );
}

const styles = StyleSheet.create({
   container: {
       flexDirection: 'row'
   },
   icon: {
       position:'relative'
   },
   text: {
    color : colors.white,
    fontSize: 10,
   },
   textContainer:{
       backgroundColor: 'red',
       borderRadius: 100,
       padding: 4,
       position: "absolute",
       top: -10,
       left: 15,
   }
})

const mapStateToProps = (state) => {
    const {cartItems} = state;
    return {
        cartItems: cartItems
    }
}

export default connect(mapStateToProps , null)(CartIcon);