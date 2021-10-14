import React  from 'react';
import { StyleSheet , View  , ScrollView ,  Text, Image , Button} from 'react-native'

import colors from '../config/colors';
import Screen from '../components/Screen'

const SingleProductScreen = ({route : {params : { item}}}) => {



     return (
         <Screen>
          <View style={styles.container}>
            <ScrollView>
                <View>
                <Image style={styles.image}
                source={{uri : item.image ? item.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX0z_J9EdV9agW_NrYWeuJ680VpNsWPKhdGQ&usqp=CAU"}}
              />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.brandName}>{item.brand}</Text>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Text style={styles.price}>${item.price}</Text>
                <Button title="Add" />
            </View>
          </View>
          </Screen>
      );
}

const styles = StyleSheet.create({
   container: {
       position: 'relative',
       height: '100%'
   },
   image: {
    margin: 10,
       backgroundColor: colors.white,
       resizeMode: 'contain',
       width: '100%',
       height: 250,
       flex: 1,
       alignSelf: 'center'
   },
   contentContainer:{
       padding: 10,
       margin: 5,
       alignItems: 'center',
       justifyContent: 'center'
   },
   name:{
       fontSize: 24,
       color: colors.dark,
       fontWeight: 'bold',
       margin: 3
   },
   bottomContainer:{
       flex: 1,
       bottom: 0,
       padding: 10,
       alignItems: 'flex-end',
       justifyContent: 'space-between',
       flexDirection: 'row'
   },
   price:{
       color: colors.secondary,
       fontSize: 24
   }
   
})


export default SingleProductScreen;