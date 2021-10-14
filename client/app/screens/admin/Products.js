import React from 'react';
import { StyleSheet , View , Text } from 'react-native'

import Screen from '../../components/Screen';

const Products = (props) => {
     return (
         <Screen>
          <View style={styles.container}>
              <Text>This is products</Text>
          </View>
          </Screen>
      );
}

const styles = StyleSheet.create({
   container: {}
})

export default Products;