import React  from 'react';
import { StyleSheet , View , Text , StatusBar , ActivityIndicator } from 'react-native'

import ProductContainer from '../components/ProductContainer';
import colors from '../config/colors';

function ProductScreen(props) {

    

     return (
          <View style={styles.container}>
    
               
                      <ProductContainer />

                  
              
          </View>
      );
}

const styles = StyleSheet.create({
   container: {
       paddingTop: StatusBar.currentHeight,
       flex: 1,
    //    backgroundColor: colors.primary
   }
})

export default ProductScreen;