import React from 'react';
import { StyleSheet , View , Text , Image} from 'react-native'

import  Swipeable  from 'react-native-gesture-handler/Swipeable';
import colors from '../config/colors';

const CartItemCard = ({item , renderRightActions}) => {

    const {name ,image  , price} = item
     return (
         <Swipeable 
            renderRightActions={renderRightActions}
         >
          <View style={styles.container}>
              <Image style={styles.image}
                source={{uri :image ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX0z_J9EdV9agW_NrYWeuJ680VpNsWPKhdGQ&usqp=CAU"}}
              />
              <View style={styles.info}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.price}>${price}</Text>
                </View>
          </View>
          </Swipeable>
      );
}

const styles = StyleSheet.create({
   container: {
       flexDirection: 'row',
       alignItems: 'center',
       padding: 10,
       margin: 10,
       borderColor:colors.dark,
       borderWidth: 1,
   },
   image:{
       height: 80,
       width: 80,
       resizeMode: 'contain'
   },
   info:{
       flexDirection:"row",
       justifyContent:"space-between",
       flex: 1,
       margin: 10
   },
   price: {
       fontSize: 20,
       color: colors.secondary
   },
   name: {
    fontSize: 16,
   }
   
})

export default CartItemCard;