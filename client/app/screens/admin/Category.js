import React from 'react';
import { StyleSheet , View , Text } from 'react-native'

import Screen from '../../components/Screen';

const Category = (props) => {
     return (
         <Screen>
          <View style={styles.container}>
              <Text>This is category</Text>
          </View>
          </Screen>
      );
}

const styles = StyleSheet.create({
   container: {}
})

export default Category;