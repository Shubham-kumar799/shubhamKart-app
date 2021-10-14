import React from 'react';
import { StyleSheet , View , Image , Text, TouchableWithoutFeedback} from 'react-native'

import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';

function SearchListItem({item }) {

    const navigation = useNavigation()
    const {name , image , description} = item

     return (
         <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Product Detail' , {item : item})}
         >
          <View style={styles.container}>
              <Image 
                style={styles.image}
                source= {{uri : image ? image : "https://lh3.googleusercontent.com/proxy/3pvYZGnCVWUG6WqzFODZlH8ltBhXUNcdizqWggDrQ3_2uKLNG8KAqAwvNVK2qk1pSApPtv5UoY0GG2CenuIkKcxRFfrJn3tfqsZpzSgtMBWymHeDE74q0mOaiLo46urdBg"}}
            />
              <View style={styles.productInfo}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.description} numberOfLines={2}>{description}</Text>
              </View>
          </View>
          </TouchableWithoutFeedback>
      );
}

const styles = StyleSheet.create({
   container: {
        flexDirection: 'row',
        width:'75%',
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderBottomColor: colors.dark,
   },
   image: {
       width: 70,
       height: 70,
       resizeMode: 'contain',
       paddingRight: 15,
   
   },
   name: {
       fontSize: 15,
       color: colors.secondary
   },
   productInfo:{
    //    flex: 0.6,
    paddingLeft: 15
   },
   description: {
       fontSize: 12,
        color: colors.dark
   }
})

export default SearchListItem;