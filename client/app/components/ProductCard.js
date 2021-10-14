import React from 'react';
import { StyleSheet , View , Dimensions , Image, Text , Button ,  TouchableWithoutFeedback } from 'react-native'

import * as actions from '../Redux/Actions/cartActions'
import colors from '../config/colors';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'

var {width} = Dimensions.get('window')

const  ProductCard = ({addItemToCart, item}) => {

    const {name, price, image , countInStock} = item
    const navigation = useNavigation()

     return (
         <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Product Detail' , {item : item})}
         >
          <View style={styles.container}>
              <Image style={styles.image}
                source={{uri : image ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX0z_J9EdV9agW_NrYWeuJ680VpNsWPKhdGQ&usqp=CAU"}}
              />
              <View style={styles.card}/>
              <Text numberOfLines={1} style={styles.title}>
                {name}
              </Text>
              <Text style={styles.price}>${price}</Text>
              {
                  countInStock > 0 ? (
                      <View style={{marginBottom: 60}}>
                          <Button
                            title="Add to cart" 
                            color="green"
                            onPress={() => {
                                addItemToCart(item)
                                Toast.show({
                                    topOffset: 60,
                                    type:'success',
                                    text1: "Product successfully added to cart",
                                    text2: "Hooray!!!!"
                                })
                            }}
                        />
                      </View>
                  ) : <Text style={{marginTop: 20}}>Currently Unavailable</Text>
              }
          </View>
           </TouchableWithoutFeedback>
      );
}

const styles = StyleSheet.create({
   container: {
    //    width: width/2,
       height: width /1.7,
       padding: 10, 
       borderRadius: 10,
       marginTop: 55,
       marginBottom: 5,
       margin: 5,
       alignItems: 'center',
       elevation: 8,
       backgroundColor: colors.white,
       flex: 1,
   },
   image: {
       flex: 1,
       width: width/2 - 30,
       height: width/2 - 20 - 30,
       position: 'absolute',
       top:-45,
       resizeMode: 'contain'
   },
   card: {
       marginBottom: 10, 
       height: width/2 -20 - 90,
       backgroundColor: "transparent",
       width: width/2 -20 -10
   },
   title: {
       fontWeight: 'bold',
       fontSize: 14,
       textAlign: 'center'
   },
   price: {
       fontSize: 20,
       color:"orange",
       marginTop: 10,
   }
})

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => 
        dispatch(actions.addToCart(product))
    }
}

export default connect(null, mapDispatchToProps)(ProductCard);